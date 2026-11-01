import puppeteer from 'puppeteer-core';
import path from 'node:path';

const ARTIFACTS_DIR = 'C:/Users/syedg/.gemini/antigravity/brain/987b2f99-0fd9-46e7-a2bf-765b28e5dc4c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Skill detail page for obra-writing-plans
  await page.goto('http://localhost:3000/skill.html?id=obra-writing-plans', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verified-skill-detail.png'), fullPage: false });
  console.log('Saved verified-skill-detail.png');

  // 2. Home page cards
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verified-home-page.png'), fullPage: false });
  console.log('Saved verified-home-page.png');

  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
