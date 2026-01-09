import { test, expect } from '@playwright/test';

test('checkbox test', async ({ page }) => {
  await page.goto('https://www.techlistic.com/p/selenium-practice-form.html', {
    waitUntil: 'domcontentloaded'
  });

  await page.setDefaultTimeout(5000);

  const UFT = page.locator('#tool-0');
  const Protractor = page.locator('#tool-1');
  const Selenium_Webdriver = page.locator('#tool-2');

  const checkboxes = [UFT, Protractor, Selenium_Webdriver];

  // ✅ Check all checkboxes
  for (const checkbox of checkboxes) {
    await checkbox.check();
    await expect.soft(checkbox).toBeChecked();
  }

  // ✅ Uncheck only if already checked
  for (const checkbox of checkboxes) {
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
      await expect.soft(checkbox).not.toBeChecked();
    }
  }
});
