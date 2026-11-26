import fs from 'node:fs';
import path from 'node:path';

let cachedCounts = null;

function getCounts() {
  if (cachedCounts) return cachedCounts;
  const skillsPath = path.resolve(process.cwd(), 'data', 'skills.json');
  const toolsPath = path.resolve(process.cwd(), 'data', 'tools.json');
  const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8')).skills || [];
  const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  cachedCounts = {
    skills_count: skills.length,
    tools_count: Array.isArray(tools) ? tools.length : (tools.tools || []).length
  };
  return cachedCounts;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const counts = getCounts();
    return res.status(200).json({
      status: 'ok',
      ...counts,
      configured_providers: {
        groq: Boolean(process.env.GROQ_API_KEY),
        gemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
        openrouter: Boolean(process.env.OPENROUTER_API_KEY)
      },
      timestamp: new Date().toISOString()
    });
  } catch {
    return res.status(500).json({ status: 'error' });
  }
}
