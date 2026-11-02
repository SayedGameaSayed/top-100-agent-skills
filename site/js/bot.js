/**
 * bot.js - AI Skills Advisor Interactive Chat Assistant
 * 100% Offline Local Semantic Search Engine (0 External API Keys, 0 LocalStorage, 100% Client-Side Privacy)
 */

import { normalizeArabic } from './search.js';
import { getLang, t, formatUrlWithLang } from './i18n.js';

let skillsCatalog = [];

export function initAiBot(skills = []) {
  if (Array.isArray(skills) && skills.length > 0) {
    skillsCatalog = skills;
  }

  // Prevent double injection
  if (document.getElementById('ai-bot-trigger')) return;

  const isEn = getLang() === 'en';
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
      <div class="bot-header">
        <div class="bot-header-info">
          <img src="assets/logo.png" alt="Assistant Logo" class="bot-avatar-img" width="28" height="28">
          <div>
            <div class="bot-title">${isEn ? 'AI Skills Assistant' : 'مساعد المهارات الذكي'}</div>
            <div class="bot-subtitle">
              <span class="bot-live-dot"></span>
              <span id="bot-engine-label">${isEn ? 'Semantic Skill Matcher (Local & Fast)' : 'بحث دلالي ذكي (محلي وسريع)'}</span>
            </div>
          </div>
        </div>
        <div class="bot-header-actions">
          <button id="bot-close-btn" class="bot-icon-btn" title="${isEn ? 'Close Chat' : 'إغلاق المحادثة'}" aria-label="${isEn ? 'Close' : 'إغلاق'}">✕</button>
        </div>
      </div>

      <!-- Chat Messages Container -->
      <div id="bot-messages-container" class="bot-messages">
        <div class="bot-msg bot-msg-assistant">
          <div class="bot-msg-bubble">
            ${isEn 
              ? '👋 Hello! I am your <strong>AI Skills Assistant</strong>.<br>Describe your project or task, and I will recommend the top verified skills for you.' 
              : '👋 أهلاً بك! أنا <strong>مساعد المهارات الذكي</strong>.<br>أخبرني بما تريد إنجازه أو المشكلة التي تواجهك، وسأرشح لك أفضل مهارة تناسبك مع البرومبت الجاهز.'}
          </div>
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

function handleSendMessage(userText) {
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
    const response = queryLocalSearchEngine(userText);
    setTimeout(() => {
      removeTypingIndicator(typingId);
      appendAssistantResponse(response);
    }, 150);
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

            const isEn = getLang() === 'en';
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
 * Intelligent Local Semantic Search Engine:
 * 100% Client-side, 0 External Network Requests, 0 API Keys, 0 Privacy Leaks.
 */
function queryLocalSearchEngine(message) {
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
    replyText = `وجدت لك أفضل ${bestMatches.length} مهارات مطابقة لاحتياجك من دليل المهارات:`;
  } else {
    replyText = `إليك أكثر المهارات شائعة واستخداماً التي قد تساعدك في بدء عملك:`;
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
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
