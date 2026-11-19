import type { Property } from "../schema/properties";

type SeedImageSet = {
  covers: string[];
  gallery: string[];
};

export const seedPropertyImages: Record<Property["propertyType"], SeedImageSet> = {
  house: {
    covers: [
      "seed/house/white-cottage-picket-fence.webp",
      "seed/house/suburban-house-exterior.webp",
      "seed/house/brick-house-front-door.webp",
    ],
    gallery: [
      "seed/house/white-kitchen-island.webp",
      "seed/house/living-room-grey-sofa.webp",
      "seed/house/dining-room-window-light.webp",
      "seed/house/hallway-hardwood-floor.webp",
      "seed/house/dining-nook-warm-light.webp",
    ],
  },
  apartment: {
    covers: [
      "seed/apartment/apartment-building-balconies.webp",
      "seed/apartment/apartment-building-blue-orange.webp",
      "seed/apartment/modern-apartment-tower.webp",
    ],
    gallery: [
      "seed/apartment/living-room-herringbone-floor.webp",
      "seed/apartment/kitchen-white-cabinets.webp",
      "seed/apartment/dining-room-city-view.webp",
      "seed/apartment/lounge-floor-to-ceiling-windows.webp",
      "seed/apartment/bedroom-workspace.webp",
    ],
  },
  villa: {
    covers: [
      "seed/villa/tuscan-villa-hilltop-cypresses.webp",
      "seed/villa/infinity-pool-sea-view.webp",
      "seed/villa/pool-palm-trees-dusk.webp",
      "seed/villa/poolside-terrace-seating.webp",
      "seed/villa/courtyard-pool-aerial.webp",
    ],
    gallery: [
      "seed/villa/lounge-billiards-room.webp",
      "seed/villa/living-room-library.webp",
      "seed/villa/lounge-sofa-coffee-tables.webp",
    ],
  },
  bungalow: {
    covers: [
      "seed/bungalow/single-storey-white-cottage.webp",
      "seed/bungalow/cabin-autumn-meadow.webp",
      "seed/bungalow/wooden-cabin-snow.webp",
      "seed/bungalow/beach-bungalow-dusk.webp",
    ],
    gallery: [],
  },
  townhouse: {
    covers: [
      "seed/townhouse/canal-townhouses.webp",
      "seed/townhouse/terraced-houses-street.webp",
      "seed/townhouse/victorian-row-houses.webp",
      "seed/townhouse/row-house-facade.webp",
    ],
    gallery: [],
  },
  loft: {
    covers: [
      "seed/loft/brick-wall-living-room.webp",
      "seed/loft/brick-warehouse-buildings.webp",
      "seed/loft/factory-windows-reading-chair.webp",
    ],
    gallery: ["seed/loft/dining-table-hardwood-floor.webp"],
  },
  office: {
    covers: [
      "seed/office/glass-office-tower.webp",
      "seed/office/open-plan-workspace.webp",
      "seed/office/meeting-room-white.webp",
    ],
    gallery: ["seed/office/office-lounge-meeting-area.webp"],
  },
  land: {
    covers: [
      "seed/land/meadow-wooden-fence.webp",
      "seed/land/green-rolling-fields.webp",
      "seed/land/lone-tree-grass-field.webp",
    ],
    gallery: [],
  },
};

export const seedImagePaths = Object.values(seedPropertyImages).flatMap(({ covers, gallery }) => [
  ...covers,
  ...gallery,
]);
