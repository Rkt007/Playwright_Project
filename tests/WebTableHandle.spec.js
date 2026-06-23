import { test, expect } from "@playwright/test";

test('@regression WebTable Handling', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const table = page.locator('#productTable');

  // Validate table structure
  await expect(table.locator('thead tr th')).toHaveCount(4);

  const rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(5);

  // Select products
  await selectProduct(rows, 'Product 1');
  await selectProduct(rows, 'Product 3');
  await selectProduct(rows, 'Product 5');
});


// ✅ Reusable function (CORRECT column)
async function selectProduct(rows, productName) {

  const matchedRow = rows.filter({
    has: rows.page().locator('td:nth-child(2)', { hasText: productName })
  });

  await expect(matchedRow).toHaveCount(1);

  const checkbox = matchedRow.locator('td:nth-child(1) input[type="checkbox"]');

  await checkbox.check();
  await expect(checkbox).toBeChecked();
}
