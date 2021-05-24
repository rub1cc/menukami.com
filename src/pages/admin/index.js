import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

function LogoutButton() {
  return (
    <span className="inline-block w-full text-right">
      <a href="/api/auth/logout" className="px-2 rounded text-sm focus:outline-none">
        Logout
      </a>
    </span>
  )
}

function Logo() {
  return (
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
  )
}

function Admin() {
  const router = useRouter()
  const { data, isLoading } = useQuery('getMyOutlets', () =>
    fetch('/api/data').then((res) => res.json())
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
            {data.map((item, index) => (
              <div key={`outlet-${index}`}>
                <div className="bg-white mx-4 md:mx-0 rounded-lg shadow-lg overflow-hidden">
                  <span className="flex justify-between items-center p-4">
                    <span className="flex flex-col">
                      <span>{item?.name}</span>
                      <small>
                        <span className="text-gray-500">https://menukami.com/{item?.slug}</span>
                      </small>
                    </span>
                    <div className="space-x-3 flex items-center">
                      <button
                        onClick={() => router.push(`/admin/outlet/${item?.id}`)}
                        className="focus:outline-none hover:text-gray-900 text-gray-600"
                      >
                        <small className="flex space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
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
                        </small>
                      </button>
                      <a
                        href={`/${item?.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none hover:text-gray-900 text-gray-600"
                      >
                        <small className="flex space-x-1 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </small>
                      </a>
                    </div>
                  </span>
                </div>
              </div>
            ))}
            {data?.length == 0 ? (
              <button
                className="flex space-x-2 justify-center items-center border-2 border-dashed bg-gray-100 p-4 rounded-md border-gray-300 hover:border-gray-500 text-gray-500  mx-4 md:mx-0 transition duration-300"
                onClick={() => router.push('/admin/outlet/add')}
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
            ) : null}
          </div>
        </MobileLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(Admin)
