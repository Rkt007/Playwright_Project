import { test, expect } from "@playwright/test";

test('debug - find selectors', async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.waitForLoadState('domcontentloaded');

    const popup = page.locator('button._2KpZ6l._2doB4z');
    if (await popup.isVisible()) {
        await popup.click();
    }

    const searchBox = 'input[name="q"]';
    await page.fill(searchBox, 'mobile phone');
    await page.press(searchBox, 'Enter');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Try different product selectors
    const productSelectors = [
        '.RG5Slk',
        '.KzDlHZ',
        '._1AtVbE',
        '.bhgxx2',
        'a._1fGeJ5',
        '[data-productid]',
    ];

    for (const selector of productSelectors) {
        try {
            const count = await page.locator(selector).count();
            if (count > 0) {
                console.log(`Selector "${selector}" found ${count} products`);
                const text = await page.locator(selector).first().textContent();
                console.log('First product text:', text?.substring(0, 100));
            }
        } catch (e) {
            // Ignore
        }
    }

    // Try to click 2nd product if found
    const products = page.locator('._1AtVbE');
    const count = await products.count();
    console.log('Found products with ._1AtVbE:', count);

    if (count >= 2) {
        await products.nth(1).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        console.log('Clicked 2nd product');
    }

    // Now log page title to verify we're on product page
    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());
});
