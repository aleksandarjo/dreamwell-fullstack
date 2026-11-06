"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";

import { useListingQuery } from "@/components/properties/filters/listing-query-provider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BEDROOM_OPTIONS } from "@/constants";

const bedroomValues = BEDROOM_OPTIONS.map(String);

export default function FilterPropertyBedroom() {
  const { searchParams, updateQuery } = useListingQuery();

  const urlBedrooms = searchParams.getAll("bedrooms");
  const selectedBedrooms = bedroomValues.filter((bedroom) => urlBedrooms.includes(bedroom));

  return (
    <AccordionItem value="bedroom">
      <AccordionTrigger>Bedroom</AccordionTrigger>
      <AccordionContent>
        <CheckboxGroup
          aria-label="Bedrooms"
          value={selectedBedrooms}
          onValueChange={(bedrooms) => updateQuery({ bedrooms })}
          className="flex flex-col gap-6"
        >
          {bedroomValues.map((bedroom) => (
            <Label key={bedroom}>
              <Checkbox value={bedroom} />
              {bedroom}
            </Label>
          ))}
        </CheckboxGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
