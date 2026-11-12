# Security & Privacy Policy

## 🔐 Architecture & Data Flow Disclosure

This project separates its **offline-capable core catalog** from its **optional AI Skills Advisor**:

1. **Core Catalog, Search & Leaderboard (100% Local / Zero External Calls):**
   - Browsing skills, client-side bilingual search (`site/js/search.js`), theme/language toggles, and copying prompts execute entirely inside your browser without contacting any backend AI provider.
   - Deploying on GitHub Pages runs in this pure client-side mode (with local specialist fallback).

2. **Optional AI Skills Advisor (`POST /api/advisor`):**
   - When you submit a prompt or attach local code snippets in the **AI Skills Advisor**, your request text and selected file snippets are transmitted over HTTPS to our serverless router (`api/advisor.js`), which forwards the query to external inference providers (**OpenRouter**, **Groq**, or **Google Gemini**) to generate skill recommendations.
   - **Do not paste secrets, API keys, `.env` values, tokens, or proprietary credentials** into the prompt box. Client-side upload filtering automatically blocks common secret filenames (such as `.env*`, `.pem`, `.key`) and lockfiles.
   - Attached code files are stored strictly in your browser's `localStorage` (up to 3 files, 50 KB/file, 6,000 chars total) and are never persisted in any backend database.

3. **Zero Client-Side Secrets:**
   - All upstream inference credentials (`OPENROUTER_API_KEY`, `GROQ_API_KEY`, `GEMINI_API_KEY`) live strictly in server environment variables on Vercel and are never bundled into frontend JavaScript.
   - If you optionally configure your own API key in the advisor drawer, it remains in your browser's `localStorage` only.

## 🛡️ API Hardening & Rate-Limiting Limitations

- **Input Bounds:** Prompts submitted to `/api/advisor` are capped at **1,000 characters**, and optional file attachments are capped at **3 files / 2,200 chars each**. Invalid JSON payloads and oversized requests receive `HTTP 400`.
- **Restricted CORS:** Browser cross-origin POST access to `/api/advisor` is restricted to the official site origins (`https://top-100-agent-skills.vercel.app`, `https://sayedgameasayed.github.io`, and `localhost` for development) rather than `*`.
- **Sanitized Errors:** Internal provider failures are logged server-side and never leak stack traces or API error payloads to clients.
- **In-Memory Rate Limiter (Serverless Limitation):** `/api/advisor` enforces a sliding-window limiter (`25 requests / 10 minutes` per client IP via `lib/free-advisor-router.js`). Because Vercel Serverless Functions are stateless across cold starts and parallel instances, this counter resets whenever a serverless instance recycles or scales out. It acts as lightweight burst protection alongside tight payload/token budgets and upstream key caps, rather than a distributed store (e.g., Redis/Upstash).

## ✅ Verification of External URLs

All repository links and `SKILL.md` URLs are programmatically validated via automated CI audits (`node scripts/validate.mjs` and governance tests) before appearing as verified entries.

## 🛡️ Supported Versions

| Version | Supported |
| :--- | :--- |
| `main` branch (v1.2.x) | :white_check_mark: |
| Older releases | :x: |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, an insecure dependency, or an unverified external source:
1. Please do not open a public issue.
2. Submit a private vulnerability report via [GitHub Security Advisories](https://github.com/SayedGameaSayed/top-100-agent-skills/security/advisories/new) or contact the maintainer directly.
3. Vulnerabilities will be addressed and patched within 48 hours.

## ⚖️ Responsible Use of AI Skills
All skills listed in this catalog are intended for ethical engineering and productivity. Skills related to security audits carry explicit responsible-use notes (`responsible_use_note_ar`).
