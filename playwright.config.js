const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40000,
  workers: 5,
  expect: {
    timeout: 30000,
  },
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  /*webServer: {
    // 💡 Changed to match your Vite setup
    command: 'npm run preview', 
    port: 3000,
    reuseExistingServer: !process.env.CI,
    // 💡 Add a timeout threshold so it fails fast instead of looping if stuck
    timeout: 120000, 
  },*/
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on'
  }
});
