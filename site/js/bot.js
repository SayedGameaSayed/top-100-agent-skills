/**
 * bot.js - Keyless Multi-Specialist AI Skills Advisor
 * Zero API keys required for visitors: routes each query to the best free specialist
 * model (Code, AI Architecture/Projects, or General Arabic Discovery) via /api/advisor,
 * with a rich bilingual specialist local engine fallback and optional personal key override.
 */

import { normalizeArabic } from './search.js';
import { getLang, formatUrlWithLang } from './i18n.js';

let skillsCatalog = [];
let categoriesCatalog = [];
let selectedSpecialty = 'auto';

// Temporarily paused so the UI stays minimal; flip to true to re-enable settings/optional key drawer
const ENABLE_BOT_SETTINGS_DRAWER = false;

const LOCAL_FILES_STORAGE_KEY = 'ai_advisor_local_files_v1';
const MAX_LOCAL_FILES = 3;
const MAX_CHARS_PER_FILE = 2200;
const MAX_TOTAL_FILE_CHARS = 6000;
const MAX_RAW_FILE_BYTES = 50 * 1024;
const IGNORED_GENERATED_FILES = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'bun.lockb',
  'poetry.lock',
  'cargo.lock',
  'composer.lock'
]);
const ALLOWED_EXACT_FILES = new Set([
  'readme',
  'readme.md',
  'readme.txt',
  'package.json',
  'requirements.txt',
  'pyproject.toml',
  'dockerfile',
  'makefile',
  'skill.md',
  '.gitignore',
  'tsconfig.json'
]);
const ALLOWED_CODE_EXTENSIONS = [
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.py', '.md', '.txt', '.json', '.yml', '.yaml',
  '.toml', '.html', '.css', '.scss', '.sql', '.sh',
  '.go', '.rs', '.java', '.kt', '.cs', '.php', '.rb',
  '.vue', '.svelte'
];
const BLOCKED_SECRET_FILE_RE = /(^\.env($|\.)|\.(pem|key|p12|pfx|crt)$|secrets?\.|\.(min\.(js|css)|map)$)/i;
const FILE_INPUT_ACCEPT = ALLOWED_CODE_EXTENSIONS.join(',');
let isAdvisorSending = false;

function getStoredLocalFiles() {
  try {
    const raw = localStorage.getItem(LOCAL_FILES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_LOCAL_FILES) : [];
  } catch {
    return [];
  }
}

function saveStoredLocalFiles(files = []) {
  try {
    if (!files.length) {
      localStorage.removeItem(LOCAL_FILES_STORAGE_KEY);
      return true;
    }
    localStorage.setItem(LOCAL_FILES_STORAGE_KEY, JSON.stringify(files.slice(0, MAX_LOCAL_FILES)));
    return true;
  } catch {
    return false;
  }
}

function clearStoredLocalFiles() {
  try {
    localStorage.removeItem(LOCAL_FILES_STORAGE_KEY);
  } catch {}
}

function isAllowedProjectFilename(name = '') {
  const lower = String(name).trim().toLowerCase();
  if (!lower || IGNORED_GENERATED_FILES.has(lower) || BLOCKED_SECRET_FILE_RE.test(lower)) return false;
  if (ALLOWED_EXACT_FILES.has(lower)) return true;
  return ALLOWED_CODE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function getTotalStoredChars(files = []) {
  return files.reduce((sum, f) => sum + (f.content ? f.content.length : 0), 0);
}

function formatBytesShort(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const SPECIALISTS = {
  auto: {
    id: 'auto',
    icon: '✨',
    pillAr: 'تلقائي',
    pillEn: 'Auto',
    labelAr: 'توجيه ذكي حسب التخصص',
    labelEn: 'Smart Auto-Router'
  },
  code: {
    id: 'code',
    icon: '💻',
    pillAr: 'الكود',
    pillEn: 'Code',
    labelAr: 'متخصص الكود والتطوير',
    labelEn: 'Code Specialist',
    defaultModelLabel: 'North Mini Code / Nemotron 3 Ultra'
  },
  'ai-project': {
    id: 'ai-project',
    icon: '🧠',
    pillAr: 'مشاريع AI',
    pillEn: 'AI Projects',
    labelAr: 'متخصص مشاريع AI والمعمارية',
    labelEn: 'AI & Architecture Specialist',
    defaultModelLabel: 'Nemotron 3 Ultra / Gemini 2.5 Flash'
  },
  general: {
    id: 'general',
    icon: '🔎',
    pillAr: 'بحث عام',
    pillEn: 'General',
    labelAr: 'متخصص البحث العام',
    labelEn: 'General Discovery',
    defaultModelLabel: 'Gemma 4 31B / Llama 3.3 70B'
  }
};

const PROVIDERS = {
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter (Free Specialist Router)',
    nameEn: 'OpenRouter (Free Specialist Router)',
    badgeAr: 'نماذج مجانية متعددة 🆓',
    badgeEn: 'Free Specialists 🆓',
    model: 'openrouter/free',
    placeholder: 'sk-or-v1-...',
    guideUrl: 'https://openrouter.ai/keys',
    guideName: 'OpenRouter Keys',
    stepAr: 'افتح openrouter.ai/keys وأنشئ API Key مجانيًا لتشغيل نماذج :free المتخصصة',
    stepEn: 'Open openrouter.ai/keys to create a free key for specialist :free models',
    prefixPattern: /^sk-or/
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    badgeAr: 'Gemini 2.5 Flash 🌟',
    badgeEn: 'Gemini 2.5 Flash 🌟',
    model: 'gemini-2.5-flash',
    placeholder: 'AIzaSy...',
    guideUrl: 'https://aistudio.google.com/app/apikey',
    guideName: 'Google AI Studio',
    stepAr: 'افتح Google AI Studio واختر Create API Key (مجاني دون بطاقة دفع)',
    stepEn: 'Open Google AI Studio and click Create API Key (100% Free)',
    prefixPattern: /^AIzaSy/
  },
  groq: {
    id: 'groq',
    name: 'Groq (Llama 3.3 70B)',
    nameEn: 'Groq (Llama 3.3 70B)',
    badgeAr: 'سرعة فائقة ومجاني ⚡',
    badgeEn: 'Ultra Fast & Free ⚡',
    model: 'llama-3.3-70b-versatile',
    placeholder: 'gsk_...',
    guideUrl: 'https://console.groq.com/keys',
    guideName: 'Groq Console',
    stepAr: 'افتح console.groq.com لإنشاء مفتاح مجاني فائق السرعة',
    stepEn: 'Open console.groq.com to get a free ultra-fast Llama 3.3 key',
    prefixPattern: /^gsk_/
  },
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    badgeAr: 'Claude 🟣',
    badgeEn: 'Claude 🟣',
    model: 'claude-3-5-sonnet-20241022',
    placeholder: 'sk-ant-api03-...',
    guideUrl: 'https://console.anthropic.com/settings/keys',
    guideName: 'Anthropic Console',
    stepAr: 'افتح console.anthropic.com وانسخ API Key (يبدأ بـ sk-ant…)',
    stepEn: 'Open console.anthropic.com and copy your key (starts with sk-ant...)',
    prefixPattern: /^sk-ant/
  },
  openai: {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    badgeAr: 'GPT-4o mini 🟢',
    badgeEn: 'GPT-4o mini 🟢',
    model: 'gpt-4o-mini',
    placeholder: 'sk-proj-... / sk-...',
    guideUrl: 'https://platform.openai.com/api-keys',
    guideName: 'OpenAI Platform',
    stepAr: 'افتح platform.openai.com وأنشئ API Key (يبدأ بـ sk-…)',
    stepEn: 'Open platform.openai.com and create a key (starts with sk-...)',
    prefixPattern: /^sk-(proj-)?[A-Za-z0-9_-]{20,}/
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    badgeAr: 'DeepSeek V3 🐋',
    badgeEn: 'DeepSeek V3 🐋',
    model: 'deepseek-chat',
    placeholder: 'sk-...',
    guideUrl: 'https://platform.deepseek.com/api_keys',
    guideName: 'DeepSeek Platform',
    stepAr: 'افتح platform.deepseek.com وانسخ API Key',
    stepEn: 'Open platform.deepseek.com and copy your API key',
    prefixPattern: /^sk-[a-f0-9]{32}/
  }
};

const STORAGE_KEY = 'ai_bot_api_key';
const STORAGE_PROVIDER = 'ai_bot_provider';

function getStoredConfig() {
  try {
    const key = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('gemini_api_key') || '';
    let provider = localStorage.getItem(STORAGE_PROVIDER) || '';
    if (!provider && key) {
      provider = detectProviderFromKey(key) || 'openrouter';
    }
    return {
      key: key.trim(),
      provider: provider || 'openrouter'
    };
  } catch {
    return { key: '', provider: 'openrouter' };
  }
}

function setStoredConfig(provider, key) {
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key.trim());
      localStorage.setItem(STORAGE_PROVIDER, provider || 'openrouter');
      if (provider === 'gemini') {
        localStorage.setItem('gemini_api_key', key.trim());
      }
    } else {
      removeStoredConfig();
    }
  } catch (err) {
    console.error('Failed to save config in localStorage:', err);
  }
}

function removeStoredConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem(STORAGE_PROVIDER);
  } catch {}
}

function detectProviderFromKey(key) {
  const k = key.trim();
  if (!k) return null;
  if (/^AIzaSy/.test(k)) return 'gemini';
  if (/^sk-ant/.test(k)) return 'claude';
  if (/^sk-or/.test(k)) return 'openrouter';
  if (/^gsk_/.test(k)) return 'groq';
  if (/^sk-proj/.test(k)) return 'openai';
  if (/^sk-[a-f0-9]{32}$/.test(k)) return 'deepseek';
  if (/^sk-/.test(k)) return 'openai';
  return null;
}

function detectSpecialtyClient(text = '', preferred = 'auto') {
  if (preferred && preferred !== 'auto' && SPECIALISTS[preferred]) {
    return preferred;
  }
  const raw = String(text || '');
  const codeSignals =
    /[{};()=>]{2,}|```|\b(function|const|let|var|import|export|class|def|async|await|return|sql|api|endpoint|bug|debug|error|exception|stack|traceback|test|tdd|jest|pytest|vitest|react|nextjs|next\.js|fastapi|django|spring|rust|golang|docker|kubernetes|git|commit|refactor|typescript|python|node\.?js|prisma|redis)\b|كود|برمج|خطأ|عطل|اختبار|دالة|خادم|قاعدة بيانات|واجهة برمجة|مراجعة الكود/i;
  const aiSignals =
    /\b(ai|llm|rag|agent|agents|subagent|mcp|skill\.md|skills|prompt|prompts|embedding|vector|langchain|langgraph|crewai|autogen|openai|claude|gemini|readme|architecture|workflow|pipeline|eval|benchmark|model|fine-?tun)\b|ذكاء اصطناعي|وكيل|وكلاء|معمارية|توثيق|ملف تعريف|مشروع|خطة عمل|أتمتة|هندسة السياق|نماذج/i;

  const hasCode = codeSignals.test(raw);
  const hasAi = aiSignals.test(raw);

  if (hasAi && (/readme|agent|rag|mcp|llm|langgraph|crewai|architecture|ذكاء اصطناعي|وكيل|معمارية|مشروع/i.test(raw) || !hasCode)) {
    return 'ai-project';
  }
  if (hasCode) return 'code';
  if (hasAi) return 'ai-project';
  return 'general';
}

export function initAiBot(skills = [], categories = []) {
  if (Array.isArray(skills) && skills.length > 0) {
    skillsCatalog = skills;
  }
  if (Array.isArray(categories) && categories.length > 0) {
    categoriesCatalog = categories;
  }

  const mount = document.getElementById('ai-advisor-mount');
  if (!mount || document.getElementById('ai-advisor-shell')) return;

  const isEn = getLang() === 'en';
  const config = getStoredConfig();
  const hasKey = Boolean(config.key);
  const activeProvider = PROVIDERS[config.provider] || PROVIDERS.openrouter;

  mount.innerHTML = `
    <div class="advisor-intro-header">
      <div>
        <span class="advisor-kicker">✨ ${isEn ? 'Interactive Feature' : 'ميزة ذكية مدمجة'}</span>
        <h2 class="advisor-heading">${isEn ? 'AI Skills Advisor' : 'مستشار المهارات الذكي'}</h2>
        <p class="advisor-subheading">${
          isEn
            ? 'Describe what you are building, paste code, or drop a README to get matched with the right verified skills automatically.'
            : 'صف ما تبنيه، أو ألصق مقطع كود أو ملف <bdi dir="ltr">README</bdi> ليتم توجيه طلبك تلقائيًا وترشيح أنسب المهارات لمشروعك.'
        }</p>
      </div>
    </div>

    <div id="ai-advisor-shell" class="advisor-shell">
      <!-- Top Workspace Bar -->
      <div class="advisor-topbar">
        <div class="advisor-status-pill">
          <span class="bot-live-dot ${hasKey ? 'bot-live-gemini' : ''}"></span>
          <span id="bot-engine-label">${
            hasKey
              ? `${isEn ? (activeProvider.nameEn || activeProvider.name) : activeProvider.name} (${isEn ? 'Personal Key' : 'مفتاح شخصي'})`
              : (isEn ? 'Free Auto-Router • Specialty Detection' : 'يعمل مجانًا • توجيه حسب التخصص')
          }</span>
        </div>
        ${ENABLE_BOT_SETTINGS_DRAWER ? `<div class="bot-header-actions"><button id="bot-api-btn" class="bot-icon-btn bot-settings-toggle-btn ${hasKey ? 'has-key' : ''}" title="${isEn ? 'Specialist Mode & Optional Key' : 'التخصصات وإعدادات متقدمة'}" aria-label="${isEn ? 'Settings' : 'الإعدادات'}" type="button">⚙️</button></div>` : ''}
      </div>

      <!-- Compact Specialist Mode Strip -->
      <div class="bot-specialty-bar advisor-specialty-bar" id="bot-specialty-bar" role="tablist" aria-label="${isEn ? 'AI Specialist Mode' : 'تخصص المستشار'}">
        ${Object.values(SPECIALISTS)
          .map(
            (sp) => `
          <button type="button" class="bot-specialty-pill ${sp.id === selectedSpecialty ? 'active' : ''}" data-specialty="${sp.id}" title="${isEn ? sp.labelEn : sp.labelAr}">
            <span>${sp.icon}</span>
            <span>${isEn ? sp.pillEn : sp.pillAr}</span>
          </button>`
          )
          .join('')}
      </div>

      ${ENABLE_BOT_SETTINGS_DRAWER ? `<!-- Clean Optional Settings Drawer -->
      <div id="bot-settings-drawer" class="bot-settings-drawer" style="display: none;">
        <div class="bot-settings-header">
          <span class="bot-settings-title">⚡ ${isEn ? 'Free Specialist Models' : 'النماذج المجانية حسب التخصص'}</span>
          <span class="bot-settings-badge">${isEn ? 'No Key Needed' : 'دون مفتاح'}</span>
        </div>

        <div class="bot-specialists-card">
          <div class="bot-specialist-item">
            <span class="bot-sp-name">💻 ${isEn ? 'Code & Debugging' : 'الكود والتطوير'}</span>
            <span class="bot-sp-model" dir="ltr">North Mini Code • Nemotron 3 Ultra</span>
          </div>
          <div class="bot-specialist-item">
            <span class="bot-sp-name">🧠 ${isEn ? 'AI Projects & README' : 'مشاريع <bdi dir="ltr">AI</bdi> والمعمارية'}</span>
            <span class="bot-sp-model" dir="ltr">Nemotron 3 Ultra • Gemini 2.5 Flash</span>
          </div>
          <div class="bot-specialist-item">
            <span class="bot-sp-name">🔎 ${isEn ? 'General Discovery' : 'البحث العام والشرح العربي'}</span>
            <span class="bot-sp-model" dir="ltr">Gemma 4 31B • Llama 3.3 70B</span>
          </div>
        </div>

        <details class="bot-optional-key-details" ${hasKey ? 'open' : ''}>
          <summary class="bot-optional-key-summary">
            🔑 ${isEn ? 'Use personal API key (Optional)' : 'استخدام مفتاح API شخصي (اختياري للمطورين)'}
          </summary>

          <div class="bot-optional-key-body">
            <div class="bot-provider-select-row">
              <div class="bot-provider-label">
                <span>${isEn ? 'Provider:' : 'المزوّد:'}</span>
                <span class="bot-settings-badge" id="bot-settings-badge">${isEn ? activeProvider.badgeEn : activeProvider.badgeAr}</span>
              </div>
              <select id="bot-provider-select" class="bot-provider-select">
                <option value="openrouter" ${config.provider === 'openrouter' ? 'selected' : ''}>🆓 OpenRouter (${isEn ? 'Free Models' : 'نماذج مجانية متخصصة'})</option>
                <option value="gemini" ${config.provider === 'gemini' ? 'selected' : ''}>🌟 Google Gemini (Gemini 2.5 Flash)</option>
                <option value="groq" ${config.provider === 'groq' ? 'selected' : ''}>⚡ Groq (Llama 3.3 70B)</option>
                <option value="claude" ${config.provider === 'claude' ? 'selected' : ''}>🟣 Anthropic Claude</option>
                <option value="openai" ${config.provider === 'openai' ? 'selected' : ''}>🟢 OpenAI (GPT-4o mini)</option>
                <option value="deepseek" ${config.provider === 'deepseek' ? 'selected' : ''}>🐋 DeepSeek</option>
              </select>
            </div>

            <div class="bot-api-steps-box" id="bot-dynamic-steps-box">
              <div class="bot-api-step">
                <span class="bot-step-num">1</span>
                <span id="bot-step-guide-text">${isEn ? activeProvider.stepEn : activeProvider.stepAr}</span>
              </div>
              <a href="${activeProvider.guideUrl}" target="_blank" rel="noopener noreferrer" class="bot-api-studio-link" id="bot-provider-link" dir="ltr">
                🔗 ${activeProvider.guideName} ↗
              </a>
            </div>

            <div class="bot-api-input-wrap" dir="ltr">
              <input
                type="password"
                id="bot-api-key-input"
                dir="ltr"
                placeholder="${activeProvider.placeholder}"
                value="${escapeAttr(config.key)}"
                autocomplete="off"
                aria-label="API Key"
              >
              <button type="button" id="bot-toggle-key-visibility" class="bot-key-vis-btn" title="${isEn ? 'Show/Hide' : 'إظهار / إخفاء'}">👁️</button>
            </div>

            <div id="bot-settings-status" class="bot-settings-status" style="display: none;"></div>

            <div class="bot-api-actions-row">
              <button type="button" id="bot-save-key-btn" class="bot-save-btn">${isEn ? 'Save Key' : 'حفظ المفتاح'}</button>
              <button type="button" id="bot-clear-key-btn" class="bot-clear-btn" style="${hasKey ? '' : 'display: none;'}">${isEn ? 'Use Default Free Mode' : 'العودة للوضع المجاني'}</button>
              <button type="button" id="bot-cancel-settings-btn" class="bot-cancel-btn">${isEn ? 'Done' : 'تم'}</button>
            </div>

            <p class="bot-privacy-note">
              🛡️ ${isEn ? 'Optional keys stay strictly in your browser localStorage.' : 'إذا أدخلت مفتاحًا شخصيًا، يُحفظ محليًا في متصفحك (<code dir="ltr">localStorage</code>) فقط.'}
            </p>
          </div>
        </details>

        <div style="margin-top: 10px;" class="bot-settings-close-footer">
          <button type="button" id="bot-close-drawer-btn" class="bot-cancel-btn" style="width: 100%;">${isEn ? 'Back to Chat' : 'العودة إلى المحادثة'}</button>
        </div>
      </div>` : ''}

      <!-- Conversation Output Area -->
      <div class="advisor-messages-wrap">
        <div id="bot-messages-container" class="bot-messages advisor-messages">

          <!-- Clean Welcome Message -->
          <div class="bot-msg bot-msg-assistant">
            <div class="bot-msg-bubble">
              ${isEn
                ? '👋 Hi! I’m your <strong>AI Skills Advisor</strong> — ready to help.<br><br>Describe your goal, paste code, or drop a <code>README</code>, and I’ll automatically route it to the best free specialist model to match the right skills for you.'
                : '👋 أهلًا بك! أنا <strong>مساعد المهارات الذكي</strong> — جاهز للبحث فورًا.<br><br>اكتب احتياجك، أو ألصق مقطع كود، أو ملف <bdi dir="ltr">README</bdi>، وسأوجّه طلبك تلقائيًا إلى أنسب نموذج مجاني حسب التخصص (الكود، مشاريع <bdi dir="ltr">AI</bdi>، أو البحث العام) لترشيح أفضل المهارات.'}
            </div>
          </div>
        </div>

        <!-- Scroll to Bottom Helper -->
        <button id="bot-scroll-bottom-btn" class="bot-scroll-bottom-btn" type="button" aria-label="${isEn ? 'Scroll down to latest' : 'التمرير إلى أسفل المحادثة'}" title="${isEn ? 'Scroll to latest messages' : 'الانتقال إلى أحدث الرسائل'}">
          <span class="bot-scroll-icon">↓</span>
          <span class="bot-scroll-text">${isEn ? 'Latest' : 'الأسفل'}</span>
        </button>
      </div>

      <!-- Browser-Only Code File Dropzone -->
      <div class="advisor-dropzone" id="advisor-dropzone">
        <div class="advisor-dropzone-row">
          <div class="advisor-dropzone-info">
            <span class="advisor-dropzone-title">📎 ${
              isEn
                ? 'Drag & drop code files here or pick files'
                : 'اسحب وأفلِت ملفاتك البرمجية هنا أو اختر ملفات'
            }</span>
            <span class="advisor-dropzone-types" dir="ltr">
              .js .ts .py .md .json .yml (README / package.json…) • Max ${MAX_LOCAL_FILES} files • 50 KB/file
            </span>
          </div>
          <div class="advisor-dropzone-actions">
            <span id="advisor-file-quota" class="advisor-quota-badge" dir="ltr">0 / ${MAX_LOCAL_FILES}</span>
            <input type="file" id="advisor-file-input" multiple accept="${FILE_INPUT_ACCEPT}" hidden>
            <button type="button" id="advisor-pick-files-btn" class="advisor-pick-btn">
              📂 ${isEn ? 'Choose Files' : 'اختيار ملفات'}
            </button>
            <button type="button" id="advisor-clear-files-btn" class="advisor-clear-files-btn" style="display: none;">
              🗑️ ${isEn ? 'Clear' : 'مسح الكل'}
            </button>
          </div>
        </div>
        <div id="advisor-file-list" class="advisor-file-list" style="display: none;"></div>
        <div id="advisor-file-status" class="advisor-file-status" style="display: none;"></div>
        <div class="advisor-dropzone-privacy">
          🔒 ${
            isEn
              ? 'Stored strictly inside your browser (localStorage) — never saved on our server, and disappears when you clear it or wipe browser data.'
              : 'تُحفَظ الملفات داخل متصفحك فقط (localStorage) ولا تُخزَّن في أي سيرفر، وتختفي تمامًا فور حذفها أو مسح بيانات المتصفح.'
          }
        </div>
      </div>

      <!-- Prompt Input Form -->
      <form id="bot-input-form" class="bot-input-form advisor-input-form">
        <textarea
          id="bot-input-text"
          class="bot-input-field advisor-input-field"
          rows="2"
          placeholder="${isEn ? 'Ask anything, paste code, or drop code files above...' : 'اسأل عن مهارة، أو ألصق كودًا أو أرفق ملفات برمجية بالأعلى…'}"
          aria-label="${isEn ? 'Message' : 'الرسالة'}"
        ></textarea>
        <button type="submit" id="bot-send-btn" class="bot-send-btn advisor-send-btn" aria-label="${isEn ? 'Send' : 'إرسال'}">
          <span>${isEn ? 'Ask AI' : 'بحث ذكي'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  `;

  attachBotEventListeners();
}

function attachBotEventListeners() {
  const shell = document.getElementById('ai-advisor-shell');
  const form = document.getElementById('bot-input-form');
  const input = document.getElementById('bot-input-text');
  const specialtyBar = document.getElementById('bot-specialty-bar');
  const messagesContainer = document.getElementById('bot-messages-container');
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');
  const heroAdvisorCta = document.getElementById('hero-advisor-cta');

  const apiBtn = document.getElementById('bot-api-btn');
  const settingsDrawer = document.getElementById('bot-settings-drawer');
  const providerSelect = document.getElementById('bot-provider-select');
  const saveKeyBtn = document.getElementById('bot-save-key-btn');
  const clearKeyBtn = document.getElementById('bot-clear-key-btn');
  const cancelSettingsBtn = document.getElementById('bot-cancel-settings-btn');
  const closeDrawerBtn = document.getElementById('bot-close-drawer-btn');
  const apiKeyInput = document.getElementById('bot-api-key-input');
  const toggleVisBtn = document.getElementById('bot-toggle-key-visibility');
  const badgeEl = document.getElementById('bot-settings-badge');
  const stepTextEl = document.getElementById('bot-step-guide-text');
  const linkEl = document.getElementById('bot-provider-link');
  const isEn = getLang() === 'en';

  if (heroAdvisorCta) {
    heroAdvisorCta.addEventListener('click', (e) => {
      const target = document.getElementById('ai-advisor-section');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => input?.focus({ preventScroll: true }), 420);
    });
  }

  function scrollToBottom(smooth = true) {
    if (!messagesContainer) return;
    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
    if (scrollBottomBtn) {
      scrollBottomBtn.classList.remove('visible');
    }
  }

  function checkScrollPosition() {
    if (!messagesContainer || !scrollBottomBtn) return;
    const distanceToBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight;
    if (distanceToBottom > 60) {
      scrollBottomBtn.classList.add('visible');
    } else {
      scrollBottomBtn.classList.remove('visible');
    }
  }

  if (messagesContainer) {
    messagesContainer.addEventListener('scroll', checkScrollPosition, { passive: true });
  }
  if (scrollBottomBtn) {
    scrollBottomBtn.addEventListener('click', () => scrollToBottom(true));
  }

  // Specialty Bar Selection
  if (specialtyBar) {
    specialtyBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.bot-specialty-pill');
      if (!pill) return;
      const next = pill.getAttribute('data-specialty') || 'auto';
      selectedSpecialty = next;
      specialtyBar.querySelectorAll('.bot-specialty-pill').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-specialty') === next);
      });
    });
  }

  function toggleSettingsDrawer(show) {
    if (!settingsDrawer || !shell) return;
    const isVisible = settingsDrawer.style.display !== 'none';
    const nextState = show !== undefined ? show : !isVisible;
    settingsDrawer.style.display = nextState ? 'block' : 'none';
    if (nextState) {
      shell.classList.add('in-settings');
    } else {
      shell.classList.remove('in-settings');
      setTimeout(checkScrollPosition, 100);
    }
  }

  function updateProviderGuide(providerId) {
    const p = PROVIDERS[providerId] || PROVIDERS.openrouter;
    if (badgeEl) badgeEl.textContent = isEn ? p.badgeEn : p.badgeAr;
    if (stepTextEl) stepTextEl.textContent = isEn ? p.stepEn : p.stepAr;
    if (linkEl) {
      linkEl.href = p.guideUrl;
      linkEl.textContent = `🔗 ${p.guideName} ↗`;
    }
    if (apiKeyInput && !apiKeyInput.value) {
      apiKeyInput.placeholder = p.placeholder;
    }
  }

  if (apiBtn && settingsDrawer) {
    apiBtn.addEventListener('click', () => toggleSettingsDrawer());
    if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', () => toggleSettingsDrawer(false));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleSettingsDrawer(false));

    providerSelect?.addEventListener('change', (e) => updateProviderGuide(e.target.value));

    apiKeyInput?.addEventListener('input', (e) => {
      const detected = detectProviderFromKey(e.target.value);
      if (detected && providerSelect && detected !== providerSelect.value) {
        providerSelect.value = detected;
        updateProviderGuide(detected);
      }
    });

    toggleVisBtn?.addEventListener('click', () => {
      if (!apiKeyInput) return;
      const isPass = apiKeyInput.type === 'password';
      apiKeyInput.type = isPass ? 'text' : 'password';
      toggleVisBtn.textContent = isPass ? '🙈' : '👁️';
    });

    saveKeyBtn?.addEventListener('click', async () => {
      const key = apiKeyInput?.value.trim() || '';
      const provider = providerSelect?.value || 'openrouter';
      const statusEl = document.getElementById('bot-settings-status');
      const p = PROVIDERS[provider] || PROVIDERS.openrouter;

      if (!key) {
        statusEl.style.display = 'block';
        statusEl.className = 'bot-settings-status error';
        statusEl.textContent = isEn ? 'Please paste a valid API key.' : 'يرجى لصق API Key أولًا.';
        return;
      }

      statusEl.style.display = 'block';
      statusEl.className = 'bot-settings-status';
      statusEl.textContent = isEn ? `Testing connection with ${p.name}...` : `جارٍ التحقق من المفتاح مع ${p.name}…`;

      try {
        await testApiKey(provider, key);
        setStoredConfig(provider, key);
        statusEl.className = 'bot-settings-status success';
        statusEl.textContent = isEn ? `✓ Connected to ${p.name}!` : `✓ تم تفعيل ${p.name} بنجاح`;
        updateBotStatusUI(true, provider);
        if (clearKeyBtn) clearKeyBtn.style.display = 'inline-block';

        setTimeout(() => {
          toggleSettingsDrawer(false);
          statusEl.style.display = 'none';
        }, 900);
      } catch (err) {
        statusEl.className = 'bot-settings-status error';
        statusEl.textContent = isEn
          ? `⚠️ Connection failed: ${err.message}`
          : `⚠️ تعذّر التحقق من المفتاح: ${err.message}`;
      }
    });

    clearKeyBtn?.addEventListener('click', () => {
      removeStoredConfig();
      if (apiKeyInput) apiKeyInput.value = '';
      updateBotStatusUI(false);
      clearKeyBtn.style.display = 'none';
      const statusEl = document.getElementById('bot-settings-status');
      statusEl.style.display = 'block';
      statusEl.className = 'bot-settings-status success';
      statusEl.textContent = isEn ? 'Switched back to free auto-router.' : 'تمت العودة إلى الوضع المجاني التلقائي.';
      setTimeout(() => {
        toggleSettingsDrawer(false);
        statusEl.style.display = 'none';
      }, 900);
    });
  }

  const dropzone = document.getElementById('advisor-dropzone');
  const fileInput = document.getElementById('advisor-file-input');
  const pickFilesBtn = document.getElementById('advisor-pick-files-btn');
  const clearFilesBtn = document.getElementById('advisor-clear-files-btn');
  const fileQuotaEl = document.getElementById('advisor-file-quota');
  const fileListEl = document.getElementById('advisor-file-list');
  const fileStatusEl = document.getElementById('advisor-file-status');
  let statusTimer = null;

  function showFileStatus(msg, isError = false) {
    if (!fileStatusEl) return;
    clearTimeout(statusTimer);
    if (!msg) {
      fileStatusEl.style.display = 'none';
      return;
    }
    fileStatusEl.textContent = msg;
    fileStatusEl.className = `advisor-file-status ${isError ? 'is-error' : 'is-info'}`;
    fileStatusEl.style.display = 'block';
    statusTimer = setTimeout(() => {
      fileStatusEl.style.display = 'none';
    }, 4500);
  }

  function renderLocalFilesTray() {
    const files = getStoredLocalFiles();
    const totalChars = getTotalStoredChars(files);
    if (fileQuotaEl) {
      fileQuotaEl.textContent = `${files.length} / ${MAX_LOCAL_FILES} • ${(totalChars / 1000).toFixed(1)}/${(MAX_TOTAL_FILE_CHARS / 1000).toFixed(0)}k ch`;
      fileQuotaEl.classList.toggle('is-full', files.length >= MAX_LOCAL_FILES || totalChars >= MAX_TOTAL_FILE_CHARS);
    }
    if (pickFilesBtn) {
      const atCap = files.length >= MAX_LOCAL_FILES || totalChars >= MAX_TOTAL_FILE_CHARS;
      pickFilesBtn.disabled = atCap;
      pickFilesBtn.title = atCap
        ? (isEn ? `Limit reached (${MAX_LOCAL_FILES} files max)` : `تم بلوغ الحد الأقصى (${MAX_LOCAL_FILES} ملفات)`)
        : '';
    }
    if (!fileListEl || !clearFilesBtn) return;

    if (!files.length) {
      fileListEl.innerHTML = '';
      fileListEl.style.display = 'none';
      clearFilesBtn.style.display = 'none';
      return;
    }

    clearFilesBtn.style.display = 'inline-flex';
    fileListEl.style.display = 'flex';
    fileListEl.innerHTML = files
      .map(
        (f, idx) => `
      <span class="advisor-file-chip" title="${escapeAttr(f.name)} (${escapeAttr(formatBytesShort(f.size))})">
        <span dir="ltr">📄 ${escapeHtml(f.name)}</span>
        <span class="advisor-file-size" dir="ltr">${escapeHtml(formatBytesShort(f.size))}${f.truncated ? ' ✂' : ''}</span>
        <button type="button" class="advisor-file-remove" data-file-idx="${idx}" aria-label="${isEn ? `Remove ${f.name}` : `إزالة ${f.name}`}">✕</button>
      </span>`
      )
      .join('');
  }

  async function ingestProjectFiles(fileList) {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    // Guard against dropping an entire massive repository folder at once
    const batch = incoming.slice(0, 12);
    let current = getStoredLocalFiles();
    const skipped = [];
    let addedCount = 0;

    if (incoming.length > batch.length) {
      skipped.push(
        isEn
          ? `${incoming.length - batch.length} extra files ignored (max ${MAX_LOCAL_FILES} allowed)`
          : `تم تجاهل ${incoming.length - batch.length} ملفًا زائدًا (الحد الأقصى ${MAX_LOCAL_FILES} ملفات)`
      );
    }

    for (const file of batch) {
      const withoutDup = current.filter((item) => item.name.toLowerCase() !== file.name.toLowerCase());
      const currentChars = getTotalStoredChars(withoutDup);
      const remainingChars = MAX_TOTAL_FILE_CHARS - currentChars;

      if (withoutDup.length >= MAX_LOCAL_FILES) {
        skipped.push(`${file.name} (${isEn ? `max ${MAX_LOCAL_FILES} files` : `الحد الأقصى ${MAX_LOCAL_FILES} ملفات`})`);
        continue;
      }
      if (remainingChars < 120) {
        skipped.push(`${file.name} (${isEn ? 'context budget full' : 'اكتمل حجم النصوص المسموح'})`);
        continue;
      }
      if (!isAllowedProjectFilename(file.name)) {
        skipped.push(`${file.name} (${isEn ? 'unsupported/lockfile/secret' : 'غير مدعوم أو محظور'})`);
        continue;
      }
      if (file.size > MAX_RAW_FILE_BYTES) {
        skipped.push(`${file.name} (${isEn ? 'exceeds 50 KB limit' : 'أكبر من 50 KB'})`);
        continue;
      }

      try {
        const text = await file.text();
        if (text.includes('\u0000')) {
          skipped.push(`${file.name} (${isEn ? 'binary file' : 'ملف ثنائي'})`);
          continue;
        }
        const allowedSlice = Math.min(MAX_CHARS_PER_FILE, remainingChars);
        const snippet = text.slice(0, allowedSlice);
        current = withoutDup;
        current.push({
          name: file.name,
          size: file.size,
          content: snippet,
          truncated: text.length > allowedSlice
        });
        addedCount++;
      } catch {
        skipped.push(file.name);
      }
    }

    const saved = saveStoredLocalFiles(current);
    renderLocalFilesTray();

    if (!saved) {
      showFileStatus(
        isEn ? 'Browser storage limit reached; remove old files first.' : 'امتلأت مساحة تخزين المتصفح؛ احذف بعض الملفات أولًا.',
        true
      );
      return;
    }

    if (skipped.length) {
      showFileStatus(
        isEn ? `Skipped: ${skipped.join(', ')}` : `تم تخطي: ${skipped.join('، ')}`,
        true
      );
    } else if (addedCount > 0) {
      showFileStatus(
        isEn
          ? `Added ${addedCount} file(s) locally in your browser. Ask anything or click Ask AI!`
          : `تمت إضافة ${addedCount} ملف/ملفات داخل متصفحك فقط. اكتب سؤالك أو اضغط بحث ذكي!`,
        false
      );
    }
  }

  renderLocalFilesTray();

  if (pickFilesBtn && fileInput) {
    pickFilesBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      ingestProjectFiles(e.target.files);
      fileInput.value = '';
    });
  }

  if (clearFilesBtn) {
    clearFilesBtn.addEventListener('click', () => {
      clearStoredLocalFiles();
      renderLocalFilesTray();
      showFileStatus(isEn ? 'Cleared all attached files from browser storage.' : 'تم مسح جميع الملفات من تخزين المتصفح.', false);
    });
  }

  if (fileListEl) {
    fileListEl.addEventListener('click', (e) => {
      const rmBtn = e.target.closest('.advisor-file-remove');
      if (!rmBtn) return;
      const idx = Number(rmBtn.getAttribute('data-file-idx'));
      const current = getStoredLocalFiles();
      if (!Number.isNaN(idx) && idx >= 0 && idx < current.length) {
        current.splice(idx, 1);
        saveStoredLocalFiles(current);
        renderLocalFilesTray();
      }
    });
  }

  if (dropzone && shell) {
    let dragCounter = 0;
    const onDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      dropzone.classList.add('is-dragover');
    };
    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      dropzone.classList.add('is-dragover');
    };
    const onDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter = Math.max(0, dragCounter - 1);
      if (dragCounter === 0) dropzone.classList.remove('is-dragover');
    };
    const onDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter = 0;
      dropzone.classList.remove('is-dragover');
      if (e.dataTransfer?.files?.length) {
        ingestProjectFiles(e.dataTransfer.files);
      }
    };

    shell.addEventListener('dragenter', onDragEnter);
    shell.addEventListener('dragover', onDragOver);
    shell.addEventListener('dragleave', onDragLeave);
    shell.addEventListener('drop', onDrop);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 180) + 'px';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isAdvisorSending) return;
    const rawText = input.value.trim();
    const attachedFiles = getStoredLocalFiles();
    if (!rawText && attachedFiles.length === 0) {
      input.focus();
      return;
    }
    const queryText =
      rawText ||
      (isEn
        ? 'Analyze the attached project files and recommend the best skills for my codebase.'
        : 'حلّل الملفات البرمجية المرفقة واقترح أنسب المهارات لمشروعي.');
    input.value = '';
    input.style.height = 'auto';
    handleSendMessage(queryText, attachedFiles);
  });
}

function updateBotStatusUI(hasKey, providerId = 'openrouter') {
  const isEn = getLang() === 'en';
  const label = document.getElementById('bot-engine-label');
  const dot = document.querySelector('.bot-live-dot');
  const btn = document.getElementById('bot-api-btn');
  const p = PROVIDERS[providerId] || PROVIDERS.openrouter;

  if (hasKey) {
    const name = isEn ? (p.nameEn || p.name) : p.name;
    if (label) label.textContent = `${name} (${isEn ? 'Personal Key' : 'مفتاح شخصي'})`;
    if (dot) dot.classList.add('bot-live-gemini');
    if (btn) btn.classList.add('has-key');
  } else {
    if (label) label.textContent = isEn ? 'Free Auto-Router • Specialty Detection' : 'يعمل مجانًا • توجيه حسب التخصص';
    if (dot) dot.classList.remove('bot-live-gemini');
    if (btn) btn.classList.remove('has-key');
  }
}

async function callServerFreeAdvisor(userText, lang, specialty) {
  const res = await fetch('/api/advisor', {
    method: 'POST',
    signal: AbortSignal.timeout(18000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userText,
      lang: lang === 'en' ? 'en' : 'ar',
      specialty: specialty || 'auto'
    })
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  if (data?.ok && data?.reply) {
    return data;
  }
  return null;
}

async function handleSendMessage(userText, attachedFiles = []) {
  if (isAdvisorSending) return;
  isAdvisorSending = true;
  const sendBtn = document.getElementById('bot-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  try {
    const messagesContainer = document.getElementById('bot-messages-container');
    const filesList = Array.isArray(attachedFiles) ? attachedFiles : [];
    const fileNamesBadge = filesList.length
      ? `\n\n📎 ${filesList.map((f) => f.name).join(', ')}`
      : '';

    appendMessage('user', `${userText}${fileNamesBadge}`);
    const typingId = appendTypingIndicator();
    messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });

    const filesContextBlock = filesList.length
      ? '\n\nAttached Local Code/Project Files (browser-only):\n' +
        filesList
          .map((f) => `--- File: ${f.name} ---\n${f.content}${f.truncated ? '\n[...truncated]' : ''}`)
          .join('\n\n')
      : '';
    const aiPayload = `${userText}${filesContextBlock}`;

    const config = getStoredConfig();
    const isEn = getLang() === 'en';
    const lang = isEn ? 'en' : 'ar';
    const detectedSpecialty = detectSpecialtyClient(aiPayload, selectedSpecialty);
    const spMeta = SPECIALISTS[detectedSpecialty] || SPECIALISTS.general;

    // 1. Optional Personal Key Path (only if user configured their own key)
    if (config.key) {
      try {
        const responseText = await queryUniversalAi(aiPayload, config.provider, config.key, detectedSpecialty);
        removeTypingIndicator(typingId);
        const matchedSkills = extractMatchedSkills(aiPayload, responseText);
        const pName = (PROVIDERS[config.provider] || {}).name || config.provider;

        appendAssistantResponse({
          reply: responseText,
          recommendedSkills: matchedSkills,
          specialistBadge: `${spMeta.icon} ${isEn ? spMeta.labelEn : spMeta.labelAr} • ${pName}`
        });
        return;
      } catch (err) {
        console.warn('Personal API key call failed, falling back to free router:', err);
      }
    }

    // 2. Default Zero-Key Multi-Specialist Router (/api/advisor)
    try {
      const serverAdvisor = await callServerFreeAdvisor(aiPayload, lang, selectedSpecialty);
      if (serverAdvisor?.reply) {
        removeTypingIndicator(typingId);
        const matchedSkills = extractMatchedSkills(aiPayload, serverAdvisor.reply);
        const spLabel = isEn ? serverAdvisor.specialtyLabelEn : serverAdvisor.specialtyLabelAr;
        const badge = `${serverAdvisor.icon || spMeta.icon} ${spLabel} • ${serverAdvisor.modelLabel}`;

        appendAssistantResponse({
          reply: serverAdvisor.reply,
          recommendedSkills: matchedSkills,
          specialistBadge: badge
        });
        return;
      }
    } catch (err) {
      console.warn('Free server advisor unavailable, using instant specialist matcher:', err);
    }

    // 3. Instant Bilingual Specialist Local Fallback (works 100% offline/static on GitHub Pages too)
    const localResult = queryLocalSpecialistEngine(aiPayload, detectedSpecialty);
    await new Promise((r) => setTimeout(r, 180));
    removeTypingIndicator(typingId);
    appendAssistantResponse(localResult);
  } finally {
    isAdvisorSending = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

/**
 * Optional User-Key AI Caller (Supports OpenRouter free specialists, Gemini 2.5, Groq, Claude, OpenAI, DeepSeek)
 */
async function queryUniversalAi(userText, provider, apiKey, specialty = 'general') {
  const isEn = getLang() === 'en';
  const catalogContext = skillsCatalog
    .slice(0, 45)
    .map((s) => {
      const title = isEn ? (s.title_en || s.name) : (s.title_ar || s.name);
      const catObj = categoriesCatalog.find((c) => c.id === s.category);
      const cat = isEn ? (catObj?.name_en || s.category || '') : (catObj?.name_ar || s.category || '');
      const summary = isEn ? (s.summary_en || s.summary_ar) : s.summary_ar;
      return `- [${s.id}] (${cat}) "${title}": ${summary ? summary.slice(0, 95) : ''}`;
    })
    .join('\n');

  const systemInstruction = isEn
    ? `You are the AI Skills Advisor (${SPECIALISTS[specialty]?.labelEn || 'Specialist'}). Pick the best matching skills from the Top 100 list and ALWAYS write their exact ID in brackets like [docx] or [systematic-debugging]. Include 1-2 trusted external tools if needed, plus a concise prompt or command. Reply in English.`
    : `أنت مستشار المهارات الذكي (${SPECIALISTS[specialty]?.labelAr || 'متخصص'}). رشّح أنسب المهارات من القائمة واكتب معرّف كل مهارة بين قوسين مثل [docx] أو [systematic-debugging]. أضف أداة خارجية موثوقة عند الحاجة مع شرح مختصر وPrompt جاهز. اكتب بعربية تقنية واضحة.`;

  const fullPrompt = `${systemInstruction}\n\nCatalog:\n${catalogContext}\n\nUser Input:\n"""\n${userText}\n"""`;

  if (provider === 'gemini') {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
    let lastError = null;
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 900 }
          })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        } else {
          const errJson = await res.json().catch(() => ({}));
          lastError = new Error(errJson.error?.message || `HTTP ${res.status}`);
          if (res.status === 404) continue;
          throw lastError;
        }
      } catch (e) {
        lastError = e;
      }
    }
    throw lastError || new Error('Gemini API request failed');
  }

  if (provider === 'openrouter') {
    const specialistModel =
      specialty === 'code'
        ? 'cohere/north-mini-code:free'
        : specialty === 'ai-project'
          ? 'nvidia/nemotron-3-ultra-550b-a55b:free'
          : 'google/gemma-4-31b-it:free';

    for (const model of [specialistModel, 'openrouter/free']) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
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
              { role: 'user', content: `Catalog:\n${catalogContext}\n\nRequest:\n${userText}` }
            ],
            temperature: 0.3,
            max_tokens: 900
          })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) return text;
        }
      } catch {}
    }
    return callRelayProxy('openrouter', apiKey, specialistModel, systemInstruction, `Catalog:\n${catalogContext}\n\nRequest:\n${userText}`);
  }

  if (provider === 'claude') {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 900,
          system: systemInstruction,
          messages: [{ role: 'user', content: `Catalog:\n${catalogContext}\n\nRequest:\n${userText}` }]
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.content?.[0]?.text || '';
      }
    } catch {}
    return callRelayProxy('claude', apiKey, 'claude-3-5-sonnet-20241022', systemInstruction, `Catalog:\n${catalogContext}\n\nRequest:\n${userText}`);
  }

  const openaiEndpoints = {
    openai: { url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
    groq: { url: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.3-70b-versatile' },
    deepseek: { url: 'https://api.deepseek.com/chat/completions', model: 'deepseek-chat' }
  };

  if (openaiEndpoints[provider]) {
    const { url, model } = openaiEndpoints[provider];
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Catalog:\n${catalogContext}\n\nRequest:\n${userText}` }
          ],
          temperature: 0.3,
          max_tokens: 900
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch {}
    return callRelayProxy(provider, apiKey, model, systemInstruction, `Catalog:\n${catalogContext}\n\nRequest:\n${userText}`);
  }

  throw new Error(`Unsupported AI Provider: ${provider}`);
}

async function callRelayProxy(provider, apiKey, model, system, prompt) {
  const res = await fetch('/api/ai/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, apiKey, model, system, prompt })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data.reply || '';
}

async function testApiKey(provider, apiKey) {
  if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'ping' }] }],
        generationConfig: { maxOutputTokens: 3 }
      })
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${res.status}`);
    }
    return true;
  }

  const reply = await queryUniversalAi('ping', provider, apiKey);
  if (!reply) throw new Error('No response received');
  return true;
}

function extractMatchedSkills(userText, replyText) {
  const combined = `${userText} ${replyText}`.toLowerCase();
  const matched = [];
  for (const s of skillsCatalog) {
    const id = s.id.toLowerCase();
    const name = (s.name || '').toLowerCase();
    if (combined.includes(`[${id}]`) || combined.includes(id) || (name && name.length > 3 && combined.includes(name))) {
      matched.push(s);
      if (matched.length >= 4) break;
    }
  }
  return matched;
}

function appendMessage(role, text) {
  const container = document.getElementById('bot-messages-container');
  const msgEl = document.createElement('div');
  msgEl.className = `bot-msg bot-msg-${role}`;
  msgEl.innerHTML = `<div class="bot-msg-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById('bot-messages-container');
  const typingEl = document.createElement('div');
  const id = `typing-${Date.now()}`;
  typingEl.id = id;
  typingEl.className = 'bot-msg bot-msg-assistant';
  typingEl.innerHTML = `
    <div class="bot-msg-bubble bot-typing-bubble">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(typingEl);
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function appendAssistantResponse({ reply, recommendedSkills = [], specialistBadge = '' }) {
  const container = document.getElementById('bot-messages-container');
  const msgEl = document.createElement('div');
  msgEl.className = 'bot-msg bot-msg-assistant';
  const isEn = getLang() === 'en';

  const badgeHtml = specialistBadge
    ? `<div class="bot-reply-specialist-pill">${escapeHtml(specialistBadge)}</div>`
    : '';

  let skillsCardsHtml = '';
  if (Array.isArray(recommendedSkills) && recommendedSkills.length > 0) {
    skillsCardsHtml = `
      <div class="bot-recommended-skills">
        ${recommendedSkills
          .map((skill) => {
            const stars = (skill.github_stars || 0).toLocaleString('en-US');
            const catObj = categoriesCatalog.find((c) => c.id === skill.category);
            const cat = isEn ? (catObj?.name_en || skill.category || '') : (catObj?.name_ar || skill.category || '');
            const title = isEn ? (skill.title_en || skill.name) : (skill.title_ar || skill.name);
            const promptText = skill.quick_prompt || (isEn ? `Use skill: ${skill.name}` : `استخدم مهارة ${skill.name}`);

            return `
              <div class="bot-skill-card" data-skill-id="${escapeAttr(skill.id)}">
                <div class="bot-skill-card-top">
                  <span class="bot-skill-card-name">${escapeHtml(title)}</span>
                  <span class="bot-skill-card-badge">★ ${stars}</span>
                </div>
                <div class="bot-skill-card-meta">${escapeHtml(cat)}</div>
                <div class="bot-skill-card-actions">
                  <button type="button" class="bot-copy-prompt-btn" data-prompt="${escapeAttr(promptText)}">
                    📋 ${isEn ? 'Copy Prompt' : 'نسخ Prompt'}
                  </button>
                  <a href="${formatUrlWithLang(`skill.html?id=${encodeURIComponent(skill.id)}`)}" class="bot-skill-link" target="_blank" rel="noopener noreferrer">
                    ${isEn ? 'View Skill ↗' : 'عرض المهارة ↗'}
                  </a>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;
  }

  msgEl.innerHTML = `
    <div class="bot-msg-bubble">
      ${badgeHtml}
      ${formatMarkdownText(reply)}
      ${skillsCardsHtml}
    </div>
  `;

  msgEl.querySelectorAll('.bot-copy-prompt-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const prompt = btn.getAttribute('data-prompt');
      try {
        await navigator.clipboard.writeText(prompt);
        const originalText = btn.textContent;
        btn.textContent = isEn ? 'Copied ✓' : 'نُسخ ✓';
        btn.style.color = '#10b981';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy prompt:', err);
      }
    });
  });

  container.appendChild(msgEl);
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');
  if (scrollBottomBtn) {
    const offset = container.scrollHeight - container.scrollTop - container.clientHeight;
    scrollBottomBtn.classList.toggle('visible', offset > 60);
  }
}

const LOCAL_SYNONYM_RULES = [
  { re: /bug|debug|error|trace|crash|خطا|عطل|اصلاح|تصحيح/i, ids: ['systematic-debugging', 'mp-diagnosing-bugs', 'debugging-error-recovery'] },
  { re: /test|tdd|pytest|jest|playwright|اختبار|فحص/i, ids: ['test-driven-development', 'mp-tdd', 'webapp-testing', 'python-pytest-suite', 'react-testing-library'] },
  { re: /plan|spec|ticket|خطة|تخطيط|مواصفات/i, ids: ['obra-writing-plans', 'spec-driven-development', 'to-spec', 'planning-and-task-breakdown'] },
  { re: /agent|subagent|mcp|llm|rag|ai|وكيل|ذكاء|معمارية/i, ids: ['subagent-driven-development', 'dispatching-parallel-agents', 'mcp-builder', 'context-engineering', 'eval-harness'] },
  { re: /readme|doc|كتابة|توثيق|مستند/i, ids: ['doc-coauthoring', 'writing-for-agents', 'writing-guidelines', 'grill-with-docs'] },
  { re: /react|next|ui|frontend|design|واجهة|تصميم/i, ids: ['frontend-design', 'frontend-ui-engineering', 'react-best-practices', 'composition-patterns', 'responsive-design'] },
  { re: /python|fastapi|django|prisma|rust|redis|api|backend|خادم/i, ids: ['fastapi-patterns', 'prisma-patterns', 'rust-patterns', 'redis-patterns', 'api-and-interface-design'] },
  { re: /security|review|امان|حماية|مراجعة/i, ids: ['security-review-checklist', 'code-review-quality', 'mp-code-review', 'django-security'] },
  { re: /deploy|vercel|cloud|git|worktree|نشر|سحابة/i, ids: ['deploy-to-vercel', 'shipping-and-launch', 'using-git-worktrees', 'cloud-solution-architect'] },
  { re: /word|docx|وورد|ورد/i, ids: ['docx'] },
  { re: /excel|xlsx|اكسل|جدول|جداول/i, ids: ['xlsx'] },
  { re: /pdf|بي دي اف/i, ids: ['pdf'] },
  { re: /powerpoint|pptx|عرض|عروض|شرائح/i, ids: ['pptx'] },
  { re: /research|paper|academic|بحث|علمي|دراسة/i, ids: ['deep-research', 'sr-screener', 'academic-paper-writer'] }
];

/**
 * Upgraded Instant Bilingual Specialist Engine (runs locally with 0 external keys required)
 */
function queryLocalSpecialistEngine(message, specialty = 'general') {
  const isEn = getLang() === 'en';
  const normQuery = normalizeArabic(message).toLowerCase();
  const sp = SPECIALISTS[specialty] || SPECIALISTS.general;

  const boostedIds = new Set();
  for (const rule of LOCAL_SYNONYM_RULES) {
    if (rule.re.test(normQuery) || rule.re.test(message)) {
      for (const id of rule.ids) boostedIds.add(id);
    }
  }

  const words = normQuery.split(/\s+/).filter((w) => w.length > 2);
  const scored = skillsCatalog.map((skill) => {
    let score = boostedIds.has(skill.id) ? 28 : 0;
    if (specialty === 'code' && ['code-quality', 'development', 'cloud-security'].includes(skill.category)) score += 3;
    if (specialty === 'ai-project' && ['meta', 'data-ai', 'development'].includes(skill.category)) score += 3;

    const normTitle = normalizeArabic(skill.title_ar || '').toLowerCase();
    const normSummary = normalizeArabic(skill.summary_ar || '').toLowerCase();
    const hayEn = `${skill.id} ${skill.name || ''} ${skill.title_en || ''} ${skill.summary_en || ''}`.toLowerCase();

    for (const w of words) {
      if (normTitle.includes(w)) score += 10;
      if (normSummary.includes(w)) score += 5;
      if (hayEn.includes(w)) score += 8;
    }

    return { skill, score: score + (skill.github_stars > 50000 ? 1 : 0) };
  });

  scored.sort((a, b) => b.score - a.score);
  const bestMatches = scored.filter((item) => item.score > 4).slice(0, 3).map((item) => item.skill);
  const finalSkills = bestMatches.length > 0 ? bestMatches : skillsCatalog.slice(0, 3);

  const lines = finalSkills.map((s) => {
    const title = isEn ? (s.title_en || s.name) : (s.title_ar || s.name);
    const summary = isEn ? (s.summary_en || s.summary_ar) : s.summary_ar;
    return `- **${title}** (\`[${s.id}]\`): ${(summary || '').slice(0, 120)}`;
  });

  let intro = '';
  if (isEn) {
    intro = bestMatches.length > 0
      ? `Matched top verified skills for your **${sp.labelEn}** request:`
      : `Here are popular verified skills to start with:`;
  } else {
    intro = bestMatches.length > 0
      ? `حلّلت طلبك عبر مسار **${sp.labelAr}**، وإليك أنسب المهارات الموثقة لك:`
      : `إليك أبرز المهارات الشائعة المناسبة لطلبك:`;
  }

  return {
    reply: `${intro}\n\n${lines.join('\n')}`,
    recommendedSkills: finalSkills,
    specialistBadge: `${sp.icon} ${isEn ? sp.labelEn : sp.labelAr} • ${isEn ? 'Instant Catalog Engine' : 'التحليل الفوري'}`
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMarkdownText(text) {
  if (!text) return '';
  let escaped = escapeHtml(text);

  escaped = escaped.replace(/```([a-zA-Z0-9_\-+]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="bot-code-block"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  return escaped
    .replace(/### (.*?)(?:\n|$)/g, '<h4 style="margin: 8px 0 4px; font-weight: 700; color: inherit;">$1</h4>')
    .replace(/## (.*?)(?:\n|$)/g, '<h3 style="margin: 10px 0 6px; font-weight: 700; color: inherit;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bot-inline-code">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">$1</a>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
