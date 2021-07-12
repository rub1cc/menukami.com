import * as classnames from 'classnames'
import BackButton from 'components/BackButton'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import NoteForm from 'components/NoteForm'
import Price from 'components/Price'
import { useCart } from 'context/cart-context'
import MobileLayout from 'layouts/MobileLayout'
import React, { useEffect, useState } from 'react'
import formatToCurrency from 'utils/formatToCurrency'
import prepareWAMessage from 'utils/prepareTextMessage'

function ReviewOrder() {
  const { cart } = useCart()

  const [noteForm, setNoteForm] = useState({
    data: null,
    isShow: false,
  })
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [note, setNote] = useState('')
  const [menukamiStore, setMenukamiStore] = useState(null)
  const totalCartPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0
  // const deliveryFsee = 0
  // const totalPrice = totalCartPrice + deliveryFee

  useEffect(() => setMenukamiStore(JSON.parse(localStorage.getItem('menukami_store'))), [])

  if (!menukamiStore) {
    return <FullScreenLoading />
  }

  const handleOrderButton = () => {
    if (menukamiStore.delivery && deliveryAddress.length < 7)
      return alert('Harap mengisi alamat tujuan pengiriman dengan benar')
    window.open(
      prepareWAMessage(cart, menukamiStore, {
        note,
        deliveryAddress,
      })
    )
  }

  function CartItem() {
    const { cart, decrement, increment } = useCart()
    return cart.length > 0 ? (
      cart.map((item, index) => {
        return (
          <div key={`item-${index}`} className="py-4">
            <div className="flex space-x-4">
              <span className="w-full">
                <span className="font-bold">{item.name}</span>
                <Price data={item} className="text-sm mt-2 space-x-2" />
                {item.note ? (
                  <span>
                    <span className="text-sm text-gray-600 font-light">{item.note}</span>{' '}
                    <button
                      className="text-sm text-blue-500 font-light inline focus:outline-none"
                      onClick={() => setNoteForm({ isShow: true, data: item })}
                    >
                      Ubah catatan
                    </button>
                  </span>
                ) : (
                  <button
                    className="text-sm text-blue-500 font-light inline focus:outline-none"
                    onClick={() => setNoteForm({ isShow: true, data: item })}
                  >
                    Tambah catatan
                  </button>
                )}
              </span>
              <div className="flex">
                <div className="space-x-3 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 border border-gray-300 rounded-md p-1 text-blue-500 hover:border-gray-400 transition duration-300 cursor-pointer"
                    onClick={() => decrement(item.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                  <span>{item.qty}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 border border-gray-300 rounded-md p-1 text-blue-500 hover:border-gray-400 transition duration-300 cursor-pointer"
                    onClick={() => increment(item.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {noteForm.isShow ? (
              <NoteForm
                data={{ ...noteForm.data }}
                handleDismiss={() => setNoteForm({ isShow: false, data: null })}
              />
            ) : null}
          </div>
        )
      })
    ) : (
      <div className="py-10 px-4 flex flex-col justify-center items-center space-y-6">
        <span className="bg-blue-100 p-5 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </span>
        <p className="text-gray-600 w-full text-center">Keranjangmu masih kosong.</p>
      </div>
    )
  }

  return (
    <MobileLayout className="bg-gray-100 min-h-screen">
      <Header leftComponent={<BackButton />} title="Keranjang" />
      <div className="space-y-2 pb-32">
        <div className="bg-white p-4 divide-gray-200">
          <CartItem />
        </div>
        {cart.length > 0 ? (
          <div className="py-4 px-4 bg-white">
            <p className="text-base font-semibold">Informasi Tambahan</p>
            <textarea
              value={note}
              placeholder="Beri catatan untuk penjual"
              className="mt-2 w-full px-4 py-3 rounded-md focus:outline-none border"
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
        ) : null}

        {cart.length > 0 && menukamiStore.delivery ? (
          <div className="py-4 px-4 bg-white">
            <p className="text-base font-semibold">Alamat pengiriman</p>
            <textarea
              value={deliveryAddress}
              placeholder="Tujuan pengiriman produk"
              className="mt-2 w-full px-4 py-3 rounded-md focus:outline-none border"
              onChange={(event) => setDeliveryAddress(event.target.value)}
            />
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 inset-x-0 max-w-xl mx-auto w-full focus:outline-none z-10 bg-white shadow-2xl">
        <div className="py-4 px-4 bg-white space-y-2">
          <span className="flex justify-between font-bold">
            <p>Total pesanan</p>
            <p>{formatToCurrency(totalCartPrice)}</p>
          </span>
          {/* <span className="flex justify-between">
            <p>Biaya pengiriman</p>
            <p>{formatToCurrency(deliveryFee)}</p>
          </span> */}
          {/* <span className="flex justify-between font-bold">
            <p>Total</p>
            <p>{formatToCurrency(totalPrice)}</p>
          </span> */}
        </div>
        {cart.length > 0 ? (
          <button className="w-full mb-4" onClick={handleOrderButton}>
            <div
              className={classnames([
                'flex rounded-lg text-white text-center p-4 justify-between mx-4 focus:outline-none bg-blue-500',
              ])}
            >
              <div className="text-center w-full">Pesan via WhatsApp</div>
            </div>
          </button>
        ) : null}
      </div>
    </MobileLayout>
  )
}

export default ReviewOrder
