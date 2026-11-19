import type { getProperties, getPropertyFilterOptions } from "@/lib/queries/property.queries";

export type PropertyFilterOptions = Awaited<ReturnType<typeof getPropertyFilterOptions>>;

export type PropertyListItem = Awaited<ReturnType<typeof getProperties>>["data"][number];

export type ListingView = "grid" | "list";
