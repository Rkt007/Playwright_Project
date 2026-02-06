import { test, expect } from "@playwright/test";

test('@regression AutoSuggestionDropDown', async ({ page }) => {

  await page.goto('https://www.cleartrip.com/');

  // Handle login popup safely
  const closeicon = page.locator('[data-testid="closeIcon"]');
  if (await closeicon.isVisible().catch(() => false)) {
    await closeicon.click();
  }

  // From input
  const inputfrom = page.getByPlaceholder('Where from?');
  await inputfrom.fill('del');

  // Auto-suggestion items
  const suggestions = page.locator('.airportList li');
  const count = await suggestions.count();

  for (let i = 0; i < count; i++) {
    const text = await suggestions.nth(i).innerText();
    if (text.includes('New Delhi')) {
      await suggestions.nth(i).click();
      break;
    }
  }

  // ✅ Assertion: input updated
  await expect(inputfrom).toHaveValue(/Delhi/i);
});
