import * as classnames from 'classnames'
import { useCart } from 'context/cart-context'
import { SRLWrapper } from 'simple-react-lightbox'
import ItemDetailPrice from './ItemDetailPrice'

export default function ItemDetail({ data, isShow, handleDismiss }) {
  const { id, image, name, description } = data
  const { cart, addToCart, increment, decrement, updateNote } = useCart()
  const itemInCart = cart.filter((item) => item.id === id)[0]
  const count = itemInCart ? itemInCart.qty : 1

  const handleAddItem = () => addToCart(data)

  return isShow ? (
    <div
      className={classnames([
        'fixed z-10 inset-0 overflow-y-auto max-w-xl mx-auto transition-all duration-300',
      ])}
    >
      <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
        <button
          className="fixed inset-0 transition-opacity w-full h-full focus:outline-none"
          onClick={() => handleDismiss()}
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </button>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-full max-w-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <button
            onClick={() => handleDismiss()}
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
              <div className="w-full bg-white space-y-1 h-screen">
                <SRLWrapper>
                  <a href={image}>
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-56 sm:h-80 md:h-96 object-cover"
                    />
                  </a>
                </SRLWrapper>
                <div className="py-4 px-4 bg-white">
                  <p className="text-xl font-bold">{name}</p>
                  {description ? (
                    <p className="font-light text-gray-600 mb-4">{description}</p>
                  ) : null}
                  <div className="flex justify-between items-center">
                    <ItemDetailPrice data={data} />
                    <div className="flex justify-end items-center bg-white">
                      {itemInCart ? (
                        <div className="space-x-4 flex items-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7 border border-gray-300 rounded-md p-1 text-blue-500 hover:border-gray-400 transition duration-300 cursor-pointer"
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
                            className="w-7 h-7 border border-gray-300 rounded-md p-1 text-blue-500 hover:border-gray-400 transition duration-300 cursor-pointer"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7 border border-gray-300 rounded-md p-1 text-blue-500 hover:border-gray-400 transition duration-300 cursor-pointer"
                          onClick={handleAddItem}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                {itemInCart ? (
                  <div className="px-4 bg-white">
                    <input
                      value={itemInCart.note}
                      placeholder="Catatan untuk produk ini"
                      className="w-full px-4 py-3 rounded-lg focus:outline-none border"
                      onChange={(e) => updateNote(id, e.target.value)}
                    ></input>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
