import { useAuth0 } from '@auth0/auth0-react'
import MobileLayout from 'layouts/MobileLayout'
import Head from 'next/head'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return <button onClick={loginWithRedirect}>Masuk</button>
}

function Header() {
  return (
    <div className="bg-white">
      <MobileLayout>
        <div className="flex justify-between py-8">
          <p className="text-2xl flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-orange-500 bg-orange-200 rounded-full p-1"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span>menukami</span>
          </p>
          <LoginButton />
        </div>
      </MobileLayout>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-orange-500">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Feature({ text }) {
  return (
    <span className="flex space-x-2 items-start text-gray-600 text-left">
      <div className="w-5 h-5">
        <CheckIcon />
      </div>
      <p>{text}</p>
    </span>
  )
}

function Hero() {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="bg-white">
      <MobileLayout>
        <div className="flex py-12 space-x-32">
          <div>
            <div className="text-4xl font-bold">Terima pesanan langsung ke toko Anda</div>
            <div className="text-4xl font-bold text-orange-500">— komisi 0%</div>
            <div className="mt-8 space-y-2 font-light">
              <Feature text="Bebas komisi" />
              <Feature text="Komunikasi langsung dengan pelanggan" />
              <Feature text="Buat daftar menu dalam 15 menit" />
              <Feature text="Tidak perlu unduh aplikasi tambahan" />
              <Feature text="Gratis selamanya" />
            </div>
            <div>
              <button
                className="mt-12 bg-orange-500 px-12 py-3 rounded text-white font-semibold tracking-wider text-sm"
                onClick={loginWithRedirect}
              >
                DAFTAR SEKARANG
              </button>
            </div>
          </div>
        </div>
      </MobileLayout>
    </div>
  )
}

function Footer() {
  return (
    <div className="py-6">
      <MobileLayout>
        <div className="">
          <small>
            &copy; 2020 <span className="font-bold">menukami.com</span>
          </small>
        </div>
      </MobileLayout>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kembangkan bisnis Anda tanpa komisi | MenuKami</title>
      </Head>
      <div className="min-h-screen bg-white px-4 flex flex-col justify-between">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}
