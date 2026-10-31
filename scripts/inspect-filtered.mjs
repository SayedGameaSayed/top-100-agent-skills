import fs from 'node:fs';

const scraped = JSON.parse(fs.readFileSync('scraped-raw-skills.json', 'utf8'));

// Filter out noise or obscure package names, prioritize high utility
const filtered = scraped.filter((s) => {
  // Exclude repetitive variants if any
  if (s.slug.includes('-74900db3') || s.slug.includes('-06cf7716') || s.slug.includes('-b3428aa0')) return false;
  return true;
});

// Sort by stars descending, then votes
filtered.sort((a, b) => b.stars - a.stars || b.votes - a.votes);

console.log('Filtered candidates count:', filtered.length);
console.log('\nTop 40 filtered candidates:');
filtered.slice(0, 40).forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.stars.toLocaleString()} ★ | ${s.votes}v] ${s.slug} (${s.title}) -> ${s.category}`);
});
