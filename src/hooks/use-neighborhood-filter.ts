import { useState, useMemo } from "react";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";
import { QualityLevel } from "@/lib/utils";

export function useNeighborhoodFilter(
  neighborhoods: NeighborhoodWithLatestReading[],
) {
  const [qualityFilter, setQualityFilter] = useState<QualityLevel | "all">(
    "all",
  );
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all");

  const filteredNeighborhoods = useMemo(() => {
    let filtered = [...neighborhoods];

    if (qualityFilter !== "all") {
      filtered = filtered.filter(
        (n) => n.latest_reading?.quality_level === qualityFilter,
      );
    }

    if (neighborhoodFilter !== "all") {
      filtered = filtered.filter((n) => n.id === neighborhoodFilter);
    }

    return filtered.sort((a, b) => a.id.localeCompare(b.id));
  }, [neighborhoods, qualityFilter, neighborhoodFilter]);

  return {
    qualityFilter,
    setQualityFilter,
    neighborhoodFilter,
    setNeighborhoodFilter,
    filteredNeighborhoods,
  };
}
