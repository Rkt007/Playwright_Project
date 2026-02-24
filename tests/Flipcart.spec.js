import { test, expect } from '@playwright/test';

test('Flipkart search product test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  // Close login popup safely (if visible)
  await page.keyboard.press('Escape');

  // Correct locator
  const searchBox = page.locator('input[name="q"]');

  // await expect(searchBox).toBeVisible();

  await searchBox.fill('iphone');
  await searchBox.press('Enter');

  // Wait for results properly (not waitForTimeout)
  const results = page.locator('a:has-text("iPhone")');

  await expect(results.first()).toBeVisible();

  const count = await results.count();
  console.log(`Total iPhone products found: ${count}`);
});