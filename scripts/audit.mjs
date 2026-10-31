import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const axeScript = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

  for (const url of [
    'http://localhost:3000/',
    'http://localhost:3000/leaderboard',
    'http://localhost:3000/skill/git-workflow',
    'http://localhost:3000/how-to-use'
  ]) {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(axeScript);
    const results = await page.evaluate(async () => {
      // @ts-ignore
      return await window.axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
      });
    });
    console.log(`URL: ${url} -> Violations: ${results.violations.length}, Passes: ${results.passes.length}`);
    if (results.violations.length > 0) {
      console.log('Violations detail:', results.violations.map((v) => ({ id: v.id, impact: v.impact, desc: v.description })));
    }
  }

  await browser.close();
})();
