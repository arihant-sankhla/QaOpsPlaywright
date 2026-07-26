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
Error: locator.textContent: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('.col-text')

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
    - heading "Your Orders" [level=1] [ref=e26]
    - table [ref=e27]:
      - rowgroup [ref=e28]:
        - row "Order Id Product Image Name Price Ordered Date View Delete" [ref=e29]:
          - columnheader "Order Id" [ref=e30]
          - columnheader "Product Image" [ref=e31]
          - columnheader "Name" [ref=e32]
          - columnheader "Price" [ref=e33]
          - columnheader "Ordered Date" [ref=e34]
          - columnheader "View" [ref=e35]
          - columnheader "Delete" [ref=e36]
      - rowgroup [ref=e37]:
        - row "6a5a641285b8849b49f37dc7 ZARA COAT 3 $ 11500 Fri Jul 17 View Delete" [ref=e38]:
          - rowheader "6a5a641285b8849b49f37dc7" [ref=e39]
          - cell [ref=e40]:
            - img [ref=e41]
          - cell "ZARA COAT 3" [ref=e42]
          - cell "$ 11500" [ref=e43]
          - cell "Fri Jul 17" [ref=e44]
          - cell "View" [ref=e45]:
            - button "View" [ref=e46] [cursor=pointer]
          - cell "Delete" [ref=e47]:
            - button "Delete" [ref=e48] [cursor=pointer]
        - row "6a5a63f385b8849b49f37d7b ADIDAS ORIGINAL $ 11500 Fri Jul 17 View Delete" [ref=e49]:
          - rowheader "6a5a63f385b8849b49f37d7b" [ref=e50]
          - cell [ref=e51]:
            - img [ref=e52]
          - cell "ADIDAS ORIGINAL" [ref=e53]
          - cell "$ 11500" [ref=e54]
          - cell "Fri Jul 17" [ref=e55]
          - cell "View" [ref=e56]:
            - button "View" [ref=e57] [cursor=pointer]
          - cell "Delete" [ref=e58]:
            - button "Delete" [ref=e59] [cursor=pointer]
        - row "6a5a63f385b8849b49f37d74 ADIDAS ORIGINAL $ 11500 Fri Jul 17 View Delete" [ref=e60]:
          - rowheader "6a5a63f385b8849b49f37d74" [ref=e61]
          - cell [ref=e62]:
            - img [ref=e63]
          - cell "ADIDAS ORIGINAL" [ref=e64]
          - cell "$ 11500" [ref=e65]
          - cell "Fri Jul 17" [ref=e66]
          - cell "View" [ref=e67]:
            - button "View" [ref=e68] [cursor=pointer]
          - cell "Delete" [ref=e69]:
            - button "Delete" [ref=e70] [cursor=pointer]
        - row "6a5a622d85b8849b49f37abb ZARA COAT 3 $ 11500 Fri Jul 17 View Delete" [ref=e71]:
          - rowheader "6a5a622d85b8849b49f37abb" [ref=e72]
          - cell [ref=e73]:
            - img [ref=e74]
          - cell "ZARA COAT 3" [ref=e75]
          - cell "$ 11500" [ref=e76]
          - cell "Fri Jul 17" [ref=e77]
          - cell "View" [ref=e78]:
            - button "View" [ref=e79] [cursor=pointer]
          - cell "Delete" [ref=e80]:
            - button "Delete" [ref=e81] [cursor=pointer]
        - row "6a5a615985b8849b49f379c0 ZARA COAT 3 $ 11500 Fri Jul 17 View Delete" [ref=e82]:
          - rowheader "6a5a615985b8849b49f379c0" [ref=e83]
          - cell [ref=e84]:
            - img [ref=e85]
          - cell "ZARA COAT 3" [ref=e86]
          - cell "$ 11500" [ref=e87]
          - cell "Fri Jul 17" [ref=e88]
          - cell "View" [ref=e89]:
            - button "View" [ref=e90] [cursor=pointer]
          - cell "Delete" [ref=e91]:
            - button "Delete" [ref=e92] [cursor=pointer]
        - row "6a5a615985b8849b49f379b4 ZARA COAT 3 $ 11500 Fri Jul 17 View Delete" [ref=e93]:
          - rowheader "6a5a615985b8849b49f379b4" [ref=e94]
          - cell [ref=e95]:
            - img [ref=e96]
          - cell "ZARA COAT 3" [ref=e97]
          - cell "$ 11500" [ref=e98]
          - cell "Fri Jul 17" [ref=e99]
          - cell "View" [ref=e100]:
            - button "View" [ref=e101] [cursor=pointer]
          - cell "Delete" [ref=e102]:
            - button "Delete" [ref=e103] [cursor=pointer]
        - row "6a5a614d85b8849b49f37966 ADIDAS ORIGINAL $ 11500 Fri Jul 17 View Delete" [ref=e104]:
          - rowheader "6a5a614d85b8849b49f37966" [ref=e105]
          - cell [ref=e106]:
            - img [ref=e107]
          - cell "ADIDAS ORIGINAL" [ref=e108]
          - cell "$ 11500" [ref=e109]
          - cell "Fri Jul 17" [ref=e110]
          - cell "View" [ref=e111]:
            - button "View" [ref=e112] [cursor=pointer]
          - cell "Delete" [ref=e113]:
            - button "Delete" [ref=e114] [cursor=pointer]
        - row "6a5a614885b8849b49f37936 ADIDAS ORIGINAL $ 11500 Fri Jul 17 View Delete" [ref=e115]:
          - rowheader "6a5a614885b8849b49f37936" [ref=e116]
          - cell [ref=e117]:
            - img [ref=e118]
          - cell "ADIDAS ORIGINAL" [ref=e119]
          - cell "$ 11500" [ref=e120]
          - cell "Fri Jul 17" [ref=e121]
          - cell "View" [ref=e122]:
            - button "View" [ref=e123] [cursor=pointer]
          - cell "Delete" [ref=e124]:
            - button "Delete" [ref=e125] [cursor=pointer]
        - row "6a5a613485b8849b49f37911 ZARA COAT 3 $ 11500 Fri Jul 17 View Delete" [ref=e126]:
          - rowheader "6a5a613485b8849b49f37911" [ref=e127]
          - cell [ref=e128]:
            - img [ref=e129]
          - cell "ZARA COAT 3" [ref=e130]
          - cell "$ 11500" [ref=e131]
          - cell "Fri Jul 17" [ref=e132]
          - cell "View" [ref=e133]:
            - button "View" [ref=e134] [cursor=pointer]
          - cell "Delete" [ref=e135]:
            - button "Delete" [ref=e136] [cursor=pointer]
    - generic [ref=e137]: "* If orders Will be more than 7 your last order will get deleted"
  - generic [ref=e139]:
    - button "Go Back to Shop" [ref=e140] [cursor=pointer]
    - button "Go Back to Cart" [ref=e141] [cursor=pointer]
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
  31 |    await page.locator("div li").first().waitFor();
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
> 66 |    const orderIdDetails = await page.locator(".col-text").textContent();
     |                                                           ^ Error: locator.textContent: Test timeout of 40000ms exceeded.
  67 |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  68 |  
  69 | });
```