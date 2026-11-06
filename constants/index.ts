import { BedroomOption, SortOption } from "@/lib/queries/property.queries";

export const DEFAULT_SORT = "newest" satisfies SortOption;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const satisfies readonly { value: SortOption; label: string }[];

export const BEDROOM_OPTIONS = [1, 2, 3, "4+"] as const satisfies readonly BedroomOption[];
