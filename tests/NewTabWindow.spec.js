import { test, expect } from "@playwright/test";

test('handle window and tab', async ({ page }) => {

  const context = page.context();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[target="_blank"]')
  ]);

  await newPage.waitForLoadState();
  console.log(await newPage.title());

});