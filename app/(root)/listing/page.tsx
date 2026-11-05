import PropertyFilters from "@/components/properties/filters/property-filters";
import { getProperties, getPropertyFilterOptions } from "@/lib/queries/property.queries";

export default async function ListingPage() {
  const [listing, filterOptions] = await Promise.all([getProperties(), getPropertyFilterOptions()]);

  console.log(listing, filterOptions);

  return (
    <div className="container grid grid-cols-[370px_1fr] gap-17.5">
      <PropertyFilters options={filterOptions} />
      <div>
        <h1>Property Listing</h1>
        <p>sort criteria</p>
      </div>
    </div>
  );
}
