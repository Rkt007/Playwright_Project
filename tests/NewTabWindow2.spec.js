import { test, expect } from "@playwright/test";

test('handle window and tab', async ({ browser }) => {

  const newContext = await browser.newContext();
  const newPage = await newContext.newPage();

  await newPage.goto('https://www.google.com/');
  console.log(await newPage.title());

});