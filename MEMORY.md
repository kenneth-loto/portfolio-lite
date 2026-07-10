# Memory — CSP, PostHog, SEO & Analytics

Last updated: 2026-07-10

## What was built

**CSP fix** — `'unsafe-inline'` added to production `script-src` in `next.config.ts:13`. Static rendering preserved.

**PostHog analytics** — combined init with Sentry in `instrumentation-client.ts`. Created:

- `lib/track-click.ts` — `trackClick(label, url)` fires `"outbound_click"`
- `hooks/use-section-view.ts` — IntersectionObserver hook, fires `"section_viewed"` once at 50% visibility
- `trackClick` applied to all 6 links: 2 project GitHub links (featured-projects), 3 social/email links (connect), 1 back-to-home link (not-found)
- `"use client"` added to `featured-projects.tsx`, `connect.tsx`, `not-found.tsx`
- `Connect` uses `useSectionView("reached_connect_section")` as scroll-depth signal

**section.tsx visual refinements:**

- New `SectionPrompt` component (`flex-col gap-0.5`)
- `Section` accepts `ref` via React 19 direct prop pattern
- `SectionTerminal`: `gap-4` added (was bare `flex-col`)
- `SectionPwd`: added `break-all leading-relaxed`
- `SectionCommand`: `$` span gets `text-muted-foreground`
- `SectionOutput`: `gap-y-2` (was `gap-y-0.5`), removed `leading-relaxed`

**SEO fixes** (`app/layout.tsx`):

- `og:image:alt` — `"Kenneth Loto — Full-Stack Developer"`
- `twitter:site` — `"@kenneth_loto"`
- `themeColor` moved from `metadata` to separate `viewport` export (Next.js 16 deprecation)

**Domain canonical** — `.env.local`: `NEXT_PUBLIC_SITE_URL` changed to `https://www.kennethloto.dev` to match Vercel production domain.

**Vercel Analytics + Speed Insights** — re-added alongside PostHog. CSP entries restored.

## Decisions made

- **CSP with `'unsafe-inline'` over nonces** — keeps site fully static; negligible XSS risk for a portfolio with no user input
- **PostHog + Sentry combined in `instrumentation-client.ts`** — single init file, no conflict
- **Section view tracking on last section only** — only Connect is tracked; signals full scroll-through without noise
- **Non-www redirects to www** — canonical uses www; naked domain 307s via Vercel
- **React 19 direct ref prop** — `Section` accepts `ref` without `forwardRef`

## Problems solved

- Production CSP blocked all inline scripts — `'unsafe-inline'` added to production `script-src`
- `themeColor` deprecation in Next.js 16 build output — moved to `viewport` export
- Event handlers in server components require `"use client"` — added to 3 files
- Canonical URL mismatch — aligned `NEXT_PUBLIC_SITE_URL` with actual production domain (www)

## Current state

- Fully static single-page portfolio, all sections rendering
- PostHog: pageviews auto-captured, outbound clicks tracked, scroll-to-bottom tracked
- Sentry + Vercel Analytics + Speed Insights all active alongside PostHog
- SEO: og:image:alt, twitter:site, theme-color, canonical matching production
- CSP: `script-src 'self' 'unsafe-inline'`, connects to Vercel + Sentry
- All TypeScript and Biome checks pass, build succeeds
- UI registry updated with all visual changes

## Next session starts with

Nothing urgent. Consider adding PostHog CSP entries if needed when PostHog is fully active.

## Open questions

- None
