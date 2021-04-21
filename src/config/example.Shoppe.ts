/*
  1. Change config accordingly
  2. Rename this file to Shoppe.ts
*/

export const ShoppeConfig = {
  searchAPIUrl: 'https://shopee.com.my/api/v4/search/search_items?',
  // API to get shop info
  shopInfoAPIUrl: 'https://shopee.com.my/api/v4/shop/get_shop_detail?',
  // Query strings for searchAPIUrl
  qs: {
    by: 'relevancy',
    entry_point: 'ShopByPDP',
    limit: 500,
    newest: 0,
    order: 'desc',
    page_type: 'shop',
    pdp_l3cat: 7200,
    version: 2,
  },
  // Array of shop ids, don't ask how to find
  shopList: [],
  // What to search on at the shop homepage
  searchQuery: '',
  // Array of product name keywords to match
  productMatch: [],
}
