import { test, expect } from "@playwright/test";

test('makemytrip datepicker', async ({ page }) => {

  await page.goto('https://www.makemytrip.com/');
  await page.waitForLoadState('domcontentloaded');

  // Close chatbot
  await page.getByAltText('minimize').click();

  // Close login popup
  await page.locator('.commonModal__close').click();

  // Open date picker
  await page.locator('//span[@class="lbl_input appendBottom10"]').nth(3).click();

  const targetDate = "17";
  const targetMonthYear = "June 2026";

  const nextButton = page.locator('.DayPicker-NavButton--next');
  const monthCaption = page.locator('.DayPicker-Caption').first();

  // Navigate to target month
  for (let i = 0; i < 24; i++) { // safety limit
    const monthYearText = await monthCaption.innerText();

    if (monthYearText.includes(targetMonthYear)) {
      break;
    }
    await nextButton.click();
    await page.waitForTimeout(500);
  }

  // Select date
  const dates = page.locator(
    '.DayPicker-Day:not(.DayPicker-Day--disabled)'
  );

  for (let i = 0; i < await dates.count(); i++) {
    const dateText = await dates.nth(i).innerText();
    if (dateText.trim() === targetDate) {
      await dates.nth(i).click();
      break;
    }
  }

  console.log(`✅ Date selected: ${targetDate} ${targetMonthYear}`);
});
