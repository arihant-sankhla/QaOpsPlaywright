const {When, Then, Given,Before, setDefaultTimeout}= require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const { config } = require('../../tests/utils/config');
const { Logger } = require('../../tests/utils/logger');

let browser;
let context;
let page;
let logger;

Before(async () => {
    logger = new Logger('CucumberSteps', config.logLevel);
    logger.info('Setting up browser context');
    browser = await chromium.launch({
      headless: !config.isHeaded
    });
   context = await browser.newContext();
   page = await context.newPage();
});

setDefaultTimeout(60 * 1000);

Given('a login to ecommerce application with {string} and {string}',{timeout: 100*1000}, async function (username, password) {
   logger.info('Logging in with provided credentials');
   const products = await page.locator(".card-body");
   await page.goto(config.baseUrl);
   await page.getByPlaceholder("email@example.com").fill(username);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   logger.info('Login completed');
});

When('Add {string} to Cart', async function (string) {
  logger.info('Adding product to cart', { productName: string });
  await page.locator(".card-body b").first().waitFor(); 
   await page.locator(".card-body").filter({hasText:string})
   .getByRole("button",{name:"Add to Cart"}).click();
   logger.info('Product added to cart');
});

Then('verify Cart', async function () {
   logger.info('Verifying cart contents');
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name :"Checkout"}).click();
   logger.info('Cart verified and checkout initiated');
});

Then('Enter user details and Place Order', async function () {
   logger.info('Entering checkout details and placing order');
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   logger.info('Order placed successfully');
});

Then('Verify Order in OrderHistory page',async function () {
  logger.info('Verifying order in order history');
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   logger.info('Order ID retrieved', { orderId });
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   logger.info('Order verification completed successfully');
});