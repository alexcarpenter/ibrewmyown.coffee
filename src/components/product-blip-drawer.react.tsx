import { DrawerPreview as Drawer } from "@base-ui/react/drawer";
import { ShoppingBagIcon } from "lucide-react";
import type { ProductBlipData } from "./product-blip-tooltip.react";

export function ProductBlipDrawer({
  x,
  y,
  title,
  description,
  link,
}: ProductBlipData) {
  return (
    <Drawer.Root>
      <Drawer.Trigger
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        className="group/blip absolute z-100 hidden size-2.5 before:absolute before:top-1/2 before:left-1/2 before:size-10 before:-translate-x-1/2 before:-translate-y-1/2 [@media(pointer:coarse)]:flex"
        aria-label={title}
      >
        <span className="bg-accent animate-blip absolute inline-flex h-full w-full rounded-full opacity-75 [body:has([data-slot=drawer-popup])_&]:[animation-play-state:paused]"></span>
        <span className="bg-accent relative inline-flex size-2.5 rounded-full"></span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black/20 opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
        <Drawer.Viewport className="fixed inset-0 z-100 flex items-end justify-center">
          <Drawer.Popup
            className="z-100 -mb-[3rem] max-h-[calc(80vh+3rem)] w-full [transform:translateY(var(--drawer-swipe-movement-y))] touch-auto overflow-y-auto overscroll-contain rounded-t-2xl bg-gray-50 px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] text-gray-900 outline-1 outline-gray-200 transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:[transform:translateY(calc(100%-3rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:[transform:translateY(calc(100%-3rem))] data-[swiping]:select-none dark:outline-gray-300"
            data-slot="drawer-popup"
          >
            <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-gray-300" />
            <Drawer.Content className="mx-auto w-full max-w-[32rem]">
              <Drawer.Description className="text-muted-foreground text-xxs mb-2 text-center font-mono tracking-widest uppercase">
                {description}
              </Drawer.Description>
              <Drawer.Title className="mb-5 text-center text-sm font-medium">
                {title}
              </Drawer.Title>
              <a
                href={link}
                className="bg-accent flex h-10 items-center justify-center gap-2 rounded-full text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop{" "}
                <ShoppingBagIcon
                  className="size-3 translate-y-px"
                  aria-hidden="true"
                />
              </a>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
