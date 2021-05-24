import { UserProvider } from '@auth0/nextjs-auth0'
import { CartProvider } from 'context/cart-context'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

import '../styles/tailwind.css'
import '../styles/custom.css'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default MyApp
