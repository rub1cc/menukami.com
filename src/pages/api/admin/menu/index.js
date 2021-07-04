// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // create new data
  if (req.method == 'POST') {
    const { data } = await supabase
      .from('product')
      .insert([{ ...req.body, user_id: user.sub, created_at: new Date(), updated_at: new Date() }])

    if (data) {
      res.status(200).json({ message: 'Produk berhasil ditambahkan' })
    } else {
      res.status(500).json({ message: 'Terjadi kesalahan. Mohon coba beberapa saat lagi.' })
    }
  }
}
