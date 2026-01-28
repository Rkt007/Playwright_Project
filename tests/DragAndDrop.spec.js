import { test, expect } from '@playwright/test';

test('Drag and Drop practice', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const sorce=  page.locator('#draggable');
    const target=  page.locator('#droppable');
    await sorce.dragTo(target);
    });