import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getPropertyById } from "@/lib/queries/property.queries";
import { getPropertyImageUrl } from "@/lib/storage";
import { formatPrice } from "@/lib/utils";

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
      <h1 className="text-dark-blue text-3xl font-semibold">{property.title}</h1>
      <p className="mt-4 text-2xl font-bold text-black">{formatPrice(property.price)}</p>
    </article>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <div aria-hidden>
      <Skeleton className="h-9 w-2/3 max-w-xl" />
      <Skeleton className="mt-4 h-8 w-40" />
    </div>
  );
}

export default function PropertyDetailsPage({ params }: PageProps<"/properties/[id]">) {
  return (
    <div className="container">
      <Suspense fallback={<PropertyDetailsSkeleton />}>
        <PropertyDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
