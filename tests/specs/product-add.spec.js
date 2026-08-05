const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('product: add first product to cart and verify', async ({ page }) => {
  const EMAIL = process.env.TEST_USER_EMAIL;
  const PASSWORD = process.env.TEST_USER_PASSWORD;
  test.skip(!EMAIL || !PASSWORD, 'Credentials required for end-to-end flows');

  const po = new POManager(page);
  const login = po.getLoginPage();
  await login.goto();
  await login.login(EMAIL, PASSWORD);

  const productPage = po.getProductPage();
  // capture first product title dynamically
  const firstTitle = (await page.locator('.card-body b').first().textContent()).trim();
  await productPage.addProductToCart(firstTitle);
  await productPage.openCart();

  const cartPage = po.getCartPage();
  const present = await cartPage.verifyProductInCart(firstTitle);
  expect(present).toBeTruthy();
});
