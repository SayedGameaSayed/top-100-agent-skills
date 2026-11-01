/**
 * discover-and-sync.mjs
 * Secure AI Agent Skills Discovery & Leaderboard Engine
 * 
 * STRICT SECURITY & INTEGRITY RULES:
 * 1. NEVER modifies data/skills.json or data/tools.json (human-reviewed files are immutable to automated sync).
 * 2. Newly discovered skill candidates go strictly to data/candidates.json for human review.
 *    They are NEVER displayed on the site and NEVER given a copy-prompt button until manually vetted.
 * 3. Reads vetted skills from data/skills.json, fetches live repo stars, and writes data/leaderboard.json.
 * 4. Labels all rankings explicitly: "الأكثر شهرة (حسب نجوم المستودع)" with repository-level attribution notice.
 * 5. Updates the Awesome Leaderboard table in README.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsPath = path.join(ROOT_DIR, 'data/skills.json');
const leaderboardPath = path.join(ROOT_DIR, 'data/leaderboard.json');
const candidatesPath = path.join(ROOT_DIR, 'data/candidates.json');
const readmePath = path.join(ROOT_DIR, 'README.md');

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
        license: d.license?.spdx_id || 'Unknown'
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function runDiscoveryAndSync() {
  console.log('========================================================');
  console.log('🛡️ Secure Agent Skills Discovery & Leaderboard Engine');
  console.log('========================================================\n');

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    console.log('✓ Authenticated mode active (GitHub token provided)');
  } else {
    console.log('ℹ Public unauthenticated mode (Rate limit: 60 req/hr)');
  }

  // 1. Read vetted database (IMMUTABLE - never overwritten by this script)
  if (!fs.existsSync(skillsPath)) {
    throw new Error('data/skills.json not found!');
  }
  const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  console.log(`✓ Loaded ${skillsData.skills.length} vetted skills from data/skills.json (Read-Only).`);

  // Map existing vetted repo identifiers
  const vettedRepoSet = new Set();
  for (const s of skillsData.skills) {
    if (s.source?.owner && s.source?.repo) {
      vettedRepoSet.add(`${s.source.owner.toLowerCase()}/${(s.source.repo.split('/')[1] || s.source.repo).toLowerCase()}`);
    }
  }

  // 2. Discover new candidate repositories and route strictly to data/candidates.json
  console.log('\n🔍 Crawling GitHub for candidate skills (saved strictly to candidates.json)...');
  const searchQueries = [
    'topic:agent-skills',
    'topic:claude-skills',
    'topic:cursor-rules',
    'agent-skills in:name,description'
  ];

  let candidatesPayload = {
    last_crawled_at: new Date().toISOString(),
    description: 'Newly discovered candidate skill repositories awaiting human translation, license review, and safety validation. NEVER rendered on public site until vetted.',
    candidates: []
  };

  if (fs.existsSync(candidatesPath)) {
    try {
      candidatesPayload = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));
    } catch {
      // fresh
    }
  }

  const existingCandidateUrls = new Set((candidatesPayload.candidates || []).map((c) => c.repo_url.toLowerCase()));

  let newCandidateCount = 0;
  for (const q of searchQueries) {
    process.stdout.write(`  Searching "${q}"... `);
    const repos = await searchGitHub(q, token);
    console.log(`found ${repos.length} candidates.`);

    for (const r of repos) {
      const repoKey = `${r.owner.login.toLowerCase()}/${r.name.toLowerCase()}`;
      const repoUrl = r.html_url.toLowerCase();

      // Check if already vetted or already in candidates
      if (!vettedRepoSet.has(repoKey) && !existingCandidateUrls.has(repoUrl) && r.stargazers_count >= 50) {
        const deducedCat = deduceCategory(r.name, r.description || '', r.topics || []);
        candidatesPayload.candidates.push({
          owner: r.owner.login,
          repo: r.name,
          full_name: r.full_name,
          repo_url: r.html_url,
          stars: r.stargazers_count,
          description: r.description || '',
          topics: r.topics || [],
          deduced_category: deducedCat,
          deduced_category_ar: CATEGORY_MAP[deducedCat]?.name_ar || 'البرمجة والويب',
          review_status: 'pending_human_review',
          safety_warning: 'Unverified prompt code. Requires manual review of SKILL.md before promoting to skills.json.',
          discovered_at: new Date().toISOString()
        });
        existingCandidateUrls.add(repoUrl);
        newCandidateCount++;
      }
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  // Sort candidates by stars descending
  candidatesPayload.candidates.sort((a, b) => (b.stars || 0) - (a.stars || 0));
  candidatesPayload.total_candidates = candidatesPayload.candidates.length;
  candidatesPayload.last_crawled_at = new Date().toISOString();

  fs.writeFileSync(candidatesPath, JSON.stringify(candidatesPayload, null, 2), 'utf8');
  console.log(`✓ Updated data/candidates.json (+${newCandidateCount} new candidates, total: ${candidatesPayload.candidates.length})`);
  console.log('🛡️ Security Guarantee: Candidates remain quarantined and will NEVER be rendered on the live site or receive a copy-prompt button.');

  // 3. Query live star counts for vetted skills ONLY to update leaderboard rankings
  console.log('\n⭐ Refreshing repository stars for vetted skills...');
  const repoSyncMap = new Map();
  for (const s of skillsData.skills) {
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

  // Build ranked leaderboard list from vetted skills with updated stars
  const rankedVettedSkills = skillsData.skills.map((s) => {
    let liveStars = s.github_stars || 0;
    if (s.source?.owner && s.source?.repo) {
      const key = `${s.source.owner}/${s.source.repo.split('/')[1] || s.source.repo}`;
      if (repoSyncMap.has(key)) {
        liveStars = repoSyncMap.get(key).currentStars;
      }
    }
    return {
      ...s,
      github_stars: liveStars
    };
  });

  rankedVettedSkills.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

  const nowIso = new Date().toISOString();

  // 4. Save data/leaderboard.json ONLY (skills.json remains untouched!)
  const leaderboardPayload = {
    updated_at: nowIso,
    total: rankedVettedSkills.length,
    ranking_metric: 'الأكثر شهرة (حسب نجوم المستودع)',
    disclaimer_ar: 'تنبيه: عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.',
    leaderboard: rankedVettedSkills.map((skill, index) => {
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
        license: skill.license?.type || (typeof skill.license === 'string' ? skill.license : 'MIT'),
        content_verified: skill.content_verified === true
      };
    })
  };

  fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboardPayload, null, 2), 'utf8');
  console.log(`\n✓ Generated data/leaderboard.json (${rankedVettedSkills.length} vetted skills ranked)`);

  // Sync leaderboard ONLY to site/data
  const siteDataDir = path.join(ROOT_DIR, 'site/data');
  if (fs.existsSync(siteDataDir)) {
    fs.writeFileSync(path.join(siteDataDir, 'leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2), 'utf8');
    console.log('✓ Synchronized data/leaderboard.json to site/data/leaderboard.json for live hosting');
  }

  // 5. Update Leaderboard table in README.md
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');

    const leaderboardLines = [
      '<!-- LEADERBOARD_START -->',
      `> 🔄 **آخر تحديث آلي:** ${nowIso.slice(0, 10)} | **التصنيف:** الأكثر شهرة (حسب نجوم المستودع) | [تحميل JSON المباشر](data/leaderboard.json)`,
      '> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.',
      '',
      '| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز | حالة المراجعة |',
      '|:---:|:---:|---|---|---|:---:|:---:|'
    ];

    rankedVettedSkills.forEach((skill, index) => {
      const rank = index + 1;
      const rankBadge = getRankBadge(rank);
      const stars = formatNumber(skill.github_stars);
      const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
      const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
      const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;
      const verifiedBadge = skill.content_verified === true ? '✅ مراجعة يدوية' : 'ℹ️ مسودة عامة';

      leaderboardLines.push(
        `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) | ${verifiedBadge} |`
      );
    });

    leaderboardLines.push('<!-- LEADERBOARD_END -->');
    const newLeaderboardContent = leaderboardLines.join('\n');

    if (readme.includes('<!-- LEADERBOARD_START -->') && readme.includes('<!-- LEADERBOARD_END -->')) {
      readme = readme.replace(/<!-- LEADERBOARD_START -->[\s\S]*?<!-- LEADERBOARD_END -->/, newLeaderboardContent);
    } else {
      readme += `\n\n## 🏆 قائمة المتصدرين: الأكثر شهرة حسب نجوم المستودع\n\n${newLeaderboardContent}\n`;
    }

    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log('✓ Updated README.md with live table and repository stars disclaimer');
  }

  console.log('\n========================================================');
  console.log('🎉 Secure Sync Pipeline Finished Successfully!');
  console.log('========================================================\n');
}

if (process.argv[1] && process.argv[1].endsWith('discover-and-sync.mjs')) {
  runDiscoveryAndSync().catch((err) => {
    console.error('Fatal Discovery & Sync Error:', err);
    process.exit(1);
  });
}
