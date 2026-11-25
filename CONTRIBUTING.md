# Contributing to Top 100 AI Agent Skills

Welcome to **Top 100 AI Agent Skills**. We welcome community contributions to keep this catalog accurate, license-compliant, and useful for developers and AI agents worldwide.

---

## Core Contribution Rules

1. **License Verification (Mandatory):**
   - `proprietary_link_only`: For proprietary or source-available skills (such as Anthropic's commercial document skills). **Never** copy or host their files inside this repository — link only to the official upstream repository.
   - `verify_before_publish`: Skills with permissive-looking licenses that require human verification of the upstream `LICENSE` file before publishing (`content_verified: true`).
   - `open`: Verified permissive open-source licenses (`MIT`, `Apache-2.0`, etc.).
2. **Keep Upstream `SKILL.md` Authoritative:** Do not translate upstream `SKILL.md` files in place; the upstream repository remains the single source of truth.
3. **English Prompts + Bilingual Metadata:** Ready-to-copy prompts are authored in clean English (`title_en`, `summary_en`, `benefits_en`, `use_cases_en`), alongside full Arabic translations (`title_ar`, `summary_ar`, etc.) for bilingual accessibility.
4. **Derived Works:** Allowed only for permissive licenses (`Apache-2.0`, `MIT`). Must include the original `LICENSE` in `skills-files/<id>/LICENSE`, document changes in `modification_notes_ar`, and credit the upstream repo in [`NOTICE.md`](NOTICE.md).
5. **Tool Neutrality:** The catalog is model- and IDE-agnostic. Only list official integration instructions for verified tools in `data/tools.json`.

---

## How to Submit a Skill

1. Inspect the upstream repository, its `SKILL.md`, and its `LICENSE`.
2. Add or update the skill entry in [`data/skills.json`](data/skills.json) matching the schema.
3. Run schema validation and the full test suite locally:
   ```bash
   node scripts/validate.mjs
   npm test
   ```
4. Verify all 5 test suites (`validate`, `search`, `server`, `governance`, `mcp`) pass with 0 errors, then open a Pull Request.
