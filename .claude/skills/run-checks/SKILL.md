---
name: run-checks
description: Run the static gate (ESLint) and walk the site in the browser before declaring a Hananee Café change done. Use after any code edit, especially when the user asks to verify or commit.
---

# Run Hananee Café checks

The project is JavaScript-only — there is **no** TypeScript compiler, **no** test runner, and **no** Docker setup. The only automated static gate is `npm run lint`. After lint passes, manual verification in a real browser is the rest of the gate.

All commands run from [`app/`](../../../app/), not from the repo root.

## Commands

```bash
cd app && npm run lint
```

If you added a dependency:

```bash
cd app && npm install
```

## After the lint gate passes

`npm run lint` only confirms the code passes ESLint — it doesn't confirm the feature works, the layout is right, or that nothing broke at runtime. Always do a browser walk-through:

```bash
cd app && npm run dev
```

Open <http://localhost:3000> and check each of the following:

### All five pages

Click through every route in the nav (desktop nav AND mobile hamburger):

- `/` — Home
- `/menu` — Our Menu
- `/about` — Our Story
- `/gallery` — Gallery
- `/contact` — Contact

For each page:
- No console errors in DevTools.
- No 404s in the Network tab (especially for images under `/public/` and the hero video).
- The active nav link highlights.
- The tab title matches the route's `metadata.title`.

### Mobile hamburger menu (DevTools 375px width)

- Hamburger button is visible.
- Tapping it opens the slide-in menu.
- All five (or six, if a new page was added) `navLinks` are visible.
- Tapping a link closes the menu and navigates.
- The overlay click also closes the menu.

### WhatsApp CTA

- The "Order Now" / "🏁 Order via WhatsApp" buttons in Navbar, Footer, hero, and Contact open `https://wa.me/60109203889` in a new tab (target=_blank, with rel=noopener noreferrer).

### Hero video

- On the home page, the hero `.mp4` autoplays muted and loops.
- No console error about autoplay being blocked (it must be muted to autoplay).

### `<ScrollReveal>` animations

- Sections animate in on scroll — they should start invisible / translated and ease into place. If they appear pre-revealed, the IntersectionObserver isn't engaging (often because the page isn't `'use client'` where it needs to be).

### Production smoke (optional but recommended for big changes)

```bash
cd app && npm run build
cd app && npm run start
```

Then walk the site at <http://localhost:3000> again. Build will catch issues that dev mode hides (image domain config, server/client boundary errors, metadata typos).

If something can't be tested in the browser (e.g. you don't have the dev server running), say so explicitly rather than claiming it works.

## Don'ts

- Don't try to run `tsc` — there is no TypeScript in the project.
- Don't try to run `npm test` / `npm run test` — there is no test runner configured.
- Don't try to `docker compose` anything — there is no Docker setup.
- Don't run `pnpm` — the project uses `npm` (see `app/package.json`).
- Don't run commands from the repo root — `cd app` first. The repo root has no `package.json`.
- Don't suppress ESLint errors with inline disables to make the gate pass — fix the issue. If a disable is genuinely warranted, add a one-line comment explaining why.
- Don't declare a feature done after lint alone — the browser walk-through is part of the gate.
