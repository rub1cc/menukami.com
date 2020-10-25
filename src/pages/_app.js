import { Auth0Provider } from '@auth0/auth0-react'
import { CartProvider } from 'context/cart-context'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={'http://localhost:3000/admin'}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Auth0Provider>
  )
}

export default MyApp
