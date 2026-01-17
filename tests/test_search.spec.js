const { test, expect } = require('@playwright/test');
const logger = require('../logger');

test.describe('GitHub Search Functionality', () => {

  test('should search for repositories and verify results', async ({ page }) => {
    logger.info('Starting test: GitHub search functionality');
    
    logger.info('Navigating to https://github.com');
    await page.goto('https://github.com', { waitUntil: 'domcontentloaded' });
    logger.info('GitHub homepage loaded');

    // Click on search input
    logger.info('Clicking on search input');
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    logger.info('Search input clicked');

    // Type search query
    logger.info('Typing search query: "playwright"');
    await searchInput.fill('playwright');
    logger.info('Search query entered');

    // Press Enter to search
    logger.info('Pressing Enter to search');
    await searchInput.press('Enter');
    logger.info('Search submitted');

    // Wait for results
    await page.waitForLoadState('domcontentloaded');
    logger.info('Search results loaded');

    // Verify search results are displayed
    logger.info('Verifying search results are displayed');
    const searchResults = page.locator('[data-testid*="results-list"]').or(page.locator('text=/Search Results/i')).first();
    await expect(searchResults).toBeVisible();
    logger.info('✓ Search results visible');

    // Verify at least one result contains "playwright"
    logger.info('Verifying at least one result contains "playwright"');
    const resultLinks = page.locator('a[href*="github.com"]').filter({ hasText: /playwright/i });
    const count = await resultLinks.count();
    expect(count).toBeGreaterThan(0);
    logger.info(`✓ Found ${count} results containing "playwright"`);

    logger.info('✓ Test PASSED: Search functionality working correctly');
  });

  test('should filter search results by language', async ({ page }) => {
    logger.info('Starting test: Filter search results by language');
    
    logger.info('Navigating to GitHub search');
    await page.goto('https://github.com/search?q=language%3ATypeScript', { waitUntil: 'domcontentloaded' });
    logger.info('Search page loaded with TypeScript filter');

    // Verify page title or heading contains search criteria
    logger.info('Verifying search criteria in page');
    const pageContent = page.locator('body');
    await expect(pageContent).toContainText(/TypeScript|language/i);
    logger.info('✓ Search criteria verified');

    // Verify search results exist
    logger.info('Verifying search results exist');
    const results = page.locator('a[href*="github.com"]').first();
    await expect(results).toBeVisible();
    logger.info('✓ Search results found');

    logger.info('✓ Test PASSED: Language filter applied successfully');
  });
});
