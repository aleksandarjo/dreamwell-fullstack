import {
  AccessibilityIcon,
  ArchiveIcon,
  ArrowUpDownIcon,
  AirVentIcon,
  CctvIcon,
  CloudFogIcon,
  CookingPotIcon,
  DoorClosedLockedIcon,
  DumbbellIcon,
  EvChargerIcon,
  FenceIcon,
  FlameKindlingIcon,
  Flower2Icon,
  HeaterIcon,
  ShieldCheckIcon,
  ShirtIcon,
  SofaIcon,
  SolarPanelIcon,
  SproutIcon,
  SunIcon,
  ThermometerSunIcon,
  UtensilsCrossedIcon,
  UtilityPoleIcon,
  WashingMachineIcon,
  WavesLadderIcon,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";

import { propertyFeatures, type PropertyFeature } from "@/db/schema/properties";
import { cn } from "@/lib/utils";

type PropertyFeaturesProps = {
  features: readonly string[];
  className?: string;
};

const FEATURE_CONFIG = {
  air_conditioning: { label: "Air Conditioning", icon: AirVentIcon },
  heater: { label: "Heater", icon: HeaterIcon },
  underfloor_heating: { label: "Underfloor Heating", icon: ThermometerSunIcon },
  fireplace: { label: "Fireplace", icon: FlameKindlingIcon },
  furnished: { label: "Furnished", icon: SofaIcon },
  equipped_kitchen: { label: "Equipped Kitchen", icon: CookingPotIcon },
  laundry_room: { label: "Laundry Room", icon: WashingMachineIcon },
  dining_room: { label: "Dining Room", icon: UtensilsCrossedIcon },
  walk_in_closet: { label: "Walk-in Closet", icon: ShirtIcon },
  storage_room: { label: "Storage Room", icon: ArchiveIcon },
  balcony: { label: "Balcony", icon: FenceIcon },
  terrace: { label: "Terrace", icon: SunIcon },
  garden: { label: "Garden", icon: Flower2Icon },
  lawn: { label: "Lawn", icon: SproutIcon },
  swimming_pool: { label: "Swimming Pool", icon: WavesLadderIcon },
  gym: { label: "Gym", icon: DumbbellIcon },
  sauna: { label: "Sauna", icon: CloudFogIcon },
  elevator: { label: "Elevator", icon: ArrowUpDownIcon },
  security_system: { label: "Security System", icon: ShieldCheckIcon },
  video_surveillance: { label: "Video Surveillance", icon: CctvIcon },
  gated_access: { label: "Gated Access", icon: DoorClosedLockedIcon },
  wheelchair_accessible: { label: "Wheelchair Accessible", icon: AccessibilityIcon },
  solar_panels: { label: "Solar Panels", icon: SolarPanelIcon },
  electric_vehicle_charger: { label: "EV Charger", icon: EvChargerIcon },
  utility_connections: { label: "Utility Connections", icon: UtilityPoleIcon },
} satisfies Record<PropertyFeature, { label: string; icon: LucideIcon }>;

export default function PropertyFeatures({ features, className }: PropertyFeaturesProps) {
  const items = propertyFeatures.filter((feature) => features.includes(feature));

  if (items.length === 0) return null;

  const rowsPerColumn = Math.ceil(items.length / 2);

  return (
    <section aria-labelledby="property-features-heading" className={className}>
      <h2 id="property-features-heading" className="text-dark-blue text-xl font-semibold sm:text-2xl">
        Property Features
      </h2>
      <ul
        style={{ "--rows": rowsPerColumn } as CSSProperties}
        className={cn(
          "mt-5 grid gap-y-4 text-sm sm:mt-8 sm:gap-y-6",
          "md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(var(--rows),auto)] md:gap-x-10"
        )}
      >
        {items.map((feature) => {
          const { label, icon: Icon } = FEATURE_CONFIG[feature];

          return (
            <li key={feature} className="text-grey flex items-center gap-3.5">
              <span className="bg-primary/10 text-primary flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon aria-hidden className="size-3" />
              </span>
              {label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
