export const isProd = process.env.VERCEL_ENV === "production";

export function getSlugFromId(id: string) {
  return id.replace(/^\d{4}[-/.]\d{2}[-/.]\d{2}[-]/, "");
}

export function getIndexById<T extends { id: number | string }>(
  arr: T[],
  id: number | string,
): string {
  const index = arr
    .slice()
    .reverse()
    .findIndex((item) => item.id === id);
  return index.toString().padStart(3, "0");
}
