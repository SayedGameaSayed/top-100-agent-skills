import fs from 'node:fs';
import path from 'node:path';
import { checkRateLimit, runFreeSpecialistAdvisor } from '../lib/free-advisor-router.js';

let cachedCatalog = null;

function loadCatalog() {
  if (cachedCatalog) return cachedCatalog;
  const skillsPath = path.resolve(process.cwd(), 'data', 'skills.json');
  cachedCatalog = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  return cachedCatalog;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { message, lang = 'ar', specialty = 'auto' } = body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const catalog = loadCatalog();
    const result = await runFreeSpecialistAdvisor({
      message: message.trim(),
      lang: lang === 'en' ? 'en' : 'ar',
      preferredSpecialty: specialty,
      skills: catalog.skills || [],
      categories: catalog.categories || [],
      env: process.env
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(200).json({
      ok: false,
      reason: 'internal_fallback',
      error: err.message
    });
  }
}
