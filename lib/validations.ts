import { BEDROOM_OPTIONS, DEFAULT_SORT, SORT_OPTIONS } from "@/constants";
import { listingTypeEnum, propertyTypeEnum } from "@/db/schema/properties";
import { z } from "zod";

const POSTGRES_INT_MAX = 2_147_483_647;

const allowedValues = <T extends string | number>(options: readonly T[]) =>
  z
    .unknown()
    .transform((value) => {
      const values = [value].flat();

      return options.filter((option) => values.includes(String(option)));
    })
    .default([]);

const priceSchema = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .refine((price) => price <= POSTGRES_INT_MAX)
  .optional()
  .catch(undefined);

const pageSchema = z
  .string()
  .regex(/^[1-9]\d*$/)
  .transform(Number)
  .refine(Number.isSafeInteger)
  .catch(1);

export const listingSearchParamsSchema = z.object({
  sortBy: z.enum(SORT_OPTIONS.map(({ value }) => value)).catch(DEFAULT_SORT),
  type: allowedValues(propertyTypeEnum.enumValues),
  status: z.enum(listingTypeEnum.enumValues).optional().catch(undefined),
  city: z
    .unknown()
    .transform((value) => [value].flat().filter((city): city is string => typeof city === "string" && city !== ""))
    .default([]),
  bedrooms: allowedValues(BEDROOM_OPTIONS),
  minPrice: priceSchema,
  maxPrice: priceSchema,
  page: pageSchema,
});
