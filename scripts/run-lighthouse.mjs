import { execSync } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
process.env.CHROME_PATH = CHROME_PATH;

const targets = [
  {
    name: 'Live Home Page',
    url: 'https://sayedgameasayed.github.io/top-100-agent-skills/',
    output: 'lighthouse-live-home.json'
  },
  {
    name: 'Live Detail Page',
    url: 'https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow',
    output: 'lighthouse-live-detail.json'
  }
];

const scores = {};

for (const target of targets) {
  console.log(`Running Lighthouse Mobile audit for ${target.name} (${target.url})...`);
  try {
    const cmd = `npx lighthouse "${target.url}" --chrome-flags="--headless --no-sandbox" --output=json --output-path="${target.output}" --only-categories=performance,accessibility --quiet`;
    execSync(cmd, { env: { ...process.env, CHROME_PATH }, stdio: 'inherit' });
    
    if (fs.existsSync(target.output)) {
      const data = JSON.parse(fs.readFileSync(target.output, 'utf8'));
      const perfScore = Math.round((data.categories.performance?.score || 0) * 100);
      const a11yScore = Math.round((data.categories.accessibility?.score || 0) * 100);
      console.log(`✓ ${target.name} -> Performance: ${perfScore}, Accessibility: ${a11yScore}`);
      scores[target.name] = { performance: perfScore, accessibility: a11yScore };
    }
  } catch (err) {
    console.error(`Error auditing ${target.name}:`, err.message);
  }
}

fs.writeFileSync('data/lighthouse-live-summary.json', JSON.stringify(scores, null, 2) + '\n');
console.log('Saved data/lighthouse-live-summary.json');
