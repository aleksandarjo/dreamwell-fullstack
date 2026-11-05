import PropertyCard from "@/components/cards/property-card";
import PropertyCardSkeleton from "@/components/cards/property-card-skeleton";
import ListingToolbar from "@/components/properties/listing/listing-toolbar";
import DataRenderer from "@/components/shared/data-renderer";
import EmptyState from "@/components/shared/empty-state";
import { EMPTY_PROPERTIES } from "@/constants/states";
import { DEFAULT_PAGE_SIZE, getProperties } from "@/lib/queries/property.queries";

const LISTING_LAYOUT = "flex flex-col gap-5";

export default async function PropertyListing() {
  const { data: properties, total } = await getProperties();

  return (
    <>
      <ListingToolbar total={total} />
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

export function PropertyListingSkeleton() {
  return (
    <>
      <ListingToolbar />
      <div aria-hidden className={LISTING_LAYOUT}>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
