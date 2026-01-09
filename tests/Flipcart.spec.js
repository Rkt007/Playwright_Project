import { test, expect } from '@playwright/test';

test('Flipkart search product test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.keyboard.press('Escape');

  const searchBox = page.getByPlaceholder(
    'Search for products, brands and more'
  );

  await searchBox.fill('iphone');
  await searchBox.press('Enter');

  const allIphones = page.locator('//div[@class="ZFwe0M row"]');
  const count = await allIphones.count();
await page.waitForTimeout(5000);
  console.log(`Total iPhone products found: ${count}`);

  for (let i = 0; i < count; i++) {
    const phoneName = await allIphones.nth(i).textContent();
    console.log(`${i + 1}. ${phoneName?.trim()}`);
    
  }

});
