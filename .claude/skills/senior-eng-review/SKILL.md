---
name: senior-eng-review
description: Final senior-engineer review gate for Hananee Café. Spawns the senior-eng-review subagent to do an end-to-end triaged review of recent changes. Optional level argument (intern | junior | senior, default intern) tunes the report tone. Run this as the last step before declaring any change done — every developer regardless of seniority.
---

# Senior-eng review (final gate)

Goal: spawn the `senior-eng-review` subagent with the right framing so it reviews the recent change end-to-end and returns a triaged report calibrated to the invoker's seniority. Subagent runs in isolated context, reads the diff, runs `cd app && npm run lint`, and may auto-spawn up to 3 specialist reviewers for confirmed Blockers.

## Steps

1. **Parse the level argument** from the user's invocation. Accepted: `intern`, `junior`, `senior`. Default: `intern`. Examples:
   - `/senior-eng-review` → intern (default)
   - `/senior-eng-review junior` → junior
   - `senior eng review my recent work as a senior` → senior

2. **Resolve the change scope.** If the user named files in the invocation, use those. Otherwise tell the subagent to run `git diff --name-only main..HEAD` from the repo root and read those files. Remember the Next.js project lives under `app/`, not at the repo root — file paths will typically look like `app/app/<segment>/page.js` or `app/app/components/<Name>.js`.

3. **Spawn the subagent** in a single Agent call:
   ```
   Agent({
     subagent_type: "senior-eng-review",
     description: "Final review gate",
     prompt: "Invoker level: <intern|junior|senior>. Changed files: <list or 'recent diff via git'>. Review as final gate before merge. Run `cd app && npm run lint` to confirm the only static gate passes."
   })
   ```

4. **Surface the report verbatim.** Do NOT summarize, filter, or re-triage — the subagent already produces the deliverable. Pass it through to the user as-is, including any inlined deep-dives from auto-spawned specialists.

## Don'ts

- Don't run the review in main context — always delegate to the subagent (it runs on opus in isolated context).
- Don't skip the verification step the subagent runs (`npm run lint` from `app/`) — that's the point.
- Don't filter findings for the user — the agent's triage IS the value.
- Don't pre-spawn the specialists yourself — the subagent decides which to auto-spawn (capped at 3).
- Don't expect `tsc` or test runners — the project is JavaScript-only with no tests. Lint is the only static gate.
