import { test, expect } from "@playwright/test";

test('goibibo datepicker', async ({ page }) => {


 // networkidle means:
//Wait until there are no network requests for 500ms.
//But Goibibo: Runs analytics calls continuously // Has background APIs //Ads + tracking script Lazy loading

//So network never becomes fully idle ❌
//Playwright waits
//Timeout happens 
//so need to run goibo in headed mode 
//await page.goto('https://www.goibibo.com/flights/', { waitUntil: 'networkidle'});
await page.goto('https://www.goibibo.com/flights/', { waitUntil: 'domcontentloaded'});
  // Close login popup safely
  const popup = page.locator('.logSprite.icClose');
  if (await popup.isVisible({ timeout: 12000 })) {
    await popup.click();
  }

  // Click on Departure (stable selector)
  await page.getByText('Departure').click();

  const targetDate = "17";
  const targetMonthYear = "June 2026";

  const nextButton = page.locator('.DayPicker-NavButton--next');

  // Navigate to target month
  while (true) {
    const monthYearText = await page
      .locator('.DayPicker-Caption div').first().innerText();

    if (monthYearText.trim() === targetMonthYear) {
      break;
    }
    await nextButton.click();
  }

  // Select date
  const dates = page.locator(
    '//div[contains(@class,"DayPicker-Day") and not(contains(@class,"disabled"))]'
  );

  for (let i = 0; i < await dates.count(); i++) {
    if ((await dates.nth(i).innerText()).trim() === targetDate) {
      await dates.nth(i).click();
      break;
    }
  }

  console.log(`✅ Date selected: ${targetDate} ${targetMonthYear}`);
});
