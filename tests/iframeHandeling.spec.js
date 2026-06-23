import{test ,expect ,devices} from "@playwright/test";

test ('verify iframe' ,async({page})=>{
await page.frameLocator('https://www.rediff.com/');

const frame1 =await page.locator('#div_moneyframe') ;
await expect(frame1.toHave('title')) ;
console.log(frame1.allInnerTexts) ;
}) ;