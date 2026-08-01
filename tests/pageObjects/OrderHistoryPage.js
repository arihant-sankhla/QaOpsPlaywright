class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderHistoryButton = page.getByRole('button', { name: /orders/i }).first();
  }

  async openOrderHistory() {
    await this.orderHistoryButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOrderExists(orderId) {
    const normalizedOrderId = orderId?.trim();
    if (!normalizedOrderId) {
      return false;
    }

    const orderRow = this.page.locator('tbody tr').filter({ hasText: normalizedOrderId });
    return (await orderRow.count()) > 0;
  }
}

module.exports = {
  OrderHistoryPage,
};
