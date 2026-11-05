import PropertySortSelect from "@/components/properties/listing/property-sort-select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GridIcon, ListIcon } from "@/constants/icons";
import type { SortOption } from "@/lib/queries/property.queries";

type ListingToolbarProps = {
  total?: number;
  /** Omitted in the static shell, where the URL isn't known yet. */
  sortBy?: SortOption;
};

export default function ListingToolbar({ total, sortBy }: ListingToolbarProps) {
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
        {sortBy ? (
          <PropertySortSelect sortBy={sortBy} />
        ) : (
          <div className="flex items-center gap-5">
            <span className="text-grey text-sm">Sort by</span>
            <Skeleton className="h-12 w-45 rounded-lg" />
          </div>
        )}

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
