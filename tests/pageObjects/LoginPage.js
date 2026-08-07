class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator("[value='Login']")
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 60000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator('.card-body').first().waitFor({ timeout: 60000 });
  }
}

module.exports = {
  LoginPage,
};
