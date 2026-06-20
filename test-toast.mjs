import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.createContext({ viewport: { width: 400, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/login-initial.png' });
  
  // Try to login with empty credentials to trigger error toast
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/login-toast-error.png' });
  
  console.log('Screenshots saved:');
  console.log('  /tmp/login-initial.png - Initial login screen');
  console.log('  /tmp/login-toast-error.png - Login screen with error toast');
  
  await browser.close();
})();
