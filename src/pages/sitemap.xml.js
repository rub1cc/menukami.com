import fs from 'fs'
import { supabase } from 'utils/supabaseClient'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: 'http://localhost:3000',
    production: 'https://menukami.com',
  }[process.env.NODE_ENV]

  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return ![
        '_app.js',
        '_document.js',
        '_error.js',
        '[outlet_slug]',
        'admin',
        'api',
        'privacy.js',
        'index.js',
        'sitemap',
      ].includes(staticPage)
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`
    })

  const { data } = await supabase.from('outlets').select('*')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
      ${data
        .map(({ slug, updated_at }) => {
          return `
              <url>
                <loc>${baseUrl}/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
              </url>
            `
        })
        .join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
