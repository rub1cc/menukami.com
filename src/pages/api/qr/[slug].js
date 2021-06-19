// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var qr = require('qr-image')

export default async function handler(req, res) {
  const { slug } = req.query

  var code = qr.image('https://menukami.com/' + slug, { type: 'png', size: 9, margin: 1 })
  res.setHeader('Content-type', 'image/png') //sent qr image to client side
  code.pipe(res)
}
