import { cardVariants, containerVariants, imageVariants } from "@/components/cards/property-card";
import { Skeleton } from "@/components/ui/skeleton";

const orientation = "horizontal";

export default function PropertyCardSkeleton() {
  return (
    <div className={cardVariants({ orientation })}>
      <Skeleton className="absolute top-7 right-7 z-10 size-10 rounded-full" />

      <div className={containerVariants({ orientation })}>
        <Skeleton className={imageVariants({ orientation })} />

        <div className="flex flex-1 flex-col justify-around gap-4 px-5">
          <div>
            <Skeleton className="h-6 w-1/2 sm:h-7.5" />
            <Skeleton className="mt-3 h-5 w-1/3" />
          </div>

          <div className="grid grid-cols-[auto_305px] justify-between">
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
