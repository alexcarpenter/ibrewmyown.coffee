import { Tooltip } from "@base-ui/react/tooltip";
import { ShoppingBagIcon } from "lucide-react";

export type ProductBlipData = {
  x: number;
  y: number;
  title: string;
  description: string;
  link: string;
};

export function ProductBlipTooltip({ x, y, title, link }: ProductBlipData) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        className="group/blip absolute z-100 hidden size-2.5 before:absolute before:top-1/2 before:left-1/2 before:size-10 before:-translate-x-1/2 before:-translate-y-1/2 [@media(pointer:fine)]:flex"
        aria-label={title}
      >
        <span className="bg-accent animate-blip absolute inline-flex h-full w-full rounded-full opacity-75 group-hover/blip:[animation-play-state:paused]"></span>
        <span className="bg-accent relative flex size-2.5 rounded-full"></span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" sideOffset={8}>
          <Tooltip.Popup className="z-50 flex h-10 origin-[var(--transform-origin)] items-center gap-x-3 rounded-full bg-black/20 ps-6 pe-1 text-sm text-white backdrop-blur-sm transition-[scale,opacity] duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <span className="font-medium">{title}</span>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-foreground inline-flex h-8 items-center gap-2 rounded-full px-2.5 text-sm font-medium"
            >
              Shop
              <ShoppingBagIcon
                className="size-3 translate-y-px"
                aria-hidden="true"
              />
            </a>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
