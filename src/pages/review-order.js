import FloatingButton from 'components/FloatingButton'
import { useCart } from 'context/cart-context'
import React from 'react'
import formatToCurrency from 'utils/formatToCurrency'
import prepareWAMessage from 'utils/prepareTextMessage'

function Header() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 max-w-md mx-auto ">
        <div className="bg-white flex p-4 space-x-6 items-center shadow-md">
          <button
            className="bg-gray-100 rounded-full p-1 hover:shadow"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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
  const { cart } = useCart()
  return cart.length > 0 ? (
    cart.map((item, index) => (
      <div key={`item-${index}`}>
        <span className="flex space-x-2">
          <span className="space-x-2 w-2/4">
            <span>{item.name}</span>
          </span>
          <span className="text-blue-500 font-bold w-1/4 text-center">{item.qty}x</span>

          <span className="w-1/4 text-right">
            <p>{formatToCurrency(item.subTotal)}</p>
          </span>
        </span>
      </div>
    ))
  ) : (
    <div className="p-10 flex flex-col justify-center items-center space-y-4">
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
      <p className="text-gray-500">Yaah, keranjangmu masih kosong.</p>
    </div>
  )
}

function ReviewOrder() {
  const { cart } = useCart()
  const totalCartPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0
  const deliveryFee = 0
  const totalPrice = totalCartPrice + deliveryFee
  const handleOrderButton = () => window.open(prepareWAMessage(cart, 6287782345627))
  return (
    <div className="pb-24">
      <Header />
      <div className="space-y-2">
        <div className="bg-white p-4 space-y-4 pt-6">
          <CartItem />
        </div>
        <div className="py-4 px-4 bg-white">
          <p className="text-base font-semibold">Alamat pengiriman</p>
          <textarea
            placeholder="Kemana pesananmu akan diantar?"
            className="mt-2 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none border"
          />
        </div>
        <div className="py-4 px-4 bg-white space-y-2">
          <span className="flex justify-between">
            <p>Total pesanan</p>
            <p>{formatToCurrency(totalCartPrice)}</p>
          </span>
          <span className="flex justify-between">
            <p>Biaya pengiriman</p>
            <p>{formatToCurrency(deliveryFee)}</p>
          </span>
          <span className="flex justify-between font-bold">
            <p>Total</p>
            <p>{formatToCurrency(totalPrice)}</p>
          </span>
        </div>
      </div>

      {cart.length > 0 ? (
        <FloatingButton onClick={handleOrderButton}>
          <div className="text-center w-full">Pesan via WhatsApp</div>
        </FloatingButton>
      ) : null}
    </div>
  )
}

export default ReviewOrder
