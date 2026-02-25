import { test, expect } from '@playwright/test';

test.describe.parallel('Parallel Testing Suite', () => {

  test('Parallel Testing - test 1', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
  });

  test('Parallel Testing - test 2', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    console.log('Page loaded successfully');
   // await expect(page).toHaveTitle(/Expand Testing/);
  });

  test('Parallel Testing - test 3', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
   // await page.getByRole('link', { name: 'Test Login Page' }).click();

    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('.alert-success'))
      .toContainText('You logged into a secure area!');
  });

  test('Parallel Testing - test 4', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    await page.locator('//div[@class="row mb-2"]').allInnerTexts();
  });

});
