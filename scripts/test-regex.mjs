import fs from 'node:fs';

const html = fs.readFileSync('temp-stars-page.html', 'utf8');
const chunk = html.slice(html.indexOf('/skills/obra-writing-skills'), html.indexOf('/skills/obra-writing-plans'));

const m1 = chunk.match(/GitHub stars:[^0-9]*([0-9,]+)/);
console.log('GitHub stars match:', m1 ? m1[1] : null);

const m2 = chunk.match(/Votes:[^0-9]*([0-9,]+)/);
console.log('Votes match:', m2 ? m2[1] : null);
