import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://abdallahshaban.com',
  integrations: [tailwind(), mdx(), icon({
    include: {
      mdi: ['*']
    }
  }), sitemap()],
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['resend']
    }
  }
});