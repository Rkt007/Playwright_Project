import { test, expect } from "@playwright/test";

test('AutoSuggestionDropDown', async ({ page }) => {

  await page.goto('https://www.cleartrip.com/');

  // Handle login popup
  const loginicon = page.locator('[data-testid="loginPopup"]');
  const closeicon = page.locator('[data-testid="closeIcon"]');

  try {
    if (await loginicon.isVisible({ timeout: 4000 })) {
      await closeicon.click();
    }
  } catch (error) {
    // popup not visible
  }

  // From input
  const inputfrom = page.getByPlaceholder('Where from?');
  await inputfrom.click();
  await inputfrom.fill('del');

  // Auto-suggestion items
  const suggestions = page.locator('.airportList li');

  const allTexts = await suggestions.allTextContents();
  console.log(allTexts);

 //  await suggestions.first().click();
  // Use JS forEach
  allTexts.forEach((text, index) => {
    if (text.includes('New Delhi')) {
      suggestions.nth(index).click(); // Playwright handles promise
    }
  });

 // for (let i = 0; i < count; i++) {
 // const text = await suggestions.nth(i).textContent();
//  if (text.includes('New Delhi')) {
//    await suggestions.nth(i).click();
//    break;
//  }
//}


  await page.waitForTimeout(5000);
});
