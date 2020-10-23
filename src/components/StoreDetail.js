export default function StoreDetail({ data }) {
  const { name, banner, location } = data
  return (
    <div className="w-full bg-white">
      <img src={banner} alt={name} className="w-full h-64 object-cover" />
      <div className="py-5 px-5">
        <p className="text-2xl font-bold">{name}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  )
}
