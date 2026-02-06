import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Single files', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  const filePath = join(__dirname, '../test-files/sample1.pdf');
  await page.locator('#singleFileInput').setInputFiles(filePath);
  await page.waitForTimeout(2000);
});

test.skip('Multiple files', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  const file1 = join(__dirname, '../test-files/sample1.pdf');
  const file2 = join(__dirname, '../test-files/sample2.pdf');
  
  await page.locator('#multipleFilesInput').setInputFiles([file1, file2]);
  await page.waitForTimeout(2000);

  // remove files 
  await page.locator('#multipleFilesInput').setInputFiles([]);
});