import { test, expect } from "@playwright/test";

test('alert with OK', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Dialog handler
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();   // ❌ accpet → ✅ accept
  });

  await page.locator('#alertBtn').click();
  await page.waitForTimeout(3000);
});

test('confirmBtn with Cancel or ok', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Press a button!');
    await dialog.dismiss(); // Cancel
  });

  await page.locator('#confirmBtn').click();
  await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
  await page.waitForTimeout(3000);
});

test('promptBtn dialog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toBe('Harry Potter');
    await dialog.accept('Rahul');
  });

  await page.locator('#promptBtn').click();
  await expect(page.locator('#demo')).toHaveText(
    'Hello Rahul! How are you today?'
  );
  await page.waitForTimeout(3000);
});
