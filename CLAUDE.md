# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Tina local server + Astro dev server at localhost:4321
- `npm run build` — Run `tinacms build` (generates admin SPA) then `astro build` to `./dist/`
- `npm run preview` — Preview production build locally
- `npm run astro` — Run Astro CLI (e.g., `npm run astro -- add react`)

No test framework is configured. No linter is configured.

## Architecture

This is a personal website built with **Astro 5** (static output), **Tailwind CSS v4**, and **Tina CMS**, deployed on **Vercel**.

### Content Collections

Defined in `src/content.config.ts` using Astro's glob loader. Two collections:

- **blog** (`src/content/blog/`) — Markdown/MDX posts with frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `tags[]`
- **events** (`src/content/events/`) — Markdown/MDX events with frontmatter: `title`, `description`, `date`, `endDate?`, `location?`, `url?`

Blog posts generate pages via `src/pages/blog/[...slug].astro` using `getStaticPaths()`. Events are listed on a single page (no individual event pages).

### Layouts

- `BaseLayout.astro` — Root HTML layout wrapping all pages. Accepts `title`, `description?`, `image?`. Includes Header, Footer, and inline dark-mode initialization script.
- `BlogPost.astro` — Extends BaseLayout for individual blog posts. Renders hero image, metadata, tags, and the markdown content slot.

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, not a PostCSS plugin)
- Custom theme variables defined in `src/styles/global.css` using `@theme` directive
- Dark mode: CSS variables overridden under `.dark body` selector; toggled by adding/removing `dark` class on `<html>`; persisted in `localStorage`
- Custom `.prose` class for markdown content styling (not using `@tailwindcss/typography`)

### Key Patterns

- All colors use CSS custom properties (`var(--color-bg)`, `var(--color-accent)`, etc.) — use these instead of hardcoded Tailwind color utilities
- Theme toggle is client-side vanilla JS via `<script is:inline>` in `ThemeToggle.astro`
- RSS feed generated at `/rss.xml` via `src/pages/rss.xml.ts`
- Tina CMS admin panel at `/admin/` (config in `tina/config.ts`; requires `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` from app.tina.io)
- Navigation links are defined in `Header.astro` as a `navLinks` array
- Astro integrations: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel`
