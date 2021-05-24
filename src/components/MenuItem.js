import { useCart } from 'context/cart-context'
import { useState } from 'react'
import ItemDetail from './ItemDetail'
import Price from './Price'

export default function MenuItem({ data }) {
  const { cart } = useCart()
  const [isShowItemDetail, setShowItemDetail] = useState(false)

  if (!data) {
    return (
      <button className="flex p-4 space-x-3 hover:bg-gray-100 focus:outline-none">
        <div className="w-24 h-24 bg-gray-300 rounded-lg animate-pulse" />
        <div className="flex flex-col justify-between text-left">
          <div>
            <p className="text-base mb-2 leading-6">
              <span className="font-bold w-32 bg-gray-300 animate-pulse inline-block rounded">
                &nbsp;
              </span>
            </p>
            <p className="text-gray-600 truncate-2-lines text-sm mb-2 font-light">
              <span className="font-bold w-64 bg-gray-300 animate-pulse inline-block h-10 rounded">
                &nbsp;
              </span>
            </p>
            <p className="text-gray-600 truncate-2-lines text-sm mb-2 font-light">
              <span className="font-bold w-16 bg-gray-300 animate-pulse inline-block h-5 rounded">
                &nbsp;
              </span>
            </p>
          </div>
        </div>
      </button>
    )
  }

  const { name, image, description } = data

  const currItem = cart.find((item) => item.id === data.id)

  const count = currItem?.qty ? `${currItem?.qty}x` : null

  return (
    <>
      <button
        className="flex p-4 space-x-3 hover:bg-gray-100 w-full focus:outline-none"
        onClick={() => setShowItemDetail(true)}
      >
        <img src={image} alt={name} className="w-24 h-24 object-cover rounded-lg" />
        <div className="flex flex-col justify-between text-left w-full">
          <div>
            <p className="text-base mb-2 leading-6">
              {count ? (
                <span className="font-bold text-blue-500">
                  {count} {name}
                </span>
              ) : (
                name
              )}
            </p>
            <p className="text-gray-600 truncate-2-lines text-sm mb-2 font-light">{description}</p>
          </div>
          <Price data={data} className="text-sm font-semibold" />
        </div>
      </button>
      <ItemDetail
        data={data}
        isShow={isShowItemDetail}
        handleDismiss={() => setShowItemDetail(false)}
      />
    </>
  )
}
