/**
 * app.js - Full-Stack Client Logic for Arabic Skills Guide
 * Dala Style: Constellation floating on black velvet
 */

import { SkillsSearchEngine, normalizeArabic } from './search.js';
import { copyToClipboard } from './copy.js';
import { initConstellation } from './constellation.js';
import { initAiBot } from './bot.js';
import { initScrollEffects, observeCardsScrollEntrance } from './scroll-effects.js';

let skillsData = null;
let toolsData = null;
let searchEngine = null;

async function fetchJsonWithFallback(paths) {
  for (const p of paths) {
    try {
      const res = await fetch(p);
      if (res.ok) {
        const json = await res.json();
        // Handle both API response formats { skills: [...] } and raw json { skills: [...] }
        return json;
      }
    } catch {
      // continue to next path
    }
  }
  throw new Error(`Failed to load data from paths: ${paths.join(', ')}`);
}

export async function loadData() {
  if (!skillsData) {
    try {
      // Pure static JSON paths (matching <link rel="preload"> for zero-latency cache hits)
      const res = await fetchJsonWithFallback([
        'data/skills.json',
        './data/skills.json',
        '../data/skills.json',
        '/data/skills.json'
      ]);
      skillsData = res;
    } catch (err) {
      console.error('Critical: could not load skills data', err);
    }
  }

  if (!toolsData) {
    try {
      const res = await fetchJsonWithFallback([
        'data/tools.json',
        './data/tools.json',
        '../data/tools.json',
        '/data/tools.json'
      ]);
      toolsData = Array.isArray(res) ? res : (res.tools || []);
    } catch (err) {
      console.warn('Could not load tools data', err);
      toolsData = [];
    }
  }

  return { skillsData, toolsData };
}

export function getEffectiveSourceUrl(skill) {
  if (skill.source?.url_verified === true && skill.source?.url) {
    return skill.source.url;
  }
  return skill.source?.repo_url || skill.source?.url || '#';
}

export function formatDifficulty(difficulty) {
  const map = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  };
  return map[difficulty] || 'مبتدئ';
}

export function getBareLicenseLabelHtml(license) {
  const status = license?.status;
  if (status === 'proprietary_link_only') {
    return `<span class="card-license-label">رخصة خاصة</span>`;
  }
  if (status === 'verify_before_publish') {
    return `<span class="card-license-label verify-orange">تحقق من الرخصة</span>`;
  }
  return '';
}

export function resolveToolSteps(steps, skill) {
  if (!Array.isArray(steps)) return [];
  const repoGitUrl = skill.source?.repo_url ? `${skill.source.repo_url}.git` : '';
  const isMultiSkill = skill.kind === 'collection' || skill.kind === 'directory' || !skill.source?.path_in_repo;
  const pathInRepo = isMultiSkill ? '<مسار-فولدر-المهارة>' : skill.source.path_in_repo;

  return steps.map((step) => {
    return step
      .replace(/\{\{repo_git_url\}\}/g, repoGitUrl)
      .replace(/\{\{path_in_repo\}\}/g, pathInRepo);
  });
}

export function formatStars(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

export function renderSkillCard(skill, categories) {
  const catObj = (categories || []).find((c) => c.id === skill.category);
  const catName = catObj ? catObj.name_ar : skill.category;
  const starsFormatted = formatStars(skill.github_stars);

  return `
    <a href="skill.html?id=${encodeURIComponent(skill.id)}" class="skill-card" aria-label="${escapeHtml(skill.title_ar)}">
      <div class="card-top">
        <div class="card-meta-line">
          <span class="card-name-en ltr">${escapeHtml(skill.name)}</span>
          <span class="card-stars-badge" title="${(skill.github_stars || 0).toLocaleString()} نجمة على GitHub">★ ${starsFormatted}</span>
          ${skill.content_verified !== true ? '<span class="unverified-card-pill" style="font-size: 11px; font-weight: 600; color: #fbbf24; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); border-radius: 9999px; padding: 2px 8px;">غير مراجَع</span>' : ''}
          <span class="card-category-label">${escapeHtml(catName)}</span>
        </div>
        <h3 class="card-title">${escapeHtml(skill.title_ar)}</h3>
        <p class="card-summary">${escapeHtml(skill.summary_ar)}</p>
      </div>
      <div class="card-bottom-row">
        <span class="card-difficulty">${formatDifficulty(skill.difficulty)}</span>
        ${getBareLicenseLabelHtml(skill.license)}
      </div>
    </a>
  `;
}

/**
 * INDEX PAGE
 */
export async function initIndexPage() {
  const { skillsData } = await loadData();
  if (!skillsData || !skillsData.skills) return;

  searchEngine = new SkillsSearchEngine(skillsData.skills);

  // Initialize Dala particle brain constellation
  initConstellation('constellation-canvas');

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const categoryNav = document.getElementById('category-nav');
  const highlightsBand = document.getElementById('highlights-band');
  const highlightsContainer = document.getElementById('highlights-container');
  const gridContainer = document.getElementById('skills-grid');
  const resultsCountEl = document.getElementById('results-count');
  const emptyStateEl = document.getElementById('empty-state');
  const viewAllBtn = document.getElementById('highlights-view-all-btn');
  const sortSelect = document.getElementById('sort-select');

  let activeCategory = 'all';
  let activeSort = 'stars';

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      performFilter();
    });
  }

  // Render Highlights Band (Featured skills)
  if (highlightsContainer) {
    const featuredSkills = skillsData.skills.filter((s) => s.featured === true);
    highlightsContainer.innerHTML = featuredSkills
      .map((skill) => renderSkillCard(skill, skillsData.categories))
      .join('');
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('all-skills-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Render Category Navigation
  if (categoryNav && skillsData.categories) {
    categoryNav.innerHTML = `
      <button class="category-nav-item active" data-category="all" type="button">الكل</button>
      ${skillsData.categories
        .map(
          (cat) =>
            `<button class="category-nav-item" data-category="${cat.id}" type="button">${escapeHtml(cat.name_ar)}</button>`
        )
        .join('')}
    `;

    categoryNav.addEventListener('click', (e) => {
      const item = e.target.closest('.category-nav-item');
      if (!item) return;
      categoryNav.querySelectorAll('.category-nav-item').forEach((btn) => btn.classList.remove('active'));
      item.classList.add('active');
      activeCategory = item.dataset.category;
      performFilter();
    });
  }

  function renderGrid(skills) {
    if (!gridContainer) return;

    if (resultsCountEl) {
      resultsCountEl.textContent = `عرض ${skills.length} من أصل ${skillsData.skills.length} مهارة`;
    }

    if (skills.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';
    gridContainer.innerHTML = skills
      .map((skill) => renderSkillCard(skill, skillsData.categories))
      .join('');

    // Trigger staggered scroll reveal observer for freshly rendered cards
    observeCardsScrollEntrance();
  }

  function performFilter() {
    const query = searchInput ? searchInput.value.trim() : '';

    if (clearSearchBtn) {
      clearSearchBtn.style.display = query ? 'flex' : 'none';
    }

    const isFiltered = query.length > 0 || activeCategory !== 'all';
    if (highlightsBand) {
      highlightsBand.style.display = isFiltered ? 'none' : 'block';
    }

    let filtered = searchEngine.search({
      query,
      category: activeCategory,
      difficulty: 'all'
    });

    if (activeSort === 'stars') {
      filtered.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
    } else if (activeSort === 'featured') {
      filtered.sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.github_stars || 0) - (a.github_stars || 0)
      );
    } else if (activeSort === 'name') {
      filtered.sort((a, b) => (a.title_ar || '').localeCompare(b.title_ar || '', 'ar'));
    }

    renderGrid(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', performFilter);
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      performFilter();
    });
  }

  performFilter();
}

/**
 * SKILL DETAIL PAGE
 */
export async function initSkillDetailPage() {
  const { skillsData, toolsData } = await loadData();
  if (!skillsData || !skillsData.skills) return;

  const urlParams = new URLSearchParams(window.location.search);
  let skillId = urlParams.get('id');
  if (!skillId) {
    const pathMatch = window.location.pathname.match(/\/skill\/([^/]+)/);
    if (pathMatch) {
      skillId = decodeURIComponent(pathMatch[1]);
    }
  }

  const container = document.getElementById('skill-detail-container');
  if (!container) return;

  const skill = skillsData.skills.find((s) => s.id === skillId);
  if (!skill) {
    container.innerHTML = `
      <div class="empty-state">
        <h1 class="empty-state-title">المهارة غير موجودة</h1>
        <p class="empty-state-text">عذرًا، لم يتم العثور على المهارة المطلوبة.</p>
        <div style="margin-block-start: 24px;">
          <a href="/" class="btn-electric-pill">العودة إلى الدليل الرئيسي</a>
        </div>
      </div>
    `;
    return;
  }

  const categoryObj = (skillsData.categories || []).find((c) => c.id === skill.category);
  const categoryName = categoryObj ? categoryObj.name_ar : skill.category;

  // Set robots meta tag based strictly on data-driven content_verified
  let metaRobots = document.getElementById('meta-robots') || document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.id = 'meta-robots';
    metaRobots.name = 'robots';
    document.head.appendChild(metaRobots);
  }
  metaRobots.content = skill.content_verified === true ? 'index, follow' : 'noindex, nofollow';

  const effectiveSourceUrl = getEffectiveSourceUrl(skill);

  // If unverified: strictly render ONLY Arabic summary, "غير مراجَع" label, and source repo link.
  // NO copy-prompt button, NO prompt templates, NO integration tabs.
  if (skill.content_verified !== true) {
    container.innerHTML = `
      <header class="detail-hero-section unverified-detail-hero" style="padding-block: var(--spacing-60);">
        <div class="section-container" style="max-width: 780px; margin-inline: auto;">
          <div class="detail-kicker-row" style="display: flex; align-items: center; gap: 12px; margin-block-end: 18px; flex-wrap: wrap;">
            <span class="detail-kicker-label">${escapeHtml(categoryName)}</span>
            <span class="unverified-card-pill" style="background: rgba(245, 158, 11, 0.12); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); font-weight: 700; padding: 4px 12px; border-radius: var(--radius-pill); font-size: 13px;">⚠️ غير مراجَع</span>
            ${
              skill.github_stars
                ? `<span class="detail-stars-badge" style="color: var(--color-saffron-spark); font-size: 13px; font-weight: 600; background: rgba(255,184,41,0.08); border: 1px solid rgba(255,184,41,0.22); border-radius: 9999px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 4px;">★ ${(skill.github_stars).toLocaleString()} نجمة على GitHub</span>`
                : ''
            }
          </div>
          
          <h1 class="detail-headline-sculptural" style="margin-block-end: 20px;">${escapeHtml(skill.title_ar)}</h1>
          
          <div class="unverified-quarantine-box" role="alert" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-card); padding: 22px; margin-block: 24px; text-align: right;">
            <div style="display: flex; align-items: center; gap: 8px; margin-block-end: 8px; color: #fbbf24; font-weight: 700; font-size: 15px;">
              <span>⚠️ مهارة قيد المراجعة والتدقيق</span>
            </div>
            <p style="color: var(--color-bone-white); line-height: 1.8; font-size: 14px; margin: 0;">
              أُعد هذا الشرح العربي استناداً لمعلومات المستودع العامة ولم يخضع بعد للتحقق البشري الدقيق. تم حجب أزرار نسخ البرومبت الجاهز تلقائياً حتى اكتمال التدقيق، ويمكنك مراجعة المصدر مباشرة على GitHub.
            </p>
          </div>

          <div class="detail-summary-block" style="text-align: right; background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-card); padding: 26px; margin-block-end: 28px;">
            <h2 style="font-size: 16px; font-weight: 600; color: var(--color-ash-gray); margin-block-end: 12px;">الشرح العربي للمهارة</h2>
            <p class="detail-summary-airy" style="color: var(--color-bone-white); line-height: 1.8; font-size: 16px; margin: 0;">${escapeHtml(skill.summary_ar)}</p>
          </div>

          <div class="detail-actions-row" style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
            <a href="${escapeHtml(effectiveSourceUrl)}" target="_blank" rel="noopener noreferrer" class="btn-electric-pill" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
              <span>افتح المصدر على GitHub</span>
              <span dir="ltr">↗</span>
            </a>
            <a href="index.html" class="btn-ghost-pill" style="text-decoration: none;">
              العودة للدليل
            </a>
          </div>
        </div>
      </header>
    `;
    return;
  }

  const defaultPromptTemplate =
    'Read this skill and use it whenever my request matches it: {{source_url}}\n' +
    'From now on I will write in Arabic (any dialect). Understand my intent, work internally in English, and reply in Arabic. Keep code, commands, file names and technical terms in English.';

  const linkPromptTemplate = skillsData?.prompt_templates?.link_prompt_en || defaultPromptTemplate;
  const readyPromptEn = linkPromptTemplate.replace(/\{\{source_url\}\}/g, effectiveSourceUrl);

  const verifiedTools = (toolsData || []).filter((t) => t.verified === true);
  const isMultiSkill = skill.kind === 'collection' || skill.kind === 'directory' || !skill.source?.path_in_repo;

  container.innerHTML = `
    <!-- Detail Hero Section -->
    <header class="detail-hero-section">
      <div class="section-container">
        <div class="detail-kicker-row" style="display: flex; align-items: center; gap: 12px; margin-block-end: 16px; flex-wrap: wrap;">
          <span class="detail-kicker-label">${escapeHtml(categoryName)}</span>
          ${
            skill.reviewed_by
              ? `<span class="verified-reviewer-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 12px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 9999px; font-size: 13px; color: #4ade80;">
                  <span>✓ تدقيق بشري: ${escapeHtml(skill.reviewed_by)}</span>
                  ${skill.reviewed_on ? `<span>(${escapeHtml(skill.reviewed_on)})</span>` : ''}
                </span>`
              : ''
          }
          ${
            skill.github_stars
              ? `<span class="detail-stars-badge" style="color: var(--color-saffron-spark); font-size: 13px; font-weight: 600; background: rgba(255,184,41,0.08); border: 1px solid rgba(255,184,41,0.22); border-radius: 9999px; padding: 2px 10px; display: inline-flex; align-items: center; gap: 4px;">★ ${(skill.github_stars).toLocaleString()} نجمة على GitHub</span>`
              : ''
          }
        </div>
        <h1 class="detail-headline-sculptural">${escapeHtml(skill.title_ar)}</h1>
        <p class="detail-summary-airy">${escapeHtml(skill.summary_ar)}</p>

        <div class="detail-actions-row">
          <button id="copy-ready-prompt-btn" class="btn-electric-pill" type="button">
            انسخ البرومبت الجاهز
          </button>
          
          <button id="copy-link-only-btn" class="btn-ghost-pill" type="button">
            انسخ اللينك فقط
          </button>

          <a href="${escapeHtml(effectiveSourceUrl)}" target="_blank" rel="noopener noreferrer" class="text-accent-link">
            افتح المصدر على GitHub ↗
          </a>
        </div>
      </div>
    </header>

    <!-- Editorial Block: Benefits -->
    <section class="editorial-block">
      <div class="section-container">
        <div class="editorial-kicker">القدرات والمزايا</div>
        <h2 class="editorial-statement">ما الذي تقدمه هذه المهارة لعملك؟</h2>
        <ul class="editorial-list">
          ${(skill.benefits_ar || []).map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </div>
    </section>

    <!-- Editorial Block: Use Cases -->
    <section class="editorial-block">
      <div class="section-container">
        <div class="editorial-kicker">حالات الاستخدام</div>
        <h2 class="editorial-statement">أمثلة واقعية يمكنك تطبيقها فوراً</h2>
        <div class="use-cases-grid">
          ${(skill.use_cases_ar || []).map((uc) => `<div class="use-case-box">${escapeHtml(uc)}</div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Editorial Block: Example Prompts -->
    <section class="editorial-block">
      <div class="section-container">
        <div class="editorial-kicker">نماذج الطلبات</div>
        <h2 class="editorial-statement">اطلب من الموديل بالعربية بهذه الصيغ</h2>
        <div class="example-prompts-group">
          ${(skill.example_prompts_ar || [])
            .map(
              (p) => `
            <div class="example-prompt-card">
              <span class="example-prompt-text">${escapeHtml(p)}</span>
              <button class="btn-mini-copy copy-prompt-btn" data-text="${escapeHtml(p)}" type="button" aria-label="نسخ الطلب">
                نسخ الطلب
              </button>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- "ضيفها لأداتك" Integration Section -->
    <section class="tool-integration-section" aria-label="طريقة إضافة المهارة للأداة">
      <div class="section-container">
        <div class="tool-integration-container">
          <h2 class="tool-panel-title">ضيفها لأداتك</h2>
          <p class="tool-panel-subtitle">إرشادات موثقة لإضافة المهارة إلى بيئة العمل أو الشات الذي تستخدمه.</p>

          <!-- Segmented Control Bar -->
          <div class="segmented-control" role="tablist">
            ${verifiedTools
              .map(
                (tool, idx) => `
              <button 
                class="segment-tab-btn ${idx === 0 ? 'active' : ''}" 
                role="tab" 
                aria-selected="${idx === 0 ? 'true' : 'false'}"
                data-tool-id="${escapeHtml(tool.id)}"
                type="button"
              >
                ${escapeHtml(tool.name)}
              </button>
            `
              )
              .join('')}
          </div>

          <div id="tool-tab-content-container" class="tool-tab-content">
            <!-- Rendered by JS -->
          </div>
        </div>

        ${
          skill.content_verified === false
            ? `
          <div class="content-review-note" role="note">
            ⚠️ أُعد هذا الشرح من معلومات عامة عن المهارة، ويُنصح بمراجعة المصدر قبل الاعتماد عليه.
          </div>
        `
            : ''
        }
      </div>
    </section>

    <!-- Floating Capsule for Mobile -->
    <aside class="floating-mobile-capsule">
      <button id="floating-copy-btn" class="btn-electric-pill" type="button">
        انسخ البرومبت الجاهز
      </button>
    </aside>
  `;

  function renderToolTab(toolId) {
    const tool = verifiedTools.find((t) => t.id === toolId) || verifiedTools[0];
    if (!tool) return;

    const contentContainer = document.getElementById('tool-tab-content-container');
    if (!contentContainer) return;

    const resolvedSteps = resolveToolSteps(tool.steps_ar || [], skill);

    contentContainer.innerHTML = `
      ${
        isMultiSkill && (tool.id === 'gemini-cli' || tool.id === 'codex-cli')
          ? `<div class="collection-note">ℹ️ هذا الريبو يضم مهارات كثيرة. افتحه واختر الفولدر المناسب.</div>`
          : ''
      }

      <div class="tool-meta-badge-row">
        <span><strong>المتطلبات:</strong> ${escapeHtml(tool.requires_ar || 'لا يلزم شيء.')}</span>
        ${tool.skills_path ? `<span><strong>المسار الافتراضي:</strong> <code dir="ltr">${escapeHtml(tool.skills_path)}</code></span>` : ''}
      </div>

      <div>
        <h3 style="font-size: 16px; font-weight: 500; margin-block-end: 14px; color: var(--color-bone-white);">خطوات الإعداد:</h3>
        <ol class="tool-steps-ordered">
          ${resolvedSteps
            .map((step) => {
              const formattedStep = step.replace(
                /(~[^\s]+|\$[^\s]+|\.agents[^\s]+|\.claude[^\s]+|\.gemini[^\s]+|\.copilot[^\s]+|\.cursor[^\s]+|gemini skills[^\n<]+|git clone[^\s]+|\/plugin[^\n]+)/g,
                '<code dir="ltr">$1</code>'
              );
              return `<li>${formattedStep}</li>`;
            })
            .join('')}
        </ol>
      </div>

      <div class="tool-invoke-box">
        <strong style="color: var(--color-saffron-spark);">طريقة الاستدعاء:</strong> ${escapeHtml(tool.invoke_ar || '')}
      </div>

      <div class="tool-footer-row">
        <span>${tool.verified_on ? `آخر مراجعة: <bdi dir="ltr">${escapeHtml(tool.verified_on)}</bdi>` : ''}</span>
        ${
          tool.docs_url
            ? `<a href="${escapeHtml(tool.docs_url)}" target="_blank" rel="noopener noreferrer" class="text-accent-link">التوثيق الرسمي ↗</a>`
            : ''
        }
      </div>
    `;
  }

  const tabButtons = container.querySelectorAll('.segment-tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderToolTab(btn.dataset.toolId);
    });
  });

  renderToolTab(verifiedTools[0]?.id || 'any-chat');

  const copyReadyBtn = document.getElementById('copy-ready-prompt-btn');
  if (copyReadyBtn) {
    copyReadyBtn.addEventListener('click', async () => {
      const ok = await copyToClipboard(readyPromptEn, 'تم نسخ البرومبت الجاهز بنجاح!');
      if (ok) {
        const originalText = copyReadyBtn.textContent;
        copyReadyBtn.textContent = 'تم النسخ بنجاح ✓';
        copyReadyBtn.style.backgroundColor = '#10b981';
        copyReadyBtn.style.color = '#ffffff';
        setTimeout(() => {
          copyReadyBtn.textContent = originalText;
          copyReadyBtn.style.backgroundColor = '';
          copyReadyBtn.style.color = '';
        }, 2000);
      }
    });
  }

  const floatingCopyBtn = document.getElementById('floating-copy-btn');
  if (floatingCopyBtn) {
    floatingCopyBtn.addEventListener('click', async () => {
      const ok = await copyToClipboard(readyPromptEn, 'تم نسخ البرومبت الجاهز بنجاح!');
      if (ok) {
        const originalText = floatingCopyBtn.textContent;
        floatingCopyBtn.textContent = 'تم النسخ بنجاح ✓';
        floatingCopyBtn.style.backgroundColor = '#10b981';
        floatingCopyBtn.style.color = '#ffffff';
        setTimeout(() => {
          floatingCopyBtn.textContent = originalText;
          floatingCopyBtn.style.backgroundColor = '';
          floatingCopyBtn.style.color = '';
        }, 2000);
      }
    });
  }

  const copyLinkBtn = document.getElementById('copy-link-only-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      const ok = await copyToClipboard(effectiveSourceUrl, 'تم نسخ رابط المصدر!');
      if (ok) {
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'تم النسخ ✓';
        copyLinkBtn.style.borderColor = '#10b981';
        copyLinkBtn.style.color = '#10b981';
        setTimeout(() => {
          copyLinkBtn.textContent = originalText;
          copyLinkBtn.style.borderColor = '';
          copyLinkBtn.style.color = '';
        }, 2000);
      }
    });
  }

  container.querySelectorAll('.copy-prompt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      copyToClipboard(text, 'تم نسخ نموذج الطلب!');
    });
  });
}

/**
 * Dynamic shared folder detection from tools.json
 */
export function detectSharedFolderTips(tools) {
  const folderToTools = new Map();

  for (const tool of tools) {
    if (!tool.verified || !tool.paths) continue;
    const pathValues = Object.values(tool.paths).join(' ');
    const matches = pathValues.match(/\.?[a-zA-Z0-9_-]+\/skills\//g) || [];
    for (const folder of new Set(matches)) {
      if (!folderToTools.has(folder)) {
        folderToTools.set(folder, []);
      }
      folderToTools.get(folder).push(tool);
    }
  }

  const sharedTips = [];
  for (const [folder, toolList] of folderToTools.entries()) {
    if (toolList.length > 1) {
      sharedTips.push({ folder, tools: toolList });
    }
  }
  return sharedTips;
}

/**
 * HOW TO USE PAGE
 */
export async function initHowToUsePage() {
  const { toolsData } = await loadData();
  const tipsContainer = document.getElementById('dynamic-shared-folder-tips');

  if (tipsContainer && Array.isArray(toolsData)) {
    const sharedTips = detectSharedFolderTips(toolsData);
    if (sharedTips.length > 0) {
      tipsContainer.innerHTML = sharedTips
        .map((tip) => {
          const linksHtml = tip.tools
            .map((t) =>
              t.docs_url
                ? `<a href="${escapeHtml(t.docs_url)}" target="_blank" rel="noopener noreferrer" style="color: var(--color-saffron-spark); text-decoration: underline;">${escapeHtml(t.name)}</a>`
                : `<strong>${escapeHtml(t.name)}</strong>`
            )
            .join('، ');

          return `
          <div style="background-color: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-card); padding: 24px; margin-block: 20px;">
            <p style="font-size: var(--text-body); color: var(--color-bone-white); margin: 0;">
              💡 <strong>معلومة مفيدة موثقة:</strong> فولدر <code dir="ltr">${escapeHtml(tip.folder)}</code> تقرؤه هذه الأدوات: ${linksHtml}. يعني وضع المهارة في هذا الفولدر يخدمها في أكثر من أداة معًا.
            </p>
          </div>
        `;
        })
        .join('');
    }
  }
}

/**
 * LEADERBOARD PAGE
 */
export async function initLeaderboardPage() {
  const { skillsData } = await loadData();
  if (!skillsData || !skillsData.skills) return;

  const tbody = document.getElementById('leaderboard-tbody');
  const searchInput = document.getElementById('leaderboard-search');
  const categorySelect = document.getElementById('leaderboard-category-filter');
  if (!tbody) return;

  // Populate category options
  if (categorySelect && skillsData.categories) {
    categorySelect.innerHTML =
      `<option value="all">جميع الأقسام (${skillsData.skills.length} مهارة)</option>` +
      skillsData.categories
        .map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name_ar)}</option>`)
        .join('');
  }

  // Normalize repository key (owner/repo)
  function getRepoKey(s) {
    const owner = (s.source?.owner || '').toLowerCase();
    const repo = (s.source?.repo?.split('/')[1] || s.source?.repo || '').toLowerCase();
    return `${owner}/${repo}`;
  }

  // Diverse Capped Leaderboard: Qualified skills only in top ranks (Max 3 per repo)
  function computeDiverseLeaderboard(allSkills) {
    const qualified = allSkills.filter(
      (s) => s.repo_type === 'skills' && s.source?.path_in_repo && s.source.path_in_repo.trim() !== ''
    );
    qualified.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));

    const repoCounts = {};
    const topTier = [];
    const extendedSkillsTier = [];

    for (const skill of qualified) {
      const key = getRepoKey(skill);
      repoCounts[key] = (repoCounts[key] || 0) + 1;
      if (repoCounts[key] <= 3) {
        topTier.push({ ...skill, repo_skill_order: repoCounts[key], tier: 'primary_diverse_skill' });
      } else {
        extendedSkillsTier.push({ ...skill, repo_skill_order: repoCounts[key], tier: 'extended_skill' });
      }
    }

    const toolsAndPlugins = allSkills.filter((s) => !qualified.some((q) => q.id === s.id));
    toolsAndPlugins.sort((a, b) => (b.github_stars || 0) - (a.github_stars || 0));
    const toolsTier = toolsAndPlugins.map((s, idx) => ({
      ...s,
      repo_skill_order: idx + 1,
      tier: 'extended_tool_or_plugin'
    }));

    return [...topTier, ...extendedSkillsTier, ...toolsTier];
  }

  // Ensure skills are sorted with 3-skills-per-repo diversity cap
  const sortedSkills = computeDiverseLeaderboard(skillsData.skills);

  function renderTable(skills) {
    if (skills.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 48px 20px; text-align: center; color: var(--color-silver-mist);">
            لا توجد مهارات تطابق بحثك في لوحة الصدارة.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = skills
      .map((skill) => {
        const globalRank = sortedSkills.findIndex((s) => s.id === skill.id) + 1;
        let rankBadge = `#${globalRank}`;
        if (globalRank === 1) rankBadge = '🥇 #1';
        else if (globalRank === 2) rankBadge = '🥈 #2';
        else if (globalRank === 3) rankBadge = '🥉 #3';

        const starsFormatted = formatStars(skill.github_stars);
        const catObj = (skillsData.categories || []).find((c) => c.id === skill.category);
        const catName = catObj ? catObj.name_ar : skill.category;
        const effectiveUrl = getEffectiveSourceUrl(skill);
        let repoDisplay = 'GitHub';
        try {
          const parsed = new URL(effectiveUrl);
          const parts = parsed.pathname.replace(/^\//, '').split('/');
          if (parts.length >= 2) {
            repoDisplay = `${parts[0]}/${parts[1]}`;
          }
        } catch {}

        const linkPromptTemplate = skillsData.prompt_templates?.link_prompt_en || '';
        const readyPrompt = linkPromptTemplate.replace(/\{\{source_url\}\}/g, effectiveUrl);

        return `
          <tr style="border-bottom: 1px solid var(--border-subtle); transition: background-color 0.15s ease;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.02)'" onmouseout="this.style.backgroundColor='transparent'">
            <td style="padding: 14px 20px; text-align: center; font-weight: 700; color: ${
              globalRank <= 3 ? 'var(--color-saffron-spark)' : 'var(--color-silver-mist)'
            };">
              ${rankBadge}
            </td>
            <td style="padding: 14px 20px; text-align: center;">
              <span class="card-stars-badge" title="${(skill.github_stars || 0).toLocaleString()} نجمة على GitHub">★ ${starsFormatted}</span>
            </td>
            <td style="padding: 14px 20px;">
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <a href="skill.html?id=${encodeURIComponent(skill.id)}" style="color: var(--color-bone-white); font-weight: 600; text-decoration: none; font-size: 15px;" class="leaderboard-skill-link">
                    ${escapeHtml(skill.title_ar)}
                  </a>
                  ${skill.tier === 'extended_tool_or_plugin' ? `<span style="font-size: 11px; padding: 2px 6px; background: rgba(148, 163, 184, 0.12); color: #94a3b8; border-radius: 4px; border: 1px solid rgba(148, 163, 184, 0.25);">${skill.repo_type === 'tool' ? 'أداة' : skill.repo_type === 'plugin' ? 'إضافة' : skill.repo_type === 'list' ? 'قائمة' : 'مجموعة'}</span>` : ''}
                  ${skill.responsible_use_note_ar ? `<span style="font-size: 11px; padding: 2px 6px; background: rgba(245, 158, 11, 0.12); color: #fbbf24; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.25);" title="${escapeHtml(skill.responsible_use_note_ar)}">⚠️ استخدام مسؤول</span>` : ''}
                </div>
                <span style="color: var(--color-silver-mist); font-size: 12px; font-family: var(--font-mono);" dir="ltr">${escapeHtml(
                  skill.name
                )}</span>
              </div>
            </td>
            <td style="padding: 14px 20px;">
              <span style="display: inline-block; padding: 2px 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: var(--radius-pill); font-size: 12px; color: var(--color-ash-gray);">
                ${escapeHtml(catName)}
              </span>
            </td>
            <td style="padding: 14px 20px;">
              <a href="${escapeHtml(effectiveUrl)}" target="_blank" rel="noopener noreferrer" style="color: #b392ff; text-decoration: none; font-size: 13px; font-family: var(--font-mono); display: inline-flex; align-items: center; gap: 4px;" dir="ltr">
                ${escapeHtml(repoDisplay)} ↗
              </a>
            </td>
            <td style="padding: 14px 20px; text-align: center;">
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <a href="skill.html?id=${encodeURIComponent(skill.id)}" class="btn-ghost" style="padding: 6px 12px; font-size: 12px; border-radius: var(--radius-pill); text-decoration: none; border: 1px solid var(--border-subtle); color: var(--color-bone-white);">
                  التفاصيل
                </a>
                ${
                  skill.content_verified === true
                    ? `<button 
                        type="button" 
                        class="btn-copy-prompt" 
                        data-prompt="${escapeHtml(readyPrompt)}" 
                        style="padding: 6px 12px; font-size: 12px; border-radius: var(--radius-pill); background: var(--surface-card); border: 1px solid var(--border-subtle); color: var(--color-bone-white); cursor: pointer;"
                      >
                        نسخ البرومبت
                      </button>`
                    : `<span style="padding: 4px 10px; font-size: 11px; font-weight: 600; color: #fbbf24; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); border-radius: var(--radius-pill);">غير مراجَع</span>`
                }
              </div>
            </td>
          </tr>
        `;
      })
      .join('');

    tbody.querySelectorAll('.btn-copy-prompt').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const prompt = btn.getAttribute('data-prompt') || '';
        const originalText = btn.textContent;
        const ok = await copyToClipboard(prompt);
        if (ok) {
          btn.textContent = '✓ تم النسخ';
          btn.style.borderColor = 'var(--color-electric-iris)';
          btn.style.color = 'var(--color-electric-iris)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        }
      });
    });
  }

  // Initial render
  renderTable(sortedSkills);

  // Search and Filter handler
  function applyFilters() {
    const rawQuery = (searchInput?.value || '').trim();
    const query = normalizeArabic(rawQuery);
    const selectedCategory = categorySelect?.value || 'all';

    let filtered = sortedSkills;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (query) {
      filtered = filtered.filter((s) => {
        const titleNorm = normalizeArabic(s.title_ar || '');
        const summaryNorm = normalizeArabic(s.summary_ar || '');
        const nameNorm = (s.name || '').toLowerCase();
        const catNorm = (s.category || '').toLowerCase();
        const tagsNorm = normalizeArabic((s.tags || []).join(' '));
        return (
          titleNorm.includes(query) ||
          summaryNorm.includes(query) ||
          nameNorm.includes(rawQuery.toLowerCase()) ||
          catNorm.includes(rawQuery.toLowerCase()) ||
          tagsNorm.includes(query)
        );
      });
    }

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  categorySelect?.addEventListener('change', applyFilters);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;
  try {
    if (page === 'index') {
      await initIndexPage();
    } else if (page === 'skill-detail') {
      await initSkillDetailPage();
    } else if (page === 'how-to-use') {
      await initHowToUsePage();
    } else if (page === 'leaderboard') {
      await initLeaderboardPage();
    }
  } catch (err) {
    console.error('Page init error:', err);
  }

  // Initialize Creative Scroll Animations & Micro-Interactions
  try {
    initScrollEffects();
  } catch (scrollErr) {
    console.warn('Scroll effects init warning:', scrollErr);
  }

  // Initialize AI Bot on all pages
  try {
    const data = await loadData();
    initAiBot(data?.skillsData?.skills || []);
  } catch (botErr) {
    console.warn('Bot init warning:', botErr);
  }
});
