const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('order: complete checkout and place order', async ({ page }) => {
  const EMAIL = process.env.TEST_USER_EMAIL;
  const PASSWORD = process.env.TEST_USER_PASSWORD;
  test.skip(!EMAIL || !PASSWORD, 'Credentials required for end-to-end flows');

  const po = new POManager(page);
  const login = po.getLoginPage();
  await login.goto();
  await login.login(EMAIL, PASSWORD);

  const productPage = po.getProductPage();
  const firstTitle = (await page.locator('.card-body b').first().textContent()).trim();
  await productPage.addProductToCart(firstTitle);
  await productPage.openCart();

  const cartPage = po.getCartPage();
  const present = await cartPage.verifyProductInCart(firstTitle);
  expect(present).toBeTruthy();

  await cartPage.checkout();
  const checkout = po.getCheckoutPage();
  await checkout.selectCountry('India');
  await checkout.placeOrder();
  const orderId = await checkout.getOrderId();
  expect(orderId).toBeTruthy();
});
