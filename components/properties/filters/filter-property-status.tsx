import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyFilterOptions } from "@/types/property";

type FilterPropertyStatusProps = {
  listingTypes: PropertyFilterOptions["listingTypes"];
};

export default function FilterPropertyStatus({ listingTypes }: FilterPropertyStatusProps) {
  const statusOptions = ["all", ...listingTypes];

  return (
    <AccordionItem value="status">
      <AccordionTrigger>Status</AccordionTrigger>
      <AccordionContent>
        <RadioGroup aria-label="Listing status" defaultValue="all" className="gap-6">
          {statusOptions.map((status) => (
            <Label key={status}>
              <RadioGroupItem value={status} />
              <span className="capitalize">{status}</span>
            </Label>
          ))}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}
