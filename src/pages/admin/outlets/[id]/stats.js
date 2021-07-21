import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'
import { useQuery } from 'react-query'

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
          <div className="grid grid-cols-2 gap-4 mx-4 md:mx-0">
            <div className="p-4 bg-white">
              <p className="uppercase text-xs text-gray-400 tracking-widest">Total tayang</p>
              <p className="text-3xl">{data.totalViews}</p>
            </div>
            <div className="p-4 bg-white">
              <p className="uppercase text-xs text-gray-400 tracking-widest">Tayangan Unik</p>
              <p className="text-3xl">{data.totalUnique}</p>
            </div>
          </div>
        </MobileLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(App)
