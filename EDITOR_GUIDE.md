# Editor Guide

A practical reference for content editors working on this site.

## Quick Reference

| What you want to do | Where to go |
|---|---|
| Add a blog post | `src/content/blog/` |
| Add an event | `src/content/events/` |
| Upload images | `public/images/` |
| Upload downloadable files | `public/downloads/` |
| Edit navigation links | `src/components/Header.astro` (the `navLinks` array) |
| Edit the resources page | `src/pages/resources.astro` (the `links` and `downloads` arrays) |
| Edit the contact page | `src/pages/contact.astro` |
| Edit the about page | `src/pages/about.astro` |
| Edit the home page | `src/pages/index.astro` |
| Use the CMS (if configured) | `/admin/` in the browser |

## Adding a Blog Post

Create a new `.md` file in `src/content/blog/`. The filename becomes the URL slug (e.g., `my-new-post.md` becomes `/blog/my-new-post/`).

### Required Frontmatter

```yaml
---
title: "My New Post"
description: "A short summary that appears in cards and meta tags."
pubDate: 2026-02-09
---
```

### Optional Frontmatter

```yaml
---
title: "My New Post"
description: "A short summary."
pubDate: 2026-02-09
updatedDate: 2026-02-10          # Shows an "Updated" notice on the post
heroImage: "/images/my-photo.jpg" # Banner image at the top of the post
tags: ["javascript", "tutorial"]  # Shown as badges on the post and card
---
```

### Post Body

Write standard Markdown below the frontmatter `---` block. You can use headings, lists, links, images, code blocks, etc.

```markdown
## My Section

Here's a paragraph with a [link](https://example.com) and an image:

![Alt text](/images/my-photo.jpg)
```

### Full Example

```markdown
---
title: "Getting Started with Astro"
description: "A beginner-friendly guide to building sites with Astro."
pubDate: 2026-03-01
heroImage: "/images/astro-guide.jpg"
tags: ["astro", "tutorial"]
---

# Getting Started with Astro

Astro is a modern web framework...
```

## Adding an Event

Create a new `.md` file in `src/content/events/`. The filename becomes the URL slug (e.g., `spring-meetup.md` becomes `/events/spring-meetup/`).

### Required Frontmatter

```yaml
---
title: "Spring Meetup"
description: "Monthly meetup for web developers."
date: 2026-05-15T18:30:00
---
```

### Optional Frontmatter

```yaml
---
title: "Spring Meetup"
description: "Monthly meetup for web developers."
date: 2026-05-15T18:30:00
endDate: 2026-05-15T21:00:00         # Shows a time range
location: "Downtown Community Center"  # Shown with a map pin icon
url: "https://meetup.com/my-event"     # External link shown on the event page
photos:                                # Photo gallery on the event detail page
  - "/images/events/meetup-1.jpg"
  - "/images/events/meetup-2.jpg"
---
```

### Past vs. Upcoming

Events are automatically sorted into "Upcoming" and "Past Events Archive" based on the `date` field compared to the current date. No manual flagging is needed.

### Adding Photos to an Event

1. Place image files in `public/images/events/` (or any subfolder of `public/`)
2. Add the paths to the `photos` array in the event's frontmatter (paths are relative to `public/`, so `public/images/events/photo.jpg` becomes `/images/events/photo.jpg`)
3. Photos display as a responsive grid gallery on the individual event page

## Images

All static assets (images, PDFs, etc.) go in the `public/` directory. Files in `public/` are served from the site root.

| Purpose | Recommended location | URL path |
|---|---|---|
| Blog hero images | `public/images/` | `/images/filename.jpg` |
| Event photos | `public/images/events/` | `/images/events/filename.jpg` |
| CMS uploads | `public/images/uploads/` | `/images/uploads/filename.jpg` |
| Downloadable files | `public/downloads/` | `/downloads/filename.pdf` |

## Editing the Resources Page

The resources page (`src/pages/resources.astro`) has two data arrays at the top of the file:

- **`links`** — Curated external links grouped by category. Each category has a `category` name and an `items` array with `title`, `url`, and `description`.
- **`downloads`** — Downloadable files. Each entry has `title`, `file` (path to a file in `public/`), and `description`.

To add a new link category, add a new object to the `links` array. To add a downloadable file, add it to the `downloads` array and place the actual file in `public/downloads/`.

## Editing the Contact Page

The contact page (`src/pages/contact.astro`) uses a frontend-only form that opens the visitor's email client. The placeholder email address `hello@example.com` appears in two places in the file — update both to your actual email address.

## Navigation

Navigation links are defined in `src/components/Header.astro` as a `navLinks` array:

```js
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
```

To add or remove a nav link, edit this array. The active page is highlighted automatically.

## Decap CMS

An admin panel is available at `/admin/` for managing blog posts and events through a browser UI. It requires GitHub OAuth to be configured first. The CMS config is in `public/admin/config.yml`.

**Note:** The CMS config does not yet include the `photos` field for events. If you use the CMS to create events, you'll need to add photos by editing the Markdown file directly.

## Project Structure Overview

```
src/
  content/
    blog/          ← Blog post Markdown files
    events/        ← Event Markdown files
  components/      ← Reusable UI components (Header, Footer, cards, etc.)
  layouts/         ← Page layout templates (BaseLayout, BlogPost, EventPage)
  pages/           ← Each file = a route on the site
    blog/
      index.astro        ← /blog (post listing)
      [...slug].astro    ← /blog/post-name (individual posts)
    events/
      index.astro        ← /events (event listing + archive)
      [...slug].astro    ← /events/event-name (individual events)
    about.astro          ← /about
    contact.astro        ← /contact
    resources.astro      ← /resources
    index.astro          ← / (home page)
    rss.xml.ts           ← /rss.xml (RSS feed)
  styles/
    global.css     ← Global styles and theme colors
public/
  admin/           ← Decap CMS admin panel files
  images/          ← Static images
  downloads/       ← Downloadable files
```

## Running the Site Locally

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
```
