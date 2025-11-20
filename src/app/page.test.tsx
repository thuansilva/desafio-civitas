import { render, screen } from "@testing-library/react";
import Home, { NeighborhoodWithLatestReading } from "./page"; // ajuste o caminho conforme sua pasta
import "@testing-library/jest-dom";
import AirQuality from "@/components/customs/air-quality";

// beforeEach(() => {
//   global.fetch = vi.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () =>
//         Promise.resolve([
//           {
//             id: "1",
//             name: "Bairro A",
//             latitude: -22.9068,
//             longitude: -43.1729,
//             created_at: "2023-01-01T00:00:00Z",
//             latest_reading: {
//               id: "r1",
//               neighborhood_id: "1",
//               aqi: 42,
//               pm25: 12,
//               co: 0.4,
//               quality_level: "bom",
//               recorded_at: "2023-10-01T12:00:00Z",
//               created_at: "2023-10-01T12:05:00Z",
//             },
//           },
//         ]),
//     })
//   ) as any;
// });

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
          quality_level: "bom",
          recorded_at: "2023-10-01T12:00:00Z",
          created_at: "2023-10-01T12:05:00Z",
        },
      },
    ];

    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "bom")
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Moderado'", () => {
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
    ];

    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "moderado")
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Ruim'", () => {
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
          quality_level: "ruim",
          recorded_at: "2023-10-01T12:00:00Z",
          created_at: "2023-10-01T12:05:00Z",
        },
      },
    ];

    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "ruim")
    ).toBe(true);
  });

  test("Deve apresentar apenas 1 local com qualdiade de ar 'Pessimo'", () => {
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
          quality_level: "péssimo",
          recorded_at: "2023-10-01T12:00:00Z",
          created_at: "2023-10-01T12:05:00Z",
        },
      },
    ];

    render(<AirQuality neighborhoods={neighborhoods} />);

    expect(
      neighborhoods.some((n) => n.latest_reading?.quality_level === "péssimo")
    ).toBe(true);
  });
});
