---
name: add-route
description: Add a new top-level App Router page to the Hananee Café site under app/app/<segment>/. Scaffolds page.js + page.module.css, adds the link to Navbar and Footer, wires per-route metadata, and wraps entry animations with ScrollReveal. Use when adding a new page (e.g. /events, /press, /careers) on top of the existing Home / Menu / About / Gallery / Contact.
---

# Add a new App Router page

The Next.js project lives in [`app/`](../../../app/) — not at the repo root. New routes go under `app/app/<segment>/`. There are **no route groups, no auth guards, no role gating** — this is a public marketing site. Mirror the existing five routes (`/`, `/menu`, `/about`, `/gallery`, `/contact`).

## Reference: the existing routes

| Route | Path | Pattern |
|---|---|---|
| Home | [`app/app/page.js`](../../../app/app/page.js) + `page.module.css` | client, sectioned, `<ScrollReveal>` heavy |
| Menu | [`app/app/menu/page.js`](../../../app/app/menu/page.js) + `page.module.css` + [`layout.js`](../../../app/app/menu/layout.js) | client + layout for metadata |
| About | [`app/app/about/page.js`](../../../app/app/about/page.js) + `page.module.css` + [`layout.js`](../../../app/app/about/layout.js) | client + layout for metadata |
| Gallery | [`app/app/gallery/page.js`](../../../app/app/gallery/page.js) + `page.module.css` | client, no layout |
| Contact | [`app/app/contact/page.js`](../../../app/app/contact/page.js) + `page.module.css` | client, no layout |

## Steps

1. **Create the folder + files.**
   ```
   app/app/<segment>/
   ├── page.js               # required
   ├── page.module.css       # required (per-component CSS Module)
   └── layout.js             # add ONLY if the page is 'use client' and needs metadata
   ```
   For `'use client'` pages you can't `export const metadata` from `page.js` — put it on `layout.js` instead. For Server Component pages you can export `metadata` straight from `page.js`.

2. **Server Component by default.**
   Omit `'use client'` unless you need state/effects/refs/browser APIs OR you render `<ScrollReveal>` (which is a client component). The existing route pages happen to all be client because they use `<ScrollReveal>` — that's fine. If your new page is mostly static content, you can keep it server and embed a small client subtree only where animations are needed.

3. **Page skeleton (client variant — most common).**
   ```jsx
   'use client';

   import styles from './page.module.css';
   import ScrollReveal from '../components/ScrollReveal';

   export default function MyPage() {
     return (
       <div className={styles.myPage}>
         <section className={`section ${styles.hero}`}>
           <div className="container">
             <ScrollReveal animation="fadeRight">
               <span className="f1-tag">Section Label</span>
             </ScrollReveal>
             <ScrollReveal animation="fadeLeft" delay={200}>
               <h1 className={styles.title}>Page Headline</h1>
             </ScrollReveal>
             <ScrollReveal animation="fadeUp" delay={400}>
               <p className={styles.intro}>Short F1-flavoured intro copy.</p>
             </ScrollReveal>
           </div>
         </section>

         {/* additional sections... */}
       </div>
     );
   }
   ```
   Look at [`app/app/about/page.js`](../../../app/app/about/page.js), [`app/app/menu/page.js`](../../../app/app/menu/page.js), or [`app/app/contact/page.js`](../../../app/app/contact/page.js) for the established hero + sections pattern.

4. **Per-route metadata.**
   - **Server Component page** — export from `page.js`:
     ```js
     export const metadata = {
       title: '<Title> — Hananee Café',
       description: '<60–160 char description with F1/cafe voice>',
       openGraph: { title: '<…>', description: '<…>', images: ['/<og-image>.png'] },
     };
     ```
   - **Client Component page** — create `layout.js` next to `page.js`:
     ```js
     export const metadata = {
       title: '<Title> — Hananee Café',
       description: '<…>',
     };

     export default function MyLayout({ children }) {
       return children;
     }
     ```
   Mirror [`app/app/about/layout.js`](../../../app/app/about/layout.js).

5. **Add the link to Navbar and Footer.**
   For any new top-level page both files must be updated:

   - **[`app/app/components/Navbar.js`](../../../app/app/components/Navbar.js)** — add an entry to the `navLinks` array near the top of the file:
     ```js
     const navLinks = [
       { href: '/', label: 'Home', icon: '🏠' },
       { href: '/menu', label: 'Our Menu', icon: '☕' },
       { href: '/about', label: 'Our Story', icon: '📖' },
       { href: '/gallery', label: 'Gallery', icon: '📸' },
       { href: '/contact', label: 'Contact', icon: '📍' },
       { href: '/<segment>', label: '<Label>', icon: '<emoji>' }, // ← new
     ];
     ```
     This single array drives both the desktop nav and the mobile menu — no other edits needed in Navbar.js.

   - **[`app/app/components/Footer.js`](../../../app/app/components/Footer.js)** — add a `<Link>` inside the `<nav className={styles.footerNav}>` block (the "Navigate" column):
     ```jsx
     <Link href="/<segment>"><Label></Link>
     ```

6. **Styles in `page.module.css`.**
   Use the global classes from [`app/app/globals.css`](../../../app/app/globals.css) for layout primitives (`.container`, `.section`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.f1-tag`, `.stars`). Put per-page styles in `page.module.css` and reference via `styles.<name>`. Do NOT sprinkle Tailwind utilities in JSX — the project's components are CSS-Modules.

7. **Animation: `<ScrollReveal>` only.**
   Import from `../components/ScrollReveal`. Available variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `rotateIn`, `flipUp`, `slideReveal`, `zoomFade`. Use `delay` and `stagger` + `index` for sequenced reveals (see About's values grid for the pattern). Do not introduce a second animation system.

8. **Images.**
   Drop new assets into [`app/public/`](../../../app/public/) and reference as `<Image src="/<filename>" alt="…"/>` from `next/image`. Always set `alt`. Use `priority` only for the hero image of the page (above the fold).

9. **WhatsApp / phone / social.**
   If the new page has a CTA, reuse the canonical values:
   - WhatsApp: `https://wa.me/60109203889` (target=_blank, rel=noopener noreferrer)
   - Phone: `tel:+60109203889`
   - Instagram: `https://www.instagram.com/hananeecafe/`
   - Facebook: `https://www.facebook.com/p/Hananee-61581697183774/`

10. **Verify.**
    ```bash
    cd app && npm run lint
    cd app && npm run dev
    ```
    Open <http://localhost:3000/<segment>>. Check:
    - The new entry shows in the desktop nav AND the mobile hamburger menu.
    - The footer "Navigate" column shows the new link.
    - Active state lights up when you're on the page.
    - `<ScrollReveal>` sections animate on scroll (no pre-revealed flicker).
    - The tab title matches your `metadata.title`.
    - Mobile width (DevTools 375px) lays out cleanly.

## Don'ts

- Don't add route groups (`(auth)`, `(platform)`, etc.) — this site is one flat group.
- Don't add auth guards / role gates — this is a public marketing site.
- Don't fetch data in `useEffect` against an API — there is no API.
- Don't add a new top-level page without updating BOTH Navbar.js and Footer.js — users get there from both.
- Don't export `metadata` from a `'use client'` `page.js` — Next.js won't pick it up. Put it on `layout.js` instead.
- Don't drop in Tailwind utilities — components use CSS Modules.
- Don't introduce a new animation library — use `<ScrollReveal>`.
- Don't hand-roll an IntersectionObserver inside the page — `<ScrollReveal>` already does that.
