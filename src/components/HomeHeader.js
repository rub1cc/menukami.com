import DesktopLayout from 'layouts/DesktopLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Logo from './Logo'

function LoginButton() {
  return (
    <div className="flex space-x-8 items-center">
      <Link href="/admin">
        <button className="focus:outline-none">Login</button>
      </Link>
    </div>
  )
}

function HomeHeader() {
  const router = useRouter()
  return (
    <div className="bg-white">
      <DesktopLayout>
        <div className="flex justify-between py-5">
          <button className="text-2xl flex items-center space-x-3" onClick={() => router.push('/')}>
            <Logo />
            <span className="font-bold" style={{ letterSpacing: '-3px' }}>
              menukami
            </span>
          </button>
          <LoginButton />
        </div>
      </DesktopLayout>
    </div>
  )
}

export default HomeHeader
