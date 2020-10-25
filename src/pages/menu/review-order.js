import * as classnames from 'classnames'
import NoteForm from 'components/NoteForm'
import Price from 'components/Price'
import { useCart } from 'context/cart-context'
import MobileLayout from 'layouts/MobileLayout'
import React, { useState } from 'react'
import formatToCurrency from 'utils/formatToCurrency'
import prepareWAMessage from 'utils/prepareTextMessage'

function Header() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 max-w-md mx-auto">
        <div className="bg-white flex p-4 space-x-6 items-center shadow-md">
          <button
            className="bg-gray-100 rounded-full p-1 border border-gray-200 hover:border-gray-500 transition duration-300"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <p className="font-bold">Review Order</p>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  )
}

function CartItem() {
  const { cart, decrement, increment } = useCart()
  return cart.length > 0 ? (
    cart.map((item, index) => {
      const [isShowItemDetail, setShowItemDetail] = useState(false)
      return (
        <div key={`item-${index}`} className="py-4">
          <div className="flex space-x-4">
            <span className="w-full">
              <span>{item.name}</span>
              <Price data={item} className="text-sm mt-2" />
              {item.note ? (
                <span>
                  <span className="text-sm text-gray-600 font-light">{item.note}</span>{' '}
                  <button
                    className="text-sm text-orange-500 font-light inline"
                    onClick={() => setShowItemDetail(true)}
                  >
                    Ubah
                  </button>
                </span>
              ) : (
                <button
                  className="text-sm text-orange-500 font-light inline"
                  onClick={() => setShowItemDetail(true)}
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
                  className="w-6 h-6 border border-gray-400 rounded-full p-1 text-orange-500 hover:border-gray-600 transition duration-300 cursor-pointer"
                  onClick={() => decrement(item.id)}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span>{item.qty}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 border border-gray-400 rounded-full p-1 text-orange-500 hover:border-gray-600 transition duration-300 cursor-pointer"
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
          <NoteForm
            data={item}
            isShow={isShowItemDetail}
            handleDismiss={() => setShowItemDetail(false)}
          />
        </div>
      )
    })
  ) : (
    <div className="p-10 flex flex-col justify-center items-center space-y-4">
      <span className="bg-orange-100 p-5 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-orange-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </span>
      <p className="text-gray-600">Yaah, keranjangmu masih kosong.</p>
    </div>
  )
}

function ReviewOrder() {
  const { cart } = useCart()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const totalCartPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0
  const deliveryFee = 0
  const totalPrice = totalCartPrice + deliveryFee
  const handleOrderButton = () =>
    window.open(prepareWAMessage(cart, 6287782345627, deliveryAddress))

  return (
    <MobileLayout>
      <Header />
      <div className="space-y-2">
        <div className="bg-white p-4 divide-y-2 divide-gray-200">
          <CartItem />
        </div>
        {cart.length > 0 ? (
          <div className="py-4 px-4 bg-white">
            <p className="text-base font-semibold">Alamat pengiriman</p>
            <textarea
              value={deliveryAddress}
              placeholder="Kemana pesananmu akan diantar?"
              className="mt-2 w-full bg-gray-100 px-4 py-3 rounded focus:outline-none border"
              onChange={(event) => setDeliveryAddress(event.target.value)}
            />
          </div>
        ) : null}
        <div className="py-4 px-4 bg-white space-y-2">
          <span className="flex justify-between">
            <p>Total pesanan</p>
            <p>{formatToCurrency(totalCartPrice)}</p>
          </span>
          <span className="flex justify-between">
            <p>Diskon</p>
            <p>{formatToCurrency(deliveryFee)}</p>
          </span>
          <span className="flex justify-between font-bold">
            <p>Total</p>
            <p>{formatToCurrency(totalPrice)}</p>
          </span>
        </div>
      </div>

      {cart.length > 0 ? (
        <button className="w-full my-4" disabled={!deliveryAddress} onClick={handleOrderButton}>
          <div
            className={classnames([
              'flex rounded-lg text-white text-center p-4 justify-between mx-4',
              !deliveryAddress ? 'bg-orange-300' : 'bg-orange-500',
            ])}
          >
            <button className="text-center w-full">Pesan via WhatsApp</button>
          </div>
        </button>
      ) : null}
    </MobileLayout>
  )
}

export default ReviewOrder
