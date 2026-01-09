import { test, expect } from '@playwright/test';

test('Screenshot practice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

    // Take a screenshot of the particular element
    await page.locator('.widget-content').screenshot({path:'tests/screenshots/' + Date.now() + '_element.png'});
});
