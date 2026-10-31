import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SkillsSearchEngine, normalizeArabic } from '../site/js/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const skillsData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/skills.json'), 'utf8'));

let testCount = 0;
let passedCount = 0;

function test(name, fn) {
  testCount++;
  try {
    fn();
    passedCount++;
    console.log(`  PASS: ${name}`);
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('Running Search Engine & Acceptance Tests...\n');

const engine = new SkillsSearchEngine(skillsData.skills);

test('Normalizes Arabic alef variants, ya, ta marbuta, and tashkeel', () => {
  assert.strictEqual(normalizeArabic('إِكْسَلْ'), 'اكسل');
  assert.strictEqual(normalizeArabic('أكسل'), 'اكسل');
  assert.strictEqual(normalizeArabic('آلة'), 'اله');
  assert.strictEqual(normalizeArabic('مهارةً'), 'مهاره');
  assert.strictEqual(normalizeArabic('مُسْتَنَدَاتْ'), 'مستندات');
});

test('Searching "ورد" finds docx', () => {
  const results = engine.search({ query: 'ورد' });
  assert(results.some((s) => s.id === 'docx'), `Expected to find docx, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "وورد" finds docx', () => {
  const results = engine.search({ query: 'وورد' });
  assert(results.some((s) => s.id === 'docx'), `Expected to find docx, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "اكسل" finds xlsx', () => {
  const results = engine.search({ query: 'اكسل' });
  assert(results.some((s) => s.id === 'xlsx'), `Expected to find xlsx, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "إكسل" finds xlsx', () => {
  const results = engine.search({ query: 'إكسل' });
  assert(results.some((s) => s.id === 'xlsx'), `Expected to find xlsx, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "pdf" finds pdf', () => {
  const results = engine.search({ query: 'pdf' });
  assert(results.some((s) => s.id === 'pdf'), `Expected to find pdf, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "بي دي اف" finds pdf', () => {
  const results = engine.search({ query: 'بي دي اف' });
  assert(results.some((s) => s.id === 'pdf'), `Expected to find pdf, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Searching "تصميم" finds canvas-design', () => {
  const results = engine.search({ query: 'تصميم' });
  assert(results.some((s) => s.id === 'canvas-design'), `Expected to find canvas-design, found: ${results.map((r) => r.id).join(', ')}`);
});

test('Empty query returns all skills', () => {
  const results = engine.search({ query: '' });
  assert.strictEqual(results.length, skillsData.skills.length);
});

test('Category filter works accurately', () => {
  const expectedDocs = skillsData.skills.filter((s) => s.category === 'documents').length;
  const docResults = engine.search({ category: 'documents' });
  assert.strictEqual(docResults.length, expectedDocs);
  assert(docResults.every((s) => s.category === 'documents'));

  const designResults = engine.search({ category: 'design' });
  assert(designResults.length > 0);
  assert(designResults.every((s) => s.category === 'design'));
});

test('Difficulty filter works accurately', () => {
  const expectedBeg = skillsData.skills.filter((s) => s.difficulty === 'beginner').length;
  const begResults = engine.search({ difficulty: 'beginner' });
  assert.strictEqual(begResults.length, expectedBeg);
  assert(begResults.every((s) => s.difficulty === 'beginner'));

  const expectedInter = skillsData.skills.filter((s) => s.difficulty === 'intermediate').length;
  const interResults = engine.search({ difficulty: 'intermediate' });
  assert.strictEqual(interResults.length, expectedInter);
  assert(interResults.every((s) => s.difficulty === 'intermediate'));
});

test('Prompt template substitution has no leftover {{...}} and contains real source URL', () => {
  const template = skillsData.prompt_templates.link_prompt_en;
  for (const skill of skillsData.skills) {
    const substituted = template.replace(/\{\{source_url\}\}/g, skill.source.url);
    assert(!substituted.includes('{{'), `Leftover tag found in prompt for ${skill.id}`);
    assert(!substituted.includes('}}'), `Leftover tag found in prompt for ${skill.id}`);
    assert(substituted.includes(skill.source.url), `Real source URL missing in prompt for ${skill.id}`);
    assert(substituted.startsWith('Read this skill'), `Prompt template format corrupted for ${skill.id}`);
  }
});

test('No proprietary skill has stored files in repo or copy_file_allowed: true', () => {
  const proprietarySkills = skillsData.skills.filter((s) => s.license.status === 'proprietary_link_only');
  assert.strictEqual(proprietarySkills.length, 4); // pdf, docx, xlsx, pptx
  for (const skill of proprietarySkills) {
    assert.strictEqual(skill.license.copy_file_allowed, false);
    assert.strictEqual(skill.skill_file_path, undefined);
    assert(!fs.existsSync(path.join(ROOT_DIR, 'skills-files', skill.id)));
  }
});

console.log(`\nSearch & Acceptance Tests: ${passedCount}/${testCount} passed.`);
if (passedCount !== testCount) {
  process.exit(1);
}
