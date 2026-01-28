import { test, expect } from '@playwright/test';

test('checkbox test', async ({ page }) => {
  await page.goto('https://www.techlistic.com/p/selenium-practice-form.html', {
    waitUntil: 'domcontentloaded'
  });

  await page.setDefaultTimeout(5000);

  const checkboxes = page.locator("//input[@type='checkbox']");

  // First checkbox
  await checkboxes.first().check();

  // Second checkbox (index starts from 0)
  await checkboxes.nth(1).check();

  // Last checkbox
  await checkboxes.last().check();

  // Assertions
  await expect(checkboxes.first()).toBeChecked();
  await expect(checkboxes.nth(1)).toBeChecked();
  await expect(checkboxes.last()).toBeChecked(); 
  // check total checkbox on same time
  const checkboxLocators = page.locator("//input[@type='checkbox']");
  const allcheckbox = await checkboxLocators.all();
  for (const checkbox of allcheckbox) {
    await checkbox.check();
    await expect.soft(checkbox).toBeChecked();
  }
});
