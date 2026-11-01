import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function fetchStatus(url, timeoutMs = 10000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.request(
        parsed,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Raw-Skill-Auditor',
            'Accept': '*/*'
          },
          timeout: timeoutMs
        },
        (res) => {
          // Consume stream so socket closes cleanly
          res.on('data', () => {});
          res.on('end', () => {
            resolve({ status: res.statusCode, ok: res.statusCode === 200 });
          });
        }
      );
      req.on('error', (err) => resolve({ status: 0, error: err.message, ok: false }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 408, error: 'Timeout', ok: false });
      });
      req.end();
    } catch (e) {
      resolve({ status: 0, error: e.message, ok: false });
    }
  });
}

// Concurrency helper
async function mapConcurrent(items, limit, fn) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function runAudit() {
  const skillsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/skills.json'), 'utf8'));
  const skills = skillsData.skills || [];

  console.log(`\n========================================================================`);
  console.log(`Starting Raw SKILL.md Audit for ${skills.length} skills (repo_type: skills)...`);
  console.log(`========================================================================\n`);

  const auditResults = await mapConcurrent(skills, 10, async (skill) => {
    const owner = skill.source.owner;
    const repo = skill.source.repo.split('/')[1] || skill.source.repo;
    const pathInRepo = skill.source.path_in_repo;

    // Check main branch first, fallback to master
    const urlMain = `https://raw.githubusercontent.com/${owner}/${repo}/main/${pathInRepo}/SKILL.md`;
    let res = await fetchStatus(urlMain);
    let checkedUrl = urlMain;

    if (!res.ok) {
      const urlMaster = `https://raw.githubusercontent.com/${owner}/${repo}/master/${pathInRepo}/SKILL.md`;
      const resMaster = await fetchStatus(urlMaster);
      if (resMaster.ok) {
        res = resMaster;
        checkedUrl = urlMaster;
      }
    }

    return {
      id: skill.id,
      name: skill.name,
      repo: `${owner}/${repo}`,
      path: pathInRepo,
      checkedUrl,
      status: res.status,
      ok: res.ok
    };
  });

  // Print Table
  console.log(`| # | ID | Exact Raw URL Checked | Status |`);
  console.log(`|:---:|:---|:---|:---:|`);
  auditResults.forEach((r, idx) => {
    const statusLabel = r.status === 200 ? '200 OK ✓' : `${r.status} ✗`;
    console.log(`| ${idx + 1} | \`${r.id}\` | ${r.checkedUrl} | **${statusLabel}** |`);
  });

  const passed = auditResults.filter((r) => r.ok);
  const failed = auditResults.filter((r) => !r.ok);

  console.log(`\n========================================================================`);
  console.log(`Audit Summary: ${passed.length}/${skills.length} passed (Status 200 OK).`);
  console.log(`Failed: ${failed.length}`);
  console.log(`========================================================================\n`);

  // Write audit report
  const reportPayload = {
    generated_at: new Date().toISOString(),
    total_audited: skills.length,
    passed_count: passed.length,
    failed_count: failed.length,
    results: auditResults
  };

  fs.writeFileSync(path.join(ROOT, 'data/url-audit-report.json'), JSON.stringify(reportPayload, null, 2) + '\n', 'utf8');
  console.log(`✓ Saved audit results to data/url-audit-report.json`);

  if (failed.length > 0) {
    console.error(`\n❌ BUILD FAILURE: ${failed.length} skills failed the raw SKILL.md audit!`);
    failed.forEach((f) => {
      console.error(` - [${f.id}] (${f.repo}) -> Status ${f.status}: ${f.checkedUrl}`);
    });
    process.exit(1);
  } else {
    console.log(`\n✅ BUILD SUCCESS: All ${passed.length} skills verified with HTTP 200 OK!`);
  }
}

runAudit();
