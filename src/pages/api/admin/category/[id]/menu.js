// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get all data
  if (req.method == 'GET') {
    let { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('category_id', req.query.id)
      .eq('user_id', user.sub)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(500).json(error)
    }
  }
}
