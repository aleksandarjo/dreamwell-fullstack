import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import PropertyGallery from "@/components/properties/details/property-gallery";
import PropertyHeader from "@/components/properties/details/property-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getPropertyById } from "@/lib/queries/property.queries";
import { getPropertyImageUrl } from "@/lib/storage";

export async function generateMetadata({ params }: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const [coverImagePath] = property.galleryPaths;

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: coverImagePath ? [{ url: getPropertyImageUrl(coverImagePath), alt: property.title }] : undefined,
    },
  };
}

async function PropertyDetailsContent({ params }: Pick<PageProps<"/properties/[id]">, "params">) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <article>
      <PropertyHeader property={property} />
      <div className="mt-6 md:mt-12">
        <PropertyGallery title={property.title} imageUrls={property.galleryPaths.map(getPropertyImageUrl)} />
      </div>
    </article>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <div aria-hidden>
      <Skeleton className="h-5 w-72 max-w-full" />
      <Skeleton className="mt-6 h-9 w-2/3 max-w-xl md:mt-10 lg:h-14.5" />
      <Skeleton className="mt-2 h-6 w-56" />
      <div className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:aspect-[1620/650] md:grid-cols-[2fr_1fr] md:grid-rows-2 md:gap-5">
        <Skeleton className="col-span-2 aspect-4/3 rounded-xl md:col-span-1 md:row-span-2 md:aspect-auto" />
        <Skeleton className="aspect-4/3 rounded-xl md:aspect-auto" />
        <Skeleton className="aspect-4/3 rounded-xl md:aspect-auto" />
      </div>
    </div>
  );
}

export default function PropertyDetailsPage({ params }: PageProps<"/properties/[id]">) {
  return (
    <div className="container py-6 md:py-10">
      <Suspense fallback={<PropertyDetailsSkeleton />}>
        <PropertyDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
