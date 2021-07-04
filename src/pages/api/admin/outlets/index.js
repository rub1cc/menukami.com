// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get all data
  if (req.method == 'GET') {
    let { data: outlets, error } = await supabase
      .from('outlets')
      .select('*')
      .eq('user_id', user.sub)
    if (outlets) {
      res.status(200).json(outlets)
    } else {
      res.status(400).json(error)
    }
  }

  // create new data
  if (req.method == 'POST') {
    let { data: haveOutlet } = await supabase.from('outlets').select('*').eq('user_id', user.sub)

    if (haveOutlet && haveOutlet.length > 0) {
      return res.status(400).json({ message: 'Anda sudah memiliki outlet yang terdaftar.' })
    }

    let { data: outlets } = await supabase.from('outlets').select('*').eq('slug', req.body.slug)

    if (outlets && outlets.length > 0) {
      return res.status(409).json({ message: 'Custom link telah digunakan. Coba yang lain.' })
    }

    const { data } = await supabase
      .from('outlets')
      .insert([{ ...req.body, user_id: user.sub, created_at: new Date(), updated_at: new Date() }])

    if (data) {
      res.status(200).json({ message: 'Outlet berhasil dibuat' })
    } else {
      res.status(500).json({ message: 'Terjadi kesalahan. Mohon coba beberapa saat lagi.' })
    }
  }
}
