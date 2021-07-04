// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from '@auth0/nextjs-auth0'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get single outlet data
  if (req.method == 'GET') {
    let { data: category, error } = await supabase
      .from('category')
      .select('*')
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (category) {
      res.status(200).json(category[0])
    } else {
      res.status(404).json(error)
    }
  }

  // update single outlet data
  if (req.method == 'PUT') {
    const { data } = await supabase
      .from('category')
      .update({ ...req.body, updated_at: new Date() })
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
    await supabase.from('product').delete().eq('category_id', req.query.id).eq('user_id', user.sub)

    const { data: category } = await supabase
      .from('category')
      .delete()
      .eq('id', req.query.id)
      .eq('user_id', user.sub)

    if (category) {
      res.status(200).json({ ok: true, message: 'Data berhasil dihapus' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }
}
