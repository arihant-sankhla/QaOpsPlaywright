const { chromium } = require('@playwright/test');
require('dotenv').config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Performing global login...');
  await page.goto(process.env.BASE_URL);
  await page.locator('input[type="email"]').fill(process.env.TEST_EMAIL);
  await page.locator('input[type="password"]').fill(process.env.TEST_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for product cards to confirm login success
  await page.locator('.card-body').first().waitFor();
  console.log('Login successful, saving state...');

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

module.exports = globalSetup;
