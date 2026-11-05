import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { Property } from "@/db/schema/properties";
import { ArrowRightIcon, BathIcon, BedIcon, GarageIcon, HeartIcon, MapPinIcon, SquareIcon } from "@/constants/icons";
import { ROUTES } from "@/constants/routes";
import { cn, formatPrice } from "@/lib/utils";

type PropertyCardProps = VariantProps<typeof cardVariants> & {
  property: Property;
  isFavorite?: boolean;
};

export default function PropertyCard({ property, isFavorite, orientation = "vertical" }: PropertyCardProps) {
  const href = ROUTES.PROPERTY(property.id);
  const isRent = property.listingType === "rent";

  const propertyAttributes = [
    { icon: BedIcon, label: `${property.bedrooms} Bed` },
    { icon: GarageIcon, label: `${property.garageSpaces ?? 0} garage` },
    { icon: BathIcon, label: `${property.bathrooms} Bath` },
    { icon: SquareIcon, label: `${property.areaSqft.toLocaleString("en-US")} sqft` },
  ];

  return (
    <article className={cardVariants({ orientation })}>
      <button
        type="button"
        aria-label="Add to favorites"
        className="shadow-main absolute top-7 right-7 z-10 flex size-10 items-center justify-center rounded-full bg-white"
      >
        <HeartIcon className={cn(`size-5 ${isFavorite ? "fill-primary" : "fill-none"}`)} />
      </button>

      <div className={containerVariants({ orientation })}>
        <div className={imageVariants({ orientation })}>
          {property.coverImage ? (
            <Image
              src={property.coverImage}
              alt={property.title}
              fill
              sizes={
                orientation === "horizontal" ? "(min-width: 640px) 40vw, 100vw" : "(min-width: 640px) 390px, 100vw"
              }
              className="object-cover"
            />
          ) : (
            <div className="bg-light-grey size-full" aria-hidden />
          )}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-4 px-5",
            orientation === "horizontal" ? "justify-around" : "min-h-70 justify-between"
          )}
        >
          <div>
            <Link href={href} className="focus-visible:outline-none">
              <h3 className="text-dark-blue group-hover:text-primary line-clamp-2 text-xl leading-tight font-semibold transition-colors sm:text-2xl">
                {property.title}
              </h3>
            </Link>
            <p className="text-grey/60 mt-3 flex items-center gap-1 text-sm">
              <MapPinIcon aria-hidden />
              <span>
                {property.city}, {property.state}
              </span>
            </p>
          </div>

          <div className={cn("", orientation === "horizontal" ? "grid grid-cols-[auto_305px] justify-between" : "")}>
            <ul className="flex flex-wrap items-center gap-4">
              {propertyAttributes.map(({ icon: Icon, label }) => (
                <li key={label} className="text-grey flex items-center gap-2">
                  <Icon aria-hidden />
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-[1fr_72px] items-stretch gap-2.5">
              <div className="border-grey/30 rounded-xl border p-3">
                <h5 className="text-grey text-sm">{isRent ? "For Rent" : "For Sale"}</h5>
                <p className="text-xl font-bold text-black sm:text-2xl">
                  {formatPrice(property.price)}
                  {isRent && <span className="text-grey text-base font-normal">/month</span>}
                </p>
              </div>
              <Link
                href={href}
                aria-label={`View details for ${property.title}`}
                className={buttonVariants({ size: "icon-lg", className: "h-auto w-full text-white" })}
              >
                <ArrowRightIcon aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export const cardVariants = cva(
  "group relative rounded-[15px] bg-white p-4 pb-7 shadow-main transition-shadow hover:shadow-hover",
  {
    variants: {
      orientation: {
        vertical: "w-full max-w-sm",
        horizontal: "w-full",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

export const containerVariants = cva("flex flex-col gap-4", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "sm:flex-row sm:items-stretch",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const imageVariants = cva("relative w-full shrink-0 overflow-hidden rounded-xl", {
  variants: {
    orientation: {
      vertical: "aspect-[4/3]",
      horizontal: "aspect-[16/9] max-w-[370px]",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});
