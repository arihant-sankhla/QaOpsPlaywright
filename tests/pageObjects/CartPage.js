const { Logger } = require('../utils/logger');
const { config } = require('../utils/config');

class CartPage {
  constructor(page) {
    this.page = page;
    this.logger = new Logger('CartPage', config.logLevel);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async verifyProductInCart(productName) {
    this.logger.info('Verifying product in cart', { productName });
    try {
      await this.page.locator(`h3:has-text("${productName}")`).waitFor({ timeout: config.timeout });
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

module.exports = { CartPage };
