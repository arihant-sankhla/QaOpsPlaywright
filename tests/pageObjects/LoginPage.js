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

module.exports = {
  LoginPage,
};
