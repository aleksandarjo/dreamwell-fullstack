import FilterPropertyBedroom from "@/components/properties/filters/filter-property-bedroom";
import FilterPropertyCity from "@/components/properties/filters/filter-property-city";
import FilterPropertyPrice from "@/components/properties/filters/filter-property-price";
import FilterPropertyStatus from "@/components/properties/filters/filter-property-status";
import FilterPropertyType from "@/components/properties/filters/filter-property-type";
import ListingQueryProvider from "@/components/properties/filters/listing-query-provider";
import PropertyFiltersSheet from "@/components/properties/filters/property-filters-sheet";
import { Accordion } from "@/components/ui/accordion";
import type { PropertyFilterOptions } from "@/types/property";

type PropertyFiltersProps = {
  options: PropertyFilterOptions;
};

const FILTER_SECTIONS = ["type", "status", "city", "bedroom", "price"];

export default function PropertyFilters({ options }: PropertyFiltersProps) {
  const filters = (
    <Accordion multiple keepMounted defaultValue={FILTER_SECTIONS} className="gap-8 *:not-last:pb-2.5">
      <FilterPropertyType propertyTypes={options.propertyTypes} />
      <FilterPropertyStatus listingTypes={options.listingTypes} />
      <FilterPropertyCity cities={options.cities} />
      <FilterPropertyBedroom />
      <FilterPropertyPrice />
    </Accordion>
  );

  return (
    <ListingQueryProvider>
      <aside aria-label="Property filters" className="bg-light-grey hidden max-h-fit p-10 xl:block">
        {filters}
      </aside>
      <PropertyFiltersSheet>{filters}</PropertyFiltersSheet>
    </ListingQueryProvider>
  );
}
