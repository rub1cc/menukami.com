import { useCart } from 'context/cart-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import formatToCurrency from 'utils/formatToCurrency'

export default function OrderButton() {
  const { cart } = useCart()
  const totalItem = cart.reduce((prev, next) => prev + next.qty, 0)
  const totalPrice = cart.reduce((prev, next) => prev + next.subTotal, 0) || 0
  const router = useRouter()
  const { outlet_slug } = router.query

  return cart?.length > 0 ? (
    <Link href={`/${outlet_slug}/review-order`}>
      <button className="fixed bottom-0 inset-x-0 mb-4 max-w-xl mx-auto w-full focus:outline-none">
        <div className="flex rounded-lg text-white text-center bg-blue-500 p-4 justify-between mx-4">
          <p className="font-bold">{totalItem} item</p>
          <span className="flex space-x-1 items-center justify-center">
            <p className="font-bold">{formatToCurrency(totalPrice)}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </span>
        </div>
      </button>
    </Link>
  ) : null
}
