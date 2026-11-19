import type { Property } from "../schema/properties";
import type { NewPropertyImage } from "../schema/property-images";
import { seedPropertyImages } from "./property-images";
import { stableUuid } from "./stable-uuid";

const MAX_IMAGES_PER_PROPERTY = 15;

function rotate<T>(items: T[], offset: number): T[] {
  return items.map((_, index) => items[(index + offset) % items.length]);
}

export function generatePropertyImages(listings: Pick<Property, "id" | "propertyType">[]): NewPropertyImage[] {
  const typeCounts = new Map<Property["propertyType"], number>();

  return listings.flatMap(({ id: propertyId, propertyType }) => {
    const offset = typeCounts.get(propertyType) ?? 0;
    typeCounts.set(propertyType, offset + 1);

    const { covers, gallery } = seedPropertyImages[propertyType];
    const paths = [...rotate(covers, offset), ...rotate(gallery, offset)].slice(0, MAX_IMAGES_PER_PROPERTY);

    return paths.map((storagePath, position) => ({
      id: stableUuid(`property-image:${propertyId}:${position}`),
      propertyId,
      storagePath,
      position,
    }));
  });
}
