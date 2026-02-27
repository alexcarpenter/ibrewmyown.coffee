import { PreviewCard } from "@base-ui/react/preview-card";
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
  const { store } = getProductStore(id);
  const { data: product, loading } = useStore(store);

  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        className="link group inline-block pr-4"
        href={product?.data.link}
        delay={200}
      >
        {children}{" "}
        <ShoppingBagIcon
          className="text-secondary group-hover:text-primary absolute ml-1 inline-flex h-[1lh] w-3 flex-none items-center"
          aria-hidden
        />
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner side="top" sideOffset={8}>
          <PreviewCard.Popup
            className="z-50 w-2xs overflow-hidden rounded-lg bg-white"
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeIn" }}
                style={{ transformOrigin: "var(--transform-origin)" }}
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
                  <div className="relative aspect-[3/2] overflow-hidden border-b border-black/5">
                    <img
                      src={product.data.img}
                      alt={product.data.title}
                      className="absolute size-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="text-muted-foreground text-xxs font-mono tracking-widest uppercase">
                    {product.data.description}
                  </p>
                  <h2 className="mt-1 text-sm font-medium">
                    {product.data.title}
                  </h2>
                  <div className="mt-2">
                    <a
                      href={product.data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link bg-accent text-foreground flex h-8 items-center justify-center gap-x-2 rounded-sm text-sm font-medium"
                    >
                      Purchase
                    </a>
                  </div>
                </div>
              </>
            )}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
