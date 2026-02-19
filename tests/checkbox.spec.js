import { test, expect } from '@playwright/test';

test('@smoke checkbox test', async ({ page }) => {
  await page.goto('https://www.techlistic.com/p/selenium-practice-form.html', {
    waitUntil: 'domcontentloaded'
  });

  // Set a longer timeout for this test
  page.setDefaultTimeout(10000);

  const UFT = page.locator('#tool-0');
  const Protractor = page.locator('#tool-1');
  const Selenium_Webdriver = page.locator('#tool-2');

  const checkboxes = [UFT, Protractor, Selenium_Webdriver];

  // Wait for elements to be visible before interacting
  for (const checkbox of checkboxes) {
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ✅ Check all checkboxes
  for (const checkbox of checkboxes) {
    await checkbox.check({ force: true });
    await expect.soft(checkbox).toBeChecked();
  }

  // ✅ Uncheck only if already checked
  for (const checkbox of checkboxes) {
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck({ force: true });
      await expect.soft(checkbox).not.toBeChecked();
    }
  }
});
