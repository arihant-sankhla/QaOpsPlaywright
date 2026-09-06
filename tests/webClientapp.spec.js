const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test.describe.configure({ mode: 'parallel' });

test('@Web Client App Dashboard', async ({ page }) => {
   const poManager = new POManager(page);

   await page.goto(process.env.BASE_URL);

   const productPage = poManager.getProductPage();
   const titles = await productPage.products.locator('b').allTextContents();
   console.log(titles);
});

test('@Child windows hadl', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const documentLink = page.locator("[href*='documents-request']");
   const [newPage] = await Promise.all([
     context.waitForEvent('page'),
     documentLink.click(),
   ]);

   const text = await newPage.locator(".red").textContent();
   const domain = text.split("@")[1].split(" ")[0];

   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").inputValue());
});