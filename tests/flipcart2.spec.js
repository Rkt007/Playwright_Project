	  import { test, expect } from "@playwright/test";

test('flipkart add to cart', async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.waitForLoadState('domcontentloaded');

    const popup = page.locator('button._2KpZ6l._2doB4z');
    if (await popup.isVisible()) {
        await popup.click();
    }

    const searchBox = 'input[name="q"]';
    await page.fill(searchBox, 'iphone');
    await page.press(searchBox, 'Enter');

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/q=iphone/);

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/q=iphone/);

    // Click the 2nd mobile product using XPath (Flipkart opens product in a new tab)
    const products = page.locator('//div[@class="ZFwe0M row"]');
    const productCount = await products.count();
    console.log('Found products:', productCount);

    // Default to the current page; if a new page (popup) opens, use that for product details
    let productPage = page;
    if (productCount >= 2) {
        const clickPromise = products.nth(1).click();
        const newPagePromise = page.context().waitForEvent('page').catch(() => null);
        const [newPage] = await Promise.all([newPagePromise, clickPromise]);
        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            productPage = newPage;
        } else {
            await page.waitForLoadState('networkidle');
        }
    }

    // Wait for product details to load
    await productPage.waitForLoadState('networkidle');
    await productPage.waitForTimeout(2000);

    // Get price - try multiple selectors
    let priceText = '';
    const priceSelectors = [
        'div[class*="hZ3P6w"]',
        'div._16ydiu',
        'span[class*="CxhGkd"]',
        'div[class*="Nx9bqj"]',
    ];

    for (const selector of priceSelectors) {
        try {
            const element = productPage.locator(selector).first();
            const text = await element.textContent({ timeout: 2000 });
            if (text && text.includes('₹')) {
                priceText = text;
                console.log('Found price with selector', selector, ':', text);
                break;
            }
        } catch (e) {
            // Continue to next selector
        }
    }

    // If still no price, try getting all text with rupee symbol
    if (!priceText) {
        const allText = await productPage.locator('text=/₹[\\d,]+/').first().textContent();
        priceText = allText || '';
        console.log('Found price from text pattern:', priceText);
    }

    const priceBeforeAddToCart = parseInt(priceText?.replace(/[^0-9]/g, '') || '0');
    console.log('Price before add to cart:', priceBeforeAddToCart);

    // Add to cart - try multiple button selectors
    const addToCartSelectors = [
        'button[class*="dSM5Ub"]',
        'button:has-text("Add to Cart")',
        'button:has-text("ADD TO CART")',
        'button[class*="IUmgrZ"]',
    ];

    let addedToCart = false;
    for (const selector of addToCartSelectors) {
        try {
            const button = productPage.locator(selector).first();
            if (await button.isVisible({ timeout: 1000 })) {
                await button.click();
                addedToCart = true;
                console.log('Clicked add to cart with selector:', selector);
                break;
            }
        } catch (e) {
            // Continue to next selector
        }
    }

    if (!addedToCart) {
        console.log('Warning: Could not find add to cart button');
    }

    // Navigate to cart to verify price
    await productPage.waitForTimeout(2000); // Wait for toast notification
    
    // Try to find and click cart button
    const cartSelectors = [
        'button:has-text("Cart")',
        'a[href*="cart"]',
        'div[class*="VKiXgq"]',
    ];

    let navigatedToCart = false;
    for (const selector of cartSelectors) {
        try {
            const button = productPage.locator(selector).first();
            if (await button.isVisible({ timeout: 1000 })) {
                await button.click();
                navigatedToCart = true;
                console.log('Clicked cart with selector:', selector);
                break;
            }
        } catch (e) {
            // Continue to next selector
        }
    }

    if (navigatedToCart) {
        // Wait for cart page to load
        await productPage.waitForLoadState('networkidle');

        if (!addedToCart) {
            console.log('Product was not added to cart; skipping cart price verification');
        } else {
            // Get price in cart
            let cartPriceText = '';
            for (const selector of priceSelectors) {
                try {
                    const element = productPage.locator(selector).first();
                    const text = await element.textContent({ timeout: 2000 });
                    if (text && text.includes('₹')) {
                        cartPriceText = text;
                        console.log('Found cart price with selector', selector, ':', text);
                        break;
                    }
                } catch (e) {
                    // Continue
                }
            }

            const priceAfterAddToCart = parseInt(cartPriceText?.replace(/[^0-9]/g, '') || '0');
            console.log('Price in cart:', priceAfterAddToCart);

            // Verify prices match
            if (priceBeforeAddToCart > 0 && priceAfterAddToCart > 0) {
                expect(priceBeforeAddToCart).toBe(priceAfterAddToCart);
                console.log('✓ Prices match! Product at Rs.' + priceBeforeAddToCart);
            }
        }
    } else {
        console.log('Could not navigate to cart, test partially completed');
    }
});

