import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSlugFromId } from "@/utils";
import { META } from "@/consts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const collection = await getCollection("interviews", ({ data }) => {
    return data.draft !== true;
  });
  const interviews = collection.sort((a, b) => {
    const aDate = a.data.published;
    const bDate = b.data.published;
    return Date.parse(bDate.toString()) - Date.parse(aDate.toString());
  });
  return rss({
    trailingSlash: false,
    title: META.title,
    description: META.description,
    site: context.site,
    items: interviews.map((interview) => {
      const slug = getSlugFromId(interview.id);
      return {
        title: interview.data.title,
        pubDate: interview.data.published,
        description: interview.data.description,
        link: `/interviews/${slug}/`,
        content: sanitizeHtml(parser.render(interview.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
  });
}
