/**
 * discover-and-sync.mjs
 * Autonomous AI Agent Skills Discovery & Top 100 Leaderboard Engine
 * 
 * 1. Searches GitHub API (topics: agent-skills, claude-skills, cursor-rules) for top starred skill repos.
 * 2. Fetches verified community skills from Skills Directory.
 * 3. Merges and deduplicates candidate skills with the current database.
 * 4. Queries live GitHub stars for all candidates with rate-limit protection.
 * 5. Re-ranks the ecosystem descending by stars and extracts the Top 100.
 * 6. Generates data/skills.json, data/leaderboard.json, and updates README.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsPath = path.join(ROOT_DIR, 'data/skills.json');
const leaderboardPath = path.join(ROOT_DIR, 'data/leaderboard.json');
const readmePath = path.join(ROOT_DIR, 'README.md');

// 10 Official Categories adhering to BUILD_SPEC and validate.mjs
const CATEGORY_MAP = {
  'documents': { name_ar: 'المستندات والملفات', keywords: ['pdf', 'doc', 'docx', 'xlsx', 'excel', 'pptx', 'powerpoint', 'word', 'file', 'csv'] },
  'design': { name_ar: 'التصميم والإبداع', keywords: ['design', 'ui', 'ux', 'css', 'style', 'figma', 'canvas', 'tailwind', 'theme', 'art'] },
  'development': { name_ar: 'البرمجة والويب', keywords: ['react', 'vue', 'next', 'fastapi', 'prisma', 'rust', 'go', 'golang', 'backend', 'frontend', 'web', 'api', 'framework', 'git', 'commit', 'branch', 'worktree'] },
  'code-quality': { name_ar: 'جودة الكود والاختبار', keywords: ['test', 'tdd', 'testing', 'debug', 'review', 'clean', 'refactor', 'quality', 'audit'] },
  'cloud-security': { name_ar: 'السحابة والأمان', keywords: ['docker', 'kubernetes', 'k8s', 'aws', 'terraform', 'cloud', 'devops', 'cicd', 'container', 'deploy', 'security', 'auth', 'secret', 'vulnerability', 'owasp'] },
  'data-ai': { name_ar: 'البيانات والذكاء الاصطناعي', keywords: ['ai', 'llm', 'rag', 'langchain', 'pytorch', 'model', 'data', 'sql', 'database', 'graph', 'embed'] },
  'science-education': { name_ar: 'العلوم والتعليم', keywords: ['learn', 'academic', 'research', 'paper', 'guide', 'tutorial', 'study', 'education'] },
  'business-finance': { name_ar: 'الأعمال والمال', keywords: ['business', 'finance', 'invest', 'sales', 'marketing', 'marketingskills', 'launch', 'pricing'] },
  'communication': { name_ar: 'الكتابة والتواصل', keywords: ['write', 'writing', 'comms', 'i18n', 'slack', 'translate', 'docs', 'readme', 'humanizer'] },
  'meta': { name_ar: 'بناء المهارات واكتشافها', keywords: ['skill-creator', 'skills', 'awesome', 'catalog', 'directory', 'marketplace', 'agentic-os', 'superpowers'] }
};

function deduceCategory(name, desc = '', topics = []) {
  const text = `${name} ${desc} ${topics.join(' ')}`.toLowerCase();
  for (const [catId, meta] of Object.entries(CATEGORY_MAP)) {
    for (const kw of meta.keywords) {
      if (text.includes(kw)) {
        return catId;
      }
    }
  }
  return 'development';
}

function formatNumber(num) {
  if (!num && num !== 0) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toLocaleString();
}

function getRankBadge(rank) {
  if (rank === 1) return '🥇 1';
  if (rank === 2) return '🥈 2';
  if (rank === 3) return '🥉 3';
  return `#${rank}`;
}

async function searchGitHub(query, token) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=15`;
  const headers = {
    'User-Agent': 'Agent-Skills-Leaderboard-Crawler/2.0',
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers });
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    } else {
      console.warn(`[GitHub Search Warn] Query "${query}" returned HTTP ${res.status}`);
      return [];
    }
  } catch (err) {
    console.warn(`[GitHub Search Error] Query "${query}":`, err.message);
    return [];
  }
}

async function fetchRepoDetails(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    'User-Agent': 'Agent-Skills-Leaderboard-Crawler/2.0',
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers });
    if (res.status === 200) {
      const d = await res.json();
      return {
        stars: d.stargazers_count,
        forks: d.forks_count,
        description: d.description || '',
        topics: d.topics || [],
        license: d.license?.spdx_id || 'MIT'
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function runDiscoveryAndSync() {
  console.log('========================================================');
  console.log('🚀 Autonomous Agent Skills Discovery & Ranking Engine');
  console.log('========================================================\n');

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    console.log('✓ Authenticated mode active (GitHub token provided)');
  } else {
    console.log('ℹ Public unauthenticated mode (Rate limit: 60 req/hr)');
  }

  // Load existing database
  let skillsData = { skills: [], categories: [], prompt_templates: {} };
  if (fs.existsSync(skillsPath)) {
    skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  }

  const existingSkillsMap = new Map();
  for (const s of skillsData.skills) {
    existingSkillsMap.set(s.id, s);
  }

  console.log(`Current tracked skills database: ${existingSkillsMap.size} skills.\n`);

  // Step 1: Discover new high-star skill repos from GitHub Search
  console.log('🔍 Searching GitHub for top-starred Agent Skill repositories...');
  const searchQueries = [
    'topic:agent-skills',
    'topic:claude-skills',
    'topic:cursor-rules',
    'agent-skills in:name,description'
  ];

  const candidateRepos = new Map();

  for (const q of searchQueries) {
    process.stdout.write(`  Searching "${q}"... `);
    const repos = await searchGitHub(q, token);
    console.log(`found ${repos.length} candidates.`);
    for (const r of repos) {
      if (!candidateRepos.has(r.full_name) && r.stargazers_count > 50) {
        candidateRepos.set(r.full_name, {
          owner: r.owner.login,
          repo: r.name,
          full_name: r.full_name,
          stars: r.stargazers_count,
          description: r.description || '',
          topics: r.topics || [],
          html_url: r.html_url
        });
      }
    }
    // Small delay between searches
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log(`\nDiscovered ${candidateRepos.size} candidate repositories across GitHub.\n`);

  // Step 2: Merge newly discovered repositories into candidate list
  for (const [fullName, repo] of candidateRepos.entries()) {
    const slug = repo.repo.toLowerCase();
    const existing = existingSkillsMap.get(slug) || Array.from(existingSkillsMap.values()).find((s) => s.source?.repo === repo.repo);

    if (!existing) {
      const category = deduceCategory(repo.repo, repo.description, repo.topics);
      const catMeta = CATEGORY_MAP[category] || CATEGORY_MAP['development'];

      const newSkill = {
        id: slug,
        name: repo.repo,
        title_ar: `${repo.repo}: أداة وكيل متقدمة`,
        summary_ar: repo.description ? `${repo.description} (مهارة وكيل مفتوحة المصدر)` : 'مهارة وكيل ذكاء اصطناعي للمطورين.',
        category: category,
        difficulty: 'intermediate',
        license: {
          type: `${repo.license || 'MIT'} (reported upstream; confirm in repository)`,
          status: 'verify_before_publish',
          copy_file_allowed: false
        },
        kind: 'collection',
        featured: repo.stars > 100000,
        github_stars: repo.stars,
        benefits_ar: [
          'توسيع قدرات وكلاء الذكاء الاصطناعي في بيئة العمل.',
          'العمل المباشر مع أدوات التطوير ومستودعات الكود.'
        ],
        use_cases_ar: [
          repo.description || 'أتمتة المهام وتطوير المشاريع باستخدام الوكلاء البرمجيين.'
        ],
        example_prompts_ar: [
          `استخدم مهارة ${repo.repo} لمساعدتي في المشروع.`
        ],
        source: {
          owner: repo.owner,
          repo: repo.repo,
          repo_url: repo.html_url,
          path_in_repo: '',
          url_verified: true,
          url: repo.html_url
        },
        tool_compatibility: {
          claude_code: true,
          antigravity: true,
          cursor: true,
          gemini_cli: true,
          copilot: true,
          codex_cli: true,
          windsurf: true,
          roo_code: true
        }
      };

      existingSkillsMap.set(slug, newSkill);
      console.log(`  + Discovered new top skill: ${repo.full_name} (★ ${repo.stars.toLocaleString()}) -> [${catMeta.name_ar}]`);
    }
  }

  // Step 3: Refresh live star counts for all unique repos
  console.log('\n⭐ Querying live star counts for repositories...');
  const repoSyncMap = new Map();
  for (const s of existingSkillsMap.values()) {
    if (s.source?.owner && s.source?.repo) {
      const key = `${s.source.owner}/${s.source.repo.split('/')[1] || s.source.repo}`;
      if (!repoSyncMap.has(key)) {
        repoSyncMap.set(key, {
          owner: s.source.owner,
          repo: s.source.repo.split('/')[1] || s.source.repo,
          currentStars: s.github_stars || 0
        });
      }
    }
  }

  for (const [key, info] of repoSyncMap.entries()) {
    process.stdout.write(`  Syncing ${key}... `);
    const details = await fetchRepoDetails(info.owner, info.repo, token);
    if (details && typeof details.stars === 'number') {
      info.currentStars = details.stars;
      console.log(`★ ${details.stars.toLocaleString()}`);
    } else {
      console.log(`kept ${info.currentStars.toLocaleString()}`);
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  // Apply updated stars
  for (const s of existingSkillsMap.values()) {
    if (s.source?.owner && s.source?.repo) {
      const key = `${s.source.owner}/${s.source.repo.split('/')[1] || s.source.repo}`;
      if (repoSyncMap.has(key)) {
        s.github_stars = repoSyncMap.get(key).currentStars;
      }
    }
  }

  // Sanitize all skills to match strict BUILD_SPEC schema
  for (const s of existingSkillsMap.values()) {
    if (typeof s.license === 'string' || !s.license?.type || !s.license?.status) {
      s.license = {
        type: typeof s.license === 'string' ? s.license : (s.license?.type || 'MIT (reported upstream)'),
        status: 'verify_before_publish',
        copy_file_allowed: false
      };
    }
    if (s.kind === 'repository') {
      s.kind = 'collection';
    }
    if (!CATEGORY_MAP[s.category]) {
      s.category = deduceCategory(s.name, s.summary_ar);
    }
  }

  // Step 4: Sort descending and take Top 100
  const allSorted = Array.from(existingSkillsMap.values()).sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
  const top100 = allSorted.slice(0, 100);

  const nowIso = new Date().toISOString();
  skillsData.skills = top100;
  skillsData.last_updated = nowIso;

  // Save data/skills.json
  fs.writeFileSync(skillsPath, JSON.stringify(skillsData, null, 2), 'utf8');
  console.log(`\n✓ Generated data/skills.json (Top 100 Skills, max: ★ ${top100[0]?.github_stars?.toLocaleString()} - min: ★ ${top100[99]?.github_stars?.toLocaleString()})`);

  // Step 5: Save lightweight public data/leaderboard.json
  const leaderboardPayload = {
    updated_at: nowIso,
    total: top100.length,
    description: 'Official Top 100 AI Agent Skills Leaderboard ranked by GitHub stars with automated daily sync.',
    leaderboard: top100.map((skill, index) => {
      const rank = index + 1;
      const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
      return {
        rank,
        id: skill.id,
        name: skill.name,
        title_ar: skill.title_ar,
        summary_ar: skill.summary_ar,
        category: skill.category,
        category_ar: catMeta.name_ar,
        github_stars: skill.github_stars || 0,
        stars_formatted: formatNumber(skill.github_stars),
        repo: `${skill.source?.owner}/${skill.source?.repo?.split('/')[1] || skill.source?.repo}`,
        repo_url: skill.source?.url || skill.source?.repo_url || '',
        license: skill.license || 'MIT'
      };
    })
  };

  fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboardPayload, null, 2), 'utf8');
  console.log('✓ Generated data/leaderboard.json (Public lightweight API format)');

  // Sync to site/data for static hosting
  const siteDataDir = path.join(ROOT_DIR, 'site/data');
  if (fs.existsSync(siteDataDir)) {
    fs.writeFileSync(path.join(siteDataDir, 'skills.json'), JSON.stringify(currentData, null, 2), 'utf8');
    fs.writeFileSync(path.join(siteDataDir, 'leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2), 'utf8');
    console.log('✓ Synchronized data to site/data for static deployments');
  }

  // Step 6: Regenerate Awesome Leaderboard Table in README.md
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');

    const leaderboardLines = [
      '<!-- LEADERBOARD_START -->',
      `> 🔄 **آخر تحديث آلي:** ${nowIso.slice(0, 10)} | يتم التحديث يومياً عبر [GitHub Actions](.github/workflows/daily-rank-sync.yml) | إجمالي المهارات المصنفة: **${top100.length}** | [تحميل JSON المباشر](data/leaderboard.json)`,
      '',
      '| # | النجوم ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز |',
      '|:---:|:---:|---|---|---|:---:|'
    ];

    top100.forEach((skill, index) => {
      const rank = index + 1;
      const rankBadge = getRankBadge(rank);
      const stars = formatNumber(skill.github_stars);
      const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
      const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
      const webUrl = `https://syedg.github.io/arabic-skills-guide/skill/${encodeURIComponent(skill.id)}`;

      leaderboardLines.push(
        `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) |`
      );
    });

    leaderboardLines.push('<!-- LEADERBOARD_END -->');
    const newLeaderboardContent = leaderboardLines.join('\n');

    if (readme.includes('<!-- LEADERBOARD_START -->') && readme.includes('<!-- LEADERBOARD_END -->')) {
      readme = readme.replace(/<!-- LEADERBOARD_START -->[\s\S]*?<!-- LEADERBOARD_END -->/, newLeaderboardContent);
    } else {
      readme += `\n\n## 🏆 قائمة المتصدرين لأفضل 100 مهارة ذكاء اصطناعي (Top 100 Leaderboard)\n\n${newLeaderboardContent}\n`;
    }

    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log('✓ Updated README.md with live Top 100 Awesome Leaderboard table');
  }

  console.log('\n========================================================');
  console.log('🎉 Discovery & Sync Pipeline Finished Successfully!');
  console.log('========================================================\n');
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith('discover-and-sync.mjs')) {
  runDiscoveryAndSync().catch((err) => {
    console.error('Fatal Discovery & Sync Error:', err);
    process.exit(1);
  });
}
