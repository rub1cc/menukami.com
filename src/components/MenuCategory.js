import MenuItem from './MenuItem'

export default function MenuCategory({ category_name, items, className }) {
  return (
    <div className={[className, ' bg-white']}>
      <p className="text-xl font-bold px-4 pb-2 pt-4">{category_name}</p>
      <div className="rounded-lg overflow-hidden mt-2">
        {items.map((item, index) => (
          <MenuItem data={item} key={`menu-item-${index}`} />
        ))}
      </div>
    </div>
  )
}
