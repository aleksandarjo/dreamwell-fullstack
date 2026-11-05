import { CheckboxGroup } from "@base-ui/react/checkbox-group";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { BedroomOption } from "@/lib/queries/property.queries";

const BEDROOM_OPTIONS: BedroomOption[] = [1, 2, 3, "4+"];

export default function FilterPropertyBedroom() {
  return (
    <AccordionItem value="bedroom">
      <AccordionTrigger>Bedroom</AccordionTrigger>
      <AccordionContent>
        <CheckboxGroup aria-label="Bedrooms" className="flex flex-col gap-6">
          {BEDROOM_OPTIONS.map((bedroom) => (
            <Label key={bedroom}>
              <Checkbox value={String(bedroom)} />
              {bedroom}
            </Label>
          ))}
        </CheckboxGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
