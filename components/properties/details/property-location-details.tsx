import { MapPinOffIcon } from "lucide-react";

import PropertyLocationMap from "@/components/properties/details/property-location-map";
import type { PropertyDetails } from "@/types/property";

type PropertyLocationDetailsProps = {
  property: Pick<
    PropertyDetails,
    "title" | "address" | "postalCode" | "state" | "neighborhood" | "city" | "country" | "latitude" | "longitude"
  >;
  className?: string;
};

function parseCoordinates(latitude: string | null, longitude: string | null) {
  if (!latitude?.trim() || !longitude?.trim()) return null;

  const lat = Number(latitude);
  const lng = Number(longitude);
  const isValid = Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;

  return isValid ? { latitude: lat, longitude: lng } : null;
}

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

  const coordinates = parseCoordinates(property.latitude, property.longitude);

  if (details.length === 0 && !coordinates) return null;

  return (
    <section aria-labelledby="property-location-heading" className={className}>
      <h2 id="property-location-heading" className="text-dark-blue text-xl font-semibold sm:text-2xl">
        Location Details
      </h2>
      <dl className="mt-5 grid gap-y-4 text-sm sm:mt-8 sm:gap-y-6 md:grid-cols-2 md:gap-x-10">
        {details.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[112px_1fr] gap-x-3 sm:gap-x-5">
            <dt className="font-semibold text-black">{label}:</dt>
            <dd className="text-grey min-w-0 wrap-break-word">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 md:mt-12">
        {coordinates ? (
          <PropertyLocationMap
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            title={property.title}
          />
        ) : (
          <p className="bg-light-grey text-grey flex items-center justify-center gap-2 px-4 py-10 text-center text-sm">
            <MapPinOffIcon aria-hidden className="size-4 shrink-0" />
            Map location isn&apos;t available for this property.
          </p>
        )}
      </div>
    </section>
  );
}
