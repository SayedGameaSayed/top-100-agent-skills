/**
 * Free Multi-Specialist AI Router
 * Routes each developer or visitor query to the best free-tier model
 * for that exact task (Code, AI Architecture/Projects, or General Arabic Discovery),
 * using server-side environment keys only (never exposed to browser clients).
 */

export const SPECIALIST_PROFILES = {
  code: {
    id: 'code',
    icon: '💻',
    labelAr: 'متخصص الكود والتطوير',
    labelEn: 'Code & Engineering Specialist',
    candidates: [
      { provider: 'openrouter', model: 'cohere/north-mini-code:free', label: 'North Mini Code' },
      { provider: 'openrouter', model: 'nvidia/nemotron-3-ultra-550b-a55b:free', label: 'Nemotron 3 Ultra' },
      { provider: 'groq', model: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
      { provider: 'gemini', model: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { provider: 'openrouter', model: 'openrouter/free', label: 'OpenRouter Free Auto' }
    ]
  },
  'ai-project': {
    id: 'ai-project',
    icon: '🧠',
    labelAr: 'متخصص مشاريع AI والمعمارية',
    labelEn: 'AI Projects & Architecture Specialist',
    candidates: [
      { provider: 'openrouter', model: 'nvidia/nemotron-3-ultra-550b-a55b:free', label: 'Nemotron 3 Ultra' },
      { provider: 'openrouter', model: 'nvidia/nemotron-3.5-lightning:free', label: 'Nemotron 3.5 Lightning' },
      { provider: 'gemini', model: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { provider: 'groq', model: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
      { provider: 'openrouter', model: 'openrouter/free', label: 'OpenRouter Free Auto' }
    ]
  },
  general: {
    id: 'general',
    icon: '✨',
    labelAr: 'متخصص البحث العام والشرح العربي',
    labelEn: 'General Discovery Specialist',
    candidates: [
      { provider: 'openrouter', model: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B' },
      { provider: 'groq', model: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
      { provider: 'gemini', model: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { provider: 'openrouter', model: 'nvidia/nemotron-3.5-lightning:free', label: 'Nemotron 3.5 Lightning' },
      { provider: 'openrouter', model: 'openrouter/free', label: 'OpenRouter Free Auto' }
    ]
  }
};

// Lightweight per-IP sliding window limiter (25 requests / 10 minutes)
const rateBuckets = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

export function checkRateLimit(ip = 'unknown') {
  const now = Date.now();
  const key = String(ip || 'unknown').slice(0, 64);
  const recent = (rateBuckets.get(key) || []).filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateBuckets.set(key, recent);
    return { allowed: false, remaining: 0 };
  }
  recent.push(now);
  rateBuckets.set(key, recent);
  if (rateBuckets.size > 1000) {
    const oldestKey = rateBuckets.keys().next().value;
    if (oldestKey) rateBuckets.delete(oldestKey);
  }
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - recent.length };
}

/**
 * Classifies visitor input into: 'code' | 'ai-project' | 'general'
 */
export function detectTaskSpecialty(text = '', preferredSpecialty = 'auto') {
  if (preferredSpecialty && SPECIALIST_PROFILES[preferredSpecialty]) {
    return preferredSpecialty;
  }

  const raw = String(text || '');
  const lower = raw.toLowerCase();

  const codeSignals =
    /[{};()=>]{2,}|```|\b(function|const|let|var|import|export|class|def|async|await|return|sql|api|endpoint|bug|debug|error|exception|stack|traceback|test|tdd|jest|pytest|vitest|react|nextjs|next\.js|fastapi|django|spring|rust|golang|docker|kubernetes|git|commit|refactor|typescript|python|node\.?js|prisma|redis)\b|كود|برمج|خطأ|عطل|اختبار|دالة|خادم|قاعدة بيانات|واجهة برمجة|مراجعة الكود/i;

  const aiProjectSignals =
    /\b(ai|llm|rag|agent|agents|subagent|mcp|skill\.md|skills|prompt|prompts|embedding|vector|langchain|langgraph|crewai|autogen|openai|claude|gemini|readme|architecture|workflow|pipeline|eval|benchmark|model|fine-?tun)\b|ذكاء اصطناعي|وكيل|وكلاء|معمارية|توثيق|ملف تعريف|مشروع|خطة عمل|أتمتة|هندسة السياق|نماذج/i;

  const hasCode = codeSignals.test(raw) || codeSignals.test(lower);
  const hasAiProject = aiProjectSignals.test(raw) || aiProjectSignals.test(lower);

  // README or explicit AI architecture tasks go to ai-project specialist even if code tokens appear
  if (hasAiProject && (/readme|agent|rag|mcp|llm|langgraph|crewai|architecture|ذكاء اصطناعي|وكيل|معمارية|مشروع/i.test(raw) || !hasCode)) {
    return 'ai-project';
  }
  if (hasCode) {
    return 'code';
  }
  if (hasAiProject) {
    return 'ai-project';
  }
  return 'general';
}

function normalizeText(str = '') {
  return String(str)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه');
}

const DOMAIN_EXPANSIONS = [
  { re: /bug|debug|error|trace|crash|خطا|عطل|اصلاح/i, ids: ['systematic-debugging', 'mp-diagnosing-bugs', 'debugging-error-recovery'] },
  { re: /test|tdd|pytest|jest|playwright|اختبار/i, ids: ['test-driven-development', 'mp-tdd', 'webapp-testing', 'python-pytest-suite', 'react-testing-library', 'browser-testing-devtools'] },
  { re: /plan|spec|ticket|readme|architecture|معمار|توثيق|خطه|مواصفات/i, ids: ['obra-writing-plans', 'spec-driven-development', 'to-spec', 'planning-and-task-breakdown', 'improve-codebase-architecture', 'doc-coauthoring'] },
  { re: /agent|subagent|mcp|skill|llm|ai|eval|وكيل|ذكاء/i, ids: ['subagent-driven-development', 'dispatching-parallel-agents', 'mcp-builder', 'ms-mcp-builder', 'context-engineering', 'skill-creator', 'eval-harness', 'writing-for-agents'] },
  { re: /react|next|frontend|ui|css|design|واجه|تصميم/i, ids: ['frontend-design', 'frontend-ui-engineering', 'react-best-practices', 'composition-patterns', 'responsive-design', 'web-design-guidelines'] },
  { re: /python|fastapi|django|prisma|rust|redis|api|backend|خادم/i, ids: ['fastapi-patterns', 'prisma-patterns', 'rust-patterns', 'redis-patterns', 'django-security', 'api-and-interface-design'] },
  { re: /security|auth|owasp|review|امان|حمايه|مراجع/i, ids: ['security-review-checklist', 'code-review-quality', 'mp-code-review', 'requesting-code-review', 'django-security', 'springboot-security'] },
  { re: /deploy|vercel|cloud|azure|git|worktree|نشر|سحاب/i, ids: ['deploy-to-vercel', 'shipping-and-launch', 'using-git-worktrees', 'git-workflow-versioning', 'cloud-solution-architect'] },
  { re: /word|docx|excel|xlsx|pdf|powerpoint|pptx|مستند|جدول|عرض/i, ids: ['docx', 'xlsx', 'pdf', 'pptx'] },
  { re: /research|paper|academic|بحث|علمي|ورق/i, ids: ['deep-research', 'sr-screener', 'academic-paper-writer'] }
];

/**
 * Selects the top-N relevant catalog skills so the prompt stays compact, accurate, and fast.
 */
export function selectCandidateSkills(skills = [], message = '', limit = 28) {
  const normMsg = normalizeText(message);
  const words = normMsg.split(/\s+/).filter((w) => w.length > 2);
  const boostedIds = new Set();

  for (const rule of DOMAIN_EXPANSIONS) {
    if (rule.re.test(normMsg) || rule.re.test(message)) {
      for (const id of rule.ids) boostedIds.add(id);
    }
  }

  const scored = skills.map((s) => {
    let score = boostedIds.has(s.id) ? 30 : 0;
    const hay = normalizeText(`${s.id} ${s.name} ${s.title_ar} ${s.title_en} ${s.summary_ar} ${s.category}`);
    for (const w of words) {
      if (hay.includes(w)) score += 6;
    }
    if (s.featured) score += 2;
    if ((s.github_stars || 0) > 100000) score += 1;
    return { skill: s, score };
  });

  scored.sort((a, b) => b.score - a.score || (b.skill.github_stars || 0) - (a.skill.github_stars || 0));
  return scored.slice(0, limit).map((item) => item.skill);
}

function buildSystemInstruction(specialtyId, lang = 'ar') {
  const isEn = lang === 'en';
  const focusNoteEn =
    specialtyId === 'code'
      ? 'Focus deeply on code quality, debugging workflows, testing, security, frameworks, and developer tooling.'
      : specialtyId === 'ai-project'
        ? 'Focus deeply on AI agent orchestration, MCP servers, context engineering, architecture planning, RAG/LLM tools, and project structure.'
        : 'Give clear, practical, easy-to-follow guidance tailored to the user goal.';

  const focusNoteAr =
    specialtyId === 'code'
      ? 'ركّز بعمق على جودة الكود، تتبع الأخطاء (Debugging)، الاختبارات (Testing)، الأمان، وأدوات المطورين.'
      : specialtyId === 'ai-project'
        ? 'ركّز بعمق على هندسة مشاريع الذكاء الاصطناعي، تنسيق AI Agents، خوادم MCP، ملفات README، وتخطيط المعمارية.'
        : 'قدّم توصيات عملية وواضحة ومباشرة تلائم هدف المستخدم بأسلوب مبسط.';

  if (isEn) {
    return `You are a specialist AI Skills Advisor for "Top 100 Agent Skills".
${focusNoteEn}
Rules:
1. Pick the 2-4 best matching skills from the provided Top 100 list and ALWAYS write each skill ID in brackets like [docx] or [systematic-debugging].
2. If the user's project also needs tools beyond the catalog (e.g., LangGraph, MCP servers, Playwright, OpenTelemetry), suggest 1-2 trusted external options clearly.
3. For each recommendation explain briefly: Role, Where it fits in their task/project, and a short ready-to-use Prompt or command.
4. Be concise, well-structured with markdown bullets, and reply in English.`;
  }

  return `أنت مستشار متخصص ضمن فريق "دليل مهارات الذكاء الاصطناعي" (Top 100 Agent Skills).
${focusNoteAr}
القواعد:
1. رشّح أفضل 2 إلى 4 مهارات من القائمة المرفقة، واكتب معرّف كل مهارة من الدليل بين قوسين معقوفين تمامًا مثل [docx] أو [systematic-debugging] لتظهر بطاقتها التفاعلية للمستخدم.
2. إذا احتاج المشروع أدوات خارج الدليل (مثل MCP Servers أو أطر AI Agents مثل LangGraph/CrewAI أو أدوات اختبار متخصصة)، أضف خيارًا أو خيارين موثوقين بإيجاز.
3. لكل ترشيح اذكر باختصار: وظيفتها، وموضع الاستفادة منها في المهمة أو المشروع، وPrompt أو أمر استخدام جاهز.
4. اكتب بعربية تقنية واضحة وموجزة مع إبقاء المصطلحات البرمجية وأسماء الأدوات والأوامر بالإنجليزية.`;
}

async function callProviderCandidate(candidate, systemInstruction, userPrompt, env) {
  const { provider, model } = candidate;
  const timeoutSignal = AbortSignal.timeout(16000);

  if (provider === 'openrouter') {
    const apiKey = env.OPENROUTER_API_KEY;
    if (!apiKey) return null;
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: timeoutSignal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://top-100-agent-skills.vercel.app',
        'X-Title': 'Top 100 Agent Skills'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 900
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`OpenRouter ${model} HTTP ${res.status}: ${errText.slice(0, 120)}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  }

  if (provider === 'groq') {
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) return null;
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: timeoutSignal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 900
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Groq ${model} HTTP ${res.status}: ${errText.slice(0, 120)}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  }

  if (provider === 'gemini') {
    const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
    if (!apiKey) return null;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      signal: timeoutSignal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 900 }
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Gemini ${model} HTTP ${res.status}: ${errText.slice(0, 120)}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  }

  return null;
}

/**
 * Executes the free specialist advisor pipeline using configured server env keys.
 */
export async function runFreeSpecialistAdvisor({
  message,
  lang = 'ar',
  preferredSpecialty = 'auto',
  skills = [],
  categories = [],
  env = process.env
}) {
  const specialtyId = detectTaskSpecialty(message, preferredSpecialty);
  const profile = SPECIALIST_PROFILES[specialtyId] || SPECIALIST_PROFILES.general;

  const hasAnyServerKey = Boolean(
    env.OPENROUTER_API_KEY || env.GROQ_API_KEY || env.GEMINI_API_KEY || env.GOOGLE_API_KEY
  );

  if (!hasAnyServerKey) {
    return {
      ok: false,
      reason: 'no_server_keys',
      specialty: specialtyId,
      specialtyLabelAr: profile.labelAr,
      specialtyLabelEn: profile.labelEn,
      icon: profile.icon
    };
  }

  const candidateSkills = selectCandidateSkills(skills, message, 28);
  const catLookup = Object.fromEntries((categories || []).map((c) => [c.id, lang === 'en' ? c.name_en : c.name_ar]));
  const catalogContext = candidateSkills
    .map((s) => {
      const title = lang === 'en' ? (s.title_en || s.name) : (s.title_ar || s.name);
      const summary = lang === 'en' ? (s.summary_en || s.summary_ar) : s.summary_ar;
      return `- [${s.id}] (${catLookup[s.category] || s.category}) "${title}": ${(summary || '').slice(0, 110)}`;
    })
    .join('\n');

  const systemInstruction = buildSystemInstruction(specialtyId, lang);
  const userPrompt = `Shortlisted Top 100 Skills:\n${catalogContext}\n\nUser Request:\n"""\n${String(message).slice(0, 9000)}\n"""`;

  const errors = [];
  for (const candidate of profile.candidates) {
    try {
      const reply = await callProviderCandidate(candidate, systemInstruction, userPrompt, env);
      if (reply) {
        return {
          ok: true,
          reply,
          specialty: specialtyId,
          specialtyLabelAr: profile.labelAr,
          specialtyLabelEn: profile.labelEn,
          icon: profile.icon,
          model: candidate.model,
          modelLabel: candidate.label,
          provider: candidate.provider,
          engine: 'free-specialist-router'
        };
      }
    } catch (err) {
      errors.push(err.message);
    }
  }

  return {
    ok: false,
    reason: 'providers_exhausted',
    specialty: specialtyId,
    specialtyLabelAr: profile.labelAr,
    specialtyLabelEn: profile.labelEn,
    icon: profile.icon,
    errors
  };
}
