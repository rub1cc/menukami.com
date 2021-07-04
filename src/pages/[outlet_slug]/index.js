import Brand from 'components/Brand'
import FullScreenLoading from 'components/FullScreenLoading'
import MenuCategory from 'components/MenuCategory'
import OrderButton from 'components/OrderButton'
import StoreDetail from 'components/StoreDetail'
import MobileLayout from 'layouts/MobileLayout'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'

function useMenus(id) {
  return useQuery(
    ['getOutletCategories', id],
    () => fetch(`/api/public/obi/${id}/categories`).then((res) => res.json()),
    {
      enabled: !!id,
    }
  )
}

function Menu({ router }) {
  const { outlet_slug } = router.query

  if (!outlet_slug) {
    return null
  }
  const [tab, setTab] = useState('product')

  const { data } = useQuery('getOutletData', () =>
    fetch(`/api/public/obs/${outlet_slug}`).then((res) => res.json())
  )

  const outlet_id = data?.id

  const { data: categories } = useMenus(outlet_id)

  if (!data || !categories) {
    return <FullScreenLoading />
  }

  if (data.length == 0) {
    return <DefaultErrorPage statusCode={404} />
  }

  sessionStorage.setItem(
    'menukami_store',
    JSON.stringify({
      name: data?.name,
      phone: data.phone.startsWith('62') ? data.phone : '62' + data.phone,
    })
  )

  return (
    <MobileLayout>
      <Head>
        <title>{data.name} - Menukami</title>
        <meta name="title" content={`${data.name} - Menukami`} />
        <meta
          name="description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://menukami.com/${data.slug}`} />
        <meta property="og:title" content={`${data.name} - Menukami`} />
        <meta
          property="og:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="og:image" content={data.logo} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://menukami.com/${data.slug}`} />
        <meta property="twitter:title" content={`${data.name} - Menukami`} />
        <meta
          property="twitter:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
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

export default withRouter(Menu)
