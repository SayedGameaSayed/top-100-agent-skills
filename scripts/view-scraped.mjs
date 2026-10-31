import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scraped-raw-skills.json', 'utf8'));
console.log('Total:', data.length);
console.log('Top 20 by stars:');
for (const s of data.slice(0, 20)) {
  console.log(`${s.stars.toLocaleString()} ★ | ${s.votes} votes | ${s.slug} | ${s.title}`);
}

console.log('\nTop 15 by votes:');
const byVotes = [...data].sort((a, b) => b.votes - a.votes || b.stars - a.stars);
for (const s of byVotes.slice(0, 15)) {
  console.log(`${s.votes} votes | ${s.stars.toLocaleString()} ★ | ${s.slug} | ${s.title}`);
}
