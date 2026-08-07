# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recordedTest.spec.js >> test
- Location: tests\recordedTest.spec.js:3:5

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.click: Test timeout of 40000ms exceeded.
Call log:
  - waiting for getByText('India')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - navigation [ref=e13]:
      - generic [ref=e14]:
        - link "ProtoCommerce Home" [ref=e15] [cursor=pointer]:
          - /url: "#"
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19] [cursor=pointer]:
              - text: Checkout ( 1 )
              - generic [ref=e20]: (current)
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - text: Please choose your delivery location.
          - text: Then click on purchase button
        - textbox "Please choose your delivery location. Then click on purchase button" [active] [ref=e26]: indi
      - generic [ref=e27]:
        - checkbox "I agree with the term & Conditions" [ref=e28]
        - generic [ref=e29] [cursor=pointer]: I agree with the term & Conditions
      - button "Purchase" [ref=e31] [cursor=pointer]
    - contentinfo [ref=e32]:
      - paragraph [ref=e34]: Copyright © ProtoCommerce 2018
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
  4  |   await page.goto('https://rahulshettyacademy.com/angularpractice/');
  5  |   await page.getByRole('link', { name: 'Shop' }).click();
  6  |   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  7  |   await page.getByText('Checkout ( 1 ) (current)').click();
  8  |   await page.getByRole('button', { name: 'Checkout' }).click();
  9  |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  10 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('indi');
> 11 |   await page.getByText('India').click();
     |                                 ^ Error: locator.click: Test timeout of 40000ms exceeded.
  12 |   await page.getByText('I agree with the term &').click();
  13 |   await page.getByRole('button', { name: 'Purchase' }).click();
  14 |   await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  15 |   await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  16 | });
```