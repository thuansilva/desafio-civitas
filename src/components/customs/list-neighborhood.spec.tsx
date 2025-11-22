import * as api from "@/http/api-detail";
import NeighborhoodDetail from "./details-neighborhood";
import { render, waitFor, screen } from "@testing-library/react";
import { Mock } from "vitest";
import ListNeighborhood from "./list-neighborhood";
import { NeighborhoodWithLatestReading } from "@/app/page";

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

describe("componente de Listagem", () => {
  it("should show the name of the neighborhood listed ", () => {
    render(
      <ListNeighborhood
        onNeighborhoodClick={vi.fn()}
        neighborhoods={neighborhoods}
      />,
    );

    expect(screen.getByText("Bairro A")).toBeInTheDocument();
  });
});
