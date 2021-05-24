import * as classnames from 'classnames'
import { useCart } from 'context/cart-context'
import { useState } from 'react'

export default function NoteForm({ data, isShow, handleDismiss }) {
  const { id } = data
  const { cart, updateNote } = useCart()
  const itemInCart = cart.filter((item) => item.id === id)[0]

  const [note, setNote] = useState(itemInCart.note)

  const dismiss = () => {
    setNote(itemInCart.note)
    handleDismiss()
  }

  const saveNote = () => {
    updateNote(id, note)
    dismiss()
  }

  return isShow ? (
    <div
      className={classnames([
        'fixed z-10 inset-0 overflow-y-auto max-w-md mx-auto transition-all duration-300',
      ])}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <button
          className="fixed inset-0 transition-opacity w-full h-full focus:outline-none"
          onClick={dismiss}
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </button>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-lg w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-gray-200">
            <div className="flex flex-col">
              <div className="w-full bg-gray-100 space-y-1">
                {itemInCart ? (
                  <div className="py-4 px-4 bg-white">
                    <input
                      value={note}
                      placeholder="Beri catatan untuk penjual"
                      className="mt-2 w-full px-4 py-3 rounded-lg focus:outline-none border"
                      onChange={(e) => setNote(e.target.value)}
                    ></input>
                  </div>
                ) : null}
                <div className="flex p-4 justify-center items-center bg-white">
                  <button
                    className="px-4 py-2 bg-blue-500 rounded-md text-white w-full focus:outline-none"
                    onClick={saveNote}
                  >
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
