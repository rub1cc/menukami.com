import DesktopLayout from 'layouts/DesktopLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function LoginButton() {
  return (
    <Link href="/admin">
      <button className="focus:outline-none">Login</button>
    </Link>
  )
}

function Header() {
  return (
    <div className="bg-white">
      <div className="md:px-8">
        <div className="flex justify-between py-5">
          <p className="text-2xl flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-blue-600 bg-blue-100 rounded-full p-1"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tracking-tighter">menukami</span>
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

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

function Footer() {
  return (
    <div className="py-6">
      <DesktopLayout>
        <div className="text-center">
          <small>
            &copy; 2020 <span className="font-bold">menukami.com</span>
          </small>
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
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}
