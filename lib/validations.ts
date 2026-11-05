import { DEFAULT_SORT, SORT_OPTIONS } from "@/constants";
import { z } from "zod";

export const listingSearchParamsSchema = z.object({
  sortBy: z.enum(SORT_OPTIONS.map(({ value }) => value)).catch(DEFAULT_SORT),
});
