const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/', { waitUntil: 'domcontentloaded' });
  await page.locator('.product').first().locator('button', { hasText: 'ADD TO CART' }).click();
  await page.locator('text=Cart').first().click();
  await page.waitForTimeout(2000);
  const result = await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('button, a')).find(el => /checkout|proceed|place order/i.test(el.textContent || ''));
    if (!button) return { found: false };
    const style = window.getComputedStyle(button);
    const ancestors = [];
    let el = button;
    while (el) {
      ancestors.push({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        display: window.getComputedStyle(el).display,
        visibility: window.getComputedStyle(el).visibility,
        opacity: window.getComputedStyle(el).opacity,
        transform: window.getComputedStyle(el).transform,
        pointerEvents: window.getComputedStyle(el).pointerEvents,
        hidden: el.hidden,
        offsetParent: el.offsetParent ? el.offsetParent.tagName : null,
      });
      el = el.parentElement;
    }
    return {
      found: true,
      text: button.textContent.trim(),
      style: {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
      },
      rect: button.getBoundingClientRect().toJSON(),
      ancestors,
      bodyOverflow: window.getComputedStyle(document.body).overflow,
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
