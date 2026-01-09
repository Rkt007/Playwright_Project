import { test, expect } from "@playwright/test";

test('multiselect dropdown test', async ({ page }) => {

  await page.goto('https://testpages.herokuapp.com/pages/forms/html-form/');

  const multiselect = page.locator('select[name="multipleselect[]"]');

  // by using value 
  // await multiselect.selectOption([{value:'ms1'},{value:'ms2'}]);

  // Select using label
  await multiselect.selectOption([
    { label: 'Selection Item 1' },
    { label: 'Selection Item 3' }
  ]);

  // Assertion
  const selectedOptions = multiselect.locator('option:checked');
  await expect(selectedOptions).toHaveText([ 'Selection Item 1','Selection Item 3']);


  await expect(selectedOptions).toHaveAttribute('Multiple');
  await page.waitForTimeout(3000);
});
