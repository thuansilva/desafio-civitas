import { renderHook, act, waitFor } from "@testing-library/react";
import { useNeighborhoodFilter } from "./use-neighborhood-filter";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";

const mockNeighborhoods: NeighborhoodWithLatestReading[] = [
  {
    id: "1",
    name: "Bairro A",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r1",
      neighborhood_id: "1",
      aqi: 50,
      pm10: 10,
      no2: 5,
      co: 0.5,
      quality_level: "bom",
      recorded_at: "",
      created_at: "",
    },
  },
  {
    id: "2",
    name: "Bairro B",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r2",
      neighborhood_id: "2",
      aqi: 150,
      pm10: 20,
      no2: 10,
      co: 1.0,
      quality_level: "ruim",
      recorded_at: "",
      created_at: "",
    },
  },
  {
    id: "3",
    name: "Bairro C",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r3",
      neighborhood_id: "3",
      aqi: 300,
      pm10: 30,
      no2: 15,
      co: 1.5,
      quality_level: "péssimo",
      recorded_at: "",
      created_at: "",
    },
  },
];

describe("useNeighborhoodFilter Hook", () => {
  it("should return all neighborhoods initially", () => {
    const { result } = renderHook(() =>
      useNeighborhoodFilter(mockNeighborhoods),
    );

    expect(result.current.qualityFilter).toBe("all");
    expect(result.current.neighborhoodFilter).toBe("all");
    expect(result.current.filteredNeighborhoods).toHaveLength(3);
  });

  it("should filter by quality level", async () => {
    const { result } = renderHook(() =>
      useNeighborhoodFilter(mockNeighborhoods),
    );

    await waitFor(() => {
      result.current.setQualityFilter("bom");
      expect(result.current.filteredNeighborhoods).toHaveLength(1);
      expect(result.current.filteredNeighborhoods[0].name).toBe("Bairro A");
    });

    await waitFor(() => {
      result.current.setQualityFilter("ruim");
      expect(result.current.filteredNeighborhoods).toHaveLength(1);
      expect(result.current.filteredNeighborhoods[0].name).toBe("Bairro B");
    });
  });

  it("should filter by neighborhood id", async () => {
    const { result } = renderHook(() =>
      useNeighborhoodFilter(mockNeighborhoods),
    );

    await waitFor(() => {
      result.current.setNeighborhoodFilter("3");
      expect(result.current.filteredNeighborhoods).toHaveLength(1);
      expect(result.current.filteredNeighborhoods[0].name).toBe("Bairro C");
    });
  });

  it("should filter by both quality and neighborhood", async () => {
    const { result } = renderHook(() =>
      useNeighborhoodFilter(mockNeighborhoods),
    );

    await waitFor(() => {
      result.current.setQualityFilter("bom");
      result.current.setNeighborhoodFilter("1");
      expect(result.current.filteredNeighborhoods).toHaveLength(1);
      expect(result.current.filteredNeighborhoods[0].name).toBe("Bairro A");
    });

    await waitFor(() => {
      result.current.setQualityFilter("ruim");
      expect(result.current.filteredNeighborhoods).toHaveLength(0);
    });
  });

  it("should reset filters correctly", async () => {
    const { result } = renderHook(() =>
      useNeighborhoodFilter(mockNeighborhoods),
    );

    await waitFor(() => {
      result.current.setQualityFilter("bom");
      expect(result.current.filteredNeighborhoods).toHaveLength(1);
    });

    await waitFor(() => {
      result.current.setQualityFilter("all");
      expect(result.current.filteredNeighborhoods).toHaveLength(3);
    });
  });
});
