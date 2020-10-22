import Head from 'next/head'
import { useQuery } from 'react-query'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function StoreDetail({ name, image, location }) {
  return (
    <div className="w-full">
      <img
        src={image}
        alt={name}
        className="rounded-full w-40 h-40 shadow-lg mx-auto object-cover"
      />
      <p className="text-3xl font-bold mt-4 text-center">{name}</p>
      <div className="grid grid-cols-3 col-gap-2 mt-2">
        <a className="bg-white shadow-lg p-2 rounded-lg text-center text-sm" href={`${location}`}>
          Chat
        </a>
        <a className="bg-white shadow-lg p-2 rounded-lg text-center text-sm" href={`${location}`}>
          Petunjuk Arah
        </a>
        <CopyToClipboard text="kjsaldjlsdjlasd" onCopy={() => alert('Link copied to clipboard')}>
          <button className="bg-white shadow-lg p-2 rounded-lg text-center text-sm">Bagikan</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

function MenuSection({ category_name, items, className }) {
  return (
    <div className={className}>
      <p className="text-2xl font-bold">{category_name}</p>
      <div className="shadow-lg rounded-lg overflow-hidden space-y-1 mt-2">
        {items.map((item, index) => (
          <MenuItem
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            key={`menu-item-${index}`}
          />
        ))}
      </div>
    </div>
  )
}

function MenuItem({ name, image, price, description }) {
  return (
    <div className="flex p-3 bg-white space-x-3">
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded-lg" />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-gray-600 truncate-3-lines">{description}</p>
        </div>
        <p className="font-bold">{price}</p>
      </div>
    </div>
  )
}

function OrderButton() {
  return (
    <div className="fixed bottom-0 inset-x-0 mb-4 max-w-md mx-auto">
      <div className="flex rounded-lg text-white text-center bg-green-500 p-4  justify-between mx-4">
        <p className="font-bold">1 item</p>
        <span className="flex space-x-1 items-center justify-center">
          <p className="font-bold">350.000 IDR</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const { data } = useQuery('fetchData', () => fetch('/api/data').then((res) => res.json()))

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Next + Tailwind CSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full h-screen">
        <StoreDetail name={data.name} image={data.banner} location={data.location} />

        <div className="mt-8 pb-4">
          {data.menus.map((item, index) => (
            <MenuSection
              className={index > 0 ? 'mt-6' : 'mt-0'}
              category_name={item.category}
              items={item.items}
              key={`category-${index}`}
            />
          ))}
        </div>
      </main>
      <OrderButton />
    </>
  )
}
