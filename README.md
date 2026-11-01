# 🏆 أفضل 100 مهارة ذكاء اصطناعي (Top 100 Agent Skills Leaderboard)
> **مستودع مباشر ومحدث آلياً كل يوم يرصد، يكتشف، ويصنف أعلى 100 مهارة وكيل ذكاء اصطناعي على GitHub مع شروحات عربية وبرومبتات جاهزة**

<div align="center">

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
> 🔄 **آخر تحديث:** 2026-11-01 | **نجوم المستودعات كما في:** 1 نوفمبر 2026 | [تحميل JSON المباشر](data/leaderboard.json)
> ⚠️ **تنبيه الشفافية وقواعد التأهيل:**
> 1. تشترط صدارة المهارات المتقدمة أن تشير المهارة لمجلد يحتوي على ملف `SKILL.md` حقيقي وأن يكون المستودع مصدراً للمهارات (`repo_type: "skills"`).
> 2. يطبق سقف 3 مهارات كحد أقصى للمستودع الواحد في الصدارة لضمان التنوع وتكافؤ الفرص.
> 3. تم نقل الأدوات (`tools`) والإضافات (`plugins`) والقوائم (`lists`) لقسم مخصص في نهاية القائمة مع إرشادات الاستخدام المسؤول.

### 🏆 صدارة مهارات الوكلاء المؤهلة (Top Diverse Skills)

| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح العربي والبرومبت | الترتيب بالمستودع |
|:---:|:---:|---|---|---|:---:|:---:|
| **🥇 1** | `310.3k` | [**writing-plans**](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | البرمجة والويب | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تخطيط المشاريع البرمجية خطوة بخطوة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=obra-writing-plans) | المهارة #1 |
| **🥈 2** | `310.3k` | [**systematic-debugging**](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استكشاف وإصلاح الأخطاء المنهجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=systematic-debugging) | المهارة #2 |
| **🥉 3** | `310.3k` | [**test-driven-development**](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التطوير الموجه بالاختبارات (TDD)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=test-driven-development) | المهارة #3 |
| **#4** | `309.1k` | [**diagnosing-bugs**](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**حلقة التشخيص المنهجي للعلل البرمجية الصعبة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-diagnosing-bugs) | المهارة #1 |
| **#5** | `309.1k` | [**grill-with-docs**](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**المقابلة الاستقصائية وتوليد توثيق القرارات المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=grill-with-docs) | المهارة #2 |
| **#6** | `309.1k` | [**triage**](https://github.com/mattpocock/skills/tree/main/skills/engineering/triage) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**فرز وتصنيف المشاكل وطلبات السحب برمجياً** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=triage) | المهارة #3 |
| **#7** | `294.4k` | [**fastapi-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات FastAPI المتقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=fastapi-patterns) | المهارة #1 |
| **#8** | `294.4k` | [**prisma-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**استعلامات ونمذجة Prisma ORM الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=prisma-patterns) | المهارة #2 |
| **#9** | `294.4k` | [**swiftui-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات SwiftUI التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=swiftui-patterns) | المهارة #3 |
| **#10** | `179.9k` | [**pdf**](https://github.com/anthropics/skills/tree/main/skills/pdf) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**التعامل مع ملفات PDF** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pdf) | المهارة #1 |
| **#11** | `179.9k` | [**docx**](https://github.com/anthropics/skills/tree/main/skills/docx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل ملفات Word** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=docx) | المهارة #2 |
| **#12** | `179.9k` | [**xlsx**](https://github.com/anthropics/skills/tree/main/skills/xlsx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**جداول Excel والتحليل** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=xlsx) | المهارة #3 |
| **#13** | `112.5k` | [**interview-me**](https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me) | الكتابة والتواصل | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**استخلاص المتطلبات بالحوار المتدرج** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=interview-me) | المهارة #1 |
| **#14** | `112.5k` | [**idea-refine**](https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine) | الكتابة والتواصل | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**بلورة وتطوير الأفكار التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=idea-refine) | المهارة #2 |
| **#15** | `112.5k` | [**spec-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/spec-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المدفوع بالمواصفات التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=spec-driven-development) | المهارة #3 |
| **#16** | `54.8k` | [**deep-research**](https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فريق البحث الأكاديمي والتحليل المنهجي المعمق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deep-research) | المهارة #1 |
| **#17** | `54.8k` | [**sr-screener**](https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فرز الأوراق العلمية للمراجعات المنهجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=sr-screener) | المهارة #2 |
| **#18** | `54.8k` | [**academic-paper-writer**](https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**صياغة وتحرير الأوراق العلمية المحكمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=academic-paper-writer) | المهارة #3 |
| **#19** | `42.1k` | [**responsive-design**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**تصميم واجهات الويب المتجاوبة الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=responsive-design) | المهارة #1 |
| **#20** | `33.3k` | [**composition-patterns**](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | البرمجة والويب | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**أنماط تركيب مكونات React القابلة للتوسع** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=composition-patterns) | المهارة #1 |
| **#21** | `33.3k` | [**deploy-to-vercel**](https://github.com/vercel-labs/agent-skills/tree/main/skills/deploy-to-vercel) | السحابة والأمان | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**النشر المباشر للتطبيقات على منصة Vercel** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deploy-to-vercel) | المهارة #2 |
| **#22** | `33.3k` | [**react-best-practices**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | جودة الكود والاختبار | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**أفضل ممارسات أداء React و Next.js من Vercel** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-best-practices) | المهارة #3 |
| **#23** | `3.2k` | [**mcp-builder**](https://github.com/microsoft/skills/tree/main/.github/skills/mcp-builder) | بناء المهارات واكتشافها | [`microsoft/skills`](https://github.com/microsoft/skills) | [**بناء خوادم Model Context Protocol من مايكروسوفت** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ms-mcp-builder) | المهارة #1 |
| **#24** | `3.2k` | [**skill-creator**](https://github.com/microsoft/skills/tree/main/.github/skills/skill-creator) | بناء المهارات واكتشافها | [`microsoft/skills`](https://github.com/microsoft/skills) | [**إنشاء مهارات الوكلاء الرسمية وفق معايير Microsoft** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ms-skill-creator) | المهارة #2 |
| **#25** | `3.2k` | [**frontend-design-review**](https://github.com/microsoft/skills/tree/main/.github/skills/frontend-design-review) | التصميم والإبداع | [`microsoft/skills`](https://github.com/microsoft/skills) | [**المراجعة المعمارية لجودة واجهات المستخدم من Microsoft** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design-review) | المهارة #3 |

### 📦 مهارات المستودعات الموسعة (Extended Skills)

| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح العربي والبرومبت | الترتيب بالمستودع |
|:---:|:---:|---|---|---|:---:|:---:|
| #26 | `310.3k` | [**requesting-code-review**](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إعداد الكود وطلب المراجعة البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=requesting-code-review) | مهارة #4 |
| #27 | `310.3k` | [**receiving-code-review**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استيعاب وتطبيق ملاحظات مراجعة الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=receiving-code-review) | مهارة #5 |
| #28 | `310.3k` | [**using-git-worktrees**](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العمل على عدة فروع بالتوازي بـ Git Worktrees** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-git-worktrees) | مهارة #6 |
| #29 | `310.3k` | [**verification-before-completion**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التحقق الصارم قبل إنهاء المهمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=verification-before-completion) | مهارة #7 |
| #30 | `310.3k` | [**subagent-driven-development**](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تطوير المشاريع عبر فرق الوكلاء الفرعيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=subagent-driven-development) | مهارة #8 |
| #31 | `310.3k` | [**executing-plans**](https://github.com/obra/superpowers/tree/main/skills/executing-plans) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التنفيذ المنضبط لخطط العمل البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=executing-plans) | مهارة #9 |
| #32 | `310.3k` | [**dispatching-parallel-agents**](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إطلاق وتنسيق الوكلاء المتوازيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=dispatching-parallel-agents) | مهارة #10 |
| #33 | `310.3k` | [**brainstorming-solutions**](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العصف الذهني واستكشاف الحلول المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brainstorming-solutions) | مهارة #11 |
| #34 | `310.3k` | [**finishing-a-development-branch**](https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إنهاء فرع التطوير والدمج الآمن** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=finishing-development-branch) | مهارة #12 |
| #35 | `310.3k` | [**using-superpowers**](https://github.com/obra/superpowers/tree/main/skills/using-superpowers) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**الاستدعاء التلقائي لمهارات الوكلاء** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-superpowers) | مهارة #13 |
| #36 | `310.3k` | [**diagnosing-superpowers**](https://github.com/obra/superpowers/tree/main/skills/diagnosing-superpowers) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تشخيص ومعالجة انحراف الجلسات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=diagnosing-superpowers) | مهارة #14 |
| #37 | `310.3k` | [**writing-skills**](https://github.com/obra/superpowers/tree/main/skills/writing-skills) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تأليف واختبار مهارات الوكلاء الجديدة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-skills) | مهارة #15 |
| #38 | `309.1k` | [**improve-codebase-architecture**](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**مسح وتعميق البنية المعمارية للكود البرمجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=improve-codebase-architecture) | مهارة #4 |
| #39 | `309.1k` | [**tdd**](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**التطوير الموجه بالاختبارات الصارم من مات بوكوك** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-tdd) | مهارة #5 |
| #40 | `309.1k` | [**to-tickets**](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**تقسيم الخطط الكبيرة إلى تذاكر برمجية مترابطة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=to-tickets) | مهارة #6 |
| #41 | `309.1k` | [**to-spec**](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**صياغة وثائق المواصفات الفنية من سياق النقاش** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=to-spec) | مهارة #7 |
| #42 | `309.1k` | [**grill-me**](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**المقابلة الاستفزازية لاختبار قوة الأفكار والخطط** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=grill-me) | مهارة #8 |
| #43 | `309.1k` | [**setup-pre-commit**](https://github.com/mattpocock/skills/tree/main/skills/misc/setup-pre-commit) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**تهيئة خطافات Husky وفحص الأكواد قبل الاعتماد** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=setup-pre-commit) | مهارة #9 |
| #44 | `309.1k` | [**git-guardrails-claude-code**](https://github.com/mattpocock/skills/tree/main/skills/misc/git-guardrails-claude-code) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**حواجز حماية أوامر Git الخطرة لوكلاء الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-guardrails-claude-code) | مهارة #10 |
| #45 | `309.1k` | [**writing-for-agents**](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) | الكتابة والتواصل | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**كتابة المستندات والتعليمات الموجهة لوكلاء الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-for-agents) | مهارة #11 |
| #46 | `309.1k` | [**codebase-design**](https://github.com/mattpocock/skills/tree/main/skills/engineering/codebase-design) | البرمجة والويب | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**تصميم وبناء الوحدات البرمجية العميقة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=codebase-design) | مهارة #12 |
| #47 | `309.1k` | [**code-review**](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**المراجعة المعيارية الدقيقة لتغييرات الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mp-code-review) | مهارة #13 |
| #48 | `294.4k` | [**rust-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط الإنتاج في لغة Rust** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rust-patterns) | مهارة #4 |
| #49 | `294.4k` | [**redis-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط التخزين المؤقت بـ Redis** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=redis-patterns) | مهارة #5 |
| #50 | `294.4k` | [**react-testing-library**](https://github.com/affaan-m/ECC/tree/main/skills/react-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبار مكونات React التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-testing-library) | مهارة #6 |
| #51 | `294.4k` | [**python-pytest-suite**](https://github.com/affaan-m/ECC/tree/main/skills/python-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**حزمة اختبارات بايثون بـ Pytest** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=python-pytest-suite) | مهارة #7 |
| #52 | `294.4k` | [**django-security**](https://github.com/affaan-m/ECC/tree/main/skills/django-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تحصين وأمان تطبيقات Django** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=django-security) | مهارة #8 |
| #53 | `294.4k` | [**springboot-security**](https://github.com/affaan-m/ECC/tree/main/skills/springboot-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تأمين تطبيقات Spring Boot و Java** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=springboot-security) | مهارة #9 |
| #54 | `294.4k` | [**security-review-checklist**](https://github.com/affaan-m/ECC/tree/main/skills/security-review) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**قائمة التدقيق الأمني الشامل للكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=security-review-checklist) | مهارة #10 |
| #55 | `294.4k` | [**pytorch-model-eval**](https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns) | البيانات والذكاء الاصطناعي | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط وتقييم نماذج PyTorch للتعلم العميق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pytorch-model-eval) | مهارة #11 |
| #56 | `294.4k` | [**marketing-campaign**](https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign) | الأعمال والمال | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تخطيط وتنفيذ الحملات التسويقية الرقمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketing-campaign) | مهارة #12 |
| #57 | `294.4k` | [**i18n-sync-manager**](https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync) | الكتابة والتواصل | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**مزامنة وتدقيق ملفات الترجمة الدولية (i18n)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i18n-sync-manager) | مهارة #13 |
| #58 | `294.4k` | [**golang-testing-suite**](https://github.com/affaan-m/ECC/tree/main/skills/golang-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبارات Go وحساب الأداء (Benchmarks)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=golang-testing-suite) | مهارة #14 |
| #59 | `294.4k` | [**eval-harness**](https://github.com/affaan-m/ECC/tree/main/skills/eval-harness) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أطر تقييم مخرجات نماذج الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=eval-harness) | مهارة #15 |
| #60 | `179.9k` | [**pptx**](https://github.com/anthropics/skills/tree/main/skills/pptx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل عروض PowerPoint** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pptx) | مهارة #4 |
| #61 | `179.9k` | [**frontend-design**](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تصميم واجهات ويب مميزة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design) | مهارة #5 |
| #62 | `179.9k` | [**skill-creator**](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | بناء المهارات واكتشافها | [`anthropics/skills`](https://github.com/anthropics/skills) | [**صانع المهارات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skill-creator) | مهارة #6 |
| #63 | `179.9k` | [**webapp-testing**](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | جودة الكود والاختبار | [`anthropics/skills`](https://github.com/anthropics/skills) | [**اختبار تطبيقات الويب** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=webapp-testing) | مهارة #7 |
| #64 | `179.9k` | [**mcp-builder**](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**بناء خوادم MCP** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mcp-builder) | مهارة #8 |
| #65 | `179.9k` | [**canvas-design**](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تصميم بوسترات وفنون ثابتة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=canvas-design) | مهارة #9 |
| #66 | `179.9k` | [**web-artifacts-builder**](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**بناء صفحات ويب متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-artifacts-builder) | مهارة #10 |
| #67 | `179.9k` | [**brand-guidelines**](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تطبيق الهوية البصرية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brand-guidelines) | مهارة #11 |
| #68 | `179.9k` | [**theme-factory**](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**ثيمات جاهزة للعروض والمستندات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=theme-factory) | مهارة #12 |
| #69 | `179.9k` | [**doc-coauthoring**](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | الكتابة والتواصل | [`anthropics/skills`](https://github.com/anthropics/skills) | [**كتابة المستندات بالمشاركة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doc-coauthoring) | مهارة #13 |
| #70 | `179.9k` | [**algorithmic-art**](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**فن توليدي بالكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=algorithmic-art) | مهارة #14 |
| #71 | `179.9k` | [**internal-comms**](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | الكتابة والتواصل | [`anthropics/skills`](https://github.com/anthropics/skills) | [**التواصل الداخلي في الشركات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=internal-comms) | مهارة #15 |
| #72 | `179.9k` | [**slack-gif-creator**](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**صور GIF متحركة لـ Slack** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=slack-gif-creator) | مهارة #16 |
| #73 | `179.9k` | [**claude-api**](https://github.com/anthropics/skills/tree/main/skills/claude-api) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**البناء باستخدام Claude API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-api) | مهارة #17 |
| #74 | `112.5k` | [**planning-and-task-breakdown**](https://github.com/addyosmani/agent-skills/tree/main/skills/planning-and-task-breakdown) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تفكيك المهام وتخطيط التسليم** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=planning-and-task-breakdown) | مهارة #4 |
| #75 | `112.5k` | [**incremental-implementation**](https://github.com/addyosmani/agent-skills/tree/main/skills/incremental-implementation) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التنفيذ التدريجي بالشرائح القابلة للتحقق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=incremental-implementation) | مهارة #5 |
| #76 | `112.5k` | [**frontend-ui-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering) | التصميم والإبداع | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**هندسة واجهات المستخدم الإنتاجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-ui-engineering) | مهارة #6 |
| #77 | `112.5k` | [**api-and-interface-design**](https://github.com/addyosmani/agent-skills/tree/main/skills/api-and-interface-design) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تصميم واجهات البرمجة (APIs) والحدود المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=api-and-interface-design) | مهارة #7 |
| #78 | `112.5k` | [**context-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/context-engineering) | بناء المهارات واكتشافها | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**هندسة سياق الوكلاء وإدارة الذاكرة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=context-engineering) | مهارة #8 |
| #79 | `112.5k` | [**browser-testing-with-devtools**](https://github.com/addyosmani/agent-skills/tree/main/skills/browser-testing-with-devtools) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**الاختبار الآلي للمتصفح عبر DevTools** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=browser-testing-devtools) | مهارة #9 |
| #80 | `112.5k` | [**debugging-and-error-recovery**](https://github.com/addyosmani/agent-skills/tree/main/skills/debugging-and-error-recovery) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التشخيص الجذري للأخطاء والتعافي الذاتي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=debugging-error-recovery) | مهارة #10 |
| #81 | `112.5k` | [**doubt-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/doubt-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**المراجعة المعارضة واختبار الافتراضات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doubt-driven-development) | مهارة #11 |
| #82 | `112.5k` | [**source-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/source-driven-development) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المرتكز على التوثيق والمصادر الرسمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=source-driven-development) | مهارة #12 |
| #83 | `112.5k` | [**constraint-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/constraint-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المنضبط بالقيود الهندسية الصارمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=constraint-driven-development) | مهارة #13 |
| #84 | `112.5k` | [**code-review-and-quality**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-review-and-quality) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**المراجعة الشاملة لجودة الكود والأمان** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-review-quality) | مهارة #14 |
| #85 | `112.5k` | [**code-simplification**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تبسيط الكود وتطهيره من التعقيد الزائد** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-simplification) | مهارة #15 |
| #86 | `112.5k` | [**performance-optimization**](https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تسريع وتحسين أداء التطبيقات وقواعد البيانات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=performance-optimization) | مهارة #16 |
| #87 | `112.5k` | [**deprecation-and-migration**](https://github.com/addyosmani/agent-skills/tree/main/skills/deprecation-and-migration) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**إدارة الهجرات البرمجية والأنظمة الملغاة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deprecation-migration) | مهارة #17 |
| #88 | `112.5k` | [**git-workflow-and-versioning**](https://github.com/addyosmani/agent-skills/tree/main/skills/git-workflow-and-versioning) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**إدارة إصدارات Git والترقيم الدلالي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow-versioning) | مهارة #18 |
| #89 | `112.5k` | [**shipping-and-launch**](https://github.com/addyosmani/agent-skills/tree/main/skills/shipping-and-launch) | السحابة والأمان | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**جاهزية الإطلاق والتدقيق النهائي للنشر** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=shipping-and-launch) | مهارة #19 |
| #90 | `33.3k` | [**react-native-skills**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-native-skills) | البرمجة والويب | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**أفضل ممارسات React Native و Expo للتطبيقات السريعة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-native-skills) | مهارة #4 |
| #91 | `33.3k` | [**react-view-transitions**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions) | التصميم والإبداع | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**انتقالات الشاشة السينمائية بـ View Transition API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-view-transitions) | مهارة #5 |
| #92 | `33.3k` | [**vercel-cli-with-tokens**](https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-cli-with-tokens) | السحابة والأمان | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**إدارة ونشر Vercel CLI بالرموز البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=vercel-cli-with-tokens) | مهارة #6 |
| #93 | `33.3k` | [**vercel-optimize**](https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-optimize) | السحابة والأمان | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**تدقيق تكاليف وأداء مشاريع Vercel السحابية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=vercel-optimize) | مهارة #7 |
| #94 | `33.3k` | [**web-design-guidelines**](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | التصميم والإبداع | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**تدقيق واجهات المستخدم وفق إرشادات الويب القياسية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-design-guidelines) | مهارة #8 |
| #95 | `33.3k` | [**writing-guidelines**](https://github.com/vercel-labs/agent-skills/tree/main/skills/writing-guidelines) | الكتابة والتواصل | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) | [**تدقيق وصياغة نصوص التوثيق التقني الاحترافي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-guidelines) | مهارة #9 |
| #96 | `3.2k` | [**github-issue-creator**](https://github.com/microsoft/skills/tree/main/.github/skills/github-issue-creator) | البرمجة والويب | [`microsoft/skills`](https://github.com/microsoft/skills) | [**توليد تقارير المشاكل الاحترافية لـ GitHub آلياً** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=github-issue-creator) | مهارة #4 |
| #97 | `3.2k` | [**cloud-solution-architect**](https://github.com/microsoft/skills/tree/main/.github/skills/cloud-solution-architect) | السحابة والأمان | [`microsoft/skills`](https://github.com/microsoft/skills) | [**استشارات مهندس الحلول السحابية وفق معايير Azure** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=cloud-solution-architect) | مهارة #5 |
| #98 | `3.2k` | [**copilot-sdk**](https://github.com/microsoft/skills/tree/main/.github/skills/copilot-sdk) | البرمجة والويب | [`microsoft/skills`](https://github.com/microsoft/skills) | [**بناء التطبيقات الذكية المعتمدة على Copilot SDK** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=copilot-sdk) | مهارة #6 |
| #99 | `3.2k` | [**podcast-generation**](https://github.com/microsoft/skills/tree/main/.github/skills/podcast-generation) | البيانات والذكاء الاصطناعي | [`microsoft/skills`](https://github.com/microsoft/skills) | [**توليد الحوارات الصوتية التفاعلية بأسلوب البودكاست** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=podcast-generation) | مهارة #7 |
| #100 | `3.2k` | [**kql**](https://github.com/microsoft/skills/tree/main/.github/skills/kql) | البيانات والذكاء الاصطناعي | [`microsoft/skills`](https://github.com/microsoft/skills) | [**استعلام وتحليل البيانات المتقدم بلغة Kusto (KQL)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=kql) | مهارة #8 |

### 🛠️ الأدوات والإضافات والقوائم المكملة (Tools, Plugins & Lists)

> ℹ️ هذه المستودعات أدوات ومكتبات برمجية أو إضافات وليست مهارات قائمة بذاتها بتنسيق `SKILL.md`، ومصنفة لتسهيل الرجوع إليها.

| # | نجوم المستودع ★ | الأداة / الإضافة | النوع | المستودع الأصلي (GitHub) | ملاحظات الاستخدام |
|:---:|:---:|---|---|---|---|
<!-- LEADERBOARD_END -->
