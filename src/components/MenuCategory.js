import { useQuery } from 'react-query'
import MenuItem from './MenuItem'

function useProducts(id) {
  return useQuery(
    ['getOutletCategoryProducts', id],
    () => fetch(`/api/public/c/${id}`).then((res) => res.json()),
    {
      enabled: !!id,
    }
  )
}

export default function MenuCategory({ name, id, className }) {
  const { data } = useProducts(id)
  if (!data) return null
  return (
    <div className={[className, ' bg-white']}>
      <p className="text-xl font-bold px-4 pt-4">{name}</p>
      <div className="rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4">
          {data?.map((item) => (
            <MenuItem data={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
