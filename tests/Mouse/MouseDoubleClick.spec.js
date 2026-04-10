import { test, expect } from '@playwright/test';

test('Mouse double Click practice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Double click on the element
  const element = page.locator('#field1');
  await element.dblclick();

  // Optional validation (element should be visible)
  await expect(element).toBeVisible();
 
});
