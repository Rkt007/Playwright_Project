import { test, expect } from "@playwright/test";

test("verify login functionality", async ({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.waitForLoadState("domcontentloaded");

  const usernameText = await page.locator(".oxd-text.oxd-text--p").nth(0).innerText();
  const username = usernameText.split(":")[1].trim();

  const passwordText = await page.locator(".oxd-text.oxd-text--p").nth(1).innerText();
  const password = passwordText.split(":")[1].trim();

  await page.locator("input[name='username']").fill(username);
  await page.locator("input[name='password']").fill(password);

  await page.locator("button[type='submit']").click();

  await expect(page).toHaveURL(/dashboard/);

});