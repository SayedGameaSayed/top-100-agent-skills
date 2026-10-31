import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSkillsData, validateToolsData } from '../scripts/validate.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const validSkills = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/skills.json'), 'utf8'));
const validTools = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/tools.json'), 'utf8'));

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

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

console.log('Running Validator Broken-Fixture Tests (including v1.1 rules)...\n');

// Test 0: Baseline valid data passes with 0 errors
test('Baseline valid skills data passes with 0 errors', () => {
  const { errors } = validateSkillsData(validSkills, ROOT_DIR);
  assert.deepStrictEqual(errors, []);
});

test('Baseline valid tools data passes with 0 errors', () => {
  const errors = validateToolsData(validTools, validSkills);
  assert.deepStrictEqual(errors, []);
});

// Rule 1: Duplicate ID
test('Fails on duplicate skill id', () => {
  const data = clone(validSkills);
  const targetId = data.skills[0].id;
  data.skills.push({ ...clone(data.skills[0]), title_ar: 'نسخة أخرى' });
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes(`duplicate skill id '${targetId}'`)),
    `Expected duplicate id error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 2: Missing required field (name)
test('Fails on missing required field (name)', () => {
  const data = clone(validSkills);
  delete data.skills[0].name;
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(errors.some((e) => e.includes("missing or empty 'name'")), `Expected missing name error, got: ${JSON.stringify(errors)}`);
});

// Rule 3: Unknown category
test('Fails on unknown category', () => {
  const data = clone(validSkills);
  data.skills[0].category = 'non-existent-cat';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(errors.some((e) => e.includes("unknown category 'non-existent-cat'")), `Expected unknown category error, got: ${JSON.stringify(errors)}`);
});

// Rule 4: proprietary_link_only but copy_file_allowed is true
test('Fails when proprietary_link_only has copy_file_allowed: true', () => {
  const data = clone(validSkills);
  const proprietarySkill = data.skills.find((s) => s.license?.status === 'proprietary_link_only') || data.skills[0];
  proprietarySkill.license.status = 'proprietary_link_only';
  proprietarySkill.license.copy_file_allowed = true;
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('copy_file_allowed: true')),
    `Expected proprietary copy_file_allowed error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 5: proprietary_link_only but skill_file_path exists
test('Fails when proprietary_link_only has skill_file_path', () => {
  const data = clone(validSkills);
  const proprietarySkill = data.skills.find((s) => s.license?.status === 'proprietary_link_only') || data.skills[0];
  proprietarySkill.license.status = 'proprietary_link_only';
  proprietarySkill.skill_file_path = 'skills-files/pdf/SKILL.md';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('proprietary_link_only skill cannot have skill_file_path')),
    `Expected proprietary skill_file_path error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 6: copy_file_allowed is true on entry with no derived_from (v1.1 rule)
test('Fails when copy_file_allowed is true on non-derived skill', () => {
  const data = clone(validSkills);
  data.skills[5].license.copy_file_allowed = true; // skill-creator
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('copy_file_allowed: true is only permitted for maintainer derived_from skills')),
    `Expected derived_from copy_file_allowed error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 7: invalid kind (v1.1 rule)
test('Fails when kind is not in enum', () => {
  const data = clone(validSkills);
  data.skills[0].kind = 'invalid-kind';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes("invalid kind 'invalid-kind'")),
    `Expected invalid kind error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 8: source.repo_url missing or non-https (v1.1 rule)
test('Fails when source.repo_url is missing or non-https', () => {
  const data = clone(validSkills);
  data.skills[0].source.repo_url = 'http://insecure-repo.com';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('source.repo_url must be a valid https:// URL')),
    `Expected repo_url error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 9: Arabic text field is empty
test('Fails when title_ar is empty or whitespace', () => {
  const data = clone(validSkills);
  data.skills[0].title_ar = '   ';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(errors.some((e) => e.includes('title_ar is required')), `Expected empty title_ar error, got: ${JSON.stringify(errors)}`);
});

// Rule 10: source.url is not an https:// URL
test('Fails when source.url is not https://', () => {
  const data = clone(validSkills);
  data.skills[0].source.url = 'ftp://insecure-site.com/skill';
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('source.url must be a valid https:// URL')),
    `Expected non-https error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 11: derived_from present but original license not permissive
test('Fails when derived_from has non-permissive original license', () => {
  const data = clone(validSkills);
  data.skills[5].derived_from = {
    owner: 'SomeCorp',
    repo: 'somecorp/closed-skill',
    url: 'https://github.com/somecorp/closed-skill',
    license_type: 'Proprietary All Rights Reserved'
  };
  const { errors } = validateSkillsData(data, ROOT_DIR);
  assert(
    errors.some((e) => e.includes('original license') && e.includes('not permissive')),
    `Expected non-permissive license error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 12: tools.json verified: true without docs_url
test('Fails in tools.json when verified: true has null or non-https docs_url', () => {
  const data = clone(validTools);
  data[1].verified = true; // claude-code
  data[1].docs_url = null;
  const errors = validateToolsData(data);
  assert(
    errors.some((e) => e.includes('verified: true requires a non-null https:// docs_url')),
    `Expected verified docs_url error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 13: tools.json verified: true with empty steps_ar (v1.1 rule)
test('Fails in tools.json when verified: true has empty steps_ar', () => {
  const data = clone(validTools);
  data[1].steps_ar = [];
  const errors = validateToolsData(data);
  assert(
    errors.some((e) => e.includes('verified: true requires a non-empty steps_ar array')),
    `Expected empty steps_ar error, got: ${JSON.stringify(errors)}`
  );
});

// Rule 14: unresolved placeholder in tool steps (v1.1 rule)
test('Fails when an unresolved placeholder exists in tool steps', () => {
  const data = clone(validTools);
  data[1].steps_ar.push('Unresolved: {{unknown_variable_name}}');
  const errors = validateToolsData(data, validSkills);
  assert(
    errors.some((e) => e.includes('unresolved placeholder')),
    `Expected unresolved placeholder error, got: ${JSON.stringify(errors)}`
  );
});

console.log(`\nResults: ${passedCount}/${testCount} tests passed.`);
if (passedCount !== testCount) {
  process.exit(1);
}
