"use client";

import { ImagesIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ImageLightbox = dynamic(() => import("@/components/ui/image-lightbox"), { ssr: false });

const MAIN_IMAGE_SIZES = "(min-width: 1620px) 1067px, (min-width: 768px) 66vw, 100vw";
const FULL_WIDTH_IMAGE_SIZES = "(min-width: 1620px) 1620px, 100vw";
const SIDE_IMAGE_SIZES = "(min-width: 1620px) 533px, (min-width: 768px) 33vw, 50vw";
const SINGLE_SIDE_IMAGE_SIZES = "(min-width: 1620px) 533px, (min-width: 768px) 33vw, 100vw";

type PropertyGalleryProps = {
  title: string;
  imageUrls: string[];
};

type GalleryTileProps = {
  src: string;
  alt: string;
  label: string;
  sizes: string;
  className: string;
  isMain?: boolean;
  onOpen: () => void;
  children?: ReactNode;
};

function GalleryTile({ src, alt, label, sizes, className, isMain, onOpen, children }: GalleryTileProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onOpen}
      className={cn(
        "group focus-visible:ring-primary/50 relative cursor-pointer overflow-hidden rounded-xl outline-none focus-visible:ring-3",
        className
      )}
    >
      <Image
        fill
        src={src}
        alt={alt}
        sizes={sizes}
        loading="eager"
        fetchPriority={isMain ? "high" : undefined}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {children}
    </button>
  );
}

export default function PropertyGallery({ title, imageUrls }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLightboxLoaded, setIsLightboxLoaded] = useState(false);

  if (imageUrls.length === 0) return null;

  const [mainImageUrl, ...otherImageUrls] = imageUrls;
  const sideImageUrls = otherImageUrls.slice(0, 2);
  const hasSingleSideImage = sideImageUrls.length === 1;
  const hiddenImageCount = otherImageUrls.length - sideImageUrls.length;
  const slides = imageUrls.map((src, index) => ({ src, alt: `${title} – photo ${index + 1}` }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxLoaded(true);
  };

  const getTileLabel = (index: number) => `Open photo ${index + 1} of ${imageUrls.length}`;

  return (
    <section
      aria-label="Property photos"
      className={cn(
        "relative grid grid-cols-2 gap-3 md:aspect-[1620/650] md:grid-rows-2 md:gap-5",
        sideImageUrls.length > 0 ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-1"
      )}
    >
      <GalleryTile
        src={mainImageUrl}
        alt={slides[0].alt}
        label={getTileLabel(0)}
        sizes={sideImageUrls.length > 0 ? MAIN_IMAGE_SIZES : FULL_WIDTH_IMAGE_SIZES}
        className="col-span-2 aspect-4/3 md:col-span-1 md:row-span-2 md:aspect-auto"
        isMain
        onOpen={() => openLightbox(0)}
      />

      {sideImageUrls.map((src, sideIndex) => {
        const index = sideIndex + 1;
        const showHiddenCount = sideIndex === 1 && hiddenImageCount > 0;

        return (
          <GalleryTile
            key={src}
            src={src}
            alt={slides[index].alt}
            label={getTileLabel(index)}
            sizes={hasSingleSideImage ? SINGLE_SIDE_IMAGE_SIZES : SIDE_IMAGE_SIZES}
            className={
              hasSingleSideImage
                ? "col-span-2 aspect-video md:col-span-1 md:row-span-2 md:aspect-auto"
                : "aspect-4/3 md:aspect-auto"
            }
            onOpen={() => openLightbox(index)}
          >
            {showHiddenCount && (
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-black/45 text-2xl font-semibold text-white md:hidden"
              >
                +{hiddenImageCount}
              </span>
            )}
          </GalleryTile>
        );
      })}

      {imageUrls.length > 1 && (
        <Button
          type="button"
          onClick={() => openLightbox(0)}
          className="shadow-button-primary absolute right-5 bottom-5 hidden h-12 gap-2.5 px-5 text-base md:inline-flex [&_svg:not([class*='size-'])]:size-5"
        >
          <ImagesIcon aria-hidden />
          See All Photos
        </Button>
      )}

      {isLightboxLoaded && (
        <ImageLightbox
          slides={slides}
          index={lightboxIndex}
          open={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </section>
  );
}
