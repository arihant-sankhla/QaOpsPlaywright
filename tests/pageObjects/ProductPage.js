const { Logger } = require('../utils/logger');
const { config } = require('../utils/config');

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
          this.logger.info('Found matching product', { index: i, title });
          await this.products.nth(i).getByRole('button', { name: 'Add to Cart' }).click();
          this.logger.info('Product added to cart');
          // Wait for toast confirmation if available
          await this.page.waitForSelector('.toast-container', { timeout: 3000 }).catch(() => {});
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
      await this.page.waitForURL(/.*cart/, { timeout: config.timeout });
      this.logger.info('Cart opened successfully');
    } catch (error) {
      this.logger.error('Failed to open cart', { error: error.message });
      throw error;
    }
  }
}

module.exports = {
  ProductPage,
};
