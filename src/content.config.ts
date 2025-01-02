import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const interviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/interviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
  }),
});

export const collections = {
  interviews,
};
