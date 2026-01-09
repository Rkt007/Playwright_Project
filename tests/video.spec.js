import {test,expect} from '@playwright/test';

test('Video Demo Test', async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
  await   page.getByPlaceholder('Enter Name').fill('Saloni Tiwari');
    await   page.getByPlaceholder('Enter EMail').fill('rahul.rkt007@gmail.com');

});