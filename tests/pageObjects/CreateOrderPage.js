const { expect } = require('@playwright/test');

class CreateOrderPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.countryInput = page.getByPlaceholder('Select Country');
    this.placeOrderButton = page.getByText('PLACE ORDER');
    this.orderConfirmation = page.getByText('Thankyou for the order.');
    this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async verifyProductInCart(productName) {
    await this.page.locator('div li').first().waitFor();
    return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async selectCountry(country) {
    // type a short prefix and wait for suggestions to appear
    await this.countryInput.fill(country.slice(0, 3));
    await this.page.waitForSelector('.ta-results', { timeout: 60000 });
    await this.page.locator('.ta-results button').filter({ hasText: country }).first().click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.orderConfirmation).toBeVisible({ timeout: 60000 });
    return (await this.orderIdLocator.textContent())?.trim() || '';
  }
}

module.exports = {
  CreateOrderPage,
};
