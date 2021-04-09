import { Browser } from "puppeteer";

export declare namespace Scrape {
  interface Item {
    scrape: (browser: Browser) => void;
  }
}
