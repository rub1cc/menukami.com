import { HiBadgeCheck, HiLocationMarker } from 'react-icons/hi'

export default function StoreDetail({ data }) {
  const { name, logo, verified, location } = data
  return (
    <div className="w-full flex p-4 space-x-4">
      <img src={logo} alt={name} className="w-20 h-20 object-cover rounded-full" />
      <div className="flex flex-col space-y-1 bg-white relative flex-1">
        <p className="text-2xl font-bold leading-none">{name}</p>
        <p className="flex space-x-2 items-start" title="Metode pembayaran">
          <span>
            <HiLocationMarker className="text-gray-500 mt-1" />
          </span>
          <span>{location}</span>
        </p>
        {verified && (
          <p className="flex space-x-2 items-start">
            <span>
              <HiBadgeCheck className="mt-1 text-yellow-500" />
            </span>
            <span className="text-yellow-500 font-medium">Verified Merchant</span>
          </p>
        )}
      </div>
    </div>
  )
}
