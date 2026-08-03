const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');

test('@Web Client App login and order with POManager', async ({ page }) => {
  const poManager = new POManager(page);
  const email = 'anshika@gmail.com';
  const password = 'Iamking@000';
  const productName = 'ZARA COAT 3';

  await poManager.getLoginPage().goto();
  await poManager.getLoginPage().login(email, password);

  await poManager.getProductPage().addProductToCart(productName);
  await poManager.getProductPage().openCart();

  const isProductVisible = await poManager.getCreateOrderPage().verifyProductInCart(productName);
  expect(isProductVisible).toBeTruthy();

  await poManager.getCreateOrderPage().checkout();
  await poManager.getCreateOrderPage().selectCountry('Ind');
  await poManager.getCreateOrderPage().selectCountry('ia');
  const orderId = await poManager.getCreateOrderPage().placeOrder();

  await poManager.getOrderHistoryPage().openOrderHistory();
  const orderFound = await poManager.getOrderHistoryPage().verifyOrderExists(orderId);
});
