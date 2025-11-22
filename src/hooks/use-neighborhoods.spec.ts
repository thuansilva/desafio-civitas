import { renderHook, waitFor } from "@testing-library/react";
import { useNeighborhoods } from "./use-neighborhoods";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";
import { NeighborhoodRepository } from "@/core/ports/neighborhood-repository";
import { vi, describe, it, expect } from "vitest";

const mockData: NeighborhoodWithLatestReading[] = [
  {
    id: "1",
    name: "Bairro Teste",
    latitude: 0,
    longitude: 0,
    created_at: "2023-01-01",
    latest_reading: {
      id: "r1",
      neighborhood_id: "1",
      aqi: 50,
      pm10: 20,
      no2: 10,
      co: 5,
      quality_level: "bom",
      recorded_at: "2023-01-01",
      created_at: "2023-01-01",
    },
  },
  {
    id: "2",
    name: "Outro Bairro",
    latitude: 10,
    longitude: 10,
    created_at: "2023-01-02",
    latest_reading: undefined,
  },
];

describe("useNeighborhoods Hook", () => {
  it("deve retornar o estado inicial corretamente", () => {
    const mockRepository: NeighborhoodRepository = {
      getAll: vi.fn().mockReturnValue(new Promise(() => {})),
      getReadings: vi.fn(),
    };

    const { result } = renderHook(() => useNeighborhoods(mockRepository));

    expect(result.current.loading).toBe(true);
    expect(result.current.neighborhoods).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("deve buscar dados com sucesso", async () => {
    const mockRepository: NeighborhoodRepository = {
      getAll: vi.fn().mockResolvedValue(mockData),
      getReadings: vi.fn(),
    };

    const { result } = renderHook(() => useNeighborhoods(mockRepository));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.neighborhoods).toEqual(mockData);
      expect(result.current.error).toBeNull();
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  it("deve lidar com erros ao buscar dados", async () => {
    const errorMessage = "Erro ao buscar dados";
    const mockRepository: NeighborhoodRepository = {
      getAll: vi.fn().mockRejectedValue(new Error(errorMessage)),
      getReadings: vi.fn(),
    };

    const { result } = renderHook(() => useNeighborhoods(mockRepository));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.neighborhoods).toEqual([]);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it("deve permitir recarregar os dados (refetch)", async () => {
    const mockRepository: NeighborhoodRepository = {
      getAll: vi.fn().mockResolvedValue(mockData),
      getReadings: vi.fn(),
    };

    const { result } = renderHook(() => useNeighborhoods(mockRepository));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      result.current.refetch();
      expect(result.current.neighborhoods).toEqual(mockData);
    });
  });
});
