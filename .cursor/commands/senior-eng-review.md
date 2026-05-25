---
description: Final senior-engineer review gate for the Hananee Café site. Performs an end-to-end triaged review of the recent change. Optional level argument (intern | junior | senior, default intern) tunes the report tone. Run this as the last step before declaring any change done — every developer regardless of seniority.
---

# Senior-eng review (final gate)

Goal: invoke the `@senior-eng-review` rule on the recent change so it returns a triaged report calibrated to the invoker's seniority. The rule reads the diff, runs `npm run lint` from `app/` (the only static gate), and may recommend up to 3 specialist reviewers for confirmed Blockers.

## Steps

1. **Parse the level argument** from the user's invocation. Accepted: `intern`, `junior`, `senior`. Default: `intern`. Examples:
   - `/senior-eng-review` → intern (default)
   - `/senior-eng-review junior` → junior
   - `senior eng review my recent work as a senior` → senior

2. **Resolve the change scope.** If the user named files in the invocation, use those. Otherwise run `git diff --name-only main..HEAD` (from the repo root) and use those files. Remember the Next.js project lives under `app/`, not the repo root — file paths typically look like `app/app/<segment>/page.js` or `app/app/components/<Name>.js`.

3. **Invoke the `@senior-eng-review` rule** on this change. Pass through the framing:
   - `Invoker level: <intern|junior|senior>`
   - `Changed files: <list or 'recent diff via git'>`
   - "Review as final gate before merge."

   The `@senior-eng-review` rule will:
   - Run `cd app && npm run lint`.
   - Walk the senior-eng checklist (RSC boundaries, hooks discipline, `<ScrollReveal>` usage, CSS-Modules vs globals, images, links, mobile, brand voice, WhatsApp/phone/address consistency).
   - Check the cross-cutting gaps single-domain reviewers miss.
   - Triage findings as Blockers / Strongly recommended / Polish.
   - For each Blocker, recommend invoking the matching specialist rule (`@bug-reviewer`, `@ui-ux-reviewer`, `@security-reviewer`, etc.) for a focused deep dive.

4. **Surface the report verbatim.** Do NOT summarize, filter, or re-triage — the rule's output IS the deliverable.

5. **Optional follow-up.** If the report recommends a specialist deep-dive (e.g., `@bug-reviewer` on a flagged hook cleanup), invoke those rules afterwards with the same `Invoker level:` so they calibrate tone.

## Don'ts

- Don't skip the verification step (`cd app && npm run lint`) — the rule does it for a reason. There is no `tsc` or test runner; lint is the only static gate.
- Don't filter findings for the user — the triage IS the value.
- Don't try to fix code yourself in the same turn — return the report first; fixes happen in follow-up turns.
- Don't auto-invoke more than the rule recommends — it caps specialist deep-dives at 3.
