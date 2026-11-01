# 🏆 أفضل 100 مهارة ذكاء اصطناعي (Top 100 Agent Skills Leaderboard)
> **مستودع مباشر ومحدث آلياً كل يوم يرصد، يكتشف، ويصنف أعلى 100 مهارة وكيل ذكاء اصطناعي على GitHub مع شروحات عربية وبرومبتات جاهزة**

<div align="center">

[![Daily Discovery & Sync](https://img.shields.io/badge/Auto%20Discovery-Daily%20Sync-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](.github/workflows/daily-rank-sync.yml)
[![Top 100 Skills](https://img.shields.io/badge/Leaderboard-Top%20100%20Skills-blueviolet?style=for-the-badge&logo=star&logoColor=white)](data/leaderboard.json)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-10b981?style=for-the-badge&logo=github&logoColor=white)](https://sayedgameasayed.github.io/top-100-agent-skills/)
[![Public API](https://img.shields.io/badge/Public%20API-JSON%20Endpoint-10b981?style=for-the-badge&logo=json&logoColor=white)](data/leaderboard.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ لماذا هذا المستودع مصدر مباشر للمستخدم؟

بدلاً من مجرد نسخ مستودعات أخرى، يعمل هذا المستودع كـ **محرك استكشاف وتصنيف آلي مستقل (Autonomous Aggregator & Leaderboard)**:
1. 🤖 **محرك استكشاف يومي (Daily Crawler):** يبحث آلياً كل 24 ساعة عبر GitHub API والمنصات المفتوحة عن جميع مهارات الوكلاء الذكية (`topic:agent-skills`, `topic:claude-skills`, `SKILL.md`).
2. 📊 **ترتيب حقيقي بالنجوم والنشاط:** يجلب عدد نجوم GitHub المباشر لكل مستودع، ويصنف أعلى 100 مهارة في العالم تنازلياً.
3. 📦 **مصدر بيانات مفتوح (Public JSON API):** يوفر ملف `data/leaderboard.json` خفيف الوزن ومحدث يومياً، يمكن لأي مطور أو أداة أو إضافة IDE سحبه واستخدامه مباشرة.
4. 🌍 **شرح عربي مخصص لكل مهارة:** تبسيط وظيفة المهارة بالعربية مع برومبت إنجليزي فوري جاهز للنسخ إلى أي نموذج (ChatGPT, Claude, Gemini, Copilot, Cursor).
5. 🛠️ **دعم كافة أدوات التطوير والوكلاء:** توافق موثق مع Claude Code, Cursor, GitHub Copilot, Google Antigravity, Roo Code, Windsurf, و Gemini CLI.

---

## 🚀 طريقة إضافة أي مهارة إلى أداتك المفضلة

| الأداة / البيئة | طريقة التفعيل المباشرة |
|---|---|
| **Claude Code** | انسخ رابط المهارة واطلب: `Read this skill: <url>` أو أضفها عبر أمر التثبيت. |
| **Cursor IDE** | انسخ تعليمات المهارة إلى ملف `.cursorrules` أو داخل المجلد `.cursor/rules/`. |
| **Google Antigravity** | ضع ملف المهارة في `~/.gemini/antigravity/builtin/skills/<name>/SKILL.md` أو استخدم أمر `/plugin`. |
| **GitHub Copilot** | أضف نص المهارة أو رابطها داخل ملف `.github/copilot-instructions.md`. |
| **Roo Code / Cline** | ضع المهارة في مجلد التخصيصات `.roo/skills/` أو كتعليمات مخصصة Custom Instructions. |
| **أي شات (ChatGPT / Gemini / Claude)** | انسخ "البرومبت الجاهز" من لوحة الصدارة والصقه مباشرة في المحادثة. |

---

## طريقة العمل الأساسية

```text
ابحث بالعربية ──> افهم المهارة والأمثلة ──> انسخ البرومبت الجاهز (English) ──> الصقه في الشات
```

---

## تشغيل المشروع محلياً

المشروع مبني بـ HTML / CSS / Vanilla JavaScript بدون أي Framework أو خطوة Build:

1. استنسخ المستودع:
   ```bash
   git clone https://github.com/<your-username>/arabic-skills-guide.git
   cd arabic-skills-guide
   ```
2. شغّل خادم محلي لتصفح الموقع (بسبب سياسة CORS لـ `fetch` لملفات JSON):
   ```bash
   # باستخدام Node.js
   npx serve .
   # أو باستخدام Python
   python -m http.server 8000
   ```
3. افتح المتصفح على `http://localhost:8000/site/`.

---

## التحقق من صحة البيانات (Validator)

يحتوي المستودع على أداة تحقق صارمة تفحص صحة البيانات والرخص:
```bash
node scripts/validate.mjs
```

---

<div dir="ltr">

## English Overview

**Arabic Skills Guide** is an open-source, tool-agnostic static website and curated repository. It helps Arabic-speaking users understand AI Skills (folders following the `SKILL.md` specification) before using them.

### Key Highlights:
- **Core Workflow:** Search in Arabic -> Understand capability in Arabic -> Copy ready English prompt wrapper -> Paste into any AI model (Gemini, ChatGPT, Claude, Copilot, Cursor, etc.).
- **Strict Licensing:** Proprietary and source-available skills are never copied into the repo; only official upstream links are referenced. Permissive derived skills preserve original licenses and notices.
- **Pure Static Stack:** Zero build dependencies, pure HTML/CSS/ES modules, accessible, RTL-first with dark/light mode.

### Running & Validating:
```bash
# Run schema and rules validation
node scripts/validate.mjs

# Serve locally
npx serve .
```

Licensed under [MIT](LICENSE). Attributions in [NOTICE.md](NOTICE.md).
</div>


## 🏆 قائمة المتصدرين لأفضل 100 مهارة ذكاء اصطناعي (Top 100 Leaderboard)

<!-- LEADERBOARD_START -->
> 🔄 **آخر تحديث آلي:** 2026-10-31 | يتم التحديث يومياً عبر [GitHub Actions](.github/workflows/daily-rank-sync.yml) | إجمالي المهارات المصنفة: **100** | [تحميل JSON المباشر](data/leaderboard.json)

| # | النجوم ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز |
|:---:|:---:|---|---|---|:---:|
| **🥇 1** | `415.2k` | [**rea**](https://github.com/morluto/rea) | البرمجة والويب | [`morluto/rea`](https://github.com/morluto/rea) | [**rea: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/rea) |
| **🥈 2** | `310k` | [**superpowers**](https://github.com/obra/superpowers) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Superpowers: منهجية تطوير متكاملة** ↗](https://syedg.github.io/arabic-skills-guide/skill/superpowers) |
| **🥉 3** | `310k` | [**git-workflow**](https://github.com/obra/superpowers/tree/main/skills/git-workflow) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إدارة فروع Git ورسائل Commit الاحترافية** ↗](https://syedg.github.io/arabic-skills-guide/skill/git-workflow) |
| **#4** | `310k` | [**writing-plans**](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | البرمجة والويب | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تخطيط المشاريع البرمجية خطوة بخطوة** ↗](https://syedg.github.io/arabic-skills-guide/skill/obra-writing-plans) |
| **#5** | `310k` | [**systematic-debugging**](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استكشاف وإصلاح الأخطاء المنهجي** ↗](https://syedg.github.io/arabic-skills-guide/skill/systematic-debugging) |
| **#6** | `310k` | [**test-driven-development**](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التطوير الموجه بالاختبارات (TDD)** ↗](https://syedg.github.io/arabic-skills-guide/skill/test-driven-development) |
| **#7** | `310k` | [**requesting-code-review**](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إعداد الكود وطلب المراجعة البرمجية** ↗](https://syedg.github.io/arabic-skills-guide/skill/requesting-code-review) |
| **#8** | `310k` | [**receiving-code-review**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استيعاب وتطبيق ملاحظات مراجعة الكود** ↗](https://syedg.github.io/arabic-skills-guide/skill/receiving-code-review) |
| **#9** | `310k` | [**using-git-worktrees**](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العمل على عدة فروع بالتوازي بـ Git Worktrees** ↗](https://syedg.github.io/arabic-skills-guide/skill/using-git-worktrees) |
| **#10** | `310k` | [**verification-before-completion**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التحقق الصارم قبل إنهاء المهمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/verification-before-completion) |
| **#11** | `310k` | [**subagent-driven-development**](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تطوير المشاريع عبر فرق الوكلاء الفرعيين** ↗](https://syedg.github.io/arabic-skills-guide/skill/subagent-driven-development) |
| **#12** | `310k` | [**executing-plans**](https://github.com/obra/superpowers/tree/main/skills/executing-plans) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التنفيذ المنضبط لخطط العمل البرمجية** ↗](https://syedg.github.io/arabic-skills-guide/skill/executing-plans) |
| **#13** | `310k` | [**dispatching-parallel-agents**](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إطلاق وتنسيق الوكلاء المتوازيين** ↗](https://syedg.github.io/arabic-skills-guide/skill/dispatching-parallel-agents) |
| **#14** | `310k` | [**brainstorming-solutions**](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العصف الذهني واستكشاف الحلول المعمارية** ↗](https://syedg.github.io/arabic-skills-guide/skill/brainstorming-solutions) |
| **#15** | `308.2k` | [**mattpocock-skills**](https://github.com/mattpocock/skills) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**مهارات Matt Pocock للتطوير** ↗](https://syedg.github.io/arabic-skills-guide/skill/mattpocock-skills) |
| **#16** | `294k` | [**fastapi-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات FastAPI المتقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/fastapi-patterns) |
| **#17** | `294k` | [**prisma-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**استعلامات ونمذجة Prisma ORM الحديثة** ↗](https://syedg.github.io/arabic-skills-guide/skill/prisma-patterns) |
| **#18** | `294k` | [**swiftui-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات SwiftUI التفاعلية** ↗](https://syedg.github.io/arabic-skills-guide/skill/swiftui-patterns) |
| **#19** | `294k` | [**rust-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط الإنتاج في لغة Rust** ↗](https://syedg.github.io/arabic-skills-guide/skill/rust-patterns) |
| **#20** | `294k` | [**redis-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط التخزين المؤقت بـ Redis** ↗](https://syedg.github.io/arabic-skills-guide/skill/redis-patterns) |
| **#21** | `294k` | [**react-testing-library**](https://github.com/affaan-m/ECC/tree/main/skills/react-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبار مكونات React التفاعلية** ↗](https://syedg.github.io/arabic-skills-guide/skill/react-testing-library) |
| **#22** | `294k` | [**python-pytest-suite**](https://github.com/affaan-m/ECC/tree/main/skills/python-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**حزمة اختبارات بايثون بـ Pytest** ↗](https://syedg.github.io/arabic-skills-guide/skill/python-pytest-suite) |
| **#23** | `294k` | [**django-security**](https://github.com/affaan-m/ECC/tree/main/skills/django-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تحصين وأمان تطبيقات Django** ↗](https://syedg.github.io/arabic-skills-guide/skill/django-security) |
| **#24** | `294k` | [**springboot-security**](https://github.com/affaan-m/ECC/tree/main/skills/springboot-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تأمين تطبيقات Spring Boot و Java** ↗](https://syedg.github.io/arabic-skills-guide/skill/springboot-security) |
| **#25** | `294k` | [**security-review-checklist**](https://github.com/affaan-m/ECC/tree/main/skills/security-review) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**قائمة التدقيق الأمني الشامل للكود** ↗](https://syedg.github.io/arabic-skills-guide/skill/security-review-checklist) |
| **#26** | `294k` | [**pytorch-model-eval**](https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns) | البيانات والذكاء الاصطناعي | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط وتقييم نماذج PyTorch للتعلم العميق** ↗](https://syedg.github.io/arabic-skills-guide/skill/pytorch-model-eval) |
| **#27** | `294k` | [**marketing-campaign**](https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign) | الأعمال والمال | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تخطيط وتنفيذ الحملات التسويقية الرقمية** ↗](https://syedg.github.io/arabic-skills-guide/skill/marketing-campaign) |
| **#28** | `294k` | [**i18n-sync-manager**](https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync) | الكتابة والتواصل | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**مزامنة وتدقيق ملفات الترجمة الدولية (i18n)** ↗](https://syedg.github.io/arabic-skills-guide/skill/i18n-sync-manager) |
| **#29** | `294k` | [**golang-testing-suite**](https://github.com/affaan-m/ECC/tree/main/skills/golang-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبارات Go وحساب الأداء (Benchmarks)** ↗](https://syedg.github.io/arabic-skills-guide/skill/golang-testing-suite) |
| **#30** | `294k` | [**eval-harness**](https://github.com/affaan-m/ECC/tree/main/skills/eval-harness) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أطر تقييم مخرجات نماذج الذكاء الاصطناعي** ↗](https://syedg.github.io/arabic-skills-guide/skill/eval-harness) |
| **#31** | `294k` | [**ECC**](https://github.com/affaan-m/ECC) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**ECC: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/ecc) |
| **#32** | `185.8k` | [**skills**](https://github.com/anthropics/skills) | بناء المهارات واكتشافها | [`anthropics/skills`](https://github.com/anthropics/skills) | [**skills: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/skills) |
| **#33** | `181.5k` | [**ponytail**](https://github.com/DietrichGebert/ponytail) | البيانات والذكاء الاصطناعي | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) | [**ponytail: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/ponytail) |
| **#34** | `179.9k` | [**pdf**](https://github.com/anthropics/skills/tree/main/skills/pdf) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**التعامل مع ملفات PDF** ↗](https://syedg.github.io/arabic-skills-guide/skill/pdf) |
| **#35** | `179.9k` | [**docx**](https://github.com/anthropics/skills/tree/main/skills/docx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل ملفات Word** ↗](https://syedg.github.io/arabic-skills-guide/skill/docx) |
| **#36** | `179.9k` | [**xlsx**](https://github.com/anthropics/skills/tree/main/skills/xlsx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**جداول Excel والتحليل** ↗](https://syedg.github.io/arabic-skills-guide/skill/xlsx) |
| **#37** | `179.9k` | [**pptx**](https://github.com/anthropics/skills/tree/main/skills/pptx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل عروض PowerPoint** ↗](https://syedg.github.io/arabic-skills-guide/skill/pptx) |
| **#38** | `179.9k` | [**frontend-design**](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تصميم واجهات ويب مميزة** ↗](https://syedg.github.io/arabic-skills-guide/skill/frontend-design) |
| **#39** | `179.9k` | [**skill-creator**](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | بناء المهارات واكتشافها | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**صانع المهارات** ↗](https://syedg.github.io/arabic-skills-guide/skill/skill-creator) |
| **#40** | `179.9k` | [**webapp-testing**](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | جودة الكود والاختبار | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**اختبار تطبيقات الويب** ↗](https://syedg.github.io/arabic-skills-guide/skill/webapp-testing) |
| **#41** | `179.9k` | [**mcp-builder**](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**بناء خوادم MCP** ↗](https://syedg.github.io/arabic-skills-guide/skill/mcp-builder) |
| **#42** | `179.9k` | [**canvas-design**](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تصميم بوسترات وفنون ثابتة** ↗](https://syedg.github.io/arabic-skills-guide/skill/canvas-design) |
| **#43** | `179.9k` | [**web-artifacts-builder**](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**بناء صفحات ويب متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/web-artifacts-builder) |
| **#44** | `179.9k` | [**brand-guidelines**](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تطبيق الهوية البصرية** ↗](https://syedg.github.io/arabic-skills-guide/skill/brand-guidelines) |
| **#45** | `179.9k` | [**theme-factory**](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**ثيمات جاهزة للعروض والمستندات** ↗](https://syedg.github.io/arabic-skills-guide/skill/theme-factory) |
| **#46** | `179.9k` | [**doc-coauthoring**](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | الكتابة والتواصل | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**كتابة المستندات بالمشاركة** ↗](https://syedg.github.io/arabic-skills-guide/skill/doc-coauthoring) |
| **#47** | `179.9k` | [**algorithmic-art**](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**فن توليدي بالكود** ↗](https://syedg.github.io/arabic-skills-guide/skill/algorithmic-art) |
| **#48** | `179.9k` | [**internal-comms**](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | الكتابة والتواصل | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**التواصل الداخلي في الشركات** ↗](https://syedg.github.io/arabic-skills-guide/skill/internal-comms) |
| **#49** | `179.9k` | [**slack-gif-creator**](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**صور GIF متحركة لـ Slack** ↗](https://syedg.github.io/arabic-skills-guide/skill/slack-gif-creator) |
| **#50** | `179.9k` | [**claude-api**](https://github.com/anthropics/skills/tree/main/skills/claude-api) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**البناء باستخدام Claude API** ↗](https://syedg.github.io/arabic-skills-guide/skill/claude-api) |
| **#51** | `148.8k` | [**langchain-agent-workflow**](https://github.com/langchain-ai/langchain) | البيانات والذكاء الاصطناعي | [`langchain-ai/langchain`](https://github.com/langchain-ai/langchain) | [**بناء سلاسل ووكلاء LangChain** ↗](https://syedg.github.io/arabic-skills-guide/skill/langchain-agent-workflow) |
| **#52** | `143.6k` | [**awesome-llm-apps**](https://github.com/Shubhamsaboo/awesome-llm-apps) | البيانات والذكاء الاصطناعي | [`Shubhamsaboo/awesome-llm-apps`](https://github.com/Shubhamsaboo/awesome-llm-apps) | [**awesome-llm-apps: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/awesome-llm-apps) |
| **#53** | `143.4k` | [**ui-ux-pro-max-skill**](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | التصميم والإبداع | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | [**UI/UX Pro Max: أنظمة تصميم** ↗](https://syedg.github.io/arabic-skills-guide/skill/ui-ux-pro-max-skill) |
| **#54** | `132.8k` | [**design-system-tokens**](https://github.com/nextlevelbuilder/ui-skills) | التصميم والإبداع | [`nextlevelbuilder/ui-skills`](https://github.com/nextlevelbuilder/ui-skills) | [**بناء وتوحيد أنظمة التصميم (Design Tokens)** ↗](https://syedg.github.io/arabic-skills-guide/skill/design-system-tokens) |
| **#55** | `128.7k` | [**kubernetes-manifest-builder**](https://github.com/kubernetes/kubernetes) | السحابة والأمان | [`kubernetes/kubernetes`](https://github.com/kubernetes/kubernetes) | [**بناء ملفات نشر Kubernetes المحصنة** ↗](https://syedg.github.io/arabic-skills-guide/skill/kubernetes-manifest-builder) |
| **#56** | `116.5k` | [**caveman**](https://github.com/JuliusBrussee/caveman) | البرمجة والويب | [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) | [**caveman: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/caveman) |
| **#57** | `112.2k` | [**addyosmani-agent-skills**](https://github.com/addyosmani/agent-skills) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**مهارات Addy Osmani لدورة الهندسة** ↗](https://syedg.github.io/arabic-skills-guide/skill/addyosmani-agent-skills) |
| **#58** | `112.2k` | [**agent-skills**](https://github.com/addyosmani/agent-skills) | البيانات والذكاء الاصطناعي | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**agent-skills: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/agent-skills) |
| **#59** | `109.4k` | [**github-pr-workflow**](https://github.com/paperclipai/paperclip) | جودة الكود والاختبار | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**أتمتة دورة حياة طلبات السحب (PR Automation)** ↗](https://syedg.github.io/arabic-skills-guide/skill/github-pr-workflow) |
| **#60** | `109.4k` | [**secret-leak-detection**](https://github.com/paperclipai/paperclip) | السحابة والأمان | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**كشف وتطهير الأسرار ومفاتيح الـ API** ↗](https://syedg.github.io/arabic-skills-guide/skill/secret-leak-detection) |
| **#61** | `109.4k` | [**simplified-technical-english**](https://github.com/paperclipai/paperclip) | الكتابة والتواصل | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**تبسيط وتوضيح الوثائق التقنية الإنجليزية** ↗](https://syedg.github.io/arabic-skills-guide/skill/simplified-technical-english) |
| **#62** | `109.4k` | [**paperclip**](https://github.com/paperclipai/paperclip) | العلوم والتعليم | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**paperclip: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/paperclip) |
| **#63** | `107.7k` | [**claude-mem**](https://github.com/thedotmack/claude-mem) | البيانات والذكاء الاصطناعي | [`thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) | [**claude-mem: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/claude-mem) |
| **#64** | `106.9k` | [**taste-skill**](https://github.com/Leonxlnx/taste-skill) | التصميم والإبداع | [`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) | [**Taste Skill: تصميم واجهات بذوق** ↗](https://syedg.github.io/arabic-skills-guide/skill/taste-skill) |
| **#65** | `105.2k` | [**open-design**](https://github.com/nexu-io/open-design) | التصميم والإبداع | [`nexu-io/open-design`](https://github.com/nexu-io/open-design) | [**open-design: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/open-design) |
| **#66** | `98.1k` | [**impeccable**](https://github.com/pbakaus/impeccable) | جودة الكود والاختبار | [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) | [**impeccable: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/impeccable) |
| **#67** | `98.1k` | [**tailwind-ui-builder**](https://github.com/tailwindlabs/tailwindcss) | التصميم والإبداع | [`tailwindlabs/tailwindcss`](https://github.com/tailwindlabs/tailwindcss) | [**بناء واجهات Tailwind CSS الاحترافية** ↗](https://syedg.github.io/arabic-skills-guide/skill/tailwind-ui-builder) |
| **#68** | `92.1k` | [**archify**](https://github.com/tt-a1i/archify) | البيانات والذكاء الاصطناعي | [`tt-a1i/archify`](https://github.com/tt-a1i/archify) | [**archify: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/archify) |
| **#69** | `89.4k` | [**Understand-Anything**](https://github.com/Egonex-AI/Understand-Anything) | البيانات والذكاء الاصطناعي | [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) | [**Understand-Anything: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/understand-anything) |
| **#70** | `88k` | [**docker-cloud-ops**](https://github.com/agenticskills/devops-skills/tree/main/skills/docker-cloud-ops) | السحابة والأمان | [`agenticskills/devops-skills`](https://github.com/agenticskills/devops-skills) | [**بناء حاويات Docker المحمية وحزم السحابة** ↗](https://syedg.github.io/arabic-skills-guide/skill/docker-cloud-ops) |
| **#71** | `79k` | [**career-ops**](https://github.com/career-ops-hq/career-ops) | البيانات والذكاء الاصطناعي | [`career-ops-hq/career-ops`](https://github.com/career-ops-hq/career-ops) | [**career-ops: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/career-ops) |
| **#72** | `78.4k` | [**awesome-claude-skills**](https://github.com/ComposioHQ/awesome-claude-skills) | بناء المهارات واكتشافها | [`ComposioHQ/awesome-claude-skills`](https://github.com/ComposioHQ/awesome-claude-skills) | [**قائمة مهارات المجتمع (Awesome)** ↗](https://syedg.github.io/arabic-skills-guide/skill/awesome-claude-skills) |
| **#73** | `74.3k` | [**datadog-cloud-monitoring**](https://github.com/composiohq/agentic-integrations) | السحابة والأمان | [`composiohq/agentic-integrations`](https://github.com/composiohq/agentic-integrations) | [**مراقبة أداء الخوادم مع Datadog** ↗](https://syedg.github.io/arabic-skills-guide/skill/datadog-cloud-monitoring) |
| **#74** | `74.3k` | [**circleci-pipeline-ops**](https://github.com/composiohq/agentic-integrations) | السحابة والأمان | [`composiohq/agentic-integrations`](https://github.com/composiohq/agentic-integrations) | [**أتمتة خطوط التكامل والنشر CI/CD** ↗](https://syedg.github.io/arabic-skills-guide/skill/circleci-pipeline-ops) |
| **#75** | `73.9k` | [**OpenMontage**](https://github.com/calesthio/OpenMontage) | المستندات والملفات | [`calesthio/OpenMontage`](https://github.com/calesthio/OpenMontage) | [**OpenMontage: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/openmontage) |
| **#76** | `72k` | [**cyber-security-audit**](https://github.com/agenticskills/security-skills/tree/main/skills/cyber-security-audit) | السحابة والأمان | [`agenticskills/security-skills`](https://github.com/agenticskills/security-skills) | [**فحص الثغرات الأمنية ومراجعة كود OWASP** ↗](https://syedg.github.io/arabic-skills-guide/skill/cyber-security-audit) |
| **#77** | `70.5k` | [**oh-my-openagent**](https://github.com/code-yeongyu/oh-my-openagent) | المستندات والملفات | [`code-yeongyu/oh-my-openagent`](https://github.com/code-yeongyu/oh-my-openagent) | [**oh-my-openagent: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/oh-my-openagent) |
| **#78** | `70k` | [**incident-retrospective**](https://github.com/etsy/incident-management) | الكتابة والتواصل | [`etsy/incident-management`](https://github.com/etsy/incident-management) | [**توثيق وتحليل الأعطال التقنية (Post-Mortem)** ↗](https://syedg.github.io/arabic-skills-guide/skill/incident-retrospective) |
| **#79** | `68k` | [**playwright-e2e-testing**](https://github.com/agenticskills/testing-skills/tree/main/skills/playwright-e2e-testing) | جودة الكود والاختبار | [`agenticskills/testing-skills`](https://github.com/agenticskills/testing-skills) | [**أتمتة اختبارات المتصفح الشاملة (Playwright)** ↗](https://syedg.github.io/arabic-skills-guide/skill/playwright-e2e-testing) |
| **#80** | `66.1k` | [**last30days-skill**](https://github.com/mvanhorn/last30days-skill) | البرمجة والويب | [`mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) | [**last30days-skill: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/last30days-skill) |
| **#81** | `65k` | [**sql-optimizer**](https://github.com/agenticskills/database-skills/tree/main/skills/sql-optimizer) | البيانات والذكاء الاصطناعي | [`agenticskills/database-skills`](https://github.com/agenticskills/database-skills) | [**تحسين استعلامات SQL وتسريع قواعد البيانات** ↗](https://syedg.github.io/arabic-skills-guide/skill/sql-optimizer) |
| **#82** | `63.5k` | [**diagram-design**](https://github.com/cathrynlavery/diagram-design) | التصميم والإبداع | [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) | [**diagram-design: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/diagram-design) |
| **#83** | `63k` | [**humanizer**](https://github.com/blader/humanizer) | البيانات والذكاء الاصطناعي | [`blader/humanizer`](https://github.com/blader/humanizer) | [**humanizer: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/humanizer) |
| **#84** | `59.6k` | [**i-have-adhd**](https://github.com/ayghri/i-have-adhd) | البرمجة والويب | [`ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd) | [**i-have-adhd: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/i-have-adhd) |
| **#85** | `58k` | [**data-analysis-pandas**](https://github.com/agenticskills/data-skills/tree/main/skills/data-analysis-pandas) | البيانات والذكاء الاصطناعي | [`agenticskills/data-skills`](https://github.com/agenticskills/data-skills) | [**تحليل البيانات الاستكشافي باستخدام بايثون** ↗](https://syedg.github.io/arabic-skills-guide/skill/data-analysis-pandas) |
| **#86** | `57.7k` | [**marketingskills**](https://github.com/coreyhaines31/marketingskills) | البيانات والذكاء الاصطناعي | [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) | [**marketingskills: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/marketingskills) |
| **#87** | `57k` | [**awesome-claude-code**](https://github.com/hesreallyhim/awesome-claude-code) | البيانات والذكاء الاصطناعي | [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code) | [**awesome-claude-code: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/awesome-claude-code) |
| **#88** | `55.5k` | [**scientific-agent-skills**](https://github.com/K-Dense-AI/scientific-agent-skills) | البيانات والذكاء الاصطناعي | [`K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) | [**scientific-agent-skills: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/scientific-agent-skills) |
| **#89** | `54.7k` | [**deep-research**](https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فريق البحث الأكاديمي والتحليل المنهجي المعمق** ↗](https://syedg.github.io/arabic-skills-guide/skill/deep-research) |
| **#90** | `54.7k` | [**sr-screener**](https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فرز الأوراق العلمية للمراجعات المنهجية** ↗](https://syedg.github.io/arabic-skills-guide/skill/sr-screener) |
| **#91** | `54.7k` | [**academic-paper-writer**](https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**صياغة وتحرير الأوراق العلمية المحكمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/academic-paper-writer) |
| **#92** | `50.5k` | [**tanstack-query**](https://github.com/TanStack/query) | البرمجة والويب | [`TanStack/query`](https://github.com/TanStack/query) | [**إدارة وتخزين بيانات الخادم بـ TanStack Query** ↗](https://syedg.github.io/arabic-skills-guide/skill/tanstack-query) |
| **#93** | `50.3k` | [**academic-research-assistant**](https://github.com/agenticskills/academic-skills/tree/main/skills/academic-research-assistant) | العلوم والتعليم | [`agenticskills/academic-skills`](https://github.com/agenticskills/academic-skills) | [**مساعد البحث العلمي ومراجعة الأدبيات** ↗](https://syedg.github.io/arabic-skills-guide/skill/academic-research-assistant) |
| **#94** | `48.7k` | [**weather-api-data**](https://github.com/hkuds/agentic-tools) | البيانات والذكاء الاصطناعي | [`hkuds/agentic-tools`](https://github.com/hkuds/agentic-tools) | [**جمع وتحليل بيانات الأرصاد والطقس** ↗](https://syedg.github.io/arabic-skills-guide/skill/weather-api-data) |
| **#95** | `47.7k` | [**scientific-visualization**](https://github.com/k-dense-ai/scientific-skills) | العلوم والتعليم | [`k-dense-ai/scientific-skills`](https://github.com/k-dense-ai/scientific-skills) | [**رسم البيانات والمخططات العلمية للنشر** ↗](https://syedg.github.io/arabic-skills-guide/skill/scientific-visualization) |
| **#96** | `45k` | [**openapi-designer**](https://github.com/agenticskills/api-skills/tree/main/skills/openapi-designer) | البرمجة والويب | [`agenticskills/api-skills`](https://github.com/agenticskills/api-skills) | [**تصميم وتوثيق واجهات البرمجة (OpenAPI 3.1)** ↗](https://syedg.github.io/arabic-skills-guide/skill/openapi-designer) |
| **#97** | `42k` | [**terraform-module-library**](https://github.com/wshobson/agents) | السحابة والأمان | [`wshobson/agents`](https://github.com/wshobson/agents) | [**بناء وحدات البنية التحتية بـ Terraform** ↗](https://syedg.github.io/arabic-skills-guide/skill/terraform-module-library) |
| **#98** | `42k` | [**responsive-design**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**تصميم واجهات الويب المتجاوبة الحديثة** ↗](https://syedg.github.io/arabic-skills-guide/skill/responsive-design) |
| **#99** | `42k` | [**screen-reader-accessibility**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**إتاحة الواجهات لقارئات الشاشة (WCAG a11y)** ↗](https://syedg.github.io/arabic-skills-guide/skill/screen-reader-accessibility) |
| **#100** | `42k` | [**agents**](https://github.com/wshobson/agents) | البرمجة والويب | [`wshobson/agents`](https://github.com/wshobson/agents) | [**agents: أداة وكيل متقدمة** ↗](https://syedg.github.io/arabic-skills-guide/skill/agents) |
<!-- LEADERBOARD_END -->
