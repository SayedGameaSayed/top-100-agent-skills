import fs from 'node:fs';
import path from 'node:path';
import { checkRateLimit, runFreeSpecialistAdvisor } from '../lib/free-advisor-router.js';

const ALLOWED_ORIGINS = new Set([
  'https://top-100-agent-skills.vercel.app',
  'https://sayedgameasayed.github.io'
]);

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  if (/^https:\/\/top-100-agent-skills[a-z0-9-]*\.vercel\.app$/.test(origin)) return true;
  return false;
}

let cachedCatalog = null;

function loadCatalog() {
  if (cachedCatalog) return cachedCatalog;
  const skillsPath = path.resolve(process.cwd(), 'data', 'skills.json');
  cachedCatalog = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  return cachedCatalog;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = (Array.isArray(forwarded) ? forwarded[0] : String(forwarded || '')).split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';

  const limitCheck = checkRateLimit(clientIp);
  if (!limitCheck.allowed) {
    return res.status(429).json({
      ok: false,
      reason: 'rate_limited',
      error: 'Too many requests in a short period. Falling back to instant local search.'
    });
  }

  let body;
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  } else if (req.body && typeof req.body === 'object') {
    body = req.body;
  } else {
    body = {};
  }

  const { message, files = [], lang = 'ar', specialty = 'auto' } = body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message exceeds 1000 character limit' });
  }

  try {
    const catalog = loadCatalog();
    const result = await runFreeSpecialistAdvisor({
      message: message.trim(),
      files: Array.isArray(files) ? files : [],
      lang: lang === 'en' ? 'en' : 'ar',
      preferredSpecialty: specialty,
      skills: catalog.skills || [],
      categories: catalog.categories || [],
      env: process.env
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('[advisor serverless error]:', err?.message || err);
    return res.status(200).json({
      ok: false,
      reason: 'internal_fallback',
      error: 'Advisor service temporarily unavailable. Falling back to local search.'
    });
  }
}
