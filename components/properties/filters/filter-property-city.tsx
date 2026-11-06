"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { useListingQuery } from "@/components/properties/filters/listing-query-provider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFilterOptions } from "@/types/property";

type FilterPropertyCityProps = {
  cities: PropertyFilterOptions["cities"];
};

export default function FilterPropertyCity({ cities }: FilterPropertyCityProps) {
  const { searchParams, updateQuery } = useListingQuery();
  const [search, setSearch] = useState("");

  const urlCities = searchParams.getAll("city");
  const selectedCities = cities.filter((city) => urlCities.includes(city));

  const query = search.trim().toLowerCase();
  const visibleCities = cities.filter((city) => city.toLowerCase().includes(query));

  return (
    <AccordionItem value="city">
      <AccordionTrigger>Location</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-6">
        <div className="relative">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            aria-label="Search"
            autoComplete="off"
            className="pr-11"
          />
          <SearchIcon
            aria-hidden
            className="text-grey/60 pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
          />
        </div>

        <CheckboxGroup
          aria-label="City"
          value={selectedCities}
          onValueChange={(city) => updateQuery({ city })}
          className="flex flex-col gap-6"
        >
          {visibleCities.map((city) => (
            <Label key={city}>
              <Checkbox value={city} />
              {city}
            </Label>
          ))}
          {visibleCities.length === 0 && <p className="text-grey">No cities found</p>}
        </CheckboxGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
