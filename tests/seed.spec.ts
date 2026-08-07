import { test, expect } from '@playwright/test';

const baseUrl = 'https://rahulshettyacademy.com/seleniumPractise/#/';

async function openCart(page: any) {
  const cartIcon = page.locator('a.cart-icon').first();
  await expect(cartIcon).toBeVisible();
  await cartIcon.click();
  await expect(page.locator('.cart-preview')).toBeVisible();
}

test.describe('Selenium Practise shopping flow', () => {
  test('loads the homepage and adds a product to the cart', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    const productCards = page.locator('.product');
    await expect(productCards.first()).toBeVisible();

    const firstProductCard = productCards.first();
    const firstProductName = (await firstProductCard.locator('h4.product-name, h4').first().textContent())?.trim() ?? '';

    await firstProductCard.locator('button').filter({ hasText: /add to cart/i }).first().click();

    await openCart(page);

    await expect(page.locator('body')).toContainText(/cart/i);
    if (firstProductName) {
      await expect(page.locator('body')).toContainText(firstProductName);
    }
  });

  test('adds multiple products and opens the cart', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    const productCards = page.locator('.product');
    await expect(productCards.first()).toBeVisible();

    await productCards.first().locator('button').filter({ hasText: /add to cart/i }).first().click();
    await productCards.nth(1).locator('button').filter({ hasText: /add to cart/i }).first().click();

    await openCart(page);
    await expect(page.locator('body')).toContainText(/cart/i);
  });

  test('proceeds from the cart into checkout', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    const productCards = page.locator('.product');
    await expect(productCards.first()).toBeVisible();

    await productCards.first().locator('button').filter({ hasText: /add to cart/i }).first().click();
    await openCart(page);

    await expect(page.locator('body')).toContainText(/cart/i);

    const checkoutButton = page.locator('.cart-preview button, .cart-preview a').filter({ hasText: /checkout|proceed|place order/i }).first();
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await expect(page.locator('body')).toContainText(/checkout|place order/i);
  });
});