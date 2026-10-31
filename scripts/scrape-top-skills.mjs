import fs from 'node:fs';

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Failed ${url}: ${res.status}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return null;
  }
}

function parseSkillsFromHtml(html) {
  const parts = html.split(/\/skills\//);
  const items = [];
  const seen = new Set();
  
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const slugMatch = chunk.match(/^([a-zA-Z0-9_-]+)/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    if (['all', 'best', 'security', 'advertise'].includes(slug)) continue;
    if (slug.startsWith('layout-') || slug.startsWith('error-') || slug.startsWith('page-')) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);

    // Title
    const titleMatch = chunk.match(/text-title text-primary\\",\\"children\\":\\"([^"\\]+)\\"/);
    // Grade
    const gradeMatch = chunk.match(/Security grade ([A-F])/);
    // Description
    const descMatch = chunk.match(/text-ui text-subtle\\",\\"children\\":\\"([^"\\]+)\\"/);
    // Category
    const catMatch = chunk.match(/bg-control px-2 py-0\.5 text-meta text-primary\\",\\"children\\":\\"([^"\\]+)\\"/);
    // Votes
    const votesMatch = chunk.match(/Votes:[^0-9]*([0-9,]+)/);
    // Stars
    const starsMatch = chunk.match(/GitHub stars:[^0-9]*([0-9,]+)/);

    if (titleMatch && descMatch) {
      items.push({
        slug,
        title: titleMatch[1],
        grade: gradeMatch ? gradeMatch[1] : 'A',
        description: descMatch[1],
        category: catMatch ? catMatch[1] : 'development',
        votes: votesMatch ? parseInt(votesMatch[1].replace(/,/g, ''), 10) || 0 : 0,
        stars: starsMatch ? parseInt(starsMatch[1].replace(/,/g, ''), 10) || 0 : 0
      });
    }
  }

  return items;
}

async function scrapeEverything() {
  const allSkills = new Map();

  const urlsToFetch = [
    // Top stars overall
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=2',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=3',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=4',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=5',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=6',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=7',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars&page=8',

    // Top votes overall
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=votes',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=votes&page=2',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=votes&page=3',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=votes&page=4',
    'https://www.skillsdirectory.com/skills?securityGrade=all&sort=votes&page=5',

    // Category top skills
    'https://www.skillsdirectory.com/skills?category=development&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=code-quality&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=security&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=testing&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=devops&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=data&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=design&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=business&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=research&securityGrade=all&sort=stars',
    'https://www.skillsdirectory.com/skills?category=documentation&securityGrade=all&sort=stars'
  ];

  for (let i = 0; i < urlsToFetch.length; i++) {
    const url = urlsToFetch[i];
    console.log(`[${i + 1}/${urlsToFetch.length}] Fetching: ${url}`);
    const html = await fetchPage(url);
    if (html) {
      const skills = parseSkillsFromHtml(html);
      console.log(`  -> Got ${skills.length} skills`);
      for (const s of skills) {
        if (!allSkills.has(s.slug)) {
          allSkills.set(s.slug, s);
        } else {
          const ex = allSkills.get(s.slug);
          ex.votes = Math.max(ex.votes, s.votes);
          ex.stars = Math.max(ex.stars, s.stars);
        }
      }
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  const list = Array.from(allSkills.values());
  // Sort by stars descending, then votes descending
  list.sort((a, b) => b.stars - a.stars || b.votes - a.votes);

  console.log(`\nDONE. Total unique skills scraped: ${list.length}`);
  fs.writeFileSync('scraped-raw-skills.json', JSON.stringify(list, null, 2), 'utf8');
}

scrapeEverything();
