import { Suspense } from "react";

import PropertyFilters from "@/components/properties/filters/property-filters";
import PropertyListing, { PropertyListingSkeleton } from "@/components/properties/listing/property-listing";
import { getPropertyFilterOptions } from "@/lib/queries/property.queries";

async function ListingFilters() {
  const options = await getPropertyFilterOptions();

  return <PropertyFilters options={options} />;
}

export default function ListingPage() {
  return (
    <div className="container grid grid-cols-[370px_1fr] gap-17.5">
      <Suspense fallback={<div className="bg-light-grey" />}>
        <ListingFilters />
      </Suspense>

      <div className="w-full">
        <Suspense fallback={<PropertyListingSkeleton />}>
          <PropertyListing />
        </Suspense>
      </div>
    </div>
  );
}
