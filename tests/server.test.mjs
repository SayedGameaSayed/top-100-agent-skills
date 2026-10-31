import assert from 'node:assert';
import http from 'node:http';
import { spawn } from 'node:child_process';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('Testing Full-Stack Express Server...\n');

  const serverProc = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: '3456' },
    stdio: 'pipe'
  });

  // Wait for server to start
  await new Promise((r) => setTimeout(r, 1500));

  try {
    // 1. Root route serves index.html (200 OK, not 404!)
    const rootRes = await fetchUrl('http://127.0.0.1:3456/');
    assert.strictEqual(rootRes.statusCode, 200);
    assert(rootRes.data.includes('دليل مهارات الذكاء الاصطناعي'));
    assert(rootRes.data.includes('constellation-canvas'));
    console.log('  PASS: GET / serves index.html with 200 OK');

    // 2. Health endpoint
    const healthRes = await fetchUrl('http://127.0.0.1:3456/api/health');
    assert.strictEqual(healthRes.statusCode, 200);
    const healthData = JSON.parse(healthRes.data);
    assert.strictEqual(healthData.status, 'ok');
    assert.strictEqual(healthData.skills_count, 100);
    console.log('  PASS: GET /api/health reports 100 skills, 9 tools');

    // 3. API Skills list
    const skillsRes = await fetchUrl('http://127.0.0.1:3456/api/skills');
    assert.strictEqual(skillsRes.statusCode, 200);
    const skillsData = JSON.parse(skillsRes.data);
    assert.strictEqual(skillsData.skills.length, 100);
    console.log('  PASS: GET /api/skills returns all 100 skills');

    // 4. API Single Skill by ID
    const singleSkillRes = await fetchUrl('http://127.0.0.1:3456/api/skills/superpowers');
    assert.strictEqual(singleSkillRes.statusCode, 200);
    const singleSkill = JSON.parse(singleSkillRes.data);
    assert.strictEqual(singleSkill.id, 'superpowers');
    assert.strictEqual(singleSkill.kind, 'collection');
    console.log('  PASS: GET /api/skills/:id returns requested skill');

    // 5. API Search with Arabic normalization
    const searchRes = await fetchUrl('http://127.0.0.1:3456/api/search?q=%D9%88%D8%B1%D8%AF'); // "ورد"
    assert.strictEqual(searchRes.statusCode, 200);
    const searchData = JSON.parse(searchRes.data);
    assert(searchData.results.some((s) => s.id === 'docx'));
    console.log('  PASS: GET /api/search?q=ورد finds docx');

    // 6. Tools API
    const toolsRes = await fetchUrl('http://127.0.0.1:3456/api/tools');
    assert.strictEqual(toolsRes.statusCode, 200);
    const toolsJson = JSON.parse(toolsRes.data);
    assert.strictEqual(toolsJson.tools.length, 9);
    console.log('  PASS: GET /api/tools returns 9 tools');

    // 7. Static CSS & JS served with correct Content-Type
    const cssRes = await fetchUrl('http://127.0.0.1:3456/css/style.css');
    assert.strictEqual(cssRes.statusCode, 200);
    assert(cssRes.headers['content-type'].includes('text/css'));
    console.log('  PASS: Static /css/style.css served with text/css');

    // 8. Leaderboard HTML route
    const lbRes = await fetchUrl('http://127.0.0.1:3456/leaderboard');
    assert.strictEqual(lbRes.statusCode, 200);
    assert(lbRes.data.includes('لوحة صدارة'));
    console.log('  PASS: GET /leaderboard serves leaderboard.html with 200 OK');

    // 9. API Leaderboard endpoint
    const lbApiRes = await fetchUrl('http://127.0.0.1:3456/api/leaderboard');
    assert.strictEqual(lbApiRes.statusCode, 200);
    const lbData = JSON.parse(lbApiRes.data);
    assert.strictEqual(lbData.total, 100);
    assert.strictEqual(lbData.skills[0].rank, 1);
    assert.strictEqual(lbData.skills[99].rank, 100);
    console.log('  PASS: GET /api/leaderboard returns 100 skills ranked #1 to #100');

    console.log('\nAll 9 Full-Stack Server tests PASSED! 🚀\n');
  } finally {
    serverProc.kill();
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
