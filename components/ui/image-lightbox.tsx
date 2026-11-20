"use client";

import Image from "next/image";
import Lightbox, {
  isImageSlide,
  useLightboxState,
  type ContainerRect,
  type ImageFit,
  type Slide,
} from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export type ImageLightboxSlide = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  slides: ImageLightboxSlide[];
  index: number;
  open: boolean;
  onClose: () => void;
};

type LightboxImageProps = {
  slide: Slide;
  rect: ContainerRect;
  imageFit: ImageFit;
  className?: string;
};

function LightboxImage({ slide, rect, imageFit, className }: LightboxImageProps) {
  if (!isImageSlide(slide)) return undefined;

  return (
    <div className={cn("relative", className)} style={{ width: rect.width, height: rect.height }}>
      <Image
        fill
        src={slide.src}
        alt={slide.alt ?? ""}
        loading="eager"
        draggable={false}
        sizes={`${Math.ceil((rect.width / window.innerWidth) * 100)}vw`}
        className={imageFit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );
}

function LightboxThumbnail(props: LightboxImageProps) {
  const { currentSlide } = useLightboxState();
  const isCurrent = isImageSlide(props.slide) && currentSlide?.src === props.slide.src;

  return (
    <LightboxImage
      {...props}
      className={cn("transition-opacity duration-300", isCurrent ? "opacity-100" : "opacity-40 hover:opacity-75")}
    />
  );
}

export default function ImageLightbox({ slides, index, open, onClose }: ImageLightboxProps) {
  const showThumbnails = useMediaQuery("(min-width: 768px)");
  const hasMultipleSlides = slides.length > 1;

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      className="[--yarl__thumbnails_thumbnail_active_border_color:var(--color-primary)] [--yarl__thumbnails_thumbnail_border_color:transparent]"
      plugins={showThumbnails ? [Counter, Thumbnails] : [Counter]}
      carousel={{ finite: !hasMultipleSlides }}
      thumbnails={{ imageFit: "cover" }}
      render={{
        slide: ({ slide, rect }) => <LightboxImage slide={slide} rect={rect} imageFit="contain" />,
        thumbnail: ({ slide, rect, imageFit }) => <LightboxThumbnail slide={slide} rect={rect} imageFit={imageFit} />,
        ...(!hasMultipleSlides && { buttonPrev: () => null, buttonNext: () => null }),
      }}
    />
  );
}
