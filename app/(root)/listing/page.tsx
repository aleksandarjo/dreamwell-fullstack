import { Suspense } from "react";

import PropertyFilters from "@/components/properties/filters/property-filters";
import PropertyListing, { PropertyListingSkeleton } from "@/components/properties/listing/property-listing";
import { getPropertyFilterOptions } from "@/lib/queries/property.queries";
import { listingSearchParamsSchema } from "@/lib/validations";

async function ListingFilters() {
  const options = await getPropertyFilterOptions();

  return <PropertyFilters options={options} />;
}

async function ListingResults({ searchParams }: Pick<PageProps<"/listing">, "searchParams">) {
  const { sortBy, type, status, city, page, ...rest } = listingSearchParamsSchema.parse(await searchParams);
  const filters = { propertyTypes: type, listingType: status, cities: city, ...rest };

  return (
    <Suspense key={JSON.stringify([sortBy, filters, page])} fallback={<PropertyListingSkeleton sortBy={sortBy} />}>
      <PropertyListing sortBy={sortBy} filters={filters} page={page} />
    </Suspense>
  );
}

export default function ListingPage({ searchParams }: PageProps<"/listing">) {
  return (
    <div className="container grid grid-cols-[370px_1fr] gap-17.5">
      <Suspense fallback={<div className="bg-light-grey" />}>
        <ListingFilters />
      </Suspense>

      <div className="w-full">
        <Suspense fallback={<PropertyListingSkeleton />}>
          <ListingResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
