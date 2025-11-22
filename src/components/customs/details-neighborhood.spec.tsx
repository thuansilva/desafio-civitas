import * as api from "@/http/api-detail";
import NeighborhoodDetail from "./details-neighborhood";
import { render, waitFor, screen } from "@testing-library/react";
import { Mock } from "vitest";

vi.mock("@/http/api-detail", () => ({
  fetchNeighborhoodReadings: vi.fn(),
}));
const MOCK_READINGS_DATA = [
  { id: "r1", aqi: 150, quality_level: "ruim" },
  { id: "r2", aqi: 120, quality_level: "ruim" },
  { id: "r3", aqi: 80, quality_level: "moderado" },
];

describe("component NeighborhoodDetail", () => {
  test("deve mostrar o status da 'qualidade do ar', 'pm10' e 'aqi'  ", async () => {
    (api.fetchNeighborhoodReadings as Mock).mockResolvedValue({
      json: () => Promise.resolve(MOCK_READINGS_DATA),
    });
    render(
      <NeighborhoodDetail
        neighborhood={{
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
            quality_level: "péssimo",
            recorded_at: "2023-10-01T12:00:00Z",
            created_at: "2023-10-01T12:05:00Z",
          },
        }}
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Carregando dados...")).toBeInTheDocument();

    await waitFor(() => {
      const pm10Elements = screen.getAllByText(/12/i);
      expect(pm10Elements.length).toBeGreaterThan(0);
      expect(screen.getByText(/42/i)).toBeInTheDocument();
      expect(screen.getByText(/Péssimo/i)).toBeInTheDocument();
    });
  });
});
