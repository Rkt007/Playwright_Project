import { test, expect } from '@playwright/test';

test('Mouse Right Click practice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Right click on the element
  const element = page.locator('#field2');
  await element.click({ button: 'right' });

  // Optional validation (element should be visible)
 // await expect(element).toBeVisible();
});
