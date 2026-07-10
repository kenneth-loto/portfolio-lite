# Design System — Terminal Theme

This site's visual identity is built around a **Windows Git Bash / MINGW64 terminal
session**. Every surface — pages, error states, OG images — should feel like output
from the same shell prompt, not a generic dashboard or landing page.

The theme works because it's consistent, not decorative: the same prompt line,
the same four colors, the same spacing rhythm, repeated everywhere.

---

## Core metaphor

Think of every screen as a `cat`'d file inside one continuous terminal session:

```
Kenneth@LAPTOP-F4NAR8GJ MINGW64 /c/Next.js/portfolio-lite (main)
$ cat about-me.txt

[content here]
```

The prompt line never changes. Only the command and its output change per page
or per state (home, 404, error, OG image).

---

## Color palette

| Token                 | Hex       | OKLCH                           | Role                   |
| --------------------- | --------- | ------------------------------- | ---------------------- |
| `--terminal-identity` | `#34c759` | `oklch(0.7303 0.1944 147.44)`   | `user@host` segment    |
| `--terminal-env`      | `#b95cf0` | `oklch(0.6502 0.2207 310.66)`   | shell name (`MINGW64`) |
| `--terminal-path`     | `#ff9500` | `oklch(0.7652 0.1752 62.57)`    | current directory      |
| `--terminal-git`      | `#5ac8fa` | `oklch(0.7886 0.1225 230.83)`   | git branch             |
| `--background`        | `#1c1c1e` | `oklch(0.2273 0.0038 286.0916)` | page background        |
| `--foreground`        | `#fdfdfd` | `oklch(0.994 0 0)`              | primary text           |
| `--muted`             | `#27272a` | `oklch(0.2739 0.0055 286.0326)` | dividers, subtle fills |
| `--muted-foreground`  | `#a1a1aa` | `oklch(0.7118 0.0129 286.0665)` | secondary text         |
| `--border`            | `#52525b` | `oklch(0.4419 0.0146 285.7864)` | border color           |
| `--ring`              | `#fdfdfd` | `oklch(0.994 0 0)`              | focus ring color       |

**Rules:**

- The four `terminal-*` colors are reserved _only_ for the prompt line segments
  (identity, env, path, git). Never reuse them decoratively elsewhere — they
  carry meaning (which part of the prompt you're reading), and diluting that
  breaks the metaphor.
- Body copy is always `foreground` (headings/primary) or `muted-foreground`
  (supporting text) — never a third gray.
- `--radius: 0`. No rounded corners anywhere. Sharp edges are part of the
  terminal identity — a rounded terminal reads as "themed dashboard," not
  "actual shell."

---

## Typography

- **Primary font:** monospace, Geist Mono (OG images specifically — confirm which is canonical going forward).
- Only **two weights** in use: **Regular (400)** and **Medium (500)**. Never introduce a third weight — it dilutes the two-tier
  hierarchy (body vs. emphasis) the whole theme relies on.
- No italics. No letter-spacing tricks beyond the default, except uppercase
  micro-labels (`SectionTitle`), which use `tracking-wide`.

---

## The prompt line pattern

The single most important repeating element. Structure, in order:

```
{user}@{host}  {shell}  {path}  ({branch})
```

Colored per-segment using the four `terminal-*` tokens above, separated by a
literal space (not flex-gap — matches real terminal wrapping behavior).

Default values across the site:

- `user`: `Kenneth`
- `host`: `LAPTOP-F4NAR8GJ`
- `path`: `/c/Next.js/portfolio-lite`
- `branch`: `main`

Implemented once as `SectionPwd` — never hardcode these strings in a new
component. If a page needs a different path or branch (e.g. a `404` or
`error` state), pass it as a prop rather than duplicating the string.

---

## Command + output pattern

Every content block below the prompt line follows:

```
$ {command}

{output}
```

- `$ ` prefix is muted-foreground, the command itself is foreground.
- Command examples in use: `cat about-me.txt`, `cat error.log`, `cat 404.log`.
  Pick a command that names what's being displayed, framed as a file being
  read — `cat`, not `ls`, `echo`, or `run` (those don't fit "displaying
  content").
- Actions (retry, go home) are **not** prefixed with `$` — they're rendered
  as plain underlined links/buttons, distinct from read-only output. This
  was a deliberate choice: prefixing every clickable thing with `$` made the
  page feel cluttered and blurred the line between "this is output" and
  "this is actionable."

---

## Spacing rhythm

A fixed, repeating scale — don't introduce arbitrary spacing values outside
this list:

| Gap    | Value  | Used between                                                 |
| ------ | ------ | ------------------------------------------------------------ |
| Tight  | `2px`  | prompt line → command line                                   |
| Small  | `8px`  | lines within the same output block (title → body → metadata) |
| Medium | `16px` | command → output block; output block → action link           |

`justify-content: space-between` should be avoided on outer containers that
also contain natural top-down content — it stretches gaps unpredictably as
content length changes. Prefer fixed `margin-top` values from the scale
above, with `margin-top: auto` reserved specifically for pinning a footer to
the bottom of a fixed-height container (e.g. the OG image).

---

## Layout rules

- Content is **left-aligned**, never centered text — this is a terminal, not
  a marketing page. The _block as a whole_ can be horizontally centered in
  the viewport (`align-items: center` on the outer flex container), but text
  inside it stays flush-left.
- Max content width: `672px` (`max-w-2xl`) for text-heavy blocks like error
  pages; `900px` for the OG image's title/description, sized differently
  because it's a fixed 1200×630 canvas, not a responsive page.
- No icon libraries (Lucide, Tabler, etc.) as visual anchors for headings or
  errors. The theme communicates through text and color, not iconography —
  an icon next to "Something went wrong" reads as generic SaaS UI and breaks
  the terminal illusion. If a visual marker is ever needed, prefer an ASCII
  glyph (`✗`, `!`) in `terminal-path` orange over an SVG icon.
- No animation for its own sake (blinking cursors, transitions on state
  labels) unless it's load-bearing for usability. A static terminal reads as
  more authentic than one with decorative motion.

---

## Component inventory

Reusable primitives (see `components/section.tsx`):

| Component         | Purpose                                                               |
| ----------------- | --------------------------------------------------------------------- |
| `Section`         | Outer wrapper, vertical flex, base spacing                            |
| `SectionTerminal` | Inner flex column for one terminal "session" block                    |
| `SectionPrompt`   | Wraps `SectionPwd` + `SectionCommand` into a compact block            |
| `SectionPwd`      | The colored prompt line, defaults pre-filled                          |
| `SectionCommand`  | Renders `$ {children}`                                                |
| `SectionTitle`    | Uppercase muted micro-label (section headers)                         |
| `SectionOutput`   | Auto-grid list output (e.g. `ls`-style file listings)                 |
| `SectionDetails`  | Label/value definition list (marked removable — confirm still needed) |

**Rule of thumb:** if a new page needs prompt-line + command + output, reach
for these primitives first. Only write raw JSX/inline styles when the
component must render outside the normal React tree and can't use Tailwind —
currently only `global-error.tsx`, which replaces the root `<html>`/`<body>`
and can't rely on the compiled stylesheet the way `error.tsx` and
`not-found.tsx` can.

---

## Special case: `global-error.tsx`

This file is Next.js's top-level error boundary — it replaces the entire
root layout, including `<html>` and `<body>`, and Tailwind's compiled
classes may not reliably apply here depending on setup. Treat it as an
exception to "always use `Section*` components":

- Font is loaded directly via `next/font/google` (`JetBrains_Mono`) and
  applied via `className` on `<html>`, not through the normal Tailwind
  pipeline.
- Colors are inline hex values in a local `colors` object, not CSS
  variables — this file has no guarantee the site's `:root` variables are
  loaded when it renders.
- Structurally it still follows the exact same prompt → command → output →
  action pattern as everywhere else. The implementation differs; the design
  does not.

---

## OG image (`/og` route)

Same theme, adapted for a fixed 1200×630 canvas rendered via `next/og`
(Satori), which has its own constraints:

- No CSS variables, no `<style>` tags, no `@media` queries — Satori only
  reads inline `style={{}}` objects. Colors are a plain hex object, not
  `:root` tokens.
- Fonts must be loaded as raw `ArrayBuffer`s (local `.ttf` files via
  `fetch(new URL(...))`, static weights only — variable fonts don't render
  correctly in Satori).
- Layout: prompt line + command top-left, title/description mid-block,
  footer bar (name + domain) pinned to the bottom with a `1px` top border in
  `--muted`.
- Currently uses Geist Mono (Regular + Medium) rather than JetBrains Mono —
  worth deciding if this should be unified with the rest of the site or
  intentionally kept distinct as a "social preview" variant.

---

## Adding a new page or state

Checklist:

1. Does it need the prompt line? If it's a full-page state (error, empty,
   not-found), yes — use `SectionPwd`.
2. Frame the content as a `$ cat {something}.{ext}` command, not a heading.
3. Output block follows title (500 weight) → body (400 weight,
   muted-foreground) → optional metadata (mono, smaller, muted-foreground),
   each `8px` apart.
4. Any action (retry, navigate) is a plain underlined link/button, `16px`
   below the output block, no `$` prefix.
5. No icons, no rounded corners, no third gray, no third font weight.
