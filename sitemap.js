import { resolve } from 'path'
import { simpleSitemapAndIndex, EnumChangefreq } from 'sitemap'

simpleSitemapAndIndex({
  hostname: 'https://www.vocaoky.site',
  destinationDir: resolve('./public'),
  sourceData: [
    { url: '/', changefreq: EnumChangefreq.DAILY },
    { url: '/blogs', changefreq: EnumChangefreq.DAILY }
  ]
})
  .then(() => {
    console.log('Sitemap and index generated!')
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error)
  })
