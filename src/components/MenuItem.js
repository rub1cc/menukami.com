import { useCart } from 'context/cart-context'
import { useState } from 'react'
import ItemDetail from './ItemDetail'
import Price from './Price'
import SimpleReactLightbox from 'simple-react-lightbox'
import calculateDiscountPercentage from 'utils/calculateDiscountPercentage'

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

  const { name, image, price, sale_price } = data

  const currItem = cart.find((item) => item.id === data.id)

  const count = currItem?.qty ? `${currItem?.qty}x` : null

  return (
    <>
      <button
        className="group flex flex-col space-x-3 border border-transparent w-full focus:outline-none overflow-hidden rounded-md"
        onClick={() => setShowItemDetail(true)}
      >
        <div className="w-full h-56 overflow-hidden rounded-md relative">
          {sale_price ? (
            <span className="text-white absolute top-0 right-2 md:right-3 z-10 flex flex-col">
              <div className="flex flex-col bg-red-500 font-bold text-sm pt-1">
                <span>{calculateDiscountPercentage(price, sale_price)}%</span>
                <small className="-mt-2 opacity-75">OFF</small>
              </div>
              <div
                style={{
                  borderLeft: '18px solid transparent',
                  borderRight: '18px solid transparent',
                  borderTop: '10px solid rgb(239, 68, 68)',
                }}
              ></div>
            </span>
          ) : null}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md transform group-hover:scale-150"
          />
        </div>
        <div className="flex flex-col justify-between text-left w-full">
          <div className="py-2">
            <p className={`font-bold truncate-2-lines pr-8 ${count ? 'text-blue-500' : ''}`}>
              {count ? `${count} ` : ''}
              {name}
            </p>
            <Price data={data} className="text-sm flex-col" />
          </div>
        </div>
      </button>
      <SimpleReactLightbox>
        <ItemDetail
          data={data}
          isShow={isShowItemDetail}
          handleDismiss={() => setShowItemDetail(false)}
        />
      </SimpleReactLightbox>
    </>
  )
}
