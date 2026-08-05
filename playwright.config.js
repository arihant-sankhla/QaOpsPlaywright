const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40000,
  retries: 2,
  // per-test max timeout
  timeout: 120000,
  // retry flaky tests up to 2 times
  retries: 2,
  // parallel workers
  workers: 5,
  expect: {
    timeout: 60000,
  },
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on'
    trace: 'on',
    // maximum time for Playwright actions like click/fill
    actionTimeout: 60000,
    // navigation timeout
    navigationTimeout: 60000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  }
});