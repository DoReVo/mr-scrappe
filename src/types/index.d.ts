interface ShoppeConfig {
  searchAPIUrl: string
  shopInfoAPIUrl: string
  shopBrowserUrl: string
  qs: queryString
  shopList: shopScrapeInfo[]
}

interface queryString {
  by: string
  entry_point: string
  limit: number
  newest: number
  order: string
  page_type: string
  pdp_l3cat: number
  version: number
}

interface shopScrapeInfo {
  shopId: string
  /** Search query to further narrow down the
   * list of products on the shop homepage */
  searchQuery: string
  /** Array of product name keywords to match */
  productMatch: string[]
  /** Discord channel webhook url, alert message will be send here
   *
   * This will be cloudflare workers environvment variable,
   * typescript will complain that we're using undefiend variable
   *
   */
  discordUrl: string
}
