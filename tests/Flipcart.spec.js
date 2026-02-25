import { test, expect } from '@playwright/test';

test('Flipkart search product test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  // Close login popup safely (if visible)
 // await page.keyboard.press('Escape');
const popup = page.locator('button._2KpZ6l._2doB4z');
    if (await popup.isVisible()) {
        await popup.click();
    }

    const searchBox = 'input[name="q"]';
    await page.fill(searchBox, 'iphone');
    await page.press(searchBox, 'Enter');
  // Wait for results properly (not waitForTimeout)
  const results = page.locator('a:has-text("iPhone")');

  await expect(results.first()).toBeVisible();

  const count = await results.count();
  console.log(`Total iPhone products found: ${count}`);
});