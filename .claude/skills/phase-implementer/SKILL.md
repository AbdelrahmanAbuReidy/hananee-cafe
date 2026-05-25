---
name: phase-implementer
description: Implement a complete Hananee Café feature or brief end-to-end (new section on a page, new route, new component, copy/layout overhaul) using the project's existing conventions, then route to the right reviewer subagents based on what was actually touched. Use when the user says "implement feature X", "build the Y section", or "do this brief".
---

# Implement a Hananee Café feature, then route to relevant reviewers

Goal: deliver a feature or brief that uses the existing conventions exactly — CSS Modules, `<ScrollReveal>`, global classes, F1 brand voice — and then invoke ONLY the reviewer subagents that apply to what changed (never fan-out-to-all).

## Pre-flight reads

- [`.claude/CLAUDE.md`](../../CLAUDE.md) — the ground-truth project guide (stack, conventions, hot spots).
- [`app/AGENTS.md`](../../../app/AGENTS.md) — the Next.js 16 warning. Before using any Next.js API you're not sure about, read the matching file under `app/node_modules/next/dist/docs/`.
- The nearest neighbour page under [app/app/](../../../app/app/) — copy its shape exactly. The five reference pages are:
  - [`app/app/page.js`](../../../app/app/page.js) — home (client, sectioned)
  - [`app/app/menu/page.js`](../../../app/app/menu/page.js)
  - [`app/app/about/page.js`](../../../app/app/about/page.js)
  - [`app/app/gallery/page.js`](../../../app/app/gallery/page.js)
  - [`app/app/contact/page.js`](../../../app/app/contact/page.js)
- [`app/app/globals.css`](../../../app/app/globals.css) for global classes (`.container`, `.section`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.f1-tag`, `.stars`).
- [`app/app/components/ScrollReveal.js`](../../../app/app/components/ScrollReveal.js) for animation variants.
- [`app/app/components/Navbar.js`](../../../app/app/components/Navbar.js) and [`app/app/components/Footer.js`](../../../app/app/components/Footer.js) for any nav-touching change.

## Steps

1. **Decompose the brief.**
   Map the request to concrete pieces — which page, which section, which component, which copy block, which image. Write the list out before coding so nothing gets dropped. Tick each item once implemented.

2. **Pick server vs client.**
   - Default to a **Server Component** (no directive).
   - Add `'use client'` ONLY when the file uses `useState`, `useEffect`, refs, browser APIs, event handlers, or wraps content in `<ScrollReveal>` (it's a client component itself — pages that render it must also be client OR the `<ScrollReveal>` must be embedded inside a small client sub-tree).
   - Today the home `page.js` and the route pages that use `<ScrollReveal>` are client; `Footer.js` is server. Match that pattern.

3. **Styling: CSS Modules per component, global classes for layout primitives.**
   - Add or extend the route's `page.module.css` (e.g. `app/app/<segment>/page.module.css`) for everything visual that's local to the page.
   - Use the global classes from `globals.css` for shells: `<section className="section">`, `<div className="container">`, `<span className="f1-tag">`, `<h2 className="section-title">`, `<a className="btn btn-primary">`.
   - **Do NOT sprinkle Tailwind utility classes through JSX** — Tailwind is wired through PostCSS but the project only uses it inside `globals.css`. Components are CSS-Modules. If you reach for `className="flex gap-4"`, stop and put it in `page.module.css` instead.

4. **Animation: `<ScrollReveal>` only.**
   Import from `../components/ScrollReveal` (or `@/app/components/ScrollReveal`). Variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`. Props you can pass: `animation`, `delay`, `duration`, `stagger`, `index`, `threshold`, `once`. Never introduce framer-motion, GSAP, AOS, or a hand-rolled IntersectionObserver — the project has exactly one animation primitive.

5. **Images: `next/image` from `app/public/`.**
   Drop new files into [`app/public/`](../../../app/public/) and reference as `<Image src="/<filename>" …/>`. Always set `alt`. Use `fill` + a sized parent for cover-style images; otherwise pass explicit `width` / `height`. Add `priority` only for above-the-fold hero imagery. If you add a remote image host, edit `images.remotePatterns` in `app/next.config.mjs` (create the file if missing).

6. **Copy: stay in the F1 / racing voice.**
   "Pit stop", "winning lap", "pole position", "🏎️", "🏁" — match the tone of the neighbour pages. Do not sanitize into generic café marketing.

7. **WhatsApp + social consistency.**
   - WhatsApp: `https://wa.me/60109203889`. Always `target="_blank"` + `rel="noopener noreferrer"`.
   - Phone (`tel:`): `+60 10-920 3889` → `tel:+60109203889`.
   - Instagram: `https://www.instagram.com/hananeecafe/`.
   - Facebook: `https://www.facebook.com/p/Hananee-61581697183774/`.
   - Address: `Lot 8155 & 8156, Section 64, KTLD, Jalan Simpang Tiga, Kuching, Sarawak`.
   - If any of these change, update Navbar.js, Footer.js, page.js, and contact/page.js together.

8. **Top-level navigation.**
   For a new top-level page, edit BOTH:
   - The `navLinks` array in [`app/app/components/Navbar.js`](../../../app/app/components/Navbar.js) (add `{ href, label, icon }`).
   - The `<nav className={styles.footerNav}>` block in [`app/app/components/Footer.js`](../../../app/app/components/Footer.js) (add a `<Link>`).
   Use the [`add-route`](../add-route/SKILL.md) skill for this — it codifies the full checklist.

9. **Per-route metadata.**
   For a new route, add either a `page`-level `export const metadata = { title, description, openGraph }` (Server Component) or a sibling `layout.js` that exports it (when the page is `'use client'`). Look at [`app/app/about/layout.js`](../../../app/app/about/layout.js) and [`app/app/menu/layout.js`](../../../app/app/menu/layout.js) for the pattern.

10. **No backend, no fetch layer.**
    There is no API. WhatsApp is the only outbound action. Do NOT add `fetch` calls in `useEffect`, do NOT import `@supabase/supabase-js` (the dep is in `package.json` but unused — dead weight). If you genuinely need server data, use a Server Component (RSC) or an `app/<path>/route.js` handler — but for this site it's almost never necessary.

11. **Run the static gate.**
    ```bash
    cd app && npm run lint
    ```
    Quote any errors verbatim and fix them. There is **no** `tsc` (project is JavaScript) and **no** test runner.

12. **Manually verify in the browser.**
    ```bash
    cd app && npm run dev
    ```
    Open <http://localhost:3000>. Walk the affected page on desktop AND mobile width (DevTools 375px). Check:
    - Mobile hamburger menu opens and closes; all five links visible.
    - WhatsApp CTA opens `wa.me/60109203889` in a new tab.
    - Hero video (on home) autoplays muted.
    - `<ScrollReveal>` sections animate in on scroll (not pre-revealed).
    - No console errors / 404s in the network tab.
    Watch the DevTools console for client-side errors. If something can't be tested in the browser, say so explicitly rather than claiming it works.

13. **Web research when unsure.**
    Next.js 16 is post-training for the model. Before using a route handler, metadata field, or image config you're not sure about, read the matching file in `app/node_modules/next/dist/docs/` (per `app/AGENTS.md`) and/or run `WebSearch` for "Next.js 16 App Router <topic>". Verify the pattern is current before applying.

## Selective review router — spawn parallel subagents

After lint + browser walk-through pass, **spawn the relevant reviewer subagents in parallel** via the Agent tool. The reviewers live at [.claude/agents/](../../agents/) — they run in isolated context, do not bloat your main conversation, and run concurrently.

Pick from this table based on **what changed** — never fan out to all of them:

| If the change touched… | Spawn subagents |
|---|---|
| Any visual change — new section, new page, layout/copy/CSS tweak | `ui-ux-reviewer` |
| New client component with hooks (`useState`, `useEffect`, refs) | + `bug-reviewer` (Rules of Hooks, missing deps, missing cleanups) |
| New external `<script>`, third-party embed, or `dangerouslySetInnerHTML` | + `security-reviewer` |
| Big new `page.js` section (200+ LOC) or a `page.js` ballooning past ~500 LOC | + `code-structure-reviewer` |
| Touched `Navbar.js` / `Footer.js` / top-level nav | + `ui-ux-reviewer` (consistency) + `code-quality-reviewer` |
| Diffs > 50 LOC | + `no-ai-jargon-reuse-reviewer` (consolidate duplicates, kill AI jargon) |
| Comments added/modified | + `comment-quality-reviewer` |
| Implemented against a written brief / spec | + `phase-reviewer` (gap check against the brief) |
| Always (cheap, broad) | + `code-quality-reviewer` |
| Pre-merge / pre-PR — **after** reviewer findings are fixed | `qa-agent` (manual QA checklist + smoke + regression list) |

**Ordering: reviewers first, then qa-agent.** Don't spawn `qa-agent` in the same parallel fan-out as the reviewers. Reviewers (especially `bug-reviewer`, `ui-ux-reviewer`) may flag behavioural changes; if `qa-agent` writes the checklist against pre-fix code you'll have to redo it. Run reviewers → resolve CRITICAL/HIGH findings → then run `qa-agent`.

### Final gate — `senior-eng-review`

After targeted reviewers + qa-agent are done and findings resolved, **always run `senior-eng-review` as the last step** (or have the user invoke `/senior-eng-review`). It's the safety net that catches what specialist reviewers missed and what the implementer didn't think to ask about — cross-cutting issues, intern-typical mistakes, missing verification. For interns and juniors this is non-optional; for seniors it's a peer-review pass.

`senior-eng-review` is persona-aware — pass `Invoker level: <intern|junior|senior>` (default `intern`) in the prompt so it calibrates its teaching tone. It auto-spawns up to 3 specialists for any confirmed Blockers, so you don't need to chase them yourself.

### How to spawn — single message, multiple Agent calls

When you have 2+ reviewers to run, send ONE assistant message containing multiple Agent tool calls so they execute in parallel. The `subagent_type` field is the agent's `name` from its frontmatter. Provide a short, specific prompt that tells the subagent what changed and which files to focus on.

```
Agent({ subagent_type: "ui-ux-reviewer", description: "Review new featured-drinks grid", prompt: "Just added a Featured Drinks grid to app/app/page.js with corresponding styles in app/app/page.module.css. Check F1 voice consistency, spacing rhythm with neighbour sections, mobile breakpoints, image alt text, and that the global classes (.section, .container, .f1-tag) are used correctly." })
Agent({ subagent_type: "bug-reviewer", description: "Hooks correctness on home page", prompt: "Same change. The grid uses a `useState` for hovered card index. Verify Rules of Hooks, missing dep arrays, and cleanup. File: app/app/page.js." })
Agent({ subagent_type: "code-quality-reviewer", description: "Code-quality pass", prompt: "Same change. Check RSC boundary (this file is client), CSS-Module class naming, JS style, no Tailwind utilities in JSX." })
```

Concrete examples:

- "Added a new About chapter section." → spawn `ui-ux-reviewer`, `code-quality-reviewer`. Skip everything else.
- "Built a new /events page with a `<ScrollReveal>` grid and added it to nav." → spawn `ui-ux-reviewer`, `bug-reviewer` (hooks via `<ScrollReveal>` client subtree), `code-quality-reviewer`. Also use the [`add-route`](../add-route/SKILL.md) skill for the nav/metadata checklist.
- "Embedded a Google Maps iframe on the contact page." → spawn `security-reviewer` (third-party iframe + sandbox/referrer attributes), `ui-ux-reviewer`, `code-quality-reviewer`.
- "Refactored Navbar mobile menu animation." → spawn `bug-reviewer`, `ui-ux-reviewer`, `code-quality-reviewer`.

Each subagent returns a findings report. Collate all reports, deduplicate, and surface CRITICAL/HIGH issues to the user before declaring the feature done. If a subagent flags blockers, fix them, then re-spawn only the affected subagents.

## Don'ts

- Don't fetch data with `useEffect` against an API — there is no API. WhatsApp is the only outbound action.
- Don't import `@supabase/supabase-js` casually — it's dead weight in `package.json`. Adding usage means deciding Supabase is officially in scope; flag to the user before wiring it.
- Don't add Tailwind utility classes to JSX `className` in CSS-Modules components — pick the file's existing pattern and stay in it.
- Don't introduce framer-motion, GSAP, AOS, or any other animation library — use `<ScrollReveal>`.
- Don't add TypeScript files — JS-only by convention.
- Don't speculatively add `"use client"` — only when state/effects/refs/browser APIs are actually used.
- Don't hardcode the WhatsApp number / phone / address in new places without first checking the existing four locations (Navbar.js, Footer.js, page.js, contact/page.js).
- Don't break the F1 theming — racing flag emoji, "lap" / "pit stop" copy, racing stripes are part of the brand.
- Don't fan out to every reviewer subagent — pick 2–4 from the router table.
- Don't run reviewers sequentially when they're independent — spawn them in a single message with multiple Agent calls.
