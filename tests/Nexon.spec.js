import {test ,expect}from  "@playwright/test";
test ('verify the login' ,async({page})=>{

    await page.goto('https://www.google.com/') ;

await page.screenshot()


}) ;