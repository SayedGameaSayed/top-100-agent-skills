import puppeteer from 'puppeteer-core';
import path from 'node:path';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Leaderboard 1280px
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/leaderboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/leaderboard-1280px.png', fullPage: false });
  console.log('Saved screenshots/leaderboard-1280px.png');

  // Leaderboard 360px
  await page.setViewport({ width: 360, height: 800 });
  await page.goto('http://localhost:3000/leaderboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/leaderboard-360px.png', fullPage: false });
  console.log('Saved screenshots/leaderboard-360px.png');

  await browser.close();
})();
