"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

const createSheetHandle = SheetPrimitive.createHandle;

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

type SheetContentProps = SheetPrimitive.Popup.Props & {
  side?: "right" | "left";
};

function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal data-slot="sheet-portal">
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-50 flex w-11/12 flex-col bg-white shadow-lg transition duration-200 ease-in-out outline-none data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=left]:left-0 data-[side=left]:data-ending-style:-translate-x-10 data-[side=left]:data-starting-style:-translate-x-10 data-[side=right]:right-0 data-[side=right]:data-ending-style:translate-x-10 data-[side=right]:data-starting-style:translate-x-10 sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        <SheetClose render={<Button variant="ghost" className="absolute top-2 right-2 size-11" />}>
          <XIcon aria-hidden className="size-5" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex items-center py-4 pr-14 pl-6", className)} {...props} />;
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-golos text-dark-blue text-xl font-semibold", className)}
      {...props}
    />
  );
}

export { createSheetHandle, Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger };
