require('dotenv').config()
import querystring from 'querystring'
import { ShoppeConfig } from './config/Shoppe'
import { fetchWrapper } from './fetch'
import { logger } from './logger'

export async function startScrape() {
  try {
    logger.info('Start shoppe scrapping')
    // Scrape shoppe store
    for (const shop of ShoppeConfig.shopList) {
      // Get shop info
      const shopInfoQs = querystring.encode({ shopid: shop })
      const shopInfoURL = `${ShoppeConfig.shopInfoAPIUrl}${shopInfoQs}`
      const childLogger = logger.child({ shopId: shop })

      const response = await fetchWrapper(shopInfoURL)
      console.log(await response.json())

      childLogger.info(`Scrapping shop id: ${shop}`)
      // match_id and keyword will be used as query string
      // when calling shoppe API
      const keyword: string = ShoppeConfig.searchQuery
      const match_id: string = shop
      const qs = querystring.encode({ ...ShoppeConfig.qs, keyword, match_id })
      const fullUrl = `${ShoppeConfig.searchAPIUrl}${qs}`
      childLogger.info(fullUrl)
    }
  } catch (error) {
    logger.error(error)
  }
}

startScrape()
