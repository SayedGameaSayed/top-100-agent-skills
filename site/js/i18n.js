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
    navBrowse: 'تصفح المهارات',
    navStar: 'Star',
    langToggle: 'English',
    themeLight: 'ثيم أبيض',
    themeDark: 'ثيم أسود',
    heroKicker: '✧ دليل مهارات الذكاء الاصطناعي',
    heroHeadline: 'افهم المهارة قبل أن تستخدمها.',
    heroSub: 'شرح عربي بسيط ومباشر لأشهر مهارات الذكاء الاصطناعي المفتوحة، مع إرشادات رسمية لإضافتها إلى شاتك أو أداة التطوير التي تستخدمها.',
    searchPlaceholder: 'ابحث عن مهارة: ورد، إكسل، تصميم، اختبار…',
    quickShare: 'مشاركة سريعة:',
    shareX: 'X / تويتر',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'واتساب',
    copyLink: 'نسخ الرابط',
    copied: 'تم النسخ!',
    featuredTitle: 'المهارات الأشهر',
    allSkillsTitle: 'جميع المهارات المتاحة',
    allCategories: 'الكل',
    showingSkills: (n, total) => `عرض ${n} من أصل ${total} مهارة`,
    sortHighestStars: 'الأعلى نجوماً على GitHub ★',
    sortAlphabetical: 'أبجديًا (أ - ي)',
    emptySearch: 'لم يتم العثور على مهارات تطابق بحثك',
    emptySearchSub: 'جرب البحث بكلمات عامة مثل "تصميم"، "بيانات"، "ملفات"، أو "اختبار".',
    copyPromptBtn: 'انسخ البرومبت الجاهز',
    copyLinkBtn: 'انسخ اللينك فقط',
    openGithub: 'افتح المصدر على GitHub',
    benefitsTitle: 'القدرات والمزايا',
    benefitsSub: 'ما الذي تقدمه هذه المهارة لعملك؟',
    useCasesTitle: 'حالات الاستخدام',
    useCasesSub: 'أمثلة واقعية يمكنك تطبيقها فوراً',
    integrationTitle: 'طريقة تفعيل المهارة في أدوات الذكاء الاصطناعي',
    humanVerified: (reviewer, date) => `✓ تدقيق بشري: ${reviewer}${date ? ` (${date})` : ''}`,
    starsOnGithub: (stars) => `★ ${stars} نجمة على GitHub`,
    backToDirectory: 'العودة للدليل',
    viewAllSkills: 'عرض كافة المهارات ↗',
    viewSkillAction: 'عرض المهارة ←',
    sortBy: 'ترتيب حسب:',
    sortFeatured: 'المميزة والأشهر',
    assistantBtn: 'مساعد المهارات',
    backToTop: '↑ للأعلى',
    categoryFilter: 'تصفية حسب التصنيف:',
    leaderboardDisclaimer: 'ملاحظة: النجوم تعود للمستودع الأم على GitHub ويتم تحديثها دورياً عبر CI. تم تطبيق سقف 3 مهارات لكل مستودع لضمان التنوع.',
    // Leaderboard
    leaderboardKicker: '★ التصنيف العالمي لمهارات الوكلاء (الأكثر شهرة حسب نجوم المستودع)',
    leaderboardTitle: 'لوحة صدارة المهارات الأكثر شهرة',
    leaderboardSub: 'ترتيب مهارات الذكاء الاصطناعي الأكثر شهرة واستخداماً في مجتمع المطورين العالمي، مرتبة حسب عدد نجوم المستودع الأصلي (Repository Stars) مع تحديث يومي آلي وشرح عربي لكل مهارة.',
    leaderboardNoticeTitle: 'تنبيه شفافية:',
    leaderboardNoticeText: 'عدد النجوم المعروض يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.',
    leaderboardDateText: 'نجوم المستودعات كما في: نوفمبر 2026 (تحديث دوري كل 24 ساعة)',
    leaderboardSearchPlaceholder: 'ابحث في لوحة الصدارة: TDD، سحابة، بايثون، تصميم…',
    leaderboardCategoryAll: (n) => `جميع الأقسام (${n} مهارة)`,
    thRank: 'الترتيب',
    thSkill: 'المهارة',
    thCategory: 'التصنيف',
    thStars: 'نجوم المستودع ★',
    thRepo: 'المستودع الأصلي',
    thAction: 'الإجراءات',
    btnDetails: 'التفاصيل',
    // Tool Integration Section
    toolIntegrationTitle: 'ضيفها لأداتك',
    toolIntegrationSub: 'إرشادات موثقة لإضافة المهارة إلى بيئة العمل أو الشات الذي تستخدمه.',
    toolRequirements: 'المتطلبات:',
    toolDefaultPath: 'المسار الافتراضي:',
    toolSetupSteps: 'خطوات الإعداد:',
    toolHowToInvoke: 'طريقة الاستدعاء:',
    toolLastVerified: 'آخر مراجعة:',
    toolOfficialDocs: 'التوثيق الرسمي ↗',
    toolMultiSkillNote: 'ℹ️ هذا الريبو يضم مهارات كثيرة. افتحه واختر الفولدر المناسب.',
    promptFormatsTitle: 'نماذج الطلبات',
    promptFormatsSub: 'اطلب من الموديل بهذه الصيغ',
    copyPromptMini: 'نسخ الطلب',
    // Footer
    footerDesc: 'دليل مهارات الذكاء الاصطناعي — مشروع مجتمعي مستقل ومفتوح المصدر تحت إشراف وتدقيق سيد جمعة.',
    // AI Bot
    botTitle: 'مساعد المهارات الذكي',
    botSub: 'احصل على ترشيحات فورية لأفضل المهارات',
    botWelcome: 'مرحبًا بك! أنا مساعد المهارات الذكي. اخبرني ماذا تريد أن تفعل وسأرشح لك أفضل المهارات المناسبة لمشروعك.',
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
    navBrowse: 'Browse Skills',
    navStar: 'Star',
    langToggle: 'العربية',
    themeLight: 'White Theme',
    themeDark: 'Dark Theme',
    heroKicker: '✧ Top 100 AI Agent Skills',
    heroHeadline: 'Understand the skill before you use it.',
    heroSub: 'Curated directory of the top 100 open-source AI agent skills, with verified prompts ready to copy for Claude, Cursor, ChatGPT, and Codex.',
    searchPlaceholder: 'Search skills: word, excel, design, testing, pdf...',
    quickShare: 'Quick Share:',
    shareX: 'X / Twitter',
    shareLinkedIn: 'LinkedIn',
    shareWhatsApp: 'WhatsApp',
    copyLink: 'Copy Link',
    copied: 'Copied!',
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
    backToTop: '↑ Top',
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
    promptFormatsTitle: 'Prompt Formats',
    promptFormatsSub: 'Ask the model with these prompt templates',
    copyPromptMini: 'Copy Prompt',
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

let currentLang = 'ar';
let currentTheme = 'dark';
const listeners = [];

export function getLang() {
  return currentLang;
}

export function getTheme() {
  return currentTheme;
}

export function t(key, ...args) {
  const dict = UI_STRINGS[currentLang] || UI_STRINGS.ar;
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
 * Appends ?lang=en to internal links when in English mode
 */
export function formatUrlWithLang(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('javascript:')) {
    return url;
  }
  if (currentLang !== 'en') return url;
  try {
    const [path, query = ''] = url.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', 'en');
    return `${path}?${params.toString()}`;
  } catch {
    return url;
  }
}

export function setLanguage(newLang) {
  currentLang = newLang === 'en' ? 'en' : 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
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
 * Toggle Language: Clean full reload with URL parameter as requested
 */
export function toggleLanguage() {
  const targetLang = currentLang === 'ar' ? 'en' : 'ar';
  try {
    localStorage.setItem('site_lang', targetLang);
  } catch {}

  // Update URL param and reload cleanly to render the complete target language
  const url = new URL(window.location.href);
  url.searchParams.set('lang', targetLang);
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
    themeBtnText.textContent = currentTheme === 'dark' 
      ? (currentLang === 'en' ? 'White Theme' : 'ثيم أبيض') 
      : (currentLang === 'en' ? 'Dark Theme' : 'ثيم أسود');
  }
  if (themeBtnIcon) {
    themeBtnIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Update Brand Lockup text
  const brandName = document.querySelector('.brand-lockup span');
  if (brandName) {
    brandName.textContent = t('siteName');
  }

  // Update Static Navigation Links and persist ?lang=en
  const navLinks = document.querySelectorAll('.header-nav .nav-ghost-link');
  if (navLinks.length >= 3) {
    navLinks[0].textContent = t('navHome');
    navLinks[0].href = formatUrlWithLang('index.html');

    navLinks[1].textContent = t('navLeaderboard');
    navLinks[1].href = formatUrlWithLang('leaderboard.html');

    navLinks[2].textContent = t('navHowToUse');
    navLinks[2].href = formatUrlWithLang('how-to-use.html');
  }

  const browseBtn = document.querySelector('.nav-cta-pill');
  if (browseBtn && browseBtn.getAttribute('href')?.includes('#')) {
    browseBtn.textContent = t('navBrowse');
  }
}

/**
 * Comprehensive DOM translator for static headers, footers, and page sections
 */
export function applyTranslationsToDocument() {
  const lang = currentLang;

  // 1. Page Title & Meta
  if (lang === 'en') {
    if (location.pathname.endsWith('leaderboard.html') || location.href.includes('leaderboard.html')) {
      document.title = 'Leaderboard | Top 100 AI Agent Skills';
    } else if (location.pathname.endsWith('how-to-use.html') || location.href.includes('how-to-use.html')) {
      document.title = 'How to Use AI Agent Skills | Comprehensive Guide';
    } else if (!location.pathname.endsWith('skill.html') && !location.href.includes('skill.html')) {
      document.title = 'Top 100 AI Agent Skills | Curated Open-Source Directory';
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
  const heroKicker = document.querySelector('.hero-kicker-tag span:last-child');
  if (heroKicker) heroKicker.textContent = t('heroKicker').replace(/^[^\w\u0600-\u06FF]+/g, '');

  const heroHeadline = document.querySelector('.hero-headline-sculptural');
  if (heroHeadline) heroHeadline.textContent = t('heroHeadline');

  const heroSub = document.querySelector('.hero-body-airy');
  if (heroSub) heroSub.textContent = t('heroSub');

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');

  const quickShareLabel = document.querySelector('.hero-share-bar span');
  if (quickShareLabel) quickShareLabel.textContent = t('quickShare');

  const copySiteBtn = document.getElementById('copy-site-link-btn');
  if (copySiteBtn) {
    const span = copySiteBtn.querySelector('span');
    if (span) span.textContent = t('copyLink');
  }

  const highlightsTitle = document.querySelector('.highlights-title');
  if (highlightsTitle) highlightsTitle.textContent = t('featuredTitle');

  const highlightsViewAll = document.getElementById('highlights-view-all-btn');
  if (highlightsViewAll) highlightsViewAll.textContent = t('viewAllSkills');

  const allSkillsHeadline = document.querySelector('.all-skills-section .section-headline');
  if (allSkillsHeadline) allSkillsHeadline.textContent = t('allSkillsTitle');

  const sortLabel = document.querySelector('label[for="sort-select"]');
  if (sortLabel) sortLabel.textContent = t('sortBy');

  // 4. Leaderboard Page Specifics
  const lbKicker = document.querySelector('main header .hero-kicker-tag span:last-child');
  if (lbKicker && (location.href.includes('leaderboard.html') || location.pathname.endsWith('leaderboard.html'))) {
    lbKicker.textContent = t('leaderboardKicker').replace(/^[^\w\u0600-\u06FF]+/g, '');
  }
  const lbHeadline = document.querySelector('main header .hero-headline-sculptural');
  if (lbHeadline && (location.href.includes('leaderboard.html') || location.pathname.endsWith('leaderboard.html'))) {
    lbHeadline.textContent = t('leaderboardTitle');
  }
  const lbSub = document.querySelector('main header .hero-body-airy');
  if (lbSub && (location.href.includes('leaderboard.html') || location.pathname.endsWith('leaderboard.html'))) {
    lbSub.textContent = t('leaderboardSub');
  }
  const lbNoticeStrong = document.querySelector('main header [role="alert"] strong, main header .section-container strong');
  if (lbNoticeStrong) {
    lbNoticeStrong.textContent = t('leaderboardNoticeTitle');
  }
  const lbNoticeSpan = document.querySelector('main header .section-container span:last-child');
  if (lbNoticeSpan && lbNoticeSpan.textContent.includes('المعروض')) {
    lbNoticeSpan.textContent = t('leaderboardNoticeText');
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

export function initI18nAndTheme() {
  // 1. Detect from URL parameters
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const urlTheme = params.get('theme');

  // 2. Detect from localStorage
  let savedLang = null;
  let savedTheme = null;
  try {
    savedLang = localStorage.getItem('site_lang');
    savedTheme = localStorage.getItem('site_theme');
  } catch {}

  const initialLang = (urlLang === 'en' || urlLang === 'ar') ? urlLang : (savedLang || 'ar');
  const initialTheme = (urlTheme === 'light' || urlTheme === 'dark') ? urlTheme : (savedTheme || 'dark');

  currentLang = initialLang;
  currentTheme = initialTheme;

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
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
