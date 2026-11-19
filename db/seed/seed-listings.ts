import { featuredProperties } from "./featured-properties";
import { generateProperties } from "./generate-properties";
import { generatePropertyDetails } from "./generate-property-details";
import { stableUuid } from "./stable-uuid";

export function buildSeedListings() {
  const featured = featuredProperties.map((property, index) => ({
    ...property,
    id: stableUuid(`property:featured:${index}`),
  }));

  const generated = generateProperties(88).map((property, index) => {
    const id = stableUuid(`property:generated:${index}`);

    return { ...property, id, ...generatePropertyDetails({ ...property, id }) };
  });

  return [...featured, ...generated];
}
