import { test, expect } from '@playwright/test';

test('DatePicker Test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Open DatePicker
  // await page.fill('#datepicker', '08/15/2026');

  await page.locator('#datepicker').click();

  const year = "2026";
  const month = "August";
  const date = "15";

  // Navigate to desired month & year
  while (true) {
    const currentYear = await page.locator('.ui-datepicker-year').textContent();
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();

    if (currentYear === year && currentMonth === month) {
      break;
    }

    // Click Next button
    await page.locator('.ui-datepicker-next').click();
    await page.waitForTimeout(500); // small wait for UI update
  }

  // Select the date
 // await page.locator('//*[@id="ui-datepicker-div"]/table/tbody/tr[3]/td[5]/a').click();

  await page.locator(`.ui-datepicker-calendar >> text=${date}`).click();
  
});
