---
description: Implement a complete frontend feature end-to-end on the Hananee Café site (route → CSS module → component extraction → Navbar/Footer wiring → metadata), then route to the right reviewer rules based on what was actually touched. Use when the user says "implement feature X" or "build the Y section".
---

# Implement a Hananee Café frontend feature, then route to relevant reviewers

Goal: deliver a piece of work that matches the conventions in the existing five-page site exactly — and then invoke ONLY the reviewer rules that apply to what changed (never fan-out-to-all).

## Pre-flight reads

- `.claude/CLAUDE.md` at the repo root — the canonical project guide (stack, layout quirk, conventions).
- The nearest neighbour route under `app/app/` (Home / Menu / About / Gallery / Contact) — copy its shape exactly.
- `app/app/globals.css` — global helper classes (`.container`, `.section`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.f1-tag`, `.stars`).
- `app/app/components/ScrollReveal.js` — the only animation primitive. Variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`.
- `app/app/components/Navbar.js` and `app/app/components/Footer.js` — for nav-link list updates.
- `app/AGENTS.md` — Next.js 16 caveat: if you're unsure about a Next API, read `app/node_modules/next/dist/docs/` first.

## Steps

1. **Decompose the feature.**
   Map the brief to individual files and sections: which route, which components to extract, which images, which CTAs. Write the list out before coding so nothing gets dropped.

2. **Build the page (Server Component by default).**
   New top-level routes live at `app/app/<slug>/page.js` with `app/app/<slug>/page.module.css` alongside. Optional `app/app/<slug>/layout.js` for per-route `metadata`. The leaf page should be a Server Component when it does no client interaction. Add `"use client"` only on the smallest subtree that needs state, effects, refs, browser APIs, or wraps `<ScrollReveal>`.

3. **Match the global styling pattern.**
   Wrap sections in `.section`, content in `.container`, headings in `.section-title` / `.section-subtitle`, CTAs in `.btn` + colour modifier. Use F1 motifs (`.f1-tag` for racing chips, `.stars` for review-star rows) when appropriate. Component-scoped tweaks go in the colocated `<Name>.module.css`. Tailwind utilities are available but ONLY used inside `globals.css` — do NOT sprinkle them through JSX.

4. **Animate with `<ScrollReveal>`.**
   ```jsx
   import ScrollReveal from "@/app/components/ScrollReveal"

   <ScrollReveal animation="fadeUp" delay={100} duration={600}>
     <YourSection />
   </ScrollReveal>
   ```
   For staggered grids, pass `stagger` and `index`. Do NOT introduce framer-motion / GSAP / AOS — the site has one animation system and a second would fragment it.

5. **Images via `next/image`.**
   ```jsx
   import Image from "next/image"
   <Image src="/your-asset.jpg" alt="Descriptive alt text" width={800} height={600} />
   ```
   Drop assets into `app/public/`. For remote hosts, add to `images.remotePatterns` in `next.config.mjs` (create the file if missing). Always provide `alt`, plus `width`+`height` or `fill` with a sized parent — missing sizing causes layout shift.

6. **Wire the navigation.**
   Update `app/app/components/Navbar.js` (desktop list AND mobile menu) and `app/app/components/Footer.js` (footer link list) for new top-level routes. Keep ordering and styling consistent.

7. **Metadata for SEO.**
   Export `metadata` from the route's `layout.js` (`title`, `description`, ideally `openGraph`). Match the F1 brand voice — "Trackside grub", "Pit lane stories", etc.

8. **Consistency hot-spots.**
   - WhatsApp CTA is `https://wa.me/60109203889` — same string everywhere.
   - Address: Lot 8155 & 8156, Section 64, Jalan Simpang Tiga, Kuching.
   - Socials: Instagram `@hananeecafe`, Facebook page id `61581697183774`.
   - External links use `<a target="_blank" rel="noopener noreferrer">`.
   - Internal navigation uses `<Link>` from `next/link`.

9. **Don't fetch from an API.**
   There is no backend in scope. `@supabase/supabase-js` is in `package.json` but unused — don't start importing it without an explicit decision. Static data lives inline in the JSX or in a small data module under `app/app/<route>/`.

10. **Run checks.**
    ```bash
    cd app
    npm run lint
    ```
    There is no `tsc` and no test runner — lint is the only static gate.

11. **Smoke-test in the browser.**
    `npm run dev` from `app/`. Open <http://localhost:3000>. Click through the new content from the Navbar and Footer. Check 375px / 768px / 1280px+. Tap the WhatsApp CTA. Watch the DevTools console for errors.

12. **Web search.**
    Before guessing a Next.js 16 API, run a web search for: "Next.js 16 App Router latest", "next/image best practices 2025", "IntersectionObserver iOS Safari quirks". The model is pre-trained on older Next.js docs — verify against current docs.

## Selective review router — invoke the relevant reviewer rules

After lint + smoke pass, invoke ONLY the reviewer rules that apply to what changed. The reviewers live at `.cursor/rules/` and are invoked with `@<name>` in chat.

Pick from this table based on **what changed** — never fan out to all of them:

| If the change touched… | Invoke reviewers |
|---|---|
| Any new/changed page, section, or component | `@ui-ux-reviewer` |
| Hooks (`useEffect`, `useState`, `useCallback`, `useMemo`), event listeners, observers | `@bug-reviewer` |
| External scripts, `dangerouslySetInnerHTML`, third-party embeds | `@security-reviewer` |
| Diffs > 50 LOC OR new component extraction | `@no-ai-jargon-reuse-reviewer` |
| A spec / brief / design doc was provided | `@phase-reviewer` |
| Always (cheap, broad) | `@code-quality-reviewer` |
| Pre-merge / pre-PR — **after** reviewer findings are fixed | `@qa-agent` (manual QA checklist across the 5 pages + breakpoints) |

**Ordering: reviewers first, then qa-agent.** Reviewers (especially `@bug-reviewer` and `@ui-ux-reviewer`) may flag UX or behavioural changes; if `@qa-agent` writes the checklist against pre-fix code, you'll have to redo it. Run reviewers → resolve CRITICAL/MAJOR findings → then run `@qa-agent`.

### Final gate — `/senior-eng-review`

After targeted reviewers + qa-agent are done and findings resolved, **always run `/senior-eng-review` as the last step**. It's the safety net that catches what specialist reviewers missed and what the implementer didn't think to ask about — cross-cutting issues (missing alt text, missing cleanups, WhatsApp/address drift, monolithic `page.js`), intern-typical mistakes, missing verification. For interns and juniors this is non-optional; for seniors it's a peer review pass.

`/senior-eng-review` is persona-aware — pass `Invoker level: <intern|junior|senior>` (default `intern`) in the prompt so it calibrates its teaching tone.

### How to invoke reviewers

For each reviewer in the router list, invoke `@<name>` in chat with a short prompt that tells the rule what changed and which files to focus on. If the user wants persona-aware teaching tone, pass `Invoker level: <intern|junior|senior>`.

Concrete examples:

- "Added a new /events route with a hero and a list of past events." → invoke `@ui-ux-reviewer`, `@code-quality-reviewer`. Skip everything else unless a hook or external script was added.
- "Extracted the testimonials section out of home `page.js` into its own component." → invoke `@code-quality-reviewer`, `@no-ai-jargon-reuse-reviewer` (because diff is non-trivial), `@ui-ux-reviewer`.
- "Wired a new YouTube embed into the gallery page." → invoke `@security-reviewer` (third-party script), `@ui-ux-reviewer`, `@bug-reviewer` (if any new effect/cleanup was added).

Each reviewer returns a findings report. Collate all reports, deduplicate, and surface CRITICAL/HIGH issues to the user before declaring the feature done. If a reviewer flags blockers, fix them, then re-invoke only the affected reviewers.

## Don'ts

- Don't fetch data from an external API — there is no backend. If you genuinely need server data, use a Server Component (RSC).
- Don't import `@supabase/supabase-js` without an explicit decision — it's a dead dep today.
- Don't speculatively add `"use client"` — only on the smallest subtree that needs it.
- Don't introduce a second animation library (`framer-motion`, `gsap`, `aos`) — use `<ScrollReveal>`.
- Don't sprinkle Tailwind utility classes into JSX — Tailwind is only used inside `globals.css`.
- Don't fan out to every reviewer rule — pick 2–4 from the router table.
- Don't run commands from the repo root — the Next.js project is under `app/`.
- Don't break the F1 brand voice (🏎️ 🏁, "pit stop", "winning lap", racing stripe accents).
