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
   git clone https://github.com/SayedGameaSayed/top-100-agent-skills.git
   cd top-100-agent-skills
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
> 🔄 **آخر تحديث آلي:** 2026-11-01 | **التصنيف:** الأكثر شهرة (حسب نجوم المستودع) | [تحميل JSON المباشر](data/leaderboard.json)
> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.

| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز | حالة المراجعة |
|:---:|:---:|---|---|---|:---:|:---:|
| **🥇 1** | `417.7k` | [**rea**](https://github.com/morluto/rea) | البرمجة والويب | [`morluto/rea`](https://github.com/morluto/rea) | [**rea: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rea) | ℹ️ مسودة عامة |
| **🥈 2** | `310.4k` | [**superpowers**](https://github.com/obra/superpowers) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Superpowers: منهجية تطوير متكاملة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=superpowers) | ℹ️ مسودة عامة |
| **🥉 3** | `310.4k` | [**git-workflow**](https://github.com/obra/superpowers/tree/main/skills/git-workflow) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إدارة فروع Git ورسائل Commit الاحترافية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow) | ℹ️ مسودة عامة |
| **#4** | `310.4k` | [**writing-plans**](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | البرمجة والويب | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تخطيط المشاريع البرمجية خطوة بخطوة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=obra-writing-plans) | ℹ️ مسودة عامة |
| **#5** | `310.4k` | [**systematic-debugging**](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استكشاف وإصلاح الأخطاء المنهجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=systematic-debugging) | ℹ️ مسودة عامة |
| **#6** | `310.4k` | [**test-driven-development**](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التطوير الموجه بالاختبارات (TDD)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=test-driven-development) | ℹ️ مسودة عامة |
| **#7** | `310.4k` | [**requesting-code-review**](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إعداد الكود وطلب المراجعة البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=requesting-code-review) | ℹ️ مسودة عامة |
| **#8** | `310.4k` | [**receiving-code-review**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استيعاب وتطبيق ملاحظات مراجعة الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=receiving-code-review) | ℹ️ مسودة عامة |
| **#9** | `310.4k` | [**using-git-worktrees**](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العمل على عدة فروع بالتوازي بـ Git Worktrees** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-git-worktrees) | ℹ️ مسودة عامة |
| **#10** | `310.4k` | [**verification-before-completion**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التحقق الصارم قبل إنهاء المهمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=verification-before-completion) | ℹ️ مسودة عامة |
| **#11** | `310.4k` | [**subagent-driven-development**](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تطوير المشاريع عبر فرق الوكلاء الفرعيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=subagent-driven-development) | ℹ️ مسودة عامة |
| **#12** | `310.4k` | [**executing-plans**](https://github.com/obra/superpowers/tree/main/skills/executing-plans) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التنفيذ المنضبط لخطط العمل البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=executing-plans) | ℹ️ مسودة عامة |
| **#13** | `310.4k` | [**dispatching-parallel-agents**](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إطلاق وتنسيق الوكلاء المتوازيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=dispatching-parallel-agents) | ℹ️ مسودة عامة |
| **#14** | `310.4k` | [**brainstorming-solutions**](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العصف الذهني واستكشاف الحلول المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brainstorming-solutions) | ℹ️ مسودة عامة |
| **#15** | `309k` | [**mattpocock-skills**](https://github.com/mattpocock/skills) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**مهارات Matt Pocock للتطوير** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mattpocock-skills) | ℹ️ مسودة عامة |
| **#16** | `294.5k` | [**fastapi-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات FastAPI المتقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=fastapi-patterns) | ℹ️ مسودة عامة |
| **#17** | `294.5k` | [**prisma-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**استعلامات ونمذجة Prisma ORM الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=prisma-patterns) | ℹ️ مسودة عامة |
| **#18** | `294.5k` | [**swiftui-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات SwiftUI التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=swiftui-patterns) | ℹ️ مسودة عامة |
| **#19** | `294.5k` | [**rust-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط الإنتاج في لغة Rust** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rust-patterns) | ℹ️ مسودة عامة |
| **#20** | `294.5k` | [**redis-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط التخزين المؤقت بـ Redis** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=redis-patterns) | ℹ️ مسودة عامة |
| **#21** | `294.5k` | [**react-testing-library**](https://github.com/affaan-m/ECC/tree/main/skills/react-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبار مكونات React التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-testing-library) | ℹ️ مسودة عامة |
| **#22** | `294.5k` | [**python-pytest-suite**](https://github.com/affaan-m/ECC/tree/main/skills/python-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**حزمة اختبارات بايثون بـ Pytest** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=python-pytest-suite) | ℹ️ مسودة عامة |
| **#23** | `294.5k` | [**django-security**](https://github.com/affaan-m/ECC/tree/main/skills/django-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تحصين وأمان تطبيقات Django** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=django-security) | ℹ️ مسودة عامة |
| **#24** | `294.5k` | [**springboot-security**](https://github.com/affaan-m/ECC/tree/main/skills/springboot-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تأمين تطبيقات Spring Boot و Java** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=springboot-security) | ℹ️ مسودة عامة |
| **#25** | `294.5k` | [**security-review-checklist**](https://github.com/affaan-m/ECC/tree/main/skills/security-review) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**قائمة التدقيق الأمني الشامل للكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=security-review-checklist) | ℹ️ مسودة عامة |
| **#26** | `294.5k` | [**pytorch-model-eval**](https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns) | البيانات والذكاء الاصطناعي | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط وتقييم نماذج PyTorch للتعلم العميق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pytorch-model-eval) | ℹ️ مسودة عامة |
| **#27** | `294.5k` | [**marketing-campaign**](https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign) | الأعمال والمال | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تخطيط وتنفيذ الحملات التسويقية الرقمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketing-campaign) | ℹ️ مسودة عامة |
| **#28** | `294.5k` | [**i18n-sync-manager**](https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync) | الكتابة والتواصل | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**مزامنة وتدقيق ملفات الترجمة الدولية (i18n)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i18n-sync-manager) | ℹ️ مسودة عامة |
| **#29** | `294.5k` | [**golang-testing-suite**](https://github.com/affaan-m/ECC/tree/main/skills/golang-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبارات Go وحساب الأداء (Benchmarks)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=golang-testing-suite) | ℹ️ مسودة عامة |
| **#30** | `294.5k` | [**eval-harness**](https://github.com/affaan-m/ECC/tree/main/skills/eval-harness) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أطر تقييم مخرجات نماذج الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=eval-harness) | ℹ️ مسودة عامة |
| **#31** | `294.5k` | [**ECC**](https://github.com/affaan-m/ECC) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**ECC: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ecc) | ℹ️ مسودة عامة |
| **#32** | `186.2k` | [**skills**](https://github.com/anthropics/skills) | بناء المهارات واكتشافها | [`anthropics/skills`](https://github.com/anthropics/skills) | [**skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skills) | ℹ️ مسودة عامة |
| **#33** | `181.9k` | [**ponytail**](https://github.com/DietrichGebert/ponytail) | البيانات والذكاء الاصطناعي | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) | [**ponytail: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ponytail) | ℹ️ مسودة عامة |
| **#34** | `179.9k` | [**pdf**](https://github.com/anthropics/skills/tree/main/skills/pdf) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**التعامل مع ملفات PDF** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pdf) | ℹ️ مسودة عامة |
| **#35** | `179.9k` | [**docx**](https://github.com/anthropics/skills/tree/main/skills/docx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل ملفات Word** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=docx) | ℹ️ مسودة عامة |
| **#36** | `179.9k` | [**xlsx**](https://github.com/anthropics/skills/tree/main/skills/xlsx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**جداول Excel والتحليل** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=xlsx) | ℹ️ مسودة عامة |
| **#37** | `179.9k` | [**pptx**](https://github.com/anthropics/skills/tree/main/skills/pptx) | المستندات والملفات | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل عروض PowerPoint** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pptx) | ℹ️ مسودة عامة |
| **#38** | `179.9k` | [**frontend-design**](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تصميم واجهات ويب مميزة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design) | ℹ️ مسودة عامة |
| **#39** | `179.9k` | [**skill-creator**](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | بناء المهارات واكتشافها | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**صانع المهارات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skill-creator) | ℹ️ مسودة عامة |
| **#40** | `179.9k` | [**webapp-testing**](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | جودة الكود والاختبار | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**اختبار تطبيقات الويب** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=webapp-testing) | ℹ️ مسودة عامة |
| **#41** | `179.9k` | [**mcp-builder**](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**بناء خوادم MCP** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mcp-builder) | ℹ️ مسودة عامة |
| **#42** | `179.9k` | [**canvas-design**](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تصميم بوسترات وفنون ثابتة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=canvas-design) | ℹ️ مسودة عامة |
| **#43** | `179.9k` | [**web-artifacts-builder**](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**بناء صفحات ويب متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-artifacts-builder) | ℹ️ مسودة عامة |
| **#44** | `179.9k` | [**brand-guidelines**](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**تطبيق الهوية البصرية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brand-guidelines) | ℹ️ مسودة عامة |
| **#45** | `179.9k` | [**theme-factory**](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**ثيمات جاهزة للعروض والمستندات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=theme-factory) | ℹ️ مسودة عامة |
| **#46** | `179.9k` | [**doc-coauthoring**](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | الكتابة والتواصل | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**كتابة المستندات بالمشاركة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doc-coauthoring) | ℹ️ مسودة عامة |
| **#47** | `179.9k` | [**algorithmic-art**](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**فن توليدي بالكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=algorithmic-art) | ℹ️ مسودة عامة |
| **#48** | `179.9k` | [**internal-comms**](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | الكتابة والتواصل | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**التواصل الداخلي في الشركات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=internal-comms) | ℹ️ مسودة عامة |
| **#49** | `179.9k` | [**slack-gif-creator**](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | التصميم والإبداع | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**صور GIF متحركة لـ Slack** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=slack-gif-creator) | ℹ️ مسودة عامة |
| **#50** | `179.9k` | [**claude-api**](https://github.com/anthropics/skills/tree/main/skills/claude-api) | البرمجة والويب | [`Anthropic/skills`](https://github.com/anthropics/skills) | [**البناء باستخدام Claude API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-api) | ℹ️ مسودة عامة |
| **#51** | `148.8k` | [**langchain-agent-workflow**](https://github.com/langchain-ai/langchain) | البيانات والذكاء الاصطناعي | [`langchain-ai/langchain`](https://github.com/langchain-ai/langchain) | [**بناء سلاسل ووكلاء LangChain** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=langchain-agent-workflow) | ℹ️ مسودة عامة |
| **#52** | `143.7k` | [**ui-ux-pro-max-skill**](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | التصميم والإبداع | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | [**UI/UX Pro Max: أنظمة تصميم** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ui-ux-pro-max-skill) | ℹ️ مسودة عامة |
| **#53** | `143.7k` | [**awesome-llm-apps**](https://github.com/Shubhamsaboo/awesome-llm-apps) | البيانات والذكاء الاصطناعي | [`Shubhamsaboo/awesome-llm-apps`](https://github.com/Shubhamsaboo/awesome-llm-apps) | [**awesome-llm-apps: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-llm-apps) | ℹ️ مسودة عامة |
| **#54** | `132.8k` | [**design-system-tokens**](https://github.com/nextlevelbuilder/ui-skills) | التصميم والإبداع | [`nextlevelbuilder/ui-skills`](https://github.com/nextlevelbuilder/ui-skills) | [**بناء وتوحيد أنظمة التصميم (Design Tokens)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=design-system-tokens) | ℹ️ مسودة عامة |
| **#55** | `128.8k` | [**kubernetes-manifest-builder**](https://github.com/kubernetes/kubernetes) | السحابة والأمان | [`kubernetes/kubernetes`](https://github.com/kubernetes/kubernetes) | [**بناء ملفات نشر Kubernetes المحصنة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=kubernetes-manifest-builder) | ℹ️ مسودة عامة |
| **#56** | `116.6k` | [**caveman**](https://github.com/JuliusBrussee/caveman) | البرمجة والويب | [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) | [**caveman: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=caveman) | ℹ️ مسودة عامة |
| **#57** | `112.5k` | [**addyosmani-agent-skills**](https://github.com/addyosmani/agent-skills) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**مهارات Addy Osmani لدورة الهندسة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=addyosmani-agent-skills) | ℹ️ مسودة عامة |
| **#58** | `112.5k` | [**agent-skills**](https://github.com/addyosmani/agent-skills) | البيانات والذكاء الاصطناعي | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**agent-skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=agent-skills) | ℹ️ مسودة عامة |
| **#59** | `109.8k` | [**github-pr-workflow**](https://github.com/paperclipai/paperclip) | جودة الكود والاختبار | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**أتمتة دورة حياة طلبات السحب (PR Automation)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=github-pr-workflow) | ℹ️ مسودة عامة |
| **#60** | `109.8k` | [**secret-leak-detection**](https://github.com/paperclipai/paperclip) | السحابة والأمان | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**كشف وتطهير الأسرار ومفاتيح الـ API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=secret-leak-detection) | ℹ️ مسودة عامة |
| **#61** | `109.8k` | [**simplified-technical-english**](https://github.com/paperclipai/paperclip) | الكتابة والتواصل | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**تبسيط وتوضيح الوثائق التقنية الإنجليزية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=simplified-technical-english) | ℹ️ مسودة عامة |
| **#62** | `109.8k` | [**paperclip**](https://github.com/paperclipai/paperclip) | العلوم والتعليم | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**paperclip: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=paperclip) | ℹ️ مسودة عامة |
| **#63** | `108.7k` | [**claude-mem**](https://github.com/thedotmack/claude-mem) | البيانات والذكاء الاصطناعي | [`thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) | [**claude-mem: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-mem) | ℹ️ مسودة عامة |
| **#64** | `107.5k` | [**taste-skill**](https://github.com/Leonxlnx/taste-skill) | التصميم والإبداع | [`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) | [**Taste Skill: تصميم واجهات بذوق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=taste-skill) | ℹ️ مسودة عامة |
| **#65** | `105.3k` | [**open-design**](https://github.com/nexu-io/open-design) | التصميم والإبداع | [`nexu-io/open-design`](https://github.com/nexu-io/open-design) | [**open-design: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=open-design) | ℹ️ مسودة عامة |
| **#66** | `99k` | [**impeccable**](https://github.com/pbakaus/impeccable) | جودة الكود والاختبار | [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) | [**impeccable: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=impeccable) | ℹ️ مسودة عامة |
| **#67** | `98.3k` | [**tailwind-ui-builder**](https://github.com/tailwindlabs/tailwindcss) | التصميم والإبداع | [`tailwindlabs/tailwindcss`](https://github.com/tailwindlabs/tailwindcss) | [**بناء واجهات Tailwind CSS الاحترافية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=tailwind-ui-builder) | ℹ️ مسودة عامة |
| **#68** | `92.3k` | [**archify**](https://github.com/tt-a1i/archify) | البيانات والذكاء الاصطناعي | [`tt-a1i/archify`](https://github.com/tt-a1i/archify) | [**archify: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=archify) | ℹ️ مسودة عامة |
| **#69** | `89.6k` | [**Understand-Anything**](https://github.com/Egonex-AI/Understand-Anything) | البيانات والذكاء الاصطناعي | [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) | [**Understand-Anything: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=understand-anything) | ℹ️ مسودة عامة |
| **#70** | `88k` | [**docker-cloud-ops**](https://github.com/agenticskills/devops-skills/tree/main/skills/docker-cloud-ops) | السحابة والأمان | [`agenticskills/devops-skills`](https://github.com/agenticskills/devops-skills) | [**بناء حاويات Docker المحمية وحزم السحابة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=docker-cloud-ops) | ℹ️ مسودة عامة |
| **#71** | `79.2k` | [**career-ops**](https://github.com/career-ops-hq/career-ops) | البيانات والذكاء الاصطناعي | [`career-ops-hq/career-ops`](https://github.com/career-ops-hq/career-ops) | [**career-ops: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=career-ops) | ℹ️ مسودة عامة |
| **#72** | `78.5k` | [**awesome-claude-skills**](https://github.com/ComposioHQ/awesome-claude-skills) | بناء المهارات واكتشافها | [`ComposioHQ/awesome-claude-skills`](https://github.com/ComposioHQ/awesome-claude-skills) | [**قائمة مهارات المجتمع (Awesome)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-claude-skills) | ℹ️ مسودة عامة |
| **#73** | `74.3k` | [**OpenMontage**](https://github.com/calesthio/OpenMontage) | المستندات والملفات | [`calesthio/OpenMontage`](https://github.com/calesthio/OpenMontage) | [**OpenMontage: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=openmontage) | ℹ️ مسودة عامة |
| **#74** | `74.3k` | [**datadog-cloud-monitoring**](https://github.com/composiohq/agentic-integrations) | السحابة والأمان | [`composiohq/agentic-integrations`](https://github.com/composiohq/agentic-integrations) | [**مراقبة أداء الخوادم مع Datadog** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=datadog-cloud-monitoring) | ℹ️ مسودة عامة |
| **#75** | `74.3k` | [**circleci-pipeline-ops**](https://github.com/composiohq/agentic-integrations) | السحابة والأمان | [`composiohq/agentic-integrations`](https://github.com/composiohq/agentic-integrations) | [**أتمتة خطوط التكامل والنشر CI/CD** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=circleci-pipeline-ops) | ℹ️ مسودة عامة |
| **#76** | `72k` | [**cyber-security-audit**](https://github.com/agenticskills/security-skills/tree/main/skills/cyber-security-audit) | السحابة والأمان | [`agenticskills/security-skills`](https://github.com/agenticskills/security-skills) | [**فحص الثغرات الأمنية ومراجعة كود OWASP** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=cyber-security-audit) | ℹ️ مسودة عامة |
| **#77** | `70.6k` | [**oh-my-openagent**](https://github.com/code-yeongyu/oh-my-openagent) | المستندات والملفات | [`code-yeongyu/oh-my-openagent`](https://github.com/code-yeongyu/oh-my-openagent) | [**oh-my-openagent: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=oh-my-openagent) | ℹ️ مسودة عامة |
| **#78** | `70k` | [**incident-retrospective**](https://github.com/etsy/incident-management) | الكتابة والتواصل | [`etsy/incident-management`](https://github.com/etsy/incident-management) | [**توثيق وتحليل الأعطال التقنية (Post-Mortem)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=incident-retrospective) | ℹ️ مسودة عامة |
| **#79** | `68k` | [**playwright-e2e-testing**](https://github.com/agenticskills/testing-skills/tree/main/skills/playwright-e2e-testing) | جودة الكود والاختبار | [`agenticskills/testing-skills`](https://github.com/agenticskills/testing-skills) | [**أتمتة اختبارات المتصفح الشاملة (Playwright)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=playwright-e2e-testing) | ℹ️ مسودة عامة |
| **#80** | `66.2k` | [**last30days-skill**](https://github.com/mvanhorn/last30days-skill) | البرمجة والويب | [`mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) | [**last30days-skill: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=last30days-skill) | ℹ️ مسودة عامة |
| **#81** | `65k` | [**sql-optimizer**](https://github.com/agenticskills/database-skills/tree/main/skills/sql-optimizer) | البيانات والذكاء الاصطناعي | [`agenticskills/database-skills`](https://github.com/agenticskills/database-skills) | [**تحسين استعلامات SQL وتسريع قواعد البيانات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=sql-optimizer) | ℹ️ مسودة عامة |
| **#82** | `63.8k` | [**diagram-design**](https://github.com/cathrynlavery/diagram-design) | التصميم والإبداع | [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) | [**diagram-design: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=diagram-design) | ℹ️ مسودة عامة |
| **#83** | `63.2k` | [**humanizer**](https://github.com/blader/humanizer) | البيانات والذكاء الاصطناعي | [`blader/humanizer`](https://github.com/blader/humanizer) | [**humanizer: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=humanizer) | ℹ️ مسودة عامة |
| **#84** | `59.7k` | [**i-have-adhd**](https://github.com/ayghri/i-have-adhd) | البرمجة والويب | [`ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd) | [**i-have-adhd: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i-have-adhd) | ℹ️ مسودة عامة |
| **#85** | `58k` | [**data-analysis-pandas**](https://github.com/agenticskills/data-skills/tree/main/skills/data-analysis-pandas) | البيانات والذكاء الاصطناعي | [`agenticskills/data-skills`](https://github.com/agenticskills/data-skills) | [**تحليل البيانات الاستكشافي باستخدام بايثون** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=data-analysis-pandas) | ℹ️ مسودة عامة |
| **#86** | `57.8k` | [**marketingskills**](https://github.com/coreyhaines31/marketingskills) | البيانات والذكاء الاصطناعي | [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) | [**marketingskills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketingskills) | ℹ️ مسودة عامة |
| **#87** | `57k` | [**awesome-claude-code**](https://github.com/hesreallyhim/awesome-claude-code) | البيانات والذكاء الاصطناعي | [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code) | [**awesome-claude-code: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-claude-code) | ℹ️ مسودة عامة |
| **#88** | `55.6k` | [**scientific-agent-skills**](https://github.com/K-Dense-AI/scientific-agent-skills) | البيانات والذكاء الاصطناعي | [`K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) | [**scientific-agent-skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=scientific-agent-skills) | ℹ️ مسودة عامة |
| **#89** | `54.9k` | [**deep-research**](https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فريق البحث الأكاديمي والتحليل المنهجي المعمق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deep-research) | ℹ️ مسودة عامة |
| **#90** | `54.9k` | [**sr-screener**](https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فرز الأوراق العلمية للمراجعات المنهجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=sr-screener) | ℹ️ مسودة عامة |
| **#91** | `54.9k` | [**academic-paper-writer**](https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**صياغة وتحرير الأوراق العلمية المحكمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=academic-paper-writer) | ℹ️ مسودة عامة |
| **#92** | `50.5k` | [**tanstack-query**](https://github.com/TanStack/query) | البرمجة والويب | [`TanStack/query`](https://github.com/TanStack/query) | [**إدارة وتخزين بيانات الخادم بـ TanStack Query** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=tanstack-query) | ℹ️ مسودة عامة |
| **#93** | `50.3k` | [**academic-research-assistant**](https://github.com/agenticskills/academic-skills/tree/main/skills/academic-research-assistant) | العلوم والتعليم | [`agenticskills/academic-skills`](https://github.com/agenticskills/academic-skills) | [**مساعد البحث العلمي ومراجعة الأدبيات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=academic-research-assistant) | ℹ️ مسودة عامة |
| **#94** | `48.7k` | [**weather-api-data**](https://github.com/hkuds/agentic-tools) | البيانات والذكاء الاصطناعي | [`hkuds/agentic-tools`](https://github.com/hkuds/agentic-tools) | [**جمع وتحليل بيانات الأرصاد والطقس** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=weather-api-data) | ℹ️ مسودة عامة |
| **#95** | `47.7k` | [**scientific-visualization**](https://github.com/k-dense-ai/scientific-skills) | العلوم والتعليم | [`k-dense-ai/scientific-skills`](https://github.com/k-dense-ai/scientific-skills) | [**رسم البيانات والمخططات العلمية للنشر** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=scientific-visualization) | ℹ️ مسودة عامة |
| **#96** | `45k` | [**openapi-designer**](https://github.com/agenticskills/api-skills/tree/main/skills/openapi-designer) | البرمجة والويب | [`agenticskills/api-skills`](https://github.com/agenticskills/api-skills) | [**تصميم وتوثيق واجهات البرمجة (OpenAPI 3.1)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=openapi-designer) | ℹ️ مسودة عامة |
| **#97** | `42.1k` | [**terraform-module-library**](https://github.com/wshobson/agents) | السحابة والأمان | [`wshobson/agents`](https://github.com/wshobson/agents) | [**بناء وحدات البنية التحتية بـ Terraform** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=terraform-module-library) | ℹ️ مسودة عامة |
| **#98** | `42.1k` | [**responsive-design**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**تصميم واجهات الويب المتجاوبة الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=responsive-design) | ℹ️ مسودة عامة |
| **#99** | `42.1k` | [**screen-reader-accessibility**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**إتاحة الواجهات لقارئات الشاشة (WCAG a11y)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=screen-reader-accessibility) | ℹ️ مسودة عامة |
| **#100** | `42.1k` | [**agents**](https://github.com/wshobson/agents) | البرمجة والويب | [`wshobson/agents`](https://github.com/wshobson/agents) | [**agents: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=agents) | ℹ️ مسودة عامة |
<!-- LEADERBOARD_END -->
