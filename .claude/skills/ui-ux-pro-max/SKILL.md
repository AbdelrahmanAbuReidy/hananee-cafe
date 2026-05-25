---
name: ui-ux-pro-max
description: "UI/UX design intelligence reference. 67 styles, 96 palettes, 57 font pairings, 25 charts, 13 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, Jetpack Compose, Astro, Nuxt). Use for design rationale, palette/typography options, accessibility rules, animation timing, and stack-specific implementation tips. For Hananee Café specifically, treat the brand voice (F1 / racing), CSS-Modules-per-component styling, and the existing ScrollReveal animation primitive as fixed — use this skill to inform NEW decisions (e.g. adding a section in a particular style, picking accessible color contrast, choosing a chart for a future metric), not to overhaul what already exists. Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance. Topics: color palette, accessibility, animation timing, layout, typography, font pairing, spacing, hover, shadow, gradient."
---

# UI/UX Pro Max — Design Intelligence

Comprehensive design reference for web and mobile applications. Contains 67 styles, 96 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks. Searchable database with priority-based recommendations.

## Hananee Café context — what's fixed, what's still in play

Before reaching for new styles or palettes, know the constraints of this project so the search is useful:

| Constraint | Value | Source |
|---|---|---|
| Stack | Next.js 16 App Router, JavaScript (no TS), React 19 | `app/package.json` |
| Styling | **CSS Modules per component** + global classes in `app/app/globals.css`. Tailwind v4 is wired via PostCSS but used only inside `globals.css`. | `.claude/CLAUDE.md` |
| Animation | One primitive: `<ScrollReveal>` (IntersectionObserver). Variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`. No framer-motion / GSAP / AOS. | `app/app/components/ScrollReveal.js` |
| Icons | Inline emoji + inline SVG. No icon library. | existing components |
| Brand voice | F1 / racing — "pit stop", "winning lap", 🏎️, 🏁, racing stripes. | About / Home / Footer copy |
| Palette | Dark, racing-themed (deep blacks, racing reds/accents, off-white text). Locked into existing CSS-Modules + `globals.css`. | `app/app/globals.css` |

So when you use this skill: it's for **informing decisions** (typography options when adding a new heading family, animation timing guidance when tuning `<ScrollReveal>` durations, accessibility checks when adding a new color/contrast, chart type if a future page needs one). It is NOT for swapping in a different stack, design system, or animation library — those decisions are already made.

If the skill recommends e.g. shadcn or a 12-column grid system, treat that as "stack option from the DB", not "switch this project to it". Stay in CSS Modules + `<ScrollReveal>` + emoji/SVG icons.

## When to Apply

Reach for this skill when:
- Designing a new section / page that needs a fresh visual direction (within the racing-themed palette).
- Choosing a complementary font pairing for a new heading or display element.
- Reviewing code for accessibility issues (contrast, focus rings, tap targets, motion preferences).
- Picking a chart type for a future stats / metrics block.
- Sanity-checking timing / spacing / responsive breakpoints.

Skip it for:
- Picking a third-party UI library — the project is hand-rolled CSS Modules and won't be swapped.
- "Make this Tailwind" / "Make this shadcn" rewrites — out of scope.
- Tuning the existing animation system — `<ScrollReveal>` is the system; consult its source for variants.

## Rule Categories by Priority

| Priority | Category | Impact | Domain |
|----------|----------|--------|--------|
| 1 | Accessibility | CRITICAL | `ux` |
| 2 | Touch & Interaction | CRITICAL | `ux` |
| 3 | Performance | HIGH | `ux` |
| 4 | Layout & Responsive | HIGH | `ux` |
| 5 | Typography & Color | MEDIUM | `typography`, `color` |
| 6 | Animation | MEDIUM | `ux` |
| 7 | Style Selection | MEDIUM | `style`, `product` |
| 8 | Charts & Data | LOW | `chart` |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `color-contrast` — Minimum 4.5:1 ratio for normal text. Check Hananee's dark sections against the off-white text.
- `focus-states` — Visible focus rings on interactive elements. CSS-Module classes should include `:focus-visible` outlines.
- `alt-text` — Descriptive alt text for meaningful images. Every `<Image>` under `app/public/` should set `alt`.
- `aria-labels` — `aria-label` for icon-only buttons (e.g. social icons in `Footer.js`, hamburger button in `Navbar.js`).
- `keyboard-nav` — Tab order matches visual order. Especially in the mobile menu.
- `form-labels` — Use `<label htmlFor>` for any future contact form.

### 2. Touch & Interaction (CRITICAL)

- `touch-target-size` — Minimum 44x44px touch targets. Hamburger and CTA buttons must clear this.
- `hover-vs-tap` — Don't gate primary actions behind hover (no mobile equivalent).
- `loading-buttons` — Disable buttons during async work. (Not currently relevant — no async UI.)
- `error-feedback` — Clear, near-field error messages. (Reserved for any future form.)
- `cursor-pointer` — `cursor: pointer` on clickable elements. CSS-Module rule.

### 3. Performance (HIGH)

- `image-optimization` — `next/image` handles WebP / srcset / lazy. Hero image gets `priority`; others don't.
- `reduced-motion` — Respect `prefers-reduced-motion: reduce`. `<ScrollReveal>` should ideally short-circuit to the visible state under that media query.
- `content-jumping` — Reserve space for async content (CLS). Set width/height on images.

### 4. Layout & Responsive (HIGH)

- `viewport-meta` — Already set by Next.js root layout.
- `readable-font-size` — Minimum 16px body text on mobile.
- `horizontal-scroll` — No `overflow-x: scroll` accidents. Test at 375px.
- `z-index-management` — Define a scale. Navbar / mobile overlay / mobile menu already have a working stack — match the existing values in `Navbar.module.css` rather than inventing new ones.

### 5. Typography & Color (MEDIUM)

- `line-height` — 1.5–1.75 for body text.
- `line-length` — 65–75 characters per line for prose.
- `font-pairing` — Match heading and body font personalities. Hananee's current pairing is set in the root `layout.js` — pull additional fonts via `next/font/google` if needed.

### 6. Animation (MEDIUM)

- `duration-timing` — 150–300ms for micro-interactions; `<ScrollReveal>` defaults to 800ms for entry reveals, which is fine.
- `transform-performance` — Animate `transform` and `opacity`, not `width/height/top/left`. `<ScrollReveal>` already does this.
- `loading-states` — Skeleton or spinner if you ever add fetch-driven content.

### 7. Style Selection (MEDIUM)

- `style-match` — F1 / racing aesthetic is the locked style for Hananee. New sections should fit, not introduce a second visual language.
- `consistency` — Use the same hero pattern (`<span class="f1-tag">` → `<h1>` → intro) across pages.
- `no-emoji-icons` — General UI rule, but Hananee **intentionally** uses emoji and racing flags as part of the brand voice. Override this rule only for Hananee; it's a deliberate brand choice. Keep them for racing-themed accents; use inline SVG for functional icons (social links, hamburger, chevrons) — see `Footer.js`.

### 8. Charts & Data (LOW)

- `chart-type` — Match chart type to data type.
- `color-guidance` — Use accessible palettes.
- `data-table` — Provide a table fallback for charts.

(No charts are used in the site today. This category only matters if a future page adds one.)

## How to use the search CLI

The skill ships with a Python CLI (`scripts/search.py`) and CSV data files. It surfaces design-system recommendations and per-domain searches.

### Prerequisites

```powershell
python --version    # or: python3 --version
```

If Python is not installed:

**Windows:**
```powershell
winget install Python.Python.3.12
```

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

### Workflow

#### Step 1: Analyze the requirement

Extract key information:
- **Product type** — Hananee is a *café marketing site*. For new sections, narrow further (e.g. "events block", "gallery", "stats banner").
- **Style keywords** — for Hananee, "F1 / racing", "dark, premium", "checkered", "speed".
- **Stack** — for the search CLI, pass `--stack nextjs` (or `react`). Treat the recommendations as **inspiration**, not "convert to this library" — the actual implementation goes in CSS Modules.

#### Step 2: Generate a design system (only for fresh sections)

```bash
python scripts/search.py "cafe racing dark premium" --design-system -p "Hananee Café"
```

This searches `product`, `style`, `color`, `landing`, and `typography` in parallel and returns a synthesized design system with anti-patterns. **For Hananee, override the palette/typography output with the existing values** (defined in `app/app/globals.css` and `app/app/layout.js`) — only adopt the recommendations that fit the locked brand.

#### Step 3: Domain searches

```bash
python scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Need | Domain | Example |
|---|---|---|
| Style ideas for a new section | `style` | `--domain style "dark glassmorphism"` |
| Future chart pick | `chart` | `--domain chart "single-metric counter"` |
| Accessibility / animation rules | `ux` | `--domain ux "reduced-motion animation"` |
| Alternative heading fonts | `typography` | `--domain typography "racing condensed display"` |
| Landing-page structure references | `landing` | `--domain landing "hero stats testimonials"` |
| React/Next.js performance | `react` | `--domain react "rerender memo"` |
| Web a11y guidelines | `web` | `--domain web "aria focus keyboard"` |

#### Step 4: Stack guidelines

```bash
python scripts/search.py "<keyword>" --stack nextjs
python scripts/search.py "<keyword>" --stack react
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`, `astro`, `nuxt-ui`, `nuxtjs`.

For Hananee, only `nextjs` and `react` are directly applicable. The `shadcn` stack is in the DB as a reference option for other projects — **don't** swap Hananee onto shadcn.

## Search Reference

### Available Domains

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare, beauty, service, café, landing |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern, racing |
| `color` | Color palettes by product type | service, hospitality, dark, premium |
| `landing` | Page structure, CTA strategies | hero, hero-centric, testimonial, stats, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel, pie |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading, reduced-motion |
| `react` | React/Next.js performance | waterfall, bundle, suspense, memo, rerender, cache |
| `web` | Web interface guidelines | aria, focus, keyboard, semantic, virtualize |
| `prompt` | AI prompts, CSS keywords | (style name) |

### Available Stacks

| Stack | Focus | Hananee fit |
|-------|-------|---|
| `html-tailwind` | Tailwind utilities, responsive, a11y | reference only — Hananee uses CSS Modules |
| `react` | State, hooks, performance, patterns | applies |
| `nextjs` | SSR, routing, images, metadata | applies |
| `vue` | Composition API, Pinia, Vue Router | not applicable |
| `svelte` | Runes, stores, SvelteKit | not applicable |
| `swiftui` | Views, State, Navigation, Animation | not applicable |
| `react-native` | Components, Navigation, Lists | not applicable |
| `flutter` | Widgets, State, Layout, Theming | not applicable |
| `shadcn` | shadcn/ui components, theming, forms | reference only — do not swap Hananee onto shadcn |
| `jetpack-compose` | Composables, Modifiers, State Hoisting | not applicable |
| `astro` | Islands, partial hydration | not applicable |
| `nuxt-ui` / `nuxtjs` | Vue stack | not applicable |

---

## Example: searching for a stats banner style

Hananee's `/about` page already has a stats banner with four counters. Suppose you're adding a similar block to `/contact`:

```bash
python scripts/search.py "stats counter banner racing" --design-system -p "Hananee Café"
python scripts/search.py "single-row stats" --domain landing
python scripts/search.py "reduced-motion counter" --domain ux
```

Treat the output as input to a CSS-Modules implementation — copy the existing `statsBanner` / `statsGrid` / `statItem` shape from `app/app/about/page.js` and `about/page.module.css` rather than rebuilding from a fresh DB-suggested skeleton.

---

## Output Formats

```bash
# ASCII box (default) — best for terminal display
python scripts/search.py "cafe racing" --design-system

# Markdown — best for documentation
python scripts/search.py "cafe racing" --design-system -f markdown
```

---

## Tips for Better Results

1. **Be specific** — "café racing dark stats banner" beats "site".
2. **Search multiple times** — Different keywords reveal different insights.
3. **Combine domains** — Style + Typography + Color = complete picture.
4. **Always check UX** — Search "accessibility", "z-index", "reduced-motion" before signing off a visual change.
5. **Don't blindly adopt** — Recommendations are options. Hananee's locked brand and CSS-Modules system come first.

---

## Common rules for professional UI (general — apply with Hananee overrides)

These are general best practices the DB enforces. Apply them with the Hananee-specific overrides noted.

### Icons & Visual Elements

| Rule | Do | Don't | Hananee override |
|------|----|----- |------|
| **Icon system** | Use SVG icons (Heroicons, Lucide, Simple Icons) for functional icons | Use emojis as functional UI icons | **Emoji is intentional brand voice** for racing flags and accents (🏎️, 🏁). Use SVG for functional icons (social, hamburger, chevrons). |
| **Stable hover states** | Use color/opacity transitions on hover | Use scale transforms that shift layout | — |
| **Correct brand logos** | Research official SVG from Simple Icons | Guess or use incorrect logo paths | — |
| **Consistent icon sizing** | Fixed viewBox (24x24) with w-6 h-6 | Mix different icon sizes randomly | — |

### Interaction & Cursor

| Rule | Do | Don't |
|------|----|----- |
| **Cursor pointer** | Add `cursor: pointer` to all clickable / hoverable cards | Leave default cursor on interactive elements |
| **Hover feedback** | Provide visual feedback (color, shadow, border) | No indication element is interactive |
| **Smooth transitions** | Use 150–300ms timing | Instant state changes or > 500ms |

### Contrast (Hananee is dark-themed)

| Rule | Do | Don't |
|------|----|----- |
| **Body text on dark** | Off-white at >= 4.5:1 against the section background | Mid-gray on dark (< 4.5:1) |
| **Accent color** | Racing red used sparingly for emphasis | Use red for body copy |
| **Border visibility** | Subtle but present (e.g. `1px solid rgba(255,255,255,0.08)`) | Pure-transparent borders |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|----- |
| **Floating navbar** | Hananee's navbar pins to top with scroll-aware styling — match that pattern | Replace with a fixed-top-zero bar that overlaps content |
| **Content padding** | Account for the navbar height in section padding | Let content slip behind the fixed nav |
| **Consistent max-width** | Use the `.container` global class | Mix bespoke max-widths per section |

---

## Pre-delivery checklist

Before delivering UI code, verify:

### Visual quality
- [ ] Functional icons are SVG (not emoji). Racing-accent emoji is fine — that's the brand.
- [ ] Hover states don't cause layout shift.
- [ ] Spacing rhythm matches neighbour sections.

### Interaction
- [ ] All clickable elements have `cursor: pointer`.
- [ ] Hover states provide clear visual feedback.
- [ ] Transitions are smooth (150–300ms for micro, ~800ms for `<ScrollReveal>` entry).
- [ ] Focus states visible for keyboard navigation.

### Contrast & a11y
- [ ] Body text >= 4.5:1 contrast against section background.
- [ ] All `<Image>` have `alt`.
- [ ] Icon-only buttons have `aria-label`.
- [ ] `prefers-reduced-motion` honoured.

### Layout
- [ ] No content hidden behind the navbar.
- [ ] Responsive at 375px, 768px, 1024px, 1440px.
- [ ] No horizontal scroll on mobile.
- [ ] Mobile hamburger menu opens / closes cleanly.

### Hananee brand
- [ ] F1 / racing voice consistent ("pit stop", "lap", "🏎️", "🏁").
- [ ] WhatsApp CTA still points to `https://wa.me/60109203889`.
- [ ] Used the `.container`, `.section`, `.section-title`, `.f1-tag` global classes where appropriate.
- [ ] Animations go through `<ScrollReveal>` only — no framer-motion / GSAP / AOS.
