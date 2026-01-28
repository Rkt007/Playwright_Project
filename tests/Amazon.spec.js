import { test, expect } from "@playwright/test";

test('amazon search test', async ({ page }) => {

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.waitFor();
  await searchBox.fill('iphone');
  await searchBox.press('Enter');

  // Verify results page loaded
  await expect(page).toHaveURL(/s\?/);

  await searchBox.locator('')

});
