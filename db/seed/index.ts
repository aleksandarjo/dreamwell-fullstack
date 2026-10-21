import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { properties } from "../schema/properties";
import { featuredProperties } from "./featured-properties";
import { generateProperties } from "./generate-properties";

config({ path: ".env.local" });

async function seed() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }

  const client = postgres(url, { max: 1 });

  const db = drizzle({ client });

  try {
    const listings = [...featuredProperties, ...generateProperties(88)];

    await db.transaction(async (tx) => {
      await tx.delete(properties);
      await tx.insert(properties).values(listings);
    });

    console.log(`Successfully seeded ${listings.length} properties.`);
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
