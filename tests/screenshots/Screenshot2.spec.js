import { test, expect } from '@playwright/test';

test('Screenshot practice', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

    // Take a screenshot of the home page
    await page.screenshot({path: 'tests/screenshots/'+Date.now()+'_homepage.png'});
});
