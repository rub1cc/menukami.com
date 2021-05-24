// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from '@auth0/nextjs-auth0'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)
  if (req.method == 'GET') {
    let { data: outlets, error } = await supabase
      .from('outlets')
      .select('*')
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (outlets) {
      res.status(200).json(outlets[0])
    } else {
      res.status(404).json(error)
    }
  } else if (req.method == 'POST') {
    const { data } = await supabase.from('outlets').update(req.body).eq('id', req.query.id)

    if (data) {
      res.status(200).json({ ok: true, message: 'Data berhasil diupdate' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }
}
