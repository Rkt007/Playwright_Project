import { test, expect } from '@playwright/test';

test('zingBus DatePicker', async ({ page }) => {
  await page.goto('https://www.zingbus.com/');

  // From city
  await page.getByPlaceholder('From City').fill('Delhi');
  await page.keyboard.press('Enter');

  // To city
  await page.getByPlaceholder('To City').fill('Gopalganj');
  await page.keyboard.press('Enter');

  // Open date picker
  await page.locator('.formshome_searchText__lOFAF').first().click();

  const year = '2026';
  const month = 'August';
  const date = '15';

  // Navigate month
  while (true) {
    const isTargetMonthVisible = await page
      .locator('.CalendarMonth_caption', {
        hasText: `${month} ${year}`,
      })
      .first()
      .isVisible()
      .catch(() => false);

    if (isTargetMonthVisible) break;

    // Click next button
await page.locator('button[aria-label="Move forward to switch to the next month"]').click();

    await page.waitForTimeout(4000);
  }

  // Select date
  await page
    .locator(`button[aria-label*="${month} ${date}"]`)
    .click();
});
