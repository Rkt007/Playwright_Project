import { test, expect } from "@playwright/test"; 
test('ixigo datepicker', async ({ page }) => { 

await page.goto('https://www.ixigo.com/flights'); 
await page.waitForLoadState('domcontentloaded') 

// open datepicker 
await page.locator('data-testid=departureDate').click(); 

const targetDate = '31'; 
const targetMonthYear = 'January 2027'; 
// const nextbutton 
const nextbutton = await page.locator('button.react-calendar__navigation__next-button')


 while(true) { 
const MonthYear = await page.locator('.react-calendar__navigation__label__labelText--from').innerText();
if (MonthYear === targetMonthYear) {
 // dates 
 const dates = await page.locator('//div[contains(@class,"react-calendar__month-view__days")]//div'); 
 const count = await dates.count(); 
 for (let i = 0; i < count; i++) { 
 const dayText = (await dates.nth(i).innerText()).trim(); 
 if (dayText === targetDate) { 
 await dates.nth(i).click(); 
 console.log(`Date selected: ${targetDate} ${targetMonthYear}`);
 break;
 } 
 } 
 break;
 } 
 await nextbutton.click(); 
 } 
 });
 
 
 