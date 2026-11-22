import type { PropertyDetails } from "@/types/property";

type PropertyLocationDetailsProps = {
  property: Pick<PropertyDetails, "address" | "postalCode" | "state" | "neighborhood" | "city" | "country">;
  className?: string;
};

export default function PropertyLocationDetails({ property, className }: PropertyLocationDetailsProps) {
  const details = [
    { label: "Address", value: property.address },
    { label: "ZIP Code", value: property.postalCode },
    { label: "State", value: property.state },
    { label: "Neighborhood", value: property.neighborhood },
    { label: "City", value: property.city },
    { label: "Country", value: property.country },
  ].flatMap(({ label, value }) => {
    const trimmed = value?.trim();
    return trimmed ? [{ label, value: trimmed }] : [];
  });

  if (details.length === 0) return null;

  return (
    <section aria-labelledby="property-location-heading" className={className}>
      <h2 id="property-location-heading" className="text-dark-blue text-xl font-semibold sm:text-2xl">
        Location Details
      </h2>
      <dl className="mt-5 grid gap-y-4 text-sm sm:mt-8 sm:gap-y-6 md:grid-cols-2 md:gap-x-10">
        {details.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[70px_1fr] gap-x-3 sm:gap-x-5">
            <dt className="font-semibold text-black">{label}:</dt>
            <dd className="text-grey wrap-break-words min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
