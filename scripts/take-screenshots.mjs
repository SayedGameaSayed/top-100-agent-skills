import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve-test.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('Starting static server on port 4173...');
  const server = await startServer(4173);

  const targets = [
    {
      name: 'home-1280px.png',
      url: 'http://127.0.0.1:4173/site/index.html',
      width: 1280,
      height: 1200
    },
    {
      name: 'home-360px.png',
      url: 'http://127.0.0.1:4173/site/index.html',
      width: 360,
      height: 1000
    },
    {
      name: 'detail-superpowers-1280px.png',
      url: 'http://127.0.0.1:4173/site/skill.html?id=superpowers',
      width: 1280,
      height: 1400
    },
    {
      name: 'detail-superpowers-360px.png',
      url: 'http://127.0.0.1:4173/site/skill.html?id=superpowers',
      width: 360,
      height: 1200
    },
    {
      name: 'detail-pdf-1280px.png',
      url: 'http://127.0.0.1:4173/site/skill.html?id=pdf',
      width: 1280,
      height: 1400
    }
  ];

  for (const t of targets) {
    const outPath = path.join(SCREENSHOTS_DIR, t.name);
    console.log(`Capturing ${t.name} at ${t.width}x${t.height}...`);
    const cmd = `"${EDGE_PATH}" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=2000 --window-size=${t.width},${t.height} --screenshot="${outPath}" "${t.url}"`;
    try {
      execSync(cmd, { stdio: 'inherit' });
      console.log(`  Saved to ${outPath}`);
    } catch (err) {
      console.error(`  Failed capturing ${t.name}:`, err.message);
    }
  }

  server.close();
  console.log('Server stopped. Screenshots completed.');
}

main().catch(console.error);
