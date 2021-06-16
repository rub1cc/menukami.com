import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import Price from 'components/Price'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import onClickOutside from 'react-onclickoutside'

const MenuLink = ({ icon, onClick, text, desc, className }) => {
  return (
    <div
      className={`flex space-x-2 items-center hover:text-gray-900 w-full p-4 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <span className="w-4 h-4 text-gray-500">{icon}</span>
      <div className="flex flex-col">
        <span className="font-normal">{text}</span>
        <span>{desc}</span>
      </div>
    </div>
  )
}

const BottomTab = () => {
  const router = useRouter()
  const { id } = router.query
  const addCategory = () => router.push(`/admin/outlets/${id}/add_category`)
  const addMenu = () => router.push(`/admin/outlets/${id}/add_menu`)
  return (
    <MobileLayout className="bg-white divide-y-2">
      <MenuLink
        text="Tambah kategori baru"
        desc="Contoh: Makanan, Minuman, Dessert"
        onClick={addCategory}
      />
      <MenuLink text="Tambah menu baru" desc="Contoh: Nasi + Ayam, Teh Manis" onClick={addMenu} />
    </MobileLayout>
  )
}

const Product = ({ item, index }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div key={`menu-${index}`}>
      <div className="bg-white md:rounded flex space-x-4">
        <div className="p-4 border border-gray-200 rounded-md">
          <img src={item.image} alt="" className="w-10 h-10 object-cover" />
        </div>
        <div>
          <span className="font-normal text-left">{item?.name}</span>
          <Price data={item} />
          <button
            className="text-blue-500 text-left"
            onClick={() => router.push(`/admin/outlets/${id}/menu/${item.id}`)}
          >
            Edit menu
          </button>
        </div>
      </div>
    </div>
  )
}

const CategoryItems = ({ id }) => {
  const router = useRouter()
  const { data, isLoading } = useQuery(['getMyOutletMenuProducts', id], () =>
    fetch(`/api/admin/category/${id}/menu`).then((res) => res.json())
  )

  if (isLoading) return <p>Sedang memuat</p>

  return data.length > 0 ? (
    data.map((item, index) => <Product item={item} index={index} key={item.id} />)
  ) : (
    <button
      className="flex space-x-2 justify-center items-center border-2 border-dashed bg-gray-100 p-4 rounded border-gray-300 hover:border-gray-500 text-gray-500 transition duration-300"
      onClick={() => router.push(`/admin/outlets/${id}/add_menu`)}
    >
      <p>
        Kategori ini belum ada menu-nya, <span className="text-gray-900">yuk buat sekarang</span>
      </p>
    </button>
  )
}

const Category = ({ item, index }) => {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const chevUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const chevDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  return (
    <div className="w-full bg-white">
      <div key={`menu-${index}`} className="w-full">
        <div className="bg-white md:rounded">
          <span className="flex justify-between items-center p-4">
            <div className="flex flex-col text-left">
              <span className="font-normal">{item?.name}</span>
              <button
                className="text-blue-500 text-left"
                onClick={() => router.push('/admin/category/' + item.id)}
              >
                Edit kategori
              </button>
            </div>
            <button onClick={() => setIsCollapsed((old) => !old)}>
              <span className="text-gray-500">{isCollapsed ? chevDown : chevUp}</span>
            </button>
          </span>
        </div>
      </div>
      {isCollapsed ? null : (
        <div className="p-4 space-y-2">
          <CategoryItems id={item?.id} key={item?.id} />
        </div>
      )}
    </div>
  )
}

function App() {
  const router = useRouter()
  const [isShowBottomTab, setIsShowBottomTab] = useState(false)

  const { id } = router.query
  const { data, isLoading } = useQuery(['getMyOutletMenus', id], () =>
    fetch(`/api/admin/outlets/${id}/categories`).then((res) => res.json())
  )

  if (isLoading) {
    return <FullScreenLoading />
  }

  const _handleClickOutside = () => setIsShowBottomTab(false)

  const EnhancedBottomTab = onClickOutside(BottomTab, {
    excludeScrollbar: true,
    handleClickOutside: () => _handleClickOutside,
  })

  const bottomTabClasses = isShowBottomTab ? 'block' : 'hidden'

  return (
    <div className="pb-8">
      <Header
        title={null}
        leftComponent={<BackButton />}
        title="Pengaturan Menu"
        rightComponent={
          <button className="w-full my-4" onClick={() => setIsShowBottomTab(true)}>
            <div
              className={`flex rounded text-white text-center px-4 py-1 justify-between focus:outline-none text-sm bg-gray-800`}
            >
              <div className="text-center w-full uppercase">Tambah</div>
            </div>
          </button>
        }
      />
      <div className="space-y-4">
        <MobileLayout>
          <div className="flex flex-col space-y-1 relative">
            {data.length > 0 ? (
              data.map((item, index) => <Category item={item} index={index} key={item.id} />)
            ) : (
              <button
                className="flex space-x-2 justify-center items-center border-2 border-dashed bg-gray-100 p-4 rounded border-gray-300 hover:border-gray-500 text-gray-500 transition duration-300 mx-4 md:mx-0"
                onClick={() => setIsShowBottomTab(true)}
              >
                <p>
                  Outlet kamu belum punya menu nih,{' '}
                  <span className="text-gray-900">yuk buat sekarang</span>
                </p>
              </button>
            )}
          </div>
        </MobileLayout>
      </div>
      {isShowBottomTab ? (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10"></div>
      ) : null}
      <div
        className={`absolute bottom-0 inset-x-0 transition-all duration-300 transform z-20 ${bottomTabClasses}`}
      >
        <EnhancedBottomTab isShow={isShowBottomTab} />
      </div>
    </div>
  )
}

export default withPageAuthRequired(App)
