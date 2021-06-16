// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  // get all category
  if (req.method == 'GET') {
    let { data, error } = await supabase.from('product').select('*').eq('category_id', req.query.id)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(500).json(error)
    }
  }
}
