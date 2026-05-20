# Portfolio Lite

A minimal, fast personal portfolio built with Next.js, Tailwind CSS, and shadcn/ui. Monospace-themed for a dev-native feel. Blog and projects are MDX-powered via Content Collections — content is compiled at build time, so pages load fast with no runtime parsing.

🌐 **Live Demo:** [www.kennethloto.dev](https://www.kennethloto.dev)

![Preview](public/images/project-preview.png)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com), [base-ui](https://base-ui.com)
- **Content:** [Content Collections](https://www.content-collections.io) (MDX — blog + projects)
- **Linting & Formatting:** [Biome](https://biomejs.dev)
- **Package Manager:** [Bun](https://bun.sh)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/), [commitlint](https://commitlint.js.org/)

## Features

- Monospace font throughout for a dev-native aesthetic
- Dark/light mode toggle with system preference detection
- Mobile-responsive with shadcn/ui Sheet for navigation
- MDX blog and project pages with syntax highlighting via Shiki
- Reading time estimates on blog posts and projects
- Auto-updating local time display
- Dynamic OG image generation via Edge runtime with 1-year immutable CDN caching
- RSS feed for blog posts with 1-week CDN caching
- Auto-generated sitemap and robots.txt
- PWA manifest
- SEO-validated frontmatter (title, description, tags with length constraints)
- Test suite with Vitest + Testing Library (hooks, lib utilities)
- Load and stress testing with k6 via Docker
- Strict linting with Biome and conventional commit enforcement via commitlint

## File Structure

```
portfolio-lite/
├── app/
│   ├── (marketing)/          # Route group: blog, projects, home
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── og/
│   │   ├── __tests__/
│   │   │   └── og.load.js    # k6 load test
│   │   │   └── og.stress.js  # k6 stress test
│   │   └── route.tsx         # OG image generation (Edge runtime)
│   ├── rss/
│   │   ├── __tests__/
│   │   │   └── rss.load.js   # k6 load test
│   │   └── route.ts          # RSS feed
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── globals.css
│   ├── icon0.svg
│   ├── icon1.png
│   ├── layout.tsx
│   ├── manifest.json
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── pages/
│   │   ├── blog-detail-page.tsx
│   │   └── projects-detail-page/
│   │       ├── image-carousel.tsx
│   │       └── index.tsx
│   ├── sections/             # Hero, experience, connect, featured-projects, latest-post
│   ├── shared/
│   │   ├── footer.tsx
│   │   └── header/
│   │       ├── index.tsx
│   │       ├── logo-link.tsx
│   │       ├── mobile-nav.tsx
│   │       └── nav-links.tsx
│   ├── skeletons/            # Loading skeletons (local-time, mode-toggle)
│   ├── ui/                   # shadcn/ui base components
│   ├── local-time.tsx
│   ├── mode-toggle.tsx
│   ├── share-button.tsx
│   ├── theme-provider.tsx
│   └── theme.ts
├── content/
│   ├── blog/                 # MDX blog posts
│   └── projects/             # MDX project pages
├── hooks/
│   ├── __tests__/
│   ├── use-local-time.ts
│   ├── use-mounted.ts
│   ├── use-scroll-to.ts
│   ├── use-scroll-to-top.ts
│   └── use-share.ts
├── lib/
│   ├── __tests__/
│   ├── data/                 # Static data: about-me, nav, social-link, experience
│   ├── og-fonts.ts
│   ├── posts.ts
│   ├── projects.ts
│   ├── types.ts
│   └── utils.ts
├── public/
│   ├── fonts/                # JetBrains Mono (local font, used by OG route)
│   └── images/               # Avatar, project screenshots
├── .husky/                   # Git hooks (commit-msg, pre-commit, pre-push)
├── AGENTS.md
├── biome.json
├── CLAUDE.md
├── commitlint.config.ts
├── components.json
├── content-collections.ts
├── LICENSE.md
├── .lintstagedrc.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── renovate.json
├── tsconfig.json
├── vercel.json
├── vitest.config.mts
└── vitest.setup.ts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for load/stress testing only)

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

| Command                       | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `bun dev`                     | Start development server                      |
| `bun run build`               | Build content collections + production app    |
| `bun run lint`                | Check code with Biome                         |
| `bun run lint:fix`            | Auto-fix linting issues                       |
| `bun run lint:fix:unsafe`     | Auto-fix with unsafe transforms               |
| `bun run format`              | Format code with Biome                        |
| `bun run typecheck`           | Run TypeScript type checking                  |
| `bun test`                    | Run tests in watch mode                       |
| `bun test:run`                | Run tests once                                |
| `bun test:coverage`           | Run tests with coverage report                |
| `bun run test:load:og`        | k6 load test — `/og` route (20 VUs, 1m)       |
| `bun run test:stress:og`      | k6 stress test — `/og` route (200 VUs, 2m10s) |
| `bun run test:load:rss`       | k6 load test — `/rss` route (20 VUs, 1m)      |
| `bun run ui`                  | Add shadcn/ui components                      |
| `bun run content-collections` | Build content collections manually            |

### Load & Stress Testing

Tests run against the live production URL using [k6](https://k6.io) via Docker. Make sure Docker Desktop is running before executing any `test:load` or `test:stress` commands.

```bash
# Pull the k6 image once
docker pull grafana/k6

# Then run any test script
bun run test:load:og
bun run test:stress:og
bun run test:load:rss
```

Tests are colocated with their routes following the same `__tests__/` convention as Vitest unit tests:

- `app/og/__tests__/og.load.js` — load test (20 VUs)
- `app/og/__tests__/og.stress.js` — stress test (200 VUs)
- `app/rss/__tests__/rss.load.js` — load test (20 VUs)

## Customization

### Personal Info

Update your details in `lib/data/`:

- `about-me.ts` — Name, bio, avatar, email
- `nav.ts` — Navigation links
- `social-link.ts` — Social profiles
- `experience.ts` — Work history

### Adding Blog Posts

Create a `.mdx` file in `content/blog/`. Use `content/blog/_template.mdx` as a starting point. Frontmatter is validated at build time — see `content-collections.ts` for the full schema and character limits.

### Adding Projects

Create a `.mdx` file in `content/projects/`. Same frontmatter validation applies. Place project screenshots in `public/images/projects/` — missing images will cause a build error.

## Deployment

Deployed via [Vercel CLI](https://vercel.com/docs/cli):

```bash
bunx vercel --prod
```

No environment variables required for the base setup.

## License

MIT — see [LICENSE](LICENSE).
