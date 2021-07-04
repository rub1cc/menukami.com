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
        <div className="flex space-x-32">
          <div className="flex">
            <div className="w-1/2 flex justify-center flex-col">
              <div className="text-3xl md:text-6xl leading-tight font-bold">
                Kembangkan Bisnis Tanpa Komisi
              </div>
              <div className="text-sm md:text-xl mt-4">
                {/* Buat menu & terima pesanan langsung via Whatsapp  */}
                Ikuti partner kami—mulai dari penjual makanan, pakaian dan berbagai jenis
                lainnya—gunakan menukami untuk membuat menu digital & terima pesanan via WhatsApp
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <button
                  className="flex items-center space-x-4 bg-gray-900 px-4 py-2 rounded-full text-white tracking-wider text-sm"
                  onClick={() => router.push('/admin')}
                >
                  <span>Buat Sekarang</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <span className="block text-xs md:text-base">Gratis. Selamanya.</span>
              </div>
            </div>
            <div className="w-1/2">
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
