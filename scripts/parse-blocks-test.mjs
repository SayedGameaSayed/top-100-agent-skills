import fs from 'node:fs';

const html = fs.readFileSync('temp-stars-page.html', 'utf8');

function parseBlocks(html) {
  const parts = html.split('\"href\":\"/skills/');
  console.log('Total parts:', parts.length);
  const items = [];
  
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const slugMatch = chunk.match(/^([^"\s]+)/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    if (['all', 'best', 'security', 'advertise'].includes(slug)) continue;

    // Title
    const titleMatch = chunk.match(/"truncate text-title text-primary","children":"([^"]+)"/);
    // Grade
    const gradeMatch = chunk.match(/"Security grade ([A-F])"/);
    // Description
    const descMatch = chunk.match(/"line-clamp-2 text-ui text-subtle","children":"([^"]+)"/);
    // Category
    const catMatch = chunk.match(/"border border-canvas bg-control px-2 py-0\.5 text-meta text-primary","children":"([^"]+)"/);
    // Votes
    const votesMatch = chunk.match(/"Votes: "\],"(.*?)"/);
    // Stars
    const starsMatch = chunk.match(/"GitHub stars: "\],"(.*?)"/);

    items.push({
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      grade: gradeMatch ? gradeMatch[1] : 'A',
      description: descMatch ? descMatch[1] : '',
      category: catMatch ? catMatch[1] : 'development',
      votes: votesMatch ? parseInt(votesMatch[1].replace(/,/g, ''), 10) || 0 : 0,
      stars: starsMatch ? parseInt(starsMatch[1].replace(/,/g, ''), 10) || 0 : 0
    });
  }

  return items;
}

const items = parseBlocks(html);
console.log('Parsed items count:', items.length);
console.log('Item 0:', items[0]);
console.log('Item 1:', items[1]);
console.log('Item 19:', items[19]);
