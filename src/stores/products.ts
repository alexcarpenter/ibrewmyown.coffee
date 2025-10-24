import { nanoquery } from "@nanostores/query";
import { atom } from "nanostores";

export interface Product {
  id: string;
  collection: string;
  data: {
    title: string;
    description: string;
    link: string;
  };
}

const [createFetcherStore] = nanoquery({
  fetcher: async (...keys: Array<string | number | true>) => {
    const response = await fetch(keys.join(""));
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    return response.json();
  },
  dedupeTime: 5 * 60 * 1000,
});

const productStores = new Map<
  string,
  ReturnType<typeof createFetcherStore<Product>>
>();

export function getProductStore(id: string) {
  if (!productStores.has(id)) {
    const $productId = atom<string | null>(null);
    const store = createFetcherStore<Product>([
      "/api/products/",
      $productId,
      ".json",
    ]);
    productStores.set(id, store);
    $productId.set(id);
  }
  return productStores.get(id)!;
}
