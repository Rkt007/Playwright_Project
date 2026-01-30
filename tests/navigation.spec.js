import { test } from '@playwright/test';

test('browser navigation actions', async ({ page }) => {

  await page.goto('https://example.com');

  await page.goto('https://example.com/more');

  // Back
  await page.goBack();

  // Forward
  await page.goForward();

  // Refresh
  await page.reload();
});
