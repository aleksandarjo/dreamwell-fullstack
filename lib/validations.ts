import { BEDROOM_OPTIONS, DEFAULT_SORT, DEFAULT_VIEW, SORT_OPTIONS, TOUR_TIME_OPTIONS } from "@/constants";
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
  view: z.enum(["list", "grid"]).catch(DEFAULT_VIEW),
});

export const propertyIdSchema = z.uuid();

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function toLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isCalendarDate(value: string) {
  if (!ISO_DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function isPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").length;

  return /^\+?[\d\s().-]+$/.test(value) && digits >= 7 && digits <= 15;
}

export const tourRequestSchema = z.object({
  date: z
    .string()
    .min(1, "Choose a date")
    .refine(isCalendarDate, { error: "Enter a valid date", abort: true })
    .refine((value) => value >= toLocalIsoDate(), "Choose today or a later date"),
  time: z.string().refine((value) => TOUR_TIME_OPTIONS.some((option) => option.value === value), "Choose a time"),
  name: z.string().trim().min(1, "Enter your name").max(100, "Name must be 100 characters or fewer"),
  phone: z.string().trim().min(1, "Enter your phone number").refine(isPhoneNumber, "Enter a valid phone number"),
  email: z.string().trim().min(1, "Enter your email address").pipe(z.email("Enter a valid email address")),
  message: z.string().trim().max(1000, "Message must be 1,000 characters or fewer"),
});

export type TourRequestInput = z.input<typeof tourRequestSchema>;

export type TourRequest = z.output<typeof tourRequestSchema>;
