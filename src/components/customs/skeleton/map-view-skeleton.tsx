import { Skeleton } from "@/components/ui/skeleton";

export function MapViewSkeleton() {
  return (
    <div className="h-[500px] w-full flex items-center justify-center bg-muted rounded-lg relative overflow-hidden">
      <Skeleton className="h-full w-full absolute inset-0" />
      <div className="z-10 flex flex-col items-center gap-2">
        <p className="text-muted-foreground font-medium">Carregando mapa...</p>
      </div>
    </div>
  );
}
