import Link from 'next/link'

export default function Brand() {
  return (
    <div className="bg-white p-4 flex items-center">
      <Link href="https://menukami.com/">
        <span className="flex items-center space-x-2 text-gray-500 flex-1 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500 bg-gray-200 rounded-full p-1"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          <small className="flex flex-col leading-3">
            <small>powered by</small>
            <span className="tracking-tighter font-bold">menukami</span>
          </small>
        </span>
      </Link>
    </div>
  )
}
