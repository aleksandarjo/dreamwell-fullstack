import type { CSSProperties } from "react";

import { LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS } from "@/constants";
import { cn, formatArea, formatPrice } from "@/lib/utils";
import type { PropertyDetails } from "@/types/property";

type PropertySpecsProps = {
  property: Pick<
    PropertyDetails,
    | "propertyType"
    | "listingType"
    | "price"
    | "areaSqft"
    | "yearBuilt"
    | "bedrooms"
    | "bathrooms"
    | "garageSpaces"
    | "garageAreaSqft"
  >;
  className?: string;
};

type PropertySpec = {
  label: string;
  value: string;
};

function formatCount(count: number) {
  return count.toLocaleString("en-US");
}

function getPropertySpecs(property: PropertySpecsProps["property"]): PropertySpec[] {
  const isLand = property.propertyType === "land";
  const isOffice = property.propertyType === "office";
  const price = `${formatPrice(property.price)}${property.listingType === "rent" ? "/month" : ""}`;

  const specs: (PropertySpec | null)[] = [
    { label: "Price", value: price },
    { label: isLand ? "Lot Size" : "Property Size", value: formatArea(property.areaSqft) },
    property.yearBuilt ? { label: "Year Built", value: String(property.yearBuilt) } : null,
    isLand || isOffice ? null : { label: "Bedrooms", value: formatCount(property.bedrooms) },
    isLand ? null : { label: "Bathrooms", value: formatCount(property.bathrooms) },
    isLand ? null : { label: isOffice ? "Parking" : "Garage", value: formatCount(property.garageSpaces) },
    !isLand && property.garageAreaSqft !== null
      ? { label: isOffice ? "Parking Size" : "Garage Size", value: formatArea(property.garageAreaSqft) }
      : null,
    { label: "Property Type", value: PROPERTY_TYPE_LABELS[property.propertyType] },
    { label: "Listing Type", value: LISTING_TYPE_LABELS[property.listingType] },
  ];

  return specs.filter((spec) => spec !== null);
}

export default function PropertySpecs({ property, className }: PropertySpecsProps) {
  const specs = getPropertySpecs(property);
  const rowsPerColumn = Math.ceil(specs.length / 2);

  return (
    <section aria-labelledby="property-specs-heading" className={className}>
      <h2 id="property-specs-heading" className="text-dark-blue text-xl font-semibold sm:text-2xl">
        Property Details
      </h2>
      <dl
        style={{ "--rows": rowsPerColumn } as CSSProperties}
        className={cn(
          "mt-5 grid gap-y-4 text-sm sm:mt-8 sm:gap-y-6",
          "md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--rows),auto)] md:gap-x-10"
        )}
      >
        {specs.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[112px_1fr] gap-x-3 sm:gap-x-5">
            <dt className="font-semibold text-black">{label}:</dt>
            <dd className="text-grey min-w-0 wrap-break-word">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
