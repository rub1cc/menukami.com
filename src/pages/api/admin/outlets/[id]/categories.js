// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get all data
  if (req.method == 'GET') {
    let { data, error } = await supabase
      .from('category')
      .select('*')
      .eq('outlet_id', req.query.id)
      .eq('user_id', user.sub)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(500).json(error)
    }
  }

  // create new data
  if (req.method == 'POST') {
    const { data } = await supabase
      .from('category')
      .insert([{ ...req.body, outlet_id: req.query.id, user_id: user.sub }])

    if (data) {
      res.status(200).json({ message: 'Kategori berhasil ditambahkan' })
    } else {
      res.status(500).json({ message: 'Terjadi kesalahan. Mohon coba beberapa saat lagi.' })
    }
  }
}
