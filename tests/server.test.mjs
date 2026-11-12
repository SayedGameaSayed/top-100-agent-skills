import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const expectedSkillsCount = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'skills.json'), 'utf8')).skills.length;
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

function postJson(url, payload, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...extraHeaders
        }
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          let parsedJson = null;
          try {
            parsedJson = JSON.parse(data);
          } catch {
            parsedJson = data;
          }
          resolve({ statusCode: res.statusCode, headers: res.headers, data: parsedJson });
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log('Testing Full-Stack Express Server...\n');

  const serverProc = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: '3456' },
    stdio: 'pipe'
  });

  let stdoutData = '';
  let stderrData = '';
  serverProc.stdout.on('data', (d) => { stdoutData += d.toString(); });
  serverProc.stderr.on('data', (d) => { stderrData += d.toString(); });

  // Poll server readiness up to 10 seconds with 150ms intervals
  const startTime = Date.now();
  let ready = false;
  while (Date.now() - startTime < 10000) {
    try {
      const ping = await fetchUrl('http://127.0.0.1:3456/api/health');
      if (ping.statusCode === 200) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  if (!ready) {
    console.error('Express server failed to respond within 10s!');
    console.error('STDOUT:', stdoutData);
    console.error('STDERR:', stderrData);
    throw new Error('Express server startup timed out');
  }

  try {
    // 1. Root route serves index.html (200 OK, not 404!)
    const rootRes = await fetchUrl('http://127.0.0.1:3456/');
    assert.strictEqual(rootRes.statusCode, 200);
    assert(rootRes.data.includes('Top 100 AI Agent Skills'));
    assert(rootRes.data.includes('constellation-canvas'));
    console.log('  PASS: GET / serves index.html with 200 OK');

    // 2. Health endpoint
    const healthRes = await fetchUrl('http://127.0.0.1:3456/api/health');
    assert.strictEqual(healthRes.statusCode, 200);
    const healthData = JSON.parse(healthRes.data);
    assert.strictEqual(healthData.status, 'ok');
    assert.strictEqual(healthData.skills_count, expectedSkillsCount);
    console.log(`  PASS: GET /api/health reports ${expectedSkillsCount} skills, 9 tools`);

    // 3. API Skills list
    const skillsRes = await fetchUrl('http://127.0.0.1:3456/api/skills');
    assert.strictEqual(skillsRes.statusCode, 200);
    const skillsData = JSON.parse(skillsRes.data);
    assert.strictEqual(skillsData.skills.length, expectedSkillsCount);
    console.log(`  PASS: GET /api/skills returns all ${expectedSkillsCount} skills`);

    // 4. API Single Skill by ID
    const singleSkillRes = await fetchUrl('http://127.0.0.1:3456/api/skills/docx');
    assert.strictEqual(singleSkillRes.statusCode, 200);
    const singleSkill = JSON.parse(singleSkillRes.data);
    assert.strictEqual(singleSkill.id, 'docx');
    assert.strictEqual(singleSkill.repo_type, 'skills');
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
    assert(lbRes.data.includes('leaderboard-tbody'));
    console.log('  PASS: GET /leaderboard serves leaderboard.html with 200 OK');

    // 9. API Leaderboard endpoint
    const lbApiRes = await fetchUrl('http://127.0.0.1:3456/api/leaderboard');
    assert.strictEqual(lbApiRes.statusCode, 200);
    const lbData = JSON.parse(lbApiRes.data);
    assert.strictEqual(lbData.total, expectedSkillsCount);
    assert.strictEqual(lbData.skills[0].rank, 1);
    assert.strictEqual(lbData.skills[expectedSkillsCount - 1].rank, expectedSkillsCount);
    console.log(`  PASS: GET /api/leaderboard returns ${expectedSkillsCount} skills ranked #1 to #${expectedSkillsCount}`);

    // 10. POST /api/chat AI Advisor endpoint
    const chatRes = await postJson('http://127.0.0.1:3456/api/chat', {
      message: 'عايز مهارة وورد'
    });
    assert.strictEqual(chatRes.statusCode, 200);
    assert(chatRes.data.recommendedSkills.length > 0);
    assert(chatRes.data.recommendedSkills.some((s) => s.id === 'docx'));
    console.log('  PASS: POST /api/chat returns AI recommendations');

    // 11. POST /api/advisor routes tasks to Code / AI Project / General specialists
    const codeAdvisorRes = await postJson('http://127.0.0.1:3456/api/advisor', {
      message: 'function fetchData() { throw new Error("bug"); }',
      lang: 'ar'
    });
    assert.strictEqual(codeAdvisorRes.statusCode, 200);
    assert.strictEqual(codeAdvisorRes.data.specialty, 'code');

    const aiAdvisorRes = await postJson('http://127.0.0.1:3456/api/advisor', {
      message: 'README architecture for multi-agent RAG pipeline and MCP server',
      lang: 'en'
    });
    assert.strictEqual(aiAdvisorRes.statusCode, 200);
    assert.strictEqual(aiAdvisorRes.data.specialty, 'ai-project');
    console.log('  PASS: POST /api/advisor classifies Code and AI-Project specialties cleanly');

    // 12. Security: Enforce 1000 char prompt limit & malformed JSON rejection
    const longMsgRes = await postJson('http://127.0.0.1:3456/api/advisor', {
      message: 'a'.repeat(1001)
    });
    assert.strictEqual(longMsgRes.statusCode, 400);
    console.log('  PASS: POST /api/advisor rejects messages over 1000 chars with HTTP 400');

    const badJsonRes = await postJson('http://127.0.0.1:3456/api/advisor', '{"bad": ');
    assert.strictEqual(badJsonRes.statusCode, 400);
    console.log('  PASS: POST /api/advisor rejects malformed JSON with HTTP 400');

    // 13. Security: Restricted CORS on /api/advisor
    const allowedCorsRes = await postJson(
      'http://127.0.0.1:3456/api/advisor',
      { message: 'test cors' },
      { Origin: 'https://top-100-agent-skills.vercel.app' }
    );
    assert.strictEqual(allowedCorsRes.headers['access-control-allow-origin'], 'https://top-100-agent-skills.vercel.app');

    const blockedCorsRes = await postJson(
      'http://127.0.0.1:3456/api/advisor',
      { message: 'test cors' },
      { Origin: 'https://evil-site.example' }
    );
    assert.strictEqual(blockedCorsRes.headers['access-control-allow-origin'], undefined);
    console.log('  PASS: /api/advisor restricts CORS to trusted origins');

    // 14. Serverless handler unit verification (api/advisor.js)
    const { default: serverlessAdvisor } = await import('../api/advisor.js');
    function createMockRes() {
      const headers = {};
      return {
        statusCode: 200,
        headers,
        body: null,
        ended: false,
        setHeader(k, v) { headers[k.toLowerCase()] = v; },
        status(code) { this.statusCode = code; return this; },
        json(payload) { this.body = payload; return this; },
        end() { this.ended = true; return this; }
      };
    }

    // Invalid string JSON body -> 400
    const badHandlerRes = createMockRes();
    await serverlessAdvisor(
      { method: 'POST', headers: { origin: 'https://evil.example', 'x-forwarded-for': '10.0.0.1' }, body: '{bad-json' },
      badHandlerRes
    );
    assert.strictEqual(badHandlerRes.statusCode, 400);
    assert.strictEqual(badHandlerRes.headers['access-control-allow-origin'], undefined);

    // >1000 char message -> 400 & valid CORS
    const longHandlerRes = createMockRes();
    await serverlessAdvisor(
      { method: 'POST', headers: { origin: 'https://top-100-agent-skills.vercel.app', 'x-forwarded-for': '10.0.0.2' }, body: { message: 'x'.repeat(1001) } },
      longHandlerRes
    );
    assert.strictEqual(longHandlerRes.statusCode, 400);
    assert.strictEqual(longHandlerRes.headers['access-control-allow-origin'], 'https://top-100-agent-skills.vercel.app');

    // Internal exception sanitization (throwing getter triggered inside try/catch must not leak)
    const errHandlerRes = createMockRes();
    const throwingBody = {
      message: 'hello world',
      specialty: { toString() { throw new Error('SECRET_INTERNAL_TRACE'); } }
    };
    await serverlessAdvisor(
      { method: 'POST', headers: { origin: 'https://top-100-agent-skills.vercel.app', 'x-forwarded-for': '10.0.0.3' }, body: throwingBody },
      errHandlerRes
    );
    assert.strictEqual(errHandlerRes.body.reason, 'internal_fallback');
    assert(!JSON.stringify(errHandlerRes.body).includes('SECRET_INTERNAL_TRACE'));
    console.log('  PASS: Serverless api/advisor.js enforces CORS, 400 JSON/length validation, and sanitizes internal errors');

    console.log('\nAll 14 Full-Stack & Security Server tests PASSED! 🚀\n');
  } finally {
    serverProc.kill();
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
