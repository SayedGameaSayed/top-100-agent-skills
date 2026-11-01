/**
 * sync-rankings.mjs
 * Automated GitHub Stars Sync & Top 100 Leaderboard Generator
 * 
 * 1. Fetches real-time live GitHub stars for all tracked skill repositories.
 * 2. Re-ranks skills descending by star count.
 * 3. Updates data/skills.json with live stars and timestamp.
 * 4. Regenerates the public Awesome Leaderboard table in README.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsPath = path.join(ROOT_DIR, 'data/skills.json');
const readmePath = path.join(ROOT_DIR, 'README.md');

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

async function fetchRepoStars(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    'User-Agent': 'Agent-Skills-Leaderboard-Crawler/1.0',
    Accept: 'application/vnd.github.v3+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (res.status === 200) {
      const data = await res.json();
      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        pushed_at: data.pushed_at
      };
    } else if (res.status === 403) {
      console.warn(`[Rate Limited] ${owner}/${repo} (status 403)`);
      return null;
    } else {
      console.warn(`[HTTP ${res.status}] ${owner}/${repo}`);
      return null;
    }
  } catch (err) {
    console.error(`Error querying ${owner}/${repo}:`, err.message);
    return null;
  }
}

export async function syncRankings() {
  console.log('====================================================');
  console.log('⭐ Agent Skills Daily Leaderboard Sync & Ranking');
  console.log('====================================================');

  const raw = fs.readFileSync(skillsPath, 'utf8');
  const skillsData = JSON.parse(raw);
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    console.log('✓ Using authenticated GitHub token (5,000 requests/hr limit)');
  } else {
    console.log('ℹ No GITHUB_TOKEN provided; running in unauthenticated public mode');
  }

  // 1. Identify all unique repos
  const repoMap = new Map();
  for (const s of skillsData.skills) {
    if (s.source?.owner && s.source?.repo) {
      const key = `${s.source.owner}/${s.source.repo.split('/')[1] || s.source.repo}`;
      if (!repoMap.has(key)) {
        repoMap.set(key, {
          owner: s.source.owner,
          repo: s.source.repo.split('/')[1] || s.source.repo,
          currentStars: s.github_stars || 0
        });
      }
    }
  }

  console.log(`Found ${repoMap.size} unique repositories across ${skillsData.skills.length} skills.\n`);

  // 2. Fetch live stars for each repo
  let updatedCount = 0;
  const liveStarsMap = new Map();

  for (const [key, info] of repoMap.entries()) {
    process.stdout.write(`Fetching ${key}... `);
    const result = await fetchRepoStars(info.owner, info.repo, token);
    if (result && typeof result.stars === 'number') {
      liveStarsMap.set(key, result.stars);
      console.log(`★ ${result.stars.toLocaleString()}`);
      updatedCount++;
    } else {
      console.log(`kept existing (${info.currentStars.toLocaleString()})`);
      liveStarsMap.set(key, info.currentStars);
    }
    // Small delay to prevent burst limits
    await new Promise((r) => setTimeout(r, 200));
  }

  // 3. Update skill star counts
  for (const s of skillsData.skills) {
    if (s.source?.owner && s.source?.repo) {
      const key = `${s.source.owner}/${s.source.repo.split('/')[1] || s.source.repo}`;
      if (liveStarsMap.has(key)) {
        s.github_stars = liveStarsMap.get(key);
      }
    }
  }

  // 4. Re-sort all skills by stars descending
  skillsData.skills.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

  const nowIso = new Date().toISOString();
  skillsData.last_updated = nowIso;

  fs.writeFileSync(skillsPath, JSON.stringify(skillsData, null, 2), 'utf8');
  console.log(`\n✓ Updated data/skills.json (${skillsData.skills.length} skills sorted by stars)`);

  // 5. Update Leaderboard Table in README.md
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');

    // Build categories lookup
    const catLookup = {};
    for (const c of skillsData.categories || []) {
      catLookup[c.id] = c.name_ar;
    }

    const leaderboardLines = [
      '<!-- LEADERBOARD_START -->',
      `> 🔄 **آخر تحديث آلي:** ${nowIso.slice(0, 10)} | يتم التحديث يومياً عبر [GitHub Actions](.github/workflows/daily-rank-sync.yml) | إجمالي المهارات: **${skillsData.skills.length}**`,
      '',
      '| # | النجوم ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز |',
      '|:---:|:---:|---|---|---|:---:|'
    ];

    skillsData.skills.forEach((skill, index) => {
      const rank = index + 1;
      const rankBadge = getRankBadge(rank);
      const stars = formatNumber(skill.github_stars);
      const catName = catLookup[skill.category] || skill.category;
      const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
      const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;

      leaderboardLines.push(
        `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catName} | [\`${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) |`
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
    console.log('✓ Updated README.md with Live Top 100 Leaderboard table');
  }

  console.log('\n====================================================');
  console.log(`🎉 Sync Completed! ${updatedCount} repositories verified.`);
  console.log('====================================================');
}

// Run immediately if called directly from CLI
if (process.argv[1] && process.argv[1].endsWith('sync-rankings.mjs')) {
  syncRankings().catch((err) => {
    console.error('Fatal error during sync:', err);
    process.exit(1);
  });
}
