import HomeFooter from 'components/HomeFooter'
import HomeHeader from 'components/HomeHeader'
import DesktopLayout from 'layouts/DesktopLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Hero() {
  const router = useRouter()
  return (
    <div className="bg-white">
      <DesktopLayout>
        <div className="flex py-12 space-x-32">
          <div className="text-center">
            <div className="text-4xl md:text-5xl">Kembangkan Bisnis Kamu Tanpa Komisi</div>
            <div className="text-xl md:text-2xl">
              Buat menu & terima pesanan langsung via Whatsapp
            </div>
            <div>
              <button
                className="mt-8 bg-gray-900 px-8 py-4 rounded text-white font-semibold tracking-wider"
                onClick={() => router.push('/admin')}
              >
                BUAT SEKARANG - GRATIS
              </button>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div>
                <video key="https://i.imgur.com/7rGukPL.mp4" playsInline autoPlay muted loop>
                  <source src="https://i.imgur.com/7rGukPL.mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Menukami: Buat menu digital & terima pesanan via Whatsapp</title>
        <meta name="title" content="Menukami: Buat menu digital & terima pesanan via Whatsapp" />
        <meta
          name="description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://menukami.com/" />
        <meta
          property="og:title"
          content="Menukami: Buat menu digital & terima pesanan via Whatsapp"
        />
        <meta
          property="og:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="og:image" content="https://i.imgur.com/6eYbLz2.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://menukami.com/" />
        <meta
          property="twitter:title"
          content="Menukami: Buat menu digital & terima pesanan via Whatsapp"
        />
        <meta
          property="twitter:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="twitter:image" content="https://i.imgur.com/6eYbLz2.png" />
      </Head>
      <div className="min-h-screen bg-white px-4 flex flex-col justify-between">
        <HomeHeader />
        <Hero />
        <HomeFooter />
      </div>
    </div>
  )
}
