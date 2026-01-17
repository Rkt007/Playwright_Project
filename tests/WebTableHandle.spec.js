import { test, expect } from "@playwright/test";

test('WebTable Handling', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const table = page.locator('#productTable');

  // Total columns
  const columns = table.locator('thead tr th');
  const columnCount = await columns.count();
  console.log("Total number of columns:", columnCount);
  expect(columnCount).toBe(4);

  // Total rows
  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();
  console.log("Total number of rows:", rowCount);
  expect(rowCount).toBe(5);

  // ✅ SELECT PARTICULAR CHECKBOX (Product 4)
/*  const matchedRow = rows.filter({
    hasText: 'Product 4'
  });

 // const matchedRow = rows.filter({ has:page.locator('td'),hashText:'Product 4' })

  await matchedRow.locator('input').check();

  await expect(matchedRow).toHaveCount(1); */

  // select multiple checkbox by using javasript re-usable function 

  await selectProduct(rows ,page ,'Product 1');
   await selectProduct(rows ,page ,'Product 3');
    await selectProduct(rows ,page ,'Product 5');

  async function selectProduct(rows ,page,name )
  {
 //  const matchedRow = rows.filter({hasText: name});
  const matchedRow = rows.filter({ has:page.locator('td'),
    hasText:name })

   const checkbox = matchedRow.locator('input[type="checkbox"]');
  await checkbox.check();

await page.waitForTimeout(5000);
await expect(matchedRow).toHaveCount(1); 
}
});
