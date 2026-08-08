const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/', { waitUntil: 'networkidle' });
  await page.locator('.product').first().locator('button', { hasText: 'ADD TO CART' }).click();
  const cartButtons = await page.locator('text=Cart').all();
  console.log('cartButtons length', cartButtons.length);
  for (let i = 0; i < cartButtons.length; i++) {
    const el = cartButtons[i];
    const text = await el.textContent();
    const box = await el.boundingBox();
    console.log('Cart', i, { text: text?.trim(), box });
  }
  console.log('---');
  const cartIcon = await page.locator('header .cart').first();
  console.log('header .cart count', await cartIcon.count());
  console.log('header .cart visible', await cartIcon.isVisible().catch(() => false));
  console.log('header .cart attributes', await cartIcon.evaluate(el => ({ class: el.className, id: el.id, outerHTML: el.outerHTML })).catch(()=>'no'));  
  console.log('---');

  const preview = await page.locator('.cart-preview').first();
  console.log('cart preview display', await preview.evaluate(el => window.getComputedStyle(el).display));
  console.log('cart preview outerHTML', await preview.evaluate(el => el.outerHTML));
  console.log('---');

  const proceedButtons = await page.locator('button, a').filter({ hasText: /checkout|proceed|place order/i }).all();
  console.log('proceedButtons count', proceedButtons.length);
  for (let i = 0; i < proceedButtons.length; i++) {
    const btn = proceedButtons[i];
    console.log('button', i, { text: await btn.textContent(), visible: await btn.isVisible().catch(() => false), box: await btn.boundingBox() });
  }

  await browser.close();
})();
