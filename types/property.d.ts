import type { getPropertyFilterOptions } from "@/lib/queries/property.queries";

export type PropertyFilterOptions = Awaited<ReturnType<typeof getPropertyFilterOptions>>;

export type ListingView = "grid" | "list";
