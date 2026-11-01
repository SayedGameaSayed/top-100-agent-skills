# Security Policy

## 🔒 Zero-Secret Policy
This repository strictly enforces a **Zero-Secret and Client-Side Privacy Policy**:
- **No API Keys:** The deployed web application is 100% static and requires zero API keys.
- **No Backend Database:** User searches and interactions are executed locally within the client's browser using client-side indexing.
- **No Tracking / Telemetry:** No user tracking or behavioral telemetry is collected.
- **Verification of External URLs:** All repository links and raw `SKILL.md` paths are programmatically validated via automated CI audits (`node scripts/check-skills-urls.mjs`) to ensure HTTP 200 OK responses.

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
All skills listed in this catalog are intended for ethical development and productivity. Skills related to security audits or penetration testing carry clear responsible-use warnings (`responsible_use_note_ar`) to ensure safe compliance.
