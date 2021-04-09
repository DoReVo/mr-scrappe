require("dotenv").config();
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import items from "./warehouse/index";
import * as cron from "node-cron";

async function main() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const shoppeMain = await browser.newPage();
  // Go to shoppe and select language
  await shoppeMain.goto("https://shopee.com.my");
  try {
    await shoppeMain.click(".language-selection__list-item button");
  } catch (error) {
    console.log("No select language modal found");
  }

  // List of items to scrape
  for (const item of items) {
    await item.scrape(browser);
  }

  await browser.close();
}

// logger.info("Starting server...");
// main();

cron.schedule("* * * * *", async () => {
  await main();
});
