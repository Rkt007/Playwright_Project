import { test, expect } from '@playwright/test';

test('Screenshot practice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Take a screenshot of the first element (use first() to avoid strict mode violation)
  await page.locator('.widget-content').first().screenshot({ path: 'tests/screenshots/' + Date.now() + '_element.png' });
});
