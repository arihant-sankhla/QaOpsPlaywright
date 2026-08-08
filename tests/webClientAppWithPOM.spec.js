const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test.skip ('@Web Client App login and order with POManager', async ({ page }) => {
  const poManager = new POManager(page);
  const email = 'anshika@gmail.com';
  const password = 'Iamking@000';
  const productName = 'ZARA COAT 3';

  await poManager.getLoginPage().goto();
  await poManager.getLoginPage().login(email, password);

  await poManager.getProductPage().addProductToCart(productName);
  await poManager.getProductPage().openCart();

  await expect(await poManager.getCartPage().verifyProductInCart(productName)).toBeTruthy();
  await poManager.getCartPage().checkout();

  await poManager.getCheckoutPage().selectCountry('India');
  await poManager.getCheckoutPage().placeOrder();

  const orderId = await poManager.getCheckoutPage().getOrderId();
  console.log('Order ID:', orderId.trim());
});
