import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Initial Hero with refined, lightweight lightbulb
  await page.screenshot({ path: 'screenshots/home-lightbulb-refined.png', fullPage: false });
  console.log('Saved home-lightbulb-refined.png');

  // 2. Scroll down 500px to capture scroll effects
  await page.evaluate(() => window.scrollTo({ top: 520, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/home-scroll-effects.png', fullPage: false });
  console.log('Saved home-scroll-effects.png');

  await browser.close();
})();
