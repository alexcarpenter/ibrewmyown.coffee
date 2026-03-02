import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const brands = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/brands" }),
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/categories" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/products" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url(),
    img: z.string().optional(),
    brand: reference("brands").optional(),
    category: reference("categories").optional(),
    pricePoint: z.enum(["$", "$$", "$$$", "$$$$", "$$$$$"]).optional(),
  }),
});

const interviews = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/interviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    avatar: z.string(),
    products: z.array(reference("products")).optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          position: z
            .enum(["top", "center", "bottom"])
            .default("center")
            .optional(),
          products: z
            .array(
              z.object({
                id: reference("products"),
                x: z.number().min(0).max(100),
                y: z.number().min(0).max(100),
              }),
            )
            .optional(),
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

const guides = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    tiers: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        product: reference("products").optional(),
        img: z.string(),
        title: z.string(),
        description: z.string(),
        link: z.string().url(),
        accessories: z.array(reference("products")).optional(),
      }),
    ),
    subscription: z
      .object({
        label: z.string(),
        title: z.string(),
        description: z.string(),
        link: z.string().url(),
      })
      .optional(),
  }),
});

export const collections = {
  brands,
  categories,
  guides,
  interviews,
  products,
};
