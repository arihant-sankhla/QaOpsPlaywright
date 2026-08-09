import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      // Ignore report paths to prevent hot-reload loop states
      ignored: [
        '**/playwright-report/**', 
        '**/allure-results/**', 
        '**/allure-report/**', 
        '**/test-results/**'
      ]
    }
  }
});
