import Footer from 'components/Footer'
import FullScreenLoading from 'components/FullScreenLoading'
import MenuCategory from 'components/MenuCategory'
import OrderButton from 'components/OrderButton'
import StoreDetail from 'components/StoreDetail'
import GSheetReader from 'g-sheets-api'
import MobileLayout from 'layouts/MobileLayout'
import * as lodash from 'lodash'
import DefaultErrorPage from 'next/error'
import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Head from 'next/head'

function useMenus(sheet_id) {
  const [menus, setMenus] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    GSheetReader(
      {
        sheetId: sheet_id,
        sheetNumber: 1,
        returnAllResults: false,
      },
      (results) => setMenus(lodash.groupBy(results, 'category')),
      (error) => setError(error)
    )
  }, [sheet_id])

  return { menus, error }
}

function Menu({ router }) {
  const { outlet_slug } = router.query

  if (!outlet_slug) {
    return null
  }

  const { data } = useQuery('getOutletData', () =>
    fetch(`/api/outlet/${outlet_slug}`).then((res) => res.json())
  )

  const { menus } = useMenus(data?.sheet_id)

  console.log(menus)

  if (!data) {
    return <FullScreenLoading />
  }

  if (data.length == 0) {
    return <DefaultErrorPage statusCode={404} />
  }

  sessionStorage.setItem(
    'store_phone',
    data.phone.startsWith('62') ? data.phone : '62' + data.phone
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
        <meta property="og:image" content={data.cover} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://menukami.com/${data.slug}`} />
        <meta property="twitter:title" content={`${data.name} - Menukami`} />
        <meta
          property="twitter:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="twitter:image" content={data.cover} />
      </Head>
      <main className="flex flex-col w-full h-screen">
        <StoreDetail data={data} />

        <div className="mt-2 space-y-2">
          {Object.keys(menus).map((key) => (
            <MenuCategory categoryName={key} items={menus[key]} key={key} />
          ))}
        </div>
        <Footer />
      </main>
      <OrderButton phone={data.phone} />
    </MobileLayout>
  )
}

export default withRouter(Menu)
