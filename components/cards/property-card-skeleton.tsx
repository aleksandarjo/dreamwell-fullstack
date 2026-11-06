import type { VariantProps } from "class-variance-authority";

import {
  cardVariants,
  containerVariants,
  contentVariants,
  footerVariants,
  imageVariants,
} from "@/components/cards/property-card";
import { Skeleton } from "@/components/ui/skeleton";

type PropertyCardSkeletonProps = VariantProps<typeof cardVariants>;

export default function PropertyCardSkeleton({ orientation = "vertical" }: PropertyCardSkeletonProps) {
  return (
    <div className={cardVariants({ orientation })}>
      <Skeleton className="absolute top-7 right-7 z-10 size-10 rounded-full" />

      <div className={containerVariants({ orientation })}>
        <Skeleton className={imageVariants({ orientation })} />

        <div className={contentVariants({ orientation })}>
          <div>
            <Skeleton className="h-6 w-1/2 sm:h-7.5" />
            <Skeleton className="mt-3 h-5 w-1/3" />
          </div>

          <div className={footerVariants({ orientation })}>
            <div className="flex flex-wrap items-center gap-4">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-5 w-20" />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[1fr_72px] items-stretch gap-2.5">
              <div className="border-grey/30 rounded-xl border p-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="mt-1 h-7 w-28 sm:h-8" />
              </div>
              <Skeleton className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
