# Portfolio Lite

A single-page personal portfolio styled as a Windows Git Bash terminal session. Built with Next.js 16 and Tailwind CSS v4. Just a prompt, a command, and output.

🌐 **Live Demo:** [www.kennethloto.com](https://www.kennethloto.com)

![Preview](public/image/portfolio-lite-preview.webp)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (Terminal theme, OKLCH tokens)
- **Font:** [Space Mono](https://fonts.google.com/specimen/Space+Mono) via `next/font/google`
- **Linting & Formatting:** [Biome](https://biomejs.dev)
- **Package Manager:** [Bun](https://bun.sh)
- **Error Tracking:** [Sentry](https://sentry.io) (client, edge, server)
- **Analytics:** [PostHog](https://posthog.com) (reverse-proxied via Next.js rewrites) + [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/speed-insights)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/), [commitlint](https://commitlint.js.org/)

## Features

- Terminal-themed UI: prompt line, `$ cat` commands, monospace output
- Privacy policy page at `/privacy-policy` (auto-numbered, terminal-themed)
- Consent-gated analytics: PostHog + Vercel Analytics only load after user accepts
- Accessibility: skip-to-content, labeled commands, decorative prompts hidden from screen readers
- OG image generation via `@vercel/og` (Edge runtime, Space Mono TTFs)
- Sitemap, robots.txt, PWA manifest, JSON-LD structured data
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Sentry error capture (client + server) via tunnel (bypasses ad blockers)
- PostHog analytics: pageviews, outbound click tracking, scroll-depth events, Core Web Vitals
- Vercel Analytics & Speed Insights

## File Structure

```
portfolio-lite/
├── app/
│   ├── (marketing)/           # Route group (home + privacy-policy)
│   │   ├── layout.tsx         # Shared layout: SkipToContent, Header, <main>, Footer
│   │   ├── page.tsx           # Home page (6 terminal sections)
│   │   └── privacy-policy/
│   │       └── page.tsx       # Privacy policy (terminal-themed, auto-numbered)
│   ├── og/
│   │   └── route.tsx          # OG image generation (Edge runtime)
│   ├── error.tsx              # Client error boundary (terminal theme)
│   ├── global-error.tsx       # Root error boundary (inline styles)
│   ├── globals.css            # Tailwind v4 theme, OKLCH tokens
│   ├── layout.tsx             # Root layout, metadata, JSON-LD, consent provider
│   ├── manifest.json
│   ├── not-found.tsx          # 404 page (terminal theme)
│   ├── robots.ts
│   └── sitemap.ts             # Multi-URL sitemap
├── components/
│   ├── cookies/               # Consent management
│   │   ├── consent-provider.tsx
│   │   ├── cookie-consent-banner.tsx
│   │   ├── conditional-analytics.tsx
│   │   ├── posthog-init.tsx
│   │   └── reset-consent.tsx
│   ├── sections/              # Page sections (whoami, connect, etc.)
│   │   ├── about-me.tsx
│   │   ├── connect.tsx
│   │   ├── experience.tsx
│   │   ├── featured-projects.tsx
│   │   ├── intro.tsx
│   │   ├── technical-skills.tsx
│   │   └── whoami.tsx
│   ├── shared/                # Shared layout components
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── skip-to-content.tsx
│   └── ui/
│       └── section.tsx        # Terminal primitives (Section, SectionPwd, etc.)
├── hooks/
│   ├── __tests__/
│   │   └── use-section-view.test.ts  # IntersectionObserver tests (bun test)
│   └── use-section-view.ts           # IntersectionObserver for scroll-depth tracking
├── lib/
│   ├── __tests__/                    # Lib utility tests
│   ├── data/                         # Static content (JSON data objects)
│   │   ├── about-me.ts
│   │   ├── connect.ts
│   │   ├── experience.ts
│   │   ├── featured-projects.ts
│   │   ├── privacy-policy.ts
│   │   └── technical-skills.ts
│   ├── og.ts                         # OG image paths & helpers
│   ├── track-click.ts                # PostHog outbound click helper
│   └── utils.ts                      # cn(), ogUrl(), getAutoGridColumnWidth(), camelToConstantCase()
├── types/                     # TypeScript interfaces for all data
│   ├── about-me.ts
│   ├── connect.ts
│   ├── experience.ts
│   ├── featured-projects.ts
│   └── technical-skills.ts
├── public/
│   ├── fonts/                 # Space Mono TTF files (for @vercel/og)
│   ├── image/                 # Preview, verification files
│   └── web-app-manifest-*.png
├── .github/workflows/         # CI (Biome lint), CodeQL, auto-target-develop
├── .husky/                    # Git hooks (commit-msg)
├── AGENTS.md
├── DESIGN.md                  # Terminal theme design system
├── UI-REGISTRY.md             # Visual pattern registry
├── MEMORY.md                  # Session continuity log
├── biome.json
├── bunfig.toml                # Bun test preload (Happy DOM)
├── commitlint.config.ts
├── env/                       # Environment variable validation
│   ├── client.ts
│   └── server.ts
├── happydom.ts                # Test preload (browser API stubs)
├── instrumentation-client.ts  # Sentry + PostHog client init
├── instrumentation.ts         # Sentry server instrumentation
├── next.config.ts
├── package.json
├── renovate.json
├── sentry.client.config.ts
├── sentry.edge.config.ts
├── sentry.server.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+

### Installation

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
bun run build
bun run start
```

## Scripts

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `bun dev`                 | Start development server        |
| `bun run build`           | Build production app            |
| `bun run lint`            | Check code with Biome           |
| `bun run lint:fix`        | Auto-fix linting issues         |
| `bun run lint:fix:unsafe` | Auto-fix with unsafe transforms |
| `bun run format`          | Format code with Biome          |
| `bun run typecheck`       | Run TypeScript type checking    |
| `bun test`                | Run test suite with Happy DOM   |

## Customization

Update your details in `lib/data/`. Each file exports a typed object consumed by the corresponding section component. Types are in `types/` and must match.

| Data file                       | Content                                            |
| ------------------------------- | -------------------------------------------------- |
| `lib/data/about-me.ts`          | Name, title, location, bio                         |
| `lib/data/connect.ts`           | Email, LinkedIn, GitHub                            |
| `lib/data/experience.ts`        | Work history (title, company, period, description) |
| `lib/data/featured-projects.ts` | Projects (title, description, tags, GitHub URL)    |
| `lib/data/technical-skills.ts`  | Skill categories grouped by key                    |
| `lib/data/privacy-policy.ts`    | Privacy policy sections (8 sections, auto-numbered) |

The prompt line defaults are in `components/ui/section.tsx` (`SectionPwd` component props). Branch names, paths, and user/host can be changed per-page via props. `SectionCommand` accepts an optional `label` prop for screen reader accessibility (replaces raw command text with a human-readable description).

## Design

The entire site follows a Windows Git Bash / MINGW64 terminal session metaphor. See [DESIGN](DESIGN.md) for the full design system — color tokens, typography, spacing rhythm, component inventory, and rules about what not to do (no icons, no rounded corners, no third font weight).

## Testing

Tests run with [Bun's built-in test runner](https://bun.sh/docs/cli/test) and [Happy DOM](https://github.com/capricorn86/happy-dom) for browser API stubs:

```bash
bun test
```

| File                                       | What it tests                                       |
| ------------------------------------------ | --------------------------------------------------- |
| `hooks/__tests__/use-section-view.test.ts` | IntersectionObserver fires once, captures events    |
| `lib/__tests__/utils.test.ts`              | `camelToConstantCase()`, `getAutoGridColumnWidth()` |

Add test files under `hooks/__tests__/` or `lib/__tests__/`. Happy DOM is preloaded via `bunfig.toml` — no setup needed per file.

## Deployment

Deployed via [Vercel CLI](https://vercel.com/docs/cli):

```bash
bunx vercel --prod
```

Required environment variables:

| Variable                            | Source  |
| ----------------------------------- | ------- |
| `SENTRY_AUTH_TOKEN`                 | Sentry  |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog |
| `NEXT_PUBLIC_POSTHOG_HOST`          | PostHog |

## License

CC BY-NC 4.0 — see [LICENSE](LICENSE).
