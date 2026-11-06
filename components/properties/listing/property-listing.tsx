import PropertyCard from "@/components/cards/property-card";
import PropertyCardSkeleton from "@/components/cards/property-card-skeleton";
import ListingToolbar from "@/components/properties/listing/listing-toolbar";
import DataRenderer from "@/components/shared/data-renderer";
import EmptyState from "@/components/shared/empty-state";
import UrlPagination from "@/components/shared/url-pagination";
import { DEFAULT_VIEW } from "@/constants";
import { EMPTY_PROPERTIES } from "@/constants/states";
import {
  DEFAULT_PAGE_SIZE,
  getProperties,
  type GetPropertiesOptions,
  type SortOption,
} from "@/lib/queries/property.queries";
import type { ListingView } from "@/types/property";

const LISTING_LAYOUTS = {
  grid: { className: "grid justify-items-center gap-5 xl:grid-cols-2 2xl:grid-cols-3", orientation: "vertical" },
  list: { className: "flex flex-col gap-5", orientation: "horizontal" },
} as const;

type PropertyListingProps = {
  sortBy: SortOption;
  filters: GetPropertiesOptions;
  page: number;
  view: ListingView;
};

export default async function PropertyListing({ sortBy, filters, page, view }: PropertyListingProps) {
  const { data: properties, total, page: currentPage, totalPages } = await getProperties({ ...filters, sortBy, page });
  const { className, orientation } = LISTING_LAYOUTS[view];

  return (
    <>
      <ListingToolbar total={total} sortBy={sortBy} view={view} />
      <DataRenderer
        data={properties}
        empty={<EmptyState {...EMPTY_PROPERTIES} />}
        render={(items) => (
          <div className={className}>
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} orientation={orientation} />
            ))}
          </div>
        )}
      />
      <UrlPagination page={currentPage} totalPages={totalPages} aria-label="Property listing pages" className="my-12" />
    </>
  );
}

export function PropertyListingSkeleton({ sortBy, view }: { sortBy?: SortOption; view?: ListingView }) {
  const { className, orientation } = LISTING_LAYOUTS[view ?? DEFAULT_VIEW];

  return (
    <>
      <ListingToolbar sortBy={sortBy} view={view} />
      <div aria-hidden className={className}>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <PropertyCardSkeleton key={index} orientation={orientation} />
        ))}
      </div>
    </>
  );
}
