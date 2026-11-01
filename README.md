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
> 🔄 **آخر تحديث:** 2026-11-01 | **التصنيف:** الأكثر شهرة مع حماية التنوع (بحد أقصى 3 مهارات لكل مستودع في الصدارة) | [تحميل JSON المباشر](data/leaderboard.json)
> ⚠️ **تنبيه:** عدد النجوم يعود لمستودع GitHub الأصلي بالكامل وليس للمهارة المنفصلة بمفردها. تطبق الصدارة سقفاً بـ 3 مهارات كحد أقصى للمستودع الواحد في المراتب المتقدمة.

| # | نجوم المستودع ★ | المهارة (Skill) | التصنيف | المستودع الأصلي (GitHub) | الشرح والبرومبت الجاهز | الترتيب داخل المستودع |
|:---:|:---:|---|---|---|:---:|:---:|
| **🥇 1** | `417.1k` | [**rea**](https://github.com/morluto/rea) | البرمجة والويب | [`morluto/rea`](https://github.com/morluto/rea) | [**rea: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rea) | المهارة #1 |
| **🥈 2** | `310.3k` | [**superpowers**](https://github.com/obra/superpowers) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Superpowers: منهجية تطوير متكاملة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=superpowers) | المهارة #1 |
| **🥉 3** | `310.3k` | [**writing-plans**](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | البرمجة والويب | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تخطيط المشاريع البرمجية خطوة بخطوة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=obra-writing-plans) | المهارة #2 |
| **#4** | `310.3k` | [**systematic-debugging**](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استكشاف وإصلاح الأخطاء المنهجي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=systematic-debugging) | المهارة #3 |
| **#5** | `308.9k` | [**mattpocock-skills**](https://github.com/mattpocock/skills) | جودة الكود والاختبار | [`mattpocock/skills`](https://github.com/mattpocock/skills) | [**مهارات Matt Pocock للتطوير** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mattpocock-skills) | المهارة #1 |
| **#6** | `294.4k` | [**fastapi-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات FastAPI المتقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=fastapi-patterns) | المهارة #1 |
| **#7** | `294.4k` | [**prisma-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**استعلامات ونمذجة Prisma ORM الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=prisma-patterns) | المهارة #2 |
| **#8** | `294.4k` | [**swiftui-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط واجهات SwiftUI التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=swiftui-patterns) | المهارة #3 |
| **#9** | `186.1k` | [**skills**](https://github.com/anthropics/skills) | بناء المهارات واكتشافها | [`anthropics/skills`](https://github.com/anthropics/skills) | [**skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skills) | المهارة #1 |
| **#10** | `181.8k` | [**ponytail**](https://github.com/DietrichGebert/ponytail) | البيانات والذكاء الاصطناعي | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) | [**ponytail: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ponytail) | المهارة #1 |
| **#11** | `179.9k` | [**pdf**](https://github.com/anthropics/skills/tree/main/skills/pdf) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**التعامل مع ملفات PDF** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pdf) | المهارة #2 |
| **#12** | `179.9k` | [**docx**](https://github.com/anthropics/skills/tree/main/skills/docx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل ملفات Word** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=docx) | المهارة #3 |
| **#13** | `143.6k` | [**awesome-llm-apps**](https://github.com/Shubhamsaboo/awesome-llm-apps) | البيانات والذكاء الاصطناعي | [`Shubhamsaboo/awesome-llm-apps`](https://github.com/Shubhamsaboo/awesome-llm-apps) | [**awesome-llm-apps: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-llm-apps) | المهارة #1 |
| **#14** | `143.6k` | [**ui-ux-pro-max-skill**](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | التصميم والإبداع | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | [**UI/UX Pro Max: أنظمة تصميم** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ui-ux-pro-max-skill) | المهارة #1 |
| **#15** | `116.6k` | [**caveman**](https://github.com/JuliusBrussee/caveman) | البرمجة والويب | [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) | [**caveman: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=caveman) | المهارة #1 |
| **#16** | `112.5k` | [**interview-me**](https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me) | الكتابة والتواصل | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**استخلاص المتطلبات بالحوار المتدرج** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=interview-me) | المهارة #1 |
| **#17** | `112.5k` | [**idea-refine**](https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine) | الكتابة والتواصل | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**بلورة وتطوير الأفكار التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=idea-refine) | المهارة #2 |
| **#18** | `112.5k` | [**spec-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/spec-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المدفوع بالمواصفات التقنية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=spec-driven-development) | المهارة #3 |
| **#19** | `109.7k` | [**paperclip**](https://github.com/paperclipai/paperclip) | العلوم والتعليم | [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) | [**paperclip: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=paperclip) | المهارة #1 |
| **#20** | `108.5k` | [**claude-mem**](https://github.com/thedotmack/claude-mem) | البيانات والذكاء الاصطناعي | [`thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) | [**claude-mem: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-mem) | المهارة #1 |
| **#21** | `107.4k` | [**taste-skill**](https://github.com/Leonxlnx/taste-skill) | التصميم والإبداع | [`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) | [**Taste Skill: تصميم واجهات بذوق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=taste-skill) | المهارة #1 |
| **#22** | `105.3k` | [**open-design**](https://github.com/nexu-io/open-design) | التصميم والإبداع | [`nexu-io/open-design`](https://github.com/nexu-io/open-design) | [**open-design: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=open-design) | المهارة #1 |
| **#23** | `98.8k` | [**impeccable**](https://github.com/pbakaus/impeccable) | جودة الكود والاختبار | [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) | [**impeccable: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=impeccable) | المهارة #1 |
| **#24** | `92.3k` | [**archify**](https://github.com/tt-a1i/archify) | البيانات والذكاء الاصطناعي | [`tt-a1i/archify`](https://github.com/tt-a1i/archify) | [**archify: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=archify) | المهارة #1 |
| **#25** | `89.5k` | [**Understand-Anything**](https://github.com/Egonex-AI/Understand-Anything) | البيانات والذكاء الاصطناعي | [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) | [**Understand-Anything: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=understand-anything) | المهارة #1 |
| **#26** | `79.1k` | [**career-ops**](https://github.com/career-ops-hq/career-ops) | البيانات والذكاء الاصطناعي | [`career-ops-hq/career-ops`](https://github.com/career-ops-hq/career-ops) | [**career-ops: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=career-ops) | المهارة #1 |
| **#27** | `78.5k` | [**awesome-claude-skills**](https://github.com/ComposioHQ/awesome-claude-skills) | بناء المهارات واكتشافها | [`ComposioHQ/awesome-claude-skills`](https://github.com/ComposioHQ/awesome-claude-skills) | [**قائمة مهارات المجتمع (Awesome)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-claude-skills) | المهارة #1 |
| **#28** | `74.2k` | [**OpenMontage**](https://github.com/calesthio/OpenMontage) | المستندات والملفات | [`calesthio/OpenMontage`](https://github.com/calesthio/OpenMontage) | [**OpenMontage: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=openmontage) | المهارة #1 |
| **#29** | `70.6k` | [**oh-my-openagent**](https://github.com/code-yeongyu/oh-my-openagent) | المستندات والملفات | [`code-yeongyu/oh-my-openagent`](https://github.com/code-yeongyu/oh-my-openagent) | [**oh-my-openagent: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=oh-my-openagent) | المهارة #1 |
| **#30** | `66.2k` | [**last30days-skill**](https://github.com/mvanhorn/last30days-skill) | البرمجة والويب | [`mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) | [**last30days-skill: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=last30days-skill) | المهارة #1 |
| **#31** | `63.7k` | [**diagram-design**](https://github.com/cathrynlavery/diagram-design) | التصميم والإبداع | [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) | [**diagram-design: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=diagram-design) | المهارة #1 |
| **#32** | `63.1k` | [**humanizer**](https://github.com/blader/humanizer) | البيانات والذكاء الاصطناعي | [`blader/humanizer`](https://github.com/blader/humanizer) | [**humanizer: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=humanizer) | المهارة #1 |
| **#33** | `59.6k` | [**i-have-adhd**](https://github.com/ayghri/i-have-adhd) | البرمجة والويب | [`ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd) | [**i-have-adhd: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i-have-adhd) | المهارة #1 |
| **#34** | `57.8k` | [**marketingskills**](https://github.com/coreyhaines31/marketingskills) | البيانات والذكاء الاصطناعي | [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) | [**marketingskills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketingskills) | المهارة #1 |
| **#35** | `57k` | [**awesome-claude-code**](https://github.com/hesreallyhim/awesome-claude-code) | البيانات والذكاء الاصطناعي | [`hesreallyhim/awesome-claude-code`](https://github.com/hesreallyhim/awesome-claude-code) | [**awesome-claude-code: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=awesome-claude-code) | المهارة #1 |
| **#36** | `55.6k` | [**scientific-agent-skills**](https://github.com/K-Dense-AI/scientific-agent-skills) | البيانات والذكاء الاصطناعي | [`K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) | [**scientific-agent-skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=scientific-agent-skills) | المهارة #1 |
| **#37** | `54.8k` | [**deep-research**](https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فريق البحث الأكاديمي والتحليل المنهجي المعمق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deep-research) | المهارة #1 |
| **#38** | `54.8k` | [**sr-screener**](https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**فرز الأوراق العلمية للمراجعات المنهجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=sr-screener) | المهارة #2 |
| **#39** | `54.8k` | [**academic-paper-writer**](https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper) | العلوم والتعليم | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**صياغة وتحرير الأوراق العلمية المحكمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=academic-paper-writer) | المهارة #3 |
| **#40** | `42.1k` | [**responsive-design**](https://github.com/wshobson/agents) | التصميم والإبداع | [`wshobson/agents`](https://github.com/wshobson/agents) | [**تصميم واجهات الويب المتجاوبة الحديثة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=responsive-design) | المهارة #1 |
| **#41** | `42.1k` | [**agents**](https://github.com/wshobson/agents) | البرمجة والويب | [`wshobson/agents`](https://github.com/wshobson/agents) | [**agents: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=agents) | المهارة #2 |
| **#42** | `310.3k` | [**test-driven-development**](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التطوير الموجه بالاختبارات (TDD)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=test-driven-development) | موسعة (#4) |
| **#43** | `310.3k` | [**requesting-code-review**](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إعداد الكود وطلب المراجعة البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=requesting-code-review) | موسعة (#5) |
| **#44** | `310.3k` | [**receiving-code-review**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**استيعاب وتطبيق ملاحظات مراجعة الكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=receiving-code-review) | موسعة (#6) |
| **#45** | `310.3k` | [**using-git-worktrees**](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العمل على عدة فروع بالتوازي بـ Git Worktrees** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-git-worktrees) | موسعة (#7) |
| **#46** | `310.3k` | [**verification-before-completion**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التحقق الصارم قبل إنهاء المهمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=verification-before-completion) | موسعة (#8) |
| **#47** | `310.3k` | [**subagent-driven-development**](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تطوير المشاريع عبر فرق الوكلاء الفرعيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=subagent-driven-development) | موسعة (#9) |
| **#48** | `310.3k` | [**executing-plans**](https://github.com/obra/superpowers/tree/main/skills/executing-plans) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**التنفيذ المنضبط لخطط العمل البرمجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=executing-plans) | موسعة (#10) |
| **#49** | `310.3k` | [**dispatching-parallel-agents**](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إطلاق وتنسيق الوكلاء المتوازيين** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=dispatching-parallel-agents) | موسعة (#11) |
| **#50** | `310.3k` | [**brainstorming-solutions**](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**العصف الذهني واستكشاف الحلول المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brainstorming-solutions) | موسعة (#12) |
| **#51** | `310.3k` | [**finishing-a-development-branch**](https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**إنهاء فرع التطوير والدمج الآمن** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=finishing-development-branch) | موسعة (#13) |
| **#52** | `310.3k` | [**using-superpowers**](https://github.com/obra/superpowers/tree/main/skills/using-superpowers) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**الاستدعاء التلقائي لمهارات الوكلاء** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=using-superpowers) | موسعة (#14) |
| **#53** | `310.3k` | [**diagnosing-superpowers**](https://github.com/obra/superpowers/tree/main/skills/diagnosing-superpowers) | جودة الكود والاختبار | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تشخيص ومعالجة انحراف الجلسات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=diagnosing-superpowers) | موسعة (#15) |
| **#54** | `310.3k` | [**writing-skills**](https://github.com/obra/superpowers/tree/main/skills/writing-skills) | بناء المهارات واكتشافها | [`obra/superpowers`](https://github.com/obra/superpowers) | [**تأليف واختبار مهارات الوكلاء الجديدة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=writing-skills) | موسعة (#16) |
| **#55** | `294.4k` | [**rust-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط الإنتاج في لغة Rust** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=rust-patterns) | موسعة (#4) |
| **#56** | `294.4k` | [**redis-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns) | البرمجة والويب | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط التخزين المؤقت بـ Redis** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=redis-patterns) | موسعة (#5) |
| **#57** | `294.4k` | [**react-testing-library**](https://github.com/affaan-m/ECC/tree/main/skills/react-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبار مكونات React التفاعلية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=react-testing-library) | موسعة (#6) |
| **#58** | `294.4k` | [**python-pytest-suite**](https://github.com/affaan-m/ECC/tree/main/skills/python-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**حزمة اختبارات بايثون بـ Pytest** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=python-pytest-suite) | موسعة (#7) |
| **#59** | `294.4k` | [**django-security**](https://github.com/affaan-m/ECC/tree/main/skills/django-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تحصين وأمان تطبيقات Django** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=django-security) | موسعة (#8) |
| **#60** | `294.4k` | [**springboot-security**](https://github.com/affaan-m/ECC/tree/main/skills/springboot-security) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تأمين تطبيقات Spring Boot و Java** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=springboot-security) | موسعة (#9) |
| **#61** | `294.4k` | [**security-review-checklist**](https://github.com/affaan-m/ECC/tree/main/skills/security-review) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**قائمة التدقيق الأمني الشامل للكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=security-review-checklist) | موسعة (#10) |
| **#62** | `294.4k` | [**pytorch-model-eval**](https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns) | البيانات والذكاء الاصطناعي | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أنماط وتقييم نماذج PyTorch للتعلم العميق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pytorch-model-eval) | موسعة (#11) |
| **#63** | `294.4k` | [**marketing-campaign**](https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign) | الأعمال والمال | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**تخطيط وتنفيذ الحملات التسويقية الرقمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=marketing-campaign) | موسعة (#12) |
| **#64** | `294.4k` | [**i18n-sync-manager**](https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync) | الكتابة والتواصل | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**مزامنة وتدقيق ملفات الترجمة الدولية (i18n)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=i18n-sync-manager) | موسعة (#13) |
| **#65** | `294.4k` | [**golang-testing-suite**](https://github.com/affaan-m/ECC/tree/main/skills/golang-testing) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**اختبارات Go وحساب الأداء (Benchmarks)** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=golang-testing-suite) | موسعة (#14) |
| **#66** | `294.4k` | [**eval-harness**](https://github.com/affaan-m/ECC/tree/main/skills/eval-harness) | جودة الكود والاختبار | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**أطر تقييم مخرجات نماذج الذكاء الاصطناعي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=eval-harness) | موسعة (#15) |
| **#67** | `294.4k` | [**ECC**](https://github.com/affaan-m/ECC) | السحابة والأمان | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**ECC: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=ecc) | موسعة (#16) |
| **#68** | `179.9k` | [**xlsx**](https://github.com/anthropics/skills/tree/main/skills/xlsx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**جداول Excel والتحليل** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=xlsx) | موسعة (#4) |
| **#69** | `179.9k` | [**pptx**](https://github.com/anthropics/skills/tree/main/skills/pptx) | المستندات والملفات | [`anthropics/skills`](https://github.com/anthropics/skills) | [**إنشاء وتعديل عروض PowerPoint** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=pptx) | موسعة (#5) |
| **#70** | `179.9k` | [**frontend-design**](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تصميم واجهات ويب مميزة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-design) | موسعة (#6) |
| **#71** | `179.9k` | [**skill-creator**](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | بناء المهارات واكتشافها | [`anthropics/skills`](https://github.com/anthropics/skills) | [**صانع المهارات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=skill-creator) | موسعة (#7) |
| **#72** | `179.9k` | [**webapp-testing**](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | جودة الكود والاختبار | [`anthropics/skills`](https://github.com/anthropics/skills) | [**اختبار تطبيقات الويب** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=webapp-testing) | موسعة (#8) |
| **#73** | `179.9k` | [**mcp-builder**](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**بناء خوادم MCP** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=mcp-builder) | موسعة (#9) |
| **#74** | `179.9k` | [**canvas-design**](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تصميم بوسترات وفنون ثابتة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=canvas-design) | موسعة (#10) |
| **#75** | `179.9k` | [**web-artifacts-builder**](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**بناء صفحات ويب متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=web-artifacts-builder) | موسعة (#11) |
| **#76** | `179.9k` | [**brand-guidelines**](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**تطبيق الهوية البصرية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=brand-guidelines) | موسعة (#12) |
| **#77** | `179.9k` | [**theme-factory**](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**ثيمات جاهزة للعروض والمستندات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=theme-factory) | موسعة (#13) |
| **#78** | `179.9k` | [**doc-coauthoring**](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | الكتابة والتواصل | [`anthropics/skills`](https://github.com/anthropics/skills) | [**كتابة المستندات بالمشاركة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doc-coauthoring) | موسعة (#14) |
| **#79** | `179.9k` | [**algorithmic-art**](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**فن توليدي بالكود** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=algorithmic-art) | موسعة (#15) |
| **#80** | `179.9k` | [**internal-comms**](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | الكتابة والتواصل | [`anthropics/skills`](https://github.com/anthropics/skills) | [**التواصل الداخلي في الشركات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=internal-comms) | موسعة (#16) |
| **#81** | `179.9k` | [**slack-gif-creator**](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | التصميم والإبداع | [`anthropics/skills`](https://github.com/anthropics/skills) | [**صور GIF متحركة لـ Slack** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=slack-gif-creator) | موسعة (#17) |
| **#82** | `179.9k` | [**claude-api**](https://github.com/anthropics/skills/tree/main/skills/claude-api) | البرمجة والويب | [`anthropics/skills`](https://github.com/anthropics/skills) | [**البناء باستخدام Claude API** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=claude-api) | موسعة (#18) |
| **#83** | `112.5k` | [**planning-and-task-breakdown**](https://github.com/addyosmani/agent-skills/tree/main/skills/planning-and-task-breakdown) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تفكيك المهام وتخطيط التسليم** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=planning-and-task-breakdown) | موسعة (#4) |
| **#84** | `112.5k` | [**incremental-implementation**](https://github.com/addyosmani/agent-skills/tree/main/skills/incremental-implementation) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التنفيذ التدريجي بالشرائح القابلة للتحقق** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=incremental-implementation) | موسعة (#5) |
| **#85** | `112.5k` | [**frontend-ui-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering) | التصميم والإبداع | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**هندسة واجهات المستخدم الإنتاجية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=frontend-ui-engineering) | موسعة (#6) |
| **#86** | `112.5k` | [**api-and-interface-design**](https://github.com/addyosmani/agent-skills/tree/main/skills/api-and-interface-design) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تصميم واجهات البرمجة (APIs) والحدود المعمارية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=api-and-interface-design) | موسعة (#7) |
| **#87** | `112.5k` | [**context-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/context-engineering) | بناء المهارات واكتشافها | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**هندسة سياق الوكلاء وإدارة الذاكرة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=context-engineering) | موسعة (#8) |
| **#88** | `112.5k` | [**browser-testing-with-devtools**](https://github.com/addyosmani/agent-skills/tree/main/skills/browser-testing-with-devtools) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**الاختبار الآلي للمتصفح عبر DevTools** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=browser-testing-devtools) | موسعة (#9) |
| **#89** | `112.5k` | [**debugging-and-error-recovery**](https://github.com/addyosmani/agent-skills/tree/main/skills/debugging-and-error-recovery) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التشخيص الجذري للأخطاء والتعافي الذاتي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=debugging-error-recovery) | موسعة (#10) |
| **#90** | `112.5k` | [**doubt-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/doubt-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**المراجعة المعارضة واختبار الافتراضات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=doubt-driven-development) | موسعة (#11) |
| **#91** | `112.5k` | [**source-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/source-driven-development) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المرتكز على التوثيق والمصادر الرسمية** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=source-driven-development) | موسعة (#12) |
| **#92** | `112.5k` | [**constraint-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/constraint-driven-development) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**التطوير المنضبط بالقيود الهندسية الصارمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=constraint-driven-development) | موسعة (#13) |
| **#93** | `112.5k` | [**code-review-and-quality**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-review-and-quality) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**المراجعة الشاملة لجودة الكود والأمان** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-review-quality) | موسعة (#14) |
| **#94** | `112.5k` | [**code-simplification**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تبسيط الكود وتطهيره من التعقيد الزائد** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=code-simplification) | موسعة (#15) |
| **#95** | `112.5k` | [**performance-optimization**](https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**تسريع وتحسين أداء التطبيقات وقواعد البيانات** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=performance-optimization) | موسعة (#16) |
| **#96** | `112.5k` | [**deprecation-and-migration**](https://github.com/addyosmani/agent-skills/tree/main/skills/deprecation-and-migration) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**إدارة الهجرات البرمجية والأنظمة الملغاة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=deprecation-migration) | موسعة (#17) |
| **#97** | `112.5k` | [**git-workflow-and-versioning**](https://github.com/addyosmani/agent-skills/tree/main/skills/git-workflow-and-versioning) | البرمجة والويب | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**إدارة إصدارات Git والترقيم الدلالي** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow-versioning) | موسعة (#18) |
| **#98** | `112.5k` | [**shipping-and-launch**](https://github.com/addyosmani/agent-skills/tree/main/skills/shipping-and-launch) | السحابة والأمان | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**جاهزية الإطلاق والتدقيق النهائي للنشر** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=shipping-and-launch) | موسعة (#19) |
| **#99** | `112.4k` | [**addyosmani-agent-skills**](https://github.com/addyosmani/agent-skills) | جودة الكود والاختبار | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**مهارات Addy Osmani لدورة الهندسة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=addyosmani-agent-skills) | موسعة (#20) |
| **#100** | `112.4k` | [**agent-skills**](https://github.com/addyosmani/agent-skills) | البيانات والذكاء الاصطناعي | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**agent-skills: أداة وكيل متقدمة** ↗](https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=agent-skills) | موسعة (#21) |
<!-- LEADERBOARD_END -->
