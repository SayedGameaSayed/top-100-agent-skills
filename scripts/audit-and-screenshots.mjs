import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve-test.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');
const ARTIFACT_DIR = 'C:\\Users\\syedg\\.gemini\\antigravity\\brain\\987b2f99-0fd9-46e7-a2bf-765b28e5dc4c';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const AXE_PATH = path.join(ROOT_DIR, 'node_modules/axe-core/axe.min.js');
const axeSource = fs.readFileSync(AXE_PATH, 'utf8');

async function run() {
  console.log('Starting local test server...');
  const server = await startServer(4173);

  console.log('Launching browser via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const auditResults = {};

  const pagesToTest = [
    {
      id: 'home',
      name: 'الصفحة الرئيسية (index.html)',
      url: 'http://127.0.0.1:4173/site/index.html'
    },
    {
      id: 'detail-superpowers',
      name: 'صفحة تفاصيل مهارة (Superpowers - Collection)',
      url: 'http://127.0.0.1:4173/site/skill.html?id=superpowers'
    },
    {
      id: 'detail-pdf',
      name: 'صفحة تفاصيل مهارة (PDF - Proprietary)',
      url: 'http://127.0.0.1:4173/site/skill.html?id=pdf'
    }
  ];

  for (const pageConfig of pagesToTest) {
    console.log(`\nAuditing & capturing: ${pageConfig.name}...`);
    const page = await browser.newPage();

    // 1280px Desktop
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    await page.goto(pageConfig.url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const shot1280Path = path.join(SCREENSHOTS_DIR, `${pageConfig.id}-1280px.png`);
    await page.screenshot({ path: shot1280Path, fullPage: false });
    console.log(`  Saved screenshot (1280px): ${shot1280Path}`);

    // Run axe accessibility audit (the engine behind Lighthouse Accessibility)
    await page.evaluate(axeSource);
    const axeResult = await page.evaluate(async () => {
      // @ts-ignore
      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
        }
      });
    });

    const violations = axeResult.violations || [];
    const passes = axeResult.passes || [];
    const totalChecks = violations.length + passes.length;
    const score = totalChecks > 0 ? Math.round((passes.length / totalChecks) * 100) : 100;

    auditResults[pageConfig.id] = {
      name: pageConfig.name,
      score,
      passesCount: passes.length,
      violationsCount: violations.length,
      violations: violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description }))
    };

    // 360px Mobile
    await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 1 });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const shot360Path = path.join(SCREENSHOTS_DIR, `${pageConfig.id}-360px.png`);
    await page.screenshot({ path: shot360Path, fullPage: false });
    console.log(`  Saved screenshot (360px): ${shot360Path}`);

    // Also copy to artifact directory if it exists
    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(shot1280Path, path.join(ARTIFACT_DIR, `${pageConfig.id}-1280px.png`));
      fs.copyFileSync(shot360Path, path.join(ARTIFACT_DIR, `${pageConfig.id}-360px.png`));
    }

    await page.close();
  }

  await browser.close();
  server.close();

  // Save audit report
  const reportPath = path.join(ROOT_DIR, 'screenshots/audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2), 'utf8');
  console.log(`\nAudit Report written to ${reportPath}`);
  console.log('\n--- ACCESSIBILITY AUDIT SCORES ---');
  for (const [id, res] of Object.entries(auditResults)) {
    console.log(`- ${res.name}: Score = ${res.score}% (${res.passesCount} passed, ${res.violationsCount} violations)`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
