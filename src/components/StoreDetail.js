export default function StoreDetail({ data }) {
  const { name, cover, payment, description } = data
  return (
    <div className="w-full">
      <img src={cover} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4 m-4 flex flex-col space-y-1 -mt-20 bg-white shadow-lg rounded-md border border-gray-200 relative">
        <p className="text-2xl font-bold mb-2">{name}</p>
        <p className="flex space-x-4" title="Informasi Outlet">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span>{description}</span>
        </p>
        <p className="flex space-x-4" title="Metode pembayaran">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </span>
          <span>{payment}</span>
        </p>
      </div>
    </div>
  )
}
