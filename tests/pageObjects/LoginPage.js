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
      await this.emailInput.waitFor({ state: 'visible', timeout: config.timeout });
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

module.exports = {
  LoginPage,
};
