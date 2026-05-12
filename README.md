# Portfolio Lite

A minimal, fast personal portfolio built with Next.js, Tailwind CSS, and shadcn/ui. Monospace-themed for a dev-native feel. Blog and projects are MDX-powered via Content Collections — content is compiled at build time, so pages load fast with no runtime parsing.

🌐 **Live Demo:** [your-portfolio-url.com](https://your-portfolio-url.com)

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
- Dark/light mode toggle
- Mobile-responsive with shadcn/ui Sheet for navigation
- MDX blog and project pages with syntax highlighting via Shiki
- Reading time estimates on blog posts and projects
- Auto-updating local time display
- SEO-validated frontmatter (title, description, tags with length constraints)
- Strict linting with Biome and conventional commit enforcement via commitlint

## File Structure

```
portfolio-lite/
├── app/
│   ├── (marketing)/          # Route group: blog, projects, home
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── pages/                # Page-level components
│   ├── sections/             # Hero, experience, and other page sections
│   ├── shared/               # Header (with mobile sheet nav), footer
│   ├── skeletons/            # Loading skeletons
│   └── ui/                   # shadcn/ui base components
├── content/
│   ├── blog/                 # MDX blog posts
│   └── projects/             # MDX project pages
├── hooks/                    # use-local-time, use-scroll-to, use-share, etc.
├── lib/
│   ├── data/                 # Static data: nav, social media, work experience
│   ├── posts.ts              # Blog post utilities
│   ├── projects.ts           # Project utilities
│   └── utils.ts
├── public/images/            # Static images and project screenshots
├── CLAUDE.md                 # Claude-specific instructions
├── content-collections.ts    # Content Collections schema and config
└── biome.json                # Biome linter config
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

| Command | Description |
| --- | --- |
| `bun dev` | Start development server |
| `bun run build` | Build content collections + production app |
| `bun run lint` | Check code with Biome |
| `bun run lint:fix` | Auto-fix linting issues |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run ui` | Add shadcn/ui components |

## Customization

### Personal Info

Update your details in `lib/data/`:

- `about-me.ts` — Name, bio, avatar, email
- `nav.ts` — Navigation links
- `social-media.ts` — Social profiles
- `work-experience.ts` — Work history

### Adding Blog Posts

Create a `.mdx` file in `content/blog/`. Use `content/blog/_template.mdx` as a starting point. Frontmatter is validated at build time — see `content-collections.ts` for the full schema and character limits.

### Adding Projects

Create a `.mdx` file in `content/projects/`. Same frontmatter validation applies. Place project screenshots in `public/images/projects/` — missing images will cause a build error.

## Deployment

Deploy to [Vercel](https://vercel.com/new) by importing the repository. No environment variables required for the base setup.

## License

MIT — see [LICENSE](LICENSE).