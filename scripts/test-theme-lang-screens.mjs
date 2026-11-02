import puppeteer from 'puppeteer-core';
import path from 'node:path';

const ARTIFACTS_DIR = 'C:/Users/syedg/.gemini/antigravity/brain/987b2f99-0fd9-46e7-a2bf-765b28e5dc4c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function testScreens() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Home page in English + Light Theme
  await page.goto('http://localhost:3000/?lang=en&theme=light', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'home-en-light-1280px.png'), fullPage: false });
  console.log('Saved home-en-light-1280px.png');

  // 2. Home page cards scrolled in English + Light Theme
  await page.evaluate(() => window.scrollBy(0, 750));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'home-en-light-cards.png'), fullPage: false });
  console.log('Saved home-en-light-cards.png');

  // 3. Skill detail page in English + Light Theme (Exact skill from user screenshot)
  await page.goto('http://localhost:3000/skill.html?id=source-driven-development&lang=en&theme=light', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skill-en-light-1280px.png'), fullPage: false });
  console.log('Saved skill-en-light-1280px.png');

  // 3b. Skill detail page scrolled to alternating editorial sections & tool integration
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skill-en-light-sections.png'), fullPage: false });
  console.log('Saved skill-en-light-sections.png');

  // 3c. Verify Dark Theme is 100% untouched and pristine
  await page.goto('http://localhost:3000/skill.html?id=source-driven-development&lang=en&theme=dark', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skill-en-dark-verify.png'), fullPage: false });
  console.log('Saved skill-en-dark-verify.png');

  // 4. Leaderboard in English + Light Theme
  await page.goto('http://localhost:3000/leaderboard.html?lang=en&theme=light', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'leaderboard-en-light-1280px.png'), fullPage: false });
  console.log('Saved leaderboard-en-light-1280px.png');

  // 4b. Arabic + Light Theme Skill Detail
  await page.goto('http://localhost:3000/skill.html?id=source-driven-development&lang=ar&theme=light', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skill-ar-light-1280px.png'), fullPage: false });
  console.log('Saved skill-ar-light-1280px.png');

  // 5. Test interactive toggles: click theme button to toggle dark, click lang button to toggle Arabic
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  // Click Theme toggle
  await page.click('#theme-toggle-btn');
  await new Promise((r) => setTimeout(r, 500));
  const currentTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Toggled theme to:', currentTheme);

  // Click Lang toggle
  await page.click('#lang-toggle-btn');
  await new Promise((r) => setTimeout(r, 500));
  const currentLang = await page.evaluate(() => document.documentElement.lang);
  console.log('Toggled lang to:', currentLang);

  await browser.close();
}

testScreens().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
