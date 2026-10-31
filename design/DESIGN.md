# Design Reference System (DESIGN.md)

This document serves as an internal design specification reference. In code, all names are adapted to neutral naming per section 11.5 of `BUILD_SPEC.md`.

## CSS Custom Properties

```css
:root {
  /* Colors */
  --color-ink: #1d1d1f;
  --color-slate: #707070;
  --color-steel: #86868b;
  --color-hairline: #d6d6d6;
  --color-hairline-subtle: #e6e6e8;
  --color-studio-mist: #f5f5f7;
  --color-pure-white: #ffffff;
  --color-link-blue: #0066cc;
  --color-action-blue: #0071e3;
  --color-launch-orange: #b64400;

  /* Typography */
  --font-display: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-text: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-code: 'JetBrains Mono', Consolas, Monaco, monospace;

  /* Typography Scale */
  --text-hero: clamp(40px, 8vw, 80px);
  --text-headline: 40px;
  --text-headline-mobile: 28px;
  --text-card-title: 24px;
  --text-subhead: 21px;
  --text-body: 17px;
  --text-small: 14px;

  /* Line Heights */
  --leading-hero: 1.2;
  --leading-headline: 1.25;
  --leading-body: 1.7;
  --leading-small: 1.6;

  /* Radii */
  --radius-card: 28px;
  --radius-capsule: 28px;
  --radius-pill: 9999px;
  --radius-search: 980px;

  /* Spacing */
  --section-gap: 90px;
  --section-gap-mobile: 56px;
  --element-gap: 20px;
  --card-padding: 28px;
  --card-padding-mobile: 20px;
  --container-max: 1200px;
}
```

## Core Design Principles

1. **Light Only**: Pure white background `#ffffff` with Studio Mist `#f5f5f7` full-bleed bands. No dark mode, no gradients, no shadows.
2. **Elevation**: No box-shadows. Depth is achieved strictly through subtle 1px hairlines (`#d6d6d6` / `#e6e6e8`) and background alternation (`#ffffff` vs `#f5f5f7`).
3. **Arabic Typography**:
   - `letter-spacing: 0` for all Arabic text (strictly avoid negative letter-spacing which breaks Arabic glyph connectivity).
   - Negative tracking only on Latin runs (`[dir="ltr"]`, `:lang(en)`, `code`).
   - Minimum font size 14px for UI elements and pills.
   - Secondary text uses Slate (`#707070`) for WCAG AA compliance; Steel (`#86868b`) is reserved for outlines/borders only.
4. **Interactive States**:
   - Primary buttons: Pill radius, Action Blue `#0071e3`, white text.
   - Secondary buttons: Outlined pill, transparent with Steel outline `#86868b`.
   - Links: Link Blue `#0066cc`.
   - Focus outline: 2px solid `#0066cc` with 2px offset.
