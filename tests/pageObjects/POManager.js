const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { Logger } = require('../utils/logger');
const { config } = require('../utils/config');

class POManager {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('POManager', config.logLevel);
    this.loginPage = null;
    this.productPage = null;
    this.cartPage = null;
    this.checkoutPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
      this.logger.debug('LoginPage instantiated');
    }
    return this.loginPage;
  }

  getProductPage() {
    if (!this.productPage) {
      this.productPage = new ProductPage(this.page);
      this.logger.debug('ProductPage instantiated');
    }
    return this.productPage;
  }

  getCartPage() {
    if (!this.cartPage) {
      this.cartPage = new CartPage(this.page);
      this.logger.debug('CartPage instantiated');
    }
    return this.cartPage;
  }

  getCheckoutPage() {
    if (!this.checkoutPage) {
      this.checkoutPage = new CheckoutPage(this.page);
      this.logger.debug('CheckoutPage instantiated');
    }
    return this.checkoutPage;
  }
}

module.exports = {
  POManager,
  LoginPage,
  ProductPage,
  CartPage,
  CheckoutPage,
};
