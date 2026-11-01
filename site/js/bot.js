/**
 * bot.js - AI Skills Advisor Interactive Chat Assistant
 * Works with Google Gemini 1.5/2.0 Flash (0$ Free Tier) & Local Semantic Engine Fallback
 */

import { normalizeArabic } from './search.js';

let skillsCatalog = [];
let chatHistory = [];

export function initAiBot(skills = []) {
  if (Array.isArray(skills) && skills.length > 0) {
    skillsCatalog = skills;
  }

  // Prevent double injection
  if (document.getElementById('ai-bot-trigger')) return;

  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'ai-bot-root';
  widgetContainer.innerHTML = `
    <!-- Floating Trigger Pill Button -->
    <button id="ai-bot-trigger" class="ai-bot-trigger" aria-label="مساعد المهارات الذكي" title="اسأل مساعد المهارات الذكي">
      <span class="bot-trigger-pulse"></span>
      <span class="bot-trigger-icon" aria-hidden="true">✨</span>
      <span class="bot-trigger-text">مساعد المهارات</span>
    </button>

    <!-- Floating Chat Modal / Drawer -->
    <div id="ai-bot-modal" class="ai-bot-modal" aria-hidden="true">
      <div class="bot-header">
        <div class="bot-header-info">
          <img src="assets/logo.png" alt="شعار المساعد" class="bot-avatar-img" width="28" height="28">
          <div>
            <div class="bot-title">مساعد المهارات الذكي</div>
            <div class="bot-subtitle">
              <span class="bot-live-dot"></span>
              <span id="bot-engine-label">Gemini AI / بحث دلالي</span>
            </div>
          </div>
        </div>
        <div class="bot-header-actions">
          <button id="bot-settings-btn" class="bot-icon-btn" title="إعدادات المفتاح (API Key)" aria-label="إعدادات">⚙️</button>
          <button id="bot-close-btn" class="bot-icon-btn" title="إغلاق المحادثة" aria-label="إغلاق">✕</button>
        </div>
      </div>

      <!-- Settings Dropdown / Panel -->
      <div id="bot-settings-panel" class="bot-settings-panel" style="display: none;">
        <div class="settings-title">إعدادات Google Gemini (0$ مجاناً)</div>
        <p class="settings-desc">
          استخدم مفتاح مجاني من <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>، أو اترك الحقل فارغاً لاستخدام البحث الدلالي الداخلي الفوري.
        </p>
        <div class="settings-input-group">
          <input type="password" id="bot-api-key-input" placeholder="ألصق Gemini API Key هنا..." autocomplete="off">
          <button id="bot-save-key-btn" class="btn-settings-save">حفظ</button>
        </div>
        <div id="bot-key-status" class="settings-status"></div>
      </div>

      <!-- Chat Messages Container -->
      <div id="bot-messages-container" class="bot-messages">
        <div class="bot-msg bot-msg-assistant">
          <div class="bot-msg-bubble">
            👋 أهلاً بك! أنا <strong>مساعد المهارات الذكي</strong>.
            <br>
            أخبرني بما تريد إنجازه أو المشكلة التي تواجهك، وسأرشح لك أفضل مهارة ذكاء اصطناعي تناسبك مع البرومبت الجاهز للاستخدام.
          </div>
        </div>

        <!-- Quick Suggestion Chips -->
        <div class="bot-chips-container" id="bot-quick-chips">
          <button class="bot-chip" data-query="ملخص وتعديل مستندات Word و PDF">📄 مستندات Word و PDF</button>
          <button class="bot-chip" data-query="تحليل وتنسيق جداول Excel">📊 جداول وبيانات Excel</button>
          <button class="bot-chip" data-query="مراجعة جودة الكود واختبارات TDD">💻 جودة الكود واختبارات</button>
          <button class="bot-chip" data-query="أتمتة وحاويات Docker و DevOps">🛡️ حاويات وأمان DevOps</button>
        </div>
      </div>

      <!-- Chat Input Area -->
      <form id="bot-input-form" class="bot-input-form">
        <input 
          type="text" 
          id="bot-input-text" 
          class="bot-input-field" 
          placeholder="اسأل عما تحتاجه... (مثال: تلخيص ملفات وورد)"
          autocomplete="off"
          required
        >
        <button type="submit" id="bot-send-btn" class="bot-send-btn" aria-label="إرسال">
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
  const settingsBtn = document.getElementById('bot-settings-btn');
  const settingsPanel = document.getElementById('bot-settings-panel');
  const keyInput = document.getElementById('bot-api-key-input');
  const saveKeyBtn = document.getElementById('bot-save-key-btn');
  const keyStatus = document.getElementById('bot-key-status');
  const form = document.getElementById('bot-input-form');
  const input = document.getElementById('bot-input-text');
  const chipsContainer = document.getElementById('bot-quick-chips');

  // Load saved key if present
  const savedKey = localStorage.getItem('gemini_api_key') || '';
  if (savedKey) {
    keyInput.value = savedKey;
    keyStatus.textContent = '✓ تم تفعيل مفتاح Gemini المخصص';
    keyStatus.className = 'settings-status success';
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
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  // Toggle Settings Panel
  settingsBtn.addEventListener('click', () => {
    const isHidden = settingsPanel.style.display === 'none';
    settingsPanel.style.display = isHidden ? 'block' : 'none';
  });

  // Save API Key
  saveKeyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const val = keyInput.value.trim();
    if (val) {
      localStorage.setItem('gemini_api_key', val);
      keyStatus.textContent = '✓ تم حفظ المفتاح بنجاح!';
      keyStatus.className = 'settings-status success';
      document.getElementById('bot-engine-label').textContent = 'Gemini 1.5 Flash (0$)';
    } else {
      localStorage.removeItem('gemini_api_key');
      keyStatus.textContent = 'تم إزالة المفتاح، الاعتماد على البحث الدلالي الداخلي.';
      keyStatus.className = 'settings-status';
      document.getElementById('bot-engine-label').textContent = 'بحث دلالي داخلي';
    }
    setTimeout(() => {
      settingsPanel.style.display = 'none';
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

  try {
    const userApiKey = localStorage.getItem('gemini_api_key') || '';
    const response = await queryBotBrain(userText, userApiKey);

    removeTypingIndicator(typingId);
    appendAssistantResponse(response);
  } catch (err) {
    removeTypingIndicator(typingId);
    appendMessage(
      'assistant',
      'عذراً، حدث خطأ أثناء معالجة السؤال. يمكنك المحاولة مجدداً أو البحث مباشرة في شريط البحث أعلى الموقع.'
    );
    console.error('Bot Error:', err);
  }

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
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

function appendAssistantResponse({ reply, recommendedSkills = [] }) {
  const container = document.getElementById('bot-messages-container');
  const msgEl = document.createElement('div');
  msgEl.className = 'bot-msg bot-msg-assistant';

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

            return `
            <div class="bot-skill-card">
              <div class="bot-card-top">
                <span class="bot-card-cat">${escapeHtml(cat)}</span>
                <span class="bot-card-stars">★ ${stars}</span>
              </div>
              <a href="${skillHref}" class="bot-card-title">${escapeHtml(skill.title_ar || skill.name)}</a>
              <p class="bot-card-desc">${escapeHtml(skill.summary_ar || '')}</p>
              <div class="bot-card-actions">
                <a href="${skillHref}" class="bot-action-link">التفاصيل ↗</a>
                <button class="bot-action-copy-btn" data-prompt="${escapeAttr(prompt)}">نسخ البرومبت 📋</button>
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
      ${formatMarkdownText(reply)}
      ${skillsCardsHtml}
    </div>
  `;

  // Attach copy listeners
  msgEl.querySelectorAll('.bot-action-copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const prompt = btn.getAttribute('data-prompt');
      try {
        await navigator.clipboard.writeText(prompt);
        const originalText = btn.textContent;
        btn.textContent = 'تم النسخ ✓';
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

  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

/**
 * Intelligent Brain Router:
 * 1. Tries /api/chat (Server with Gemini or local fallback)
 * 2. If client has Gemini key and server is not available (e.g. GitHub Pages), calls Gemini REST API directly
 * 3. Client-side local semantic search engine fallback (0$ and 0 API key required)
 */
async function queryBotBrain(message, userApiKey = '') {
  // Option 1: Backend /api/chat
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        apiKey: userApiKey,
        history: chatHistory.slice(-4)
      })
    });
    if (res.ok) {
      const data = await res.json();
      chatHistory.push({ role: 'user', content: message });
      chatHistory.push({ role: 'assistant', content: data.reply });
      return data;
    }
  } catch {
    // If backend endpoint is unavailable (e.g. static GitHub Pages), fall through to client methods
  }

  // Option 2: Direct Client Gemini Call (if user provided key on static site)
  if (userApiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userApiKey}`;
      const catalogSummary = skillsCatalog.slice(0, 80).map((s) => ({
        id: s.id,
        name: s.name,
        title_ar: s.title_ar,
        summary_ar: s.summary_ar,
        category: s.category,
        stars: s.github_stars
      }));

      const systemPrompt = `أنت مساعد مهارات الذكاء الاصطناعي في دليل المهارات العربي.
رشح أفضل 1-3 مهارات تناسب سؤال المستخدم. ضع رمز كل مهارة بصيغة [SKILL:id]. أجب بعربية واضحة ومختصرة.
المهارات: ${JSON.stringify(catalogSummary)}`;

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: message }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
        })
      });

      if (geminiRes.ok) {
        const gData = await geminiRes.json();
        const text = gData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const skillMatches = [...text.matchAll(/\[SKILL:([a-zA-Z0-9_-]+)\]/gi)].map((m) => m[1]);
        const matched = skillsCatalog.filter((s) => skillMatches.includes(s.id));

        return {
          reply: text.replace(/\[SKILL:([a-zA-Z0-9_-]+)\]/g, '').trim(),
          recommendedSkills: matched,
          engine: 'client-gemini-flash'
        };
      }
    } catch (gErr) {
      console.warn('Client direct Gemini call failed:', gErr);
    }
  }

  // Option 3: Local Semantic Search Engine Fallback (Client-side, 0$, No Key Required!)
  const normQuery = normalizeArabic(message).toLowerCase();
  const scored = skillsCatalog.map((skill) => {
    let score = 0;
    const normTitle = normalizeArabic(skill.title_ar || '').toLowerCase();
    const normSummary = normalizeArabic(skill.summary_ar || '').toLowerCase();
    const nameLower = (skill.name || '').toLowerCase();

    const words = normQuery.split(/\s+/).filter((w) => w.length > 2);
    for (const w of words) {
      if (normTitle.includes(w)) score += 10;
      if (normSummary.includes(w)) score += 5;
      if (nameLower.includes(w)) score += 8;
    }

    return { skill, score: score + (skill.github_stars > 20000 ? 1 : 0) };
  });

  scored.sort((a, b) => b.score - a.score);
  const bestMatches = scored.filter((item) => item.score > 0).slice(0, 3).map((item) => item.skill);

  const finalSkills = bestMatches.length > 0 ? bestMatches : skillsCatalog.slice(0, 2);
  let replyText = '';
  if (bestMatches.length > 0) {
    replyText = `وجدت لك أفضل ${bestMatches.length} مهارات مطابقة لاحتياجك من دليل المهارات الأكثر شهرة:`;
  } else {
    replyText = `إليك أكثر المهارات شائعة واستخداماً التي قد تساعدك في بدء عملك:`;
  }

  return {
    reply: replyText,
    recommendedSkills: finalSkills,
    engine: 'client-semantic-fallback'
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
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
