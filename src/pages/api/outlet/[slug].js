// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from 'utils/supabaseClient'

export default async function handler({ query: { slug } }, res) {
  let { data: outlets, error } = await supabase.from('outlets').select('*').eq('slug', slug)

  if (outlets) {
    res.status(200).json(outlets[0])
  } else {
    res.status(404).json(error)
  }
}
