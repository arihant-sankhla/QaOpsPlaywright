const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObjects/POManager');
const { config } = require('./utils/config');
const { Logger } = require('./utils/logger');

const logger = new Logger('webClientAppWithPOM.spec', config.logLevel);

test('@Web Client App login and order with POManager', async ({ page }) => {
  logger.info('Starting Web Client App test with POM');
  const poManager = new POManager(page);
  const productName = 'ZARA COAT 3';

  try {
    await poManager.getLoginPage().goto();
    await poManager.getLoginPage().login(config.testEmail, config.testPassword);

    await poManager.getProductPage().addProductToCart(productName);
    await poManager.getProductPage().openCart();

    const isInCart = await poManager.getCartPage().verifyProductInCart(productName);
    expect(isInCart).toBeTruthy();
    await poManager.getCartPage().checkout();

    await poManager.getCheckoutPage().selectCountry('India');
    await poManager.getCheckoutPage().placeOrder();

    const orderId = await poManager.getCheckoutPage().getOrderId();
    logger.info('Test passed: Order placed successfully', { orderId: orderId?.trim() });
    expect(orderId).toBeTruthy();
  } catch (error) {
    logger.error('Test failed', { error: error.message });
    throw error;
  }
});
