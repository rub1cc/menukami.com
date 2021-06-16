import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const CartContext = createContext()
CartContext.displayName = 'CartContext'

function CartProvider(props) {
  const [cart, setCart] = useState([])

  const addToCart = useCallback(
    (item) => {
      item.qty = 1
      item.subTotal = (item.sale_price ?? item.price) * item.qty
      setCart([...cart, item])
    },
    [setCart, cart]
  )

  const increment = useCallback(
    (id) => {
      const tempCart = [...cart]
      const selectedItem = tempCart.find((item) => item.id === id)
      const index = tempCart.indexOf(selectedItem)
      const item = tempCart[index]
      item.qty += 1
      item.subTotal = (item.sale_price ?? item.price) * item.qty
      setCart([...tempCart])
    },
    [setCart, cart]
  )

  const decrement = useCallback(
    (id) => {
      const tempCart = [...cart]
      const selectedItem = tempCart.find((item) => item.id === id)
      const index = tempCart.indexOf(selectedItem)
      const item = tempCart[index]
      if (item.qty == 1) {
        item.note = ''
        setCart(cart.filter((item) => item.id !== id))
      } else {
        item.qty -= 1
        item.subTotal = (item.sale_price ?? item.price) * item.qty
        setCart([...tempCart])
      }
    },
    [setCart, cart]
  )

  const updateNote = useCallback(
    (id, note) => {
      const tempCart = [...cart]
      const selectedItem = tempCart.find((item) => item.id === id)
      const index = tempCart.indexOf(selectedItem)
      const item = tempCart[index]
      item.note = note
      setCart([...tempCart])
    },
    [setCart, cart]
  )

  const value = useMemo(() => ({ cart, addToCart, increment, decrement, updateNote }), [
    cart,
    addToCart,
    increment,
    decrement,
    updateNote,
  ])

  return <CartContext.Provider value={value} {...props} />
}

function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export { CartProvider, useCart }
