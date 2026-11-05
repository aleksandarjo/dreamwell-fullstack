import "server-only";

import { db } from "@/db";
import { properties, type Property } from "@/db/schema/properties";
import { and, asc, count, desc, eq, gte, inArray, lte, or, sql, type SQL } from "drizzle-orm";

export type SortOption = "newest" | "oldest" | "price_asc" | "price_desc";

export type BedroomOption = 1 | 2 | 3 | "4+";

export type GetPropertiesOptions = {
  propertyTypes?: Property["propertyType"][];
  listingType?: Property["listingType"];
  cities?: string[];
  bedrooms?: BedroomOption[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
  page?: number;
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 15;
const MAX_PAGE_SIZE = 50;

const sortOrders = {
  newest: [desc(properties.createdAt), desc(properties.id)],
  oldest: [asc(properties.createdAt), asc(properties.id)],
  price_asc: [asc(properties.price), asc(properties.id)],
  price_desc: [desc(properties.price), desc(properties.id)],
} satisfies Record<SortOption, SQL[]>;

function toPositiveInt(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.max(1, Math.floor(value));
}

function buildWhere({ propertyTypes, listingType, cities, bedrooms, minPrice, maxPrice }: GetPropertiesOptions) {
  const bedroomConditions = (bedrooms ?? []).map((n) =>
    n === "4+" ? gte(properties.bedrooms, 4) : eq(properties.bedrooms, n)
  );

  return and(
    eq(properties.isPublished, true),
    propertyTypes?.length ? inArray(properties.propertyType, propertyTypes) : undefined,
    listingType ? eq(properties.listingType, listingType) : undefined,
    cities?.length ? inArray(properties.city, cities) : undefined,
    bedroomConditions.length ? or(...bedroomConditions) : undefined,
    minPrice !== undefined ? gte(properties.price, minPrice) : undefined,
    maxPrice !== undefined ? lte(properties.price, maxPrice) : undefined
  );
}

export async function getProperties(options: GetPropertiesOptions = {}) {
  const where = buildWhere(options);
  const sortBy = options.sortBy ?? "newest";
  const pageSize = Math.min(toPositiveInt(options.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);

  const [{ total }] = await db.select({ total: count() }).from(properties).where(where);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(toPositiveInt(options.page, 1), totalPages);

  const results = await db
    .select()
    .from(properties)
    .where(where)
    .orderBy(...sortOrders[sortBy])
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    data: results,
    total,
    page,
    totalPages,
    isNext: page < totalPages,
  };
}

export async function getPropertyFilterOptions() {
  const [result] = await db
    .select({
      propertyTypes: sql<Property["propertyType"][]>`
        array_agg(DISTINCT ${properties.propertyType})
      `,
      listingTypes: sql<Property["listingType"][]>`
        array_agg(DISTINCT ${properties.listingType})
      `,
      cities: sql<string[]>`
        array_agg(DISTINCT ${properties.city})
      `,
    })
    .from(properties)
    .where(eq(properties.isPublished, true));

  return {
    propertyTypes: result.propertyTypes ?? [],
    listingTypes: result.listingTypes ?? [],
    cities: result.cities ?? [],
  };
}
