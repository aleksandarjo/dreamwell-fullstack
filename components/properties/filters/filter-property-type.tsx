"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";

import { useListingQuery } from "@/components/properties/filters/listing-query-provider";
import type { PropertyFilterOptions } from "@/types/property";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FilterPropertyTypeProps = {
  propertyTypes: PropertyFilterOptions["propertyTypes"];
};

export default function FilterPropertyType({ propertyTypes }: FilterPropertyTypeProps) {
  const { searchParams, updateQuery } = useListingQuery();

  const urlTypes = searchParams.getAll("type");
  const selectedTypes = propertyTypes.filter((propertyType) => urlTypes.includes(propertyType));

  return (
    <AccordionItem value="type">
      <AccordionTrigger>Type</AccordionTrigger>
      <AccordionContent>
        <CheckboxGroup
          aria-label="Property type"
          value={selectedTypes}
          onValueChange={(type) => updateQuery({ type })}
          className="flex flex-col gap-6"
        >
          {propertyTypes.map((propertyType) => (
            <Label key={propertyType}>
              <Checkbox value={propertyType} />
              <span className="capitalize">{propertyType}</span>
            </Label>
          ))}
        </CheckboxGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
