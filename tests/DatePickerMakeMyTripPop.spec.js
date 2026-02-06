import { test, expect } from "@playwright/test";

test('MakeMyTrip', async ({ page }) => {

  await page.goto('https://www.makemytrip.com/');

  // Close login popup
  const loginpop = page.locator('.commonModal__close');
  try {
    await loginpop.waitFor({ timeout: 5000 });
    await loginpop.click();
  } catch {}

  // Remove overlay focus
  await page.mouse.click(10, 10);

  // ✅ Click "From" city DIV (this is the key fix)
  await page.locator('span:text("From")').click();

  // Now the input becomes active
  const fromInput = page.locator('input[placeholder="From"]');
  await fromInput.fill('del');

  // Suggestions
  const suggestions = page.locator('.react-autosuggest__suggestions-list li');

  await suggestions.first().waitFor({ timeout: 5000 });

  const count = await suggestions.count();
  console.log("Total suggestions:", count);

  for (let i = 0; i < count; i++) {
    const text = await suggestions.nth(i).textContent();
    console.log(text);

    if (text.includes('New Delhi')) {
      await suggestions.nth(i).click();
      break;
    }
  }
});
