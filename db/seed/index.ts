import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { properties } from "../schema/properties";
import { propertyImages } from "../schema/property-images";
import { featuredProperties } from "./featured-properties";
import { generateProperties } from "./generate-properties";
import { generatePropertyImages } from "./generate-property-images";
import { stableUuid } from "./stable-uuid";

config({ path: ".env.local" });

async function seed() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }

  const client = postgres(url, { max: 1 });

  const db = drizzle({ client });

  try {
    const listings = [
      ...featuredProperties.map((property, index) => ({ ...property, id: stableUuid(`property:featured:${index}`) })),
      ...generateProperties(88).map((property, index) => ({
        ...property,
        id: stableUuid(`property:generated:${index}`),
      })),
    ];
    const images = generatePropertyImages(listings);

    await db.transaction(async (tx) => {
      await tx.delete(propertyImages);
      await tx.delete(properties);
      await tx.insert(properties).values(listings);
      await tx.insert(propertyImages).values(images);
    });

    console.log(`Successfully seeded ${listings.length} properties and ${images.length} property images.`);
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
