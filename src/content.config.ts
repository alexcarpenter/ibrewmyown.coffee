import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const brands = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/brands" }),
  schema: z.object({
    title: z.string(),
    link: z.string(),
  }),
});

const interviews = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/interviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    social: z
      .object({
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/products" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
  }),
});

export const collections = {
  brands,
  interviews,
  products,
};
