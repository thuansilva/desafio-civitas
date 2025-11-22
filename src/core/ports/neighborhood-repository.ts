import {
  NeighborhoodWithLatestReading,
  AirQualityReading,
} from "@/core/domain/neighborhood";

export interface NeighborhoodRepository {
  getAll(): Promise<NeighborhoodWithLatestReading[]>;
  getReadings(id: string): Promise<AirQualityReading[]>;
}
