const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./tests/global-setup'),
  timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 40000,
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : 5,
  expect: {
    timeout: process.env.EXPECT_TIMEOUT ? parseInt(process.env.EXPECT_TIMEOUT) : 30000,
  },
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    browserName: process.env.BROWSER || 'chromium',
    storageState: 'storageState.json',
    screenshot: 'only-on-failure',
    trace: 'on'
  }
});
