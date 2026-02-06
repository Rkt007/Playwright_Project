import { test, expect } from '@playwright/test';

test('@regression Select onward journey date', async ({ page }) => {

  await page.goto('https://www.abhibus.com/');

  // Open calendar
  await page.getByRole('textbox', { name: 'Onward Journey Date' }).click();

  // Select year
  await page.getByText('2026').click();

  // Navigate to January if not visible
  while (!(await page.getByText('January').isVisible())) {
    await page.locator('.calender-month-change svg').first().click();
  }

  // Select date
  await page.getByRole('button', { name: '16' }).click();

  // ✅ Assertion: date input updated
  const onwardDate = page.getByRole('textbox', { name: 'Onward Journey Date' });
  await expect(onwardDate).toHaveValue(/16/);

});
