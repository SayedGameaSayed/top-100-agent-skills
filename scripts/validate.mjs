import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const VALID_DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
const VALID_LICENSE_STATUSES = new Set(['open', 'verify_before_publish', 'proprietary_link_only']);
const VALID_SKILL_KINDS = new Set(['skill', 'collection', 'directory']);
const VALID_TOOL_KINDS = new Set(['chat', 'cli', 'ide']);
const VALID_TOOL_SUPPORTS = new Set(['paste_only', 'native', 'reported_compatible', 'reported_native']);
const PERMISSIVE_LICENSES = ['mit', 'apache-2.0', 'apache 2.0', 'bsd', 'isc', 'unlicense'];

function isHttpsUrl(urlString) {
  if (typeof urlString !== 'string') return false;
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isKebabCase(str) {
  return typeof str === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
}

function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Resolves tool steps placeholders for a skill
 */
export function resolveToolSteps(steps, skill) {
  if (!Array.isArray(steps)) return [];
  const repoGitUrl = skill.source?.repo_url ? `${skill.source.repo_url}.git` : '';
  const pathInRepo =
    skill.kind === 'collection' || skill.kind === 'directory' || !skill.source?.path_in_repo
      ? '<مسار-فولدر-المهارة>'
      : skill.source.path_in_repo;

  return steps.map((step) => {
    return step
      .replace(/\{\{repo_git_url\}\}/g, repoGitUrl)
      .replace(/\{\{path_in_repo\}\}/g, pathInRepo);
  });
}

export function validateSkillsData(skillsData, rootDir = ROOT_DIR) {
  const errors = [];
  const warnings = [];

  if (!skillsData || typeof skillsData !== 'object') {
    return { errors: ['skills.json must be a valid JSON object'], warnings: [] };
  }

  // Schema version 1 or 2 supported
  if (skillsData.schema_version !== 1 && skillsData.schema_version !== 2) {
    errors.push(`Invalid or missing schema_version (expected 1 or 2, got ${skillsData.schema_version})`);
  }

  if (!skillsData.site || !isNonEmptyString(skillsData.site.name_ar) || !isNonEmptyString(skillsData.site.tagline_ar)) {
    errors.push('site object must have non-empty name_ar and tagline_ar');
  }

  if (skillsData.schema_version === 2) {
    if (!isNonEmptyString(skillsData.site.hero_title_ar)) {
      errors.push('site object must contain non-empty hero_title_ar in schema_version 2');
    }
    if (!isNonEmptyString(skillsData.site.hero_sub_ar)) {
      errors.push('site object must contain non-empty hero_sub_ar in schema_version 2');
    }
    if (!isNonEmptyString(skillsData.site.search_placeholder_ar)) {
      errors.push('site object must contain non-empty search_placeholder_ar in schema_version 2');
    }
  }

  if (
    !skillsData.prompt_templates ||
    !isNonEmptyString(skillsData.prompt_templates.link_prompt_en) ||
    !isNonEmptyString(skillsData.prompt_templates.file_prompt_en)
  ) {
    errors.push('prompt_templates must contain link_prompt_en and file_prompt_en');
  }

  if (!Array.isArray(skillsData.categories) || skillsData.categories.length === 0) {
    errors.push('categories must be a non-empty array');
  }

  const categoryIds = new Set();
  if (Array.isArray(skillsData.categories)) {
    for (const cat of skillsData.categories) {
      if (!cat.id || !isNonEmptyString(cat.id)) {
        errors.push('Category missing valid id');
      } else if (categoryIds.has(cat.id)) {
        errors.push(`Duplicate category id: ${cat.id}`);
      } else {
        categoryIds.add(cat.id);
      }
      if (!isNonEmptyString(cat.name_ar)) {
        errors.push(`Category ${cat.id || 'unknown'} missing Arabic name (name_ar)`);
      }
    }
  }

  if (!Array.isArray(skillsData.skills) || skillsData.skills.length === 0) {
    errors.push('skills must be a non-empty array');
    return { errors, warnings };
  }

  const skillIds = new Set();
  let noticeContent = null;
  const noticePath = path.join(rootDir, 'NOTICE.md');
  if (fs.existsSync(noticePath)) {
    noticeContent = fs.readFileSync(noticePath, 'utf8');
  }

  for (let i = 0; i < skillsData.skills.length; i++) {
    const s = skillsData.skills[i];
    const prefix = `Skill #${i + 1} (${s?.id || 'unnamed'})`;

    if (!s || typeof s !== 'object') {
      errors.push(`${prefix}: invalid skill entry`);
      continue;
    }

    // ID validation
    if (!isNonEmptyString(s.id) || !isKebabCase(s.id)) {
      errors.push(`${prefix}: 'id' must be a non-empty kebab-case string`);
    } else if (skillIds.has(s.id)) {
      errors.push(`${prefix}: duplicate skill id '${s.id}'`);
    } else {
      skillIds.add(s.id);
    }

    // Name
    if (!isNonEmptyString(s.name)) {
      errors.push(`${prefix}: missing or empty 'name'`);
    }

    // Category
    if (!s.category || !categoryIds.has(s.category)) {
      errors.push(`${prefix}: unknown category '${s.category}'`);
    }

    // Kind (schema_version 2)
    if (s.kind !== undefined) {
      if (!VALID_SKILL_KINDS.has(s.kind)) {
        errors.push(`${prefix}: invalid kind '${s.kind}' (expected skill, collection, or directory)`);
      }
    }

    // Source
    if (!s.source || typeof s.source !== 'object') {
      errors.push(`${prefix}: missing 'source' object`);
    } else {
      if (!isNonEmptyString(s.source.owner)) errors.push(`${prefix}: source.owner is required`);
      if (!isNonEmptyString(s.source.repo)) errors.push(`${prefix}: source.repo is required`);

      // schema_version 2: source.repo_url is required and must be https
      if (s.source.repo_url !== undefined) {
        if (!isHttpsUrl(s.source.repo_url)) {
          errors.push(`${prefix}: source.repo_url must be a valid https:// URL`);
        }
      } else if (skillsData.schema_version === 2) {
        errors.push(`${prefix}: source.repo_url is required in schema_version 2`);
      }

      // url validation
      if (!isHttpsUrl(s.source.url)) {
        errors.push(`${prefix}: source.url must be a valid https:// URL`);
      }

      // url_verified validation
      if (s.source.url_verified === true) {
        if (!isHttpsUrl(s.source.url)) {
          errors.push(`${prefix}: url_verified: true requires a valid https:// source.url`);
        }
      }
    }

    // License
    if (!s.license || typeof s.license !== 'object') {
      errors.push(`${prefix}: missing 'license' object`);
    } else {
      if (!isNonEmptyString(s.license.type)) {
        errors.push(`${prefix}: license.type is required`);
      }
      if (!VALID_LICENSE_STATUSES.has(s.license.status)) {
        errors.push(`${prefix}: invalid license.status '${s.license.status}'`);
      }
      if (typeof s.license.copy_file_allowed !== 'boolean') {
        errors.push(`${prefix}: license.copy_file_allowed must be a boolean`);
      }

      // Hard rule: copy_file_allowed: true on any entry that has no derived_from is forbidden in v1.1
      if (s.license.copy_file_allowed === true && !s.derived_from) {
        errors.push(`${prefix}: copy_file_allowed: true is only permitted for maintainer derived_from skills`);
      }

      // Hard rule: proprietary_link_only cannot have copy_file_allowed or skill_file_path
      if (s.license.status === 'proprietary_link_only') {
        if (s.license.copy_file_allowed === true) {
          errors.push(`${prefix}: proprietary_link_only skill cannot have copy_file_allowed: true`);
        }
        if (s.skill_file_path) {
          errors.push(`${prefix}: proprietary_link_only skill cannot have skill_file_path`);
        }
      }

      // Hard rule: copy_file_allowed requires skill_file_path and existing file
      if (s.license.copy_file_allowed === true) {
        if (!isNonEmptyString(s.skill_file_path)) {
          errors.push(`${prefix}: copy_file_allowed is true but skill_file_path is missing`);
        } else {
          const filePath = path.resolve(rootDir, s.skill_file_path);
          if (!fs.existsSync(filePath)) {
            errors.push(`${prefix}: skill_file_path '${s.skill_file_path}' does not exist on disk`);
          }
        }
      }
    }

    // Difficulty
    if (!VALID_DIFFICULTIES.has(s.difficulty)) {
      errors.push(`${prefix}: invalid difficulty '${s.difficulty}' (expected beginner, intermediate, or advanced)`);
    }

    // Content verification governance:
    // When content_verified is true, both reviewed_by and reviewed_on are strictly required
    if (s.content_verified === true) {
      if (!isNonEmptyString(s.reviewed_by)) {
        errors.push(`${prefix}: content_verified is true but reviewed_by is null or empty`);
      }
      if (!isNonEmptyString(s.reviewed_on)) {
        errors.push(`${prefix}: content_verified is true but reviewed_on is null or empty`);
      }
    } else {
      warnings.push(`${s.id}: content_verified is false (pending human verification)`);
    }

    // Arabic text fields
    if (!isNonEmptyString(s.title_ar)) errors.push(`${prefix}: title_ar is required and cannot be empty`);
    if (!isNonEmptyString(s.summary_ar)) errors.push(`${prefix}: summary_ar is required and cannot be empty`);

    const checkArrayOfArabicStrings = (arr, fieldName, minCount = 1) => {
      if (!Array.isArray(arr) || arr.length < minCount) {
        errors.push(`${prefix}: ${fieldName} must be an array with at least ${minCount} items`);
      } else {
        for (let j = 0; j < arr.length; j++) {
          if (!isNonEmptyString(arr[j])) {
            errors.push(`${prefix}: ${fieldName}[${j}] cannot be empty`);
          }
        }
      }
    };

    checkArrayOfArabicStrings(s.benefits_ar, 'benefits_ar', 2);
    checkArrayOfArabicStrings(s.use_cases_ar, 'use_cases_ar', 1);
    checkArrayOfArabicStrings(s.example_prompts_ar, 'example_prompts_ar', 1);

    // Derived skills validation
    if (s.derived_from) {
      const d = s.derived_from;
      if (typeof d !== 'object') {
        errors.push(`${prefix}: derived_from must be an object`);
      } else {
        if (!isNonEmptyString(d.owner) || !isNonEmptyString(d.repo) || !isHttpsUrl(d.url) || !isNonEmptyString(d.license_type)) {
          errors.push(`${prefix}: derived_from must contain valid owner, repo, https url, and license_type`);
        }

        // Must be permissive license
        const licLower = (d.license_type || '').toLowerCase();
        const isPermissive = PERMISSIVE_LICENSES.some((p) => licLower.includes(p));
        if (!isPermissive) {
          errors.push(`${prefix}: derived_from original license '${d.license_type}' is not permissive (must be Apache-2.0, MIT, etc.)`);
        }

        // Derived skill rules
        if (s.license?.status !== 'open') {
          errors.push(`${prefix}: derived skill must have license.status = 'open'`);
        }
        if (s.license?.copy_file_allowed !== true) {
          errors.push(`${prefix}: derived skill must have copy_file_allowed = true`);
        }
        if (!isNonEmptyString(s.skill_file_path)) {
          errors.push(`${prefix}: derived skill must have a stored skill_file_path`);
        }

        // Must have original LICENSE file at skills-files/<id>/LICENSE
        const origLicensePath = path.resolve(rootDir, `skills-files/${s.id}/LICENSE`);
        if (!fs.existsSync(origLicensePath)) {
          errors.push(`${prefix}: derived skill requires original LICENSE file at skills-files/${s.id}/LICENSE`);
        }

        // modification_notes_ar
        if (!Array.isArray(s.modification_notes_ar) || s.modification_notes_ar.length === 0) {
          errors.push(`${prefix}: derived skill must have non-empty modification_notes_ar`);
        } else {
          for (const note of s.modification_notes_ar) {
            if (!isNonEmptyString(note)) {
              errors.push(`${prefix}: modification_notes_ar item cannot be empty`);
            }
          }
        }

        // NOTICE.md check
        if (!noticeContent || !noticeContent.includes(d.repo)) {
          errors.push(`${prefix}: NOTICE.md must mention derived_from repository '${d.repo}'`);
        }
      }
    }
  }

  return { errors, warnings };
}

export function validateToolsData(toolsData, skillsData = null) {
  const errors = [];

  if (!Array.isArray(toolsData) || toolsData.length === 0) {
    return ['tools.json must be a non-empty array'];
  }

  const toolIds = new Set();

  for (let i = 0; i < toolsData.length; i++) {
    const t = toolsData[i];
    const prefix = `Tool #${i + 1} (${t?.id || 'unnamed'})`;

    if (!t || typeof t !== 'object') {
      errors.push(`${prefix}: invalid tool entry`);
      continue;
    }

    if (!isNonEmptyString(t.id) || !isKebabCase(t.id)) {
      errors.push(`${prefix}: 'id' must be a non-empty kebab-case string`);
    } else if (toolIds.has(t.id)) {
      errors.push(`${prefix}: duplicate tool id '${t.id}'`);
    } else {
      toolIds.add(t.id);
    }

    if (!isNonEmptyString(t.name)) errors.push(`${prefix}: 'name' is required`);
    if (!VALID_TOOL_KINDS.has(t.kind)) errors.push(`${prefix}: invalid kind '${t.kind}'`);
    if (!VALID_TOOL_SUPPORTS.has(t.support)) errors.push(`${prefix}: invalid support '${t.support}'`);
    if (typeof t.verified !== 'boolean') errors.push(`${prefix}: 'verified' must be a boolean`);
    if (!isNonEmptyString(t.note_ar)) errors.push(`${prefix}: 'note_ar' is required and cannot be empty`);

    // Section 11.3 / Section 4 rules for verified tools:
    if (t.verified === true) {
      if (t.id !== 'any-chat' && !isHttpsUrl(t.docs_url)) {
        errors.push(`${prefix}: verified: true requires a non-null https:// docs_url`);
      }

      // In schema 2: verified tools must have non-empty steps_ar
      if (t.steps_ar !== undefined) {
        if (!Array.isArray(t.steps_ar) || t.steps_ar.length === 0) {
          errors.push(`${prefix}: verified: true requires a non-empty steps_ar array`);
        } else {
          for (let stepIdx = 0; stepIdx < t.steps_ar.length; stepIdx++) {
            if (!isNonEmptyString(t.steps_ar[stepIdx])) {
              errors.push(`${prefix}: steps_ar[${stepIdx}] cannot be empty`);
            }
          }
        }
      }
    }
  }

  // Cross-validation: Test placeholder resolution on every skill
  if (skillsData && Array.isArray(skillsData.skills)) {
    const verifiedTools = toolsData.filter((t) => t.verified && Array.isArray(t.steps_ar));
    for (const skill of skillsData.skills) {
      for (const tool of verifiedTools) {
        const resolvedSteps = resolveToolSteps(tool.steps_ar, skill);
        for (let idx = 0; idx < resolvedSteps.length; idx++) {
          const step = resolvedSteps[idx];
          if (/\{\{[^}]+\}\}/.test(step)) {
            errors.push(
              `Tool ${tool.id} for skill ${skill.id}: unresolved placeholder in step #${idx + 1}: ${step}`
            );
          }
        }
      }
    }
  }

  return errors;
}

export function runValidation(rootDir = ROOT_DIR) {
  const skillsPath = path.join(rootDir, 'data/skills.json');
  const toolsPath = path.join(rootDir, 'data/tools.json');

  if (!fs.existsSync(skillsPath)) {
    console.error(`ERROR: ${skillsPath} not found.`);
    return false;
  }
  if (!fs.existsSync(toolsPath)) {
    console.error(`ERROR: ${toolsPath} not found.`);
    return false;
  }

  let skillsData;
  let toolsData;

  try {
    skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  } catch (err) {
    console.error(`ERROR parsing skills.json: ${err.message}`);
    return false;
  }

  try {
    toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  } catch (err) {
    console.error(`ERROR parsing tools.json: ${err.message}`);
    return false;
  }

  const { errors: skillsErrors, warnings: skillsWarnings } = validateSkillsData(skillsData, rootDir);
  const toolsErrors = validateToolsData(toolsData, skillsData);
  const allErrors = [...skillsErrors, ...toolsErrors];

  if (skillsWarnings.length > 0) {
    console.warn(`\n[WARNINGS] (${skillsWarnings.length} entries pending verification):`);
    for (const warn of skillsWarnings) {
      console.warn(`  - ${warn}`);
    }
    console.warn('');
  }

  if (allErrors.length > 0) {
    console.error(`Validation failed with ${allErrors.length} error(s):\n`);
    for (const err of allErrors) {
      console.error(`  - ${err}`);
    }
    return false;
  }

  console.log(`Validation passed successfully!`);
  console.log(`  - Verified ${skillsData.skills.length} skills in data/skills.json (schema_version ${skillsData.schema_version})`);
  console.log(`  - Verified ${toolsData.length} tools in data/tools.json`);
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const passed = runValidation();
  process.exit(passed ? 0 : 1);
}
