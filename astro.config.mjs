import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import pagefind from 'astro-pagefind';
import AstroPWA from '@vite-pwa/astro';

// ⚠️ इसे अपनी असली नई डोमेन से बदलें (https:// के साथ, अंत में / नहीं)
const SITE_URL = 'https://rdskendra.co.in';

export default defineConfig({
  site: SITE_URL,
  output: 'static', // GitHub Pages / Cloudflare Pages दोनों के लिए सही

  integrations: [
    sitemap(),        // 📑 Auto Sitemap
    mdx(),             // Markdown + JSX पोस्ट के लिए
    tailwind(),
    partytown({        // Analytics scripts को main thread से हटाने के लिए
      config: { forward: ['dataLayer.push'] },
    }),
    pagefind(),         // 🔍 Instant Search (build के बाद index बनता है)
    AstroPWA({          // 📱 PWA सपोर्ट
      registerType: 'autoUpdate',
      manifest: {
        name: 'RDS Kendra',
        short_name: 'RDS Kendra',
        description: 'Passport Photo Maker, PDF Tools, Aadhaar, PAN, Bank & CSC Tools',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],

  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },

  build: {
    format: 'directory', // clean URLs -> /post-slug/
  },
});
