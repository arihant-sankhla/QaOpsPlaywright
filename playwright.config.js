const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40000,
  retries: 2,
  workers: 5,
  expect: {
    timeout: 30000,
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
  }
});