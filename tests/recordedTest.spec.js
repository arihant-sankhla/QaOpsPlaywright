import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  const countryInput = page.getByRole('textbox', { name: 'Please choose your delivery' });
  await countryInput.type('indi', { delay: 100 });
  // Avoid clicking the suggestions overlay which can intercept pointer events.
  await countryInput.evaluate((el) => {
    el.value = 'India';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const suggestions = page.locator('.suggestions');
  try {
    await suggestions.waitFor({ state: 'hidden', timeout: 3000 });
  } catch (e) {
    await page.keyboard.press('Escape');
    try {
      await suggestions.waitFor({ state: 'hidden', timeout: 2000 });
    } catch {}
  }

  // If an overlay still intercepts pointer events, toggle the checkbox via page script
  await page.waitForLoadState('networkidle');
  const checkbox = page.locator('#checkbox2');
  await expect(checkbox).toBeVisible({ timeout: 10000 });
  await checkbox.check({ force: true });

  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
});