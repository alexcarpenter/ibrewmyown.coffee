import type { CollectionEntry } from "astro:content";
import { nanoquery } from "@nanostores/query";
import { atom } from "nanostores";

export type Product = CollectionEntry<"products">;

const [createFetcherStore] = nanoquery({
  fetcher: async (...keys: Array<string | number | true>) => {
    const response = await fetch(keys.join(""));
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    return response.json();
  },
  // Cache product data for 1 day since it rarely changes
  dedupeTime: 24 * 60 * 60 * 1000,
});

const productStores = new Map<
  string,
  {
    store: ReturnType<typeof createFetcherStore<Product>>;
    idAtom: ReturnType<typeof atom<string | null>>;
  }
>();

export function getProductStore(id: string) {
  if (!productStores.has(id)) {
    const $productId = atom<string | null>(null);
    const store = createFetcherStore<Product>([
      "/api/products/",
      $productId,
      ".json",
    ]);
    productStores.set(id, { store, idAtom: $productId });
    $productId.set(id);
  }

  return productStores.get(id)!;
}

export function fetchProduct(id: string) {
  const { idAtom } = getProductStore(id);
  idAtom.set(id);
}

export function unfetchProduct(id: string) {
  const cached = productStores.get(id);
  if (cached) {
    cached.idAtom.set(null);
  }
}
