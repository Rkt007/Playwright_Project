import {test,expect} from '@playwright/test';
test('Mouse Hover practice',async({page})=>{

  await  page.goto('https://testautomationpractice.blogspot.com/');

  await page.locator('.dropbtn').hover();
    });