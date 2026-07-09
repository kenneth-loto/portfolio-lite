# UI Registry — Terminal Theme

*Baseline established via `/imprint audit` on 2026-07-09.*

---

## Baseline

| Property | Value |
|---|---|
| Background | `bg-background` (OKLCH `#1c1c1e`) |
| Border radius | `0` (no `rounded-*` anywhere) |
| Body text | `text-muted-foreground` (`#a1a1aa`), `text-sm` (`0.875rem`), Regular (400) |
| Headings / titles | `text-foreground` (`#fdfdfd`), `font-medium` (500) |
| Metadata / labels | `text-muted-foreground`, `text-xs` (`0.75rem`) |
| Links — primary (actions) | `w-fit font-medium text-foreground hover:underline hover:underline-offset-2` |
| Links — secondary (social, etc.) | `w-fit text-muted-foreground hover:underline hover:underline-offset-2` |
| Underline offset | `2px` on hover |
| Transition | `transition-colors duration-200 ease-in-out` on hoverable elements |
| Shadow | None |
| Prompt colors | `text-terminal-identity`, `text-terminal-env`, `text-terminal-path`, `text-terminal-git` |
| Command → output spacing | `mt-4` (`16px` — Medium per DESIGN.md) |
| Output internal spacing | `gap-1` (`4px` — Tight) or `gap-2` (`8px` — Small) |
| Font | `var(--font-geist-mono)` / `Geist Mono` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets transition-duration to 0.01ms |

---

### Section (wrapper)

File: `components/ui/section.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited (`bg-background` from body) |
| Border | none |
| Border radius | none |
| Text — primary | inherited |
| Text — secondary | inherited |
| Spacing | `gap-4` between blocks, `py-6` vertical padding |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
The `Section` component is the outer wrapper for a terminal output block. Two sub-components compose a single terminal "session": `SectionTerminal` (flex-col container, no spacing of its own) wraps one `SectionPwd` + one `SectionCommand` + one output block. `SectionOutput` is a `grid auto-fill` for `ls`-style directory listings only; all other sections use a plain `<div>` for their output.

---

### Whoami

File: `components/sections/whoami.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — heading (h1) | `font-medium text-sm` |
| Spacing | `mt-4` command→output |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
The `<h1>` of the page — renders `{name} &ndash; {title}` (e.g. "Kenneth Loto – Full-Stack Developer"). Command is `whoami`. No `@` prefix, no prompt-output wrapper div. This is the only `<h1>` on the page; all other sections use `<h2>` for their section headings.

---

### Intro

File: `components/sections/intro.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text | `text-sm` via `SectionOutput` or `SectionCommand` |
| Spacing | standard `gap-4` from `Section` |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
`ls -ap` directory listing via `SectionOutput`. Same structure as the old `Hero` — prompt line, command, auto-grid file names. No heading. No interactive elements. This is the first visual block after `Whoami`.

---

### AboutMe

File: `components/sections/about-me.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — name heading | `font-medium text-sm` |
| Text — labels (dt) | `text-foreground` |
| Text — values (dd) | `text-muted-foreground leading-relaxed` |
| Spacing | `gap-2` inside output, `gap-1 gap-x-4` on dl grid |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Grid layout `grid-cols-[auto_1fr]` for label/value pairs. The `@name` heading (`<h2>`) uses Medium (500) weight. The page's single `<h1>` lives in `Whoami`. No `SectionTitle` or `SectionOutput` — content is hand-laid-out in a `dl`.

---

### TechnicalSkills

File: `components/sections/technical-skills.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — key | `font-medium text-foreground uppercase` |
| Text — values | `text-muted-foreground`, joined with `, ` |
| Spacing | `gap-1` inside output |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Each row is `KEY = value1, value2`. Keys are uppercase with Medium weight. Uses `wrap-break-word` to prevent overflow on long lines. No `select-none` is load-bearing for usability.

---

### Experience

File: `components/sections/experience.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — title | `font-medium text-foreground` with `-- ` prefix |
| Text — company | `text-foreground` |
| Text — period | `text-muted-foreground text-xs` |
| Text — description | `text-muted-foreground leading-relaxed` |
| Spacing | `gap-4` between entries, `gap-1` inside entry |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Uses `|` as a left-margin marker (ASCII pipe, not a border) to simulate a continuous vertical line. Title line: `| -- {title}` with `<h2>`. Company line: `|` then `pl-4`. Description: `|` then `pl-4`. Period is right-aligned via `justify-between` at the company row level.

---

### FeaturedProjects

File: `components/sections/featured-projects.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — title (link) | `font-medium text-foreground` with hover underline |
| Text — description | `text-muted-foreground leading-relaxed` with `&ndash;` prefix |
| Text — tags label | `text-foreground` (`tags: `) |
| Text — tags values | `text-muted-foreground lowercase`, joined with `, ` |
| Spacing | `gap-4` between projects, `gap-2` inside project, `gap-1` inside title block |
| Hover state | `hover:underline hover:underline-offset-2` on link |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Two `SectionTerminal` blocks: first for the `ls` listing (`SectionOutput`), second for the `cat` output. Tags are indented with `pl-4`. Description uses `&ndash;&nbsp;` prefix (HTML entity). Links open in new tab with `noreferrer` and `aria-label` indicating "opens in new tab".

---

### Connect

File: `components/sections/connect.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — title | `font-medium text-foreground` |
| Text — description | `text-muted-foreground leading-relaxed` with `-&nbsp;` prefix |
| Text — links label | `text-foreground` (`links:`) |
| Text — link values | `text-muted-foreground` |
| Spacing | `gap-4` inside output, `gap-x-4` between links |
| Hover state | `hover:underline hover:underline-offset-2` on each link |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
The title is an `<h2>`. Links use `target`/`rel` conditionally — `mailto:` links get neither. Social links are secondary style (`text-muted-foreground`, not `text-foreground` with `font-medium`) with `aria-label` indicating "opens in new tab" for external links. Links are in a `flex-wrap` row.

---

### Error page state

File: `app/error.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — heading | `font-medium text-sm` |
| Text — body | `text-muted-foreground text-sm leading-relaxed` |
| Text — error_id | `font-mono text-muted-foreground text-xs` |
| Text — action (Retry) | `font-medium text-foreground` with hover underline |
| Spacing | `mt-4` command→output, `mt-2` error_id below body, `mt-4` action below output |
| Hover state | `hover:underline hover:underline-offset-2` on Retry button |
| Target size | `px-2 py-1.5` (≥ 24×24px meets WCAG 2.5.8 AA) |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Error pages use `Section` with `mx-auto h-svh max-w-2xl justify-center px-4 py-0` for full-viewport centering. Heading is an `<h1>`. Retry is a `<button>` (not a link), styled identically to action links. No `$` prefix on the Retry button — matches DESIGN.md rule.

---

### Not Found page state

File: `app/not-found.tsx`
Last updated: 2026-07-09

| Property | Class |
|---|---|
| Background | inherited |
| Border | none |
| Border radius | none |
| Text — heading | `font-medium text-sm` |
| Text — body | `text-muted-foreground text-sm leading-relaxed` |
| Text — action (Back) | `font-medium text-foreground` with hover underline |
| Spacing | `mt-4` command→output, `mt-4` action below output |
| Hover state | `hover:underline hover:underline-offset-2` on Back link |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
Same layout classes as Error page (`mx-auto h-svh max-w-2xl justify-center px-4 py-0`). Heading is an `<h1>`. Uses `<Link>` (Next.js) instead of `<button>`.

---

### Global Error page state

File: `app/global-error.tsx`
Last updated: 2026-07-09

| Property | Class (inline style equivalent) |
|---|---|
| Background | `#1c1c1e` |
| Border | none |
| Border radius | none |
| Text — heading | `0.875rem`, `fontWeight: 500` |
| Text — body | `0.875rem`, `color: #a1a1aa`, `lineHeight: 1.75` |
| Text — error_id | `0.75rem`, `color: #a1a1aa` |
| Text — action (Retry) | `0.875rem`, `color: #fdfdfd`, underline on hover |
| Spacing | `marginTop: 16px` command→output, `marginTop: 8px` error_id, `marginTop: 16px` action |
| Hover state | `useState` toggle, `isHovered ? "underline" : "none"`, `textUnderlineOffset: 2px` |
| Reduced motion | `prefersReducedMotion` state from `matchMedia("(prefers-reduced-motion: reduce)")` — disables `transition` when true |
| Target size | `padding: "4px 8px"` (≥ 24×24px meets WCAG 2.5.8 AA) |
| Shadow | none |
| Accent usage | prompt colors inline (`#34c759`, `#b95cf0`, `#ff9500`, `#5ac8fa`) |

**Pattern notes:**
Exception component — replaces `<html>`/`<body>`, cannot use Tailwind. All styles are inline hex objects. Font loaded via `next/font/google` (`Geist_Mono`) applied via `className` on `<html>`. Structure matches every other terminal page: prompt → command → output → action. Body size is `0.875rem` to match `text-sm` from baseline. Retry button has `fontWeight: 500`, `padding: "4px 8px"` (24px target size), hover underline via `useState`, and `transition` conditional on `prefersReducedMotion` state (disables animation when reduced motion is preferred). Container uses only `maxWidth: "672px"` (no `width`).
