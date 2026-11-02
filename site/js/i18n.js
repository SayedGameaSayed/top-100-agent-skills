/**
 * i18n.js - Language (AR/EN) & Theme (Dark/Light) System
 * Ensures seamless switching with persistent storage and URL param support.
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
    sortBy: 'ترتيب حسب:',
    sortFeatured: 'المميزة والأشهر',
    assistantBtn: 'مساعد المهارات',
    backToTop: '↑ للأعلى',
    categoryFilter: 'تصفية حسب التصنيف:',
    leaderboardDisclaimer: 'ملاحظة: النجوم تعود للمستودع الأم على GitHub ويتم تحديثها دورياً عبر CI. تم تطبيق سقف 3 مهارات لكل مستودع لضمان التنوع.',
    // Leaderboard
    leaderboardTitle: 'لوحة الصدارة | صدارة مهارات الوكلاء المؤهلة',
    leaderboardSub: 'ترتيب أفضل مهارات الوكلاء مفتوحة المصدر حسب نجوم GitHub، مع حماية التنوع (3 مهارات كحد أقصى للمستودع الواحد).',
    thRank: 'الترتيب',
    thSkill: 'المهارة',
    thCategory: 'التصنيف',
    thStars: 'النجوم',
    thRepo: 'المستودع',
    thAction: 'البرومبت الجاهز',
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
    sortBy: 'Sort by:',
    sortFeatured: 'Featured & Popular',
    assistantBtn: 'Skills Assistant',
    backToTop: '↑ Top',
    categoryFilter: 'Filter by category:',
    leaderboardDisclaimer: 'Note: Stars reflect the parent GitHub repository and are refreshed via CI. Capped at 3 skills per repo to ensure diversity.',
    // Leaderboard
    leaderboardTitle: 'Leaderboard | Top Verified Agent Skills',
    leaderboardSub: 'Top open-source agent skills ranked by GitHub stars, protected by diversity caps (max 3 skills per repository).',
    thRank: 'Rank',
    thSkill: 'Skill',
    thCategory: 'Category',
    thStars: 'Stars',
    thRepo: 'Repository',
    thAction: 'Ready Prompt',
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

export function setLanguage(newLang) {
  currentLang = newLang === 'en' ? 'en' : 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
  try {
    localStorage.setItem('site_lang', currentLang);
  } catch {}
  updateHeaderControls();
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

export function toggleLanguage() {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
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
    themeBtnText.textContent = currentTheme === 'dark' ? (currentLang === 'en' ? 'White Theme' : 'ثيم أبيض') : (currentLang === 'en' ? 'Dark Theme' : 'ثيم أسود');
  }
  if (themeBtnIcon) {
    themeBtnIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Update Static Navigation Links
  const brandName = document.querySelector('.brand-lockup span');
  if (brandName) {
    brandName.textContent = t('siteName');
  }

  const navLinks = document.querySelectorAll('.header-nav .nav-ghost-link');
  if (navLinks.length >= 3) {
    navLinks[0].textContent = t('navHome');
    navLinks[1].textContent = t('navLeaderboard');
    navLinks[2].textContent = t('navHowToUse');
  }

  const browseBtn = document.querySelector('.nav-cta-pill');
  if (browseBtn && browseBtn.getAttribute('href')?.includes('#')) {
    browseBtn.textContent = t('navBrowse');
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
}
