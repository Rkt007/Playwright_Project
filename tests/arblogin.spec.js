import { test, expect } from "@playwright/test";

test('test login functionality', async ({ page }) => {

  await page.goto('https://accounts.pre.arbohq.com/sign-in');

  // text box username
  await page.getByPlaceholder('Enter your email address').fill('rkt007');

  // text box password
  await page.getByPlaceholder('Enter your password').fill('rktiwari');

  // Sign in button
  await page.locator('#Sign in');

});