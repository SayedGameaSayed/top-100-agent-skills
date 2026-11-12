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

  if (document.getElementById('ai-bot-trigger')) return;

  const isEn = getLang() === 'en';
  const config = getStoredConfig();
  const hasKey = Boolean(config.key);
  const activeProvider = PROVIDERS[config.provider] || PROVIDERS.openrouter;

  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'ai-bot-root';
  widgetContainer.innerHTML = `
    <!-- Floating Trigger Pill Button -->
    <button id="ai-bot-trigger" class="ai-bot-trigger" aria-label="${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}" title="${isEn ? 'Ask AI Skills Assistant' : 'استشر مساعد المهارات الذكي'}">
      <span class="bot-trigger-pulse"></span>
      <span class="bot-trigger-icon" aria-hidden="true">✨</span>
      <span class="bot-trigger-text">${isEn ? 'Skills Assistant' : 'مساعد المهارات'}</span>
    </button>

    <!-- Floating Chat Modal / Drawer -->
    <div id="ai-bot-modal" class="ai-bot-modal" aria-hidden="true">

      <!-- Minimal Draggable Header -->
      <div class="bot-header" id="bot-header">
        <div class="bot-header-info">
          <span class="bot-drag-handle" id="bot-drag-handle" title="${isEn ? 'Drag to move window (Double-click to reset)' : 'اسحب لتحريك النافذة (انقر مرتين لإعادة التمركز)'}">⠿</span>
          <img src="assets/logo.png" alt="Assistant Logo" class="bot-avatar-img" width="28" height="28">
          <div>
            <div class="bot-title">${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}</div>
            <div class="bot-subtitle">
              <span class="bot-live-dot ${hasKey ? 'bot-live-gemini' : ''}"></span>
              <span id="bot-engine-label">${
                hasKey
                  ? `${isEn ? (activeProvider.nameEn || activeProvider.name) : activeProvider.name} (${isEn ? 'Personal Key' : 'مفتاح شخصي'})`
                  : (isEn ? 'Free Auto-Router • No Key Needed' : 'يعمل مجانًا • توجيه حسب التخصص')
              }</span>
            </div>
          </div>
        </div>
        <div class="bot-header-actions">
          <button id="bot-api-btn" class="bot-icon-btn bot-settings-toggle-btn ${hasKey ? 'has-key' : ''}" title="${isEn ? 'Specialist Mode & Optional Key' : 'التخصصات وإعدادات متقدمة'}" aria-label="${isEn ? 'Settings' : 'الإعدادات'}" type="button">⚙️</button>
          <button id="bot-expand-btn" class="bot-icon-btn" title="${isEn ? 'Maximize / Restore Window' : 'تكبير النافذة / استعادة الحجم'}" aria-label="${isEn ? 'Maximize' : 'تكبير النافذة'}" type="button">⤢</button>
          <button id="bot-close-btn" class="bot-icon-btn" title="${isEn ? 'Close Chat' : 'إغلاق المحادثة'}" aria-label="${isEn ? 'Close' : 'إغلاق'}" type="button">✕</button>
        </div>
      </div>

      <!-- Compact Specialist Mode Strip -->
      <div class="bot-specialty-bar" id="bot-specialty-bar" role="tablist" aria-label="${isEn ? 'AI Specialist Mode' : 'تخصص المساعد'}">
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

      <!-- Clean Optional Settings Drawer -->
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
      </div>

      <!-- Chat Messages Container -->
      <div id="bot-messages-container" class="bot-messages">

        <!-- Clean Welcome Message -->
        <div class="bot-msg bot-msg-assistant">
          <div class="bot-msg-bubble">
            ${isEn
              ? '👋 Hi! I’m your <strong>AI Skills Advisor</strong> — ready to help.<br><br>Describe your goal, paste code, or drop a <code>README</code>, and I’ll automatically route it to the best free specialist model to match the right skills for you.'
              : '👋 أهلًا بك! أنا <strong>مساعد المهارات الذكي</strong> — جاهز للبحث فورًا.<br><br>اكتب احتياجك، أو ألصق مقطع كود، أو ملف <bdi dir="ltr">README</bdi>، وسأوجّه طلبك تلقائيًا إلى أنسب نموذج مجاني حسب التخصص (الكود، مشاريع <bdi dir="ltr">AI</bdi>، أو البحث العام) لترشيح أفضل المهارات.'}
          </div>
        </div>
      </div>

      <!-- Floating Scroll to Bottom Button -->
      <button id="bot-scroll-bottom-btn" class="bot-scroll-bottom-btn" type="button" aria-label="${isEn ? 'Scroll down to latest' : 'التمرير إلى أسفل المحادثة'}" title="${isEn ? 'Scroll to latest messages' : 'الانتقال إلى أحدث الرسائل'}">
        <span class="bot-scroll-icon">↓</span>
        <span class="bot-scroll-text">${isEn ? 'Latest' : 'الأسفل'}</span>
      </button>

      <!-- Chat Input Area -->
      <form id="bot-input-form" class="bot-input-form">
        <textarea
          id="bot-input-text"
          class="bot-input-field"
          rows="1"
          placeholder="${isEn ? 'Ask anything, paste code, or drop a README...' : 'اسأل عن مهارة، أو ألصق كودًا أو ملف README…'}"
          aria-label="${isEn ? 'Message' : 'الرسالة'}"
          required
        ></textarea>
        <button type="submit" id="bot-send-btn" class="bot-send-btn" aria-label="${isEn ? 'Send' : 'إرسال'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(widgetContainer);
  attachBotEventListeners();
}

function attachBotEventListeners() {
  const trigger = document.getElementById('ai-bot-trigger');
  const modal = document.getElementById('ai-bot-modal');
  const header = document.getElementById('bot-header');
  const expandBtn = document.getElementById('bot-expand-btn');
  const closeBtn = document.getElementById('bot-close-btn');
  const form = document.getElementById('bot-input-form');
  const input = document.getElementById('bot-input-text');
  const specialtyBar = document.getElementById('bot-specialty-bar');
  const messagesContainer = document.getElementById('bot-messages-container');
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');

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

  // Open / Close Modal
  trigger.addEventListener('click', () => {
    const isOpen = modal.classList.contains('active');
    if (isOpen) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    } else {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      input.focus();
      setTimeout(checkScrollPosition, 150);
    }
  });

  // Expand / Restore
  if (expandBtn) {
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = modal.classList.toggle('expanded');
      expandBtn.textContent = isExpanded ? '🗗' : '⤢';
      expandBtn.title = isExpanded
        ? (isEn ? 'Restore Window Size' : 'استعادة الحجم الأصلي')
        : (isEn ? 'Maximize Window' : 'تكبير النافذة');
      if (modal.style.top) clampModalInViewport();
      setTimeout(checkScrollPosition, 200);
    });
  }

  function clampModalInViewport() {
    const rect = modal.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
    modal.style.left = `${Math.max(8, Math.min(maxLeft, rect.left))}px`;
    modal.style.top = `${Math.max(8, Math.min(maxTop, rect.top))}px`;
    modal.style.bottom = 'auto';
    modal.style.right = 'auto';
  }

  // Draggable Modal Window
  function setupModalDraggable() {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onPointerDown = (e) => {
      if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('select')) {
        return;
      }
      isDragging = true;
      modal.classList.add('is-dragging');
      const rect = modal.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      modal.style.top = `${initialTop}px`;
      modal.style.left = `${initialLeft}px`;
      modal.style.bottom = 'auto';
      modal.style.right = 'auto';
      modal.style.transform = 'none';

      startX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      startY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const newLeft = Math.max(8, Math.min(window.innerWidth - modal.offsetWidth - 8, initialLeft + (clientX - startX)));
      const newTop = Math.max(8, Math.min(window.innerHeight - modal.offsetHeight - 8, initialTop + (clientY - startY)));
      modal.style.left = `${newLeft}px`;
      modal.style.top = `${newTop}px`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      modal.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    };

    if (header) {
      header.addEventListener('mousedown', onPointerDown);
      header.addEventListener('touchstart', onPointerDown, { passive: true });
      header.addEventListener('dblclick', (e) => {
        if (e.target.closest('button')) return;
        modal.style.left = '';
        modal.style.top = '';
        modal.style.bottom = '';
        modal.style.right = '';
        modal.style.transform = '';
        modal.classList.remove('expanded');
        if (expandBtn) expandBtn.textContent = '⤢';
      });
    }

    window.addEventListener('resize', () => {
      if (modal.style.top) clampModalInViewport();
    });
  }

  setupModalDraggable();

  // Draggable Trigger Pill
  function setupTriggerDraggable() {
    let isDragging = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onStart = (e) => {
      isDragging = true;
      hasMoved = false;
      startX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      startY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
      const rect = trigger.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      document.addEventListener('mousemove', onMove, { passive: false });
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;
      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault();
        const newLeft = Math.max(10, Math.min(window.innerWidth - trigger.offsetWidth - 10, initialLeft + dx));
        const newTop = Math.max(10, Math.min(window.innerHeight - trigger.offsetHeight - 10, initialTop + dy));
        trigger.style.left = `${newLeft}px`;
        trigger.style.top = `${newTop}px`;
        trigger.style.bottom = 'auto';
        trigger.style.right = 'auto';
      }
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    trigger.addEventListener('mousedown', onStart);
    trigger.addEventListener('touchstart', onStart, { passive: true });
    trigger.addEventListener(
      'click',
      (e) => {
        if (hasMoved) {
          e.stopImmediatePropagation();
          e.preventDefault();
          hasMoved = false;
        }
      },
      true
    );
  }

  setupTriggerDraggable();

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  function toggleSettingsDrawer(show) {
    const isVisible = settingsDrawer.style.display !== 'none';
    const nextState = show !== undefined ? show : !isVisible;
    settingsDrawer.style.display = nextState ? 'block' : 'none';
    if (nextState) {
      modal.classList.add('in-settings');
    } else {
      modal.classList.remove('in-settings');
      setTimeout(checkScrollPosition, 100);
    }
  }

  apiBtn.addEventListener('click', () => toggleSettingsDrawer());
  if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', () => toggleSettingsDrawer(false));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleSettingsDrawer(false));

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

  providerSelect.addEventListener('change', (e) => updateProviderGuide(e.target.value));

  apiKeyInput.addEventListener('input', (e) => {
    const detected = detectProviderFromKey(e.target.value);
    if (detected && detected !== providerSelect.value) {
      providerSelect.value = detected;
      updateProviderGuide(detected);
    }
  });

  toggleVisBtn.addEventListener('click', () => {
    const isPass = apiKeyInput.type === 'password';
    apiKeyInput.type = isPass ? 'text' : 'password';
    toggleVisBtn.textContent = isPass ? '🙈' : '👁️';
  });

  saveKeyBtn.addEventListener('click', async () => {
    const key = apiKeyInput.value.trim();
    const provider = providerSelect.value || 'openrouter';
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
      clearKeyBtn.style.display = 'inline-block';

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

  clearKeyBtn.addEventListener('click', () => {
    removeStoredConfig();
    apiKeyInput.value = '';
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

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    handleSendMessage(text);
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
    if (label) label.textContent = isEn ? 'Free Auto-Router • No Key Needed' : 'يعمل مجانًا • توجيه حسب التخصص';
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

async function handleSendMessage(userText) {
  const messagesContainer = document.getElementById('bot-messages-container');

  appendMessage('user', userText);
  const typingId = appendTypingIndicator();
  messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });

  const config = getStoredConfig();
  const isEn = getLang() === 'en';
  const lang = isEn ? 'en' : 'ar';
  const detectedSpecialty = detectSpecialtyClient(userText, selectedSpecialty);
  const spMeta = SPECIALISTS[detectedSpecialty] || SPECIALISTS.general;

  // 1. Optional Personal Key Path (only if user configured their own key)
  if (config.key) {
    try {
      const responseText = await queryUniversalAi(userText, config.provider, config.key, detectedSpecialty);
      removeTypingIndicator(typingId);
      const matchedSkills = extractMatchedSkills(userText, responseText);
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
    const serverAdvisor = await callServerFreeAdvisor(userText, lang, selectedSpecialty);
    if (serverAdvisor?.reply) {
      removeTypingIndicator(typingId);
      const matchedSkills = extractMatchedSkills(userText, serverAdvisor.reply);
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
  const localResult = queryLocalSpecialistEngine(userText, detectedSpecialty);
  setTimeout(() => {
    removeTypingIndicator(typingId);
    appendAssistantResponse(localResult);
  }, 180);
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
    .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.08); padding: 1px 4px; border-radius: 4px; font-size: 0.9em; font-family: monospace;">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">$1</a>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
