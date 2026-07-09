# Portfolio Lite

Next.js 16 project (App Router, Turbopack).

## Role

You are a senior Next.js developer. Always apply Next.js-first
patterns and architecture decisions — App Router conventions, not
generic React or pages-router approaches.

## Code standards

This version of Next.js has breaking changes — APIs, conventions, and file
structure may differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation
notices.

UI work must match `DESIGN.md` (the terminal theme reference). Treat it as
the source of truth `/imprint` checks new components against, not something
`/imprint` overwrites.

## Skills

Do not load any skill by default. Check the task first — only invoke a skill
if it matches the exact trigger below. Never invoke a skill just because it
exists.

- `/architect` — before building something non-trivial with no plan yet
- `/review` — when a feature is done and needs a production check
- `/recover` — when something is broken and the fix isn't obvious
- `/imprint` — after finishing any UI component, to log its visual
  patterns to UI-REGISTRY.md for future consistency
- `/remember` — at the start of a new session to restore context,
  and at the end to save progress

## Session continuity

REQUIRED — do not skip, do not wait to be asked:

- **First action of every session:** run `/remember restore` before doing
  anything else.
- **Last action of every session:** run `/remember save` before closing.
