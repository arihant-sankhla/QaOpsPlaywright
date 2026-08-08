const { execSync } = require('child_process');

console.log('Starting Playwright build/test sequence...');
try {
  // Example: Triggering standard playwright test command
  execSync('npx playwright test', { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
