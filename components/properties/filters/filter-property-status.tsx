"use client";

import { useListingQuery } from "@/components/properties/filters/listing-query-provider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyFilterOptions } from "@/types/property";

type FilterPropertyStatusProps = {
  listingTypes: PropertyFilterOptions["listingTypes"];
};

const ALL_STATUSES = "all";

export default function FilterPropertyStatus({ listingTypes }: FilterPropertyStatusProps) {
  const { searchParams, updateQuery } = useListingQuery();

  const statusOptions = [ALL_STATUSES, ...listingTypes];
  const urlStatus = searchParams.get("status");
  const selectedStatus = statusOptions.find((status) => status === urlStatus) ?? ALL_STATUSES;

  return (
    <AccordionItem value="status">
      <AccordionTrigger>Status</AccordionTrigger>
      <AccordionContent>
        <RadioGroup
          aria-label="Listing status"
          value={selectedStatus}
          onValueChange={(status) => updateQuery({ status: status === ALL_STATUSES ? null : status })}
          className="gap-6"
        >
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
