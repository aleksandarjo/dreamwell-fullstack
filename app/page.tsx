import PropertyCard from "@/components/cards/property-card";
import { getProperties } from "@/lib/queries/property.queries";

export default async function HomePage() {
  const properties = await getProperties();
  console.log(properties);
  return (
    <div className="container">
      {properties.data.map((property) => (
        <PropertyCard key={property.id} property={property} isFavorite={false} orientation="horizontal" />
      ))}
    </div>
  );
}
