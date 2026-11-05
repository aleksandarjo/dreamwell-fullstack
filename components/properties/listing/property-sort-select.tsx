"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectFieldLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/lib/queries/property.queries";
import { updateUrlQuery } from "@/lib/url";
import { DEFAULT_SORT, SORT_OPTIONS } from "@/constants";

type PropertySortSelectProps = {
  sortBy: SortOption;
};

export default function PropertySortSelect({ sortBy }: PropertySortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSortChange(value: SortOption | null) {
    if (!value || value === sortBy) return;

    const url = updateUrlQuery({
      pathname,
      params: searchParams.toString(),
      updates: { sortBy: value === DEFAULT_SORT ? null : value },
      keysToRemove: ["page"],
    });

    router.push(url);
  }

  return (
    <Select items={SORT_OPTIONS} value={sortBy} onValueChange={handleSortChange}>
      <div className="flex items-center gap-5">
        <SelectFieldLabel>Sort by</SelectFieldLabel>
        <SelectTrigger className="w-45">
          <SelectValue />
        </SelectTrigger>
      </div>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {SORT_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
