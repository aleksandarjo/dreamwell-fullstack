"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import ScheduleTourForm from "@/components/properties/details/schedule-tour-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { OPEN_SCHEDULE_TOUR_EVENT, SCHEDULE_TOUR_SECTION_ID } from "@/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { tourRequestSchema, type TourRequest, type TourRequestInput } from "@/lib/validations";

const DESKTOP_QUERY = "(min-width: 1280px)";
const HIGHLIGHT_DURATION_MS = 1600;

export default function ScheduleTour() {
  const headingId = useId();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [highlightCount, setHighlightCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const dateTriggerRef = useRef<HTMLButtonElement>(null);

  const form = useForm<TourRequestInput, unknown, TourRequest>({
    resolver: zodResolver(tourRequestSchema),
    mode: "onTouched",
    defaultValues: { date: "", time: "", name: "", phone: "", email: "", message: "" },
  });

  useEffect(() => {
    if (highlightCount === 0) return;

    const timeout = setTimeout(() => setHighlightCount(0), HIGHLIGHT_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [highlightCount]);

  useEffect(() => {
    function handleOpen() {
      if (!window.matchMedia(DESKTOP_QUERY).matches) {
        setIsDrawerOpen(true);
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      dateTriggerRef.current?.focus({ preventScroll: true });
      setHighlightCount((count) => count + 1);
    }

    window.addEventListener(OPEN_SCHEDULE_TOUR_EVENT, handleOpen);

    return () => window.removeEventListener(OPEN_SCHEDULE_TOUR_EVENT, handleOpen);
  }, []);

  return (
    <aside
      ref={sectionRef}
      id={SCHEDULE_TOUR_SECTION_ID}
      aria-labelledby={headingId}
      className="scroll-mt-5 xl:sticky xl:top-5 xl:self-start"
    >
      {isDesktop ? (
        <div
          className={cn(
            "shadow-main rounded-[15px] bg-white px-12.5 pt-17 pb-22.5 ring-0 ring-transparent motion-safe:transition-shadow motion-safe:duration-500",
            highlightCount > 0 && "ring-primary/40 ring-4"
          )}
        >
          <h2 id={headingId} className="text-dark-blue text-2xl font-semibold">
            Schedule a Tour
          </h2>
          <div className="mt-5">
            <ScheduleTourForm form={form} dateTriggerRef={dateTriggerRef} />
          </div>
        </div>
      ) : (
        <div className="shadow-main rounded-[15px] bg-white px-4 py-6 sm:px-10 sm:py-12 xl:hidden">
          <h2 id={headingId} className="text-dark-blue text-xl font-semibold sm:text-2xl">
            Schedule a Tour
          </h2>
          <p className="text-grey sm:paragraph mt-2 text-sm">
            Choose a preferred date and time to visit this property.
          </p>

          <Drawer open={isDrawerOpen && !isDesktop} onOpenChange={setIsDrawerOpen} showSwipeHandle>
            <DrawerTrigger
              render={<Button className="shadow-button-primary mt-5 h-12 w-full text-base font-semibold sm:mt-6" />}
            >
              Schedule a Tour
            </DrawerTrigger>
            <DrawerContent
              initialFocus={(openType) => (openType === "touch" ? true : (dateTriggerRef.current ?? true))}
            >
              <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col">
                <DrawerHeader className="relative pr-14 group-data-[swipe-axis=y]/drawer-popup:text-left">
                  <DrawerTitle>Schedule a Tour</DrawerTitle>
                  <DrawerDescription>Choose a preferred date and time for your visit.</DrawerDescription>
                  <DrawerClose render={<Button variant="ghost" className="absolute top-1 right-2 size-11" />}>
                    <XIcon aria-hidden className="size-5" />
                    <span className="sr-only">Close</span>
                  </DrawerClose>
                </DrawerHeader>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-8">
                  <ScheduleTourForm form={form} dateTriggerRef={dateTriggerRef} />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </aside>
  );
}
