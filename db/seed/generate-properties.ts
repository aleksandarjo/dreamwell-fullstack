import { faker } from "@faker-js/faker";

import type { NewProperty } from "../schema/properties";

const locations = [
  { city: "Miami", state: "Florida", lat: 25.7617, lng: -80.1918, weight: 20, priceFactor: 1.25 },
  { city: "Los Angeles", state: "California", lat: 34.0522, lng: -118.2437, weight: 20, priceFactor: 1.5 },
  { city: "New York City", state: "New York", lat: 40.7128, lng: -74.006, weight: 20, priceFactor: 1.6 },
  { city: "Austin", state: "Texas", lat: 30.2672, lng: -97.7431, weight: 15, priceFactor: 0.9 },
  { city: "San Diego", state: "California", lat: 32.7157, lng: -117.1611, weight: 15, priceFactor: 1.3 },
  { city: "Seattle", state: "Washington", lat: 47.6062, lng: -122.3321, weight: 10, priceFactor: 1.2 },
] as const;

const propertyTypes = ["house", "apartment", "villa", "bungalow", "townhouse", "loft", "office", "land"] as const;

const adjectives = [
  "Modern",
  "Luxury",
  "Elegant",
  "Contemporary",
  "Spacious",
  "Beautiful",
  "Charming",
  "Premium",
  "Bright",
  "Exclusive",
];

const typeLabels: Record<(typeof propertyTypes)[number], string> = {
  house: "Family House",
  apartment: "Apartment",
  villa: "Villa",
  bungalow: "Bungalow",
  townhouse: "Townhouse",
  loft: "Loft",
  office: "Office Space",
  land: "Land Plot",
};

const basePrices: Record<(typeof propertyTypes)[number], { sale: number; rent: number }> = {
  house: { sale: 480000, rent: 2800 },
  apartment: { sale: 350000, rent: 2200 },
  villa: { sale: 1100000, rent: 5500 },
  bungalow: { sale: 420000, rent: 2500 },
  townhouse: { sale: 560000, rent: 3100 },
  loft: { sale: 450000, rent: 2700 },
  office: { sale: 850000, rent: 4500 },
  land: { sale: 220000, rent: 1200 },
};

export function generateProperties(count: number): NewProperty[] {
  faker.seed(42);

  return Array.from({ length: count }, () => {
    const location = faker.helpers.weightedArrayElement(
      locations.map(({ weight, ...value }) => ({
        weight,
        value,
      }))
    );

    const propertyType = faker.helpers.arrayElement(propertyTypes);
    const listingType = faker.helpers.arrayElement(["sale", "rent"] as const);

    const isLand = propertyType === "land";
    const isOffice = propertyType === "office";

    const bedrooms = isLand || isOffice ? 0 : faker.number.int({ min: 1, max: 5 });

    const bathrooms = isLand ? 0 : faker.number.int({ min: 1, max: isOffice ? 3 : 4 });

    const areaSqft = isLand ? faker.number.int({ min: 2000, max: 20000 }) : faker.number.int({ min: 600, max: 4500 });

    const priceVariation = faker.number.float({
      min: 0.8,
      max: 1.4,
      fractionDigits: 2,
    });

    const price = Math.round(basePrices[propertyType][listingType] * location.priceFactor * priceVariation);

    const lat =
      location.lat +
      faker.number.float({
        min: -0.08,
        max: 0.08,
        fractionDigits: 6,
      });

    const lng =
      location.lng +
      faker.number.float({
        min: -0.08,
        max: 0.08,
        fractionDigits: 6,
      });

    return {
      title: `${faker.helpers.arrayElement(adjectives)} ${typeLabels[propertyType]} in ${location.city}`,

      description: faker.lorem.paragraph(),

      listingType,
      propertyType,
      price,

      city: location.city,
      state: location.state,
      country: "USA",
      address: faker.location.streetAddress(),

      bedrooms,
      bathrooms,
      garageSpaces: isLand ? 0 : faker.number.int({ min: 0, max: 3 }),
      areaSqft,

      latitude: lat.toFixed(7),
      longitude: lng.toFixed(7),

      isPublished: true,
    };
  });
}
