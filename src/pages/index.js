import Footer from 'components/Footer'
import MenuCategory from 'components/MenuCategory'
import OrderButton from 'components/OrderButton'
import StoreDetail from 'components/StoreDetail'
import Head from 'next/head'
import { useQuery } from 'react-query'

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
        <StoreDetail data={data} />

        <div className="mt-2 space-y-2">
          {data.menus.map((item, index) => (
            <MenuCategory
              className={index > 0 ? 'mt-6' : 'mt-0'}
              category_name={item.category}
              items={item.items}
              key={`category-${index}`}
            />
          ))}
        </div>
        <Footer />
      </main>
      <OrderButton />
    </>
  )
}
