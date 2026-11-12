import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

async function runMcpTests() {
  console.log('Testing Top 100 Agent Skills MCP Server (stdio)...\n');

  const transport = new StdioClientTransport({
    command: 'node',
    args: [path.join(PROJECT_ROOT, 'bin', 'mcp.js')],
    cwd: PROJECT_ROOT
  });

  const client = new Client({
    name: 'mcp-test-client',
    version: '1.0.0'
  });

  await client.connect(transport);

  try {
    // 1. Tool discovery
    const listed = await client.listTools();
    const toolNames = listed.tools.map((t) => t.name);
    assert(toolNames.includes('search_skills'));
    assert(toolNames.includes('get_skill'));
    assert(toolNames.includes('get_leaderboard'));
    assert(toolNames.includes('recommend_skills_for_task'));
    console.log(`  PASS: Discovered ${toolNames.length} MCP tools (${toolNames.join(', ')})`);

    // 2. Arabic normalized search
    const searchRes = await client.callTool({
      name: 'search_skills',
      arguments: { query: 'وورد', lang: 'ar', limit: 5 }
    });
    const searchPayload = JSON.parse(searchRes.content[0].text);
    assert(searchPayload.skills.some((s) => s.id === 'docx'));
    console.log('  PASS: search_skills finds "docx" from Arabic query "وورد"');

    // 3. Get full skill details & prompt
    const detailRes = await client.callTool({
      name: 'get_skill',
      arguments: { id: 'docx', lang: 'en' }
    });
    const detailPayload = JSON.parse(detailRes.content[0].text);
    assert.strictEqual(detailPayload.id, 'docx');
    assert(detailPayload.ready_prompt_en && detailPayload.ready_prompt_en.includes('https://'));
    console.log('  PASS: get_skill returns verified prompt and upstream URL');

    // 4. Unknown skill returns clean isError
    const missingRes = await client.callTool({
      name: 'get_skill',
      arguments: { id: 'definitely-not-a-real-skill-xyz' }
    });
    assert.strictEqual(missingRes.isError, true);
    console.log('  PASS: get_skill handles unknown ID with isError: true');

    // 5. Leaderboard top 5
    const lbRes = await client.callTool({
      name: 'get_leaderboard',
      arguments: { limit: 5 }
    });
    const lbPayload = JSON.parse(lbRes.content[0].text);
    assert.strictEqual(lbPayload.skills.length, 5);
    assert.strictEqual(lbPayload.skills[0].rank, 1);
    assert(lbPayload.skills[0].github_stars >= lbPayload.skills[1].github_stars);
    console.log('  PASS: get_leaderboard returns sorted top 5 entries');

    // 6. Local offline task recommendation
    const recRes = await client.callTool({
      name: 'recommend_skills_for_task',
      arguments: { task: 'FastAPI backend with pytest unit tests', limit: 5 }
    });
    const recPayload = JSON.parse(recRes.content[0].text);
    assert.strictEqual(recPayload.detected_specialty, 'code');
    assert(recPayload.recommended_skills.length > 0);
    console.log('  PASS: recommend_skills_for_task classifies and recommends skills offline');

    console.log('\nAll 6 MCP Server tests PASSED! 🚀\n');
  } finally {
    await client.close();
  }
}

runMcpTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
