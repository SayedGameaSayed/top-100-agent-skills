/**
 * search.js - Arabic normalization and dual search engine (Fuse.js + Fallback)
 * Ensures 100% consistent results whether CDN is reachable or offline.
 */

// Common synonyms and transliterations for software & office terms
export const TERM_SYNONYMS = {
  'word': ['ورد', 'وورد', 'مستند', 'مستندات'],
  'docx': ['ورد', 'وورد', 'word'],
  'excel': ['اكسل', 'إكسل', 'شيت', 'شيتات'],
  'xlsx': ['اكسل', 'إكسل', 'excel', 'شيت'],
  'pdf': ['بي دي اف', 'بي دي إف', 'ملف pdf'],
  'ورد': ['word', 'docx'],
  'وورد': ['word', 'docx'],
  'اكسل': ['excel', 'xlsx'],
  'إكسل': ['excel', 'xlsx']
};

export const ARABIC_STOP_WORDS = new Set([
  'عايز', 'عاوز', 'محتاج', 'اريد', 'بدي', 'ابحث', 'مهارة', 'مهاره', 'سكيل', 'اداة', 'اداه',
  'عن', 'في', 'من', 'الي', 'علي', 'مع', 'هل', 'كيف', 'ما', 'ماذا', 'لو', 'او', 'ثم', 'هو', 'هي', 'لي', 'لك', 'ايه'
]);

/**
 * Standard Arabic Normalization
 * 1. Remove tashkeel (diacritics) & dagger alef
 * 2. Remove tatweel (kashida)
 * 3. Normalize Alef variants (أ, إ, آ, ٱ -> ا)
 * 4. Normalize Ya / Alef Maksura (ى -> ي)
 * 5. Normalize Ta Marbuta (ة -> ه)
 */
export function normalizeArabic(text) {
  if (text === null || text === undefined) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove diacritics
    .replace(/\u0640/g, '')                 // Remove tatweel
    .replace(/[أإآٱ]/g, 'ا')                // Normalize Alef
    .replace(/ى/g, 'ي')                    // Normalize Ya
    .replace(/ة/g, 'ه')                    // Normalize Ta Marbuta
    .replace(/\s+/g, ' ')                  // Normalize whitespace
    .trim();
}

/**
 * Prepares searchable document for a skill, normalizing every field
 */
export function prepareSkillForSearch(skill) {
  const normalizedTitle = normalizeArabic(skill.title_ar);
  const normalizedSummary = normalizeArabic(skill.summary_ar);
  const normalizedBenefits = Array.isArray(skill.benefits_ar)
    ? skill.benefits_ar.map(normalizeArabic).join(' ')
    : '';
  const normalizedUseCases = Array.isArray(skill.use_cases_ar)
    ? skill.use_cases_ar.map(normalizeArabic).join(' ')
    : '';
  const normalizedName = (skill.name || '').toLowerCase();
  const normalizedId = (skill.id || '').toLowerCase();
  const tagsList = Array.isArray(skill.tags) ? skill.tags.map(normalizeArabic) : [];

  // Expand with synonyms if name or id matches common terms
  const synonyms = new Set();
  const checkKeys = [normalizedName, normalizedId, ...tagsList];
  for (const k of checkKeys) {
    if (TERM_SYNONYMS[k]) {
      for (const s of TERM_SYNONYMS[k]) {
        synonyms.add(normalizeArabic(s));
      }
    }
  }

  const combinedSearchText = [
    normalizedTitle,
    normalizedSummary,
    normalizedBenefits,
    normalizedUseCases,
    normalizedName,
    normalizedId,
    ...tagsList,
    ...Array.from(synonyms)
  ].join(' ');

  return {
    raw: skill,
    normalizedTitle,
    normalizedSummary,
    normalizedBenefits,
    normalizedUseCases,
    normalizedName,
    normalizedId,
    tagsList,
    synonymsText: Array.from(synonyms).join(' '),
    combinedSearchText
  };
}

/**
 * Initializes the Search Engine
 */
export class SkillsSearchEngine {
  constructor(skills = []) {
    this.skills = skills;
    this.indexedSkills = skills.map(prepareSkillForSearch);
    this.fuse = null;
    this.initFuse();
  }

  initFuse() {
    if (typeof window !== 'undefined' && window.Fuse) {
      try {
        const options = {
          includeScore: true,
          threshold: 0.35,
          ignoreLocation: true,
          keys: [
            { name: 'normalizedTitle', weight: 0.35 },
            { name: 'normalizedName', weight: 0.25 },
            { name: 'normalizedSummary', weight: 0.15 },
            { name: 'synonymsText', weight: 0.15 },
            { name: 'tagsList', weight: 0.1 },
            { name: 'normalizedUseCases', weight: 0.05 },
            { name: 'normalizedBenefits', weight: 0.05 }
          ]
        };
        this.fuse = new window.Fuse(this.indexedSkills, options);
      } catch (err) {
        console.warn('Fuse initialization failed, falling back to local search engine:', err);
        this.fuse = null;
      }
    }
  }

  /**
   * Search skills by query, category, and difficulty
   */
  search({ query = '', category = 'all', difficulty = 'all' } = {}) {
    const rawQuery = (query || '').trim();
    const normalizedQuery = normalizeArabic(rawQuery);

    let matchedItems = [];

    if (!normalizedQuery) {
      // Empty query returns all items in original order
      matchedItems = this.indexedSkills.map((item) => item.raw);
    } else if (this.fuse) {
      // Fuse.js path
      const fuseResults = this.fuse.search(normalizedQuery);
      matchedItems = fuseResults.map((res) => res.item.raw);

      // Also ensure any exact substring match from synonyms is included if threshold missed it
      const existingIds = new Set(matchedItems.map((m) => m.id));
      for (const item of this.indexedSkills) {
        if (!existingIds.has(item.raw.id)) {
          if (
            item.combinedSearchText.includes(normalizedQuery) ||
            item.normalizedName.includes(normalizedQuery)
          ) {
            matchedItems.push(item.raw);
          }
        }
      }
    } else {
      // Local fallback search path (guaranteed consistent with exact same normalization)
      const rawTokens = normalizedQuery.split(' ').filter(Boolean);
      // Filter conversational stopwords if other tokens exist
      const meaningfulTokens = rawTokens.filter((t) => !ARABIC_STOP_WORDS.has(t));
      const tokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;
      const scored = [];

      for (const item of this.indexedSkills) {
        let score = 0;
        let matchedCount = 0;

        for (const token of tokens) {
          let tokenMatches = false;

          // Check if token matches title, name, synonyms, summary, etc.
          if (item.normalizedTitle.includes(token)) {
            score += 15;
            tokenMatches = true;
          }
          if (item.normalizedName.includes(token) || item.normalizedId.includes(token)) {
            score += 12;
            tokenMatches = true;
          }
          if (item.synonymsText.includes(token)) {
            score += 10;
            tokenMatches = true;
          }
          if (item.tagsList.some((t) => t.includes(token))) {
            score += 8;
            tokenMatches = true;
          }
          if (item.normalizedSummary.includes(token)) {
            score += 6;
            tokenMatches = true;
          }
          if (item.normalizedUseCases.includes(token) || item.normalizedBenefits.includes(token)) {
            score += 3;
            tokenMatches = true;
          }

          if (tokenMatches) {
            matchedCount++;
          }
        }

        if (matchedCount > 0) {
          // Significant bonus when all query tokens match
          if (matchedCount === tokens.length) {
            score += 30;
          }
          scored.push({ item: item.raw, score });
        }
      }

      scored.sort((a, b) => b.score - a.score);
      matchedItems = scored.map((s) => s.item);
    }

    // Apply category & difficulty filters
    return matchedItems.filter((skill) => {
      const matchCat = category === 'all' || skill.category === category;
      const matchDiff = difficulty === 'all' || skill.difficulty === difficulty;
      return matchCat && matchDiff;
    });
  }
}
