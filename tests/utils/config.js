/**
 * Configuration management for tests
 * Loads environment variables from .env file if not in CI
 */
require('dotenv').config();

const config = {
  // Credentials
  testEmail: process.env.TEST_EMAIL || 'anshika@gmail.com',
  testPassword: process.env.TEST_PASSWORD || 'Iamking@000',

  // URLs
  baseUrl: process.env.BASE_URL || 'https://rahulshettyacademy.com/client',
  apiBaseUrl: process.env.API_BASE_URL || 'https://rahulshettyacademy.com/api/ecom',

  // Environment
  environment: process.env.ENVIRONMENT || 'local',
  isCI: process.env.CI === 'true',
  isHeaded: process.env.HEADED === 'true',
  browser: process.env.BROWSER || 'chromium',
  workers: parseInt(process.env.WORKERS) || 5,
  timeout: parseInt(process.env.TIMEOUT) || 40000,
  expectTimeout: parseInt(process.env.EXPECT_TIMEOUT) || 30000,

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // Helper methods
  isDev() {
    return this.environment === 'local' && !this.isCI;
  },

  isProduction() {
    return this.environment === 'production';
  },
};

module.exports = { config };
