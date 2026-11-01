import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const skillsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/skills.json'), 'utf8'));

function getRepoKey(s) {
  const owner = (s.source?.owner || '').toLowerCase();
  const repo = (s.source?.repo?.split('/')[1] || s.source?.repo || '').toLowerCase();
  return `${owner}/${repo}`;
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

const CATEGORY_MAP = {
  'documents': { name_ar: 'المستندات والملفات' },
  'design': { name_ar: 'التصميم والإبداع' },
  'development': { name_ar: 'البرمجة والويب' },
  'code-quality': { name_ar: 'جودة الكود والاختبار' },
  'cloud-security': { name_ar: 'السحابة والأمان' },
  'data-ai': { name_ar: 'البيانات والذكاء الاصطناعي' },
  'science-education': { name_ar: 'العلوم والتعليم' },
  'business-finance': { name_ar: 'الأعمال والمال' },
  'communication': { name_ar: 'الكتابة والتواصل' },
  'meta': { name_ar: 'بناء المهارات واكتشافها' }
};

// Sort descending by stars
const rawSorted = [...skillsData.skills].sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

// Partition by repository cap (Max 3 per repo in top tier)
const repoCounts = {};
const topTier = [];
const remainingTier = [];

for (const skill of rawSorted) {
  const key = getRepoKey(skill);
  repoCounts[key] = (repoCounts[key] || 0) + 1;
  if (repoCounts[key] <= 3) {
    topTier.push({ ...skill, repo_rank_order: repoCounts[key], tier: 'primary_diverse' });
  } else {
    remainingTier.push({ ...skill, repo_rank_order: repoCounts[key], tier: 'extended_catalog' });
  }
}

const finalRanked = [...topTier, ...remainingTier].map((s, idx) => ({
  rank: idx + 1,
  ...s
}));

const nowIso = new Date().toISOString();

const leaderboardPayload = {
  updated_at: nowIso,
  total: finalRanked.length,
  ranking_metric: 'الأكثر شهرة مع حماية التنوع (بحد أقصى 3 مهارات لكل مستودع في الصدارة)',
  diversity_cap: 3,
  top_tier_count: topTier.length,
  extended_tier_count: remainingTier.length,
  disclaimer_ar: 'تنبيه: عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها. تم تطبيق معيار حماية التنوع (بحد أقصى 3 مهارات لكل مستودع في الصدارة) لمنع هيمنة مستودع واحد على القائمة.',
  leaderboard: finalRanked.map((skill) => {
    const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
    const repoNormalized = `${skill.source?.owner}/${skill.source?.repo?.split('/')[1] || skill.source?.repo}`;
    return {
      rank: skill.rank,
      id: skill.id,
      name: skill.name,
      title_ar: skill.title_ar,
      summary_ar: skill.summary_ar,
      category: skill.category,
      category_ar: catMeta.name_ar,
      github_stars: skill.github_stars || 0,
      stars_formatted: formatNumber(skill.github_stars),
      repo: repoNormalized,
      repo_url: skill.source?.url || skill.source?.repo_url || '',
      tier: skill.tier,
      repo_rank_order: skill.repo_rank_order,
      license: skill.license?.type || (typeof skill.license === 'string' ? skill.license : 'MIT'),
      content_verified: skill.content_verified === true
    };
  })
};

fs.writeFileSync(path.join(ROOT, 'data/leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(ROOT, 'site/data/leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2) + '\n', 'utf8');
console.log(`✓ Generated data/leaderboard.json with 3-skills-per-repo cap (${topTier.length} diverse top tier + ${remainingTier.length} extended)`);

// Update README.md
const readmePath = path.join(ROOT, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf8');
  const leaderboardLines = [
    '<!-- LEADERBOARD_START -->',
    `> 🔄 **آخر تحديث:** ${nowIso.slice(0, 10)} | **التصنيف:** الأكثر شهرة مع حماية التنوع (بحد أقصى 3 مهارات لكل مستودع في الصدارة) | [تحميل JSON المباشر](data/leaderboard.json)`,
    '> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها. تطبق الصدارة سقفاً بـ 3 مهارات كحد أقصى للمستودع الواحد في المراتب المتقدمة.',
    '',
    '| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز | الترتيب داخل المستودع |',
    '|:---:|:---:|---|---|---|:---:|:---:|'
  ];

  finalRanked.forEach((skill) => {
    const rankBadge = getRankBadge(skill.rank);
    const stars = formatNumber(skill.github_stars);
    const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
    const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
    const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;
    const repoOrderLabel = skill.tier === 'primary_diverse' ? `المهارة #${skill.repo_rank_order}` : `موسعة (#${skill.repo_rank_order})`;

    leaderboardLines.push(
      `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) | ${repoOrderLabel} |`
    );
  });

  leaderboardLines.push('<!-- LEADERBOARD_END -->');
  const newLeaderboardContent = leaderboardLines.join('\n');

  if (readme.includes('<!-- LEADERBOARD_START -->') && readme.includes('<!-- LEADERBOARD_END -->')) {
    readme = readme.replace(/<!-- LEADERBOARD_START -->[\s\S]*?<!-- LEADERBOARD_END -->/, newLeaderboardContent);
  }
  fs.writeFileSync(readmePath, readme, 'utf8');
  console.log('✓ Updated README.md with capped diverse leaderboard table');
}
