// @ts-check
import { defineConfig } from "astro/config";
import { getCollection } from "astro:content";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://ibrewmyown.coffee",
  vite: { plugins: [tailwindcss()] },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
      serialize: async (item) => {
        // Add lastmod dates from content collections
        const urlPath = new URL(item.url).pathname;

        // Handle interview pages
        if (urlPath.includes('/interviews/')) {
          const slug = urlPath.split('/interviews/')[1]?.replace(/\/$/, '');
          if (slug) {
            const interviews = await getCollection('interviews');
            const interview = interviews.find(i => {
              const id = i.id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, '');
              return id === slug;
            });
            if (interview?.data.published) {
              item.lastmod = interview.data.published.toISOString();
            }
          }
        }

        // Handle guide pages
        if (urlPath.includes('/guides/')) {
          const slug = urlPath.split('/guides/')[1]?.replace(/\/$/, '');
          if (slug) {
            const guides = await getCollection('guides');
            const guide = guides.find(g => {
              const id = g.id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, '');
              return id === slug;
            });
            if (guide?.data.published) {
              item.lastmod = guide.data.published.toISOString();
            }
          }
        }

        return item;
      },
    }),
    icon(),
    react(),
    mdx({
      extendMarkdownConfig: true,
    }),
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  trailingSlash: "never",
});
