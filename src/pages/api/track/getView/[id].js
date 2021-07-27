import { getSession } from '@auth0/nextjs-auth0'
import _ from 'lodash'
import moment from 'moment'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)
  if (req.method === 'GET') {
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
    }
    const { data, error } = await supabase
      .from('eventLog')
      .select('*')
      .eq('outlet_id', req.query.id)

    if (data) {
      const getViewsChartData = () => {
        const chartData = _.groupBy(
          data.filter((item) => item.event == 'page-view'),
          function (item) {
            return moment(item.created_at).format('YYYY-MM-DD')
          }
        )
        return Array.from({ length: 7 })
          .fill()
          .map(
            (_, index) => chartData[moment().subtract(index, 'd').format('YYYY-MM-DD')]?.length ?? 0
          )
          .reverse()
      }

      const getUniqueViewsChartData = () => {
        const chartData = _.groupBy(
          data.filter((item) => item.event == 'page-view' && item.unique),
          function (item) {
            return moment(item.created_at).format('YYYY-MM-DD')
          }
        )
        return Array.from({ length: 7 })
          .fill()
          .map(
            (_, index) => chartData[moment().subtract(index, 'd').format('YYYY-MM-DD')]?.length ?? 0
          )
          .reverse()
      }

      const getCheckoutChartData = () => {
        const chartData = _.groupBy(
          data.filter((item) => item.event == 'checkout'),
          function (item) {
            return moment(item.created_at).format('YYYY-MM-DD')
          }
        )
        return Array.from({ length: 7 })
          .fill()
          .map(
            (_, index) => chartData[moment().subtract(index, 'd').format('YYYY-MM-DD')]?.length ?? 0
          )
          .reverse()
      }

      res.status(200).json({
        totalViews: data.filter((item) => item.event == 'page-view').length,
        totalUnique: data.filter((item) => item.event == 'page-view' && item.unique).length,
        totalCheckout: data.filter((item) => item.event == 'checkout').length,
        chart: [getViewsChartData(), getUniqueViewsChartData(), getCheckoutChartData()],
      })
    } else {
      res.status(500).json(error)
    }
  }
}
