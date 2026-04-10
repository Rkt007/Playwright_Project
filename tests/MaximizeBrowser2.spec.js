import { test, expect } from "@playwright/test";
import { chromium } from "@playwright/test";
import playwrightConfig from "../playwright.config";

test('Set large custom viewport', async () => {

  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  await page.goto('https://www.google.com/');

  console.log(await page.title());

}); 

