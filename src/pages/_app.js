import { CartProvider } from 'context/cart-context'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
