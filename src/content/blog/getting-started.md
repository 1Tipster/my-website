---
title: "Getting Started with Astro"
description: "A quick overview of why I chose Astro for this website and how you can get started with it too."
pubDate: 2025-01-20
tags: ["astro", "web development", "tutorial"]
---

# Getting Started with Astro

[Astro](https://astro.build) is a modern static site generator that delivers fast websites by shipping zero JavaScript by default. Here's why I chose it for this site.

## Why Astro?

1. **Performance first** - Astro ships HTML with no client-side JavaScript unless you need it
2. **Content collections** - Built-in support for type-safe Markdown and MDX content
3. **Framework agnostic** - Use React, Vue, Svelte, or just plain HTML
4. **Great DX** - Fast dev server, TypeScript support, and excellent docs

## Key features I'm using

### Content Collections

Astro's content collections let you organize and validate your content with TypeScript schemas. Each blog post is a Markdown file with typed frontmatter.

### Tailwind CSS

For styling, I'm using Tailwind CSS which integrates seamlessly with Astro. The utility-first approach makes it easy to build responsive, dark-mode-ready designs.

### Decap CMS

For content management, I've set up Decap CMS (formerly Netlify CMS) with GitHub OAuth. This gives me a nice web-based editor while keeping all content in Git.

## Getting started yourself

```bash
npm create astro@latest
```

That's all it takes to scaffold a new Astro project. Check out the [Astro documentation](https://docs.astro.build) for more details.
