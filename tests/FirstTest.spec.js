import { test, expect } from '@playwright/test';

test('@smoke open google page and check title', async ({ page }) => {
  await page.goto('https://www.google.com');

  const pagetitle = await page.title();
  console.log('Page title is: ' + pagetitle);

  const pageurl = page.url();
  console.log('Page url is: ' + pageurl);
  
  await expect(page).toHaveTitle(/Google/);
});


/*
What is Playwright Fixture? 

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
});

Explanation
Here, page is a fixture
Playwright automatically:
Creates a new page
Injects it into your test

Other Built-in Fixtures Include:
browser → Shared browser instance
context → New browser context (like incognito window)
page → New tab inside context
testInfo → Metadata about the current test

Definition
In Playwright, a fixture is a setup and teardown mechanism used to:

Prepare resources before test execution
Browsers
Pages
Test data
Login sessions
Clean up resources after test execution

Purpose of Fixtures

Fixtures help you:
Share common logic across tests
Keep code clean and consistent

Why Use Fixtures?
✔ Avoid repeating setup code (like login or API mocking)
✔ Automatically clean up after test runs
✔ Better structure and readability
✔ Share reusable data/resources across tests
*/
