# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recordedTest.spec.js >> test
- Location: tests\recordedTest.spec.js:3:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/angularpractice/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
> 4  |   await page.goto('https://rahulshettyacademy.com/angularpractice/');
     |              ^ Error: page.goto: Target page, context or browser has been closed
  5  |   await page.getByRole('link', { name: 'Shop' }).click();
  6  |   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  7  |   await page.getByText('Checkout ( 1 ) (current)').click();
  8  |   await page.getByRole('button', { name: 'Checkout' }).click();
  9  |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  10 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('indi');
  11 |   await page.getByText('India').click();
  12 |   await page.getByText('I agree with the term &').click();
  13 |   await page.getByRole('button', { name: 'Purchase' }).click();
  14 |   await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  15 |   await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  16 | });
```