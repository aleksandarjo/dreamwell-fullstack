import { CheckboxGroup } from "@base-ui/react/checkbox-group";

import type { PropertyFilterOptions } from "@/types/property";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FilterPropertyTypeProps = {
  propertyTypes: PropertyFilterOptions["propertyTypes"];
};

export default function FilterPropertyType({ propertyTypes }: FilterPropertyTypeProps) {
  return (
    <AccordionItem value="type">
      <AccordionTrigger>Type</AccordionTrigger>
      <AccordionContent>
        <CheckboxGroup aria-label="Property type" className="flex flex-col gap-6">
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
