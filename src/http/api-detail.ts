import { AirQualityReading } from "@/app/page";

export async function fetchNeighborhoodReadings(
  neighborhoodId: string,
): Promise<AirQualityReading[]> {
  const res = await fetch(`/api/neighborhoods/${neighborhoodId}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
