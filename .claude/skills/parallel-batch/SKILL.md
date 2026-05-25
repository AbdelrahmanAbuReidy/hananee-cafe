---
name: parallel-batch
description: Run a batch of INDEPENDENT tasks in parallel by spawning multiple Agent calls in a single message. Use when the user gives a list of unrelated tweaks across non-overlapping files (e.g. "fix the footer copy, add an alt text on the gallery, rename a variable in Navbar"). Cap at 5 parallel sub-tasks. Refuses if tasks overlap on a file or have explicit ordering. Does NOT replace `phase-implementer` (use that for sequential feature work).
---

# Run independent tasks in parallel

Goal: when the user has 2–5 unrelated tasks, do them concurrently instead of one after the other. The platform supports this natively — multiple `Agent` tool calls in a single assistant message run in parallel. This skill makes that pattern reflexive.

## Steps

1. **Parse the batch.** Identify each task in the user's request. Each task should be self-contained (one file, one component, one line range). Number them 1..N and list back to the user before dispatching.

2. **Verify independence.** No two tasks may write the same file, and no task may depend on another's output. Walk through the list:
   - Same file in two tasks? Refuse and ask the user to serialize that pair (or merge them into one task).
   - Explicit ordering language ("first do X, then Y") → refuse; this is sequential work.
   - One task's output is another task's input? Refuse.
   - Two tasks both touch `Navbar.js` (or both touch `Footer.js`, or both touch home `page.js`)? Refuse — those are common hot spots.

3. **Cap at N = 5.** If the user gave more than 5 sub-tasks, run the first 5 in parallel and queue the remainder for a follow-up batch (say so explicitly).

4. **Pick the agent type.**
   - Default: `general-purpose`.
   - If every sub-task is clearly a review (e.g., "audit these 5 routes for missing alt text"), use the matching reviewer subagent: `code-quality-reviewer`, `ui-ux-reviewer`, `security-reviewer`, `bug-reviewer`, etc.
   - If sub-tasks are heterogeneous (some implement, some review), use `general-purpose` for all.

5. **Spawn in a single assistant message.** Send ONE message containing N `Agent` tool calls. This is what makes them parallel — N separate messages would run sequentially. Each call gets a focused prompt with one task and only the files it needs to read. Always remind the subagent that commands run from `app/` (e.g. `cd app && npm run lint`).
   ```
   Agent({ subagent_type: "general-purpose", description: "Fix typo in footer copy", prompt: "In app/app/components/Footer.js around the brand description, the word 'aesthetics' is misspelled as 'aestheticss'. Fix the typo. Do not edit any other file." })
   Agent({ subagent_type: "general-purpose", description: "Add alt text on gallery thumb", prompt: "In app/app/gallery/page.js, the third <Image> in the grid is missing an alt prop. Add a short descriptive alt that matches the photo subject. Do not edit any other file." })
   Agent({ subagent_type: "general-purpose", description: "Rename vague variable in ScrollReveal", prompt: "In app/app/components/ScrollReveal.js, the local variable `anim` is fine, but `el` could be renamed to `node` for clarity. Update the single usage in this file only." })
   ```

6. **Collate when all return.** Produce a single summary table and surface any failures or partial completions:
   ```
   | # | Task | File | Status | Notes |
   |---|------|------|--------|-------|
   | 1 | Typo in footer copy | app/app/components/Footer.js | done | one-line edit |
   | 2 | Gallery alt text | app/app/gallery/page.js | done | added "Hananee F1 wall art" |
   | 3 | Rename `el` → `node` | app/app/components/ScrollReveal.js | partial | renamed inside the effect; left ref name as `ref` per existing convention |
   ```

## When to refuse

Tell the user explicitly which sub-task triggered the refusal:
- **File overlap** — tasks A and B both write `<file>` → must serialize.
- **Explicit ordering** — user said "first … then …" → not parallel.
- **Single feature implementation** — adding a new section that touches `page.js`, `page.module.css`, `Navbar.js`, and `Footer.js` is sequential by design. Use `phase-implementer` instead.
- **More than 5 sub-tasks** — run the first 5; queue the rest.
- **Sub-task too vague to scope** — "tidy up the menu page" is not a discrete task; ask the user to break it down.

## Don'ts

- Don't parallelize tasks that touch the same file — race the writes and one will be lost.
- Don't exceed 5 concurrent `Agent` calls.
- Don't run the work in main context — every sub-task goes through `Agent` so each gets isolated context and parallelism actually happens.
- Don't use this for feature implementation (`phase-implementer` exists for that).
- Don't wrap reviewer fan-out — `phase-implementer` and `senior-eng-review` already spawn reviewers in parallel; calling this skill on top would just add a layer.
- Don't pass long, repo-wide context to each sub-agent — each prompt should focus on the one file/area its task needs.
