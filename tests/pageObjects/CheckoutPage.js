const { expect } = require('@playwright/test');
const { Logger } = require('../utils/logger');
const { config } = require('../utils/config');

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

module.exports = { CheckoutPage };
