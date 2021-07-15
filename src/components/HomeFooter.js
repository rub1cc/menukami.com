import DesktopLayout from 'layouts/DesktopLayout'
import { useRouter } from 'next/router'
import React from 'react'
import Logo from './Logo'

function HomeFooter() {
  const router = useRouter()
  return (
    <div className="py-12 md:py-24 bg-gray-800 text-white">
      <DesktopLayout>
        <div className="bg-gray-900 p-24 rounded-lg -mt-48 mb-8 flex justify-between">
          <div className="pr-4">
            <p className="text-3xl font-bold">Buat menu kamu sekarang, gratis!</p>
            <p className="text-gray-300">
              Nikmati akses penuh ke semua fitur MenuKami. Tanpa biaya langgan dan tanpa komisi.
            </p>
          </div>
          <button
            className="text-left flex items-center space-x-4 border border-blue-500 bg-blue-500 px-6 py-3 rounded-md text-white justify-between"
            onClick={() => router.push('/admin')}
          >
            <span>Buat Menu</span>
          </button>
        </div>
        <div className="flex justify-between py-5">
          <button className="text-2xl flex items-center space-x-3" onClick={() => router.push('/')}>
            <Logo />
            <span className="font-bold text-white font-sans" style={{ letterSpacing: '-3px' }}>
              menukami
            </span>
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-white">Ikuti kami:</span>
            <img src="/images/social/ig.png" alt="" className="w-8 h-8" />
            <img src="/images/social/tw.png" alt="" className="w-8 h-8" />
          </div>
        </div>
      </DesktopLayout>
    </div>
  )
}

export default HomeFooter
