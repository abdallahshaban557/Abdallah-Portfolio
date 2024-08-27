import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://abdallahshaban.com',
  integrations: [tailwind(), mdx(), icon({
    include: {
      mdi: ['*']
    }
  }), sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/squoosh' },
  },
  adapter: cloudflare(),
  vite: {
    ssr: {
      noExternal: ['resend']
    }
  }
});