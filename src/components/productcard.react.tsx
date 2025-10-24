import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@nanostores/react";
import { getProductStore, fetchProduct } from "../stores/products";
import { Skeleton } from "./skeleton.react";
import { useEffect } from "react";

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

  useEffect(() => {
    if (mounted) {
      fetchProduct(id);
    }
  }, [mounted, id]);

  return (
    <Ariakit.HovercardProvider store={hovercard}>
      <Ariakit.HovercardAnchor className="link" href={product?.data.link}>
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
            {loading && (
              <>
                <Skeleton className="aspect-video rounded-none" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1 h-5 w-full" />
                  <Skeleton className="mt-2 h-8 w-full" />
                </div>
              </>
            )}
            {product && !loading && (
              <>
                <div className="relative aspect-video overflow-hidden border-b border-black/10">
                  <img
                    // src={`/img/products/${id}.jpg`}
                    src="/img/alex-carpenter-002.jpg"
                    alt={product.data.title}
                    className="absolute size-full object-cover"
                  />
                </div>
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
