"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { createSheetHandle, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const filtersSheet = createSheetHandle();

export function PropertyFiltersTrigger() {
  return (
    <SheetTrigger
      id="property-filters-trigger"
      handle={filtersSheet}
      render={<Button variant="outline" className="h-12 gap-2 px-4 xl:hidden" />}
    >
      <SlidersHorizontalIcon aria-hidden className="text-primary size-5" />
      Filters
    </SheetTrigger>
  );
}

export default function PropertyFiltersSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet handle={filtersSheet}>
      <SheetContent side="left" className="bg-light-grey">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
