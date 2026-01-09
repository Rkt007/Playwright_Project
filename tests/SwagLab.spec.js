import { test, expect } from '@playwright/test';

test('perform login on Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page).toHaveTitle('Swag Labs');
});
