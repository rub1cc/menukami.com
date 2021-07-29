// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from '@auth0/nextjs-auth0'
import buildQuery from 'utils/buildQuery'
import { supabase } from 'utils/supabaseClient'

export default async function handler(req, res) {
  const { user } = getSession(req, res)

  // get single data
  if (req.method == 'GET') {
    let { data: outlets, error } = buildQuery(
      user,
      await supabase.from('outlets').select('*').eq('id', req.query.id),
      await supabase.from('outlets').select('*').eq('id', req.query.id).eq('user_id', user.sub)
    )

    if (outlets) {
      res.status(200).json(outlets[0])
    } else {
      res.status(404).json(error)
    }
  }

  // update single data
  if (req.method == 'PUT') {
    const { data } = buildQuery(
      user,
      await supabase
        .from('outlets')
        .update({ ...req.body, updated_at: new Date() })
        .eq('id', req.query.id),
      await supabase
        .from('outlets')
        .update({ ...req.body, updated_at: new Date() })
        .eq('id', req.query.id)
        .eq('user_id', user.sub)
    )

    if (data) {
      res.status(200).json({ ok: true, message: 'Data berhasil diupdate' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }

  // delete single data
  if (req.method == 'DELETE') {
    const { data } = buildQuery(
      user,
      await supabase.from('outlets').delete().eq('id', req.query.id),
      await supabase.from('outlets').delete().eq('id', req.query.id).eq('user_id', user.sub)
    )

    if (data) {
      res.status(200).json({ ok: true, message: 'Data berhasil diupdate' })
    } else {
      res.status(500).json({ ok: false, message: 'Terjadi kesalahan. Coba beberapa saat lagi.' })
    }
  }
}
