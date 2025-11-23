import { Skeleton } from "@/components/ui/skeleton";

export default function ListNeighborhoodSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-5 text-left h-[200px] flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="pt-2 border-t">
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
