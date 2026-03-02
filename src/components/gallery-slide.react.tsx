import { Tooltip } from "@base-ui/react/tooltip";
import { ProductBlip, type ProductBlipData } from "./product-blip.react";

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
        <Tooltip.Provider>
          {products.map((product, i) => (
            <ProductBlip key={i} {...product} />
          ))}
        </Tooltip.Provider>
      )}
    </div>
  );
}
