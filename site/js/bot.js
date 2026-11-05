/**
 * bot.js - Universal Multi-Provider AI Skills Advisor
 * Supports: Google Gemini, Anthropic Claude, OpenAI, OpenRouter, Groq, DeepSeek
 * 
 * Features:
 * 1. Multi-Provider Freedom: Choose any AI model (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5/2.0, DeepSeek V3, Llama 3.3).
 * 2. 100% Free Gemini Default: Gemini is highlighted as the 100% free, no-credit-card default for easy testing.
 * 3. 100% Client-Side Privacy: All keys are stored strictly in localStorage and never saved to any database.
 * 4. Auto-Detection: Automatically detects provider type from key prefixes (sk-ant-, sk-or-, gsk_, AIzaSy...).
 * 5. Direct Browser Connection with Zero-Logging Relay Fallback.
 * 6. Code & Documentation Inspection + 1-Click Interactive Skill Recommendation Cards.
 * 7. Offline Local Semantic Search Fallback when no API key is set.
 */

import { normalizeArabic } from './search.js';
import { getLang, formatUrlWithLang } from './i18n.js';

let skillsCatalog = [];

const PROVIDERS = {
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    badgeAr: 'مجاني 100% (الافتراضي) 🌟',
    badgeEn: '100% Free (Default) 🌟',
    model: 'gemini-1.5-flash',
    placeholder: 'AIzaSy...',
    guideUrl: 'https://aistudio.google.com/app/apikey',
    guideName: 'Google AI Studio',
    stepAr: 'افتح Google AI Studio واضغط Create API Key (مجاني تماماً)',
    stepEn: 'Open Google AI Studio and click Create API Key (100% Free)',
    prefixPattern: /^AIzaSy/
  },
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    badgeAr: 'الأقوى في البرمجة 🟣',
    badgeEn: 'Best for Code 🟣',
    model: 'claude-3-5-sonnet-20241022',
    placeholder: 'sk-ant-api03-...',
    guideUrl: 'https://console.anthropic.com/settings/keys',
    guideName: 'Anthropic Console',
    stepAr: 'افتح console.anthropic.com وانسخ مفتاحك (يبدأ بـ sk-ant...)',
    stepEn: 'Open console.anthropic.com and copy your key (starts with sk-ant...)',
    prefixPattern: /^sk-ant/
  },
  openai: {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    badgeAr: 'GPT-4o 🟢',
    badgeEn: 'GPT-4o 🟢',
    model: 'gpt-4o-mini',
    placeholder: 'sk-proj-... / sk-...',
    guideUrl: 'https://platform.openai.com/api-keys',
    guideName: 'OpenAI Platform',
    stepAr: 'افتح platform.openai.com وأنشئ مفتاحاً جديداً (يبدأ بـ sk-...)',
    stepEn: 'Open platform.openai.com and create a key (starts with sk-...)',
    prefixPattern: /^sk-(proj-)?[A-Za-z0-9_-]{20,}/
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter (كل الموديلات)',
    nameEn: 'OpenRouter (All Models)',
    badgeAr: 'مفتاح شامل 🔴',
    badgeEn: 'All-in-1 Key 🔴',
    model: 'anthropic/claude-3.5-sonnet',
    placeholder: 'sk-or-v1-...',
    guideUrl: 'https://openrouter.ai/keys',
    guideName: 'OpenRouter Keys',
    stepAr: 'افتح openrouter.ai/keys لإنشاء مفتاح شامل يفتح كل الموديلات',
    stepEn: 'Open openrouter.ai/keys to create an all-in-1 key for all models',
    prefixPattern: /^sk-or/
  },
  groq: {
    id: 'groq',
    name: 'Groq (سريع ومجاني)',
    nameEn: 'Groq (Ultra-Fast & Free)',
    badgeAr: 'سرعة فائقة ⚡',
    badgeEn: 'Ultra Fast ⚡',
    model: 'llama-3.3-70b-versatile',
    placeholder: 'gsk_...',
    guideUrl: 'https://console.groq.com/keys',
    guideName: 'Groq Console',
    stepAr: 'افتح console.groq.com للحصول على مفتاح مجاني فائق السرعة',
    stepEn: 'Open console.groq.com to get a free, ultra-fast Llama 3.3 key',
    prefixPattern: /^gsk_/
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
    stepAr: 'افتح platform.deepseek.com وانسخ مفتاحك البرمجي',
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
      if (key.startsWith('sk-ant')) provider = 'claude';
      else if (key.startsWith('sk-or')) provider = 'openrouter';
      else if (key.startsWith('gsk_')) provider = 'groq';
      else if (key.startsWith('AIzaSy')) provider = 'gemini';
      else provider = 'gemini';
    }
    return {
      key: key.trim(),
      provider: provider || 'gemini'
    };
  } catch {
    return { key: '', provider: 'gemini' };
  }
}

function setStoredConfig(provider, key) {
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key.trim());
      localStorage.setItem(STORAGE_PROVIDER, provider || 'gemini');
      // Sync legacy key
      if (provider === 'gemini') {
        localStorage.setItem('gemini_api_key', key.trim());
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('gemini_api_key');
      localStorage.removeItem(STORAGE_PROVIDER);
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

export function initAiBot(skills = []) {
  if (Array.isArray(skills) && skills.length > 0) {
    skillsCatalog = skills;
  }

  // Prevent double injection
  if (document.getElementById('ai-bot-trigger')) return;

  const isEn = getLang() === 'en';
  const config = getStoredConfig();
  const hasKey = Boolean(config.key);
  const activeProvider = PROVIDERS[config.provider] || PROVIDERS.gemini;

  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'ai-bot-root';
  widgetContainer.innerHTML = `
    <!-- Floating Trigger Pill Button -->
    <button id="ai-bot-trigger" class="ai-bot-trigger" aria-label="${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}" title="${isEn ? 'Ask AI Skills Assistant' : 'اسأل مساعد المهارات الذكي'}">
      <span class="bot-trigger-pulse"></span>
      <span class="bot-trigger-icon" aria-hidden="true">✨</span>
      <span class="bot-trigger-text">${isEn ? 'Skills Assistant' : 'مساعد المهارات'}</span>
    </button>

    <!-- Floating Chat Modal / Drawer -->
    <div id="ai-bot-modal" class="ai-bot-modal" aria-hidden="true">
      
      <!-- Bot Header (Draggable) -->
      <div class="bot-header" id="bot-header">
        <div class="bot-header-info">
          <span class="bot-drag-handle" id="bot-drag-handle" title="${isEn ? 'Drag to move window anywhere (Double-click to reset)' : 'اسحب لتحريك النافذة في أي مكان (انقر مرتين لإعادتها للوضع الأصلي)'}">⠿</span>
          <img src="assets/logo.png" alt="Assistant Logo" class="bot-avatar-img" width="28" height="28">
          <div>
            <div class="bot-title">${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}</div>
            <div class="bot-subtitle">
              <span class="bot-live-dot ${hasKey ? 'bot-live-gemini' : ''}"></span>
              <span id="bot-engine-label">${
                hasKey 
                  ? `${isEn ? (activeProvider.nameEn || activeProvider.name) : activeProvider.name} (Active ✨)` 
                  : (isEn ? 'Local Search (Add AI Key ⚡)' : 'بحث محلي (اضغط 🔑 لتفعيل الذكاء الاصطناعي)')
              }</span>
            </div>
          </div>
        </div>
        <div class="bot-header-actions">
          <button id="bot-api-btn" class="bot-api-btn ${hasKey ? 'has-key' : ''}" title="${isEn ? 'Configure API Key (Claude, OpenAI, Gemini...)' : 'إعداد مفتاح API (كلود، ChatGPT، جيميناي...)'}" type="button">
            🔑 <span id="bot-api-btn-text">${hasKey ? (isEn ? 'AI Active ✓' : 'المفتاح نشط ✓') : (isEn ? 'Set API Key' : 'مفتاح API')}</span>
          </button>
          <button id="bot-expand-btn" class="bot-icon-btn" title="${isEn ? 'Maximize / Restore Window' : 'تكبير / استعادة حجم النافذة'}" aria-label="${isEn ? 'Maximize' : 'تكبير'}" type="button">⤢</button>
          <button id="bot-close-btn" class="bot-icon-btn" title="${isEn ? 'Close Chat' : 'إغلاق المحادثة'}" aria-label="${isEn ? 'Close' : 'إغلاق'}" type="button">✕</button>
        </div>
      </div>

      <!-- Expandable API Key Settings Drawer -->
      <div id="bot-settings-drawer" class="bot-settings-drawer" style="display: none;">
        <div class="bot-settings-header">
          <span class="bot-settings-title">🔑 ${isEn ? 'Connect Any AI Provider (Claude, OpenAI, Gemini...)' : 'ربط أي ذكاء اصطناعي (Claude, ChatGPT, Gemini...)'}</span>
          <span class="bot-settings-badge" id="bot-settings-badge">${isEn ? activeProvider.badgeEn : activeProvider.badgeAr}</span>
        </div>

        <!-- Explanatory Callout: Why Gemini is free default but any key is allowed -->
        <div class="bot-free-gemini-callout">
          ${isEn 
            ? '💡 <strong>Why is Google Gemini the default?</strong> We defaulted to Gemini because it is <strong>100% free with no credit card required</strong> so anyone can test the assistant instantly. <strong>However, you have full freedom:</strong> Select and securely use your personal API key from Claude, OpenAI, DeepSeek, Groq, or OpenRouter with zero server logging!'
            : '💡 <strong>لماذا وضعنا Google Gemini أولاً؟</strong> اخترنا جيميناي كخيار افتراضي لأنه <strong>مجاني 100% بدون أي تكاليف أو فيزا</strong> حتى يتمكن الجميع من تجربة المساعد فوراً. <strong>ولكنك حر تماماً:</strong> يمكنك اختيار واستخدام مفتاحك الخاص من Claude أو OpenAI أو DeepSeek أو Groq أو OpenRouter بأمان تام وخصوصية 100%!'}
        </div>

        <!-- Provider Selector -->
        <div class="bot-provider-select-row">
          <div class="bot-provider-label">
            <span>${isEn ? 'Select AI Provider:' : 'اختر مزود الذكاء الاصطناعي:'}</span>
            <span style="font-size: 10px; color: var(--color-iris-violet); font-weight: normal;">${isEn ? '(Auto-detects on paste)' : '(يكتشف النوع تلقائياً عند اللصق)'}</span>
          </div>
          <select id="bot-provider-select" class="bot-provider-select">
            <option value="gemini" ${config.provider === 'gemini' ? 'selected' : ''}>🌟 Google Gemini (مجاني 100% - الافتراضي)</option>
            <option value="claude" ${config.provider === 'claude' ? 'selected' : ''}>🟣 Anthropic Claude (Claude 3.5 Sonnet)</option>
            <option value="openai" ${config.provider === 'openai' ? 'selected' : ''}>🟢 OpenAI (ChatGPT - GPT-4o)</option>
            <option value="openrouter" ${config.provider === 'openrouter' ? 'selected' : ''}>🔴 OpenRouter (جميع النماذج بمفتاح واحد)</option>
            <option value="groq" ${config.provider === 'groq' ? 'selected' : ''}>⚡ Groq (Llama 3.3 70B - سرعة فائقة ومجاني)</option>
            <option value="deepseek" ${config.provider === 'deepseek' ? 'selected' : ''}>🐋 DeepSeek (DeepSeek V3 / Coder)</option>
          </select>
        </div>

        <!-- Dynamic Step Guide Box -->
        <div class="bot-api-steps-box" id="bot-dynamic-steps-box">
          <div class="bot-api-step">
            <span class="bot-step-num">1</span>
            <span id="bot-step-guide-text">${isEn ? activeProvider.stepEn : activeProvider.stepAr}</span>
          </div>
          <a href="${activeProvider.guideUrl}" target="_blank" rel="noopener noreferrer" class="bot-api-studio-link" id="bot-provider-link">
            🔗 ${activeProvider.guideName} ↗
          </a>
          <div class="bot-api-step">
            <span class="bot-api-step-num">2</span>
            <span>${isEn ? 'Paste your API key below and click <strong>Save & Activate</strong>:' : 'الصق المفتاح بالأسفل واضغط <strong>حفظ وتفعيل</strong>:'}</span>
          </div>
        </div>

        <!-- Key Input Row -->
        <div class="bot-api-input-wrap">
          <input 
            type="password" 
            id="bot-api-key-input" 
            placeholder="${activeProvider.placeholder}" 
            value="${escapeAttr(config.key)}"
            autocomplete="off"
            aria-label="${isEn ? 'API Key' : 'مفتاح API'}"
          >
          <button type="button" id="bot-toggle-key-visibility" class="bot-key-vis-btn" title="${isEn ? 'Show/Hide' : 'إظهار/إخفاء'}">👁️</button>
        </div>

        <!-- Status Message -->
        <div id="bot-settings-status" class="bot-settings-status" style="display: none;"></div>

        <!-- Action Buttons -->
        <div class="bot-api-actions-row">
          <button type="button" id="bot-save-key-btn" class="bot-save-btn">${isEn ? 'Save & Activate ✨' : 'حفظ وتفعيل ✨'}</button>
          <button type="button" id="bot-clear-key-btn" class="bot-clear-btn" style="${hasKey ? '' : 'display: none;'}">${isEn ? 'Remove Key' : 'حذف المفتاح'}</button>
          <button type="button" id="bot-cancel-settings-btn" class="bot-cancel-btn">${isEn ? 'Close' : 'إغلاق'}</button>
        </div>

        <!-- Transparent Privacy & Security Guarantee -->
        <div class="bot-privacy-trust-box">
          <div class="bot-privacy-trust-header">
            <span>🛡️</span>
            <span>${isEn 
              ? '100% Personal Privacy — Nobody Can See Your API Key' 
              : 'أمان وخصوصية 100% — مفتاحك محفوظ عندك شخصياً ولا يمكن لأحد رؤيته'}</span>
          </div>
          <div class="bot-privacy-trust-body">
            <div>
              <strong>${isEn ? 'Where is it saved?' : 'أين يُحفظ المفتاح؟'}</strong> 
              ${isEn 
                ? 'Strictly inside your browser\'s local sandbox (<code>localStorage</code>) on your own device, like a local password.' 
                : 'يُحفظ مشفراً داخل متصفحك الشخصي فقط (تقنية <code>localStorage</code>) على جهازك أنت، تماماً مثل كلمة مرور محلية.'}
            </div>
            <div>
              <strong>${isEn ? 'Why can no one see it?' : 'لماذا لا يستطيع أحد (ولا حتى صاحب الموقع) رؤيته؟'}</strong> 
              ${isEn 
                ? 'The site runs on pure client-side architecture. Encrypted requests go directly from your browser to AI servers. We have zero databases, zero key tracking, and zero server logging.' 
                : 'لأن الموقع مبني بمعمارية المتصفح المباشر (Client-Side). يخرج الطلب مشفراً من متصفحك مباشرة إلى شركة الذكاء الاصطناعي. لا توجد لدينا أي قاعدة بيانات لتخزين المفاتيح ولا يتم تسجيل أي مفتاح في أي سيرفر نهائياً.'}
            </div>
            <div>
              <strong>${isEn ? 'How to verify?' : 'كيف تتأكد بنفسك؟'}</strong> 
              ${isEn 
                ? 'This project is 100% open-source on <a href="https://github.com/SayedGameaSayed/top-100-agent-skills" target="_blank" class="bot-privacy-trust-link">GitHub</a>. You can inspect the code anytime, and remove your key with 1 click.' 
                : 'المشروع مفتوح المصدر 100% على <a href="https://github.com/SayedGameaSayed/top-100-agent-skills" target="_blank" class="bot-privacy-trust-link">GitHub</a>، ويمكن لأي مبرمج فحص الكود بنفسه للتأكد. كما يمكنك حذف المفتاح بضغطة زر واحدة في أي لحظة.'}
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages Container -->
      <div id="bot-messages-container" class="bot-messages">
        
        <!-- Welcome Message -->
        <div class="bot-msg bot-msg-assistant">
          <div class="bot-msg-bubble">
            ${isEn 
              ? '👋 Hello! I am your <strong>Universal AI Skills Advisor</strong>.<br><br>💡 <strong>Feel free to paste your code, project README, or architecture description:</strong><br>I will analyze your stack and recommend the exact skills you need — both from our <strong>Top 100 Verified Catalog</strong> and <strong>from the broader AI ecosystem</strong>. For every skill, I will explain what it does, why it fits your project, and how to use it!' 
              : '👋 أهلاً بك! أنا <strong>مستشارك الذكي لمهارات وأدوات الذكاء الاصطناعي</strong>.<br><br>💡 <strong>يمكنك إرسال فكرتك، كود مشروعك، أو ملف الـ README بالكامل:</strong><br>سأقوم بتحليل بيئة عملك واقتراح أفضل المهارات المناسبة لك بدقة — سواء كانت من ضمن <strong>أفضل 100 مهارة في الدليل</strong> أو <strong>حلول وأدوات ذكية من خارج الدليل</strong>، مع شرح دقيق لوظيفة كل أداة وكيف تفيدك عملياً في مشروعك!'}
          </div>
        </div>

        <!-- Promo Banner if NO Key is set -->
        <div id="bot-welcome-promo" class="bot-welcome-promo" style="${hasKey ? 'display: none;' : ''}">
          <div class="bot-promo-title">✨ ${isEn ? 'Unlock Conversational AI Intelligence:' : 'تفعيل الذكاء الكامل عبر الموديلات الذكية:'}</div>
          <p class="bot-promo-desc">
            ${isEn 
              ? 'Currently in offline local search mode. Connect your key (Try Google Gemini for 100% free, or use Claude, OpenAI, DeepSeek, or Groq) to unlock deep code & documentation analysis!' 
              : 'يعمل المساعد حالياً بالبحث المحلي السريع. اربط مفتاحك (جرب Google Gemini مجاناً 100% بدون فيزا، أو استخدم Claude أو ChatGPT أو DeepSeek أو Groq) لتشريح كودك واقتراح مهارات ذكية!'}
          </p>
          <button type="button" id="bot-open-setup-from-banner" class="bot-promo-btn">
            🔑 ${isEn ? 'Choose Provider & Enter Key (1-Min)' : 'اختيار المزود وإدخال المفتاح (في دقيقة)'}
          </button>
        </div>

        <!-- Quick Suggestion Chips -->
        <div class="bot-chips-container" id="bot-quick-chips">
          ${isEn ? `
            <button class="bot-chip" data-query="Analyze my project code and recommend matching agent skills">💻 Analyze my Code & Stack</button>
            <button class="bot-chip" data-query="Suggest skills for my project README and architecture">📄 Suggest for README / Docs</button>
            <button class="bot-chip" data-query="What are the best agent skills and tools beyond the top 100 directory?">🌐 Discover Tools beyond Top 100</button>
            <button class="bot-chip" data-query="Subagent driven development and automated task planning">⚡ Auto Task Planning & Subagents</button>
          ` : `
            <button class="bot-chip" data-query="حلل كود مشروعي واقترح أفضل المهارات المناسبة له">💻 تحليل الكود واقتراح مهارات</button>
            <button class="bot-chip" data-query="اقترح مهارات مناسبة لملف الـ README وتوثيق مشروعي">📄 اقتراحات لملف الـ README</button>
            <button class="bot-chip" data-query="ما هي أفضل الأدوات والمهارات الذكية من خارج الـ 100 سكيلز؟">🌐 مهارات من خارج الـ 100</button>
            <button class="bot-chip" data-query="تقسيم المهام وأتمتة العمل عبر الوكلاء الأذكياء">⚡ تقسيم وأتمتة المهام</button>
          `}
        </div>
      </div>

      <!-- Floating Scroll to Bottom Button -->
      <button id="bot-scroll-bottom-btn" class="bot-scroll-bottom-btn" type="button" aria-label="${isEn ? 'Scroll down to latest' : 'التمرير لأسفل المحادثة'}" title="${isEn ? 'Scroll to latest messages' : 'الانتقال لآخر الرسائل'}">
        <span class="bot-scroll-icon">↓</span>
        <span class="bot-scroll-text">${isEn ? 'Latest Messages' : 'آخر الرسائل'}</span>
      </button>

      <!-- Chat Input Area -->
      <form id="bot-input-form" class="bot-input-form">
        <textarea 
          id="bot-input-text" 
          class="bot-input-field" 
          rows="1"
          placeholder="${isEn ? 'Paste code, project docs, or describe your goal...' : 'الصق كوداً، أو ملف README، أو اسأل عن أي مهارة تناسب مشروعك...'}"
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
  const chipsContainer = document.getElementById('bot-quick-chips');
  const messagesContainer = document.getElementById('bot-messages-container');
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');

  const apiBtn = document.getElementById('bot-api-btn');
  const settingsDrawer = document.getElementById('bot-settings-drawer');
  const providerSelect = document.getElementById('bot-provider-select');
  const saveKeyBtn = document.getElementById('bot-save-key-btn');
  const clearKeyBtn = document.getElementById('bot-clear-key-btn');
  const cancelSettingsBtn = document.getElementById('bot-cancel-settings-btn');
  const apiKeyInput = document.getElementById('bot-api-key-input');
  const toggleVisBtn = document.getElementById('bot-toggle-key-visibility');
  const bannerSetupBtn = document.getElementById('bot-open-setup-from-banner');
  const badgeEl = document.getElementById('bot-settings-badge');
  const stepTextEl = document.getElementById('bot-step-guide-text');
  const linkEl = document.getElementById('bot-provider-link');
  const isEn = getLang() === 'en';

  // Helper: Smooth scroll to bottom & manage scroll button visibility
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

  // Check scroll position to display the floating down button
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
    scrollBottomBtn.addEventListener('click', () => {
      scrollToBottom(true);
    });
  }

  // Toggle modal open/close
  trigger.addEventListener('click', () => {
    const isOpen = modal.classList.contains('active');
    if (isOpen) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    } else {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      input.focus();
      setTimeout(() => {
        checkScrollPosition();
      }, 150);
    }
  });

  // Expand / Maximize modal toggle
  if (expandBtn) {
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = modal.classList.toggle('expanded');
      expandBtn.textContent = isExpanded ? '🗗' : '⤢';
      expandBtn.title = isExpanded 
        ? (isEn ? 'Restore Window Size' : 'استعادة الحجم الأصلي') 
        : (isEn ? 'Maximize Window' : 'تكبير النافذة');
      
      if (modal.style.top) {
        clampModalInViewport();
      }
      setTimeout(checkScrollPosition, 200);
    });
  }

  // Keep modal bounded within viewport boundaries
  function clampModalInViewport() {
    const rect = modal.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const maxLeft = Math.max(8, winWidth - rect.width - 8);
    const maxTop = Math.max(8, winHeight - rect.height - 8);
    const clampedLeft = Math.max(8, Math.min(maxLeft, rect.left));
    const clampedTop = Math.max(8, Math.min(maxTop, rect.top));
    modal.style.left = `${clampedLeft}px`;
    modal.style.top = `${clampedTop}px`;
    modal.style.bottom = 'auto';
    modal.style.right = 'auto';
  }

  // 1. Draggable Modal Window Implementation
  function setupModalDraggable() {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      // Don't drag when interacting with buttons, inputs, links, or select
      if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('select')) {
        return;
      }

      isDragging = true;
      modal.classList.add('is-dragging');

      const rect = modal.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      // Switch from bottom/left fixed coordinates to explicit px top/left
      modal.style.top = `${initialTop}px`;
      modal.style.left = `${initialLeft}px`;
      modal.style.bottom = 'auto';
      modal.style.right = 'auto';
      modal.style.transform = 'none';

      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      startX = clientX;
      startY = clientY;

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      if (clientX === undefined || clientY === undefined) return;

      const dx = clientX - startX;
      const dy = clientY - startY;

      const modalWidth = modal.offsetWidth;
      const modalHeight = modal.offsetHeight;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const newLeft = Math.max(8, Math.min(winWidth - modalWidth - 8, initialLeft + dx));
      const newTop = Math.max(8, Math.min(winHeight - modalHeight - 8, initialTop + dy));

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

      // Double click header to reset to original default corner position
      header.addEventListener('dblclick', (e) => {
        if (e.target.closest('button')) return;
        resetModalPosition();
      });
    }

    function resetModalPosition() {
      modal.style.left = '';
      modal.style.top = '';
      modal.style.bottom = '';
      modal.style.right = '';
      modal.style.transform = '';
      modal.classList.remove('expanded');
      if (expandBtn) expandBtn.textContent = '⤢';
    }

    window.addEventListener('resize', () => {
      if (modal.style.top) {
        clampModalInViewport();
      }
    });
  }

  setupModalDraggable();

  // 2. Draggable Trigger Pill Implementation
  function setupTriggerDraggable() {
    let isDragging = false;
    let hasMoved = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onStart = (e) => {
      isDragging = true;
      hasMoved = false;
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      startX = clientX;
      startY = clientY;

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
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      if (clientX === undefined || clientY === undefined) return;

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault();
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const newLeft = Math.max(10, Math.min(winWidth - trigger.offsetWidth - 10, initialLeft + dx));
        const newTop = Math.max(10, Math.min(winHeight - trigger.offsetHeight - 10, initialTop + dy));
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

    trigger.addEventListener('click', (e) => {
      if (hasMoved) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hasMoved = false;
      }
    }, true);
  }

  setupTriggerDraggable();

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  // Toggle Settings Drawer
  function toggleSettingsDrawer(show) {
    const isVisible = settingsDrawer.style.display !== 'none';
    const nextState = show !== undefined ? show : !isVisible;
    settingsDrawer.style.display = nextState ? 'block' : 'none';
    if (nextState) {
      modal.classList.add('in-settings');
      apiKeyInput.focus();
    } else {
      modal.classList.remove('in-settings');
      setTimeout(checkScrollPosition, 100);
    }
  }

  apiBtn.addEventListener('click', () => toggleSettingsDrawer());
  cancelSettingsBtn.addEventListener('click', () => toggleSettingsDrawer(false));
  if (bannerSetupBtn) {
    bannerSetupBtn.addEventListener('click', () => toggleSettingsDrawer(true));
  }

  // Update step guide based on selected provider
  function updateProviderGuide(providerId) {
    const p = PROVIDERS[providerId] || PROVIDERS.gemini;
    const isEn = getLang() === 'en';
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

  providerSelect.addEventListener('change', (e) => {
    updateProviderGuide(e.target.value);
  });

  // Auto-detection when pasting or typing key
  apiKeyInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const detected = detectProviderFromKey(val);
    if (detected && detected !== providerSelect.value) {
      providerSelect.value = detected;
      updateProviderGuide(detected);
    }
  });

  // Toggle Password Visibility
  toggleVisBtn.addEventListener('click', () => {
    const isPass = apiKeyInput.type === 'password';
    apiKeyInput.type = isPass ? 'text' : 'password';
    toggleVisBtn.textContent = isPass ? '🙈' : '👁️';
  });

  // Save API Key
  saveKeyBtn.addEventListener('click', async () => {
    const key = apiKeyInput.value.trim();
    const provider = providerSelect.value || 'gemini';
    const statusEl = document.getElementById('bot-settings-status');
    const isEn = getLang() === 'en';
    const p = PROVIDERS[provider] || PROVIDERS.gemini;

    if (!key) {
      statusEl.style.display = 'block';
      statusEl.className = 'bot-settings-status error';
      statusEl.textContent = isEn ? 'Please paste a valid API key.' : 'يرجى لصق مفتاح API أولاً.';
      return;
    }

    statusEl.style.display = 'block';
    statusEl.className = 'bot-settings-status';
    statusEl.textContent = isEn ? `Testing connection with ${p.name}...` : `جاري التحقق من المفتاح مع ${p.name}...`;

    try {
      await testApiKey(provider, key);
      setStoredConfig(provider, key);
      statusEl.className = 'bot-settings-status success';
      statusEl.textContent = isEn ? `✓ Connected to ${p.name} successfully!` : `✓ تم التحقق وتفعيل ${p.name} بنجاح!`;

      updateBotStatusUI(true, provider);
      clearKeyBtn.style.display = 'inline-block';
      const welcomePromo = document.getElementById('bot-welcome-promo');
      if (welcomePromo) welcomePromo.style.display = 'none';

      setTimeout(() => {
        toggleSettingsDrawer(false);
        statusEl.style.display = 'none';
        appendMessage('assistant', isEn 
          ? `🎉 <strong>${p.name} is now active!</strong> You can now paste your code, project docs, or ask for any skill from inside or outside the catalog.` 
          : `🎉 <strong>تم تفعيل ${p.name} بنجاح!</strong> يمكنك الآن إرسال كودك أو ملف الـ README وسأقترح عليك أفضل المهارات من داخل وخارج الدليل مع شرحها بالكامل.`
        );
      }, 1200);
    } catch (err) {
      statusEl.className = 'bot-settings-status error';
      statusEl.textContent = isEn 
        ? `⚠️ Connection failed: ${err.message}. Please check your key.` 
        : `⚠️ تعذر التحقق من المفتاح: ${err.message}. يرجى مراجعة المفتاح أو الرصيد.`;
    }
  });

  // Clear API Key
  clearKeyBtn.addEventListener('click', () => {
    const isEn = getLang() === 'en';
    removeStoredConfig();
    apiKeyInput.value = '';
    updateBotStatusUI(false);
    clearKeyBtn.style.display = 'none';
    const statusEl = document.getElementById('bot-settings-status');
    statusEl.style.display = 'block';
    statusEl.className = 'bot-settings-status';
    statusEl.textContent = isEn ? 'Key removed. Reverted to local search.' : 'تم حذف المفتاح والعودة للبحث المحلي.';
    const welcomePromo = document.getElementById('bot-welcome-promo');
    if (welcomePromo) welcomePromo.style.display = 'block';
    setTimeout(() => {
      toggleSettingsDrawer(false);
      statusEl.style.display = 'none';
    }, 1200);
  });

  // Handle textarea enter & auto resize
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

  // Quick Chips click
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.bot-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        input.value = query;
        handleSendMessage(query);
      }
    });
  }

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    handleSendMessage(text);
  });
}

function updateBotStatusUI(hasKey, providerId = 'gemini') {
  const isEn = getLang() === 'en';
  const label = document.getElementById('bot-engine-label');
  const dot = document.querySelector('.bot-live-dot');
  const btn = document.getElementById('bot-api-btn');
  const btnText = document.getElementById('bot-api-btn-text');
  const p = PROVIDERS[providerId] || PROVIDERS.gemini;

  if (hasKey) {
    const name = isEn ? (p.nameEn || p.name) : p.name;
    if (label) label.textContent = `${name} (Active ✨)`;
    if (dot) dot.classList.add('bot-live-gemini');
    if (btn) btn.classList.add('has-key');
    if (btnText) btnText.textContent = isEn ? 'AI Active ✓' : 'المفتاح نشط ✓';
  } else {
    if (label) label.textContent = isEn ? 'Local Search (Add AI Key ⚡)' : 'بحث محلي (اضغط 🔑 لتفعيل الذكاء الاصطناعي)';
    if (dot) dot.classList.remove('bot-live-gemini');
    if (btn) btn.classList.remove('has-key');
    if (btnText) btnText.textContent = isEn ? 'Set API Key' : 'مفتاح API';
  }
}

async function handleSendMessage(userText) {
  const messagesContainer = document.getElementById('bot-messages-container');
  const chipsContainer = document.getElementById('bot-quick-chips');
  if (chipsContainer) {
    chipsContainer.style.display = 'none';
  }

  // Append user bubble
  appendMessage('user', userText);

  // Append typing indicator
  const typingId = appendTypingIndicator();
  messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });

  const config = getStoredConfig();
  const isEn = getLang() === 'en';

  // 1. If API Key is present, call configured AI provider
  if (config.key) {
    try {
      const responseText = await queryUniversalAi(userText, config.provider, config.key);
      removeTypingIndicator(typingId);

      // Extract matching skills to render interactive cards
      const matchedSkills = extractMatchedSkills(userText, responseText);

      appendAssistantResponse({
        reply: responseText,
        recommendedSkills: matchedSkills,
        engine: config.provider
      });
      return;
    } catch (err) {
      console.warn('AI call failed, falling back to local search:', err);
      removeTypingIndicator(typingId);

      // If key is invalid or rate limited, notify user gracefully
      const localResult = queryLocalSearchEngine(userText);
      const providerName = (PROVIDERS[config.provider] || {}).name || config.provider;
      appendAssistantResponse({
        reply: (isEn 
          ? `⚠️ *${providerName} Notice: ${err.message}*\n\nSwitched automatically to local catalog matcher:\n\n` 
          : `⚠️ *تنبيه من ${providerName}: ${err.message}*\n\nتم التبديل تلقائياً للبحث المحلي الموثق:\n\n`) + localResult.reply,
        recommendedSkills: localResult.recommendedSkills,
        engine: 'local-fallback',
        showKeySetupPrompt: true
      });
      return;
    }
  }

  // 2. Otherwise use the Local Semantic Engine
  try {
    const response = queryLocalSearchEngine(userText);
    setTimeout(() => {
      removeTypingIndicator(typingId);
      appendAssistantResponse({
        ...response,
        showKeySetupPrompt: true
      });
    }, 200);
  } catch (err) {
    removeTypingIndicator(typingId);
    appendMessage(
      'assistant',
      isEn 
        ? 'Sorry, an error occurred while processing. Please try again or use the main search bar.'
        : 'عذراً، حدث خطأ أثناء معالجة السؤال. يمكنك المحاولة مجدداً أو البحث مباشرة في شريط البحث أعلى الموقع.'
    );
    console.error('Bot Error:', err);
  }

  messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');
  if (scrollBottomBtn) scrollBottomBtn.classList.remove('visible');
}

/**
 * Universal AI Caller: Dispatches to Gemini, Claude, OpenAI, OpenRouter, Groq, or DeepSeek
 */
async function queryUniversalAi(userText, provider, apiKey) {
  const isEn = getLang() === 'en';

  // Build full catalog context for grounding across all 100 skills
  const catalogContext = skillsCatalog.map((s) => {
    const title = isEn ? (s.title_en || s.name) : (s.title_ar || s.name);
    const cat = isEn ? (s.category || '') : (s.category_ar || s.category || '');
    const summary = isEn ? (s.summary_en || s.summary_ar) : s.summary_ar;
    return `- [${s.id}] (${cat}) "${title}": ${summary ? summary.slice(0, 100) : ''}`;
  }).join('\n');

  const systemInstruction = isEn
    ? `You are the principal AI Skills Advisor for the "Top 100 Agent Skills" open-source platform.
Your expertise is analyzing developer code, architecture documentation, README files, and real-world engineering problems to recommend the highest-leverage AI skills and tools.

Core Directives:
1. Tech & Architecture Analysis: When the user shares code, a README, or technical requirements, analyze their stack (languages, frameworks, DB, pipelines) and identify key pain points or bottlenecks.
2. Verified In-Catalog Skills: Recommend the most fitting skills from the "Top 100 Agent Skills" verified directory. When referencing a skill from the directory, ALWAYS include its exact ID in brackets like [docx] or [systematic-debugging] or [writing-plans] so our UI can generate an interactive action card for it.
3. Wider Ecosystem & External Skills: If the user's project needs capabilities NOT found within the 100 directory (for instance: specialized ML pipelines, external agent frameworks like LangGraph/CrewAI, browser automation, specific cloud APIs, or MCP servers), proactively recommend the best external tools/skills from the broader AI ecosystem.
4. For EACH skill/tool recommended (whether in the 100 catalog or external), clearly explain:
   - What it does (Role & core capabilities)
   - Why & Where to use it in their specific project/code
   - Actionable Prompt or Command (Ready-to-use prompt template or CLI syntax)
5. Keep answers well-structured with clear markdown headings, bullet points, and code blocks. Always respond in English.`
    : `أنت المستشار الذكي المتخصص لدليل "أفضل 100 مهارة ذكاء اصطناعي" (Top 100 Agent Skills) مفتوح المصدر.
خبرتك تكمن في تحليل كود المطورين، ملفات التوثيق (README)، معمارية المشاريع، والتحديات البرمجية الحقيقية لاقتراح المهارات والأدوات الأكثر كفاءة.

التوجيهات الأساسية:
1. تحليل الكود والمشروع: عندما يرسل المستخدم كوداً أو ملف README أو مواصفات مشروعه، حلل بيئة العمل (Tech Stack) والمشكلات التي يواجهها.
2. المهارات الموثقة داخل الدليل: رشح المهارات الأنسب من كتالوج "أفضل 100 مهارة". عند ذكر أي مهارة من الدليل، اكتب دائماً معرّفها الدقيق بين قوسين مثل [docx] أو [test-driven-development] أو [systematic-debugging] أو [writing-plans] لكي يقوم النظام بعرض كارت تفاعلي لها تلقائياً.
3. المنظومة الذكية والمهارات الخارجية: إذا كان مشروع المستخدم يحتاج مهارات أو أدوات غير موجودة في الـ 100 مهارة (مثل: أدوات ML متخصصة، أطر عمل وكلاء خارجية، خوادم MCP معينة، أو خدمات سحابية)، اقترح له بحرية وبحث ذكي أفضل المهارات والأدوات الخارجية من عالم الذكاء الاصطناعي الأوسع.
4. لكل مهارة أو أداة ترشحها (سواء من داخل الـ 100 أو من خارجها)، وضح الآتي بأسلوب منسق ومباشر:
   - **ما وظيفتها؟** (دورها الأساسي وما تقدمه)
   - **أين وكيف تستخدمها في مشروعه؟** (الربط المباشر مع الكود أو الوثائق التي أرسلها)
   - **البرومبت أو الأمر الجاهز** (صيغة عملية جاهزة للتنفيذ فوراً)
5. نظّم الإجابة بعناوين واضحة ونقاط مرتبة، واستخدم لغة عربية برمجية تقنية دقيقة وسلسة.`;

  const fullPrompt = `${systemInstruction}

Here is the index of verified in-catalog skills:
${catalogContext}

User Message / Code / Project Docs:
"""
${userText}
"""`;

  // 1. Google Gemini (Direct client-side fetch)
  if (provider === 'gemini') {
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let lastError = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 1000 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        } else {
          const errJson = await res.json().catch(() => ({}));
          const msg = errJson.error?.message || `HTTP ${res.status}`;
          lastError = new Error(msg);
          if (res.status === 404) continue;
          throw lastError;
        }
      } catch (e) {
        lastError = e;
        if (model === models[models.length - 1]) throw e;
      }
    }
    throw lastError || new Error('Failed to generate response from Gemini API');
  }

  // 2. Anthropic Claude (Direct fetch with dangerous browser access header, with relay fallback)
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
          max_tokens: 1000,
          system: systemInstruction,
          messages: [{ role: 'user', content: `Index:\n${catalogContext}\n\nTask/Code:\n${userText}` }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.content?.[0]?.text || '';
      }
    } catch (err) {
      console.warn('Claude direct browser fetch failed, falling back to secure relay:', err);
    }

    // Relay fallback
    return callRelayProxy('claude', apiKey, 'claude-3-5-sonnet-20241022', systemInstruction, `Index:\n${catalogContext}\n\nTask/Code:\n${userText}`);
  }

  // 3. OpenAI (GPT-4o)
  if (provider === 'openai') {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Index:\n${catalogContext}\n\nTask/Code:\n${userText}` }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch (err) {
      console.warn('OpenAI direct fetch failed, falling back to secure relay:', err);
    }

    return callRelayProxy('openai', apiKey, 'gpt-4o-mini', systemInstruction, `Index:\n${catalogContext}\n\nTask/Code:\n${userText}`);
  }

  // 4. OpenRouter (All Models)
  if (provider === 'openrouter') {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://top-100-agent-skills.vercel.app',
          'X-Title': 'Top 100 Agent Skills'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Index:\n${catalogContext}\n\nTask/Code:\n${userText}` }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch (err) {
      console.warn('OpenRouter direct fetch failed, falling back to secure relay:', err);
    }

    return callRelayProxy('openrouter', apiKey, 'anthropic/claude-3.5-sonnet', systemInstruction, `Index:\n${catalogContext}\n\nTask/Code:\n${userText}`);
  }

  // 5. Groq (Llama 3.3 70B - Ultra Fast & Free)
  if (provider === 'groq') {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Index:\n${catalogContext}\n\nTask/Code:\n${userText}` }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch (err) {
      console.warn('Groq direct fetch failed, falling back to secure relay:', err);
    }

    return callRelayProxy('groq', apiKey, 'llama-3.3-70b-versatile', systemInstruction, `Index:\n${catalogContext}\n\nTask/Code:\n${userText}`);
  }

  // 6. DeepSeek
  if (provider === 'deepseek') {
    try {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: `Index:\n${catalogContext}\n\nTask/Code:\n${userText}` }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      }
    } catch (err) {
      console.warn('DeepSeek direct fetch failed, falling back to secure relay:', err);
    }

    return callRelayProxy('deepseek', apiKey, 'deepseek-chat', systemInstruction, `Index:\n${catalogContext}\n\nTask/Code:\n${userText}`);
  }

  throw new Error(`Unsupported AI Provider: ${provider}`);
}

/**
 * Fallback to secure pass-through relay if browser CORS prevents direct fetch
 */
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

/**
 * Test any provider API key with a fast ping
 */
async function testApiKey(provider, apiKey) {
  if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
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

  // For other providers, test via ping
  const reply = await queryUniversalAi('ping', provider, apiKey);
  if (!reply) throw new Error('No response received');
  return true;
}

/**
 * Extract matching skill cards from AI reply or user query
 */
function extractMatchedSkills(userText, replyText) {
  const combined = `${userText} ${replyText}`.toLowerCase();
  const matched = [];

  for (const s of skillsCatalog) {
    const id = s.id.toLowerCase();
    const name = (s.name || '').toLowerCase();

    if (combined.includes(id) || combined.includes(`[${id}]`) || (name && combined.includes(name))) {
      matched.push(s);
      if (matched.length >= 3) break;
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

function appendAssistantResponse({ reply, recommendedSkills = [], showKeySetupPrompt = false, engine = 'local' }) {
  const container = document.getElementById('bot-messages-container');
  const msgEl = document.createElement('div');
  msgEl.className = 'bot-msg bot-msg-assistant';

  const isEn = getLang() === 'en';
  const config = getStoredConfig();
  const hasKey = Boolean(config.key);

  let skillsCardsHtml = '';
  if (Array.isArray(recommendedSkills) && recommendedSkills.length > 0) {
    skillsCardsHtml = `
      <div class="bot-recommended-skills">
        ${recommendedSkills
          .map((skill) => {
            const stars = (skill.github_stars || 0).toLocaleString('en-US');
            const cat = skill.category_ar || skill.category || '';
            const title = isEn ? (skill.title_en || skill.name) : (skill.title_ar || skill.name);
            const promptText = skill.quick_prompt || (isEn ? `Use skill: ${skill.name}` : `استخدم مهارة: ${skill.name}`);

            return `
              <div class="bot-skill-card" data-skill-id="${escapeAttr(skill.id)}">
                <div class="bot-skill-card-top">
                  <span class="bot-skill-card-name">${escapeHtml(title)}</span>
                  <span class="bot-skill-card-badge">★ ${stars}</span>
                </div>
                <div class="bot-skill-card-meta">${escapeHtml(cat)}</div>
                <div class="bot-skill-card-actions">
                  <button type="button" class="bot-copy-prompt-btn" data-prompt="${escapeAttr(promptText)}">
                    📋 ${isEn ? 'Copy Prompt' : 'نسخ البرومبت'}
                  </button>
                  <a href="${formatUrlWithLang(`skill.html?id=${encodeURIComponent(skill.id)}`)}" class="bot-skill-link" target="_blank">
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

  // Key Prompt Banner if applicable
  let keyBannerHtml = '';
  if (!hasKey && showKeySetupPrompt) {
    keyBannerHtml = `
      <div class="bot-msg-key-callout">
        <div class="callout-text">
          ✨ <strong>${isEn ? 'Want deeper AI code analysis?' : 'تريد تشريحاً أعمق للكود والمشروع بالذكاء الاصطناعي؟'}</strong>
          <span>${isEn ? 'Connect any key (Gemini is 100% Free, or use Claude/OpenAI):' : 'اربط أي مفتاح (جيميناي مجاني 100%، أو استخدم كلود/ChatGPT):'}</span>
        </div>
        <div class="callout-btns">
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="callout-link-btn">
            🔗 aistudio.google.com (مجاني) ↗
          </a>
          <button type="button" class="callout-open-drawer-btn">🔑 ${isEn ? 'Choose Provider' : 'إدخال المفتاح'}</button>
        </div>
      </div>
    `;
  }

  msgEl.innerHTML = `
    <div class="bot-msg-bubble">
      ${formatMarkdownText(reply)}
      ${skillsCardsHtml}
      ${keyBannerHtml}
    </div>
  `;

  // Attach Copy Prompt listeners
  msgEl.querySelectorAll('.bot-copy-prompt-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const prompt = btn.getAttribute('data-prompt');
      try {
        await navigator.clipboard.writeText(prompt);
        const originalText = btn.textContent;
        btn.textContent = isEn ? 'Copied ✓' : 'تم النسخ ✓';
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

  // Attach Open Drawer listener
  msgEl.querySelectorAll('.callout-open-drawer-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const drawer = document.getElementById('bot-settings-drawer');
      if (drawer) {
        drawer.style.display = 'block';
        const keyInput = document.getElementById('bot-api-key-input');
        if (keyInput) keyInput.focus();
      }
    });
  });

  container.appendChild(msgEl);
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  const scrollBottomBtn = document.getElementById('bot-scroll-bottom-btn');
  if (scrollBottomBtn) {
    const offset = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (offset > 60) {
      scrollBottomBtn.classList.add('visible');
    } else {
      scrollBottomBtn.classList.remove('visible');
    }
  }
}

/**
 * Intelligent Local Semantic Search Engine (0 External API Keys Fallback)
 */
function queryLocalSearchEngine(message) {
  const isEn = getLang() === 'en';
  const normQuery = normalizeArabic(message).toLowerCase();
  
  // Detect if message is code or long documentation
  const isCodeOrDoc = message.length > 120 || /[{};=()=>def\s|function\s|import\s|class\s|README]/i.test(message);

  const scored = skillsCatalog.map((skill) => {
    let score = 0;
    const normTitle = normalizeArabic(skill.title_ar || '').toLowerCase();
    const normSummary = normalizeArabic(skill.summary_ar || '').toLowerCase();
    const nameLower = (skill.name || '').toLowerCase();
    const titleEnLower = (skill.title_en || '').toLowerCase();

    const words = normQuery.split(/\s+/).filter((w) => w.length > 2);
    for (const w of words) {
      if (normTitle.includes(w)) score += 10;
      if (normSummary.includes(w)) score += 5;
      if (nameLower.includes(w)) score += 8;
      if (titleEnLower.includes(w)) score += 8;
    }

    // Keyword detection for code/docs
    if (/debug|خطأ|error|trace|crash/i.test(normQuery) && skill.id.includes('debug')) score += 20;
    if (/test|اختبار|tdd|mock/i.test(normQuery) && skill.id.includes('test')) score += 20;
    if (/plan|خطة|مشاريع|هيكل/i.test(normQuery) && skill.id.includes('plan')) score += 20;
    if (/subagent|وكيل|وكلاء|multi/i.test(normQuery) && skill.id.includes('subagent')) score += 20;
    if (/docker|حاوي|deploy|devops/i.test(normQuery) && skill.id.includes('docker')) score += 20;
    if (/excel|xlsx|جدول/i.test(normQuery) && skill.id.includes('xlsx')) score += 20;
    if (/word|docx|ملف/i.test(normQuery) && skill.id.includes('docx')) score += 20;
    if (/pdf|بي دي اف/i.test(normQuery) && skill.id.includes('pdf')) score += 20;

    return { skill, score: score + (skill.github_stars > 20000 ? 1 : 0) };
  });

  scored.sort((a, b) => b.score - a.score);
  const bestMatches = scored.filter((item) => item.score > 2).slice(0, 3).map((item) => item.skill);
  const finalSkills = bestMatches.length > 0 ? bestMatches : skillsCatalog.slice(0, 2);
  let replyText = '';

  if (isCodeOrDoc) {
    replyText = isEn
      ? `Analyzed your project/code keywords and matched the closest skills from the Top 100 directory:\n*(💡 Tip: Connect your key (Try Google Gemini for free, or Claude/OpenAI) using the 🔑 button above to get deep AI code inspection and discover external skills beyond the catalog!)*`
      : `قمت بتحليل الكلمات المفتاحية في الكود/التوثيق واستخرجت أقرب المهارات المطابقة من دليل الـ 100 مهارة:\n*(💡 نصيحة: فعّل مفتاحك الذكي (جيميناي مجاني 100%، أو استخدم كلود/ChatGPT) عبر زر 🔑 بالأعلى ليقوم الذكاء الاصطناعي بتشريح كامل لكودك واقتراح مهارات ذكية إضافية من خارج الدليل!)*`;
  } else if (bestMatches.length > 0) {
    replyText = isEn 
      ? `Found ${bestMatches.length} verified skill(s) matching your request:`
      : `وجدت لك أفضل ${bestMatches.length} مهارات مطابقة لاحتياجك من دليل المهارات:`;
  } else {
    replyText = isEn
      ? `Here are top popular skills that can help accelerate your task:`
      : `إليك أكثر المهارات شائعة واستخداماً التي قد تساعدك في بدء عملك:`;
  }

  return {
    reply: replyText,
    recommendedSkills: finalSkills,
    engine: 'local-semantic'
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

  // Format fenced code blocks ```lang ... ```
  escaped = escaped.replace(/```([a-zA-Z0-9_\-\+]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
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
