import { test, expect } from '@playwright/test';

test('WebTable Handling', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const table = page.locator('h2:has-text("Pagination Web Table") + table');
  const rows = table.locator('tbody tr');
  const nextBtn = page.locator('#pagination li >> text=Next');

  await selectProduct(page, table, 'Smartphone');
  await selectProduct(page, table, 'Tablet');
  await selectProduct(page, table, 'Wireless Earbuds');

});

async function selectProduct(page, table, productName) {

  const pages = page.locator('#pagination li a');
  const totalPages = await pages.count();

  for (let i = 0; i < totalPages; i++) {

    await pages.nth(i).click();

    // wait for table refresh
    await page.waitForLoadState('domcontentloaded');

    const matchedRow = table.locator('tbody tr')
                            .filter({ hasText: productName });

    if (await matchedRow.count() > 0) {
      await matchedRow.locator('input[type="checkbox"]').check();
      console.log(`✅ Selected: ${productName}`);
      return;
    }
  }

  throw new Error(`${productName} not found in table`);
}