import { config } from "dotenv";
import { eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { properties, type NewProperty } from "../schema/properties";
import { buildSeedListings } from "./seed-listings";

config({ path: ".env.local" });

function pickDetails(listing: NewProperty) {
  return {
    yearBuilt: listing.yearBuilt ?? null,
    garageAreaSqft: listing.garageAreaSqft ?? null,
    postalCode: listing.postalCode ?? null,
    neighborhood: listing.neighborhood ?? null,
    features: listing.features ?? [],
  };
}

async function backfillPropertyDetails() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }

  const client = postgres(url, { max: 1 });

  const db = drizzle({ client });

  try {
    const listings = buildSeedListings();

    const updated = await db.transaction(async (tx) => {
      const current = await tx
        .select({
          id: properties.id,
          yearBuilt: properties.yearBuilt,
          garageAreaSqft: properties.garageAreaSqft,
          postalCode: properties.postalCode,
          neighborhood: properties.neighborhood,
          features: properties.features,
        })
        .from(properties)
        .where(
          inArray(
            properties.id,
            listings.map(({ id }) => id)
          )
        );

      if (current.length !== listings.length) {
        throw new Error(`Expected ${listings.length} seeded properties, found ${current.length}. Run the seed first.`);
      }

      const currentDetails = new Map(current.map(({ id, ...details }) => [id, JSON.stringify(details)]));
      let count = 0;

      for (const listing of listings) {
        const details = pickDetails(listing);

        if (currentDetails.get(listing.id) === JSON.stringify(details)) continue;

        await tx
          .update(properties)
          .set({ ...details, updatedAt: sql`${properties.updatedAt}` })
          .where(eq(properties.id, listing.id));
        count++;
      }

      return count;
    });

    console.log(`Property details: ${updated} updated, ${listings.length - updated} already up to date.`);
  } finally {
    await client.end();
  }
}

backfillPropertyDetails().catch((error) => {
  console.error("Property details backfill failed:", error);
  process.exitCode = 1;
});
