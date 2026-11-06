"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import { useListingQuery } from "@/components/properties/filters/listing-query-provider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PriceInputProps = {
  name: "minPrice" | "maxPrice";
  label: string;
  placeholder: string;
};

function PriceInput({ name, label, placeholder }: PriceInputProps) {
  const { searchParams, updateQuery } = useListingQuery();

  // null means "not editing", so the input shows the URL and follows Back/Forward.
  const [draft, setDraft] = useState<string | null>(null);

  const urlValue = searchParams.get(name) ?? "";
  const savedValue = /^\d+$/.test(urlValue) ? urlValue : "";

  function commit() {
    if (draft !== null && draft !== savedValue) updateQuery({ [name]: draft || null });
    setDraft(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commit();
  }

  return (
    <Label className="text-grey flex-col items-start gap-2">
      {label}
      <Input
        type="number"
        min={0}
        placeholder={placeholder}
        value={draft ?? savedValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    </Label>
  );
}

export default function FilterPropertyPrice() {
  return (
    <AccordionItem value="price">
      <AccordionTrigger>Price</AccordionTrigger>
      <AccordionContent className="grid grid-cols-2 gap-5">
        <PriceInput name="minPrice" label="Min Price" placeholder="$1,000" />
        <PriceInput name="maxPrice" label="Max Price" placeholder="$390,000" />
      </AccordionContent>
    </AccordionItem>
  );
}
