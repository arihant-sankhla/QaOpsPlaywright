/**
 * TypeScript type definitions for Playwright test utilities
 */

export interface TestConfig {
  testEmail: string;
  testPassword: string;
  baseUrl: string;
  apiBaseUrl: string;
  environment: string;
  isCI: boolean;
  isHeaded: boolean;
  browser: string;
  workers: number;
  timeout: number;
  expectTimeout: number;
  logLevel: string;
  isDev(): boolean;
  isProduction(): boolean;
}

export interface LoggerOptions {
  name: string;
  level?: 'debug' | 'info' | 'warn' | 'error';
}

export class Logger {
  constructor(name: string, level?: string);
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
}

export interface LoginPageInterface {
  goto(): Promise<void>;
  login(email: string, password: string): Promise<void>;
}

export interface ProductPageInterface {
  addProductToCart(productName: string): Promise<void>;
  openCart(): Promise<void>;
}

export interface CartPageInterface {
  verifyProductInCart(productName: string): Promise<boolean>;
  checkout(): Promise<void>;
}

export interface CheckoutPageInterface {
  selectCountry(country: string): Promise<void>;
  placeOrder(): Promise<void>;
  getOrderId(): Promise<string | null>;
}

export interface POManagerInterface {
  getLoginPage(): LoginPageInterface;
  getProductPage(): ProductPageInterface;
  getCartPage(): CartPageInterface;
  getCheckoutPage(): CheckoutPageInterface;
}

export interface ApiUtilsInterface {
  getToken(): Promise<string>;
  createOrder(orderPayLoad: any): Promise<{ token: string; orderId: string }>;
}
