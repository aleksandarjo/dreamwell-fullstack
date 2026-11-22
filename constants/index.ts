import type { Property } from "@/db/schema/properties";
import { BedroomOption, SortOption } from "@/lib/queries/property.queries";
import type { ListingView } from "@/types/property";

export const DEFAULT_SORT = "newest" satisfies SortOption;

export const DEFAULT_VIEW = "list" satisfies ListingView;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const satisfies readonly { value: SortOption; label: string }[];

export const BEDROOM_OPTIONS = [1, 2, 3, "4+"] as const satisfies readonly BedroomOption[];

export const PROPERTY_TYPE_LABELS = {
  house: "House",
  apartment: "Apartment",
  villa: "Villa",
  bungalow: "Bungalow",
  townhouse: "Townhouse",
  loft: "Loft",
  office: "Office",
  land: "Land",
} satisfies Record<Property["propertyType"], string>;

export const LISTING_TYPE_LABELS = {
  sale: "For Sale",
  rent: "For Rent",
} satisfies Record<Property["listingType"], string>;

export const TOUR_TIME_OPTIONS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "17:00", label: "5:00 PM" },
] as const;

export const SCHEDULE_TOUR_SECTION_ID = "schedule-tour";

export const OPEN_SCHEDULE_TOUR_EVENT = "dreamwell:open-schedule-tour";
