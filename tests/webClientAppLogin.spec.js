const { test, expect } = require('@playwright/test');
const { config } = require('./utils/config');
const { Logger } = require('./utils/logger');

const logger = new Logger('webClientAppLogin.spec', config.logLevel);

test.skip('@Webst Client App login', async ({ page }) => {
   logger.info('Starting Web Client App login test');
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   
   try {
      await page.goto(config.baseUrl);
      await page.getByPlaceholder('email@example.com').fill(config.testEmail);
      await page.getByPlaceholder('enter your passsword').fill(config.testPassword);
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForLoadState('networkidle');
      await page.locator(".card-body b").first().waitFor({ timeout: config.timeout });
      
      const titles = await page.locator(".card-body b").allTextContents();
      logger.info('Products loaded', { count: titles.length });
      
      const count = await products.count();
      for (let i = 0; i < count; ++i) {
         if (await products.nth(i).locator("b").textContent() === productName) {
            logger.info('Found product, adding to cart', { productName });
            await products.nth(i).locator("text= Add To Cart").click();
            break;
         }
      }
   
      await page.locator("[routerlink*='cart']").click();
      await page.waitForURL(/.*cart/, { timeout: config.timeout });
      const cartItem = page.locator("div li:has(h3:has-text('ZARA COAT 3'))");
      await expect(cartItem).toBeVisible({ timeout: config.timeout });
      
      await page.locator("text=Checkout").click();
   
      const countryInput = page.getByPlaceholder('Select Country');
      await countryInput.pressSequentially('India');
      const dropdown = page.locator(".ta-results");
      await dropdown.locator('button', { hasText: 'India' }).click();
   
      expect(page.locator(".user__name [type='text']").first()).toHaveText(config.testEmail);
      await page.locator(".action__submit").click();
      await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
      const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      logger.info('Order placed', { orderId });
   
      await page.locator("button[routerlink*='myorders']").click();
      await page.locator("tbody").waitFor({ timeout: config.timeout });
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
      logger.info('Test passed: Order verified in history');
   } catch (error) {
      logger.error('Test failed', { error: error.message });
      throw error;
   }
});