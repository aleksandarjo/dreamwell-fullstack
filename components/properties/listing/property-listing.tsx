import PropertyCard from "@/components/cards/property-card";
import PropertyCardSkeleton from "@/components/cards/property-card-skeleton";
import ListingToolbar from "@/components/properties/listing/listing-toolbar";
import DataRenderer from "@/components/shared/data-renderer";
import EmptyState from "@/components/shared/empty-state";
import { EMPTY_PROPERTIES } from "@/constants/states";
import {
  DEFAULT_PAGE_SIZE,
  getProperties,
  type GetPropertiesOptions,
  type SortOption,
} from "@/lib/queries/property.queries";

const LISTING_LAYOUT = "flex flex-col gap-5";

type PropertyListingProps = {
  sortBy: SortOption;
  filters: GetPropertiesOptions;
};

export default async function PropertyListing({ sortBy, filters }: PropertyListingProps) {
  const { data: properties, total } = await getProperties({ ...filters, sortBy });

  return (
    <>
      <ListingToolbar total={total} sortBy={sortBy} />
      <DataRenderer
        data={properties}
        empty={<EmptyState {...EMPTY_PROPERTIES} />}
        render={(items) => (
          <div className={LISTING_LAYOUT}>
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} orientation="horizontal" />
            ))}
          </div>
        )}
      />
    </>
  );
}

export function PropertyListingSkeleton({ sortBy }: { sortBy?: SortOption }) {
  return (
    <>
      <ListingToolbar sortBy={sortBy} />
      <div aria-hidden className={LISTING_LAYOUT}>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
