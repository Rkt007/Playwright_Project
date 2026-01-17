import { test, expect } from '@playwright/test';

test('WebTable Handling', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Pagination Web Table (the one with checkboxes)
  const table = page.locator('h2:has-text("Pagination Web Table") + table');
  const rows = table.locator('tbody tr');

  await selectProduct(rows, 'Smartphone');
  await selectProduct(rows, 'Tablet');
  await selectProduct(rows, 'Wireless Earbuds');
});

async function selectProduct(rows, productName)
 {
  const matchedRow = rows.filter({ hasText: productName });

  await expect(matchedRow).toHaveCount(1);

  const checkbox = matchedRow.locator('input[type="checkbox"]');
  await checkbox.check();
}
