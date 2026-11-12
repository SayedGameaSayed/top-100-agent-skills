/**
 * i18n.js - Language (AR/EN) & Theme (Dark/Light) System
 * Ensures complete, first-class localization across all pages.
 */

export const UI_STRINGS = {
  ar: {
    siteName: 'دليل مهارات الذكاء الاصطناعي',
    navHome: 'الرئيسية',
    navLeaderboard: 'لوحة الصدارة',
    navHowToUse: 'طريقة الاستخدام',
    navAiAdvisor: '✨ المستشار الذكي',
    navBrowse: 'تصفح المهارات',
    navStar: 'Star',
    langToggle: 'English',
    themeLight: 'المظهر الأبيض',
    themeDark: 'المظهر الداكن',
    heroKicker: '✧ دليل مهارات الذكاء الاصطناعي',
    heroHeadline: 'افهم المهارة قبل أن تستخدمها.',
    heroSub: 'شرح عربي واضح ومباشر لأشهر AI Agent Skills المفتوحة، مع إرشادات موثقة لإضافتها إلى محادثتك أو بيئة التطوير.',
    searchPlaceholder: 'ابحث عن مهارة: مستندات، تصميم، اختبار، Word…',
    heroAdvisorBadge: '✨ أداة ذكية',
    heroAdvisorCtaText: 'محتار تبدأ بأي مهارة؟ انزل واستخدم مستشار الذكاء الاصطناعي لاختيار الأنسب لمشروعك',
    advisorAriaLabel: 'مستشار المهارات الذكي',
    quickShare: 'مشاركة سريعة:',
    shareX: 'منصة X',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'واتساب',
    copyLink: 'نسخ الرابط',
    copied: 'نُسخ ✓',
    copyToClipboardDefault: 'نُسخ إلى الحافظة',
    copySiteSuccess: 'نُسخ رابط الدليل، شاركه مع زملائك ومجتمعك',
    copyPromptSuccess: 'نُسخ Prompt التشغيل',
    copyPromptBtnSuccess: 'نُسخ ✓',
    copyLinkSuccess: 'نُسخ رابط المصدر',
    copySampleSuccess: 'نُسخ Prompt المثال',
    copyErrorFallback: 'تعذّر النسخ تلقائيًا، انسخ النص يدويًا.',
    featuredTitle: 'المهارات الأشهر',
    allSkillsTitle: 'جميع المهارات المتاحة',
    allCategories: 'الكل',
    showingSkills: (n, total) => {
      if (n === 0) return `لا توجد مهارات مطابقة (من أصل ${total})`;
      if (n === 1) return `عرض مهارة واحدة من أصل ${total}`;
      if (n === 2) return `عرض مهارتين من أصل ${total}`;
      if (n <= 10) return `عرض ${n} مهارات من أصل ${total}`;
      return `عرض ${n} مهارة من أصل ${total}`;
    },
    sortHighestStars: 'الأعلى نجومًا على GitHub ★',
    sortAlphabetical: 'أبجديًا (أ - ي)',
    emptySearch: 'لا توجد مهارات مطابقة لبحثك',
    emptySearchSub: 'جرّب البحث بكلمات مثل "تصميم" أو "بيانات" أو "ملفات" أو "اختبار".',
    copyPromptBtn: 'نسخ Prompt التشغيل',
    copyLinkBtn: 'نسخ رابط المصدر',
    openGithub: 'فتح المصدر على GitHub',
    benefitsTitle: 'القدرات والمزايا',
    benefitsSub: 'ما الذي تضيفه هذه المهارة إلى عملك؟',
    useCasesTitle: 'حالات الاستخدام',
    useCasesSub: 'أمثلة عملية جاهزة للتطبيق مباشرةً',
    integrationTitle: 'تفعيل المهارة في أدوات AI',
    humanVerified: (reviewer, date) => `✓ مراجَعة بشرية: ${reviewer}${date ? ` (${date})` : ''}`,
    starsOnGithub: (stars) => `★ ${stars} نجمة على GitHub`,
    backToDirectory: 'العودة إلى الدليل',
    viewAllSkills: 'عرض جميع المهارات ↓',
    viewSkillAction: 'عرض المهارة ←',
    sortBy: 'الترتيب حسب:',
    sortFeatured: 'المميزة والأشهر',
    assistantBtn: 'مساعد المهارات',
    backToTop: 'للأعلى',
    scrollTopLabel: 'العودة إلى أعلى الصفحة',
    categoryFilter: 'التصنيف:',
    leaderboardDisclaimer: 'ملاحظة: النجوم تعود إلى GitHub Repository الأصلي وتُحدَّث دوريًا، مع حد أقصى 3 مهارات لكل Repository لضمان التنوع.',
    // Leaderboard
    leaderboardKicker: '★ التصنيف العالمي لـ Agent Skills (بحسب نجوم GitHub Repository)',
    leaderboardTitle: 'لوحة صدارة المهارات الأكثر شهرة',
    leaderboardSub: 'ترتيب أشهر AI Agent Skills مفتوحة المصدر في مجتمع المطورين، وفق نجوم GitHub Repository الأصلي مع تحديث يومي وشرح عربي لكل مهارة.',
    leaderboardNoticeTitle: 'تنبيه شفافية:',
    leaderboardNoticeText: 'تُحتسَب النجوم على مستوى GitHub Repository كاملًا، لا للمهارة وحدها.',
    leaderboardDateText: 'نجوم GitHub Repository كما في: 1 نوفمبر 2026 (تحديث كل 24 ساعة)',
    leaderboardSearchPlaceholder: 'ابحث في لوحة الصدارة: TDD أو Cloud أو Python أو تصميم…',
    leaderboardCategoryAll: (n) => `جميع التصنيفات (${n} مهارة)`,
    thRank: 'الترتيب',
    thSkill: 'المهارة',
    thCategory: 'التصنيف',
    thStars: 'نجوم Repository ★',
    thRepo: 'Repository الأصلي',
    thAction: 'الإجراءات',
    btnDetails: 'التفاصيل',
    btnCopyPrompt: 'نسخ Prompt',
    unreviewedBadge: 'غير مراجَع',
    responsibleUseBadge: 'استخدام مسؤول',
    emptyLeaderboard: 'لا توجد مهارات مطابقة لبحثك في لوحة الصدارة.',
    loadingCatalog: 'جارٍ التحميل…',
    loadingLeaderboard: 'جارٍ تحميل لوحة الصدارة…',
    loadingSkill: 'جارٍ تحميل بيانات المهارة…',
    // Tool Integration Section
    toolIntegrationTitle: 'أضفها إلى أداتك',
    toolIntegrationSub: 'إرشادات موثقة لتفعيل المهارة في بيئة التطوير أو أداة المحادثة التي تستخدمها.',
    toolRequirements: 'المتطلبات:',
    toolDefaultPath: 'المسار التلقائي:',
    toolSetupSteps: 'خطوات الإعداد:',
    toolHowToInvoke: 'طريقة الاستدعاء:',
    toolLastVerified: 'آخر مراجعة:',
    toolOfficialDocs: 'التوثيق الرسمي ↗',
    toolMultiSkillNote: 'ℹ️ يضم هذا GitHub Repository عدة مهارات. افتحه واختر المجلد المناسب.',
    toolNoSetup: 'لا تتطلب إعدادًا مسبقًا.',
    promptFormatsTitle: 'أمثلة Prompts',
    promptFormatsSub: 'صيغ جاهزة للتجربة مع AI Model مباشرةً',
    copyPromptMini: 'نسخ Prompt',
    // Skill Detail & Quarantine States
    skillNotFoundTitle: 'المهارة غير موجودة',
    skillNotFoundText: 'عذرًا، لم نجد المهارة المطلوبة في الدليل.',
    unverifiedHeading: 'مهارة قيد المراجعة والتدقيق',
    unverifiedNoticeBody: 'أُعد هذا الشرح العربي استنادًا إلى المعلومات العامة في GitHub Repository، ولم يخضع بعد للمراجعة البشرية الكاملة. حُجبت أزرار نسخ Prompt التشغيل مؤقتًا حتى اكتمال التدقيق، ويمكنك الاطلاع على المصدر مباشرةً في GitHub.',
    unverifiedSummaryTitle: 'الشرح العربي للمهارة',
    unverifiedReviewNote: '⚠️ أُعد هذا الشرح من المعلومات العامة للمهارة، ويُنصح بمراجعة المصدر قبل الاعتماد عليه.',
    // Footer
    footerDesc: 'دليل مهارات الذكاء الاصطناعي: مشروع مجتمعي مفتوح المصدر بإشراف وتدقيق سيد جمعة.',
    // AI Bot
    botTitle: 'مساعد المهارات الذكي',
    botSub: 'احصل على ترشيحات فورية لأفضل المهارات',
    botWelcome: 'أهلًا بك! أنا مساعد المهارات الذكي. صف ما تريد إنجازه وسأرشح لك أنسب المهارات لمشروعك.',
    botPlaceholder: 'صف ما تريد إنجازه أو الكود الذي تبنيه…',
    botSend: 'إرسال',
    // Difficulties
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  },
  en: {
    siteName: 'Top 100 AI Agent Skills',
    navHome: 'Home',
    navLeaderboard: 'Leaderboard',
    navHowToUse: 'How to Use',
    navAiAdvisor: '✨ AI Advisor',
    navBrowse: 'Browse Skills',
    navStar: 'Star',
    langToggle: 'العربية',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    heroKicker: '✧ Top 100 AI Agent Skills',
    heroHeadline: 'Understand the skill before you use it.',
    heroSub: 'Curated directory of the top 100 open-source AI agent skills, with verified prompts ready to copy for Claude, Cursor, ChatGPT, and Codex.',
    searchPlaceholder: 'Search skills: word, excel, design, testing, pdf...',
    heroAdvisorBadge: '✨ AI Feature',
    heroAdvisorCtaText: 'Not sure which skill to start with? Scroll down to use the AI Skills Advisor',
    advisorAriaLabel: 'AI Skills Advisor',
    quickShare: 'Quick Share:',
    shareX: 'X / Twitter',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'WhatsApp',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    copyToClipboardDefault: 'Copied to clipboard!',
    copySiteSuccess: 'Directory link copied! Share it with your team & community',
    copyPromptSuccess: 'Ready prompt copied!',
    copyPromptBtnSuccess: 'Copied ✓',
    copyLinkSuccess: 'Source URL copied!',
    copySampleSuccess: 'Example prompt copied!',
    copyErrorFallback: 'Automatic copy failed. Please copy the text manually.',
    featuredTitle: 'Featured Skills',
    allSkillsTitle: 'All Available Skills',
    allCategories: 'All',
    showingSkills: (n, total) => `Showing ${n} of ${total} skills`,
    sortHighestStars: 'Highest GitHub Stars ★',
    sortAlphabetical: 'Alphabetical (A - Z)',
    emptySearch: 'No skills found matching your search',
    emptySearchSub: 'Try searching with general terms like "design", "data", "files", or "testing".',
    copyPromptBtn: 'Copy Ready Prompt',
    copyLinkBtn: 'Copy Link Only',
    openGithub: 'Open Source on GitHub',
    benefitsTitle: 'Capabilities & Benefits',
    benefitsSub: 'What does this skill provide for your workflow?',
    useCasesTitle: 'Real-World Use Cases',
    useCasesSub: 'Practical examples you can apply immediately',
    integrationTitle: 'How to Integrate into AI Tools',
    humanVerified: (reviewer, date) => `✓ Verified by: ${reviewer}${date ? ` (${date})` : ''}`,
    starsOnGithub: (stars) => `★ ${stars} on GitHub`,
    backToDirectory: '← Back to Directory',
    viewAllSkills: 'View all skills ↗',
    viewSkillAction: 'View Skill →',
    sortBy: 'Sort by:',
    sortFeatured: 'Featured & Popular',
    assistantBtn: 'Skills Assistant',
    backToTop: 'Top',
    scrollTopLabel: 'Back to top',
    categoryFilter: 'Filter by category:',
    leaderboardDisclaimer: 'Note: Stars reflect the parent GitHub repository and are refreshed via CI. Capped at 3 skills per repo to ensure diversity.',
    // Leaderboard
    leaderboardKicker: '★ Global Ranking of Agent Skills (by repo stars)',
    leaderboardTitle: 'Leaderboard | Top Verified Agent Skills',
    leaderboardSub: 'Top open-source agent skills ranked by GitHub stars, protected by diversity caps (max 3 skills per repository).',
    leaderboardNoticeTitle: 'Transparency Notice:',
    leaderboardNoticeText: 'Stars shown belong to the parent GitHub repository, not the individual skill alone.',
    leaderboardDateText: 'Repository stars as of: November 2026 (Refreshed every 24h)',
    leaderboardSearchPlaceholder: 'Search leaderboard: TDD, cloud, python, design...',
    leaderboardCategoryAll: (n) => `All Categories (${n} skills)`,
    thRank: 'Rank',
    thSkill: 'Skill',
    thCategory: 'Category',
    thStars: 'Repo Stars ★',
    thRepo: 'Original Repository',
    thAction: 'Actions',
    btnDetails: 'Details',
    btnCopyPrompt: 'Copy Prompt',
    unreviewedBadge: 'Unreviewed',
    responsibleUseBadge: 'Responsible Use',
    emptyLeaderboard: 'No skills matched your search query.',
    loadingCatalog: 'Loading...',
    loadingLeaderboard: 'Loading leaderboard...',
    loadingSkill: 'Loading skill details...',
    // Tool Integration Section
    toolIntegrationTitle: 'Add to Your Tool',
    toolIntegrationSub: 'Documented instructions to connect this skill to your workspace, IDE, or chat.',
    toolRequirements: 'Requirements:',
    toolDefaultPath: 'Default Path:',
    toolSetupSteps: 'Setup Instructions:',
    toolHowToInvoke: 'How to Invoke:',
    toolLastVerified: 'Last verified:',
    toolOfficialDocs: 'Official Documentation ↗',
    toolMultiSkillNote: 'ℹ️ This repository contains multiple skills. Open the repo and select the folder.',
    toolNoSetup: 'No setup required.',
    promptFormatsTitle: 'Prompt Formats',
    promptFormatsSub: 'Ask the model with these prompt templates',
    copyPromptMini: 'Copy Prompt',
    // Skill Detail & Quarantine States
    skillNotFoundTitle: 'Skill Not Found',
    skillNotFoundText: 'Sorry, the requested skill could not be found in the directory.',
    unverifiedHeading: 'Skill Under Review & Verification',
    unverifiedNoticeBody: 'This summary was prepared from public repository information and has not yet completed human verification. Ready-prompt copy actions are disabled until review completes. You can inspect the source directly on GitHub.',
    unverifiedSummaryTitle: 'Skill Overview',
    unverifiedReviewNote: '⚠️ This overview was prepared from public skill information. Review the source repository before relying on it.',
    // Footer
    footerDesc: 'Top 100 AI Agent Skills — Independent open-source community directory curated and maintained by Sayed Gamea.',
    // AI Bot
    botTitle: 'AI Skills Assistant',
    botSub: 'Instant recommendations from top 100 skills',
    botWelcome: 'Hello! I am your AI Skills Assistant. Describe what you want to build or achieve, and I will recommend the top verified skills for you.',
    botPlaceholder: 'Describe your task or coding goal...',
    botSend: 'Send',
    // Difficulties
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }
};

let currentLang = 'en';
let currentTheme = 'dark';
const listeners = [];

export function getLang() {
  return currentLang;
}

export function getTheme() {
  return currentTheme;
}

export function t(key, ...args) {
  const dict = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const val = dict[key];
  if (typeof val === 'function') {
    return val(...args);
  }
  return val !== undefined ? val : (UI_STRINGS.en[key] || key);
}

export function onStateChange(fn) {
  listeners.push(fn);
}

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn({ lang: currentLang, theme: currentTheme });
    } catch (e) {
      console.error('Error in i18n listener', e);
    }
  });
}

/**
 * Appends ?lang=ar to internal links only when Arabic mode is selected;
 * English is the default language on clean URLs.
 */
export function formatUrlWithLang(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('javascript:')) {
    return url;
  }
  if (currentLang !== 'ar') return url;
  try {
    const [baseAndQuery, hash = ''] = url.split('#');
    const [path, query = ''] = baseAndQuery.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', 'ar');
    return `${path}?${params.toString()}${hash ? `#${hash}` : ''}`;
  } catch {
    return url;
  }
}

export function setLanguage(newLang) {
  currentLang = newLang === 'ar' ? 'ar' : 'en';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  try {
    localStorage.setItem('site_lang', currentLang);
  } catch {}
  updateHeaderControls();
  applyTranslationsToDocument();
  notifyListeners();
}

export function setTheme(newTheme) {
  currentTheme = newTheme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  try {
    localStorage.setItem('site_theme', currentTheme);
  } catch {}
  updateHeaderControls();
  notifyListeners();
}

/**
 * Toggle Language: clean URL for English default, ?lang=ar for Arabic
 */
export function toggleLanguage() {
  const targetLang = currentLang === 'ar' ? 'en' : 'ar';
  try {
    localStorage.setItem('site_lang', targetLang);
  } catch {}

  const url = new URL(window.location.href);
  if (targetLang === 'ar') {
    url.searchParams.set('lang', 'ar');
  } else {
    url.searchParams.delete('lang');
  }
  window.location.href = url.toString();
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export function updateHeaderControls() {
  // Update Language Button
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = currentLang === 'ar' ? 'English' : 'العربية';
  }

  // Update Theme Button
  const themeBtnText = document.getElementById('theme-btn-text');
  const themeBtnIcon = document.getElementById('theme-btn-icon');
  if (themeBtnText) {
    themeBtnText.textContent = currentTheme === 'dark' ? t('themeLight') : t('themeDark');
  }
  if (themeBtnIcon) {
    themeBtnIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Update Brand Lockup text & link
  const brandLockup = document.querySelector('.brand-lockup');
  if (brandLockup) {
    brandLockup.href = formatUrlWithLang('index.html');
    const brandSpan = brandLockup.querySelector('span');
    if (brandSpan) brandSpan.textContent = t('siteName');
  }

  // Update Static Navigation Links and persist ?lang=ar when in Arabic mode
  const navLinks = document.querySelectorAll('.header-nav .nav-ghost-link');
  if (navLinks.length >= 3) {
    navLinks[0].textContent = t('navHome');
    navLinks[0].href = formatUrlWithLang('index.html');

    navLinks[1].textContent = t('navLeaderboard');
    navLinks[1].href = formatUrlWithLang('leaderboard.html');

    navLinks[2].textContent = t('navHowToUse');
    navLinks[2].href = formatUrlWithLang('how-to-use.html');
  }

  const advisorNavPill = document.getElementById('nav-advisor-pill');
  if (advisorNavPill) {
    advisorNavPill.textContent = t('navAiAdvisor');
    const isHome = document.body?.dataset?.page === 'index';
    advisorNavPill.href = isHome ? '#ai-advisor-section' : formatUrlWithLang('index.html#ai-advisor-section');
  }

  const browseBtn = document.querySelector('.nav-cta-pill');
  if (browseBtn && browseBtn.getAttribute('href')?.includes('#')) {
    browseBtn.textContent = t('navBrowse');
  }
}

/**
 * Formats numbers using Western Arabic digits (0-9) consistently across tech UI
 */
export function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(Number(n) || 0);
}

/**
 * Locale-aware date formatting helper
 */
export function formatDate(value) {
  if (!value) return '';
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(currentLang === 'en' ? 'en-US' : 'ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch {
    return String(value);
  }
}

/**
 * Comprehensive DOM translator for static headers, footers, and page sections
 */
export function applyTranslationsToDocument() {
  const lang = currentLang;
  const page = document.body?.dataset?.page || '';
  const path = location.pathname || '';
  const isLeaderboard = page === 'leaderboard' || path.endsWith('leaderboard.html') || path === '/leaderboard';
  const isHowToUse = page === 'how-to-use' || path.endsWith('how-to-use.html') || path === '/how-to-use';
  const isSkillDetail = page === 'skill-detail' || page === 'skill' || path.endsWith('skill.html') || path.startsWith('/skill/');

  // 1. Page Title & Meta
  if (lang === 'en') {
    if (isLeaderboard) {
      document.title = 'Leaderboard | Top 100 AI Agent Skills';
    } else if (isHowToUse) {
      document.title = 'How to Use AI Agent Skills | Comprehensive Guide';
    } else if (!isSkillDetail) {
      document.title = 'Top 100 AI Agent Skills | Curated Open-Source Directory';
    }
  } else {
    if (isLeaderboard) {
      document.title = 'لوحة الصدارة | دليل مهارات الذكاء الاصطناعي';
    } else if (isHowToUse) {
      document.title = 'طريقة الاستخدام | دليل مهارات الذكاء الاصطناعي';
    } else if (!isSkillDetail) {
      document.title = 'دليل مهارات الذكاء الاصطناعي | Top 100 Agent Skills';
    }
  }

  // 2. Footer
  const footerDesc = document.querySelector('.site-footer p');
  if (footerDesc) {
    footerDesc.textContent = t('footerDesc');
  }
  const footerLinks = document.querySelectorAll('.site-footer .footer-nav a');
  if (footerLinks.length >= 3) {
    footerLinks[0].textContent = t('navHome');
    footerLinks[0].href = formatUrlWithLang('index.html');

    footerLinks[1].textContent = t('navLeaderboard');
    footerLinks[1].href = formatUrlWithLang('leaderboard.html');

    footerLinks[2].textContent = t('navHowToUse');
    footerLinks[2].href = formatUrlWithLang('how-to-use.html');
  }

  // 3. Index Hero & Sections
  if (!isLeaderboard && !isHowToUse && !isSkillDetail) {
    const heroKicker = document.querySelector('.hero-kicker-tag span:last-child');
    if (heroKicker) heroKicker.textContent = t('siteName');

    const heroHeadline = document.querySelector('.hero-headline-sculptural');
    if (heroHeadline) heroHeadline.textContent = t('heroHeadline');

    const heroSub = document.querySelector('.hero-body-airy');
    if (heroSub) heroSub.textContent = t('heroSub');

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');

    const heroAdvisorBadge = document.getElementById('hero-advisor-badge');
    if (heroAdvisorBadge) heroAdvisorBadge.textContent = t('heroAdvisorBadge');

    const heroAdvisorCtaText = document.getElementById('hero-advisor-cta-text');
    if (heroAdvisorCtaText) heroAdvisorCtaText.textContent = t('heroAdvisorCtaText');

    const advisorSection = document.getElementById('ai-advisor-section');
    if (advisorSection) advisorSection.setAttribute('aria-label', t('advisorAriaLabel'));

    const quickShareLabel = document.querySelector('.hero-share-bar .share-label') || document.querySelector('.hero-share-bar span');
    if (quickShareLabel) quickShareLabel.textContent = t('quickShare');

    const shareXText = document.getElementById('share-x-text');
    if (shareXText) shareXText.textContent = t('shareX');

    const shareWaText = document.getElementById('share-wa-text');
    if (shareWaText) shareWaText.textContent = t('shareWhatsApp');

    const copySiteBtnText = document.getElementById('copy-site-link-text') || document.querySelector('#copy-site-link-btn span:last-child');
    if (copySiteBtnText) copySiteBtnText.textContent = t('copyLink');

    const highlightsTitle = document.querySelector('.highlights-title');
    if (highlightsTitle) highlightsTitle.textContent = t('featuredTitle');

    const highlightsViewAll = document.getElementById('highlights-view-all-btn');
    if (highlightsViewAll) highlightsViewAll.textContent = t('viewAllSkills');

    const allSkillsHeadline = document.querySelector('.all-skills-section .section-headline');
    if (allSkillsHeadline) allSkillsHeadline.textContent = t('allSkillsTitle');

    const resultsCount = document.getElementById('results-count');
    if (resultsCount && (resultsCount.textContent.includes('التحميل') || resultsCount.textContent.includes('Loading'))) {
      resultsCount.textContent = t('loadingCatalog');
    }

    const sortLabel = document.querySelector('label[for="sort-select"]');
    if (sortLabel) sortLabel.textContent = t('sortBy');

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && sortSelect.options.length >= 3) {
      sortSelect.options[0].textContent = t('sortHighestStars');
      sortSelect.options[1].textContent = t('sortFeatured');
      sortSelect.options[2].textContent = t('sortAlphabetical');
    }

    const emptyTitle = document.querySelector('#empty-state .empty-state-title');
    if (emptyTitle) emptyTitle.textContent = t('emptySearch');

    const emptyText = document.querySelector('#empty-state .empty-state-text');
    if (emptyText) emptyText.textContent = t('emptySearchSub');
  }

  // 4. Leaderboard Page Specifics
  if (isLeaderboard) {
    const lbKicker = document.querySelector('main header .hero-kicker-tag span:last-child');
    if (lbKicker) {
      lbKicker.textContent = t('leaderboardKicker').replace(/^[^\w\u0600-\u06FF]+/g, '');
    }
    const lbHeadline = document.querySelector('main header .hero-headline-sculptural');
    if (lbHeadline) {
      lbHeadline.textContent = t('leaderboardTitle');
    }
    const lbSub = document.querySelector('main header .hero-body-airy');
    if (lbSub) {
      lbSub.textContent = t('leaderboardSub');
    }
    const lbNoticeTitle = document.getElementById('leaderboard-notice-title');
    if (lbNoticeTitle) {
      lbNoticeTitle.textContent = t('leaderboardNoticeTitle');
    }
    const lbNoticeText = document.getElementById('leaderboard-notice-text');
    if (lbNoticeText) {
      lbNoticeText.textContent = t('leaderboardNoticeText');
    }
    const lbDate = document.getElementById('leaderboard-date-badge');
    if (lbDate) {
      lbDate.textContent = t('leaderboardDateText');
    }
    const lbSearch = document.getElementById('leaderboard-search');
    if (lbSearch) {
      lbSearch.placeholder = t('leaderboardSearchPlaceholder');
    }
    const lbCatLabel = document.querySelector('label[for="leaderboard-category-filter"]');
    if (lbCatLabel) {
      lbCatLabel.textContent = t('categoryFilter');
    }
    const lbLoading = document.getElementById('leaderboard-loading-cell');
    if (lbLoading) {
      lbLoading.textContent = t('loadingLeaderboard');
    }

    // Update table th elements
    const tableHeaders = document.querySelectorAll('.leaderboard-table th');
    if (tableHeaders.length >= 6) {
      tableHeaders[0].textContent = t('thRank');
      tableHeaders[1].textContent = t('thStars');
      tableHeaders[2].textContent = t('thSkill');
      tableHeaders[3].textContent = t('thCategory');
      tableHeaders[4].textContent = t('thRepo');
      tableHeaders[5].textContent = t('thAction');
    }
  }

  // 5. Skill Detail Initial Loader
  if (isSkillDetail) {
    const skillLoading = document.getElementById('skill-loading-text');
    if (skillLoading) {
      skillLoading.textContent = t('loadingSkill');
    }
  }
}

export function initI18nAndTheme() {
  // 1. Detect from URL parameters (clean URL defaults to English; ?lang=ar switches to Arabic)
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const urlTheme = params.get('theme');

  // 2. Detect theme from localStorage
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('site_theme');
  } catch {}

  const initialLang = urlLang === 'ar' ? 'ar' : 'en';
  const initialTheme = (urlTheme === 'light' || urlTheme === 'dark') ? urlTheme : (savedTheme || 'dark');

  currentLang = initialLang;
  currentTheme = initialTheme;

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Setup header buttons
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  updateHeaderControls();
  applyTranslationsToDocument();
}
