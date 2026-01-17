import{test,expect} from '@playwright/test';

test('Single files',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');
await page.locator('#singleFileInput').setInputFiles('D:\Software_Tester__3+_Yrs_-_Rahul (1).pdf')
await page.waitForTimeout(5000)

//multipleFilesInput
});

test.only('Multiple files',async({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');
await page.locator('#multipleFilesInput').setInputFiles(['D:\Software_Tester__3+_Yrs_-_Rahul (1).pdf','D:\AADHAR NIRBHAY KR TIWARI_compressed.pdf'])
await page.waitForTimeout(5000)

// remove files 
await page.locator('#multipleFilesInput').setInputFiles([])


});