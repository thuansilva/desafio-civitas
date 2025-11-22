import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Mock } from "vitest";
import Home from "./page";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  }),
) as Mock;

const neighborhoods: NeighborhoodWithLatestReading[] = [
  {
    id: "1",
    name: "Bairro A",
    latitude: -22.9068,
    longitude: -43.1729,
    created_at: "2023-01-01T00:00:00Z",

    latest_reading: {
      id: "r1",
      neighborhood_id: "1",
      aqi: 42,
      pm10: 12,
      no2: 5,
      co: 0.4,
      quality_level: "moderado",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },
  {
    id: "2",
    name: "Bairro B",
    latitude: -22.9068,
    longitude: -43.1729,
    created_at: "2023-01-01T00:00:00Z",

    latest_reading: {
      id: "r2",
      neighborhood_id: "1",
      aqi: 42,
      pm10: 12,
      no2: 5,
      co: 0.4,
      quality_level: "bom",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },
  {
    id: "3",
    name: "Bairro C",
    latitude: -22.9068,
    longitude: -43.1729,
    created_at: "2023-01-01T00:00:00Z",

    latest_reading: {
      id: "r2",
      neighborhood_id: "1",
      aqi: 42,
      pm10: 12,
      no2: 5,
      co: 0.4,
      quality_level: "ruim",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },

  {
    id: "4",
    name: "Bairro E",
    latitude: -22.9068,
    longitude: -43.1729,
    created_at: "2023-01-01T00:00:00Z",

    latest_reading: {
      id: "r2",
      neighborhood_id: "1",
      aqi: 42,
      pm10: 12,
      no2: 5,
      co: 0.4,
      quality_level: "péssimo",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },
];

describe("Page Home", () => {
  test("should be present status temperature", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(
        screen.getByText(/Painel de Qualidade do Ar/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Bom/i)).toBeInTheDocument();
      expect(screen.getByText(/Moderado/i)).toBeInTheDocument();
      expect(screen.getByText(/Ruim/i)).toBeInTheDocument();
      expect(screen.getByText(/Péssimo/i)).toBeInTheDocument();
    });
  });
});
