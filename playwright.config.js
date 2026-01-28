// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Timeout for each test */
  timeout: 30 * 1000,

  /* Timeout for expect assertions */
  expect: {
    timeout: 5000
  },

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* ✅ REPORTERS (HTML + Allure) */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'my-allure-results' }],
  ],

  /* Shared settings */
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Run in headless mode */
    headless: true,
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
