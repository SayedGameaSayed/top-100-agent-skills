import puppeteer from 'puppeteer-core';
import path from 'node:path';

const artifactsDir = 'C:\\Users\\syedg\\.gemini\\antigravity\\brain\\987b2f99-0fd9-46e7-a2bf-765b28e5dc4c';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  console.log('Testing Home 1280px:');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // Verify first 3 card titles & stars
  const topCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#skills-grid .skill-card')).slice(0, 5).map((card) => {
      const title = card.querySelector('.card-title')?.textContent?.trim();
      const stars = card.querySelector('.card-stars-badge')?.textContent?.trim();
      return { title, stars };
    });
  });
  console.log('Top 5 cards on Home:', topCards);

  await page.screenshot({ path: path.join(artifactsDir, 'home-100-skills-1280px.png'), fullPage: false });
  await page.screenshot({ path: 'screenshots/home-1280px.png', fullPage: false });

  // 360px Mobile view
  console.log('\nTesting Home 360px:');
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  await page.screenshot({ path: path.join(artifactsDir, 'home-100-skills-360px.png'), fullPage: false });
  await page.screenshot({ path: 'screenshots/home-360px.png', fullPage: false });

  // Detail page for clean-code
  console.log('\nTesting Detail Clean Code 1280px:');
  await page.setViewport({ width: 1280, height: 950 });
  await page.goto('http://localhost:3000/skill/clean-code', { waitUntil: 'networkidle0' });
  const detailTitle = await page.evaluate(() => document.querySelector('.detail-headline-sculptural')?.textContent);
  const detailBadge = await page.evaluate(() => document.querySelector('.detail-stars-badge')?.textContent);
  console.log('Detail Headline:', detailTitle);
  console.log('Detail Stars Badge:', detailBadge);

  await page.screenshot({ path: path.join(artifactsDir, 'detail-clean-code-1280px.png'), fullPage: false });

  await browser.close();
  console.log('All screenshots and verifications completed successfully!');
})();
