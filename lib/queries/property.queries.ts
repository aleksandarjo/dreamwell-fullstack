import "server-only";

import { cache } from "react";

import { db } from "@/db";
import { properties, type Property } from "@/db/schema/properties";
import { propertyImages } from "@/db/schema/property-images";
import { propertyIdSchema } from "@/lib/validations";
import { and, asc, count, desc, eq, getTableColumns, gte, inArray, lte, or, sql, type SQL } from "drizzle-orm";

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

export const DEFAULT_PAGE_SIZE = 15;
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

  const coverImagePath = db
    .select({ storagePath: propertyImages.storagePath })
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, properties.id))
    .orderBy(asc(propertyImages.position), asc(propertyImages.id))
    .limit(1);

  const results = await db
    .select({
      ...getTableColumns(properties),
      coverImagePath: sql<string | null>`${coverImagePath}`,
    })
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

export const getPropertyById = cache(async (id: string) => {
  if (!propertyIdSchema.safeParse(id).success) return null;

  const galleryPaths = db
    .select({ storagePath: propertyImages.storagePath })
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, properties.id))
    .orderBy(asc(propertyImages.position), asc(propertyImages.id));

  const [property] = await db
    .select({
      ...getTableColumns(properties),
      galleryPaths: sql<string[]>`array${galleryPaths}`,
    })
    .from(properties)
    .where(and(eq(properties.id, id), eq(properties.isPublished, true)))
    .limit(1);

  return property ?? null;
});

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
