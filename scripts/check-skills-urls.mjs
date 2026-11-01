import fs from 'node:fs';
import https from 'node:https';
import http from 'node:http';

function checkUrl(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(
        parsed,
        {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*'
          },
          timeout: timeoutMs
        },
        (res) => {
          // GitHub returns 200, 301, or 302 for valid pages
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({ ok: true, status: res.statusCode });
          } else if (res.statusCode === 405) {
            // Some endpoints forbid HEAD, retry with GET
            req.destroy();
            const getReq = client.request(
              parsed,
              {
                method: 'GET',
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                  'Range': 'bytes=0-100'
                },
                timeout: timeoutMs
              },
              (getRes) => {
                const ok = getRes.statusCode >= 200 && getRes.statusCode < 400;
                resolve({ ok, status: getRes.statusCode });
              }
            );
            getReq.on('error', (err) => resolve({ ok: false, error: err.message }));
            getReq.on('timeout', () => { getReq.destroy(); resolve({ ok: false, error: 'Timeout' }); });
            getReq.end();
          } else {
            resolve({ ok: false, status: res.statusCode });
          }
        }
      );
      req.on('error', (err) => resolve({ ok: false, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'Timeout' }); });
      req.end();
    } catch (e) {
      resolve({ ok: false, error: e.message });
    }
  });
}

async function runAudit() {
  const skillsData = JSON.parse(fs.readFileSync('data/skills.json', 'utf8'));
  const skills = skillsData.skills || [];

  console.log(`Starting URL & Path audit for ${skills.length} skills...`);

  const results = [];
  const failures = [];

  for (let i = 0; i < skills.length; i++) {
    const s = skills[i];
    const source = s.source || {};
    const repoUrl = source.repo_url || (source.url && !source.path_in_repo ? source.url : null);
    const pathInRepo = source.path_in_repo;

    // 1. Check repo_url
    let repoCheck = { ok: false, status: 'No repo_url' };
    if (repoUrl) {
      repoCheck = await checkUrl(repoUrl);
    }

    // 2. Check path_in_repo
    let pathCheck = { ok: true, note: 'Root repo / collection' };
    if (pathInRepo && repoUrl) {
      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        const owner = match[1];
        const repo = match[2].replace(/\.git$/, '');
        // Check raw SKILL.md on main branch
        const rawMain = `https://raw.githubusercontent.com/${owner}/${repo}/main/${pathInRepo}/SKILL.md`;
        const rawCheckMain = await checkUrl(rawMain);
        if (rawCheckMain.ok) {
          pathCheck = { ok: true, branch: 'main' };
        } else {
          // Check raw SKILL.md on master branch
          const rawMaster = `https://raw.githubusercontent.com/${owner}/${repo}/master/${pathInRepo}/SKILL.md`;
          const rawCheckMaster = await checkUrl(rawMaster);
          if (rawCheckMaster.ok) {
            pathCheck = { ok: true, branch: 'master' };
          } else {
            // Check tree directory on main
            const treeMain = `https://github.com/${owner}/${repo}/tree/main/${pathInRepo}`;
            const treeCheck = await checkUrl(treeMain);
            if (treeCheck.ok) {
              pathCheck = { ok: true, type: 'tree' };
            } else {
              pathCheck = { ok: false, status: rawCheckMain.status || 404, rawMain, rawMaster };
            }
          }
        }
      }
    }

    const overallVerified = repoCheck.ok && pathCheck.ok;
    s.source.url_verified = overallVerified;

    results.push({
      id: s.id,
      name: s.name,
      repoUrl,
      repoOk: repoCheck.ok,
      repoStatus: repoCheck.status || repoCheck.error,
      pathInRepo: pathInRepo || '(root)',
      pathOk: pathCheck.ok,
      urlVerified: overallVerified
    });

    if (!overallVerified) {
      failures.push({
        id: s.id,
        repoUrl,
        repoStatus: repoCheck.status || repoCheck.error,
        pathInRepo,
        reason: !repoCheck.ok ? `Repo unreachable (${repoCheck.status || repoCheck.error})` : `Path in repo 404 / not found`
      });
    }

    process.stdout.write(`Checked ${i + 1}/${skills.length} (${failures.length} failures)...\r`);
  }

  console.log(`\nAudit completed.`);
  console.log(`Total skills checked: ${skills.length}`);
  console.log(`Successfully verified (200 OK & path exists): ${results.filter(r => r.urlVerified).length}`);
  console.log(`Failures / Unverified: ${failures.length}`);

  if (failures.length > 0) {
    console.log('\n--- DETAILED FAILURES LIST ---');
    failures.forEach((f, idx) => {
      console.log(`${idx + 1}. [${f.id}] -> ${f.reason} (Repo: ${f.repoUrl}, Path: ${f.pathInRepo})`);
    });
  }

  // Save updated skills.json with accurate url_verified values
  fs.writeFileSync('data/skills.json', JSON.stringify(skillsData, null, 2) + '\n');
  fs.writeFileSync('site/data/skills.json', JSON.stringify(skillsData, null, 2) + '\n');
  fs.writeFileSync('data/url-audit-report.json', JSON.stringify({ summary: { total: skills.length, verified: results.filter(r => r.urlVerified).length, failures: failures.length }, failures, results }, null, 2) + '\n');
  console.log('Saved data/skills.json and data/url-audit-report.json');
}

runAudit();
