# BUILD_SPEC: Arabic Skills Guide (repo + static website)

You are building a small open-source project: a GitHub repository plus a static website that helps **Arabic-speaking users understand AI "Skills" (SKILL.md folders) before using them**. The user browses the site, reads an Arabic explanation, then copies a ready-made English prompt (or the link) and pastes it into any AI tool (ChatGPT, Gemini, Claude, Copilot, Cursor, coding agents, etc.). The project is **tool-agnostic**: never present it as Claude-only, and never use Claude branding in the UI.

Read this whole file before writing code. Follow the "Hard rules" strictly.

---

## 1. Goal and audience

- Audience: Arabic speakers, many are beginners (students, office workers, junior developers). Dialects: Egyptian, Gulf, Levantine, MSA. UI language: Modern Standard Arabic, simple wording.
- Core flow: **search -> understand (Arabic) -> copy English prompt -> paste into a model**.
- The site is a curated guide, not a dump. Quality over quantity: target 50-100 well-explained skills, not hundreds.

## 2. Hard rules (do not violate)

1. **Licensing.**
   - Each skill in `skills.json` has `license.status`:
     - `proprietary_link_only`: NEVER copy the skill's files into this repo, never host them, never show a "copy file content" button. Only link to the official source URL. (Example: Anthropic's docx, pdf, pptx, xlsx skills are source-available, not open source.)
     - `verify_before_publish`: license looks permissive but must be checked against the LICENSE file in the source folder before the skill is published. Since v1 is explanation-only (see section 11.2), these may be listed with the visible badge "تحقق من الرخصة في المصدر" until a human confirms the license. They must never get a stored file or a copy-file button before that.
     - `open`: permissive license confirmed (MIT, Apache-2.0, etc.). Copying the file is allowed with attribution.
   - Always show source repo link, owner, and license type on every skill card.
   - Add a root `LICENSE` (MIT) for the site code and a `NOTICE.md` listing attributions.
2. **Never translate the SKILL.md itself in place.** The English file stays the source of truth, in the original repo. Our value is the Arabic explanation layer and the English prompt wrapper.
3. **Prompts stay in English.** Everything copied to the clipboard for a model is English. Arabic is only for the user-facing explanation and the example requests.
4. **No fabricated content.** Do not invent skills, licenses, URLs or features. If a URL cannot be verified, flag it in `data/TODO.md` instead of guessing.
5. **No tracking, no backend.** Pure static site.
6. **Honest compatibility claims.** The universal method that works with every AI tool is copy and paste (prompt or file content). Native support for the SKILL.md format, and the folder where each tool looks for skills, differs per tool and changes over time. Never hardcode such claims or paths in the UI. They live in `data/tools.json`, and a tool's native-support instructions are shown on the site only when that entry has `verified: true` and a `docs_url` to the tool's official documentation. Entries with `verified: false` fall back to the copy-and-paste instructions.

## 3. Repository structure

```
arabic-skills-guide/
|- README.md                 (Arabic first, short English section below)
|- LICENSE                   (MIT, covers site code)
|- NOTICE.md                 (attributions to original skill authors)
|- CONTRIBUTING.md           (how to add a skill, Arabic + English)
|- data/
|  |- skills.json            (single source of truth, see schema)
|  |- tools.json             (AI tools and how each one uses skills, see schema)
|  |- TODO.md                (anything unverified)
|- scripts/
|  |- validate.mjs           (schema + rules check, run in CI)
|- site/
|  |- index.html
|  |- skill.html             (detail page, reads ?id=)
|  |- how-to-use.html        (Arabic guide: 3 ways to use a skill)
|  |- css/style.css
|  |- js/app.js, js/search.js, js/copy.js
|- .github/workflows/
   |- validate.yml           (runs validate.mjs on PRs)
   |- pages.yml              (deploys /site to GitHub Pages)
```

Tech: plain HTML, CSS, vanilla JS (ES modules). **No framework, no build step.** The site loads `data/skills.json` via `fetch`. Search uses Fuse.js from a CDN (cdnjs or jsDelivr), with a local fallback if it fails to load.

## 4. Data schema (`data/skills.json`)

Top-level: `schema_version`, `site`, `prompt_templates`, `categories[]`, `skills[]`. A starter file with 5 sample skills is provided as `skills.json`; move it to `data/skills.json`.

Each skill has:
- `id` (kebab-case, unique), `name` (original English name), `category` (must exist in `categories`)
- `source`: `owner`, `repo`, `url`
- `license`: `type`, `status` (`open` | `verify_before_publish` | `proprietary_link_only`), `copy_file_allowed` (boolean)
- `title_ar`, `summary_ar` (2-3 simple sentences)
- `benefits_ar[]` (2-4 items), `use_cases_ar[]` (2-4 items), `example_prompts_ar[]` (2-4 items)
- `difficulty`: `beginner` | `intermediate` | `advanced`
- optional: `verified` (boolean), `tags[]`, `skill_file_path` (only if copy_file_allowed and the file is stored in this repo under `skills-files/<id>/SKILL.md`)
- optional, for the maintainer's **own modified skills** (derived works): `derived_from` (`owner`, `repo`, `url`, `license_type`) and `modification_notes_ar[]` (what was changed, in Arabic). A derived skill must have `license.status = "open"`, `copy_file_allowed = true`, a stored `skill_file_path`, and a copy of the original LICENSE file next to it at `skills-files/<id>/LICENSE`. Only permissive originals (Apache-2.0, MIT) may be derived. Never derive from `proprietary_link_only` skills.

### `data/tools.json`

Array of AI tools. Each entry: `id`, `name`, `kind` (`chat` | `cli` | `ide`), `support` (`paste_only` | `reported_compatible` | `reported_native`), `docs_url` (official documentation URL or `null`), `skills_path` (string or `null`), `verified` (boolean), `note_ar`. A built-in entry `any-chat` (`paste_only`, always verified) covers every chat model. The maintainer fills `docs_url` and `skills_path` from each tool's official docs and flips `verified` to `true`. Validator rule: `verified: true` requires a non-null `https://` `docs_url`.

`scripts/validate.mjs` must fail the build if:
- required fields are missing or `id` is duplicated
- `category` is unknown
- `license.status` is `proprietary_link_only` but `copy_file_allowed` is true or `skill_file_path` exists
- `copy_file_allowed` is true but `skill_file_path` is missing or the file does not exist
- any Arabic text field is empty
- `source.url` is not an `https://` URL
- `derived_from` is present but the original license is not permissive, `skills-files/<id>/LICENSE` is missing, `modification_notes_ar` is empty, or `NOTICE.md` does not mention `derived_from.repo`

## 5. Website features

**Home (`index.html`)**
- Header with site name (`site.name_ar`) and tagline, link to "how to use".
- Search box (autofocus) searching: `title_ar`, `summary_ar`, `benefits_ar`, `use_cases_ar`, `name`, `tags`.
- **Arabic search normalization** (apply to both query and index): remove tashkeel/diacritics and tatweel; normalize alef variants (أ إ آ -> ا); ya (ى -> ي); ta marbuta (ة -> ه). Also support English queries matching `name`.
- Category filter chips (from `categories`) and a difficulty filter.
- Grid of skill cards. Each card shows: `title_ar`, English `name` (LTR, small), `summary_ar` (clamped to 3 lines), difficulty badge, license badge (color by `license.status`), and the source owner.
- Empty state in Arabic when no results.

**Detail (`skill.html?id=...`)**
- Sections in order: what it does (`summary_ar`), benefits, use cases, example requests (each with its own copy button), source and license box, then the **Use it** panel. For skills with `derived_from`, show a clear box "معدّلة من: <original name> (<license_type>)" with a link to the original and the list `modification_notes_ar`.
- **Use it panel** (most important part):
  1. Button "انسخ البرومبت الجاهز" -> copies `prompt_templates.link_prompt_en` with `{{source_url}}` replaced.
  2. Button "انسخ اللينك فقط" -> copies `source.url`.
  3. Button "انسخ محتوى الملف" -> copies `prompt_templates.file_prompt_en` with `{{skill_file_content}}` replaced by the stored SKILL.md. **Render this button only when `license.copy_file_allowed` is true and the file exists.** Otherwise show a short Arabic note: "الملف ده مرخّص بشكل خاص، افتح المصدر الأصلي".
  4. Short Arabic note: "لو الموديل مش قادر يفتح اللينك، جرّب نسخ محتوى الملف أو ارفع الفولدر مباشرة".
- Copy feedback: toast "تم النسخ" for 2 seconds, plus `aria-live="polite"`. Use `navigator.clipboard.writeText` with a `document.execCommand('copy')` fallback.

**How to use (`how-to-use.html`)** (write the Arabic copy yourself, keep it short and accurate)
- What a Skill is, in 3 sentences.
- Method 1 (works everywhere): paste the ready English prompt, or the file content, into any AI chat or coding assistant.
- Method 2 (tools with native skills support): a section generated from `data/tools.json`, listing only entries with `verified: true`, each with its `skills_path` and a link to `docs_url`. Add the sentence: "الدعم والمسارات بتختلف من أداة لأخرى وبتتغير، راجع التوثيق الرسمي للأداة."
- Do not describe exact menu paths or plan availability for any product in the copy; link to the official docs instead.
- A warning: skills can run code, so only use skills from sources you trust and read them first.

## 6. Design and UX requirements

- `<html lang="ar" dir="rtl">`. Use CSS logical properties (`margin-inline-start`, etc.). English names, code and prompts render `dir="ltr"` inside RTL pages.
- Arabic font: Cairo or Tajawal (Google Fonts, `display=swap`) with system fallbacks. Code uses a monospace stack.
- Mobile-first (most users are on phones): 16px gutters, no horizontal scroll, tap targets at least 44px.
- Theme: see section 11.5. DESIGN.md is a light-only reference, so v1 ships light only (no dark mode, no theme toggle).
- Accessible: semantic HTML, labels on inputs, visible focus states, color contrast AA, buttons are `<button>`.
- Performance: no heavy images, total JS under 100 KB excluding Fuse.js.
- Visual style: follow `design/DESIGN.md` as adapted in section 11.5 (that section overrides any other styling guidance here).

## 7. Deployment

- `pages.yml`: GitHub Actions deploying the `site/` folder to GitHub Pages. Make sure `fetch('../data/skills.json')` resolves after deploy (copy `data/` into the published artifact, or place the JSON under `site/data/` via the workflow).
- `validate.yml`: run `node scripts/validate.mjs` on every PR.

## 8. Seeding more skills (workflow for the maintainer)

When adding a skill:
1. Open the source repo and read the skill's `SKILL.md` and LICENSE file.
2. Decide `license.status`. When in doubt use `proprietary_link_only`.
3. Write the Arabic fields in simple MSA, accurate to what the skill actually does. Do not exaggerate.
4. Add the entry, run `node scripts/validate.mjs`, open a PR.

Candidate sources for the next batch: any public repo whose skills follow the Agent Skills layout (a folder with a `SKILL.md` that has `name` and `description` frontmatter), from any vendor or community, for example `anthropics/skills` and well-starred community repos. Always check the license first. Prefer skills useful to Arabic users: documents, spreadsheets, writing, CV and cover letters, study tools, data analysis, coding basics, design.

## 9. Acceptance criteria

- [ ] `node scripts/validate.mjs` passes on the sample data and fails on each rule in section 4 (add tests with intentionally broken fixtures).
- [ ] Searching "ورد" finds `docx`; searching "اكسل" and "إكسل" both find `xlsx`; searching "pdf" finds `pdf`.
- [ ] Copying the prompt for any skill yields English text with the real source URL substituted (no leftover `{{...}}`).
- [ ] For `proprietary_link_only` skills, there is no file-copy button and no stored file anywhere in the repo.
- [ ] Layout is correct in RTL at 360px and 1280px widths (light theme only). See section 11.6 for the visual checklist.
- [ ] Lighthouse accessibility score of 90 or higher.
- [ ] No page, string or asset presents the site as Claude-only; the how-to page shows the copy-and-paste method first, and tool-specific sections appear only for `verified: true` entries in `data/tools.json`.
- [ ] README (Arabic first) explains the project, how to contribute, and the license rules.

## 10. Out of scope for v1

User accounts, comments, ratings, server-side search, auto-translation of full SKILL.md files, scraping hundreds of repos. Do not build these.

---

## 11. Addendum v1.1 (this section overrides earlier text wherever they conflict)

### 11.1 What this update does

1. Restyle the existing site to follow `design/DESIGN.md` (provided separately), adapted for Arabic RTL (11.5).
2. Replace the sample data with the provided `data/skills.json` (schema_version 2, 26 entries) and `data/tools.json` (9 entries). Do not edit the content of these files; fix the code, not the data, when the validator complains. If a data problem is real, log it in `data/TODO.md`.
3. Add the "Add it to your tool" panel and the "Open source" button (11.4).
4. Stay tool-agnostic (section 2, rule 6 still applies).

### 11.2 Explanation-only mode (v1)

- Every skill is shown as an Arabic explanation plus a link to the original repository. **No skill files are stored or hosted by this project.** `copy_file_allowed` is `false` for every entry, so the "copy file content" button never renders in v1. Keep that code path for the future but do not expose it.
- `license.status` values still matter for badges: `proprietary_link_only` shows the bare text "رخصة خاصة"; `verify_before_publish` shows the bare text "تحقق من الرخصة" in Launch Orange; `open` shows nothing.
- Entries with `content_verified: false` show this note at the bottom of the detail page: "أُعد هذا الشرح من معلومات عامة عن المهارة، ويُنصح بمراجعة المصدر قبل الاعتماد عليه." The validator prints a warning list (not an error) of all such entries.

### 11.3 Data schema changes

`skills.json` (schema_version 2), new or changed fields per skill:
- `kind`: `skill` | `collection` | `directory`. A `collection` is a repo with many skills; a `directory` is an index of other people's skills.
- `featured` (boolean): shown in the highlights band on the home page.
- `source`: now `owner`, `repo`, `repo_url` (repo root, always safe), `path_in_repo` (string or `null`), `url` (deep link), `url_verified` (boolean).
- `content_verified` (boolean).
- Site strings moved into `site`: `hero_title_ar`, `hero_sub_ar`, `search_placeholder_ar`.

`tools.json`, extended fields per tool: `paths` (object with optional `user`, `project`, `admin`), `verified_on` (date), `requires_ar`, `steps_ar[]`, `invoke_ar`. `support` may now also be `native` (confirmed in official docs).

Placeholders allowed inside `steps_ar`: `{{repo_git_url}}` (= `source.repo_url` + `.git`) and `{{path_in_repo}}`. If a skill is a `collection` or `directory`, or `path_in_repo` is `null`, render `{{path_in_repo}}` as the literal text `<مسار-فولدر-المهارة>` and show the note "هذا الريبو يضم مهارات كثيرة. افتحه واختر الفولدر المناسب."

Validator additions (errors): `kind` not in the enum; `source.repo_url` missing or not `https://`; `url_verified: true` with a non-`https://` `url`; a tool with `verified: true` and empty `steps_ar`; any placeholder left unresolved after rendering; `copy_file_allowed: true` on any entry that has no `derived_from` (only the maintainer's own derived skills may have it, per section 4).

### 11.4 Detail-page additions

- **Source button.** A text link "افتح المصدر على GitHub" (Link Blue). Its target is `source.url` only when `url_verified` is `true`; otherwise `source.repo_url`. The "copy link only" button copies that same target. Never present an unverified deep link as the primary target.
- **"ضيفها لأداتك" panel**, inside a white 28px card on the Studio Mist band. A segmented control lists every tool in `tools.json` with `verified: true`; the default tab is `any-chat`. Each tab shows: `requires_ar`, the numbered `steps_ar` (placeholders substituted), `invoke_ar`, and a link "التوثيق الرسمي" to `docs_url`, plus the line "آخر مراجعة: <verified_on>". Wrap Latin text, commands and paths in `<bdi>` or `<code dir="ltr">` so they render correctly inside RTL text.
- Tools with `verified: false` are not shown as tabs.
- **How-to page tip, generated from data, not hardcoded.** Scan the `paths` strings of verified tools; if several tools list the same folder (for example `.agents/skills/`), render a tip "فولدر <folder> تقرؤه هذه الأدوات: <tool names>" with each tool name linking to its `docs_url`.

### 11.5 Visual design (from `design/DESIGN.md`)

Put the provided DESIGN.md at `design/DESIGN.md`. It is a style reference only.

**a) Brand safety.** The look is inspired by the reference. Do not use any Apple logo, name, product image, icon glyph or the SF Pro fonts (not licensed for web use). In code, rename tokens to neutral names: `--color-apple-blue` -> `--color-link-blue`, `--color-pricing-blue` -> `--color-action-blue`, `--font-sf-pro-display` -> `--font-display`, `--font-sf-pro-text` -> `--font-text`. The footer says this is an independent community project.

**b) Tokens.** Create `site/css/tokens.css` from the "CSS Custom Properties" block in DESIGN.md (renamed as above). All colors, radii, spacing and layout values come from tokens; no hardcoded hex values elsewhere.

**c) Typography for Arabic (deliberate deviations from DESIGN.md).**
- Fonts: `Inter` (Latin) and `Cairo` (Arabic) from Google Fonts with `display=swap`, weights 400, 500, 600, then system fallbacks.
- **`letter-spacing: 0` for all Arabic text.** Negative tracking breaks Arabic letter joining. Apply DESIGN.md's negative tracking only to Latin runs (`:lang(en)`, `[dir="ltr"]`, `code`).
- Line heights are larger than the reference: body 17px at 1.7, small text 14px at 1.6, headings at 1.25 minimum, hero at 1.2.
- Hero headline: `clamp(40px, 8vw, 80px)`, weight 600. Feature headings 40px (28px on mobile), card titles 24px/600.
- Minimum Arabic UI text size is 14px (not 12px). Pills and nav links use 14px.

**d) Theme.** Light only. Add `<meta name="color-scheme" content="light">`. No dark mode, no toggle, no gradients, no shadows.

**e) Component mapping.**
- Header (Global Store Navigation): sticky, 52px, white, 1px bottom edge `#e6e6e8`, text wordmark (no logo image), links: الرئيسية، طريقة الاستخدام. Unboxed links, 14px/400.
- Hero (Hero Product Stage): white, centered. Kicker 21px/600 with the site name, then the headline (`site.hero_title_ar`), then `site.hero_sub_ar` at 21px/400 in Slate. The **rounded search input** (980px radius, 1px `#86868b` outline, white fill, 24px inline padding) is the visual centerpiece, in the place of the product render. Placeholder from `site.search_placeholder_ar`.
- Category navigation (Section Anchor Navigation): horizontal scrollable text list, 17px/500, transparent, no underline and no boxes; active item Ink + weight 600, others Slate.
- Highlights band (Highlights Stage): full-width `#f5f5f7`, heading "الأشهر" with a Link Blue text link "عرض الكل" aligned opposite. A horizontal scroll-snap row of cards for `featured: true` skills. Hide this band while a search or filter is active.
- Skill card (Feature Media Card): white, 28px radius, 28px padding (20px on mobile), no border, no shadow. Contents: `title_ar` 24px/600; English `name` in small Slate `dir="ltr"`; `summary_ar` clamped to 3 lines; footer row with difficulty (مبتدئ / متوسط / متقدم) and the license label as bare text, never as a filled badge. Cards sit on `#f5f5f7` bands, or on white with a 1px `#d6d6d6` hairline.
- Buttons: primary = Pricing/Action Blue pill (`#0071e3`, white text, 9999px radius, 44px minimum height) for "انسخ البرومبت الجاهز". Secondary = Outlined Explore Pill (transparent, Ink text, 1px `#86868b` outline, 9999px radius) for "انسخ اللينك فقط". Links = Link Blue `#0066cc`, no fill.
- Launch Status Label: bare `#b64400` 14px/600 text, no pill or border; used for "تحقق من الرخصة" and "جديد".
- Detail page (Editorial Feature Block): white hero with kicker (category name), title 40-48px/600, summary at 21px, and the action row. Then sections as editorial blocks: a small Ink kicker, a large start-aligned statement, 17px body. "Start-aligned" means right-aligned in RTL.
- Floating capsule (Floating Pricing Callout), mobile only: a white 28px-radius capsule fixed near the bottom with a 1px `#d6d6d6` hairline and no shadow, containing the primary copy button.
- Footer: `#f5f5f7`, 12px-equivalent small text at 14px in Slate.
- Skip the carousel playback control; use plain scroll-snap.

**f) Spacing and elevation.** Section gap 90px on desktop and 56px on mobile; element gap 20px. Separation comes only from white vs `#f5f5f7`, 28px corners and 1px `#d6d6d6` hairlines. Focus indicator: 2px solid `#0066cc` outline with 2px offset (outlines are allowed; shadows are not).

**g) Carried-over Do and Don't.** No `#0071e3` as a large background; no radius other than 28px on cards; no hero weight 700; no boxed dense panels over imagery; no colored status pills. There is no product photography in v1: use no imagery except small monochrome inline SVG icons (1.5px stroke, Ink).

**h) Accessibility notes.** Use Slate (`#707070`) for secondary text, never Steel (`#86868b`) for text (Steel is for outlines only). Keep tap targets at 44px minimum. The Lighthouse accessibility score target of 90 or higher still applies.

### 11.6 Acceptance criteria for this update

- [ ] `data/skills.json` and `data/tools.json` are the provided files, unmodified, and the validator passes on them with only content-verification warnings.
- [ ] Home page, in order: header, hero with search, category navigation, highlights band with the 6 featured skills, all-skills grid, footer.
- [ ] No box-shadow and no gradient anywhere in the CSS (`grep` for `box-shadow` and `gradient` returns nothing).
- [ ] Arabic text has `letter-spacing: 0`; negative tracking appears only on Latin runs.
- [ ] No Apple logo, name, image or SF font anywhere in the repo (`grep -ri apple` finds only DESIGN.md and notes that explain the reference).
- [ ] Every skill's detail page shows the "افتح المصدر على GitHub" link pointing to `repo_url` (all entries have `url_verified: false`), and the "ضيفها لأداتك" panel with the 8 verified tabs (any-chat, claude-code, claude-ai, chatgpt, codex-cli, gemini-cli, github-copilot, cursor) and no Windsurf tab.
- [ ] For a `collection` skill (for example superpowers), the Gemini CLI tab shows `<مسار-فولدر-المهارة>` and the multi-skills note; for `pdf` it shows `skills/pdf`.
- [ ] No "copy file content" button appears for any skill.
- [ ] Screenshots of the home page and one detail page at 360px and 1280px are attached to the report as evidence.
- [ ] Lighthouse accessibility scores for the home and a detail page are reported as actual numbers.
