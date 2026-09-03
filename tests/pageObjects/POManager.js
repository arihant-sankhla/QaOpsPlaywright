const { expect } = require('@playwright/test');
const { Logger } = require('../utils/logger');
const { config } = require('../utils/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('LoginPage', config.logLevel);
    this.emailInput = page.getByPlaceholder('email@example.com');
    this.passwordInput = page.getByPlaceholder('enter your passsword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    this.logger.info('Navigating to login page', { url: config.baseUrl });
    await this.page.goto(config.baseUrl);
  }

  async login(email, password) {
    this.logger.info('Logging in', { email: email.replace(email.split('@')[0], '***') });
    try {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('.card-body b').first().waitFor({ timeout: config.timeout });
      this.logger.info('Login successful');
    } catch (error) {
      this.logger.error('Login failed', { error: error.message });
      throw error;
    }
  }
}

class ProductPage {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('ProductPage', config.logLevel);
    this.products = page.locator('.card-body');
    this.cartButton = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
  }

  async addProductToCart(productName) {
    this.logger.info('Adding product to cart', { productName });
    try {
      await this.page.waitForSelector('.card-body', { timeout: config.timeout });
      const count = await this.products.count();
      this.logger.debug('Found products', { count });

      for (let i = 0; i < count; ++i) {
        const title = await this.products.nth(i).locator('b').textContent();
        if (title?.trim() === productName) {
          this.logger.info('Found matching product', { index: i });
          await this.products.nth(i).getByRole('button', { name: 'Add to Cart' }).click();
          await this.page.waitForSelector('.toast-container', { timeout: 3000 }).catch(() => {});
          this.logger.info('Product added to cart');
          return;
        }
      }
      throw new Error(`Product not found: ${productName}`);
    } catch (error) {
      this.logger.error('Failed to add product to cart', { error: error.message });
      throw error;
    }
  }

  async openCart() {
    this.logger.info('Opening cart');
    try {
      await this.cartButton.click();
      this.logger.info('Cart opened successfully');
    } catch (error) {
      this.logger.error('Failed to open cart', { error: error.message });
      throw error;
    }
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('CartPage', config.logLevel);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async verifyProductInCart(productName) {
    this.logger.info('Verifying product in cart', { productName });
    try {
      await this.page.locator('div li').first().waitFor({ timeout: config.timeout });
      const isVisible = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
      this.logger.info('Product verification result', { productName, isVisible });
      return isVisible;
    } catch (error) {
      this.logger.error('Product verification failed', { error: error.message });
      throw error;
    }
  }

  async checkout() {
    this.logger.info('Proceeding to checkout');
    try {
      await this.checkoutButton.click();
      this.logger.info('Checkout initiated');
    } catch (error) {
      this.logger.error('Checkout failed', { error: error.message });
      throw error;
    }
  }
}

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('CheckoutPage', config.logLevel);
    this.countryInput = page.getByPlaceholder('Select Country');
    this.placeOrderButton = page.getByText('PLACE ORDER');
    this.orderConfirmation = page.getByText('Thankyou for the order.');
    this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async selectCountry(country) {
    this.logger.info('Selecting country', { country });
    try {
      await this.countryInput.pressSequentially(country.slice(0, 3), { delay: 150 });
      await this.page.getByRole('button', { name: country }).nth(1).click();
      this.logger.info('Country selected', { country });
    } catch (error) {
      this.logger.error('Country selection failed', { error: error.message });
      throw error;
    }
  }

  async placeOrder() {
    this.logger.info('Placing order');
    try {
      const backdrop = this.page.locator('.ta-backdrop');
      try {
        await backdrop.waitFor({ state: 'hidden', timeout: 3000 });
      } catch (e) {
        this.logger.debug('Backdrop still visible, pressing Escape');
        await this.page.keyboard.press('Escape');
        await backdrop.waitFor({ state: 'hidden', timeout: 2000 });
      }
      await this.placeOrderButton.click();
      await expect(this.orderConfirmation).toBeVisible({ timeout: config.timeout });
      this.logger.info('Order placed successfully');
    } catch (error) {
      this.logger.error('Order placement failed', { error: error.message });
      throw error;
    }
  }

  async getOrderId() {
    this.logger.info('Retrieving order ID');
    try {
      const orderId = await this.orderIdLocator.textContent();
      this.logger.info('Order ID retrieved', { orderId: orderId?.trim() });
      return orderId;
    } catch (error) {
      this.logger.error('Failed to retrieve order ID', { error: error.message });
      throw error;
    }
  }
}

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
