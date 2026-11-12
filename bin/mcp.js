#!/usr/bin/env node

/**
 * Top 100 AI Agent Skills - Model Context Protocol (MCP) Server
 *
 * Exposes curated skills discovery, search, leaderboard rankings, and task-to-skill
 * matching locally over stdio with zero external network calls or API keys required.
 */

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { SkillsSearchEngine } from '../site/js/search.js';
import { detectTaskSpecialty, selectCandidateSkills } from '../lib/free-advisor-router.js';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_PATH = path.join(PACKAGE_ROOT, 'data', 'skills.json');
const LEADERBOARD_PATH = path.join(PACKAGE_ROOT, 'data', 'leaderboard.json');
const PACKAGE_JSON_PATH = path.join(PACKAGE_ROOT, 'package.json');

function loadCatalogData() {
  const rawSkills = JSON.parse(fs.readFileSync(SKILLS_PATH, 'utf8'));
  let leaderboard = [];
  try {
    const rawLb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, 'utf8'));
    leaderboard = Array.isArray(rawLb.skills) ? rawLb.skills : [];
  } catch {
    leaderboard = [...(rawSkills.skills || [])].sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
  }
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return {
    version: pkg.version || '1.2.0',
    skillsData: rawSkills,
    skills: rawSkills.skills || [],
    categories: rawSkills.categories || [],
    promptTemplates: rawSkills.prompt_templates || {},
    leaderboard
  };
}

function formatSkillSummary(skill, categories = [], lang = 'en') {
  const cat = categories.find((c) => c.id === skill.category);
  const effectiveUrl = skill.source?.url_verified ? skill.source.url : skill.source?.repo_url;
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    category_label: lang === 'ar' ? (cat?.name_ar || skill.category) : (cat?.name_en || skill.category),
    difficulty: skill.difficulty,
    github_stars: skill.github_stars || 0,
    title: lang === 'ar' ? (skill.title_ar || skill.name) : (skill.title_en || skill.title_ar || skill.name),
    summary: lang === 'ar' ? skill.summary_ar : (skill.summary_en || skill.summary_ar),
    repo: skill.source?.repo,
    url: effectiveUrl,
    content_verified: Boolean(skill.content_verified)
  };
}

export function createSkillsMcpServer() {
  const catalog = loadCatalogData();
  const searchEngine = new SkillsSearchEngine(catalog.skills);

  const server = new McpServer({
    name: 'top-100-agent-skills',
    version: catalog.version
  });

  server.registerTool(
    'search_skills',
    {
      title: 'Search Top 100 Agent Skills',
      description:
        'Search the curated Top 100 open-source AI agent skills catalog by English or Arabic keywords, category, or difficulty.',
      inputSchema: {
        query: z.string().max(200).optional().describe('Search keyword in English or Arabic (e.g., "pdf", "testing", "fastapi", "وورد")'),
        category: z
          .string()
          .max(64)
          .optional()
          .describe('Optional category ID: documents, design, development, code-quality, cloud-security, data-ai, science-education, business-finance'),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('Optional difficulty filter'),
        limit: z.number().int().min(1).max(50).default(10).describe('Maximum results to return (1-50)'),
        lang: z.enum(['en', 'ar']).default('en').describe('Response language for titles and summaries')
      }
    },
    async ({ query = '', category = 'all', difficulty = 'all', limit = 10, lang = 'en' }) => {
      const results = searchEngine
        .search({ query, category, difficulty })
        .slice(0, limit)
        .map((s) => formatSkillSummary(s, catalog.categories, lang));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                total_matched: results.length,
                catalog_total: catalog.skills.length,
                skills: results
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  server.registerTool(
    'get_skill',
    {
      title: 'Get Agent Skill Details & Prompt',
      description:
        'Retrieve complete verified metadata, official upstream GitHub link, use cases, and ready-to-use prompt instructions for a specific skill ID.',
      inputSchema: {
        id: z.string().min(1).max(100).describe('Skill ID (e.g., "docx", "systematic-debugging", "mcp-builder")'),
        lang: z.enum(['en', 'ar']).default('en').describe('Language preference for descriptions')
      }
    },
    async ({ id, lang = 'en' }) => {
      const targetId = String(id).trim().toLowerCase();
      const skill = catalog.skills.find((s) => s.id.toLowerCase() === targetId || s.name.toLowerCase() === targetId);

      if (!skill) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Skill "${id}" not found. Call search_skills first to discover valid IDs.` }]
        };
      }

      const effectiveUrl = skill.source?.url_verified ? skill.source.url : skill.source?.repo_url;
      const readyPrompt =
        skill.content_verified && catalog.promptTemplates?.link_prompt_en && effectiveUrl
          ? catalog.promptTemplates.link_prompt_en.replace(/\{\{source_url\}\}/g, effectiveUrl)
          : null;

      const payload = {
        ...formatSkillSummary(skill, catalog.categories, lang),
        benefits: lang === 'ar' ? skill.benefits_ar : (skill.benefits_en || skill.benefits_ar),
        use_cases: lang === 'ar' ? skill.use_cases_ar : (skill.use_cases_en || skill.use_cases_ar),
        example_prompts: lang === 'ar' ? skill.example_prompts_ar : (skill.example_prompts_en || skill.example_prompts_ar),
        license: skill.license,
        source: skill.source,
        ready_prompt_en: readyPrompt
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }]
      };
    }
  );

  server.registerTool(
    'get_leaderboard',
    {
      title: 'Get Top 100 Skills Leaderboard',
      description: 'Return the ranked leaderboard of open-source AI agent skills ordered by upstream GitHub repository stars.',
      inputSchema: {
        limit: z.number().int().min(1).max(100).default(20).describe('Number of ranked entries to return (1-100)'),
        category: z.string().max(64).optional().describe('Optional category ID filter'),
        lang: z.enum(['en', 'ar']).default('en').describe('Language preference for descriptions')
      }
    },
    async ({ limit = 20, category, lang = 'en' }) => {
      let list = [...catalog.skills].sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
      if (category && category !== 'all') {
        list = list.filter((s) => s.category === category);
      }

      const ranked = list.slice(0, limit).map((s, idx) => ({
        rank: idx + 1,
        ...formatSkillSummary(s, catalog.categories, lang)
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ total: ranked.length, skills: ranked }, null, 2)
          }
        ]
      };
    }
  );

  server.registerTool(
    'recommend_skills_for_task',
    {
      title: 'Recommend Skills For Coding Task',
      description:
        'Analyze a coding task, bug description, architecture requirement, or tech stack locally (offline, zero API keys) and recommend the best matching verified skills.',
      inputSchema: {
        task: z.string().min(2).max(2000).describe('Description of what you are building, debugging, or automating'),
        specialty: z.enum(['auto', 'code', 'ai-project', 'general']).default('auto').describe('Optional domain focus'),
        limit: z.number().int().min(1).max(15).default(6).describe('Maximum recommended skills (1-15)'),
        lang: z.enum(['en', 'ar']).default('en').describe('Language preference')
      }
    },
    async ({ task, specialty = 'auto', limit = 6, lang = 'en' }) => {
      const detectedSpecialty = detectTaskSpecialty(task, specialty);
      const matches = selectCandidateSkills(catalog.skills, task, limit).map((s) =>
        formatSkillSummary(s, catalog.categories, lang)
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                detected_specialty: detectedSpecialty,
                recommended_skills: matches
              },
              null,
              2
            )
          }
        ]
      };
    }
  );

  return server;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectExecution) {
  const server = createSkillsMcpServer();
  const transport = new StdioServerTransport();
  server.connect(transport).catch((err) => {
    console.error('Fatal MCP server error:', err);
    process.exit(1);
  });
}
