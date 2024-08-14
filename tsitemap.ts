import { resolve } from 'path'
import { simpleSitemapAndIndex, EnumChangefreq } from 'sitemap'

const getCurrentDate = () => {
  return new Date().toISOString()
}

simpleSitemapAndIndex({
  hostname: 'https://www.vocaoky.site',
  destinationDir: resolve('./public'),
  sourceData: [
    { url: '/', changefreq: EnumChangefreq.DAILY, lastmodISO: getCurrentDate(), priority: 0.7 },
    { url: '/blogs', changefreq: EnumChangefreq.DAILY, lastmodISO: getCurrentDate(), priority: 0.7 }
  ],
  gzip: false
})
  .then(() => {
    console.log('Sitemap and index generated!')
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error)
  })
