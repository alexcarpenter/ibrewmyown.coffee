import { Tooltip } from "@base-ui/react/tooltip";
import {
  ProductBlipTooltip,
  type ProductBlipData,
} from "./product-blip-tooltip.react";
import { ProductBlipDrawer } from "./product-blip-drawer.react";

type GallerySlideProps = {
  src: string;
  alt: string;
  loading: "eager" | "lazy";
  products?: ProductBlipData[];
};

export default function GallerySlide({
  src,
  alt,
  loading,
  products,
}: GallerySlideProps) {
  return (
    <div className="relative size-full">
      <img
        src={src}
        width={1600}
        height={900}
        alt={alt}
        loading={loading}
        className="size-full rounded-lg object-cover"
      />
      {products && products.length > 0 && (
        <Tooltip.Provider delay={0} closeDelay={200}>
          {products.map((product, i) => (
            <>
              <ProductBlipTooltip {...product} />
              <ProductBlipDrawer {...product} />
            </>
          ))}
        </Tooltip.Provider>
      )}
    </div>
  );
}
