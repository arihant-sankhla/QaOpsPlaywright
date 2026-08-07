# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: webClientAppLogin.spec.js >> @Webst Client App login
- Location: tests\webClientAppLogin.spec.js:6:1

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
  1  | const { test, expect } = require('@playwright/test');
  2  |  
  3  |  
  4  |  
  5  |  
  6  | test('@Webst Client App login', async ({ page }) => {
  7  |    //js file- Login js, DashboardPage
  8  |    const email = "anshika@gmail.com";
  9  |    const productName = 'ZARA COAT 3';
  10 |    const products = page.locator(".card-body");
  11 |    await page.goto("https://rahulshettyacademy.com/client");
  12 |    await page.locator("#userEmail").fill(email);
  13 |    await page.locator("#userPassword").fill("Iamking@000");
  14 |    await page.locator("[value='Login']").click();
  15 |    await page.waitForLoadState('networkidle');
  16 |    await page.locator(".card-body b").first().waitFor();
  17 |    const titles = await page.locator(".card-body b").allTextContents();
  18 |    console.log(titles); 
  19 |    const count = await products.count();
  20 |    for (let i = 0; i < count; ++i) {
  21 |       if (await products.nth(i).locator("b").textContent() === productName) {
  22 |          //add to cart
  23 |          await products.nth(i).locator("text= Add To Cart").click();
  24 |          break;
  25 |       }
  26 |    }
  27 |  
  28 |    await page.locator("[routerlink*='cart']").click();
  29 |    //await page.pause();
  30 |  
> 31 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  32 |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  33 |    //expect(bool).toBeTruthy();
  34 |    await page.locator("text=Checkout").click();
  35 |  
  36 |   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
  37 |    const dropdown = page.locator(".ta-results");
  38 |    await dropdown.waitFor();
  39 |    const optionsCount = await dropdown.locator("button").count();
  40 |    for (let i = 0; i < optionsCount; ++i) {
  41 |       const text = await dropdown.locator("button").nth(i).textContent();
  42 |       if (text === " India") {
  43 |          await dropdown.locator("button").nth(i).click();
  44 |          break;
  45 |       }
  46 |    }
  47 |  
  48 |    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  49 |    await page.locator(".action__submit").click();
  50 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  51 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  52 |    console.log(orderId);
  53 |  
  54 |    await page.locator("button[routerlink*='myorders']").click();
  55 |    await page.locator("tbody").waitFor();
  56 |    const rows = await page.locator("tbody tr");
  57 |  
  58 |  
  59 |    for (let i = 0; i < await rows.count(); ++i) {
  60 |       const rowOrderId = await rows.nth(i).locator("th").textContent();
  61 |       if (orderId.includes(rowOrderId)) {
  62 |          await rows.nth(i).locator("button").first().click();
  63 |          break;
  64 |       }
  65 |    }
  66 |    const orderIdDetails = await page.locator(".col-text").textContent();
  67 |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  68 |  
  69 | });
```