import fs from 'node:fs';

const html = fs.readFileSync('temp-stars-page.html', 'utf8');

function parseSkills(html) {
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
    const votesMatch = chunk.match(/Votes: [^"]*?([0-9,]+)\\\"/);
    // Stars
    const starsMatch = chunk.match(/GitHub stars: [^"]*?([0-9,]+)\\\"/);

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

const items = parseSkills(html);
console.log('Real skills count on page 1:', items.length);
for (const it of items) {
  console.log(`- ${it.slug} | ${it.title} | ${it.stars} stars | ${it.votes} votes | ${it.category}`);
}
