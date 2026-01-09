import { test, expect } from '@playwright/test';

test('text box input and validation', async ({ page }) => {

  await page.goto('https://practice.expandtesting.com');

  await page.getByRole('link', { name: 'Test Login Page' }).click();

  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');

  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ Validation
  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('.alert-success'))
    .toContainText('You logged into a secure area!');
});
