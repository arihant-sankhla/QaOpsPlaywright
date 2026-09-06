const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test('@Webst Client App order flow', async ({ page }) => {
   const poManager = new POManager(page);
   const productName = "ZARA COAT 3";

   await page.goto(process.env.BASE_URL);
   console.log("Current URL:", page.url());

   try {
     await expect(page).not.toHaveURL(/.*auth\/login/);
     await page.waitForLoadState('domcontentloaded');
   } catch (e) {
     console.log("Login state might be missing. Current URL:", page.url());
     const body = await page.innerText('body');
     console.log("Body snippet:", body.substring(0, 200));
     throw e;
   }

   const productPage = poManager.getProductPage();
   await productPage.addProductToCart(productName);
   await productPage.openCart();

   const cartPage = poManager.getCartPage();
   await cartPage.verifyProductInCart(productName);
   await cartPage.checkout();

   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.selectCountry("India");
   await checkoutPage.placeOrder();

   await expect(checkoutPage.orderConfirmation).toBeVisible();
});