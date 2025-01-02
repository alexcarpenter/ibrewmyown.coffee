import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { META } from "@/consts";
import { getSlugFromId } from "@/utils";

export async function GET(context) {
  const interviews = await getCollection("interviews");
  return rss({
    title: META.title,
    description: META.description,
    site: context.site,
    items: interviews.map((item) => {
      const slug = getSlugFromId(item.id);
      return {
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.published,
        link: `/interviews/${slug}`,
      };
    }),
  });
}
