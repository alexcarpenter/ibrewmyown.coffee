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
            className="z-50 w-2xs origin-[var(--popover-transform-origin)] overflow-hidden rounded-lg border border-black/10 bg-white"
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
            <div className="relative aspect-video overflow-hidden border-b border-black/10">
              <img
                src="/img/products/fellow-opus.jpg"
                alt=""
                className="absolute size-full object-contain"
              />
            </div>
            <div className="p-4 text-sm">
              <p className="text-muted-foreground font-mono text-xs uppercase">
                Coffee Grinder
              </p>
              <Ariakit.HovercardHeading className="mt-1 font-medium">
                Fellow Opus Conical Burr Coffee Grinder
              </Ariakit.HovercardHeading>
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
