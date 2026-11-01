import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: 'screenshots/home-lightbulb-background.png', fullPage: false });
  console.log('Saved home-lightbulb-background.png');

  // Also move the mouse around to test interactivity
  await page.mouse.move(400, 350);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/home-lightbulb-interactive.png', fullPage: false });
  console.log('Saved home-lightbulb-interactive.png');

  await browser.close();
})();
