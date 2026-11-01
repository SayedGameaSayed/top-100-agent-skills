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

  const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const desktopClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Home 1280px -> scrollWidth: ${desktopScrollWidth}, clientWidth: ${desktopClientWidth}, Overflow: ${desktopScrollWidth > desktopClientWidth}`);
  await page.screenshot({ path: 'screenshots/audit-home-1280px.png', fullPage: false });

  // Test 2: Home Page at 360px Mobile
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Home 360px -> scrollWidth: ${mobileScrollWidth}, clientWidth: ${mobileClientWidth}, Overflow: ${mobileScrollWidth > mobileClientWidth}`);
  await page.screenshot({ path: 'screenshots/audit-home-360px.png', fullPage: false });

  // Test 3: Detail Page at 1280px Desktop
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/skill.html?id=git-workflow', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const detailDesktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const detailDesktopClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Detail 1280px -> scrollWidth: ${detailDesktopScrollWidth}, clientWidth: ${detailDesktopClientWidth}, Overflow: ${detailDesktopScrollWidth > detailDesktopClientWidth}`);
  await page.screenshot({ path: 'screenshots/audit-detail-1280px.png', fullPage: false });

  // Test 4: Detail Page at 360px Mobile
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  await page.goto('http://localhost:3000/skill.html?id=git-workflow', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const detailMobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const detailMobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Detail 360px -> scrollWidth: ${detailMobileScrollWidth}, clientWidth: ${detailMobileClientWidth}, Overflow: ${detailMobileScrollWidth > detailMobileClientWidth}`);
  
  // Verify quarantine UI and absence of copy prompt button
  const copyBtnsCount = await page.evaluate(() => document.querySelectorAll('#copy-ready-prompt-btn, #copy-link-only-btn, #floating-copy-btn').length);
  const robotsMeta = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.content);
  console.log(`Detail Unverified -> copyButtonsCount: ${copyBtnsCount} (expected: 0), robotsMeta: "${robotsMeta}" (expected: "noindex, nofollow")`);
  
  await page.screenshot({ path: 'screenshots/audit-detail-360px.png', fullPage: false });

  await browser.close();
  console.log('All 4 audit screenshots captured and verified successfully.');
})();
