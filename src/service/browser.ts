import { Browser, DirectNavigationOptions, Page } from "puppeteer";
import { logger } from "../logger";
import puppeteer from "puppeteer-extra";
import { Scrape } from "../types";
import adblockerPlugin from "puppeteer-extra-plugin-adblocker";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

export class BrowserService implements Scrape.BrowserService {
  private browser: Browser;
  private readonly TIMEOUT: number;
  private readonly HEADLESS: boolean;

  constructor(_headless: boolean = true, _timeout: number = 10000) {
    this.TIMEOUT = _timeout;
    this.HEADLESS = _headless;
  }

  /** Use this after creating class instance to get the browser  */
  public getBrowserInstance(): Browser {
    return this.browser;
  }

  /** Create a new page for the browser  */
  public async createPage(
    url: string,
    options: DirectNavigationOptions = { waitUntil: "load" }
  ): Promise<Page> {
    const page = await this.browser.newPage();

    await page.setDefaultNavigationTimeout(this.TIMEOUT);

    try {
      await page.goto(url, options);
    } catch (error) {
      await page.close();
      throw error;
    }

    return page;
  }

  public async init() {
    logger.info(`Puppeteer browser init | HeadlessMode:${this.HEADLESS}`);
    this.browser = await this.startBrowser();
  }

  public async closeBrowser() {
    logger.info(`Trying to close puppeteer browser`);
    if (this.browser) await this.browser.close();
    if (this.browser && this.browser.process() !== null)
      this.browser.process().kill("SIGINT");
    logger.info(`Puppeteer browsed closed`);
  }

  private async startBrowser() {
    logger.info(`Puppeteer browser starting | HeadlessMode:${this.HEADLESS}`);

    // Extend with stealth plugins to avoid detection,
    // addblock plugin to save bandwith
    puppeteer.use(adblockerPlugin()).use(stealthPlugin());

    const browser = await puppeteer.launch({
      headless: this.HEADLESS,
      defaultViewport: null,
    });

    logger.info(
      `Puppeteer browser successfully started | HeadlessMode:${this.HEADLESS}`
    );
    return browser;
  }
}
