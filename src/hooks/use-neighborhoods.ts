import { useState, useEffect } from "react";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";
import { NeighborhoodRepository } from "@/core/ports/neighborhood-repository";
import { ApiNeighborhoodRepository } from "@/repository/api-neighborhood-repository";

export function useNeighborhoods(
  repository: NeighborhoodRepository = new ApiNeighborhoodRepository(),
) {
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithLatestReading[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setNeighborhoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return { neighborhoods, loading, error, refetch: loadData };
}
