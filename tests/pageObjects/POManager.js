const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('email@example.com');
    this.passwordInput = page.getByPlaceholder('enter your passsword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.card-body b').first().waitFor();
  }
}

class ProductPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.cartButton = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
  }

  async addProductToCart(productName) {
    await this.products.first().waitFor({ state: 'visible', timeout: 15000 });
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      const title = await this.products.nth(i).locator('b').textContent();
      if (title?.trim() === productName) {
        await this.products.nth(i).getByRole('button', { name: 'Add to Cart' }).click();
        return;
      }
    }
    throw new Error(`Product not found: ${productName}`);
  }

  async openCart() {
    await this.cartButton.click();
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async verifyProductInCart(productName) {
    await this.page.locator('div li').first().waitFor();
    return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.countryInput = page.getByPlaceholder('Select Country');
    this.placeOrderButton = page.getByText('PLACE ORDER');
    this.orderConfirmation = page.getByText('Thankyou for the order.');
    this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async selectCountry(country) {
    await this.countryInput.pressSequentially(country.slice(0, 3), { delay: 150 });
    await this.page.getByRole('button', { name: country }).nth(1).click();
  }

  async placeOrder() {
    const backdrop = this.page.locator('.ta-backdrop');
    try {
      await backdrop.waitFor({ state: 'hidden', timeout: 3000 });
    } catch (e) {
      await this.page.keyboard.press('Escape');
      await backdrop.waitFor({ state: 'hidden', timeout: 2000 });
    }
    await this.placeOrderButton.click();
    await expect(this.orderConfirmation).toBeVisible();
  }

  async getOrderId() {
    return await this.orderIdLocator.textContent();
  }
}

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = null;
    this.productPage = null;
    this.cartPage = null;
    this.checkoutPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) this.loginPage = new LoginPage(this.page);
    return this.loginPage;
  }

  getProductPage() {
    if (!this.productPage) this.productPage = new ProductPage(this.page);
    return this.productPage;
  }

  getCartPage() {
    if (!this.cartPage) this.cartPage = new CartPage(this.page);
    return this.cartPage;
  }

  getCheckoutPage() {
    if (!this.checkoutPage) this.checkoutPage = new CheckoutPage(this.page);
    return this.checkoutPage;
  }
}

module.exports = {
  POManager,
};
