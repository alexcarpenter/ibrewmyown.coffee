import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@nanostores/react";
import { getProductStore } from "../stores/products";
import { Skeleton } from "./skeleton.react";
import { ShoppingBagIcon } from "lucide-react";

export default function Productcard({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const hovercard = Ariakit.useHovercardStore();
  const mounted = Ariakit.useStoreState(hovercard, "mounted");

  const { store } = getProductStore(id);
  const { data: product, loading } = useStore(store);

  return (
    <Ariakit.HovercardProvider store={hovercard}>
      <Ariakit.HovercardAnchor
        className="link group inline-block pr-4"
        href={product?.data.link}
      >
        {children}{" "}
        <ShoppingBagIcon
          className="text-secondary group-hover:text-primary absolute ml-1 inline-flex h-[1lh] w-3 flex-none items-center"
          aria-hidden
        />
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
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              />
            }
          >
            {loading && (
              <>
                <Skeleton className="aspect-[3/2] rounded-none" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1 h-5 w-full" />
                  <Skeleton className="mt-2 h-8 w-full" />
                </div>
              </>
            )}
            {product && !loading && (
              <>
                {product.data.img ? (
                  <div className="relative aspect-[3/2] overflow-hidden border-b border-black/10">
                    <img
                      src={product.data.img}
                      alt={product.data.title}
                      className="absolute size-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="text-muted-foreground font-mono text-xs uppercase">
                    {product.data.description}
                  </p>
                  <Ariakit.HovercardHeading className="mt-1 text-sm font-medium">
                    {product.data.title}
                  </Ariakit.HovercardHeading>
                  <div className="mt-2">
                    <a
                      href={product.data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link bg-accent text-primary flex h-8 items-center justify-center gap-x-2 rounded-sm font-medium"
                    >
                      Purchase
                    </a>
                  </div>
                </div>
              </>
            )}
          </Ariakit.Hovercard>
        )}
      </AnimatePresence>
    </Ariakit.HovercardProvider>
  );
}
