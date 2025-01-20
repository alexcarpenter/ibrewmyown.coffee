// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ibrewmyown.coffee",
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), react(), sitemap()],
});
