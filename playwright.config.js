const { defineConfig } = require('@playwright/test');
const { config } = require('./tests/utils/config');

module.exports = defineConfig({
  testDir: './tests',
  timeout: config.timeout,
  workers: config.workers,
  expect: {
    timeout: config.expectTimeout,
  },
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    browserName: config.browser,
    screenshot: 'only-on-failure',
    trace: 'on',
    headless: !config.isHeaded,
  }
});
