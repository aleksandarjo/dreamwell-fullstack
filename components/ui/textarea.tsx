import * as React from "react";
import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-grey-light placeholder:text-grey/60 focus-visible:border-primary focus-visible:ring-primary/50 flex field-sizing-content min-h-24 w-full rounded-lg border bg-transparent px-4 py-3 text-base text-black transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#ef4444] aria-invalid:ring-3 aria-invalid:ring-[#ef4444]/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
