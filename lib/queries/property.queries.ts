import "server-only";

import { db } from "@/db";
import { properties } from "@/db/schema/properties";
import { desc, eq } from "drizzle-orm";

export async function getProperties() {
  return db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .orderBy(desc(properties.createdAt))
    .limit(12);
}
