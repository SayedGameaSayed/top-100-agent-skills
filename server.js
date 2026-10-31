import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SkillsSearchEngine, normalizeArabic } from './site/js/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname);

const app = express();
const PORT = process.env.PORT || 3000;

// Load initial data
const skillsPath = path.join(ROOT_DIR, 'data/skills.json');
const toolsPath = path.join(ROOT_DIR, 'data/tools.json');

let skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
let toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
let searchEngine = new SkillsSearchEngine(skillsData.skills);

// Middleware
app.use(express.json());

// Enable CORS for external API consumers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ==========================================
// REST API Endpoints
// ==========================================

// Get all skills with optional query filters & sorting
app.get('/api/skills', (req, res) => {
  const { query, category, difficulty, featured, sort } = req.query;

  let results = skillsData.skills;

  if (query || category || difficulty) {
    results = searchEngine.search({
      query: query || '',
      category: category || 'all',
      difficulty: difficulty || 'all'
    });
  }

  if (featured === 'true') {
    results = results.filter((s) => s.featured === true);
  }

  // Sorting
  const sortMode = sort || 'stars';
  results = [...results];
  if (sortMode === 'stars') {
    results.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
  } else if (sortMode === 'featured') {
    results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.github_stars || 0) - (a.github_stars || 0));
  } else if (sortMode === 'name') {
    results.sort((a, b) => (a.title_ar || '').localeCompare(b.title_ar || '', 'ar'));
  }

  res.json({
    total: results.length,
    site: skillsData.site,
    categories: skillsData.categories,
    skills: results
  });
});

// Get a single skill by ID
app.get('/api/skills/:id', (req, res) => {
  const skill = skillsData.skills.find((s) => s.id === req.params.id);
  if (!skill) {
    return res.status(404).json({ error: 'Skill not found', id: req.params.id });
  }

  // Include ready-made prompt in API response
  const linkPromptTemplate = skillsData.prompt_templates?.link_prompt_en || '';
  const effectiveUrl = skill.source?.url_verified ? skill.source.url : skill.source.repo_url;
  const readyPrompt = linkPromptTemplate.replace(/\{\{source_url\}\}/g, effectiveUrl);

  res.json({
    ...skill,
    effective_url: effectiveUrl,
    ready_prompt_en: readyPrompt
  });
});

// Get verified tools
app.get('/api/tools', (req, res) => {
  const { verified_only } = req.query;
  let tools = toolsData;
  if (verified_only === 'true') {
    tools = tools.filter((t) => t.verified === true);
  }
  res.json({
    total: tools.length,
    tools
  });
});

// Leaderboard API endpoint (Top 100 ranked skills)
app.get('/api/leaderboard', (req, res) => {
  const sorted = [...skillsData.skills].sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
  const ranked = sorted.map((skill, idx) => ({
    rank: idx + 1,
    ...skill
  }));
  res.json({
    total: ranked.length,
    updated_at: new Date().toISOString(),
    skills: ranked
  });
});

// Search API with Arabic normalization
app.get('/api/search', (req, res) => {
  const q = req.query.q || '';
  const category = req.query.category || 'all';
  const difficulty = req.query.difficulty || 'all';

  const results = searchEngine.search({
    query: q,
    category,
    difficulty
  });

  res.json({
    query: q,
    normalized_query: normalizeArabic(q),
    total: results.length,
    results
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.2.0',
    skills_count: skillsData.skills.length,
    tools_count: toolsData.length,
    uptime_seconds: process.uptime()
  });
});

// ==========================================
// Static Assets & Routing
// ==========================================

// Favicon handler
app.get('/favicon.ico', (req, res) => {
  res.type('image/svg+xml').send(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12,3 22,21 2,21" fill="#8052ff"/></svg>'
  );
});

// Serve site directory at root, /site, and nested prefixes for complete robustness
app.use(express.static(path.join(ROOT_DIR, 'site')));
app.use('/site', express.static(path.join(ROOT_DIR, 'site')));
app.use('/css', express.static(path.join(ROOT_DIR, 'site/css')));
app.use('/js', express.static(path.join(ROOT_DIR, 'site/js')));
app.use('/site/css', express.static(path.join(ROOT_DIR, 'site/css')));
app.use('/site/js', express.static(path.join(ROOT_DIR, 'site/js')));
app.use('/skill/css', express.static(path.join(ROOT_DIR, 'site/css')));
app.use('/skill/js', express.static(path.join(ROOT_DIR, 'site/js')));
app.use('/data', express.static(path.join(ROOT_DIR, 'data')));
app.use('/screenshots', express.static(path.join(ROOT_DIR, 'screenshots')));

// Clean HTML routes & Aliases
app.get(['/', '/index.html', '/site', '/site/', '/site/index.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'site/index.html'));
});

app.get(['/leaderboard', '/leaderboard.html', '/site/leaderboard', '/site/leaderboard.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'site/leaderboard.html'));
});

app.get(['/how-to-use', '/how-to-use.html', '/site/how-to-use', '/site/how-to-use.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'site/how-to-use.html'));
});

app.get(['/skill.html', '/site/skill.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'site/skill.html'));
});

app.get('/skill/:id', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'site/skill.html'));
});

// Fallback: 404 handler for unknown paths
app.use((req, res) => {
  // Never return HTML for failed asset requests (css, js, json, media)
  const isAsset = /\.(css|js|json|png|jpg|jpeg|gif|svg|woff2?|ttf|map)$/i.test(req.path);
  if (isAsset) {
    return res.status(404).type('text/plain').send('404 File Not Found');
  }

  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(ROOT_DIR, 'site/index.html'));
  } else {
    res.status(404).json({ error: 'Endpoint not found', path: req.path });
  }
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🌌 دليل مهارات الذكاء الاصطناعي - Full Stack Server`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`🔗 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
