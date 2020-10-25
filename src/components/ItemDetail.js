import * as classnames from 'classnames'
import { useCart } from 'context/cart-context'
import Price from './Price'

export default function ItemDetail({ data, isShow, handleDismiss }) {
  const { id, image, name, description } = data
  const { cart, addToCart, increment, decrement, updateNote } = useCart()
  const itemInCart = cart.filter((item) => item.id === id)[0]
  const count = itemInCart ? itemInCart.qty : 1

  const handleAddItem = () => addToCart(data)

  return isShow ? (
    <div
      className={classnames([
        'fixed z-10 inset-0 overflow-y-auto max-w-md mx-auto transition-all duration-300',
      ])}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <button className="fixed inset-0 transition-opacity" onClick={handleDismiss}>
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </button>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full max-w-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <button
            onClick={handleDismiss}
            className="absolute ml-3 mt-3 opacity-50 hover:opacity-100 transition duration-300 hover:outline-none focus:outline-none rounded-full shadow-lg bg-white w-10 h-10 p-1 border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-full h-full text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="bg-gray-200">
            <div className="flex flex-col">
              <div className="w-full bg-gray-100 space-y-1">
                <img src={image} alt={name} className="w-full h-64 object-cover" />
                <div className="py-4 px-4 bg-white">
                  <p className="text-xl font-bold">{name}</p>
                  <Price data={data} />

                  <p className="font-light text-gray-600 mt-2">{description}</p>
                </div>
                {itemInCart ? (
                  <div className="py-4 px-4 bg-white">
                    <p className="text-base font-semibold">Catatan untuk pesanan</p>
                    <input
                      value={itemInCart.note}
                      placeholder="Contoh: Extra pedas ya!"
                      className="mt-2 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none"
                      onChange={(e) => updateNote(id, e.target.value)}
                    ></input>
                  </div>
                ) : null}
                <div className="flex p-4 justify-center items-center bg-white">
                  {itemInCart ? (
                    <div className="space-x-4 flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 border border-gray-400 rounded-full p-1 text-orange-500 hover:border-gray-600 transition duration-300 cursor-pointer"
                        onClick={() => decrement(id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                      <span className="text-xl">{count}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 border border-gray-400 rounded-full p-1 text-orange-500 hover:border-gray-600 transition duration-300 cursor-pointer"
                        onClick={() => increment(id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  ) : (
                    <button
                      className="px-4 py-2 bg-orange-500 rounded-md text-white w-full"
                      onClick={handleAddItem}
                    >
                      <span>Tambah</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
