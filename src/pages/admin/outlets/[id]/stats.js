import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'
import { useQuery } from 'react-query'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const Stat = ({ title, count, chartData }) => (
  <div className="p-4 bg-white">
    <p className="uppercase text-xs text-gray-400 tracking-widest">{title}</p>
    <div className="flex items-center space-x-4 mt-4">
      <div className="w-1/2 flex flex-col h-full justify-between">
        <p className="text-3xl">
          {new Intl.NumberFormat('id-ID', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(count)}
        </p>
      </div>
      <div className="w-1/2">
        <Sparklines data={chartData}>
          <SparklinesLine color="#56b45d" style={{ strokeWidth: 3 }} />
        </Sparklines>
      </div>
    </div>
  </div>
)

function App() {
  const router = useRouter()
  const { data, isLoading } = useQuery('getMyOutletStats', () =>
    fetch('/api/track/getView/' + router.query.id).then((res) => res.json())
  )
  if (isLoading) {
    return <FullScreenLoading />
  }

  return (
    <div className="pb-8">
      <Header title={null} leftComponent={<BackButton />} title="Statistik Outlet" />
      <div className="space-y-4">
        <MobileLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-0">
            <Stat title="Total tayang" count={data.totalViews} chartData={data.chart[0]} />
            <Stat title="Total tayangan unik" count={data.totalUnique} chartData={data.chart[1]} />
            <Stat
              title="Total Klik Order via Whatsapp"
              count={data.totalCheckout}
              chartData={data.chart[2]}
            />
          </div>
        </MobileLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(App)
