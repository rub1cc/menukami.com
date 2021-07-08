import { UserProvider } from '@auth0/nextjs-auth0'
import { CartProvider } from 'context/cart-context'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-quill/dist/quill.snow.css'
import '../styles/custom.css'
import '../styles/tailwind.css'
import '../styles/unreset.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-BYEHHMNDC3"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BYEHHMNDC3');
        `,
              }}
            />
          </Head>
          <Component {...pageProps} />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default MyApp
