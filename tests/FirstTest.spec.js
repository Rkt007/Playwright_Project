import { test, expect } from '@playwright/test';

test('@smoke open google page and check title', async ({ page }) => {
  await page.goto('https://www.google.com');

  const pagetitle = await page.title();
  console.log('Page title is: ' + pagetitle);

  const pageurl = page.url();
  console.log('Page url is: ' + pageurl);
  
  await expect(page).toHaveTitle(/Google/);
});
