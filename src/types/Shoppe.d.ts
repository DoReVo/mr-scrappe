export namespace Shoppe {
  namespace Shop {
    interface Info {
      data: Data
      error: number
      error_msg: string
      version: string
    }

    interface Data {
      ctime: number
      mtime: number
      country: string
      last_active_time: number
      is_shopee_verified: boolean
      is_official_shop: boolean
      chat_disabled: boolean
      disable_make_offer: number
      enable_display_unitno: boolean
      cover: string
      rating_normal: number
      rating_bad: number
      rating_good: number
      description: string
      is_semi_inactive: boolean
      preparation_time: number
      cancellation_rate: number
      buyer_rating: Buyerrating
      vacation: boolean
      show_low_fulfillment_warning: boolean
      show_official_shop_label: boolean
      show_official_shop_label_in_title: boolean
      show_shopee_verified_label: boolean
      status: number
      cb_option: number
      has_decoration: boolean
      shop_location: string
      rating_star: number
      show_live_tab: boolean
      has_flash_sale: boolean
      userid: number
      shopid: number
      name: string
      item_count: number
      follower_count: number
      response_rate: number
      response_time: number
      account: Account
      has_shopee_flash_sale: boolean
      has_in_shop_flash_sale: boolean
      has_brand_sale: boolean
      is_preferred_plus_seller: boolean
      show_new_arrival_items: boolean
      new_arrival_items_start_ts: number
    }

    interface Account {
      username: string
      following_count: number
      portrait: string
      is_seller: boolean
      phone_verified: boolean
      email_verified: boolean
      fbid: string
      total_avg_star: number
      hide_likes: number
      feed_account_info: Feedaccountinfo
      status: number
    }

    interface Feedaccountinfo {
      can_post_feed: boolean
    }

    interface Buyerrating {
      rating_count: number[]
      rating_star: number
    }

    namespace Search {
      interface Result {
        adjust: Adjust
        algorithm: string
        disclaimer_infos: any[]
        error?: any
        error_msg?: any
        hint_keywords?: any
        items: Item[]
        json_data: string
        low_result: Lowresult
        need_next_search: boolean
        nomore: boolean
        price_adjust?: any
        query_rewrite: Queryrewrite
        reserved_keyword?: any
        show_disclaimer: boolean
        suggestion_algorithm?: any
        total_ads_count: number
        total_count: number
      }

      interface Queryrewrite {
        fe_query_write_status: number
        rewrite_keyword: string
        hint_keywords?: any
        ori_keyword: string
        ori_total_count: number
        rewrite_type: number
      }

      interface Lowresult {
        triggered: boolean
        scenarios?: any
        total_organic_count: number
        pre_lrp_total_organic_count: number
      }

      interface Item {
        item_basic: Itembasic
        adsid?: any
        campaignid?: any
        distance?: any
        match_type?: any
        ads_keyword?: any
        deduction_info?: any
        collection_id?: any
        display_name?: any
        campaign_stock?: any
        json_data: string
        tracking_info: Trackinginfo
        itemid: number
        shopid: number
        algo_image?: any
        fe_flags?: any
      }

      interface Trackinginfo {
        viral_spu_tracking?: any
        business_tracking?: any
        multi_search_tracking: number[]
        groupid: number
        ruleid: number[]
      }

      interface Itembasic {
        itemid: number
        shopid: number
        name: string
        label_ids: number[]
        image: string
        images: string[]
        currency: string
        stock: number
        status: number
        ctime: number
        sold: number
        historical_sold: number
        liked: boolean
        liked_count: number
        view_count: number
        catid: number
        brand?: string
        cmt_count: number
        flag: number
        cb_option: number
        item_status: string
        price: number
        price_min: number
        price_max: number
        price_min_before_discount: number
        price_max_before_discount: number
        hidden_price_display?: any
        price_before_discount: number
        has_lowest_price_guarantee: boolean
        show_discount: number
        raw_discount: number
        discount?: any
        is_category_failed: boolean
        size_chart?: any
        video_info_list?: any
        tier_variations: Tiervariation[]
        item_rating: Itemrating
        item_type: number
        reference_item_id: string
        transparent_background_image: string
        is_adult: boolean
        badge_icon_type: number
        shopee_verified: boolean
        is_official_shop: boolean
        show_official_shop_label: boolean
        show_shopee_verified_label: boolean
        show_official_shop_label_in_title: boolean
        is_cc_installment_payment_eligible: boolean
        is_non_cc_installment_payment_eligible: boolean
        coin_earn_label?: any
        show_free_shipping: boolean
        preview_info?: any
        coin_info?: any
        exclusive_price_info?: any
        bundle_deal_id: number
        can_use_bundle_deal: boolean
        bundle_deal_info?: any
        is_group_buy_item?: any
        has_group_buy_stock?: any
        group_buy_info?: any
        welcome_package_type: number
        welcome_package_info?: any
        add_on_deal_info?: any
        can_use_wholesale: boolean
        is_preferred_plus_seller: boolean
        shop_location: string
        has_model_with_available_shopee_stock: boolean
        voucher_info?: any
        can_use_cod: boolean
        is_on_flash_sale: boolean
        spl_installment_tenure?: any
      }

      interface Itemrating {
        rating_star: number
        rating_count: number[]
        rcount_with_context: number
        rcount_with_image: number
      }

      interface Tiervariation {
        name: string
        options: string[]
        images?: any
        properties: any[]
        type: number
      }

      interface Adjust {
        count?: any
      }
    }
  }
}
