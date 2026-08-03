class ProductPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.cartButton = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
  }

  async addProductToCart(productName) {
    await this.page.waitForSelector('.card-body');
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
      const title = await this.products.nth(i).locator('b').textContent();
      if (title?.trim() === productName) {
        await this.products.nth(i).getByRole('button', { name: 'Add to Cart' }).click();
        // wait briefly for any toast/feedback that confirms add; tolerant of absence
        await this.page.waitForSelector('.toast-container', { timeout: 3000 }).catch(() => {});
        return;
      }
    }

    throw new Error(`Product not found: ${productName}`);
  }

  async openCart() {
    await this.cartButton.click();
  }
}

module.exports = {
  ProductPage,
};
