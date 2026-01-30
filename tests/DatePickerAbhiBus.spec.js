import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.abhibus.com/');
  await page.getByRole('textbox', { name: 'Onward Journey Date' }).click();
  await page.getByText('January').click();
  await page.locator('#jaurney-date').getByText('2026').click();
  await page.locator('i > svg').click();
  await page.locator('i > svg').dblclick();
  await page.locator('div:nth-child(3) > .calender-month-change > i > svg').click();
  await page.locator('div:nth-child(3) > .calender-month-change > i > svg').click();
  await page.locator('div:nth-child(3) > .calender-month-change > i > svg').click();
  await page.getByRole('button', { name: '16' }).click();
});