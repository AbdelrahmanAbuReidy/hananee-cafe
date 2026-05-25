# Hananee Café — Claude Guide

Marketing / info site for **Hananee Café** — a Formula-1-inspired café in **Kuching, Sarawak, Malaysia** (Lot 8155 & 8156, Section 64, Jalan Simpang Tiga; near Swinburne University). The site is a small five-page informational website (Home, Menu, About, Gallery, Contact) with WhatsApp ordering — there is no online ordering UI, no auth, and no live backend.

> See [Hananee_Cafe.md](../Hananee_Cafe.md) at the repo root for the business profile (hours, reviews, contact, atmosphere).

## ⚠️ Repo layout quirk

The Next.js project does **not** live at the repo root — it lives in [`app/`](../app/). All commands run from `app/`, not from the repo root.

```
Hananee-Cafe/                 # repo root
├── .claude/                  # ← you are here
├── .cursor/
├── Hananee_Cafe.md           # business profile
├── CMCR_KL_New_Menu_-_Sept_2025.pdf
├── business-logo.jpg, design-cloning.webp
└── app/                      # ← actual Next.js project
    ├── package.json
    ├── next.config.mjs (if present)
    ├── jsconfig.json         # @/* alias resolves from app/
    ├── eslint.config.mjs
    ├── postcss.config.mjs
    ├── AGENTS.md             # Next.js 16 warning — read it first
    ├── CLAUDE.md             # imports @AGENTS.md
    ├── public/               # logo.jpg, hero video, drink/food PNGs
    └── app/                  # App Router
        ├── layout.js         # root layout — fonts, metadata
        ├── page.js           # home (hero, featured drinks, about preview, food, testimonials, CTA)
        ├── globals.css       # global classes: .container, .section, .section-title, .btn*, .f1-tag, .stars
        ├── page.module.css
        ├── about/page.js + page.module.css + layout.js
        ├── menu/page.js + page.module.css + layout.js
        ├── gallery/page.js + page.module.css
        ├── contact/page.js + page.module.css
        └── components/
            ├── Navbar.js + Navbar.module.css        # client component, scroll-aware, mobile menu
            ├── Footer.js + Footer.module.css        # server component, IG/FB/WhatsApp links
            └── ScrollReveal.js                       # client — IntersectionObserver wrapper, our only animation primitive
```

## Stack quick reference

| Layer | Tool | Notes |
|---|---|---|
| Framework | **Next.js 16.2.3** App Router | Post-training — read `app/node_modules/next/dist/docs/` before using any API you're unsure about. See [app/AGENTS.md](../app/AGENTS.md). |
| React | 19.2.4 | |
| Language | **JavaScript** | No TypeScript. `jsconfig.json` provides `@/*` → `./` alias (relative to `app/`). |
| Styling | **CSS Modules** per component + global CSS in `globals.css` | Tailwind v4 is wired through `@tailwindcss/postcss` but **only used inside `globals.css`** today. Components use `.module.css` files. |
| Animation | Custom [`<ScrollReveal>`](../app/app/components/ScrollReveal.js) | IntersectionObserver-based. **No framer-motion.** Animations: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`. |
| Icons | Inline emoji + inline SVG | No icon library. |
| Tests | None | No tests, no type-checker. Verify visually in the browser. |
| Backend | **None in use** | `@supabase/supabase-js` is in `package.json` but **not imported anywhere** — it's a dead dependency that should be removed unless intentionally reserved. There is no fetch / API layer. WhatsApp link (`https://wa.me/60109203889`) is the only outbound action. |
| i18n | **None** | English only. No multi-language, no multi-currency. Prices hardcoded in MYR (RM). |

## Available Claude skills + subagents (router)

Pick the **smallest** set that matches the task:

- **Skills** ([.claude/skills/](skills/)) — playbooks Claude follows in the **main conversation**, where you see every diff. Use for builders / scaffolders / commands.
- **Cursor skills** ([.cursor/](../.cursor/)) — slash commands (`/<name>`) + rules (`@<name>`) for the Cursor editor. Mirrors a subset of the Claude tools.
- **Subagents** ([.claude/agents/](agents/)) — specialists that run in **isolated context**, return a single findings report, and can be **invoked in parallel** via the Agent tool. Use for reviewers (read-heavy, single-shot, parallelizable).

> Files here originated from a larger Next.js playbook. Items that didn't apply to a five-page café marketing site (Material UI / Fluent UI / HeroUI references, shadcn primitives, framer-motion, no-backend-needed integrations, auth/PII/legal reviewers) were **removed**. What's left is general-purpose Next.js review + scaffolding, retuned for Hananee Café's conventions.

### Skills (run in main context — write / iterate code)

| When to use | Skill | Status |
|---|---|---|
| **FINAL GATE — every change, every developer** | [`senior-eng-review`](skills/senior-eng-review/) (wraps the subagent; persona-aware) | ✅ |
| User says "implement feature X" or "build the Y section" | [`phase-implementer`](skills/phase-implementer/) (orchestrator — spawns the right reviewers) | ✅ adaptable |
| 2–5 independent tasks at once (unrelated tweaks across non-overlapping files) | [`parallel-batch`](skills/parallel-batch/) | ✅ |
| Add a new route or page under `app/app/` | [`add-route`](skills/add-route/) | ✅ |
| Run lint before declaring work done (`npm run lint` from `app/`) | [`run-checks`](skills/run-checks/) | ✅ (lint-only — no TS, no tests) |
| UI/UX design intelligence (palettes, typography, stacks, a11y) | [`ui-ux-pro-max`](skills/ui-ux-pro-max/) | ✅ reference |

### Subagents (spawn in isolated context — read-only review reports)

Invoke via the Agent tool with `subagent_type: "<name>"`. Send 2+ in a single assistant message to run in parallel. **All specialists are persona-aware** — pass `Invoker level: <intern | junior | senior>` in the prompt and they tune their tone.

| When to use | Subagent | Model |
|---|---|---|
| **End-to-end senior-eng review (safety net). Auto-spawns up to 3 specialists for Blockers.** | [`senior-eng-review`](agents/senior-eng-review.md) | opus |
| "Review the UI" / "make this consistent" / pre-merge polish | [`ui-ux-reviewer`](agents/ui-ux-reviewer.md) | sonnet |
| "Is this secure?" — XSS, secrets, `dangerouslySetInnerHTML`, third-party scripts | [`security-reviewer`](agents/security-reviewer.md) | sonnet |
| "Find bugs" — Rules of Hooks, missing deps, missing cleanups, broken `Image` props | [`bug-reviewer`](agents/bug-reviewer.md) | sonnet |
| "Review code quality" — RSC boundaries, hooks discipline, CSS-Module patterns, JS style | [`code-quality-reviewer`](agents/code-quality-reviewer.md) | sonnet |
| "Review comment quality" — restated / outdated / oversized + missing WHY | [`comment-quality-reviewer`](agents/comment-quality-reviewer.md) | sonnet |
| "Is this getting too monolithic?" — fat sections, `page.js` overload, bundle weight | [`code-structure-reviewer`](agents/code-structure-reviewer.md) | sonnet |
| "Check for AI jargon" / "consolidate duplicates" | [`no-ai-jargon-reuse-reviewer`](agents/no-ai-jargon-reuse-reviewer.md) | sonnet |
| Manual QA checklist + smoke + regression list | [`qa-agent`](agents/qa-agent.md) | sonnet |
| "Review against the brief" (substitute any spec / doc) | [`phase-reviewer`](agents/phase-reviewer.md) | sonnet |

The `phase-implementer` skill ends with a router table that picks 2–4 reviewer subagents based on what was actually touched — follow it instead of spawning every reviewer.

## Conventions (Hananee Café-specific)

- **Working directory.** All `npm` / `next` commands run from [`app/`](../app/). `npm run dev | build | start | lint`.
- **Server vs client components.** Default to Server Components. Add `"use client"` only when you need state, effects, refs, browser APIs, or the `<ScrollReveal>` wrapper (which itself is a client component). `Navbar.js` and the home `page.js` are client; `Footer.js` is server.
- **Styling.** Per-component CSS Modules (`<Component>.module.css`). Global utilities live in [`app/app/globals.css`](../app/app/globals.css): `.container`, `.section`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.f1-tag`, `.stars`. **Tailwind utilities are configured but only used inside `globals.css`** — do not sprinkle Tailwind classes through JSX unless the rest of the file already does.
- **Animation.** Use `<ScrollReveal>` from [`app/app/components/ScrollReveal.js`](../app/app/components/ScrollReveal.js). Pass `animation="fadeUp"` (or any of the named variants), optional `delay`, `duration`, `stagger`+`index`. Don't introduce a second animation system (no framer-motion, no GSAP, no AOS).
- **Images.** Use `next/image` (`<Image>`). All current assets are local under [`app/public/`](../app/public/) (logos, drink/food PNGs, hero `.mp4`). If you add a remote host, add it to `images.remotePatterns` in `next.config.mjs` (create the file if it doesn't exist).
- **Aliases.** Use `@/*` for paths inside `app/` (resolves via [`app/jsconfig.json`](../app/jsconfig.json)).
- **F1 / brand voice.** The site leans hard into racing language ("pit stop", "winning lap", "🏎️", "🏁", "start your engines"). Match the tone in new copy; don't sanitize it into generic café marketing.
- **WhatsApp CTA.** Phone number is `+60 10-920 3889` → `https://wa.me/60109203889`. Keep this consistent across Navbar, Footer, Hero CTAs, and Contact page.
- **Social.** Instagram `@hananeecafe`, Facebook page id `61581697183774`. Update both if either link changes.
- **SEO.** `metadata` is exported from each route's `layout.js` (or the root one for the home page). When adding pages, set per-route `title` + `description` + `openGraph`.
- **Next.js 16 caveat.** Next 16 is post-training for the model. Before using an API you're not sure about, read `app/node_modules/next/dist/docs/` (this is what `app/AGENTS.md` instructs).

## Commands (run from `app/`)

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start (prod)
npm run lint     # eslint (the only static gate — no tsc, no tests)
```

## Things to avoid

- Don't move the Next.js project up to the repo root unless you also update every relative path in `.claude/` and `.cursor/`.
- Don't add Tailwind utilities to JSX `className` in components that are pure CSS-Modules — pick the file's existing pattern and stay in it.
- Don't introduce `framer-motion`, `gsap`, `aos`, or any other animation library — the home page uses `<ScrollReveal>` consistently and a second system fragments the codebase.
- Don't add TypeScript files — JS-only by convention; introducing TS means converting the whole project.
- Don't fetch data in `useEffect` against an API — there is no API. If you genuinely need server data, use a Server Component (RSC) or an `app/<path>/route.js` handler.
- Don't import `@supabase/supabase-js` and start using it without first deciding whether Supabase is officially in scope — the dep is currently dead weight and should either be removed or wired up deliberately.
- Don't hardcode the WhatsApp number / phone / address in multiple places — they're already in `Navbar.js`, `Footer.js`, `page.js`, and `contact/page.js`. If they change, search-and-update consistently.
- Don't break the F1 theming — racing flag emoji, "lap" / "pit stop" copy, and the racing stripe accents are part of the brand.
- Don't commit `.mcp.json` or `.claude/settings.local.json` — both should remain gitignored. The `.mcp.json` in `~/.claude.json` carries a GitHub PAT and the Stitch key.

## MCP servers

Configured at the user scope in `~/.claude.json` (not in this repo):

- **`github`** — official GitHub MCP via Docker (`ghcr.io/github/github-mcp-server`). Requires Docker Desktop running and a GitHub PAT.
- **`stitch`** — Google's Stitch HTTP MCP for design-to-code workflows.

Both are user-scope (available in every project) and not committed here.

## Where to look first

- Adding a section to the home page → drop a new `<section>` inside `app/app/page.js`, wrap content in `<ScrollReveal animation="…">`, add styles to `app/app/page.module.css`.
- Adding a new top-level page → use the `add-route` skill (creates `app/app/<slug>/page.js` + `page.module.css`, adds the link in `Navbar.js` and `Footer.js`).
- Adding a new image → drop the file in `app/public/`, reference it via `<Image src="/<filename>" …/>`.
- Tweaking entry animations → consult `ScrollReveal.js` for the available variants; don't add new ones unless multiple sections need it.
- Final review → invoke the `senior-eng-review` subagent (Claude Code) or run `/senior-eng-review` (Cursor) before declaring any change done.
