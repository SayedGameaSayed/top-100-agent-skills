import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let testCount = 0;
let passedCount = 0;

function test(name, fn) {
  testCount++;
  try {
    fn();
    passedCount++;
    console.log(`  PASS: ${name}`);
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('Running Security & Governance Tests (Task Item 5)...\n');

// Test 1: discover-and-sync.mjs never writes data/skills.json or data/tools.json
test('Sync script never writes to skills.json or tools.json', () => {
  const syncScript = fs.readFileSync(path.join(ROOT_DIR, 'scripts/discover-and-sync.mjs'), 'utf8');

  // Verify that neither skillsPath nor toolsPath is used in fs.writeFileSync or fs.writeFile
  const dangerousPatterns = [
    /writeFileSync\s*\(\s*skillsPath/i,
    /writeFile\s*\(\s*skillsPath/i,
    /writeFileSync\s*\(\s*toolsPath/i,
    /writeFile\s*\(\s*toolsPath/i,
    /writeFileSync\s*\([^,]*skills\.json/i,
    /writeFileSync\s*\([^,]*tools\.json/i
  ];

  for (const pattern of dangerousPatterns) {
    assert(
      !pattern.test(syncScript),
      `Found forbidden write call to skills.json/tools.json matching ${pattern}`
    );
  }
});

// Test 2: Discovered candidates in candidates.json are NEVER rendered on site
test('Candidates from candidates.json are never rendered on the site', () => {
  const candidatesPath = path.join(ROOT_DIR, 'data/candidates.json');
  if (fs.existsSync(candidatesPath)) {
    const candidatesData = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));
    const skillsData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/skills.json'), 'utf8'));
    const leaderboardData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/leaderboard.json'), 'utf8'));

    const candidateIds = new Set((candidatesData.candidates || []).map((c) => c.id || c.repo));
    const skillIds = new Set((skillsData.skills || []).map((s) => s.id));
    const leaderboardIds = new Set((leaderboardData.leaderboard || []).map((l) => l.id));

    // Candidates must not leak into active skills or leaderboard
    for (const cid of candidateIds) {
      if (cid) {
        assert(!skillIds.has(cid), `Candidate ${cid} leaked into data/skills.json!`);
        assert(!leaderboardIds.has(cid), `Candidate ${cid} leaked into data/leaderboard.json!`);
      }
    }
  }
});

// Test 3: sitemap.xml strictly excludes skills with content_verified !== true
test('Sitemap excludes any skill where content_verified !== true', () => {
  const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, 'site/sitemap.xml'), 'utf8');
  const skillsData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/skills.json'), 'utf8'));

  const unverifiedSkills = (skillsData.skills || []).filter((s) => s.content_verified !== true);
  for (const skill of unverifiedSkills) {
    const skillUrlPattern = `skill.html?id=${encodeURIComponent(skill.id)}`;
    assert(
      !sitemapContent.includes(skillUrlPattern),
      `Unverified skill ${skill.id} was found in site/sitemap.xml!`
    );
  }

  // All 100 skills are currently unverified, so sitemap should only contain static pages
  const urlMatches = sitemapContent.match(/<loc>/g) || [];
  assert(
    urlMatches.length === 3,
    `Expected exactly 3 static page URLs in sitemap for unverified catalogue, got ${urlMatches.length}`
  );
});

// Test 4: Copy button is absent in DOM for unreviewed skills
test('Copy button is strictly absent for unreviewed skills (content_verified: false)', () => {
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'site/js/app.js'), 'utf8');

  // Verify that initSkillDetailPage branches on content_verified !== true and returns before copy buttons
  assert(
    appJs.includes('if (skill.content_verified !== true)'),
    'initSkillDetailPage must check skill.content_verified !== true'
  );
  assert(
    appJs.includes('unverified-quarantine-box'),
    'Unverified skills must display the quarantine warning notice'
  );

  // In the unverified branch of initSkillDetailPage, copy buttons must NOT exist
  const unverifiedBlockMatch = appJs.match(/if\s*\(skill\.content_verified !== true\)\s*\{([\s\S]*?return;\s*\})/);
  assert(unverifiedBlockMatch, 'Could not find unverified return block in app.js');

  const unverifiedHtml = unverifiedBlockMatch[1];
  assert(!unverifiedHtml.includes('copy-ready-prompt-btn'), 'copy-ready-prompt-btn must not exist in unverified branch');
  assert(!unverifiedHtml.includes('copy-link-only-btn'), 'copy-link-only-btn must not exist in unverified branch');
  assert(!unverifiedHtml.includes('floating-copy-btn'), 'floating-copy-btn must not exist in unverified branch');
  assert(!unverifiedHtml.includes('floating-mobile-capsule'), 'floating-mobile-capsule must not exist in unverified branch');
  assert(unverifiedHtml.includes('غير مراجَع'), 'Unverified notice must show label غير مراجَع');

  // Check leaderboard table row: btn-copy-prompt must only be rendered when content_verified === true
  assert(
    appJs.includes('skill.content_verified === true'),
    'Leaderboard must gate btn-copy-prompt behind skill.content_verified === true'
  );
});

console.log(`\nGovernance Results: ${passedCount}/${testCount} tests passed.`);
if (passedCount !== testCount) {
  process.exit(1);
}
