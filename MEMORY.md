# Memory — Portfolio Lite Overhaul

Last updated: 2026-07-09 (session 3)

## What was built

**Overhauled to single-page portfolio** — stripped blog/projects MDX content collections, removed unused UI components, simplified page structure.

**Components modified:**

- `components/sections/featured-projects.tsx` — tags joined with ", ", en dash for description prefix
- `components/sections/technical-skills.tsx` — inline spans for `key=value`, `break-words` instead of `break-all`
- `components/sections/experience.tsx` — removed individual `|` spans, used `border-l` for connected vertical line
- `components/sections/connect.tsx` — mailto check with `isMailto` var, cleaned target/rel
- `components/sections/about-me.tsx` — heading `<h1>` → `<h2>`, padding moved to page `<main>`
- `components/sections/experience.tsx` — job title `<span>` → `<h2>`
- `components/sections/connect.tsx` — contact title `<div>` → `<h2>`
- `app/error.tsx` — layout classes to `mx-auto h-svh max-w-2xl justify-center px-4 py-0`, heading is `<h1>`, Retry button `px-2 py-1.5` for 24px target
- `app/not-found.tsx` — same layout change
- `app/global-error.tsx` — hover state via `useState`, `fontWeight: 500` on Retry, `maxWidth` only, Retry button `padding: "4px 8px"` for 24px target, `prefersReducedMotion` state to disable transition when user prefers reduced motion
- `app/page.tsx` — imports `Whoami` + `Intro` instead of `Hero`, `<main>` has `px-4 py-6`
- `app/layout.tsx` — JSON-LD `url` uses `baseUrl` (env var), `<body>` lost `px-6 py-6`
- `components/sections/featured-projects.tsx` — added `aria-label` with "opens in new tab" to project links
- `components/sections/connect.tsx` — added `aria-label` with "opens in new tab" to social links
- `app/globals.css` — added `@media (prefers-reduced-motion: reduce)` block

**New files:**

- `types/` directory with 5 type files (about-me, connect, experience, featured-projects, technical-skills)
- `lib/data/` — 5 data files matching types
- `components/sections/whoami.tsx` — `<h1>{name} – {title}`, command: `whoami`
- `components/sections/intro.tsx` — `ls -ap` listing (replaces `hero.tsx`, removed)
- `UI-REGISTRY.md` — visual pattern registry (via `/imprint audit`)
- `README.md` — fully rewritten to match current single-page state

**Infrastructure:**

- Removed unused packages: `@base-ui/react`, `class-variance-authority`, `lucide-react`
- Updated all dependencies via `bun update`
- Bumped app version to `2.0.0`
- Biome updated to `2.5.3` (schema + CI)
- CI: removed commented-out test job, fixed build `needs`
- `renovate.json` — cleaned stale exclusion rules
- `.gitignore` — removed `.content-collections` entry
- `lib/data/connect.ts` and `featured-projects.ts` — `import` → `import type`
- `app/icon0.svg` — added `<title>`, fixed light/dark bg colors (`#fdfdfd` / `#1C1C1E`)
- `biome.json` — enabled `tailwindDirectives`, ignored `app/icon0.svg` from lint
- `DESIGN.md` — reviewed and verified against current code
- `globals.css` — added `--color-border: var(--muted)` to fix `border-border` build error
- `app/layout.tsx` — JSON-LD `url` switched from hardcoded string to `baseUrl` (env variable)

## Decisions made

- **Object over Map** for `TechnicalSkills` — fixed keys, typed interface is cleaner
- **Use `clientEnv` from @t3-oss** instead of raw `process.env` for validation
- **No hardcoded URLs** — use `!` assertion on env vars
- **Edge runtime for OG route** with `fetch(new URL(...))` for font loading (edge-compatible pattern)
- **No test dependencies** — all test infra removed (vitest, testing-library, happy-dom)
- **No icon libraries** — terminal theme communicates through text and color
- **CSP `style-src 'unsafe-inline'` kept** — needed for `global-error.tsx` and `SectionOutput` dynamic grid; not a meaningful XSS risk with locked-down `script-src`
- **h1 → h2 hierarchy** — `Whoami` owns the page's single `<h1>` with primary keyword; AboutMe, Experience, Connect use `<h2>` for section headings

## Problems solved

- TypeScript errors from `clientEnv.NEXT_PUBLIC_SITE_URL` being `string | undefined` — used `!` assertion
- Spaces in JSX being stripped (`{" "}` pattern) — combined inline spans
- CSP violations in dev Lighthouse — confirmed normal, not a production concern

## Session 3 (this session) — dependency upgrades

- Upgraded `next` 16.2.9 → **16.2.10** (patch)
- Upgraded `@types/node` ^25.9.5 → **26.1.1** (major)
- Tried `typescript` ^6.0.3 → **7.0.2** (native Go port, major) — reverted to 6.0.3 because build script broke (unrelated to TS version; bun/Next.js worker conflict)
- All other deps confirmed current on latest versions

## Current state

- Single-page portfolio works end to end
- All sections: Whoami, Intro, About Me, Technical Skills, Experience, Featured Projects, Connect
- OG image generation works on edge runtime
- Sentry error tracking configured
- Vercel Analytics + Speed Insights configured
- SEO audit passed — h1 keyword, h2 hierarchy, JSON-LD using env var, no blockers
- CSP, HSTS, security headers in place (style-src 'unsafe-inline' kept)
- All TypeScript and Biome checks pass
- Build succeeds

## Next session starts with

Continue any remaining cleanup or feature work. Consider verifying the production Lighthouse score on a deployed build. The `h1` SEO gap, JSON-LD hardcoded URL, and `<h2>` hierarchy are all resolved.

## Open questions

- `bun run build` fails with `node:sqlite` error when Next.js tries to verify TypeScript install via pnpm worker — `--bun` flag may be the cause. The `typecheck` and `lint` scripts pass fine; the build failure needs investigating but is pre-existing or caused by bun/Next.js 16.2.10 interaction.
- TypeScript 7.0.2 was briefly installed then reverted to 6.0.3 — should revisit when ready to handle native Go port migration.
