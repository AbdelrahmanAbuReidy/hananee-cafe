---
description: Run the only static gate (`npm run lint`) for the Hananee Café Next.js site before declaring a change done. Use after any code edit, especially when the user asks to verify or commit.
---

# Run frontend checks (Hananee Café)

There is no TypeScript checker and no test runner in this project — the only static gate is `eslint`. Always run it from `app/` before reporting work as complete.

## Commands

```bash
cd app
npm run lint
```

If you added a dependency:

```bash
cd app
npm install
npm run lint
```

(There is no Docker, no `pnpm`. Plain `npm` from inside `app/`.)

## After the gate passes

Lint confirms the code parses and matches the project's ESLint config — it does NOT confirm the page looks right or that animations / mobile menu / WhatsApp links work. Open <http://localhost:3000> (`npm run dev` from `app/`) and exercise the change in the browser:

- Click through every page reachable from the Navbar/Footer.
- Check 375px (mobile), 768px (tablet), 1280px+ (desktop).
- Confirm `<ScrollReveal>`-wrapped sections animate in.
- Tap the WhatsApp CTA on at least one page — it should open `https://wa.me/60109203889`.
- Watch the DevTools console for client-side errors.

If the change can't be verified visually (e.g. you're in a CI-only context), say so explicitly rather than claiming it works.

## Don'ts

- Don't run a TypeScript check — there is no `tsc` here; project is plain JavaScript.
- Don't run a test runner — none is configured.
- Don't suppress an ESLint rule inline without a one-line comment explaining why.
- Don't run commands from the repo root — the Next.js project is under `app/`.
- Don't install packages with `pnpm` or `yarn` — this project uses `npm`.
