import fs from 'node:fs';

const scraped = JSON.parse(fs.readFileSync('scraped-raw-skills.json', 'utf8'));
const currentSkillsData = JSON.parse(fs.readFileSync('data/skills.json', 'utf8'));

console.log('Current skills in catalog:', currentSkillsData.skills.length);
console.log('Scraped candidates:', scraped.length);

// Check slugs already in current catalog
const existingSlugs = new Set(currentSkillsData.skills.map((s) => s.id));
console.log('Existing slugs:', [...existingSlugs]);
