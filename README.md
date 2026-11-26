# 🏆 Top 100 AI Agent Skills

> **Curated open-source directory, daily GitHub star leaderboard, and local-first MCP server for verified `SKILL.md` agent skills — built in English and Arabic.**

<div align="center">

<p align="center">
  <a href="https://top-100-agent-skills.vercel.app/">
    <img src="site/assets/og-preview.png" alt="Top 100 AI Agent Skills Preview" width="100%" />
  </a>
</p>

[![Live Directory](https://img.shields.io/badge/Live%20Site-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://top-100-agent-skills.vercel.app/)
[![npm Package](https://img.shields.io/npm/v/top-100-agent-skills?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/top-100-agent-skills)
[![Daily Sync](https://img.shields.io/badge/Auto%20Discovery-Daily%20Sync-10b981?style=for-the-badge&logo=githubactions&logoColor=white)](.github/workflows/daily-rank-sync.yml)
[![Public JSON API](https://img.shields.io/badge/Public%20API-JSON%20Feed-6366f1?style=for-the-badge&logo=json&logoColor=white)](data/leaderboard.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-eab308?style=for-the-badge)](LICENSE)

[![XERJ Corpus Hub contributor](https://hub.xerj.org/contributors/SayedGameaSayed/badge.svg)](https://hub.xerj.org/contributors/SayedGameaSayed)

</div>

---

## ✨ Key Highlights

1. **100 Human-Vetted Agent Skills:** Every active entry links to a verified upstream `SKILL.md` instruction file checked for license compliance and URL availability. Unvetted repositories discovered by automation remain quarantined in [`data/candidates.json`](data/candidates.json).
2. **Autonomous Daily Leaderboard:** [GitHub Actions](.github/workflows/daily-rank-sync.yml) refreshes upstream repository star counts every 24 hours and publishes updated rankings to [`data/leaderboard.json`](data/leaderboard.json).
3. **Built-in MCP Server (`npx` Ready):** Connect any MCP-compatible IDE or agent directly to the catalog over stdio with zero API keys via `npx -y top-100-agent-skills`.
4. **Zero-Key AI Skills Advisor + Local Fallback:** Deployed on Vercel with specialist task routing (`/api/advisor`) and an instant client-side semantic fallback when offline or running on static mirrors.
5. **Bilingual by Design (English Default + Arabic RTL):** Full native English interface at [`top-100-agent-skills.vercel.app`](https://top-100-agent-skills.vercel.app/) with instant switch to Arabic RTL at [`?lang=ar`](https://top-100-agent-skills.vercel.app/?lang=ar).

---

## 🔌 MCP Server Quickstart (`npx top-100-agent-skills`)

Connect your coding agent (**Claude Code**, **Cursor**, **Claude Desktop**, **Windsurf**, or **Google Antigravity**) directly to the curated catalog over local `stdio` — zero API keys or network calls required:

```json
{
  "mcpServers": {
    "top-100-agent-skills": {
      "command": "npx",
      "args": ["-y", "top-100-agent-skills"]
    }
  }
}
```

### Available MCP Tools

| Tool | Description | External Calls |
|---|---|---|
| `search_skills` | Fuzzy & normalized English/Arabic search filtered by category or difficulty | None (local) |
| `get_skill` | Full metadata, license status, verified upstream URL, and ready-to-use prompt | None (local) |
| `get_leaderboard` | Ranked skills ordered by upstream GitHub repository stars | None (local) |
| `recommend_skills_for_task` | Local task & stack classifier returning best matching skills for code or AI projects | None (local) |

> 📦 **Data Snapshot Note:** The published npm package bundles a zero-latency local snapshot (`data/skills.json` and `data/leaderboard.json`) refreshed on each `npm publish`. Meanwhile, the live website and GitHub repository sync upstream stars daily via GitHub Actions.

---

## 🚀 Using Skills Across Tools & IDEs

| Tool / Environment | Quick Activation |
|---|---|
| **Claude Code** | Copy a skill URL and instruct Claude: `Read this skill: <url>`, or attach the MCP server above. |
| **Cursor IDE** | Add instructions to `.cursorrules` or `.cursor/rules/`, or connect via MCP. |
| **Google Antigravity** | Place `SKILL.md` under `~/.gemini/antigravity/builtin/skills/<name>/SKILL.md` or connect via MCP. |
| **GitHub Copilot** | Reference instructions inside `.github/copilot-instructions.md`. |
| **Roo Code / Cline** | Add the skill folder to `.roo/skills/` or configure it as custom instructions. |
| **ChatGPT / Gemini / Claude Web** | Click **Copy Prompt** on any skill card and paste directly into chat. |

---

## 🏛️ Hybrid Architecture, Security & Privacy

This repository cleanly separates **client-side catalog discovery** from the **optional AI Skills Advisor**:

- **Catalog Search & Leaderboard (100% Client-Side):** Filtering, Arabic/English search normalization ([`site/js/search.js`](site/js/search.js)), theme switching, and prompt copying run locally in your browser with zero external requests. GitHub Pages hosts this static mirror cleanly with an offline semantic fallback.
- **Optional AI Skills Advisor ([`api/advisor.js`](api/advisor.js)):** On the Vercel production deployment, submitted prompts and optional code snippets attached via the browser dropzone are sent over HTTPS to external inference providers (**Groq**, **Google Gemini**, and **OpenRouter**) to generate specialist skill recommendations.
- **Privacy & Abuse Hardening:**
  - Prompts sent to `/api/advisor` are strictly capped at **1,000 characters** (`HTTP 400` if exceeded).
  - Browser code attachments are stored in **`localStorage` only** (max 3 files, 50 KB/file, 6,000 chars total), never saved to any backend database, and common secret/lockfile patterns (`.env*`, `.pem`, `.key`, `package-lock.json`) are blocked client-side.
  - Cross-origin requests to `/api/advisor` are restricted via an explicit allowlist, upstream keys reside strictly in server environment variables, and internal errors are never leaked to clients.
  - Read the full threat model and serverless rate-limiter notes in [`SECURITY.md`](SECURITY.md).

---

## 📡 Public JSON Endpoints

Consume the verified leaderboard and catalog directly inside scripts, CI pipelines, or agent tools:

```bash
# Fetch live Top 100 skills ranked by GitHub stars
curl -s https://raw.githubusercontent.com/SayedGameaSayed/top-100-agent-skills/main/data/leaderboard.json

# Fetch full curated skills catalog (bilingual metadata & prompts)
curl -s https://raw.githubusercontent.com/SayedGameaSayed/top-100-agent-skills/main/data/skills.json
```

---

## 🏆 Top 100 AI Agent Skills Leaderboard

<!-- LEADERBOARD_START -->
> 🔄 **Last Automated Sync:** 2026-11-26 | **Metric:** Upstream Repository GitHub Stars | [Download JSON](data/leaderboard.json)
> ⚠️ **Note:** Star counts reflect the upstream GitHub repository as a whole rather than individual skill files.

| Rank | Repo Stars ★ | Skill | Category | Upstream Repository | Guide & Prompt | Status |
|:---:|:---:|---|---|---|:---:|:---:|
| **🥇 1** | `310.3k` | [**writing-plans**](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | Development & Web | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Step-by-Step Software Planning** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=obra-writing-plans) | ✅ Verified |
| **🥈 2** | `310.3k` | [**systematic-debugging**](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Systematic Debugging** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=systematic-debugging) | ✅ Verified |
| **🥉 3** | `310.3k` | [**test-driven-development**](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Test-Driven Development (TDD)** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=test-driven-development) | ✅ Verified |
| **#4** | `310.3k` | [**requesting-code-review**](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Requesting Code Review** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=requesting-code-review) | ✅ Verified |
| **#5** | `310.3k` | [**receiving-code-review**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Receiving & Applying Code Review** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=receiving-code-review) | ✅ Verified |
| **#6** | `310.3k` | [**using-git-worktrees**](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Git Worktrees Multi-Tasking** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=using-git-worktrees) | ✅ Verified |
| **#7** | `310.3k` | [**verification-before-completion**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Verification Before Completion** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=verification-before-completion) | ✅ Verified |
| **#8** | `310.3k` | [**subagent-driven-development**](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Subagent-Driven Development** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=subagent-driven-development) | ✅ Verified |
| **#9** | `310.3k` | [**executing-plans**](https://github.com/obra/superpowers/tree/main/skills/executing-plans) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Autonomous Plan Execution** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=executing-plans) | ✅ Verified |
| **#10** | `310.3k` | [**dispatching-parallel-agents**](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Dispatching Parallel Agents** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=dispatching-parallel-agents) | ✅ Verified |
| **#11** | `310.3k` | [**brainstorming-solutions**](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Architectural Solution Brainstorming** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=brainstorming-solutions) | ✅ Verified |
| **#12** | `310.3k` | [**finishing-a-development-branch**](https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Finishing Development Branches** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=finishing-development-branch) | ✅ Verified |
| **#13** | `310.3k` | [**using-superpowers**](https://github.com/obra/superpowers/tree/main/skills/using-superpowers) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Superpowers Agent Framework** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=using-superpowers) | ✅ Verified |
| **#14** | `310.3k` | [**diagnosing-superpowers**](https://github.com/obra/superpowers/tree/main/skills/diagnosing-superpowers) | Code Quality & Testing | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Superpowers Skill Diagnostics** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=diagnosing-superpowers) | ✅ Verified |
| **#15** | `310.3k` | [**writing-skills**](https://github.com/obra/superpowers/tree/main/skills/writing-skills) | Skill Creation & Meta | [`obra/superpowers`](https://github.com/obra/superpowers) | [**Agent Skill Authoring & Formatting** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=writing-skills) | ✅ Verified |
| **#16** | `309.1k` | [**diagnosing-bugs**](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) | Code Quality & Testing | [`skills`](https://github.com/mattpocock/skills) | [**Diagnosing Engineering Bugs** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=mp-diagnosing-bugs) | ✅ Verified |
| **#17** | `309.1k` | [**grill-with-docs**](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Documentation Stress-Testing** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=grill-with-docs) | ✅ Verified |
| **#18** | `309.1k` | [**triage**](https://github.com/mattpocock/skills/tree/main/skills/engineering/triage) | Code Quality & Testing | [`skills`](https://github.com/mattpocock/skills) | [**Issue Triage & Prioritization** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=triage) | ✅ Verified |
| **#19** | `309.1k` | [**improve-codebase-architecture**](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Codebase Architecture Refactoring** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=improve-codebase-architecture) | ✅ Verified |
| **#20** | `309.1k` | [**tdd**](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) | Code Quality & Testing | [`skills`](https://github.com/mattpocock/skills) | [**Matt Pocock TDD Methodology** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=mp-tdd) | ✅ Verified |
| **#21** | `309.1k` | [**to-tickets**](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Spec-to-Tickets Breakdown** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=to-tickets) | ✅ Verified |
| **#22** | `309.1k` | [**to-spec**](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**PRD to Technical Specification** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=to-spec) | ✅ Verified |
| **#23** | `309.1k` | [**grill-me**](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Interactive Architecture Griller** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=grill-me) | ✅ Verified |
| **#24** | `309.1k` | [**setup-pre-commit**](https://github.com/mattpocock/skills/tree/main/skills/misc/setup-pre-commit) | Code Quality & Testing | [`skills`](https://github.com/mattpocock/skills) | [**Pre-Commit Hooks & Lint Guardrails** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=setup-pre-commit) | ✅ Verified |
| **#25** | `309.1k` | [**git-guardrails-claude-code**](https://github.com/mattpocock/skills/tree/main/skills/misc/git-guardrails-claude-code) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Git Guardrails for Claude Code** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=git-guardrails-claude-code) | ✅ Verified |
| **#26** | `309.1k` | [**writing-for-agents**](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) | Writing & Communication | [`skills`](https://github.com/mattpocock/skills) | [**Writing Instructions for AI Agents** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=writing-for-agents) | ✅ Verified |
| **#27** | `309.1k` | [**codebase-design**](https://github.com/mattpocock/skills/tree/main/skills/engineering/codebase-design) | Development & Web | [`skills`](https://github.com/mattpocock/skills) | [**Modular Codebase Design Principles** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=codebase-design) | ✅ Verified |
| **#28** | `309.1k` | [**code-review**](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) | Code Quality & Testing | [`skills`](https://github.com/mattpocock/skills) | [**TypeScript Code Review Master** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=mp-code-review) | ✅ Verified |
| **#29** | `294.4k` | [**fastapi-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/fastapi-patterns) | Development & Web | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**FastAPI Production Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=fastapi-patterns) | ✅ Verified |
| **#30** | `294.4k` | [**prisma-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/prisma-patterns) | Development & Web | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Prisma ORM Database Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=prisma-patterns) | ✅ Verified |
| **#31** | `294.4k` | [**swiftui-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/swiftui-patterns) | Development & Web | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**SwiftUI Native iOS Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=swiftui-patterns) | ✅ Verified |
| **#32** | `294.4k` | [**rust-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/rust-patterns) | Development & Web | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Rust Idiomatic Systems Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=rust-patterns) | ✅ Verified |
| **#33** | `294.4k` | [**redis-patterns**](https://github.com/affaan-m/ECC/tree/main/skills/redis-patterns) | Development & Web | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Redis Caching & Pub/Sub Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=redis-patterns) | ✅ Verified |
| **#34** | `294.4k` | [**react-testing-library**](https://github.com/affaan-m/ECC/tree/main/skills/react-testing) | Code Quality & Testing | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**React Testing Library Suite** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=react-testing-library) | ✅ Verified |
| **#35** | `294.4k` | [**python-pytest-suite**](https://github.com/affaan-m/ECC/tree/main/skills/python-testing) | Code Quality & Testing | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Python Pytest Automation Suite** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=python-pytest-suite) | ✅ Verified |
| **#36** | `294.4k` | [**django-security**](https://github.com/affaan-m/ECC/tree/main/skills/django-security) | Cloud & Security | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Django Security Hardening** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=django-security) | ✅ Verified |
| **#37** | `294.4k` | [**springboot-security**](https://github.com/affaan-m/ECC/tree/main/skills/springboot-security) | Cloud & Security | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Spring Boot Security Architecture** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=springboot-security) | ✅ Verified |
| **#38** | `294.4k` | [**security-review-checklist**](https://github.com/affaan-m/ECC/tree/main/skills/security-review) | Cloud & Security | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Comprehensive Security Review** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=security-review-checklist) | ✅ Verified |
| **#39** | `294.4k` | [**pytorch-model-eval**](https://github.com/affaan-m/ECC/tree/main/skills/pytorch-patterns) | Data & AI | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**PyTorch Model Evaluation & Metrics** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=pytorch-model-eval) | ✅ Verified |
| **#40** | `294.4k` | [**marketing-campaign**](https://github.com/affaan-m/ECC/tree/main/skills/marketing-campaign) | Business & Finance | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Marketing Campaign Strategy** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=marketing-campaign) | ✅ Verified |
| **#41** | `294.4k` | [**i18n-sync-manager**](https://github.com/affaan-m/ECC/tree/main/skills/i18n-sync) | Writing & Communication | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**i18n Localization Sync Manager** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=i18n-sync-manager) | ✅ Verified |
| **#42** | `294.4k` | [**golang-testing-suite**](https://github.com/affaan-m/ECC/tree/main/skills/golang-testing) | Code Quality & Testing | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**Go Testing & Benchmarking Suite** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=golang-testing-suite) | ✅ Verified |
| **#43** | `294.4k` | [**eval-harness**](https://github.com/affaan-m/ECC/tree/main/skills/eval-harness) | Code Quality & Testing | [`affaan-m/ECC`](https://github.com/affaan-m/ECC) | [**AI Evaluation & Benchmarking Harness** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=eval-harness) | ✅ Verified |
| **#44** | `198.7k` | [**ponytail-audit**](https://github.com/DietrichGebert/ponytail/tree/main/.openclaw/skills/ponytail-audit) | Code Quality & Testing | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) | [**Full-Repo Engineering & Security Audit** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=ponytail-audit) | ✅ Verified |
| **#45** | `179.9k` | [**pdf**](https://github.com/anthropics/skills/tree/main/skills/pdf) | Documents & Files | [`anthropics/skills`](https://github.com/anthropics/skills) | [**PDF Document Master** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=pdf) | ✅ Verified |
| **#46** | `179.9k` | [**docx**](https://github.com/anthropics/skills/tree/main/skills/docx) | Documents & Files | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Word Document (DOCX) Handler** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=docx) | ✅ Verified |
| **#47** | `179.9k` | [**xlsx**](https://github.com/anthropics/skills/tree/main/skills/xlsx) | Documents & Files | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Excel Spreadsheet (XLSX) Pro** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=xlsx) | ✅ Verified |
| **#48** | `179.9k` | [**pptx**](https://github.com/anthropics/skills/tree/main/skills/pptx) | Documents & Files | [`anthropics/skills`](https://github.com/anthropics/skills) | [**PowerPoint Presentation (PPTX)** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=pptx) | ✅ Verified |
| **#49** | `179.9k` | [**frontend-design**](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Frontend UI/UX Design System** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=frontend-design) | ✅ Verified |
| **#50** | `179.9k` | [**skill-creator**](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | Skill Creation & Meta | [`anthropics/skills`](https://github.com/anthropics/skills) | [**AI Skill Creator & Architect** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=skill-creator) | ✅ Verified |
| **#51** | `179.9k` | [**webapp-testing**](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | Code Quality & Testing | [`anthropics/skills`](https://github.com/anthropics/skills) | [**End-to-End Web App Testing** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=webapp-testing) | ✅ Verified |
| **#52** | `179.9k` | [**mcp-builder**](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | Development & Web | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Model Context Protocol (MCP) Builder** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=mcp-builder) | ✅ Verified |
| **#53** | `179.9k` | [**canvas-design**](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**HTML5 Canvas Visuals & Generative Art** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=canvas-design) | ✅ Verified |
| **#54** | `179.9k` | [**web-artifacts-builder**](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | Development & Web | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Standalone Web Artifacts Builder** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=web-artifacts-builder) | ✅ Verified |
| **#55** | `179.9k` | [**brand-guidelines**](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Brand Guidelines & Identity System** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=brand-guidelines) | ✅ Verified |
| **#56** | `179.9k` | [**theme-factory**](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Design System Theme Factory** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=theme-factory) | ✅ Verified |
| **#57** | `179.9k` | [**doc-coauthoring**](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | Writing & Communication | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Collaborative Document Co-Authoring** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=doc-coauthoring) | ✅ Verified |
| **#58** | `179.9k` | [**algorithmic-art**](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Algorithmic Art & Generative Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=algorithmic-art) | ✅ Verified |
| **#59** | `179.9k` | [**internal-comms**](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | Writing & Communication | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Internal Communications & Updates** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=internal-comms) | ✅ Verified |
| **#60** | `179.9k` | [**slack-gif-creator**](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | Design & Creative | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Custom Slack GIF & Meme Creator** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=slack-gif-creator) | ✅ Verified |
| **#61** | `179.9k` | [**claude-api**](https://github.com/anthropics/skills/tree/main/skills/claude-api) | Development & Web | [`anthropics/skills`](https://github.com/anthropics/skills) | [**Claude API Integration Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=claude-api) | ✅ Verified |
| **#62** | `122.9k` | [**caveman**](https://github.com/JuliusBrussee/caveman/tree/main/plugins/caveman/skills/caveman) | Writing & Communication | [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) | [**Token-Saving Terse Coding Mode (Caveman)** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=caveman) | ✅ Verified |
| **#63** | `121.6k` | [**design-taste-frontend**](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill) | Design & Creative | [`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) | [**Anti-Slop Frontend Taste & Art Direction** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=taste-skill) | ✅ Verified |
| **#64** | `119.8k` | [**mem-search**](https://github.com/thedotmack/claude-mem/tree/main/claude-mem-cursor/skills/mem-search) | Skill Creation & Meta | [`thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) | [**Persistent Cross-Session Agent Memory Search** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=mem-search) | ✅ Verified |
| **#65** | `116.9k` | [**impeccable**](https://github.com/pbakaus/impeccable/tree/main/.claude/skills/impeccable) | Design & Creative | [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) | [**Production UI Craft, Critique & Polish** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=impeccable) | ✅ Verified |
| **#66** | `112.5k` | [**interview-me**](https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me) | Writing & Communication | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Requirements Discovery Interviewer** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=interview-me) | ✅ Verified |
| **#67** | `112.5k` | [**idea-refine**](https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine) | Writing & Communication | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Product Idea Refinement** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=idea-refine) | ✅ Verified |
| **#68** | `112.5k` | [**spec-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/spec-driven-development) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Spec-Driven Development** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=spec-driven-development) | ✅ Verified |
| **#69** | `112.5k` | [**planning-and-task-breakdown**](https://github.com/addyosmani/agent-skills/tree/main/skills/planning-and-task-breakdown) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Engineering Task Breakdown** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=planning-and-task-breakdown) | ✅ Verified |
| **#70** | `112.5k` | [**incremental-implementation**](https://github.com/addyosmani/agent-skills/tree/main/skills/incremental-implementation) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Incremental Code Implementation** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=incremental-implementation) | ✅ Verified |
| **#71** | `112.5k` | [**frontend-ui-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering) | Design & Creative | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Frontend UI Engineering Pro** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=frontend-ui-engineering) | ✅ Verified |
| **#72** | `112.5k` | [**api-and-interface-design**](https://github.com/addyosmani/agent-skills/tree/main/skills/api-and-interface-design) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**API & Interface Design** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=api-and-interface-design) | ✅ Verified |
| **#73** | `112.5k` | [**context-engineering**](https://github.com/addyosmani/agent-skills/tree/main/skills/context-engineering) | Skill Creation & Meta | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Agent Context Window Engineering** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=context-engineering) | ✅ Verified |
| **#74** | `112.5k` | [**browser-testing-with-devtools**](https://github.com/addyosmani/agent-skills/tree/main/skills/browser-testing-with-devtools) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Browser Testing with Chrome DevTools** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=browser-testing-devtools) | ✅ Verified |
| **#75** | `112.5k` | [**debugging-and-error-recovery**](https://github.com/addyosmani/agent-skills/tree/main/skills/debugging-and-error-recovery) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Debugging & Error Recovery Protocols** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=debugging-error-recovery) | ✅ Verified |
| **#76** | `112.5k` | [**doubt-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/doubt-driven-development) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Doubt-Driven Code Verification** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=doubt-driven-development) | ✅ Verified |
| **#77** | `112.5k` | [**source-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/source-driven-development) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Source-Driven Architecture** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=source-driven-development) | ✅ Verified |
| **#78** | `112.5k` | [**constraint-driven-development**](https://github.com/addyosmani/agent-skills/tree/main/skills/constraint-driven-development) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Constraint-Driven Development** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=constraint-driven-development) | ✅ Verified |
| **#79** | `112.5k` | [**code-review-and-quality**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-review-and-quality) | Code Quality & Testing | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Code Review & Architectural Quality** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=code-review-quality) | ✅ Verified |
| **#80** | `112.5k` | [**code-simplification**](https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Code Simplification & Pruning** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=code-simplification) | ✅ Verified |
| **#81** | `112.5k` | [**performance-optimization**](https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Full-Stack Performance Optimization** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=performance-optimization) | ✅ Verified |
| **#82** | `112.5k` | [**deprecation-and-migration**](https://github.com/addyosmani/agent-skills/tree/main/skills/deprecation-and-migration) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Deprecation & Version Migration** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=deprecation-migration) | ✅ Verified |
| **#83** | `112.5k` | [**git-workflow-and-versioning**](https://github.com/addyosmani/agent-skills/tree/main/skills/git-workflow-and-versioning) | Development & Web | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Git Workflow & Semantic Versioning** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=git-workflow-versioning) | ✅ Verified |
| **#84** | `112.5k` | [**shipping-and-launch**](https://github.com/addyosmani/agent-skills/tree/main/skills/shipping-and-launch) | Cloud & Security | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) | [**Shipping & Production Launch Protocol** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=shipping-and-launch) | ✅ Verified |
| **#85** | `94.5k` | [**understand-explain**](https://github.com/Egonex-AI/Understand-Anything/tree/main/understand-anything-plugin/skills/understand-explain) | Development & Web | [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) | [**Codebase Knowledge-Graph Deep Explainer** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=understand-explain) | ✅ Verified |
| **#86** | `75.1k` | [**last30days**](https://github.com/mvanhorn/last30days-skill/tree/main/skills/last30days) | Science & Education | [`mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) | [**Last 30 Days Community & Trend Research** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=last30days) | ✅ Verified |
| **#87** | `73.1k` | [**diagram-design**](https://github.com/cathrynlavery/diagram-design/tree/main/skills/diagram-design) | Design & Creative | [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) | [**Editorial Architecture & Engineering Diagrams** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=diagram-design) | ✅ Verified |
| **#88** | `54.8k` | [**deep-research**](https://github.com/Imbad0202/academic-research-skills/tree/main/deep-research) | Science & Education | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**Deep Literature & Fact Research** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=deep-research) | ✅ Verified |
| **#89** | `54.8k` | [**sr-screener**](https://github.com/Imbad0202/academic-research-skills/tree/main/sr-screener) | Science & Education | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**Systematic Review Paper Screener** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=sr-screener) | ✅ Verified |
| **#90** | `54.8k` | [**academic-paper-writer**](https://github.com/Imbad0202/academic-research-skills/tree/main/academic-paper) | Science & Education | [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) | [**Academic Paper & LaTeX Author** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=academic-paper-writer) | ✅ Verified |
| **#91** | `42.1k` | [**responsive-design**](https://github.com/wshobson/agents) | Design & Creative | [`wshobson/agents`](https://github.com/wshobson/agents) | [**Fluid Responsive Web Design** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=responsive-design) | ✅ Verified |
| **#92** | `33.3k` | [**composition-patterns**](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | Development & Web | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Component Composition Patterns** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=composition-patterns) | ✅ Verified |
| **#93** | `33.3k` | [**deploy-to-vercel**](https://github.com/vercel-labs/agent-skills/tree/main/skills/deploy-to-vercel) | Cloud & Security | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Deploy to Vercel Pro** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=deploy-to-vercel) | ✅ Verified |
| **#94** | `33.3k` | [**react-best-practices**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | Code Quality & Testing | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**React Modern Best Practices** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=react-best-practices) | ✅ Verified |
| **#95** | `33.3k` | [**react-native-skills**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-native-skills) | Development & Web | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**React Native Mobile Skills** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=react-native-skills) | ✅ Verified |
| **#96** | `33.3k` | [**react-view-transitions**](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions) | Design & Creative | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**React View Transitions & Motion** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=react-view-transitions) | ✅ Verified |
| **#97** | `33.3k` | [**vercel-cli-with-tokens**](https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-cli-with-tokens) | Cloud & Security | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Vercel CLI & CI/CD Automation** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=vercel-cli-with-tokens) | ✅ Verified |
| **#98** | `33.3k` | [**vercel-optimize**](https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-optimize) | Cloud & Security | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Vercel Performance & Edge Optimization** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=vercel-optimize) | ✅ Verified |
| **#99** | `33.3k` | [**web-design-guidelines**](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Design & Creative | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Web Design Guidelines & Aesthetics** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=web-design-guidelines) | ✅ Verified |
| **#100** | `33.3k` | [**writing-guidelines**](https://github.com/vercel-labs/agent-skills/tree/main/skills/writing-guidelines) | Writing & Communication | [`agent-skills`](https://github.com/vercel-labs/agent-skills) | [**Technical Writing & Documentation** ↗](https://top-100-agent-skills.vercel.app/skill.html?id=writing-guidelines) | ✅ Verified |
<!-- LEADERBOARD_END -->

---

## 💻 Local Development & Test Suite

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/SayedGameaSayed/top-100-agent-skills.git
   cd top-100-agent-skills
   npm install
   ```

2. **Validate schemas, licensing governance, security rules & MCP protocol:**
   ```bash
   node scripts/validate.mjs
   npm test
   ```

3. **Run the local Express server & static UI:**
   ```bash
   npm run dev
   # Open http://localhost:3000/
   ```

---

## 🌍 Bilingual Support (English & Arabic)

While this repository and web UI default to **English** for global developer accessibility, full **Arabic RTL** descriptions, normalized Arabic search, and localized prompts are first-class features across the web app ([`?lang=ar`](https://top-100-agent-skills.vercel.app/?lang=ar)) and the MCP server (`lang: "ar"`).

---

## 🤝 Contributing & Indexing

- 💡 [Suggest a New Skill](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=suggest_skill.yml)
- 🐛 [Report a Broken Link or Bug](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=bug_report.yml)
- ✍️ [Improve English / Arabic Localization](https://github.com/SayedGameaSayed/top-100-agent-skills/issues/new?template=improve_translation.yml)
- 📖 Review [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`SECURITY.md`](SECURITY.md) before opening a Pull Request.
- 🔍 Indexed as an open-source reference corpus on [XERJ Corpus Hub](https://hub.xerj.org/corpus/sayedgameasayed--top-100-agent-skills).

---

## 📜 License

Licensed under the **[MIT License](LICENSE)**. Third-party skill attributions and upstream license notices are documented in [`NOTICE.md`](NOTICE.md).
