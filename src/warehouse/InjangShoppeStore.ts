import { Scrape } from "../types/index";
import { load } from "cheerio";
import {
  SHOPPE_STORE_CARD_ITEM,
  SHOPPE_STORE_NEXT_PAGE_BTN,
  SHOPPE_STORE_PRODUCT_PRICE,
  SHOPPE_STORE_PRODUCT_TITLE,
} from "../constant";
import { logger } from "../logger";

export const InjangStore: Scrape.Item = {
  scrape: async (browser) => {
    // Injang nation store page
    const pageUrl = "https://shopee.com.my/shop/250860104/search";
    // Go to store page
    const storePage = await browser.newPage();
    await storePage.goto(pageUrl, { waitUntil: "networkidle0" });

    let maxPageReached = false;
    let products = [];

    while (!maxPageReached) {
      // Parse HTML and load into cheerio
      const html = await storePage.content();
      const $ = load(html);
      const nextBtn = await storePage.$(SHOPPE_STORE_NEXT_PAGE_BTN);
      // Find product cards on the current page
      const productCard = $(SHOPPE_STORE_CARD_ITEM);
      // Parse html with cheerio and find title / price
      productCard.each((i, elem) => {
        const title = $(elem).find(SHOPPE_STORE_PRODUCT_TITLE).text();
        const price = $(elem).find(SHOPPE_STORE_PRODUCT_PRICE).text();
        products.push({ title, price });
      });

      try {
        // Try to go to next page
        await Promise.all([
          storePage.waitForNavigation({
            waitUntil: "networkidle2",
            timeout: 5000,
          }),
          nextBtn.click(),
          storePage.waitForSelector(SHOPPE_STORE_NEXT_PAGE_BTN, {
            timeout: 5000,
          }),
        ]);
      } catch (error) {
        const date = new Date().toISOString();

        maxPageReached = true;
        if (error.message === "Navigation timeout of 5000 ms exceeded") {
          logger.info(`Max page reached: ${storePage.url()}`);
          await storePage.screenshot({
            fullPage: true,
            path: `./src/screenshots/${date}.png`,
          });
        } else {
          logger.error(error);
          await storePage.screenshot({
            fullPage: true,
            path: `./src/screenshots/${date}-error.png`,
          });
        }
      }
    }
    logger.info(`Finished running yx-comp-store cron`);
    // products.forEach((p) => logger.info(`${p.title} ${p.price}`));
  },
};
