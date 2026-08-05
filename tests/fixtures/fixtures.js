const base = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await use(lp);
  },
});

module.exports = { test, expect: base.expect };
