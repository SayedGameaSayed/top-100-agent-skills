# 🏆 أفضل 100 مهارة ذكاء اصطناعي (Top 100 Agent Skills Leaderboard)
> **مستودع محدّث دوريًا يرصد ويصنّف أشهر 100 من AI Agent Skills على GitHub مع شروحات عربية وPrompts جاهزة**

<div align="center">

<p align="center">
  <a href="https://sayedgameasayed.github.io/top-100-agent-skills/">
    <img src="site/assets/og-preview.png" alt="Top 100 Agent Skills Preview" width="100%" />
  </a>
</p>

[![Daily Discovery & Sync](https://img.shields.io/badge/Auto%20Discovery-Daily%20Sync-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](.github/workflows/daily-rank-sync.yml)
[![Top 100 Skills](https://img.shields.io/badge/Leaderboard-Top%20100%20Skills-blueviolet?style=for-the-badge&logo=star&logoColor=white)](data/leaderboard.json)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-10b981?style=for-the-badge&logo=github&logoColor=white)](https://sayedgameasayed.github.io/top-100-agent-skills/)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Instant%20Deploy-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSayedGameaSayed%2Ftop-100-agent-skills)
[![Public API](https://img.shields.io/badge/Public%20API-JSON%20Endpoint-10b981?style=for-the-badge&logo=json&logoColor=white)](data/leaderboard.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ لماذا هذا المستودع مصدر مباشر للمستخدم؟

بدلاً من مجرد نسخ مستودعات أخرى، يعمل هذا المستودع كـ **محرك استكشاف وتصنيف آلي مستقل (Autonomous Aggregator & Leaderboard)**:
1. 🤖 **محرك استكشاف يومي (Daily Crawler):** يبحث آليًا كل 24 ساعة عبر GitHub API والمنصات المفتوحة عن أحدث AI Agent Skills (`topic:agent-skills`, `topic:claude-skills`, `SKILL.md`).
2. 📊 **ترتيب حقيقي بالنجوم والنشاط:** يجلب عدد نجوم GitHub المباشر لكل مستودع، ويصنف أعلى 100 مهارة في العالم تنازلياً.
3. 📦 **مصدر بيانات مفتوح (Public JSON API):** يوفر ملف `data/leaderboard.json` خفيف الوزن ومحدث يومياً، يمكن لأي مطور أو أداة أو إضافة IDE سحبه واستخدامه مباشرة.
4. 🌍 **شرح عربي مخصص لكل مهارة:** تبسيط وظيفة المهارة بالعربية مع Prompt إنجليزي فوري جاهز للنسخ إلى أي نموذج أو بيئة تطوير (ChatGPT, Claude, Gemini, Copilot, Cursor).
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
| **أي محادثة AI (ChatGPT / Gemini / Claude)** | انسخ الـ Prompt الجاهز من لوحة الصدارة والصقه مباشرة في محادثتك. |

---

## طريقة العمل الأساسية

```text
ابحث بالعربية ──> افهم المهارة والأمثلة ──> انسخ الـ Prompt الجاهز (English) ──> الصقه في محادثتك أو بيئة التطوير
```

---

### 🏛️ معمارية المشروع (Pure Static Architecture)
- **البيئة الإنتاجية (Production):** الموقع المنشور على GitHub Pages هو **موقع ساكن بالكامل (100% Pure Static Site)** بدون أي خادم أو قاعدة بيانات أو استدعاءات خارجية؛ محرك البحث ومساعد المهارات يعملان محلياً بالكامل داخل متصفح المستخدم (Client-Side) مع الحفاظ التام على الخصوصية.
- **ملف `server.js`:** خادم Express اختياري مخصص **فقط للتطوير المحلي (Local Development Only)** واختبار واجهات الـ API التجريبية عبر `npm run dev`. حزمة `express` مدرجة ضمن `devDependencies` ولا تعمل نهائياً في بيئة الإنتاج الساكنة.

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
> 🔄 **آخر تحديث آلي:** 2026-11-11 | **التصنيف:** الأكثر شهرة (حسب نجوم المستودع) | [تحميل JSON المباشر](data/leaderboard.json)
> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها.

| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والـ Prompt الجاهز | حالة المراجعة |
|:---:|:---:|---|---|---|:---:|:---:|
| **🥇 1** | `321.6k` | [**حلقة التشخيص المنهجي للأخطاء البرمجية الصعبة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-diagnosing-bugs) | ✅ مراجعة يدوية |
| **🥈 2** | `321.6k` | [**المقابلة الاستقصائية وتوليد توثيق القرارات المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=grill-with-docs) | ✅ مراجعة يدوية |
| **🥉 3** | `321.6k` | [**فرز وتصنيف المشاكل وطلبات السحب برمجيًا** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=triage) | ✅ مراجعة يدوية |
| **#4** | `321.6k` | [**مسح وتعميق البنية المعمارية للكود البرمجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=improve-codebase-architecture) | ✅ مراجعة يدوية |
| **#5** | `321.6k` | [**التطوير الموجه بالاختبارات الصارم من مات بوكوك** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-tdd) | ✅ مراجعة يدوية |
| **#6** | `321.6k` | [**تقسيم الخطط الكبيرة إلى تذاكر برمجية مترابطة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=to-tickets) | ✅ مراجعة يدوية |
| **#7** | `321.6k` | [**صياغة وثائق المواصفات الفنية من سياق النقاش** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=to-spec) | ✅ مراجعة يدوية |
| **#8** | `321.6k` | [**المراجعة الاستقصائية الصارمة لاختبار الأفكار والخطط** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=grill-me) | ✅ مراجعة يدوية |
| **#9** | `321.6k` | [**تهيئة خطافات Husky وفحص الأكواد قبل الاعتماد** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=setup-pre-commit) | ✅ مراجعة يدوية |
| **#10** | `321.6k` | [**حواجز حماية أوامر Git الخطرة لوكلاء الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-guardrails-claude-code) | ✅ مراجعة يدوية |
| **#11** | `321.6k` | [**كتابة المستندات والتعليمات الموجهة لوكلاء الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-for-agents) | ✅ مراجعة يدوية |
| **#12** | `321.6k` | [**تصميم وبناء الوحدات البرمجية العميقة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=codebase-design) | ✅ مراجعة يدوية |
| **#13** | `321.6k` | [**المراجعة المعيارية الدقيقة لتغييرات الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-code-review) | ✅ مراجعة يدوية |
| **#14** | `316k` | [**تخطيط المشاريع البرمجية خطوة بخطوة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=obra-writing-plans) | ✅ مراجعة يدوية |
| **#15** | `316k` | [**استكشاف وإصلاح الأخطاء المنهجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=systematic-debugging) | ✅ مراجعة يدوية |
| **#16** | `316k` | [**التطوير الموجه بالاختبارات (TDD)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=test-driven-development) | ✅ مراجعة يدوية |
| **#17** | `316k` | [**إعداد الكود وطلب المراجعة البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=requesting-code-review) | ✅ مراجعة يدوية |
| **#18** | `316k` | [**استيعاب وتطبيق ملاحظات مراجعة الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=receiving-code-review) | ✅ مراجعة يدوية |
| **#19** | `316k` | [**العمل على عدة فروع بالتوازي بـ Git Worktrees** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-git-worktrees) | ✅ مراجعة يدوية |
| **#20** | `316k` | [**التحقق الصارم قبل إنهاء المهمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=verification-before-completion) | ✅ مراجعة يدوية |
| **#21** | `316k` | [**تطوير المشاريع عبر فرق الوكلاء الفرعيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=subagent-driven-development) | ✅ مراجعة يدوية |
| **#22** | `316k` | [**التنفيذ المنضبط لخطط العمل البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=executing-plans) | ✅ مراجعة يدوية |
| **#23** | `316k` | [**إطلاق وتنسيق الوكلاء المتوازيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=dispatching-parallel-agents) | ✅ مراجعة يدوية |
| **#24** | `316k` | [**العصف الذهني واستكشاف الحلول المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brainstorming-solutions) | ✅ مراجعة يدوية |
| **#25** | `316k` | [**إنهاء فرع التطوير والدمج الآمن** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=finishing-development-branch) | ✅ مراجعة يدوية |
| **#26** | `316k` | [**الاستدعاء التلقائي لمهارات الوكلاء** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-superpowers) | ✅ مراجعة يدوية |
| **#27** | `316k` | [**تشخيص ومعالجة انحراف الجلسات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=diagnosing-superpowers) | ✅ مراجعة يدوية |
| **#28** | `316k` | [**تأليف واختبار مهارات الوكلاء الجديدة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-skills) | ✅ مراجعة يدوية |
| **#29** | `301.1k` | [**أنماط واجهات FastAPI المتقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=fastapi-patterns) | ✅ مراجعة يدوية |
| **#30** | `301.1k` | [**استعلامات ونمذجة Prisma ORM الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=prisma-patterns) | ✅ مراجعة يدوية |
| **#31** | `301.1k` | [**أنماط واجهات SwiftUI التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=swiftui-patterns) | ✅ مراجعة يدوية |
| **#32** | `301.1k` | [**أنماط الإنتاج في لغة Rust** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rust-patterns) | ✅ مراجعة يدوية |
| **#33** | `301.1k` | [**أنماط التخزين المؤقت بـ Redis** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=redis-patterns) | ✅ مراجعة يدوية |
| **#34** | `301.1k` | [**اختبار مكونات React التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-testing-library) | ✅ مراجعة يدوية |
| **#35** | `301.1k` | [**حزمة اختبارات Python عبر Pytest** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=python-pytest-suite) | ✅ مراجعة يدوية |
| **#36** | `301.1k` | [**تحصين وأمان تطبيقات Django** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=django-security) | ✅ مراجعة يدوية |
| **#37** | `301.1k` | [**تأمين تطبيقات Spring Boot و Java** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=springboot-security) | ✅ مراجعة يدوية |
| **#38** | `301.1k` | [**قائمة التدقيق الأمني الشامل للكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=security-review-checklist) | ✅ مراجعة يدوية |
| **#39** | `301.1k` | [**أنماط وتقييم نماذج PyTorch للتعلم العميق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pytorch-model-eval) | ✅ مراجعة يدوية |
| **#40** | `301.1k` | [**تخطيط وتنفيذ الحملات التسويقية الرقمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketing-campaign) | ✅ مراجعة يدوية |
| **#41** | `301.1k` | [**مزامنة وتدقيق ملفات الترجمة الدولية (i18n)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i18n-sync-manager) | ✅ مراجعة يدوية |
| **#42** | `301.1k` | [**اختبارات Go وحساب الأداء (Benchmarks)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=golang-testing-suite) | ✅ مراجعة يدوية |
| **#43** | `301.1k` | [**أطر تقييم مخرجات نماذج الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=eval-harness) | ✅ مراجعة يدوية |
| **#44** | `192.8k` | [**التعامل مع ملفات PDF** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pdf) | ✅ مراجعة يدوية |
| **#45** | `192.8k` | [**إنشاء وتعديل ملفات Word** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=docx) | ✅ مراجعة يدوية |
| **#46** | `192.8k` | [**جداول Excel والتحليل** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=xlsx) | ✅ مراجعة يدوية |
| **#47** | `192.8k` | [**إنشاء وتعديل عروض PowerPoint** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pptx) | ✅ مراجعة يدوية |
| **#48** | `192.8k` | [**تصميم واجهات ويب مميزة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design) | ✅ مراجعة يدوية |
| **#49** | `192.8k` | [**صانع المهارات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skill-creator) | ✅ مراجعة يدوية |
| **#50** | `192.8k` | [**اختبار تطبيقات الويب** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=webapp-testing) | ✅ مراجعة يدوية |
| **#51** | `192.8k` | [**بناء خوادم MCP** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mcp-builder) | ✅ مراجعة يدوية |
| **#52** | `192.8k` | [**تصميم بوسترات وفنون ثابتة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=canvas-design) | ✅ مراجعة يدوية |
| **#53** | `192.8k` | [**بناء صفحات ويب متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-artifacts-builder) | ✅ مراجعة يدوية |
| **#54** | `192.8k` | [**تطبيق الهوية البصرية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brand-guidelines) | ✅ مراجعة يدوية |
| **#55** | `192.8k` | [**مظاهر جاهزة للعروض والمستندات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=theme-factory) | ✅ مراجعة يدوية |
| **#56** | `192.8k` | [**كتابة المستندات بالمشاركة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doc-coauthoring) | ✅ مراجعة يدوية |
| **#57** | `192.8k` | [**فن توليدي بالكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=algorithmic-art) | ✅ مراجعة يدوية |
| **#58** | `192.8k` | [**التواصل الداخلي في الشركات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=internal-comms) | ✅ مراجعة يدوية |
| **#59** | `192.8k` | [**صور GIF متحركة لـ Slack** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=slack-gif-creator) | ✅ مراجعة يدوية |
| **#60** | `192.8k` | [**البناء باستخدام Claude API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-api) | ✅ مراجعة يدوية |
| **#61** | `115.6k` | [**استخلاص المتطلبات بالحوار المتدرج** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=interview-me) | ✅ مراجعة يدوية |
| **#62** | `115.6k` | [**بلورة وتطوير الأفكار التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=idea-refine) | ✅ مراجعة يدوية |
| **#63** | `115.6k` | [**التطوير المدفوع بالمواصفات التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=spec-driven-development) | ✅ مراجعة يدوية |
| **#64** | `115.6k` | [**تفكيك المهام وتخطيط التسليم** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=planning-and-task-breakdown) | ✅ مراجعة يدوية |
| **#65** | `115.6k` | [**التنفيذ التدريجي بالشرائح القابلة للتحقق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=incremental-implementation) | ✅ مراجعة يدوية |
| **#66** | `115.6k` | [**هندسة واجهات المستخدم الإنتاجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-ui-engineering) | ✅ مراجعة يدوية |
| **#67** | `115.6k` | [**تصميم واجهات البرمجة (APIs) والحدود المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=api-and-interface-design) | ✅ مراجعة يدوية |
| **#68** | `115.6k` | [**هندسة سياق الوكلاء وإدارة الذاكرة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=context-engineering) | ✅ مراجعة يدوية |
| **#69** | `115.6k` | [**الاختبار الآلي للمتصفح عبر DevTools** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=browser-testing-devtools) | ✅ مراجعة يدوية |
| **#70** | `115.6k` | [**التشخيص الجذري للأخطاء والتعافي الذاتي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=debugging-error-recovery) | ✅ مراجعة يدوية |
| **#71** | `115.6k` | [**المراجعة المعارضة واختبار الافتراضات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doubt-driven-development) | ✅ مراجعة يدوية |
| **#72** | `115.6k` | [**التطوير المرتكز على التوثيق والمصادر الرسمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=source-driven-development) | ✅ مراجعة يدوية |
| **#73** | `115.6k` | [**التطوير المنضبط بالقيود الهندسية الصارمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=constraint-driven-development) | ✅ مراجعة يدوية |
| **#74** | `115.6k` | [**المراجعة الشاملة لجودة الكود والأمان** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-review-quality) | ✅ مراجعة يدوية |
| **#75** | `115.6k` | [**تبسيط الكود وتطهيره من التعقيد الزائد** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-simplification) | ✅ مراجعة يدوية |
| **#76** | `115.6k` | [**تسريع وتحسين أداء التطبيقات وقواعد البيانات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=performance-optimization) | ✅ مراجعة يدوية |
| **#77** | `115.6k` | [**إدارة الترحيل البرمجي (Migration) والأنظمة المتوقفة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deprecation-migration) | ✅ مراجعة يدوية |
| **#78** | `115.6k` | [**إدارة إصدارات Git والترقيم الدلالي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow-versioning) | ✅ مراجعة يدوية |
| **#79** | `115.6k` | [**جاهزية الإطلاق والتدقيق النهائي للنشر** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=shipping-and-launch) | ✅ مراجعة يدوية |
| **#80** | `56.5k` | [**فريق البحث الأكاديمي والتحليل المنهجي المعمق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deep-research) | ✅ مراجعة يدوية |
| **#81** | `56.5k` | [**فرز الأوراق العلمية للمراجعات المنهجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=sr-screener) | ✅ مراجعة يدوية |
| **#82** | `56.5k` | [**صياغة وتحرير الأوراق العلمية المحكمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=academic-paper-writer) | ✅ مراجعة يدوية |
| **#83** | `42.4k` | [**تصميم واجهات الويب المتجاوبة الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=responsive-design) | ✅ مراجعة يدوية |
| **#84** | `33.9k` | [**أنماط تركيب مكونات React القابلة للتوسع** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=composition-patterns) | ✅ مراجعة يدوية |
| **#85** | `33.9k` | [**النشر المباشر للتطبيقات على منصة Vercel** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deploy-to-vercel) | ✅ مراجعة يدوية |
| **#86** | `33.9k` | [**أفضل ممارسات أداء React و Next.js من Vercel** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-best-practices) | ✅ مراجعة يدوية |
| **#87** | `33.9k` | [**أفضل ممارسات React Native و Expo للتطبيقات السريعة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-native-skills) | ✅ مراجعة يدوية |
| **#88** | `33.9k` | [**انتقالات الشاشة السينمائية بـ View Transition API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-view-transitions) | ✅ مراجعة يدوية |
| **#89** | `33.9k` | [**إدارة ونشر Vercel CLI بالرموز البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=vercel-cli-with-tokens) | ✅ مراجعة يدوية |
| **#90** | `33.9k` | [**تدقيق تكاليف وأداء مشاريع Vercel السحابية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=vercel-optimize) | ✅ مراجعة يدوية |
| **#91** | `33.9k` | [**تدقيق واجهات المستخدم وفق إرشادات الويب القياسية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-design-guidelines) | ✅ مراجعة يدوية |
| **#92** | `33.9k` | [**تدقيق وصياغة نصوص التوثيق التقني الاحترافي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-guidelines) | ✅ مراجعة يدوية |
| **#93** | `3.2k` | [**بناء خوادم Model Context Protocol من Microsoft** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ms-mcp-builder) | ✅ مراجعة يدوية |
| **#94** | `3.2k` | [**إنشاء مهارات الوكلاء الرسمية وفق معايير Microsoft** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ms-skill-creator) | ✅ مراجعة يدوية |
| **#95** | `3.2k` | [**المراجعة المعمارية لجودة واجهات المستخدم من Microsoft** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design-review) | ✅ مراجعة يدوية |
| **#96** | `3.2k` | [**توليد تقارير المشاكل الاحترافية لـ GitHub آليًا** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=github-issue-creator) | ✅ مراجعة يدوية |
| **#97** | `3.2k` | [**استشارات مهندس الحلول السحابية وفق معايير Azure** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=cloud-solution-architect) | ✅ مراجعة يدوية |
| **#98** | `3.2k` | [**بناء التطبيقات الذكية المعتمدة على Copilot SDK** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=copilot-sdk) | ✅ مراجعة يدوية |
| **#99** | `3.2k` | [**توليد الحوارات الصوتية التفاعلية بأسلوب البودكاست** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=podcast-generation) | ✅ مراجعة يدوية |
| **#100** | `3.2k` | [**استعلام وتحليل البيانات المتقدم بلغة Kusto (KQL)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=kql) | ✅ مراجعة يدوية |
<!-- LEADERBOARD_END -->

---

## 🌐 English Summary (For Global Developers & AI Builders)

**Top 100 Agent Skills** is an autonomous, open-source daily aggregator and leaderboard tracking the most popular agent skills across GitHub.

### 🌟 Key Highlights
- **100 Genuine Skills:** Every entry is backed by a verified `SKILL.md` instruction file returning HTTP 200 OK.
- **Daily Automated Discovery:** Scans GitHub API every 24 hours for new repositories matching `topic:agent-skills` and `SKILL.md`.
- **Public JSON Endpoints:** Consume the catalog freely via [`data/leaderboard.json`](data/leaderboard.json) and [`data/skills.json`](data/skills.json).
- **Tool-Agnostic:** Documented setup for **Claude Code, Cursor IDE, GitHub Copilot, Google Antigravity, Roo Code, Windsurf, and Gemini CLI**.
- **Interactive UI:** Built with [Resend's iconic Black Velvet with Violet Neon](https://sayedgameasayed.github.io/top-100-agent-skills/) aesthetic — flat `#000000` void canvas, 1px graphite hairlines, and 3D neural constellation.

### 📡 Public JSON API
You can fetch the live leaderboard in your own agent, IDE plugin, or CLI tool:
```bash
# Fetch live top 100 skills ranked by GitHub stars
curl -s https://raw.githubusercontent.com/SayedGameaSayed/top-100-agent-skills/main/data/leaderboard.json
```

---

## 🤝 المساهمة ودعم المجتمع (Contributing & Community)

نرحب بكافة المساهمات من مجتمع المطورين العربي والعالمي:
- 💡 **[اقترح مهارة جديدة للـ Top 100](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=suggest_skill.yml)**
- 🐛 **[أبلغ عن رابط معطل أو خطأ تقني](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=bug_report.yml)**
- ✍️ **[حسّن ترجمة أو صياغة عربية](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=improve_translation.yml)**
- 📖 راجع **[دليل المساهمة (CONTRIBUTING.md)](CONTRIBUTING.md)** و **[سياسة الأمان (SECURITY.md)](SECURITY.md)** قبل فتح Pull Request.

---

## 📜 الترخيص (License)
هذا المشروع مرخص تحت رخصة **[MIT License](LICENSE)** المفتوحة والمجانية بالكامل. كافة حقوق المهارات الأصلية محفوظة لأصحاب مستودعاتها الأصلية بموجب تراخيصها المحددة.

