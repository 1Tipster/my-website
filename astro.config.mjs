// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://my-Idy-website.vercel.app',
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
});