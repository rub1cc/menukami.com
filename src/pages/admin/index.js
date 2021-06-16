import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import onClickOutside from 'react-onclickoutside'
import { useState } from 'react'
import LogoutButton from 'components/LogoutButton'
import Logo from 'components/Logo'

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

const Outlet = ({ item, index }) => {
  const router = useRouter()
  const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)
    Menu.handleClickOutside = () => setIsOpen(false)

    const menuClass = isOpen ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0'

    return (
      <div className="flex items-start relative">
        <button onClick={() => setIsOpen(true)} className="focus:outline-none text-gray-600">
          <small className="flex space-x-1">
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
              text="Edit"
              onClick={() => router.push(`/admin/outlets/${item?.id}`)}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
              text="Menu"
              onClick={() => router.push(`/admin/outlets/${item?.id}/menu`)}
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
        <span className="flex justify-between p-4">
          <span className="flex flex-col">
            <span className="font-normal">{item?.name}</span>
            <span>{item?.phone}</span>
            <small>
              <span className="text-gray-500">https://menukami.com/{item?.slug}</span>
            </small>
          </span>
          <EnhancedMenu />
        </span>
      </div>
    </div>
  )
}

function Admin() {
  const router = useRouter()
  const { data, isLoading } = useQuery('getMyOutlets', () =>
    fetch('/api/admin/outlets').then((res) => res.json())
  )

  if (isLoading) {
    return <FullScreenLoading />
  }

  return (
    <div className="pb-8">
      <Header title={null} leftComponent={<Logo />} rightComponent={<LogoutButton />} />
      <div className="space-y-4">
        <MobileLayout>
          <div className="flex flex-col space-y-4">
            {data.length > 0 ? (
              data.map((item, index) => <Outlet item={item} index={index} key={item.id} />)
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
        </MobileLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(Admin)
