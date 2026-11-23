"use client";

import { AttributionControl, MapLibreMap, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href);

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

type PropertyMapProps = {
  latitude: number;
  longitude: number;
  label: string;
  variant: "embedded" | "expanded";
  className?: string;
};

function createMarkerElement() {
  const marker = document.createElement("div");
  const halo = document.createElement("span");
  const dot = document.createElement("span");

  marker.className = "relative flex size-12 items-center justify-center";
  halo.className = "bg-primary/25 absolute inset-0 rounded-full";
  dot.className = "bg-primary relative size-3.5 rounded-full ring-3 ring-white";
  marker.append(halo, dot);

  return marker;
}

export default function PropertyMap({ latitude, longitude, label, variant, className }: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const isExpanded = variant === "expanded";
    const map = new MapLibreMap({
      container,
      style: MAP_STYLE_URL,
      center: [longitude, latitude],
      zoom: isExpanded ? 15 : 14,
      maxZoom: 18,
      attributionControl: false,
      scrollZoom: isExpanded,
      cooperativeGestures: !isExpanded,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      locale: { "Map.Title": label },
    });

    map.addControl(new AttributionControl(), "top-right");
    map.touchZoomRotate.disableRotation();
    map.keyboard.disableRotation();

    if (isExpanded) {
      map.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    }

    new Marker({ element: createMarkerElement() }).setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove();
  }, [latitude, longitude, label, variant]);

  return <div ref={containerRef} className={cn("bg-light-grey isolate", className)} />;
}
