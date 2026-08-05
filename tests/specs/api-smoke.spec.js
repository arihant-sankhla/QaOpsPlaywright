const { test, expect } = require('@playwright/test');
const { apiUtils } = require('../utils/apiUtils');

test('api: create order smoke', async ({ request }) => {
  const EMAIL = process.env.TEST_USER_EMAIL;
  const PASSWORD = process.env.TEST_USER_PASSWORD;
  test.skip(!EMAIL || !PASSWORD, 'Credentials required for API tests');

  const apiContext = await request.newContext();
  const apiUtil = new apiUtils(apiContext, { userEmail: EMAIL, userPassword: PASSWORD });
  const orderPayLoad = { orders: [{ country: 'India', productOrderedId: '6960eae1c941646b7a8b3ed3' }] };

  const response = await apiUtil.createOrder(orderPayLoad);
  expect(response.token).toBeTruthy();
  expect(response.orderId).toBeTruthy();
});
