import { test, expect } from '@playwright/test';

test('Country dropdown - full validation script', async ({ page }) => {

  // Set timeout
  page.setDefaultTimeout(5000);

  // Navigate to application
  await page.goto('https://practice.expandtesting.com/dropdown');   
});