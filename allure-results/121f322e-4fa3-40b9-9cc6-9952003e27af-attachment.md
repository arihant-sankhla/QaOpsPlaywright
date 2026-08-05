# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: webClientAppWithPOM.spec.js >> @Web Client App login and order with POManager
- Location: tests\webClientAppWithPOM.spec.js:4:1

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1   | const { expect } = require('@playwright/test');
  2   | 
  3   | class LoginPage {
  4   |   constructor(page) {
  5   |     this.page = page;
  6   |     this.emailInput = page.getByPlaceholder('email@example.com');
  7   |     this.passwordInput = page.getByPlaceholder('enter your passsword');
  8   |     this.loginButton = page.getByRole('button', { name: 'Login' });
  9   |   }
  10  | 
  11  |   async goto() {
  12  |     await this.page.goto('https://rahulshettyacademy.com/client');
  13  |   }
  14  | 
  15  |   async login(email, password) {
  16  |     await this.emailInput.fill(email);
  17  |     await this.passwordInput.fill(password);
  18  |     await this.loginButton.click();
  19  |     await this.page.waitForLoadState('networkidle');
  20  |     await this.page.locator('.card-body b').first().waitFor();
  21  |   }
  22  | }
  23  | 
  24  | class ProductPage {
  25  |   constructor(page) {
  26  |     this.page = page;
  27  |     this.products = page.locator('.card-body');
  28  |     this.cartButton = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
  29  |   }
  30  | 
  31  |   async addProductToCart(productName) {
  32  |     await this.page.waitForSelector('.card-body');
  33  |     const count = await this.products.count();
  34  |     for (let i = 0; i < count; ++i) {
  35  |       const title = await this.products.nth(i).locator('b').textContent();
  36  |       if (title.trim() === productName) {
  37  |         await this.products.nth(i).getByRole('button', { name: 'Add to Cart' }).click();
  38  |         return;
  39  |       }
  40  |     }
  41  |     throw new Error(`Product not found: ${productName}`);
  42  |   }
  43  | 
  44  |   async openCart() {
  45  |     await this.cartButton.click();
  46  |   }
  47  | }
  48  | 
  49  | class CartPage {
  50  |   constructor(page) {
  51  |     this.page = page;
  52  |     this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  53  |   }
  54  | 
  55  |   async verifyProductInCart(productName) {
> 56  |     await this.page.locator('div li').first().waitFor();
      |                                               ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  57  |     return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
  58  |   }
  59  | 
  60  |   async checkout() {
  61  |     await this.checkoutButton.click();
  62  |   }
  63  | }
  64  | 
  65  | class CheckoutPage {
  66  |   constructor(page) {
  67  |     this.page = page;
  68  |     this.countryInput = page.getByPlaceholder('Select Country');
  69  |     this.placeOrderButton = page.getByText('PLACE ORDER');
  70  |     this.orderConfirmation = page.getByText('Thankyou for the order.');
  71  |     this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  72  |   }
  73  | 
  74  |   async selectCountry(country) {
  75  |     await this.countryInput.pressSequentially(country.slice(0, 3), { delay: 150 });
  76  |     await this.page.getByRole('button', { name: country }).nth(1).click();
  77  |   }
  78  | 
  79  |   async placeOrder() {
  80  |     await this.placeOrderButton.click();
  81  |     await expect(this.orderConfirmation).toBeVisible();
  82  |   }
  83  | 
  84  |   async getOrderId() {
  85  |     return await this.orderIdLocator.textContent();
  86  |   }
  87  | }
  88  | 
  89  | class POManager {
  90  |   constructor(page) {
  91  |     this.page = page;
  92  |     this.loginPage = null;
  93  |     this.productPage = null;
  94  |     this.cartPage = null;
  95  |     this.checkoutPage = null;
  96  |   }
  97  | 
  98  |   getLoginPage() {
  99  |     if (!this.loginPage) this.loginPage = new LoginPage(this.page);
  100 |     return this.loginPage;
  101 |   }
  102 | 
  103 |   getProductPage() {
  104 |     if (!this.productPage) this.productPage = new ProductPage(this.page);
  105 |     return this.productPage;
  106 |   }
  107 | 
  108 |   getCartPage() {
  109 |     if (!this.cartPage) this.cartPage = new CartPage(this.page);
  110 |     return this.cartPage;
  111 |   }
  112 | 
  113 |   getCheckoutPage() {
  114 |     if (!this.checkoutPage) this.checkoutPage = new CheckoutPage(this.page);
  115 |     return this.checkoutPage;
  116 |   }
  117 | }
  118 | 
  119 | module.exports = {
  120 |   POManager,
  121 | };
  122 | 
```