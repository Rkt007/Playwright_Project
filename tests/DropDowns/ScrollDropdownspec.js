import { test, expect } from "@playwright/test";

test('scrolling dropdown in Playwright', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Click dropdown
  await page.locator('#comboBox').click();

  // Capture all options
  const options = page.locator('//div[@class="option"]');

  // Count options
  const count = await options.count();
  console.log("Total options: " + count);

  // Loop through options
  for (let i = 5; i < count -2; i++) {
    const text = await options.nth(i).textContent();
    console.log(text);
  }

});