import { pgTable, uuid, text, integer, timestamp, index } from "drizzle-orm/pg-core";

import { properties } from "./properties";

export const propertyImages = pgTable(
  "property_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, {
        onDelete: "cascade",
      }),
    storagePath: text("storage_path").notNull(),

    position: integer("position").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("property_images_property_id_position_idx").on(table.propertyId, table.position)]
).enableRLS();

export type PropertyImage = typeof propertyImages.$inferSelect;
export type NewPropertyImage = typeof propertyImages.$inferInsert;
