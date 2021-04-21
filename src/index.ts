import { startScrape } from './main'

addEventListener('fetch', (event) => {
  event.respondWith(new Response('Mr-Scrappe is running'))
})

addEventListener('scheduled', (event) => {
  event.waitUntil(startScrape())
})
