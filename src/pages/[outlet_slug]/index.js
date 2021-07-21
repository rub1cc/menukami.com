import Brand from 'components/Brand'
import MenuCategory from 'components/MenuCategory'
import OrderButton from 'components/OrderButton'
import StoreDetail from 'components/StoreDetail'
import MobileLayout from 'layouts/MobileLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from 'utils/supabaseClient'

const track = (id, unique) =>
  fetch('/api/track/addView', {
    method: 'post',
    body: JSON.stringify({
      outlet_id: id,
      unique,
    }),
  })

function Menu({ data, categories }) {
  const [tab, setTab] = useState('product')

  useEffect(() => {
    localStorage.setItem(
      'menukami_store',
      JSON.stringify({
        name: data?.name,
        slug: data?.slug,
        delivery: data?.delivery,
        phone: data.phone.startsWith('62') ? data.phone : '62' + data.phone,
      })
    )
    const visited = JSON.parse(localStorage.getItem('menukami_visited'))
    const exists = visited?.includes(data?.id)
    if (visited == null) {
      localStorage.setItem('menukami_visited', JSON.stringify([data?.id]))
    } else {
      if (!exists) {
        localStorage.setItem('menukami_visited', JSON.stringify(visited.concat(data?.id)))
      }
    }
    track(data?.id, !exists)
  }, [])

  return (
    <MobileLayout>
      <Head>
        <title>{data.name} - Menukami</title>
        <meta name="title" content={`${data.name} - Menukami`} />
        <meta name="description" content={data.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://menukami.com/${data.slug}`} />
        <meta property="og:title" content={`${data.name} - Menukami`} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.logo} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://menukami.com/${data.slug}`} />
        <meta property="twitter:title" content={`${data.name} - Menukami`} />
        <meta property="twitter:description" content={data.description} />
        <meta property="twitter:image" content={data.logo} />
      </Head>
      <main className="flex flex-col w-full h-screen bg-white">
        <Brand />
        <StoreDetail data={data} />
        <div className="border-b border-gray-200 px-4 mt-4">
          <div className="flex space-x-4">
            <div
              onClick={() => setTab('product')}
              className={`py-2 font-bold text-gray-400 cursor-pointer ${
                tab === 'product' ? 'text-gray-800 border-b-2 border-blue-500' : ''
              }`}
            >
              Produk
            </div>
            <div
              onClick={() => setTab('info')}
              className={`py-2 font-bold text-gray-400 cursor-pointer ${
                tab === 'info' ? 'text-gray-800 border-b-2 border-blue-500' : ''
              }`}
            >
              Info
            </div>
            <div
              onClick={() => setTab('tnc')}
              className={`py-2 font-bold text-gray-400 cursor-pointer ${
                tab === 'tnc' ? 'text-gray-800 border-b-2 border-blue-500' : ''
              }`}
            >
              Syarat & Ketentuan
            </div>
          </div>
        </div>
        {tab === 'product' && (
          <div className="mt-2 space-y-2 bg-white pb-24">
            {categories?.map((item) => (
              <MenuCategory {...item} key={item.id} />
            ))}
          </div>
        )}
        {tab === 'info' && (
          <div className="mt-2 px-4 bg-white pb-24 flex flex-col space-y-2">
            <div>
              <p className=" font-bold pt-4">Deskripsi Outlet</p>
              <span
                className="unreset"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></span>
            </div>
            <div>
              <p className=" font-bold pt-4">Lokasi</p>
              <span>{data.location}</span>
            </div>
            <div>
              <p className=" font-bold pt-4">Terima Pembayaran</p>
              <span>{data.payment}</span>
            </div>
          </div>
        )}
        {tab === 'tnc' && (
          <div className="mt-2 px-4 bg-white pb-24 flex flex-col space-y-2">
            <span
              className="unreset"
              dangerouslySetInnerHTML={{
                __html: data.tnc || '<p>Penjual belum menuliskan syarat & ketentuan</p>',
              }}
            ></span>
          </div>
        )}
      </main>
      <OrderButton phone={data.phone} />
    </MobileLayout>
  )
}

export async function getStaticPaths() {
  try {
    const { data: outlets } = await supabase.from('outlets').select('*')

    const paths = outlets.map((item) => ({
      params: { outlet_slug: item.slug },
    }))

    return { paths, fallback: 'blocking' }
  } catch (er) {
    return { paths: [], fallback: false } // <- ADDED RETURN STMNT
  }
}

export async function getStaticProps({ params }) {
  // Fetch data from external API
  try {
    const res = await fetch(`https://menukami.com/api/public/obs/${params.outlet_slug}`)
    const data = await res.json()

    const res2 = await fetch(`https://menukami.com/api/public/obi/${data.id}/categories`)
    const categories = await res2.json()

    return { props: { data, categories }, revalidate: 10 }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default Menu
