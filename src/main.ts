import querystring from 'querystring'

import { ShoppeConfig } from './config/Shoppe'
import { logger, alertLogger } from './logger'
import { Shoppe } from './types/Shoppe'
export async function startScrape() {
  try {
    await logger('Start shoppe scrape process')

    // Message to be send to discord
    let msgList: AlertMessage[] = []
    // Scrape shoppe store
    for (const shop of ShoppeConfig.shopList) {
      try {
        // Get shop info
        const shopInfoQs = querystring.encode({ shopid: shop.shopId })
        const shopInfoURL = `${ShoppeConfig.shopInfoAPIUrl}${shopInfoQs}`
        const res = await fetch(shopInfoURL)
        const shopInfo: Shoppe.Shop.Info = await res.json()

        // match_id and keyword will be used as query string
        // when calling shoppe API
        const keyword: string = shop.searchQuery
        const match_id: string = shop.shopId
        const qs = querystring.encode({ ...ShoppeConfig.qs, keyword, match_id })
        const fullUrl = `${ShoppeConfig.searchAPIUrl}${qs}`

        // Call API to search the shop
        const searchRes = await fetch(fullUrl)
        const shopSearchResult: Shoppe.Shop.Search.Result = await searchRes.json()

        await logger(
          `Number of items found: ${shopSearchResult.items.length} | shop id: ${shop} | name : ${shopInfo.data.name}`,
        )

        // Total result length should be same as total_count from API call,
        // Otherwise, there are more pages that we have not retrieve
        const countMatch =
          shopSearchResult.items.length === shopSearchResult.total_count

        if (!countMatch)
          await logger(
            'WARNING!: total_count from API calls does not match number of items returned',
          )

        for (const item of shopSearchResult.items) {
          /* Information to get
            1. Name
            2. Price
            3. Stock
          */
          const info = {
            shop: shopInfo.data.name,
            shopURL: `${ShoppeConfig.shopBrowserUrl}/${shop}/search`,
            name: item.item_basic.name,
            price: (item.item_basic.price / 100000).toFixed(2),
            stock: item.item_basic.stock,
          }

          // Check if product name match with at least 1 of the
          // specified keywords in our config
          for (const keyword of shop.productMatch) {
            const match = item.item_basic.name
              .toLocaleLowerCase()
              .match(keyword)

            if (match && info.stock >= 1) {
              const msg = `Matched found! \nNAME: ${info.name}\nPRICE: RM${info.price}\nSTOCK: ${info.stock}\nSHOP: ${shopInfo.data.name}\nSHOP_URL: ${info.shopURL}`

              msgList.push({ msg, discordUrl: shop.discordUrl })
            }
          }
        }
      } catch (error) {
        await logger(error)
      }
    }

    // Only send message to discord if there is a match
    if (msgList.length !== 0) {
      for (const alertMsg of msgList) {
        // Post message to discord channel
        await alertLogger(alertMsg.msg, alertMsg.discordUrl)
      }
    }

    await logger('Finished shoppe scrape process')
  } catch (error) {
    await logger(error)
  }
}
