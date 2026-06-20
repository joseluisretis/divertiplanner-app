import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.createContext({ viewport: { width: 400, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/login-screen.png' });
  
  const h1Color = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return window.getComputedStyle(h1).color;
  });
  
  const buttonBg = await page.evaluate(() => {
    const button = document.querySelector('button[type="submit"]');
    return window.getComputedStyle(button).backgroundColor;
  });
  
  const buttonText = await page.evaluate(() => {
    const button = document.querySelector('button[type="submit"]');
    return window.getComputedStyle(button).color;
  });
  
  console.log('=== Color Verification ===');
  console.log('H1 (DivertiPlanner) color:', h1Color);
  console.log('Button background:', buttonBg);
  console.log('Button text color:', buttonText);
  console.log('\nExpected:');
  console.log('  H1 color: rgb(0, 94, 180) [#005eb4 - BLUE]');
  console.log('  Button bg: rgb(56, 145, 255) [#3891ff - LIGHT BLUE]');
  console.log('  Button text: rgb(255, 255, 255) [#ffffff - WHITE]');
  
  await browser.close();
})();
