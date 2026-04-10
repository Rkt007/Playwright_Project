import { test, expect } from "@playwright/test";

test.use({
  headless: false,
  viewport: null,
  launchOptions: {
    args: ['--start-maximized']
  }
});

test('Maximize browser using args (simulated)', async ({ page }) => {

  await page.goto('https://www.google.com/');
  console.log(await page.title());

});

//if we maximize the browser , need to modify the playwrightConfig.js 

// need to remove this line ---->// use: { ...devices['Desktop Chrome'] },