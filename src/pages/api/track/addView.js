import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const columns = [
      {
        ...JSON.parse(req.body),
        created_at: new Date(),
        params: { request_headers: req.headers },
      },
    ]
    const { data, error } = await supabase.from('outlet-view').insert(columns)
    if (data) {
      res.status(200).json({ ok: true })
    } else {
      res.status(500).json(error)
    }
  }
}
