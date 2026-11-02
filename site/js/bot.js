/**
 * bot.js - AI Skills Advisor Interactive Chat Assistant
 * Powered by Google Gemini API with Local Semantic Search Engine Fallback
 * 
 * Features:
 * 1. User-Supplied Google Gemini API Key (Saved safely in localStorage, 100% client-side privacy).
 * 2. Step-by-step in-app guide to get a free key from Google AI Studio (aistudio.google.com/app/apikey).
 * 3. Deep Code & Documentation Analysis: Users can paste code snippets, README files, or architecture specs.
 * 4. Dual Intelligence: Recommends verified skills from the Top 100 catalog AND top tools/skills from the broader AI ecosystem.
 * 5. Automatic Skill Recommendation Cards with 1-click prompt copying and live skill links.
 * 6. Fallback to 100% Offline Local Semantic Search Engine if no API key is provided.
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
            ? 'Connect your free personal Gemini API key to unlock deep code analysis, project docs inspection, and discover AI tools beyond the catalog.' 
            : 'اربط مفتاح Gemini المجاني الخاص بك لتحليل الكود والتوثيق واكتشاف مهارات وأدوات ذكية من داخل وخارج الدليل.'}
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
              ? '👋 Hello! I am your <strong>AI Skills Advisor</strong>.<br><br>💡 <strong>Feel free to paste your code, project README, or architecture description:</strong><br>I will analyze your stack and recommend the exact skills you need — both from our <strong>Top 100 Verified Catalog</strong> and <strong>from the broader AI ecosystem</strong>. For every skill, I will explain what it does, why it fits your project, and how to use it!' 
              : '👋 أهلاً بك! أنا <strong>مستشارك الذكي لمهارات وأدوات الذكاء الاصطناعي</strong>.<br><br>💡 <strong>يمكنك إرسال فكرتك، كود مشروعك، أو ملف الـ README بالكامل:</strong><br>سأقوم بتحليل بيئة عملك واقتراح أفضل المهارات المناسبة لك بدقة — سواء كانت من ضمن <strong>أفضل 100 مهارة في الدليل</strong> أو <strong>حلول وأدوات ذكية من خارج الدليل</strong>، مع شرح دقيق لوظيفة كل أداة وكيف تفيدك عملياً في مشروعك!'}
          </div>
        </div>

        <!-- Gemini Promo Banner if NO Key is set -->
        <div id="bot-welcome-promo" class="bot-welcome-promo" style="${hasKey ? 'display: none;' : ''}">
          <div class="bot-promo-title">✨ ${isEn ? 'Unlock Deep Gemini AI Analysis:' : 'تفعيل التحليل الذكي عبر Google Gemini:'}</div>
          <p class="bot-promo-desc">
            ${isEn 
              ? 'Connect your free Gemini API key to enable deep code inspection, documentation parsing, and discovery of AI tools beyond the catalog.' 
              : 'أدخل مفتاح Gemini المجاني ليقوم بتحليل الكود المعقد ومستندات مشروعك وترشيح مهارات ذكية إضافية من خارج الدليل.'}
          </p>
          <button type="button" id="bot-open-setup-from-banner" class="bot-promo-btn">
            🔑 ${isEn ? 'Enter or Get Free API Key (1-Min)' : 'إدخال أو استخراج المفتاح مجاناً (في دقيقة)'}
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
          ? '🎉 <strong>Google Gemini AI is active!</strong> You can now paste your code, project docs, or ask for any skill from inside or outside the catalog.' 
          : '🎉 <strong>تم تفعيل Google Gemini AI بنجاح!</strong> يمكنك الآن إرسال كودك أو ملف الـ README وسأقترح عليك أفضل المهارات من داخل وخارج الدليل مع شرحها بالكامل.'
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
 * Provides deep code and documentation inspection, and suggests both
 * in-catalog Top 100 skills and external tools from the wider AI ecosystem.
 */
async function queryGeminiApi(userText, apiKey) {
  const isEn = getLang() === 'en';
  
  // Build full catalog context for grounding across all 100 skills
  const catalogContext = skillsCatalog.map((s) => {
    const title = isEn ? (s.title_en || s.name) : (s.title_ar || s.name);
    const cat = isEn ? (s.category || '') : (s.category_ar || s.category || '');
    const summary = isEn ? (s.summary_en || s.summary_ar) : s.summary_ar;
    return `- [${s.id}] (${cat}) "${title}": ${summary ? summary.slice(0, 110) : ''}`;
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
            maxOutputTokens: 1000
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
          ✨ <strong>${isEn ? 'Want deeper Gemini AI analysis?' : 'تريد تشريحاً أعمق للكود من Gemini AI؟'}</strong>
          <span>${isEn ? 'Get your free key in 1-min:' : 'احصل على مفتاحك المجاني في دقيقة:'}</span>
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
  container.scrollTop = container.scrollHeight;
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
      ? `Analyzed your project/code keywords and matched the closest skills from the Top 100 directory:\n*(💡 Tip: Connect your free Gemini API key using the 🔑 button above to get deep AI code inspection and discover external skills beyond the catalog!)*`
      : `قمت بتحليل الكلمات المفتاحية في الكود/التوثيق واستخرجت أقرب المهارات المطابقة من دليل الـ 100 مهارة:\n*(💡 نصيحة: فعّل مفتاح Gemini المجاني عبر زر 🔑 بالأعلى ليقوم الذكاء الاصطناعي بتشريح كامل لكودك واقتراح مهارات ذكية إضافية من خارج الدليل!)*`;
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
