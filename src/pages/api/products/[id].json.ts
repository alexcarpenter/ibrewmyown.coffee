import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
  const products = await getCollection("products");
  return products.map((product) => ({
    params: { id: product.id },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const product = await getEntry("products", id);

  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: "Product not found",
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
