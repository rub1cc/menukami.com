import { useAuth0 } from '@auth0/auth0-react'
import MobileLayout from 'layouts/MobileLayout'

function LogoutButton() {
  const { logout } = useAuth0()

  return <button onClick={logout}>Keluar</button>
}

function Header() {
  return (
    <>
      <div className="bg-white fixed inset-x-0 px-4 border">
        <MobileLayout>
          <div className="flex justify-between py-4">
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
              <span>Admin Panel</span>
            </p>
            <LogoutButton />
          </div>
        </MobileLayout>
      </div>
      <div className="h-20"></div>
    </>
  )
}

export default function Admin() {
  return (
    <div className="min-h-screen bg-white px-4">
      <Header />
      <MobileLayout>
        <div className="">
          <img
            src="https://chatfood.imgix.net/static/healthy-bites/assets/cover-upload-1601998162.jpeg"
            alt=""
            className="rounded-lg"
          />
          <div className="mt-4 flex flex-col space-y-4">
            <div>
              <span className="text-sm">Nama toko</span>
              <input
                type="text"
                className="mt-1 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none border"
                placeholder="name"
              />
            </div>
            <div>
              <span className="text-sm">Nama unik halaman</span>
              <label
                className="mt-1 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none border block"
                htmlFor="unique-name"
              >
                <span>https://mnkm.co/menu/</span>
                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  placeholder="nama-unik"
                  id="unique-name"
                />
              </label>
            </div>
            <div>
              <span className="text-sm">Lokasi</span>
              <input
                type="text"
                className="mt-1 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none border"
                placeholder="Jakarta, Indonesia"
              />
            </div>
            <div>
              <span className="text-sm">Nomor telepon</span>
              <input
                type="text"
                className="mt-1 w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none border"
                placeholder="+62812345678"
              />
            </div>
          </div>
        </div>
      </MobileLayout>
    </div>
  )
}
