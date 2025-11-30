import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef } from "react";

interface TooltipAnchorProps extends Ariakit.TooltipAnchorProps {
  description: string;
  href: string;
  src: string;
  alt: string;
}

export const TooltipAnchor = forwardRef<HTMLDivElement, TooltipAnchorProps>(
  function TooltipAnchor({ description, src, alt, href, ...props }, ref) {
    const tooltip = Ariakit.useTooltipStore();
    const mounted = Ariakit.useStoreState(tooltip, "mounted");

    // We move the tooltip up or down depending on the current placement.
    const y = Ariakit.useStoreState(tooltip, (state) => {
      const dir = state.currentPlacement.split("-")[0]!;
      return dir === "top" ? 2 : -2;
    });

    return (
      <Ariakit.TooltipProvider store={tooltip} hideTimeout={250}>
        <Ariakit.TooltipAnchor
          className="relative rounded-lg overflow-hidden shadow-sm ring-1 ring-black/10 bg-white aspect-square flex items-center justify-center"
          render={
            <a href={href}>
              <img src={src} alt={alt} />
            </a>
          }
          {...props}
          ref={ref}
        />
        <AnimatePresence>
          {mounted && (
            <Ariakit.Tooltip
              gutter={4}
              alwaysVisible
              className="text-sm bg-primary text-primary-foreground px-2 py-1 inline-flex items-center rounded-md max-w-64"
              render={
                <motion.div
                  initial={{ opacity: 0, y }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0 }}
                />
              }
            >
              <Ariakit.TooltipArrow />
              {description}
            </Ariakit.Tooltip>
          )}
        </AnimatePresence>
      </Ariakit.TooltipProvider>
    );
  }
);
