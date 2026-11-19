import { SimpleFaker } from "@faker-js/faker";

import { propertyFeatures, type NewProperty, type Property, type PropertyFeature } from "../schema/properties";

type PropertyDetails = Required<
  Pick<NewProperty, "yearBuilt" | "garageAreaSqft" | "postalCode" | "neighborhood" | "features">
>;

type PropertyDetailsInput = Pick<NewProperty, "propertyType" | "listingType" | "bedrooms" | "garageSpaces"> & {
  id: string;
};

const MIN_FEATURES = 3;

const yearBuiltRanges: Record<Property["propertyType"], [number, number] | null> = {
  house: [1950, 2022],
  apartment: [1965, 2024],
  villa: [1985, 2023],
  bungalow: [1915, 1975],
  townhouse: [1900, 2022],
  loft: [1900, 1960],
  office: [1970, 2023],
  land: null,
};

const featureOdds: Record<Property["propertyType"], Partial<Record<PropertyFeature, number>>> = {
  house: {
    air_conditioning: 0.8,
    heater: 0.6,
    fireplace: 0.5,
    furnished: 0.1,
    equipped_kitchen: 0.7,
    laundry_room: 0.6,
    dining_room: 0.6,
    walk_in_closet: 0.35,
    storage_room: 0.3,
    terrace: 0.25,
    garden: 0.5,
    lawn: 0.75,
    swimming_pool: 0.2,
    security_system: 0.3,
    solar_panels: 0.2,
    electric_vehicle_charger: 0.2,
  },
  apartment: {
    air_conditioning: 0.85,
    heater: 0.6,
    underfloor_heating: 0.15,
    furnished: 0.25,
    equipped_kitchen: 0.75,
    laundry_room: 0.3,
    storage_room: 0.25,
    balcony: 0.7,
    swimming_pool: 0.15,
    gym: 0.3,
    elevator: 0.85,
    security_system: 0.4,
    video_surveillance: 0.35,
    wheelchair_accessible: 0.3,
    electric_vehicle_charger: 0.15,
  },
  villa: {
    air_conditioning: 0.9,
    underfloor_heating: 0.35,
    fireplace: 0.4,
    furnished: 0.2,
    equipped_kitchen: 0.85,
    laundry_room: 0.6,
    dining_room: 0.8,
    walk_in_closet: 0.6,
    terrace: 0.8,
    garden: 0.85,
    lawn: 0.5,
    swimming_pool: 0.85,
    gym: 0.25,
    sauna: 0.35,
    security_system: 0.7,
    video_surveillance: 0.45,
    gated_access: 0.5,
    solar_panels: 0.3,
    electric_vehicle_charger: 0.3,
  },
  bungalow: {
    air_conditioning: 0.6,
    heater: 0.6,
    fireplace: 0.4,
    furnished: 0.1,
    equipped_kitchen: 0.6,
    laundry_room: 0.4,
    dining_room: 0.35,
    storage_room: 0.3,
    terrace: 0.35,
    garden: 0.6,
    lawn: 0.7,
    wheelchair_accessible: 0.3,
    solar_panels: 0.15,
  },
  townhouse: {
    air_conditioning: 0.7,
    heater: 0.7,
    fireplace: 0.35,
    furnished: 0.1,
    equipped_kitchen: 0.7,
    laundry_room: 0.5,
    dining_room: 0.5,
    walk_in_closet: 0.3,
    storage_room: 0.35,
    balcony: 0.35,
    terrace: 0.4,
    garden: 0.35,
    security_system: 0.3,
    electric_vehicle_charger: 0.15,
  },
  loft: {
    air_conditioning: 0.6,
    heater: 0.7,
    underfloor_heating: 0.2,
    furnished: 0.3,
    equipped_kitchen: 0.75,
    laundry_room: 0.35,
    storage_room: 0.4,
    balcony: 0.2,
    terrace: 0.25,
    gym: 0.15,
    elevator: 0.6,
    security_system: 0.35,
    electric_vehicle_charger: 0.15,
  },
  office: {
    air_conditioning: 0.9,
    heater: 0.6,
    furnished: 0.35,
    storage_room: 0.4,
    elevator: 0.8,
    security_system: 0.85,
    video_surveillance: 0.6,
    gated_access: 0.25,
    wheelchair_accessible: 0.6,
    solar_panels: 0.15,
    electric_vehicle_charger: 0.3,
  },
  land: {
    utility_connections: 0.5,
  },
};

function getFeatureOdds({ propertyType, listingType, bedrooms = 0, garageSpaces = 0 }: PropertyDetailsInput) {
  return propertyFeatures.flatMap((feature) => {
    let odds = featureOdds[propertyType][feature] ?? 0;

    if (feature === "furnished" && listingType === "rent") odds = Math.min(odds + 0.25, 1);
    if (feature === "electric_vehicle_charger" && garageSpaces === 0) odds = 0;
    if ((feature === "dining_room" || feature === "walk_in_closet") && bedrooms < 2) odds = 0;

    return odds > 0 ? [{ feature, odds }] : [];
  });
}

export function generatePropertyDetails(property: PropertyDetailsInput): PropertyDetails {
  const random = new SimpleFaker();
  random.seed(Number.parseInt(property.id.slice(0, 8), 16));

  const yearRange = yearBuiltRanges[property.propertyType];
  const yearBuilt = yearRange ? random.number.int({ min: yearRange[0], max: yearRange[1] }) : null;

  const garageSpaces = property.garageSpaces ?? 0;
  const garageAreaSqft = garageSpaces > 0 ? garageSpaces * random.number.int({ min: 44, max: 56 }) * 5 : null;

  const odds = getFeatureOdds(property);
  const selected = new Set(
    odds.filter(({ odds }) => random.datatype.boolean({ probability: odds })).map(({ feature }) => feature)
  );

  if (property.propertyType !== "land") {
    for (const { feature } of [...odds].sort((a, b) => b.odds - a.odds)) {
      if (selected.size >= MIN_FEATURES) break;
      selected.add(feature);
    }
  }

  return {
    yearBuilt,
    garageAreaSqft,
    postalCode: null,
    neighborhood: null,
    features: propertyFeatures.filter((feature) => selected.has(feature)),
  };
}
