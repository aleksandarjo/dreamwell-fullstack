import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectFieldLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { GridIcon, ListIcon } from "@/constants/icons";
import type { SortOption } from "@/lib/queries/property.queries";

type ListingToolbarProps = {
  total?: number;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function ListingToolbar({ total }: ListingToolbarProps) {
  return (
    <div className="mb-10">
      <div className="flex items-start gap-2">
        <h1 className="title-section text-dark-blue">Property Listing</h1>
        {total === undefined ? (
          <Skeleton className="mt-1 h-6 w-10" />
        ) : (
          <p className="text-grey text-xl">
            {total}
            <span className="sr-only"> properties total</span>
          </p>
        )}
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <Select items={SORT_OPTIONS} value="newest">
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

        <div role="group" aria-label="Listing view" className="flex items-center gap-1">
          <Button variant="ghost" aria-label="List view" aria-pressed="true" className="size-10">
            <ListIcon className="[&_path]:fill-primary size-6.25" />
          </Button>
          <Button variant="ghost" aria-label="Grid view" aria-pressed="false" className="size-10 disabled:opacity-100">
            <GridIcon className="size-6.25" />
          </Button>
        </div>
      </div>
    </div>
  );
}
