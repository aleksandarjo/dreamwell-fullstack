"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { DEFAULT_VIEW } from "@/constants";
import { GridIcon, ListIcon } from "@/constants/icons";
import { updateUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";
import type { ListingView } from "@/types/property";

type ListingViewToggleProps = {
  view: ListingView;
};

const VIEW_OPTIONS = [
  { value: "list", label: "List view", icon: ListIcon },
  { value: "grid", label: "Grid view", icon: GridIcon },
] as const;

export default function ListingViewToggle({ view }: ListingViewToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeView, setActiveView] = useOptimistic(view);
  const [, startTransition] = useTransition();

  function handleViewChange(nextView: ListingView) {
    if (nextView === activeView) return;

    const url = updateUrlQuery({
      pathname,
      params: searchParams.toString(),
      updates: { view: nextView === DEFAULT_VIEW ? null : nextView },
    });

    startTransition(() => {
      setActiveView(nextView);
      router.push(url, { scroll: false });
    });
  }

  return (
    <div role="group" aria-label="Listing view" className="flex items-center">
      {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = value === activeView;

        return (
          <Button
            key={value}
            variant="ghost"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => handleViewChange(value)}
            className="hover:bg-transparent"
          >
            <Icon className={cn("size-6 [&_g]:opacity-100", isActive ? "[&_path]:fill-primary" : "opacity-10")} />
          </Button>
        );
      })}
    </div>
  );
}
