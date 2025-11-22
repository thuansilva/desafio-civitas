import { NeighborhoodRepository } from "@/core/ports/neighborhood-repository";
import {
  NeighborhoodWithLatestReading,
  AirQualityReading,
} from "@/core/domain/neighborhood";

export class ApiNeighborhoodRepository implements NeighborhoodRepository {
  async getAll(): Promise<NeighborhoodWithLatestReading[]> {
    const res = await fetch("/api/neighborhoods", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar dados do servidor");
    }

    return res.json();
  }

  async getReadings(id: string): Promise<AirQualityReading[]> {
    const res = await fetch(`/api/neighborhoods/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar dados do servidor");
    }

    return res.json();
  }
}
