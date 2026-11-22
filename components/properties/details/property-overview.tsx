import { CalendarIcon, LandPlotIcon, SquareParkingIcon, TagIcon, VectorSquareIcon } from "lucide-react";
import type { ReactNode } from "react";

import { LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS } from "@/constants";
import ScheduleTourLink from "@/components/properties/details/schedule-tour-link";
import { BathIcon, BedIcon, GarageIcon, PriceTagIcon } from "@/constants/icons";
import { formatPrice } from "@/lib/utils";
import type { PropertyDetails } from "@/types/property";

type PropertyOverviewProps = {
  property: Pick<
    PropertyDetails,
    "propertyType" | "listingType" | "price" | "bedrooms" | "bathrooms" | "garageSpaces" | "areaSqft" | "yearBuilt"
  >;
};

type PropertyStat = {
  label: string;
  value: string;
  icon: ReactNode;
};

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count.toLocaleString("en-US")} ${count === 1 ? singular : plural}`;
}

function formatArea(areaSqft: number) {
  return `${areaSqft.toLocaleString("en-US")} sqft`;
}

function getPropertyStats(property: PropertyOverviewProps["property"]): PropertyStat[] {
  const area = formatArea(property.areaSqft);

  const bathrooms =
    property.bathrooms > 0
      ? { label: "Bathrooms", value: formatCount(property.bathrooms, "bath"), icon: <BathIcon /> }
      : null;

  if (property.propertyType === "land") {
    return [
      { label: "Property Type", value: PROPERTY_TYPE_LABELS.land, icon: <LandPlotIcon /> },
      { label: "Lot Area", value: area, icon: <VectorSquareIcon /> },
      { label: "Listing Type", value: LISTING_TYPE_LABELS[property.listingType], icon: <TagIcon /> },
    ];
  }

  const stats =
    property.propertyType === "office"
      ? [
          bathrooms,
          property.garageSpaces > 0
            ? { label: "Parking", value: formatCount(property.garageSpaces, "space"), icon: <SquareParkingIcon /> }
            : null,
          { label: "Area", value: area, icon: <VectorSquareIcon /> },
          property.yearBuilt
            ? { label: "Year Built", value: String(property.yearBuilt), icon: <CalendarIcon /> }
            : null,
        ]
      : [
          property.bedrooms > 0
            ? { label: "Bedrooms", value: formatCount(property.bedrooms, "bed"), icon: <BedIcon /> }
            : null,
          bathrooms,
          property.garageSpaces > 0
            ? { label: "Garage", value: formatCount(property.garageSpaces, "garage"), icon: <GarageIcon /> }
            : null,
          { label: "Area", value: area, icon: <VectorSquareIcon /> },
        ];

  return stats.filter((stat) => stat !== null);
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  const stats = getPropertyStats(property);

  return (
    <section aria-label="Property overview" className="grid gap-3 md:gap-5 xl:grid-cols-[2fr_1fr]">
      <dl className="border-grey-light grid grid-cols-2 gap-x-4 gap-y-5 rounded-[15px] border bg-white p-4 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-6 sm:px-10 sm:py-6 md:px-22 md:py-8 xl:px-14 2xl:px-22">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="min-w-0">
            <dt className="text-grey sm:paragraph text-xs">{label}</dt>
            <dd className="sm:subtitle mt-1.5 flex items-center gap-2 text-sm text-black sm:mt-2 sm:gap-2.5">
              <span
                aria-hidden
                className="text-primary flex size-5 shrink-0 items-center justify-center sm:size-7 [&_svg]:h-4.5 [&_svg]:w-auto sm:[&_svg]:h-6"
              >
                {icon}
              </span>
              <span className="min-w-0">{value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-grey-light flex items-center gap-3 rounded-[15px] border bg-white p-4 sm:gap-5 sm:px-10 sm:py-6.5 xl:px-8 2xl:px-12">
        <PriceTagIcon className="text-grey-light h-11 w-auto shrink-0 sm:h-17" />
        <dl className="min-w-0 flex-1">
          <dt className="sm:subtitle text-sm text-black">{LISTING_TYPE_LABELS[property.listingType]}</dt>
          <dd className="text-dark-blue text-xl leading-tight font-semibold sm:text-4xl xl:max-[1440px]:text-3xl">
            {formatPrice(property.price)}
            {property.listingType === "rent" && (
              <span className="text-grey text-xs font-normal sm:text-base">/month</span>
            )}
          </dd>
        </dl>
        <ScheduleTourLink className="bg-primary hover:bg-primary/80 focus-visible:ring-primary/50 flex h-12 w-11 shrink-0 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-3 focus-visible:ring-offset-2 sm:h-20 sm:w-18" />
      </div>
    </section>
  );
}
