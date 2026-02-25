import { test, expect } from "@playwright/test";

test('makemytrip datepicker', async ({ page }) => {

  await page.goto('https://www.makemytrip.com/', { waitUntil: 'domcontentloaded'});

  // Safe popup handling
  const chatbot = page.getByAltText('minimize');
  if (await chatbot.isVisible().catch(() => false)) {
    await chatbot.click();
  }

  const loginClose = page.locator('.commonModal__close');
  if (await loginClose.isVisible().catch(() => false)) {
    await loginClose.click();
  }

  // Open date picker
  await page.locator('//span[@class="lbl_input appendBottom10"]').nth(3).click();

  const targetDate = "17";
  const targetMonthYear = "June 2026";

  const nextButton = page.locator('.DayPicker-NavButton--next');
  const monthCaption = page.locator('.DayPicker-Caption').first();

  for (let i = 0; i < 24; i++) {

    const monthYearText = await monthCaption.innerText();

    if (monthYearText.includes(targetMonthYear)) break;

    await nextButton.click();

    // wait for month to change (no hard wait)
    await expect(monthCaption).not.toHaveText(monthYearText);
  }

  const dates = page.locator(
    '.DayPicker-Day:not(.DayPicker-Day--disabled)'
  );

  const count = await dates.count();

  for (let i = 0; i < count; i++) {
    const dateText = await dates.nth(i).innerText();
    if (dateText.trim() === targetDate) {
      await dates.nth(i).click();
      break;
    }
  }

  console.log(`✅ Date selected: ${targetDate} ${targetMonthYear}`);
});