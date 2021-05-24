// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const { user } = getSession(req, res)
  let { data: outlets, error } = await supabase.from('outlets').select('*').eq('user_id', user.sub)
  if (outlets) {
    res.status(200).json(outlets)
  } else {
    res.status(error.code).json(error)
  }
}
