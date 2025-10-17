import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "motion/react";

export default function Hovercard({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const hovercard = Ariakit.useHovercardStore();
  const mounted = Ariakit.useStoreState(hovercard, "mounted");

  return (
    <Ariakit.HovercardProvider store={hovercard}>
      <Ariakit.HovercardAnchor href={href} className="link">
        {children}
      </Ariakit.HovercardAnchor>
      <AnimatePresence>
        {mounted && (
          <Ariakit.Hovercard
            alwaysVisible
            overlap
            portal
            gutter={8}
            className="ring-border z-50 w-2xs origin-[var(--popover-transform-origin)] overflow-hidden rounded-lg bg-white ring ring-black/10 ring-inset"
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
            }
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src="/img/matt-spade-001.jpg"
                alt=""
                className="absolute size-full object-cover"
              />
            </div>
            <div className="p-4 text-sm">
              <Ariakit.HovercardHeading className="font-medium">
                {children}
              </Ariakit.HovercardHeading>
              <p className="text-muted-foreground line-clamp-2">
                The new Moccamaster KBGV Select makes it easy to brew either a
                half or full carafe of your favorite coffee. With its sleek
                design and user-friendly features, it's perfect for any coffee
                lover.
              </p>
              <div className="mt-2">
                <a
                  href={href}
                  className="group/link bg-accent text-primary flex h-8 items-center justify-center gap-x-2 rounded-sm font-medium"
                >
                  Purchase
                </a>
              </div>
            </div>
          </Ariakit.Hovercard>
        )}
      </AnimatePresence>
    </Ariakit.HovercardProvider>
  );
}
