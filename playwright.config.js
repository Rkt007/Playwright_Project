// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail build if test.only is committed */
  forbidOnly: !!process.env.CI,

  /* Retries – critical for flaky handling in CI */
  retries: process.env.CI ? 2 : 0,

  /* Global test timeout */
  timeout: 30 * 1000,

  /* Expect assertion timeout */
  expect: {
    timeout: 5000,
  },

  /* Workers – controlled for Jenkins stability */
  workers: process.env.CI ? 2 : undefined,
  // (2 is safer than 4 on shared Jenkins agents)

  /* 🔥 REPORTERS – Jenkins friendly */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  /* Shared settings for all tests */
  use: {
    headless: true,

    /* Artifacts – very useful in Jenkins */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Slower actions improve CI stability */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

    // Enable later if Jenkins infra is strong
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
    */
  ],
});
