// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';

/*
 * @see https://playwright.dev/docs/test-configuration
 */
const Config= ({
  testDir: './tests',
  timeout: 40000,
  retries: 2, 
  workers: 5,
  //fullyParallel: true,
  //mode: 'serial',
  expect: {
    timeout: 30000,
  },
  //reporter: 'html',
  reporter: [["line"], ["allure-playwright"]],
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  }

  /* Configure projects for major browsers */
  
});

module.exports = Config;