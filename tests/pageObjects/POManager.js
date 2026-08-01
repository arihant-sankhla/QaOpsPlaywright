const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');
const { CreateOrderPage } = require('./CreateOrderPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = null;
    this.productPage = null;
    this.createOrderPage = null;
    this.orderHistoryPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) this.loginPage = new LoginPage(this.page);
    return this.loginPage;
  }

  getProductPage() {
    if (!this.productPage) this.productPage = new ProductPage(this.page);
    return this.productPage;
  }

  getCreateOrderPage() {
    if (!this.createOrderPage) this.createOrderPage = new CreateOrderPage(this.page);
    return this.createOrderPage;
  }

  getOrderHistoryPage() {
    if (!this.orderHistoryPage) this.orderHistoryPage = new OrderHistoryPage(this.page);
    return this.orderHistoryPage;
  }
}

module.exports = {
  POManager,
};
