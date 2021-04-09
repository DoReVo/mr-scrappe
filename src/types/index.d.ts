import { Browser, DirectNavigationOptions, Page } from "puppeteer";

export declare namespace Scrape {
  interface Item {
    scrape: (browser: Browser) => void;
  }

  interface BrowserService {
    init: () => void;
    closeBrowser: () => void;
    getBrowserInstance: () => Browser;
    createPage(url: string, options: DirectNavigationOptions): Promise<Page>;
  }
}
