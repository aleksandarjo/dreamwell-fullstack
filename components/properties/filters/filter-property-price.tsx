import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FilterPropertyPrice() {
  return (
    <AccordionItem value="price">
      <AccordionTrigger>Price</AccordionTrigger>
      <AccordionContent className="grid grid-cols-2 gap-5">
        <Label className="text-grey flex-col items-start gap-2">
          Min Price
          <Input type="number" min={0} placeholder="$1,000" />
        </Label>
        <Label className="text-grey flex-col items-start gap-2">
          Max Price
          <Input type="number" min={0} placeholder="$390,000" />
        </Label>
      </AccordionContent>
    </AccordionItem>
  );
}
