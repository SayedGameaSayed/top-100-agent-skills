/**
 * bot.js - AI Skills Advisor Interactive Chat Assistant
 * Powered by Google Gemini API with Local Semantic Search Engine Fallback
 * 
 * Features:
 * 1. User-Supplied Google Gemini API Key (Saved safely in localStorage, 100% client-side privacy).
 * 2. Step-by-step in-app guide to get a free key from Google AI Studio (aistudio.google.com/app/apikey).
 * 3. Fallback to 100% Offline Local Semantic Search Engine if no API key is provided.
 * 4. Automatic Skill Recommendation Cards with 1-click prompt copying.
 */

import { normalizeArabic } from './search.js';
import { getLang, formatUrlWithLang } from './i18n.js';

let skillsCatalog = [];
const STORAGE_KEY = 'gemini_api_key';

function getStoredApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function setStoredApiKey(key) {
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to save API key to localStorage:', err);
  }
}

function removeStoredApiKey() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function initAiBot(skills = []) {
  if (Array.isArray(skills) && skills.length > 0) {
    skillsCatalog = skills;
  }

  // Prevent double injection
  if (document.getElementById('ai-bot-trigger')) return;

  const isEn = getLang() === 'en';
  const hasKey = Boolean(getStoredApiKey());

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
      
      <!-- Bot Header -->
      <div class="bot-header">
        <div class="bot-header-info">
          <img src="assets/logo.png" alt="Assistant Logo" class="bot-avatar-img" width="28" height="28">
          <div>
            <div class="bot-title">${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}</div>
            <div class="bot-subtitle">
              <span class="bot-live-dot ${hasKey ? 'bot-live-gemini' : ''}"></span>
              <span id="bot-engine-label">${
                hasKey 
                  ? (isEn ? 'Google Gemini AI (Active ✨)' : 'جيميناي AI (نشط ✨)')
                  : (isEn ? 'Local Search (Add Gemini Key ⚡)' : 'بحث محلي (اضغط 🔑 لتفعيل جيميناي)')
              }</span>
            </div>
          </div>
        </div>
        <div class="bot-header-actions">
          <button id="bot-api-btn" class="bot-api-btn ${hasKey ? 'has-key' : ''}" title="${isEn ? 'Configure Gemini API Key' : 'إعداد مفتاح Gemini API'}" type="button">
            🔑 <span id="bot-api-btn-text">${hasKey ? (isEn ? 'Key Active' : 'المفتاح نشط') : (isEn ? 'Set API Key' : 'مفتاح API')}</span>
          </button>
          <button id="bot-close-btn" class="bot-icon-btn" title="${isEn ? 'Close Chat' : 'إغلاق المحادثة'}" aria-label="${isEn ? 'Close' : 'إغلاق'}" type="button">✕</button>
        </div>
      </div>

      <!-- Expandable API Key Settings Drawer -->
      <div id="bot-settings-drawer" class="bot-settings-drawer" style="display: none;">
        <div class="bot-settings-header">
          <span class="bot-settings-title">🔑 ${isEn ? 'Connect Free Google Gemini API' : 'تفعيل مفتاح Google Gemini المجاني'}</span>
          <span class="bot-settings-badge">${isEn ? '100% Free' : 'مجاني 100%'}</span>
        </div>
        <p class="bot-settings-desc">
          ${isEn 
            ? 'Connect your free personal Gemini API key to unlock full conversational AI recommendations and prompt synthesis.' 
            : 'اربط مفتاح Gemini المجاني الخاص بك للحصول على إجابات توليدية ذكية وشروحات واقتراحات برومبت مخصصة لمشروعك.'}
        </p>

        <!-- Step-by-Step Guide Box -->
        <div class="bot-api-steps-box">
          <div class="bot-api-step">
            <span class="bot-step-num">1</span>
            <span>${isEn ? 'Open official Google AI Studio:' : 'افتح موقع Google AI Studio الرسمي:'}</span>
          </div>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="bot-api-studio-link">
            🔗 aistudio.google.com/app/apikey ↗
          </a>
          <div class="bot-api-step">
            <span class="bot-api-step-num">2</span>
            <span>${isEn ? 'Sign in with Google & click <strong>Create API Key</strong>' : 'سجّل الدخول واضغط الزر الأزرق: <strong>Create API Key</strong>'}</span>
          </div>
          <div class="bot-api-step">
            <span class="bot-api-step-num">3</span>
            <span>${isEn ? 'Copy key (starts with <code>AIzaSy...</code>) and paste below:' : 'انسخ المفتاح (يبدأ بـ <code>AIzaSy...</code>) والصقه بالأسفل:'}</span>
          </div>
        </div>

        <!-- Input Row -->
        <div class="bot-api-input-wrap">
          <input 
            type="password" 
            id="bot-api-key-input" 
            placeholder="AIzaSy..." 
            value="${escapeAttr(getStoredApiKey())}"
            autocomplete="off"
            aria-label="${isEn ? 'Gemini API Key' : 'مفتاح Gemini API'}"
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

        <div class="bot-privacy-notice">
          🔒 ${isEn 
            ? 'Your key stays securely in your browser (localStorage) and calls Google directly. Never sent to any intermediate server.' 
            : 'أمان تام: المفتاح يُحفظ في متصفحك محلياً ويتصل مباشرة بـ Google دون المرور على أي خادم وسيط.'}
        </div>
      </div>

      <!-- Chat Messages Container -->
      <div id="bot-messages-container" class="bot-messages">
        
        <!-- Welcome Message -->
        <div class="bot-msg bot-msg-assistant">
          <div class="bot-msg-bubble">
            ${isEn 
              ? '👋 Hello! I am your <strong>AI Skills Assistant</strong>.<br>Describe your project or task, and I will recommend the top verified skills with ready prompts.' 
              : '👋 أهلاً بك! أنا <strong>مساعد المهارات الذكي</strong>.<br>أخبرني بما تريد إنجازه أو المشكلة التي تواجهك، وسأرشح لك أفضل مهارة تناسبك مع البرومبت الجاهز.'}
          </div>
        </div>

        <!-- Gemini Promo Banner if NO Key is set -->
        <div id="bot-welcome-promo" class="bot-welcome-promo" style="${hasKey ? 'display: none;' : ''}">
          <div class="bot-promo-title">✨ ${isEn ? 'Unlock Google Gemini AI Power:' : 'تفعيل الذكاء الكامل عبر Google Gemini:'}</div>
          <p class="bot-promo-desc">
            ${isEn 
              ? 'Currently using fast local search. Add your free Google Gemini API key to get smart conversational analysis.' 
              : 'يعمل المساعد حالياً بالبحث المحلي السريع. أضف مفتاح Gemini المجاني للحصول على إجابات ذكية وتفصيلية.'}
          </p>
          <button type="button" id="bot-open-setup-from-banner" class="bot-promo-btn">
            🔑 ${isEn ? 'Enter or Get Free API Key (1-Min)' : 'إدخال أو استخراج المفتاح مجاناً (في دقيقة)'}
          </button>
        </div>

        <!-- Quick Suggestion Chips -->
        <div class="bot-chips-container" id="bot-quick-chips">
          ${isEn ? `
            <button class="bot-chip" data-query="word pdf documents">📄 Word & PDF Documents</button>
            <button class="bot-chip" data-query="excel data spreadsheets">📊 Excel & Data Analysis</button>
            <button class="bot-chip" data-query="code quality testing tdd">💻 Code Quality & Testing</button>
            <button class="bot-chip" data-query="cloud security devops">🛡️ Cloud & Security</button>
          ` : `
            <button class="bot-chip" data-query="ملخص وتعديل مستندات Word و PDF">📄 مستندات Word و PDF</button>
            <button class="bot-chip" data-query="تحليل وتنسيق جداول Excel">📊 جداول وبيانات Excel</button>
            <button class="bot-chip" data-query="مراجعة جودة الكود واختبارات TDD">💻 جودة الكود واختبارات</button>
            <button class="bot-chip" data-query="أتمتة وحاويات Docker و DevOps">🛡️ حاويات وأمان DevOps</button>
          `}
        </div>
      </div>

      <!-- Chat Input Area -->
      <form id="bot-input-form" class="bot-input-form">
        <input 
          type="text" 
          id="bot-input-text" 
          class="bot-input-field" 
          placeholder="${isEn ? 'Describe your task or coding goal...' : 'اسأل عما تحتاجه... (مثال: تلخيص ملفات وورد)'}"
          autocomplete="off"
          required
        >
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
  const closeBtn = document.getElementById('bot-close-btn');
  const form = document.getElementById('bot-input-form');
  const input = document.getElementById('bot-input-text');
  const chipsContainer = document.getElementById('bot-quick-chips');

  const apiBtn = document.getElementById('bot-api-btn');
  const settingsDrawer = document.getElementById('bot-settings-drawer');
  const saveKeyBtn = document.getElementById('bot-save-key-btn');
  const clearKeyBtn = document.getElementById('bot-clear-key-btn');
  const cancelSettingsBtn = document.getElementById('bot-cancel-settings-btn');
  const apiKeyInput = document.getElementById('bot-api-key-input');
  const toggleVisBtn = document.getElementById('bot-toggle-key-visibility');
  const bannerSetupBtn = document.getElementById('bot-open-setup-from-banner');

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
    }
  });

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
      apiKeyInput.focus();
    }
  }

  apiBtn.addEventListener('click', () => toggleSettingsDrawer());
  cancelSettingsBtn.addEventListener('click', () => toggleSettingsDrawer(false));
  if (bannerSetupBtn) {
    bannerSetupBtn.addEventListener('click', () => toggleSettingsDrawer(true));
  }

  // Toggle Password Visibility
  toggleVisBtn.addEventListener('click', () => {
    const isPass = apiKeyInput.type === 'password';
    apiKeyInput.type = isPass ? 'text' : 'password';
    toggleVisBtn.textContent = isPass ? '🙈' : '👁️';
  });

  // Save API Key
  saveKeyBtn.addEventListener('click', async () => {
    const key = apiKeyInput.value.trim();
    const statusEl = document.getElementById('bot-settings-status');
    const isEn = getLang() === 'en';

    if (!key) {
      statusEl.style.display = 'block';
      statusEl.className = 'bot-settings-status error';
      statusEl.textContent = isEn ? 'Please enter a valid Gemini API key.' : 'يرجى لصق مفتاح Gemini API أولاً.';
      return;
    }

    statusEl.style.display = 'block';
    statusEl.className = 'bot-settings-status';
    statusEl.textContent = isEn ? 'Testing key with Google Gemini servers...' : 'جاري التحقق من المفتاح مع سيرفرات Google...';

    // Test Key
    try {
      await testGeminiKey(key);
      setStoredApiKey(key);
      statusEl.className = 'bot-settings-status success';
      statusEl.textContent = isEn ? '✓ Key verified and activated successfully!' : '✓ تم التحقق وتفعيل مفتاح Gemini بنجاح!';
      
      updateBotStatusUI(true);
      clearKeyBtn.style.display = 'inline-block';
      const welcomePromo = document.getElementById('bot-welcome-promo');
      if (welcomePromo) welcomePromo.style.display = 'none';

      setTimeout(() => {
        toggleSettingsDrawer(false);
        statusEl.style.display = 'none';
        appendMessage('assistant', isEn 
          ? '🎉 <strong>Google Gemini AI is now active!</strong> Ask me any task or project question and I will guide you with verified skills.' 
          : '🎉 <strong>تم تفعيل Google Gemini AI بنجاح!</strong> يمكنك سؤالي الآن عن أي فكرة أو مشروع وسأساعدك بأفضل المهارات والبرومبتات.'
        );
      }, 1200);
    } catch (err) {
      statusEl.className = 'bot-settings-status error';
      statusEl.textContent = isEn 
        ? `⚠️ Invalid Key: ${err.message}. Make sure to copy it from aistudio.google.com` 
        : `⚠️ تعذر التحقق من المفتاح: ${err.message}. تأكد من نسخه بشكل صحيح من aistudio.google.com`;
    }
  });

  // Clear API Key
  clearKeyBtn.addEventListener('click', () => {
    const isEn = getLang() === 'en';
    removeStoredApiKey();
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
    handleSendMessage(text);
  });
}

function updateBotStatusUI(hasKey) {
  const isEn = getLang() === 'en';
  const label = document.getElementById('bot-engine-label');
  const dot = document.querySelector('.bot-live-dot');
  const btn = document.getElementById('bot-api-btn');
  const btnText = document.getElementById('bot-api-btn-text');

  if (hasKey) {
    if (label) label.textContent = isEn ? 'Google Gemini AI (Active ✨)' : 'جيميناي AI (نشط ✨)';
    if (dot) dot.classList.add('bot-live-gemini');
    if (btn) btn.classList.add('has-key');
    if (btnText) btnText.textContent = isEn ? 'Key Active ✓' : 'المفتاح نشط ✓';
  } else {
    if (label) label.textContent = isEn ? 'Local Search (Add Gemini Key ⚡)' : 'بحث محلي (اضغط 🔑 لتفعيل جيميناي)';
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
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const apiKey = getStoredApiKey();
  const isEn = getLang() === 'en';

  // Check if user is asking how to get an API key
  const lowerText = userText.toLowerCase();
  const isAskingAboutApiKey = 
    lowerText.includes('api') || 
    lowerText.includes('مفتاح') || 
    lowerText.includes('جيميناي') || 
    lowerText.includes('gemini') || 
    lowerText.includes('ازاي اجيب') ||
    lowerText.includes('مش عارف');

  if (isAskingAboutApiKey && !apiKey) {
    setTimeout(() => {
      removeTypingIndicator(typingId);
      appendAssistantResponse({
        reply: isEn 
          ? `### 🔑 How to Get Your Free Google Gemini API Key:
1. Open **[Google AI Studio](https://aistudio.google.com/app/apikey)** (100% Free from Google).
2. Sign in with your standard Google account.
3. Click the blue **Create API Key** button.
4. Copy the key (starts with \`AIzaSy...\`).
5. Click the button below to paste and activate it instantly:`
          : `### 🔑 طريقة الحصول على مفتاح Gemini API المجاني في دقيقة:
1. افتح موقع **[Google AI Studio](https://aistudio.google.com/app/apikey)** الرسمي (مجاني للأبد من Google).
2. سجّل الدخول بحساب Google العادي الخاص بك.
3. اضغط على الزر الأزرق: **Create API Key** (إنشاء مفتاح).
4. انسخ المفتاح الذي يبدأ بـ \`AIzaSy...\`.
5. اضغط على الزر بالأسفل للصق المفتاح وتفعيله فوراً:`,
        showKeySetupPrompt: true
      });
    }, 200);
    return;
  }

  // 1. If API Key is present, call Gemini API
  if (apiKey) {
    try {
      const geminiResponseText = await queryGeminiApi(userText, apiKey);
      removeTypingIndicator(typingId);

      // Extract matching skills to render interactive cards
      const matchedSkills = extractMatchedSkills(userText, geminiResponseText);

      appendAssistantResponse({
        reply: geminiResponseText,
        recommendedSkills: matchedSkills,
        engine: 'gemini'
      });
      return;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local search:', err);
      removeTypingIndicator(typingId);

      // If key is invalid or rate limited, notify user gracefully
      const localResult = queryLocalSearchEngine(userText);
      appendAssistantResponse({
        reply: (isEn 
          ? `⚠️ *Gemini API notice: ${err.message}*\n\nSwitched automatically to verified local matcher:\n\n` 
          : `⚠️ *تنبيه من Google Gemini: ${err.message}*\n\nتم التبديل تلقائياً للبحث الدلالي المحلي الموثق:\n\n`) + localResult.reply,
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

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Direct Client-Side Google Gemini API Connector
 */
async function queryGeminiApi(userText, apiKey) {
  const isEn = getLang() === 'en';
  
  // Build a compact catalog of skills for contextual grounding
  const catalogContext = skillsCatalog.slice(0, 60).map((s) => {
    const title = isEn ? (s.title_en || s.name) : (s.title_ar || s.name);
    const summary = isEn ? (s.summary_en || s.summary_ar) : s.summary_ar;
    return `- [${s.id}] "${title}": ${summary ? summary.slice(0, 90) : ''}`;
  }).join('\n');

  const systemInstruction = isEn
    ? `You are the expert AI Skills Assistant for the "Top 100 Agent Skills" open-source directory.
Help the developer or user find the perfect skill for their coding/workflow task.
Explain clearly why the skill fits their task, and provide a quick practical prompt or command.
Refer to skills using their exact ID in brackets like [docx] or [obra-writing-plans].
Be concise, helpful, and polite. Always reply in English.`
    : `أنت المساعد الذكي الرسمي لدليل "أفضل 100 مهارة ذكاء اصطناعي" مفتوح المصدر.
مهمتك: مساعدة المطور أو المستخدم في إيجاد المهارة الأنسب لمشروعه أو مشكلته البرمجية.
اشرح له بأسلوب عربي عملي ومباشر كيف تفيده المهارة، وقدم له صيغة برومبت فورية تناسب طلبه.
استشهد بالمهارات باستخدام معرّفها الدقيق بين قوسين مثل [docx] أو [test-driven-development] أو [obra-writing-plans].
كن موجزاً ومفيداً، وأجب بنفس لغة المستخدم (عربي).`;

  const fullPrompt = `${systemInstruction}

Here is a curated index of verified skills:
${catalogContext}

User Query:
"${userText}"`;

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
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800
          }
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
        if (res.status === 404) continue; // try next model
        throw lastError;
      }
    } catch (e) {
      lastError = e;
      if (model === models[models.length - 1]) throw e;
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API');
}

/**
 * Test a Gemini API key with a fast ping
 */
async function testGeminiKey(apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Hello' }] }],
      generationConfig: { maxOutputTokens: 5 }
    })
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `HTTP ${res.status}`);
  }
  return true;
}

/**
 * Extract matching skill cards from Gemini reply or user query
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

  // If no direct ID found, fallback to top scored from local search
  if (matched.length === 0) {
    const local = queryLocalSearchEngine(userText);
    return local.recommendedSkills || [];
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
  const hasKey = Boolean(getStoredApiKey());

  let skillsCardsHtml = '';
  if (Array.isArray(recommendedSkills) && recommendedSkills.length > 0) {
    skillsCardsHtml = `
      <div class="bot-recommended-skills">
        ${recommendedSkills
          .map((skill) => {
            const stars = (skill.github_stars || 0).toLocaleString('en-US');
            const cat = skill.category_ar || skill.category || '';
            const skillHref = `skill.html?id=${encodeURIComponent(skill.id)}`;
            const prompt = `You are an expert agent. Follow the official instructions and best practices for: ${skill.name} (${skill.source?.url || skill.source?.repo_url || ''})`;

            const cardTitle = isEn ? (skill.title_en || skill.name) : (skill.title_ar || skill.name);
            const cardDesc = isEn ? (skill.summary_en || skill.summary_ar || '') : (skill.summary_ar || '');
            const cardHref = formatUrlWithLang(skillHref);
            const detailsLabel = isEn ? 'Details ↗' : 'التفاصيل ↗';
            const copyLabel = isEn ? 'Copy Prompt 📋' : 'نسخ البرومبت 📋';

            return `
            <div class="bot-skill-card">
              <div class="bot-card-top">
                <span class="bot-card-cat">${escapeHtml(cat)}</span>
                <span class="bot-card-stars">★ ${stars}</span>
              </div>
              <a href="${cardHref}" class="bot-card-title">${escapeHtml(cardTitle)}</a>
              <p class="bot-card-desc">${escapeHtml(cardDesc)}</p>
              <div class="bot-card-actions">
                <a href="${cardHref}" class="bot-action-link">${detailsLabel}</a>
                <button class="bot-action-copy-btn" data-prompt="${escapeAttr(prompt)}">${copyLabel}</button>
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
          ✨ <strong>${isEn ? 'Want deeper Gemini AI analysis?' : 'تريد إجابات أعمق من Gemini AI؟'}</strong>
          <span>${isEn ? 'Get your free key in 1-min:' : 'احصل على مفتاح مجاني في دقيقة:'}</span>
        </div>
        <div class="callout-btns">
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="callout-link-btn">
            🔗 aistudio.google.com ↗
          </a>
          <button type="button" class="callout-open-drawer-btn">🔑 ${isEn ? 'Paste Key' : 'إدخال المفتاح'}</button>
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

  // Attach copy listeners
  msgEl.querySelectorAll('.bot-action-copy-btn').forEach((btn) => {
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
        }, 2000);
      } catch {
        // Fallback
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
  container.scrollTop = container.scrollHeight;
}

/**
 * Intelligent Local Semantic Search Engine (0 External API Keys Fallback)
 */
function queryLocalSearchEngine(message) {
  const isEn = getLang() === 'en';
  const normQuery = normalizeArabic(message).toLowerCase();
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

    return { skill, score: score + (skill.github_stars > 20000 ? 1 : 0) };
  });

  scored.sort((a, b) => b.score - a.score);
  const bestMatches = scored.filter((item) => item.score > 0).slice(0, 3).map((item) => item.skill);

  const finalSkills = bestMatches.length > 0 ? bestMatches : skillsCatalog.slice(0, 2);
  let replyText = '';
  if (bestMatches.length > 0) {
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
  return escapeHtml(text)
    .replace(/### (.*?)\n/g, '<h4 style="margin: 8px 0 4px; font-weight: 700; color: inherit;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.08); padding: 1px 4px; border-radius: 4px; font-size: 0.9em;">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">$1</a>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
