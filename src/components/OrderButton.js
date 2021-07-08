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
      <button className="fixed bottom-0 inset-x-0 mb-4 max-w-xl mx-auto w-full focus:outline-none z-50">
        <div className="flex rounded-lg text-white text-center bg-blue-500 p-4 justify-between mx-4">
          <div className="h-6 w-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full relative"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="font-bold text-xs absolute bg-white top-0 right-0 rounded-full text-blue-500 w-4 h-4 transform translate-x-1 -translate-y-1">
              {totalItem}
            </p>
          </div>
          <span className="flex space-x-1 items-center justify-center">
            <p className="font-bold">{formatToCurrency(totalPrice)}</p>
          </span>
        </div>
      </button>
    </Link>
  ) : null
}
