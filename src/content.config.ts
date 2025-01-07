import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const brands = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/brands" }),
  schema: z.object({
    title: z.string(),
    link: z.string(),
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

const interviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/interviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    draft: z.boolean().optional(),
    avatar: z.string(),
    products: z.array(reference("products")).optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        }),
      )
      .optional(),
    social: z
      .object({
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        bluesky: z.string().optional(),
        youtube: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  brands,
  interviews,
  products,
};
