/*How to Run Only Specific Test

1. Use test.only()
Runs ONLY marked test
test('Login test', async ({ page }) => {
  // skipped
});

test.only('Signup test', async ({ page }) => {
  // only this runs
});
✅ 2. Run Test by Title (-g grep)
npx playwright test -g "Signup test"
✅ 3. Run Specific Test File
npx playwright test tests/signup.spec.ts

👉 With title filter:

npx playwright test tests/signup.spec.ts -g "Signup test"
✅ 4. Run Test by Line Number
npx playwright test tests/example.spec.ts:15
🔹 Skip Tests in Playwright
✅ 1. Use test.skip() or test.fixme()
test.skip('Login test', async ({ page }) => {
  // this test will be skipped
});
✅ 2. Skip Based on Browser
import { test, expect } from '@playwright/test';

test('Run only on Chromium & Firefox', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Not supported on WebKit');

  // test logic
});
✅ 3. Skip Entire Test Outside Function
test.skip(({ browserName }) => browserName === 'webkit', 'Skipping on WebKit');

test('Run on Chromium & Firefox', async ({ page }) => {
  // test logic
}); 

*/