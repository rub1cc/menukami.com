import { useUser } from '@auth0/nextjs-auth0'
import DesktopLayout from 'layouts/DesktopLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Logo from './Logo'
import onClickOutside from 'react-onclickoutside'
import { AiOutlineLogout, AiOutlineShop } from 'react-icons/ai'

const MenuLink = ({ icon, href, text, className }) => {
  return (
    <a
      className={`flex space-x-2 items-center hover:text-gray-900 w-full py-2 px-4 ${className}`}
      href={href}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  )
}

const Menu = () => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  Menu.handleClickOutside = () => setIsOpen(false)

  const menuClass = isOpen ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0'

  return (
    <div className="flex items-start relative z-50">
      <button className="focus:outline-none text-gray-600">
        <button onClick={() => setIsOpen((old) => !old)} className="flex items-center space-x-4">
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            alt={`Profile`}
          />
        </button>
        <div
          className={`bg-white absolute right-0 top-full mt-2 rounded-lg border border-gray-100 shadow-xl transition-all duration-300 transform origin-top-right w-48 py-2 ${menuClass}`}
        >
          <MenuLink
            icon={<AiOutlineShop className="w-5 h-5 text-gray-400" />}
            text="Outletku"
            href="/admin"
          />
          <MenuLink
            icon={<AiOutlineLogout className="w-5 h-5 text-gray-400" />}
            text="Log Out"
            href="/api/auth/logout"
          />
        </div>
      </button>
    </div>
  )
}

const EnhancedMenu = onClickOutside(Menu, {
  excludeScrollbar: true,
  handleClickOutside: () => Menu.handleClickOutside,
})

function LoginButton() {
  const { user } = useUser()
  if (user) {
    return (
      <div className="flex space-x-8 items-center">
        <EnhancedMenu />
      </div>
    )
  }
  return (
    <div className="flex space-x-8 items-center">
      <Link href="/api/auth/login">
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
            <span className="font-bold font-sans" style={{ letterSpacing: '-3px' }}>
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
