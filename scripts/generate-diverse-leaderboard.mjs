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

const REPO_TYPE_MAP = {
  'skills': 'مهارة (Skill)',
  'tool': 'أداة (Tool)',
  'plugin': 'إضافة (Plugin)',
  'list': 'قائمة (List)'
};

// 1. Separate Qualified Skills (repo_type === 'skills' with real SKILL.md folder path)
const qualifiedSkills = skillsData.skills.filter(
  (s) => s.repo_type === 'skills' && s.source?.path_in_repo && s.source.path_in_repo.trim() !== ''
);

// Sort qualified skills by stars desc
qualifiedSkills.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

// Diversity Cap: Max 3 skills per repository in top ranks
const repoCounts = {};
const topTier = [];
const extendedSkillsTier = [];

for (const skill of qualifiedSkills) {
  const key = getRepoKey(skill);
  repoCounts[key] = (repoCounts[key] || 0) + 1;
  if (repoCounts[key] <= 3) {
    topTier.push({ ...skill, repo_rank_order: repoCounts[key], tier: 'primary_diverse_skill' });
  } else {
    extendedSkillsTier.push({ ...skill, repo_rank_order: repoCounts[key], tier: 'extended_skill' });
  }
}

// 2. Separate Tools, Plugins, Curated Lists & Root Collections
const toolsAndPlugins = skillsData.skills.filter(
  (s) => !qualifiedSkills.some((q) => q.id === s.id)
);
toolsAndPlugins.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
const toolsTier = toolsAndPlugins.map((s, idx) => ({
  ...s,
  repo_rank_order: idx + 1,
  tier: 'extended_tool_or_plugin'
}));

// Combine for full ranked listing (Top diverse skills first, then extended skills, then tools/plugins)
const finalRanked = [...topTier, ...extendedSkillsTier, ...toolsTier].map((s, idx) => ({
  rank: idx + 1,
  ...s
}));

const STARS_FETCHED_AT = '2026-11-01T20:17:18Z';
const STARS_AS_OF_AR = '1 نوفمبر 2026';
const nowIso = new Date().toISOString();

const leaderboardPayload = {
  updated_at: nowIso,
  stars_fetched_at: STARS_FETCHED_AT,
  stars_as_of_ar: STARS_AS_OF_AR,
  total: finalRanked.length,
  qualified_skills_total: qualifiedSkills.length,
  top_diverse_skills_count: topTier.length,
  extended_skills_count: extendedSkillsTier.length,
  tools_and_plugins_count: toolsTier.length,
  ranking_metric: 'صدارة مهارات الوكلاء المؤهلة (SKILL.md) مع حماية التنوع (بحد أقصى 3 مهارات لكل مستودع)',
  diversity_cap: 3,
  disclaimer_ar: 'تنبيه: عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها. تشترط الصدارة وجود ملف SKILL.md حقيقي وأن يكون المستودع مصدراً للمهارات (repo_type: skills)، وتطبق سقفاً بـ 3 مهارات كحد أقصى للمستودع الواحد لمنع الاحتكار.',
  skills: finalRanked.map((skill) => {
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
      repo_type: skill.repo_type || 'skills',
      repo_type_ar: REPO_TYPE_MAP[skill.repo_type] || 'مهارة (Skill)',
      github_stars: skill.github_stars || 0,
      stars_formatted: formatNumber(skill.github_stars),
      stars_fetched_at: STARS_FETCHED_AT,
      stars_as_of_ar: STARS_AS_OF_AR,
      repo: repoNormalized,
      repo_url: skill.source?.url || skill.source?.repo_url || '',
      path_in_repo: skill.source?.path_in_repo || '',
      tier: skill.tier,
      repo_rank_order: skill.repo_rank_order,
      license: skill.license?.type || (typeof skill.license === 'string' ? skill.license : 'MIT'),
      content_verified: skill.content_verified === true,
      responsible_use_note_ar: skill.responsible_use_note_ar || null
    };
  })
};

// Also mirror top-level leaderboard property for compatibility
leaderboardPayload.leaderboard = leaderboardPayload.skills;

fs.writeFileSync(path.join(ROOT, 'data/leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(ROOT, 'site/data/leaderboard.json'), JSON.stringify(leaderboardPayload, null, 2) + '\n', 'utf8');
console.log(`✓ Generated data/leaderboard.json (${topTier.length} top diverse skills + ${extendedSkillsTier.length} extended skills + ${toolsTier.length} tools/plugins)`);

// Update README.md
const readmePath = path.join(ROOT, 'README.md');
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf8');
  const leaderboardLines = [
    '<!-- LEADERBOARD_START -->',
    `> 🔄 **آخر تحديث:** ${nowIso.slice(0, 10)} | **نجوم المستودعات كما في:** ${STARS_AS_OF_AR} | [تحميل JSON المباشر](data/leaderboard.json)`,
    '> ⚠️ **تنبيه الشفافية وقواعد التأهيل:**',
    '> 1. تشترط صدارة المهارات المتقدمة أن تشير المهارة لمجلد يحتوي على ملف `SKILL.md` حقيقي وأن يكون المستودع مصدراً للمهارات (`repo_type: "skills"`).',
    '> 2. يطبق سقف 3 مهارات كحد أقصى للمستودع الواحد في الصدارة لضمان التنوع وتكافؤ الفرص.',
    '> 3. تم نقل الأدوات (`tools`) والإضافات (`plugins`) والقوائم (`lists`) لقسم مخصص في نهاية القائمة مع إرشادات الاستخدام المسؤول.',
    '',
    '### 🏆 صدارة مهارات الوكلاء المؤهلة (Top Diverse Skills)',
    '',
    '| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح العربي والبرومبت | الترتيب بالمستودع |',
    '|:---:|:---:|---|---|---|:---:|:---:|'
  ];

  topTier.forEach((skill, idx) => {
    const rankBadge = getRankBadge(idx + 1);
    const stars = formatNumber(skill.github_stars);
    const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
    const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
    const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;
    const repoNormalized = `${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}`;

    leaderboardLines.push(
      `| **${rankBadge}** | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${repoNormalized}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) | المهارة #${skill.repo_rank_order} |`
    );
  });

  leaderboardLines.push('');
  leaderboardLines.push('### 📦 مهارات المستودعات الموسعة (Extended Skills)');
  leaderboardLines.push('');
  leaderboardLines.push('| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح العربي والبرومبت | الترتيب بالمستودع |');
  leaderboardLines.push('|:---:|:---:|---|---|---|:---:|:---:|');

  extendedSkillsTier.forEach((skill, idx) => {
    const stars = formatNumber(skill.github_stars);
    const catMeta = CATEGORY_MAP[skill.category] || { name_ar: skill.category };
    const effectiveSource = skill.source?.url || skill.source?.repo_url || '#';
    const webUrl = `https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=${encodeURIComponent(skill.id)}`;
    const repoNormalized = `${skill.source.owner}/${skill.source.repo.split('/')[1] || skill.source.repo}`;

    leaderboardLines.push(
      `| #${topTier.length + idx + 1} | \`${stars}\` | [**${skill.name}**](${effectiveSource}) | ${catMeta.name_ar} | [\`${repoNormalized}\`](${skill.source.repo_url}) | [**${skill.title_ar}** ↗](${webUrl}) | مهارة #${skill.repo_rank_order} |`
    );
  });

  leaderboardLines.push('');
  leaderboardLines.push('### 🛠️ الأدوات والإضافات والقوائم المكملة (Tools, Plugins & Lists)');
  leaderboardLines.push('');
  leaderboardLines.push('> ℹ️ هذه المستودعات أدوات ومكتبات برمجية أو إضافات وليست مهارات قائمة بذاتها بتنسيق `SKILL.md`، ومصنفة لتسهيل الرجوع إليها.');
  leaderboardLines.push('');
  leaderboardLines.push('| # | نجوم المستودع ★ | الأداة / الإضافة | النوع | المستودع الأصلي (GitHub) | ملاحظات الاستخدام |');
  leaderboardLines.push('|:---:|:---:|---|---|---|---|');

  toolsTier.forEach((tool, idx) => {
    const stars = formatNumber(tool.github_stars);
    const effectiveSource = tool.source?.url || tool.source?.repo_url || '#';
    const repoNormalized = `${tool.source.owner}/${tool.source.repo.split('/')[1] || tool.source.repo}`;
    const typeLabel = REPO_TYPE_MAP[tool.repo_type] || 'أداة';
    const note = tool.responsible_use_note_ar ? `⚠️ **${tool.responsible_use_note_ar}**` : (tool.summary_ar || '');

    leaderboardLines.push(
      `| #${topTier.length + extendedSkillsTier.length + idx + 1} | \`${stars}\` | [**${tool.name}**](${effectiveSource}) | \`${typeLabel}\` | [\`${repoNormalized}\`](${tool.source.repo_url}) | ${note} |`
    );
  });

  leaderboardLines.push('<!-- LEADERBOARD_END -->');
  const newLeaderboardContent = leaderboardLines.join('\n');

  if (readme.includes('<!-- LEADERBOARD_START -->') && readme.includes('<!-- LEADERBOARD_END -->')) {
    readme = readme.replace(/<!-- LEADERBOARD_START -->[\s\S]*?<!-- LEADERBOARD_END -->/, newLeaderboardContent);
  }
  fs.writeFileSync(readmePath, readme, 'utf8');
  console.log('✓ Updated README.md with qualified diverse leaderboard table');
}
