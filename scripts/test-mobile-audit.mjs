import puppeteer from 'puppeteer-core';
import path from 'node:path';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test 1: Home Page at 1280px Desktop
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Home 1280px Overflow:', desktopOverflow);
  await page.screenshot({ path: 'screenshots/audit-home-1280px.png', fullPage: false });

  // Test 2: Home Page at 360px Mobile
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Home 360px Overflow:', mobileOverflow);
  await page.screenshot({ path: 'screenshots/audit-home-360px.png', fullPage: false });

  // Test 3: Detail Page at 1280px Desktop
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/skill/git-workflow', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshots/audit-detail-1280px.png', fullPage: false });

  // Test 4: Detail Page at 360px Mobile
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  await page.goto('http://localhost:3000/skill/git-workflow', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const detailMobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Detail 360px Overflow:', detailMobileOverflow);
  await page.screenshot({ path: 'screenshots/audit-detail-360px.png', fullPage: false });

  await browser.close();
  console.log('All 4 audit screenshots captured successfully.');
})();
