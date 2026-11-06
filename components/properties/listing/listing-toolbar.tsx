import { PropertyFiltersTrigger } from "@/components/properties/filters/property-filters-sheet";
import ListingViewToggle from "@/components/properties/listing/listing-view-toggle";
import PropertySortSelect from "@/components/properties/listing/property-sort-select";
import { Skeleton } from "@/components/ui/skeleton";
import type { SortOption } from "@/lib/queries/property.queries";
import type { ListingView } from "@/types/property";

type ListingToolbarProps = {
  total?: number;
  /** Omitted in the static shell, where the URL isn't known yet. */
  sortBy?: SortOption;
  view?: ListingView;
};

export default function ListingToolbar({ total, sortBy, view }: ListingToolbarProps) {
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

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <PropertyFiltersTrigger />

        {sortBy ? (
          <PropertySortSelect sortBy={sortBy} />
        ) : (
          <div className="flex items-center gap-5">
            <span className="text-grey text-sm">Sort by</span>
            <Skeleton className="h-12 w-45 rounded-lg" />
          </div>
        )}

        <div className="ml-auto hidden xl:block">
          {view ? <ListingViewToggle view={view} /> : <Skeleton className="h-10 w-21 rounded-lg" />}
        </div>
      </div>
    </div>
  );
}
