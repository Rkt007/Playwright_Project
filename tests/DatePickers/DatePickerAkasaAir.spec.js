import {test,expect} from "@playwright/test";
test('akasa air date picker',async({page})=>{

    await page.goto("https://www.akasaair.com/flight-booking");
    await page.waitForLoadState('domcontentloaded');

    await page.getByPlaceholder('Departure date').click();
    const targetDate = "17";
  const targetMonthYear = "June 2026";

  const nextButton = page.locator('.react-datepicker__navigation--next');

 
  while (true) {
  
     const monthYearText = await page.locator('.react-datepicker__current-month').first().innerText();

     if (monthYearText===targetMonthYear)
     {
        break ;
     }
     await nextButton.click();
  }

// dates 
const dates =await page.locator('//div[contains(@class,"react-datepicker__month") and not(contains(@class,"disabled"))]')
for (let i = 0; i < await dates.count(); i++) {
    if ((await dates.nth(i).innerText()).trim() === targetDate) {
      await dates.nth(i).click();
      break;

      await page.waitForTimeout(5000);
    }
  }

  console.log(`✅ Date selected: ${targetDate} ${targetMonthYear}`);
});
