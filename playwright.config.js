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
  //fullyParallel: true,
  //mode: 'serial',
  expect: {
    timeout: 60000,
  },
  //reporter: 'html',
  reporter: [["line"], ["allure-playwright"]],
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on',
    // maximum time for Playwright actions like click/fill
    actionTimeout: 60000,
    // navigation timeout
    navigationTimeout: 60000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  }

  /* Configure projects for major browsers */
  
});

module.exports = Config;