import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  // Test dragging to rotate to side profile
  await page.mouse.move(350, 400);
  await page.mouse.down();
  await page.mouse.move(580, 400, { steps: 20 });
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({ path: 'screenshots/brain-side-profile.png', fullPage: false });
  console.log('Saved brain-side-profile.png');

  await browser.close();
})();
