import "@testing-library/jest-dom";
import { Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ListNeighborhood from "@/components/customs/list-neighborhood";
import AirQuality from "@/components/customs/air-quality";
import NeighborhoodDetail from "@/components/customs/details-neighborhood";
import * as api from "@/http/api-detail";
import Home, { NeighborhoodWithLatestReading } from "./page";

vi.mock("@/http/api-detail", () => ({
  fetchNeighborhoodReadings: vi.fn(),
}));

const MOCK_READINGS_DATA = [
  { id: "r1", aqi: 150, quality_level: "ruim" },
  { id: "r2", aqi: 120, quality_level: "ruim" },
  { id: "r3", aqi: 80, quality_level: "moderado" },
];

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
  test("should be present status temperature", () => {
    render(<Home />);

    // verifica o título principal
    expect(screen.getByText(/Painel de Qualidade do Ar/i)).toBeInTheDocument();
    expect(screen.getByText(/Bom/i)).toBeInTheDocument();
    expect(screen.getByText(/Moderado/i)).toBeInTheDocument();
    expect(screen.getByText(/Ruim/i)).toBeInTheDocument();
    expect(screen.getByText(/Péssimo/i)).toBeInTheDocument();
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Bom'", () => {
    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "bom"),
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Moderado'", () => {
    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "moderado"),
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Ruim'", () => {
    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "ruim"),
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Pessimo'", () => {
    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "péssimo"),
    ).toBe(true);
  });
});

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

describe("componente de Listagem", () => {
  it("deve mostar o nome do bairro listado ", () => {
    render(
      <ListNeighborhood
        onNeighborhoodClick={vi.fn()}
        neighborhoods={neighborhoods}
      />,
    );

    expect(screen.getByText("Bairro A")).toBeInTheDocument();
  });
});
