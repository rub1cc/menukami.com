import DesktopLayout from 'layouts/DesktopLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function LoginButton() {
  return (
    <div className="flex space-x-8 items-center">
      <Link href="/cacastore">
        <button className="focus:outline-none">Demo</button>
      </Link>
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
          </button>
          <LoginButton />
        </div>
      </DesktopLayout>
    </div>
  )
}

export default HomeHeader
