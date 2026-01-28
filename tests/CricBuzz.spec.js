import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.cricbuzz.com/');
  await page.getByRole('link', { name: '1st T20I • West Indies tour' }).click();
  await page.getByRole('link', { name: 'Scorecard' }).click();
  await page.locator('.hidden > div > #scard-team-10-innings-1 > div > .text-xs > div:nth-child(7) > div:nth-child(5)').click();
});