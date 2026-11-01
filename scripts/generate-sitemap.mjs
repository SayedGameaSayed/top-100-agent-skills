import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'https://sayedgameasayed.github.io/top-100-agent-skills';
const skillsPath = path.join(ROOT_DIR, 'data/skills.json');
const robotsPath = path.join(ROOT_DIR, 'site/robots.txt');
const sitemapPath = path.join(ROOT_DIR, 'site/sitemap.xml');

export function generateSitemapAndRobots() {
  console.log('Generating robots.txt and sitemap.xml from reviewed skills.json...');

  // 1. Generate robots.txt
  const robotsContent = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`
  ].join('\n');

  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✓ Generated site/robots.txt');

  // 2. Read reviewed skills.json ONLY
  if (!fs.existsSync(skillsPath)) {
    throw new Error('data/skills.json not found!');
  }

  const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  const today = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/leaderboard.html`, priority: '0.9', changefreq: 'daily' },
    { loc: `${BASE_URL}/how-to-use.html`, priority: '0.8', changefreq: 'weekly' }
  ];

  // Only include skills with content_verified === true
  const verifiedSkills = (skillsData.skills || []).filter((skill) => skill.content_verified === true);

  const skillUrls = verifiedSkills.map((skill) => ({
    loc: `${BASE_URL}/skill.html?id=${encodeURIComponent(skill.id)}`,
    priority: skill.featured ? '0.8' : '0.7',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticPages, ...skillUrls];

  const xmlEntries = allUrls.map((u) => {
    return [
      '  <url>',
      `    <loc>${u.loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>'
    ].join('\n');
  });

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    xmlEntries.join('\n'),
    '</urlset>'
  ].join('\n');

  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`✓ Generated site/sitemap.xml with ${allUrls.length} reviewed URLs (${skillUrls.length} skill entries + 3 main pages)`);
}

if (process.argv[1] && process.argv[1].endsWith('generate-sitemap.mjs')) {
  generateSitemapAndRobots();
}
