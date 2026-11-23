"use client";

import { ArrowRightIcon, MapPinIcon, SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const PropertyMap = dynamic(() => import("@/components/properties/details/property-map"), { ssr: false });

type PropertyLocationMapProps = {
  latitude: number;
  longitude: number;
  title: string;
};

export default function PropertyLocationMap({ latitude, longitude, title }: PropertyLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || isNearViewport) return;

    const observer = new IntersectionObserver(([entry]) => setIsNearViewport(entry.isIntersecting), {
      rootMargin: "400px",
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [isNearViewport]);

  const label = `Map showing the approximate location of ${title}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div>
      <div ref={containerRef} className="bg-light-grey relative h-64 overflow-hidden sm:h-80 md:h-112">
        {isNearViewport && (
          <PropertyMap
            latitude={latitude}
            longitude={longitude}
            label={label}
            variant="embedded"
            className="size-full"
          />
        )}

        <div className="absolute right-2 bottom-2 flex gap-2 sm:right-5 sm:bottom-5 sm:gap-2.5">
          <Dialog>
            <DialogTrigger
              aria-label="Expand property map"
              className="border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary/50 flex size-10 cursor-pointer items-center justify-center rounded-lg border bg-white transition-colors outline-none focus-visible:ring-3 sm:size-12"
            >
              <SearchIcon aria-hidden className="size-5" />
            </DialogTrigger>
            <DialogContent className="grid h-[min(85dvh,48rem)] w-[min(72rem,calc(100vw-2rem))] max-w-none grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-none">
              <div className="px-5 py-4 pr-16">
                <DialogTitle>Property location</DialogTitle>
                <DialogDescription className="mt-1">Approximate location of {title}</DialogDescription>
              </div>
              <PropertyMap
                latitude={latitude}
                longitude={longitude}
                label={label}
                variant="expanded"
                className="size-full"
              />
            </DialogContent>
          </Dialog>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              className: "shadow-button-primary h-10 gap-2 px-3 text-sm sm:h-12 sm:gap-2.5 sm:px-5 sm:text-base",
            })}
          >
            View in Google Maps
            <ArrowRightIcon aria-hidden className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
