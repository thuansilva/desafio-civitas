import { QualityLevel } from "@/lib/utils";

export interface AirQualityReading {
  id: string;
  neighborhood_id: string;
  aqi: number;
  pm10: number;
  no2: number;
  co: number;
  quality_level: QualityLevel;
  recorded_at: string;
  created_at: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface NeighborhoodWithLatestReading extends Neighborhood {
  latest_reading?: AirQualityReading;
}
