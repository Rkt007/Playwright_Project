import { test, expect } from "@playwright/test";

test('ixigo datepicker', async ({ page }) => {

  await page.goto('https://www.ixigo.com/flights');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('[data-testid="departureDate"]').click();

  const targetDate = '17';
  const targetMonthYear = 'June 2026';

  const nextButton = page.locator('button.react-calendar__navigation__next-button');

  // ✅ FIX: pick ONLY the left (from) month
  const monthLabel = page.locator('.react-calendar__navigation__label__labelText--from');

  // 🔁 Navigate month
  for (let i = 0; i < 12; i++) {
    const currentMonth = (await monthLabel.textContent()).trim();

    if (currentMonth === targetMonthYear) {
      break;
    }
    await nextButton.click();
  }

  // 🎯 Select date (most stable way)
 // const dateXpath = `//button[contains(@aria-label,'${targetMonthYear}') and contains(@aria-label,' ${targetDate},')]`;
// await page.locator(dateXpath).click();

 const dates = page.locator(
  '//div[contains(@class,"react-calendar__month-view__days")]//button[not(@disabled)]');
 
const count = await dates.count();

for (let i = 0; i < count; i++) {
  const dayText = (await dates.nth(i).innerText()).trim();

  if (dayText === targetDate) {
    await dates.nth(i).click();
    break;
  }
}

  console.log(`✅ Date selected: ${targetDate} ${targetMonthYear}`);
});
