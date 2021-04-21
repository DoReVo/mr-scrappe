require('dotenv').config()
import querystring from 'querystring'

import { ShoppeConfig } from './config/Shoppe'
import { fetchWrapper, fetchPostWrapper } from './fetch'
import { logger } from './logger'
import { Shoppe } from './types/Shoppe'
import cron from 'node-cron'
export async function startScrape() {
  try {
    logger.info('Start shoppe scrapping')

    // Message to be send to discord
    let msgList = []
    // Scrape shoppe store
    for (const shop of ShoppeConfig.shopList) {
      const childLogger = logger.child({
        category: 'Shoppe',
        shopId: shop,
      })

      try {
        // Get shop info
        const shopInfoQs = querystring.encode({ shopid: shop })
        const shopInfoURL = `${ShoppeConfig.shopInfoAPIUrl}${shopInfoQs}`
        const shopInfo: Shoppe.Shop.Info = await fetchWrapper(shopInfoURL)

        childLogger.info(
          `Trying to scrape shop | shop id: ${shop} | name: ${shopInfo.data.name}|`,
        )
        // match_id and keyword will be used as query string
        // when calling shoppe API
        const keyword: string = ShoppeConfig.searchQuery
        const match_id: string = shop
        const qs = querystring.encode({ ...ShoppeConfig.qs, keyword, match_id })
        const fullUrl = `${ShoppeConfig.searchAPIUrl}${qs}`

        // Call API to search the shop
        const shopSearchResult: Shoppe.Shop.Search.Result = await fetchWrapper(
          fullUrl,
        )

        childLogger.info(
          `Number of items found: ${shopSearchResult.items.length} | shop id: ${shop} | name : ${shopInfo.data.name}`,
        )

        // Total result length should be same as total_count from API call,
        // Otherwise, there are more pages that we have not retrieve
        const countMatch =
          shopSearchResult.items.length === shopSearchResult.total_count

        if (!countMatch)
          childLogger.warn(
            'total_count from API calls does not match number of items returned',
          )

        for (const item of shopSearchResult.items) {
          /* Information to get
            1. Name
            2. Price
            3. Stock
          */
          const info = {
            shop: shopInfo.data.name,
            shopURL: `${ShoppeConfig.shopBrowserURL}/${shop}/search`,
            name: item.item_basic.name,
            price: (item.item_basic.price / 100000).toFixed(2),
            stock: item.item_basic.stock,
          }

          // Check if product name match with at least 1 of the
          // specified keywords in our config
          for (const keyword of ShoppeConfig.productMatch) {
            const match = item.item_basic.name
              .toLocaleLowerCase()
              .match(keyword)

            if (match) {
              childLogger.info(
                `Matched found! NAME: ${info.name} | PRICE: ${info.price} | SHOP: ${shopInfo.data.name}`,
              )

              const msg = `${'```'}Matched found! \nNAME: ${
                info.name
              }\nPRICE: RM${info.price}\nSTOCK: ${info.stock}\nSHOP: ${
                shopInfo.data.name
              }\nSHOP_URL: ${info.shopURL}${'```'}`

              msgList.push(msg)
            }
          }
        }
      } catch (error) {
        logger.error(error)
      }
    }

    // Only send message to discord if there is a match
    if (msgList.length !== 0) {
      // Send delimeter to channel
      await fetchPostWrapper(process.env.DISCORD_WEBHOOK_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content:
            '------------------------------------------------------------------------------------------------',
        }),
      })

      for (const msg of msgList) {
        // Post message to discord channel
        await fetchPostWrapper(process.env.DISCORD_WEBHOOK_URL as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: msg }),
        })
      }
    }
  } catch (error) {
    logger.error(error)
  }
}

cron
  .schedule('*/10 * * * *', async () => {
    startScrape()
  })
  .start()
