import { useCart } from 'context/cart-context'
import { useState } from 'react'
import ItemDetail from './ItemDetail'
import Price from './Price'

export default function MenuItem({ data }) {
  const { name, image, description } = data
  const [isShowItemDetail, setShowItemDetail] = useState(false)

  const { cart } = useCart()

  const currItem = cart.find((item) => item.id === data.id)

  const count = currItem?.qty ? `${currItem?.qty}x` : null

  return (
    <>
      <button
        className="flex p-4 space-x-3 hover:bg-gray-100"
        onClick={() => setShowItemDetail(true)}
      >
        <img src={image} alt={name} className="w-24 h-24 object-cover rounded-lg" />
        <div className="flex flex-col justify-between text-left">
          <div>
            <p className="text-base mb-2 leading-6">
              <span className="font-bold text-orange-500">{count}</span> {name}
            </p>
            <p className="text-gray-600 truncate-2-lines text-sm mb-2 font-light">
              {description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit facere
              similique odit aliquam nulla, tenetur aut ducimus officiis. Explicabo, doloremque?{' '}
            </p>
          </div>
          <Price data={data} />
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
