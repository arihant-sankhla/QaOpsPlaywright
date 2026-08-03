# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: webClientapp.spec.js >> @Child windows hadl
- Location: tests\webClientapp.spec.js:22:1

# Error details

```
Error: browserContext.newPage: Target page, context or browser has been closed
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  |  
  3  |  
  4  | test.describe.configure({mode:'parallel'})
  5  |  
  6  | test('@Web Client App login', async ({ page }) => {
  7  |    //js file- Login js, DashboardPage
  8  |    const email = "anshika@gmail.com";
  9  |    const productName = 'zara coat 3';
  10 |    const products = page.locator(".card-body");
  11 |    await page.goto("https://rahulshettyacademy.com/client");
  12 |    await page.locator("#userEmail").fill(email);
  13 |    await page.locator("#userPassword").type("Iamking@000");
  14 |    await page.locator("[value='Login']").click();
  15 |    await page.waitForLoadState('networkidle');
  16 |    await page.locator(".card-body b").first().waitFor();
  17 |    const titles = await page.locator(".card-body b").allTextContents();
  18 |    console.log(titles); 
  19 |  
  20 | });
  21 | 
  22 | test('@Child windows hadl', async ({browser})=>
  23 |  {
  24 |     const context = await browser.newContext();
> 25 |     const page =  await context.newPage();
     |                                 ^ Error: browserContext.newPage: Target page, context or browser has been closed
  26 |     const userName = page.locator('#username');
  27 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  28 |     const documentLink = page.locator("[href*='documents-request']");
  29 |  
  30 |     const [newPage]=await Promise.all(
  31 |    [
  32 |       context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
  33 |       documentLink.click(),
  34 |    
  35 |    ])//new page is opened
  36 |    
  37 |  
  38 |    const  text = await newPage.locator(".red").textContent();
  39 |     const arrayText = text.split("@")
  40 |     const domain =  arrayText[1].split(" ")[0]
  41 |     //console.log(domain);
  42 |     await page.locator("#username").fill(domain);
  43 |     console.log(await page.locator("#username").inputValue());
  44 |  
  45 |  });
```