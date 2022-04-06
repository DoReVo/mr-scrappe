import querystring from 'querystring'

import { ShoppeConfig } from './config/Shoppe'
import { alertLogger } from './logger'
import { Shoppe } from './types/Shoppe'
export async function startScrape() {
  try {
    // Message to be send to discord
    let msgList: AlertMessage[] = []
    // Scrape shoppe store
    for (const shop of ShoppeConfig.shopList) {
      try {
        // match_id and keyword will be used as query string
        // when calling shoppe API
        const keyword: string = shop.searchQuery
        const match_id: string = shop.shopId
        const qs = querystring.encode({ ...ShoppeConfig.qs, keyword, match_id })
        const fullUrl = `${ShoppeConfig.searchAPIUrl}${qs}`

        // Call API to search the shop
        const searchRes = await fetch(fullUrl)
        const shopSearchResult: Shoppe.Shop.Search.Result = await searchRes.json()

        for (const item of shopSearchResult.items) {
          /* Information to get
            1. Name
            2. Price
            3. Stock
          */
          const info = {
            shop: shop.shopName,
            shopURL: `${ShoppeConfig.shopBrowserUrl}/${shop.shopId}/search`,
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
              const msg = `NAME: ${info.name}\nPRICE: RM${info.price}\nSTOCK: ${info.stock}\nSHOP: ${shop.shopName}\nSHOP_URL: ${info.shopURL}`

              msgList.push({ msg, discordUrl: shop.discordUrl })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    // Only send message to discord if there is a match
    if (msgList.length !== 0) {
      for (const alertMsg of msgList) {
        // Post message to discord channel
        await alertLogger(alertMsg.msg, alertMsg.discordUrl)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
