import { pgTable, pgEnum, uuid, text, integer, numeric, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const listingTypeEnum = pgEnum("listing_type", ["sale", "rent"]);

export const propertyTypeEnum = pgEnum("property_type", [
  "house",
  "apartment",
  "villa",
  "bungalow",
  "townhouse",
  "loft",
  "office",
  "land",
]);

export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),

  listingType: listingTypeEnum("listing_type").notNull(),
  propertyType: propertyTypeEnum("property_type").notNull(),

  price: integer("price").notNull(),

  country: varchar("country", { length: 100 }).notNull().default("USA"),

  state: varchar("state", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }),

  latitude: numeric("latitude", {
    precision: 10,
    scale: 7,
  }),

  longitude: numeric("longitude", {
    precision: 10,
    scale: 7,
  }),

  bedrooms: integer("bedrooms").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  garageSpaces: integer("garage_spaces").notNull().default(0),

  areaSqft: integer("area_sqft").notNull(),

  coverImage: text("cover_image"),

  isPublished: boolean("is_published").notNull().default(false),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
