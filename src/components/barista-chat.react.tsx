"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useState } from "react";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { ArrowUp } from "lucide-react";

export default function BaristaChat() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  return (
    <>
      <ScrollArea.Root className="flex flex-1 flex-col px-4 [contain:size]">
        <ScrollArea.Viewport className="messages flex flex-col">
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 py-10 text-sm">
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
            <p>
              Vernacular architecture is building done outside any academic
              tradition, and without professional guidance. It is not a
              particular architectural movement or style, but rather a broad
              category, encompassing a wide range and variety of building types,
              with differing methods of construction, from around the world,
              both historical and extant and classical and modern. Vernacular
              architecture constitutes 95% of the world's built environment, as
              estimated in 1995 by Amos Rapoport, as measured against the small
              percentage of new buildings every year designed by architects and
              built by engineers.
            </p>
            <p>
              This type of architecture usually serves immediate, local needs,
              is constrained by the materials available in its particular region
              and reflects local traditions and cultural practices. The study of
              vernacular architecture does not examine formally schooled
              architects, but instead that of the design skills and tradition of
              local builders, who were rarely given any attribution for the
              work. More recently, vernacular architecture has been examined by
              designers and the building industry in an effort to be more energy
              conscious with contemporary design and construction—part of a
              broader interest in sustainable design.
            </p>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="pointer-events-none m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0">
          <ScrollArea.Thumb className="w-full rounded bg-gray-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <form
        className="px-4 pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col rounded-xl">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="[field-sizing:content] w-full resize-none rounded-t-xl bg-white p-5 text-sm outline-none"
            placeholder="What should I brew today?"
          />
          <div className="flex justify-end gap-2 rounded-b-xl bg-white px-2 pb-2">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-foreground grid size-8 place-content-center rounded-md text-white"
              aria-label="Send"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
