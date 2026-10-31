import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scraped-raw-skills.json', 'utf8'));

console.log('Total scraped:', data.length);

// Group by category
const byCat = {};
for (const s of data) {
  const cat = s.category || 'other';
  byCat[cat] = byCat[cat] || [];
  byCat[cat].push(s);
}

for (const [cat, list] of Object.entries(byCat)) {
  console.log(`\nCategory: ${cat} (${list.length} skills)`);
  list.sort((a, b) => b.stars - a.stars);
  for (const s of list.slice(0, 4)) {
    console.log(`  - ${s.stars.toLocaleString()} ★ | ${s.slug} | ${s.title}`);
  }
}
