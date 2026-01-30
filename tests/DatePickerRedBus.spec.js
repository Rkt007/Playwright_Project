import { test, expect } from "@playwright/test";

test('redbus date picker', async ({ page }) => {

  await page.goto('https://www.redbus.in/');
  await page.waitForLoadState('domcontentloaded');

  const targetDate = "17";
  const targetMonthYear = "June 2026";

  // Open date picker
  await page.locator("div[aria-label^='Select Date of Journey']").click();

  const monthYearLocator = page.locator('.monthYear___f6ba90');
  const nextButton = page.locator("i[aria-label^='Next month']");

  // Navigate to required month/year
  while (true) {
    const currentMonthYear = (await monthYearLocator.innerText()).trim();

    if (currentMonthYear === targetMonthYear) {
      break;
    }
    await nextButton.click();
  }

  // Select date
  const dates = page.locator('div.calendarDate span');
  const count = await dates.count();

  for (let i = 0; i < count; i++) {
    const dayText = (await dates.nth(i).innerText()).trim();

    if (dayText === targetDate) {
      await dates.nth(i).click();
      console.log(`Date selected: ${targetDate} ${targetMonthYear}`);
      break;
    }
  }
});
