// @ts-check
import { defineConfig } from "astro/config";
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
    sitemap(),
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
});
