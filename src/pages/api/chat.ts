import type { APIRoute } from "astro";
import { createTextStreamResponse, type UIMessage } from "ai";

export const prerender = false;

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Great question! For today, I'd suggest a classic pour-over using a medium-light roast. " +
    "Start by heating your water to around 200°F (93°C). " +
    "Use a 1:15 coffee-to-water ratio — so about 20g of coffee to 300ml of water. " +
    "Bloom the grounds for 30 seconds with twice the weight of water, then pour in slow, steady circles. " +
    "Total brew time should be around 3–4 minutes. " +
    "Enjoy the clean, bright flavors that make pour-over so satisfying!",
};

function pickResponse(messages: UIMessage[]): string {
  const last = messages.at(-1);
  const text =
    last?.parts
      .filter((p) => p.type === "text")
      .map((p) => ("text" in p ? p.text : ""))
      .join(" ")
      .toLowerCase() ?? "";

  if (text.includes("espresso")) {
    return (
      "For espresso today, I'd recommend dialing in a 18g dose with a 36g yield over 28–32 seconds. " +
      "Use freshly roasted beans — ideally 7–14 days off roast — and make sure your portafilter basket is evenly distributed. " +
      "A good espresso should show a rich, reddish-brown crema. Enjoy!"
    );
  }

  if (text.includes("aeropress")) {
    return (
      "The AeroPress is wonderfully versatile! Try the inverted method: 15g of medium-fine coffee, " +
      "200ml of water at 175°F (80°C). Steep for 1.5 minutes, press slowly over 30 seconds. " +
      "You'll get a smooth, low-acid cup with great body. Perfect for a relaxed morning brew."
    );
  }

  if (text.includes("cold brew")) {
    return (
      "Cold brew is simple and rewarding! Coarsely grind 80g of coffee, combine with 1L of cold water in a jar, " +
      "and steep in the fridge for 12–18 hours. Strain through a paper filter or cheesecloth. " +
      "Dilute 1:1 with water or milk before serving over ice. Smooth, sweet, and low-acid."
    );
  }

  return MOCK_RESPONSES.default;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const messages: UIMessage[] = body.messages ?? [];

  const mockResponse = pickResponse(messages);

  const stream = new ReadableStream<string>({
    async start(controller) {
      const words = mockResponse.split(" ");
      for (const word of words) {
        await new Promise((resolve) => setTimeout(resolve, 40));
        controller.enqueue(word + " ");
      }
      controller.close();
    },
  });

  return createTextStreamResponse({ textStream: stream });
};
