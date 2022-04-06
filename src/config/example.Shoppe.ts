/*
  1. Change config accordingly
  2. Rename this file to Shoppe.ts
*/

export const ShoppeConfig: ShoppeConfig = {
  searchAPIUrl: 'https://shopee.com.my/api/v4/search/search_items?',
  // API to get shop info
  shopInfoAPIUrl: 'https://shopee.com.my/api/v4/shop/get_shop_detail?',
  // URL to be pasted into browser to go to the shop,
  // Must be concat with /:shopid/search. So end result will look like,
  // https://shopee.com.my/shop/:shopid/search
  shopBrowserUrl: 'https://shopee.com.my/shop',
  // Query strings for searchAPIUrl
  qs: {
    by: 'relevancy',
    entry_point: 'ShopByPDP',
    limit: 100,
    newest: 0,
    order: 'desc',
    page_type: 'shop',
    pdp_l3cat: 7200,
    version: 2,
  },
  /**
   * I prefer passing discordUrl as environment variable to
   * cloudflare worker. And if you do that, the way to use that
   * environment variable is just to consider the key like a variable
   * that you never declare, yes typescript will complain, but once
   * the code is build, it will work.
   *
   * EXAMPLE: 
   * {
   *  shopId: '12345',
   *  shopName: 'My name'
   *  searchQuery: 'ryzen',
   *  productMatch: ['2600', '2600'],
   *  discordUrl: CPU_CHANNEL,
   * }, 
   * CPU_CHANNEL is the name of the environment variable you specifed in
   * cloudflare worker, use it like any javascript variable, except that you 
   * never declare them, and typescript will complain, but it works
   */
  shopList: [
    // { shopId: '', searchQuery: '', productMatch: [],discordUrl: },
    // { shopId: '', searchQuery: '', productMatch: [], discordUrl:},
  ],
}
