// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from '@auth0/nextjs-auth0'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get single data
  if (req.method == 'GET') {
    let { data: product, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (product) {
      res.status(200).json(product[0])
    } else {
      res.status(404).json(error)
    }
  }

  // update single data
  if (req.method == 'PUT') {
    const { data } = await supabase
      .from('product')
      .update(req.body)
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (data) {
      res.status(200).json({ ok: true, message: 'Data berhasil diupdate' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }

  // delete single data
  if (req.method == 'DELETE') {
    const { data } = await supabase
      .from('product')
      .delete()
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (data) {
      res.status(200).json({ ok: true, message: 'Data berhasil diupdate' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }
}
