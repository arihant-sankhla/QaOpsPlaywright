// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';

/*
 * @see https://playwright.dev/docs/test-configuration
 */
const Config= ({
  testDir: './tests',
  // per-test max timeout
  timeout: 120000,
  // retry flaky tests up to 2 times
  retries: 2,
  // parallel workers
  workers: 5,
  // directory for test artifacts (screenshots, traces, videos)
  outputDir: 'test-results',
  //fullyParallel: true,
  //mode: 'serial',
  expect: {
    timeout: 60000,
  },
  //reporter: 'html',
  reporter: [["list"], ["allure-playwright", { outputFolder: 'allure-results' }]],
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    // keep traces for failed tests or first retry to reduce storage
    trace: 'on-first-retry',
    // capture video only when a test fails
    video: 'retain-on-failure',
    // maximum time for Playwright actions like click/fill
    actionTimeout: 60000,
    // navigation timeout
    navigationTimeout: 60000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  }

  /* Configure projects for major browsers */
  
});

module.exports = Config;