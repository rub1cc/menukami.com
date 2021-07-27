import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import Logo from 'components/Logo'
import LogoutButton from 'components/LogoutButton'
import RippleButton from 'components/RippleButton'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HiTrendingUp } from 'react-icons/hi'
import onClickOutside from 'react-onclickoutside'
import { useQuery } from 'react-query'
import { useToImage } from 'react-to-image'
import { useClipboard } from 'use-clipboard-copy'

const MenuLink = ({ icon, onClick, text, className }) => {
  return (
    <div
      className={`flex space-x-2 items-center hover:text-gray-900 w-full py-2 px-4 ${className}`}
      onClick={onClick}
    >
      <span className="w-4 h-4 text-gray-500">{icon}</span>
      <span>{text}</span>
    </div>
  )
}

const Outlet = ({ item, index, showQr }) => {
  const router = useRouter()
  const { copy, copied } = useClipboard({
    copiedTimeout: 600, // timeout duration in milliseconds
  })

  const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)
    Menu.handleClickOutside = () => setIsOpen(false)

    const menuClass = isOpen ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0'

    return (
      <div className="flex items-start relative">
        <button className="focus:outline-none text-gray-600">
          <small className="flex space-x-1" onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </small>
          <div
            className={`bg-white absolute right-0 top-0 rounded border border-gray-200 transition-all duration-300 transform origin-top-right w-48 ${menuClass}`}
          >
            <MenuLink
              icon={<HiTrendingUp />}
              text="Statistik"
              onClick={() => router.push(`/admin/outlets/${item?.id}/stats`)}
            />
            <MenuLink
              icon={
                <span className="w-4 h-4 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </span>
              }
              text="Edit outlet"
              onClick={() => router.push(`/admin/outlets/${item?.id}`)}
              className="border-t border-gray-300"
            />
            <MenuLink
              icon={
                <span className="w-4 h-4 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </span>
              }
              text="Lihat QR Code"
              onClick={() => {
                setIsOpen(false)
                showQr({ show: true, outlet: item })
              }}
              className="border-t border-gray-300"
            />
            <MenuLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              }
              text="Lihat website"
              onClick={() => router.push(`/${item?.slug}`)}
              className="border-t border-gray-300"
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

  return (
    <div key={`outlet-${index}`}>
      <div className="bg-white md:rounded">
        <span className="flex space-x-4 p-4">
          <img
            src={item?.logo}
            className="w-10 h-10 object-cover rounded-md"
            alt={`${item?.name} logo`}
          />
          <span className="flex flex-col">
            <span className="font-medium">{item?.name}</span>
            <small>{item?.location}</small>
            <small className="text-gray-500">https://menukami.com/{item?.slug}</small>
          </span>
        </span>
        <div className="flex space-x-4 w-full px-4 pb-4 items-center">
          <div className="flex space-x-2 w-full items-center">
            <button
              onClick={() => router.push(`/admin/outlets/${item?.id}/menu`)}
              className={`flex flex-1 rounded border border-gray-200 hover:bg-gray-100 transition duration-300 text-center px-4 py-1 justify-between focus:outline-none text-sm bg-transparent`}
            >
              <div className="text-center w-full">Atur menu</div>
            </button>
            <button
              onClick={() => copy(`https://menukami.com/${item?.slug}`)}
              className={`flex flex-1 rounded border border-gray-200 hover:bg-gray-100 transition duration-300 text-center px-4 py-1 justify-between focus:outline-none text-sm bg-transparent`}
            >
              <div className="text-center w-full">{copied ? 'Copied' : 'Copy link'}</div>
            </button>
          </div>
          <EnhancedMenu />
        </div>
      </div>
    </div>
  )
}

function Admin() {
  const router = useRouter()
  const { user } = useUser()
  const { ref, getPng } = useToImage()

  const { data, isLoading } = useQuery('getMyOutlets', () =>
    fetch('/api/admin/outlets').then((res) => res.json())
  )

  const [qr, setQr] = useState({
    show: false,
    outlet: null,
  })

  if (isLoading) {
    return <FullScreenLoading />
  }
  return (
    <div className="pb-8">
      {qr.show ? (
        <div className="absolute inset-0 flex h-screen z-20 justify-center items-center">
          <div
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
            onClick={() => setQr({ show: false, outlet: null })}
          ></div>
          <div className="max-w-sm bg-gray-100 p-4 rounded flex justify-center items-center flex-col relative">
            <div ref={ref}>
              <div className="bg-white p-8 items-center flex flex-col space-y-4">
                <span className="flex flex-col items-center space-y-3">
                  {/* <img
                    src={qr.outlet.logo}
                    alt="qr outlet logo"
                    className="w-16 h-16 object-cover rounded-lg"
                  /> */}
                  <span className="tracking-tighter font-bold text-xl">Scan for menu</span>
                </span>
                <div className="w-full h-full">
                  {/* <QRCode value={`https://menukami.com/${qr.outlet.slug}`} /> */}
                  <img src={`/api/qr/${qr.outlet.slug}`} alt="" className="w-full h-full" />
                </div>
                <span className="flex items-center space-x-2 text-gray-500 pt-4">
                  <img src="/images/logo-dark.png" className="w-6 h-6" alt="Menukami logo" />
                  <small className="flex flex-col leading-3">
                    <small>powered by</small>
                    <span className="font-bold" style={{ letterSpacing: '-1.75px' }}>
                      menukami
                    </span>
                  </small>
                </span>
              </div>
            </div>
            <div className="w-full mt-4 text-center">
              <RippleButton onClick={getPng}>
                <div
                  className={`flex rounded text-white text-center px-4 py-1 justify-between focus:outline-none text-sm bg-gray-800 cursor-pointer`}
                >
                  <div className="text-center w-full uppercase">Download</div>
                </div>
              </RippleButton>
            </div>
          </div>
        </div>
      ) : null}
      <Header title={null} leftComponent={<Logo />} rightComponent={<LogoutButton />} />
      <div className="space-y-4">
        <MobileLayout>
          {user.email_verified ? (
            <div className="flex flex-col space-y-4">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <Outlet item={item} index={index} key={item.id} showQr={setQr} />
                ))
              ) : (
                <button
                  className="flex space-x-2 justify-center items-center border-2 border-dashed bg-gray-100 p-4 rounded border-gray-300 hover:border-gray-500 text-gray-500  mx-4 md:mx-0 transition duration-300"
                  onClick={() => router.push('/admin/outlets/add')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>Tambah outlet</p>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white p-4 mx-4 md:mx-0 dark:bg-gray-800">
              <p className="text-xl font-bold">Verifikasi email kamu</p>
              <p className="text-gray-500 mt-4">
                Kami telah mengirimkan link untuk verifikasi ke email{' '}
                <span className="text-blue-500">{user.email}</span>
              </p>
              <p className="text-gray-500 mt-4">
                Jika kamu tidak menerima email verifikasi mohon hubungi kami melalui{' '}
                <a className="underline" href="https://twitter.com/menukami">
                  Twitter
                </a>
                ,{' '}
                <a className="underline" href="https://instagram.com/getmenukami">
                  Instagram
                </a>{' '}
                atau email ke{' '}
                <a className="underline" href="mailto:cs@menukami.com">
                  cs@menukami.com
                </a>
              </p>
            </div>
          )}
        </MobileLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(Admin)
