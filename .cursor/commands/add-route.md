---
description: Add a new App Router page under `app/app/` for the Hananee Café marketing site. Wires up the route folder (page + module CSS + optional layout), updates the Navbar and Footer link lists, and sets metadata. Use when adding any new top-level page (e.g. /events, /press, /careers).
---

# Add a new App Router route (Hananee Café)

The Next.js project lives under `app/`, so a new route is created at `app/app/<slug>/`. The site has five top-level routes today: `/`, `/menu`, `/about`, `/gallery`, `/contact`. There are no route groups, no auth, no role gating — everything is publicly accessible.

## Steps

1. **Create the folder & files.**
   - `app/app/<slug>/page.js` — the route.
   - `app/app/<slug>/page.module.css` — component-scoped styles (mirror `app/app/about/page.module.css` for shape).
   - `app/app/<slug>/layout.js` — optional, but the easiest place to export per-route `metadata` (`title`, `description`, `openGraph`). Existing examples: `app/app/about/layout.js`, `app/app/menu/layout.js`.

2. **Server Component by default.**
   Omit `"use client"` unless the page needs state, effects, refs, browser APIs, or wraps `<ScrollReveal>`. If only one section needs interactivity, extract that section to a client component under `app/app/components/` and keep the page itself a Server Component.

3. **Match an existing page's shape.**
   Open the closest neighbour (e.g. `app/app/about/page.js`) and copy the layout: outer `<main>`, sections wrapped in the global `.section` class, content in `.container`, headings using `.section-title` / `.section-subtitle`, CTAs using `.btn .btn-primary` / `.btn-secondary` / `.btn-accent` from `globals.css`.

4. **Use `<ScrollReveal>` for entry animations.**
   Import from `@/app/components/ScrollReveal` and wrap each section's content. Variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`. Use `delay`, `duration`, `stagger`+`index` for sequenced reveals. Do NOT introduce framer-motion / GSAP / AOS.

5. **Add the link to the nav.**
   Update `app/app/components/Navbar.js` (desktop + mobile menu) and `app/app/components/Footer.js` (footer link list). Keep the order and styling consistent with the existing entries.

6. **Set per-route metadata.**
   In the new `layout.js`, export `metadata` with `title`, `description`, and ideally `openGraph`. Match the tone of the existing routes — F1 brand voice is fine ("Pit lane stories", "Trackside grub", etc.).

7. **Images.**
   Drop assets into `app/public/` and reference via `<Image src="/<filename>" alt="…" width=… height=… />` from `next/image`. Remote hosts must be added to `images.remotePatterns` in `next.config.mjs` (create the file if missing).

8. **Verify.**
   From `app/`: `npm run dev` and click through the new route at <http://localhost:3000/<slug>>. Confirm the Navbar / Footer links work, the page renders at 375px / 768px / 1280px+, and `<ScrollReveal>` triggers on scroll. Then `npm run lint` before declaring done.

## Don'ts

- Don't put the new folder anywhere other than `app/app/<slug>/` — the project lives under `app/`, not the repo root.
- Don't add a leaf-level `"use client"` just to use an emoji or icon — keep the page a Server Component when possible.
- Don't hardcode a path string for the WhatsApp CTA — reuse `https://wa.me/60109203889` exactly as the other pages do.
- Don't sprinkle Tailwind utility classes into JSX `className` props — this codebase uses CSS Modules + global helper classes; Tailwind is only used inside `globals.css`.
- Don't forget to add the link in BOTH the Navbar and Footer — orphan routes are a common regression.
