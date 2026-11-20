import Breadcrumbs, { type BreadcrumbEntry } from "@/components/shared/breadcrumbs";
import { PROPERTY_TYPE_LABELS } from "@/constants";
import { MapPinIcon } from "@/constants/icons";
import { ROUTES } from "@/constants/routes";
import type { PropertyDetails } from "@/types/property";

type PropertyHeaderProps = {
  property: Pick<PropertyDetails, "id" | "title" | "propertyType" | "city" | "state" | "country">;
};

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const location = [property.city, property.state, property.country]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  const breadcrumbs: BreadcrumbEntry[] = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Properties", href: ROUTES.LISTING },
    {
      label: PROPERTY_TYPE_LABELS[property.propertyType],
      href: `${ROUTES.LISTING}?${new URLSearchParams({ type: property.propertyType })}`,
    },
    { label: property.title, href: ROUTES.PROPERTY(property.id) },
  ];

  return (
    <header>
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="title-section mt-6 break-words md:mt-10">{property.title}</h1>
      {location && (
        <p className="text-grey mt-2 flex items-center gap-1.5 text-base">
          <MapPinIcon aria-hidden />
          <span>{location}</span>
        </p>
      )}
    </header>
  );
}
