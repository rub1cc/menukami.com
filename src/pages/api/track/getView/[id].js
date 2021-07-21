import { getSession } from '@auth0/nextjs-auth0'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)
  if (req.method === 'GET') {
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
    }
    const { data, error } = await supabase
      .from('outlet-view')
      .select('*')
      .eq('outlet_id', req.query.id)
    if (data) {
      res
        .status(200)
        .json({ totalViews: data.length, totalUnique: data.filter((item) => item.unique).length })
    } else {
      res.status(500).json(error)
    }
  }
}
