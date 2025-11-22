import { render, screen } from "@testing-library/react";
import AirQuality from "./air-quality";
import { NeighborhoodWithLatestReading } from "@/app/page";

const mockNeighborhoods: NeighborhoodWithLatestReading[] = [
  {
    id: "1",
    name: "Bairro Bom",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r1",
      neighborhood_id: "1",
      aqi: 40,
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
    name: "Bairro Moderado",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r2",
      neighborhood_id: "2",
      aqi: 80,
      pm10: 20,
      no2: 10,
      co: 1.0,
      quality_level: "moderado",
      recorded_at: "",
      created_at: "",
    },
  },
  {
    id: "3",
    name: "Bairro Ruim",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r3",
      neighborhood_id: "3",
      aqi: 120,
      pm10: 30,
      no2: 15,
      co: 1.5,
      quality_level: "ruim",
      recorded_at: "",
      created_at: "",
    },
  },
  {
    id: "4",
    name: "Bairro Péssimo 1",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r4",
      neighborhood_id: "4",
      aqi: 200,
      pm10: 50,
      no2: 25,
      co: 2.5,
      quality_level: "péssimo",
      recorded_at: "",
      created_at: "",
    },
  },
  {
    id: "5",
    name: "Bairro Péssimo 2",
    latitude: 0,
    longitude: 0,
    created_at: "",
    latest_reading: {
      id: "r5",
      neighborhood_id: "5",
      aqi: 250,
      pm10: 60,
      no2: 30,
      co: 3.0,
      quality_level: "péssimo",
      recorded_at: "",
      created_at: "",
    },
  },
];

describe("AirQuality Component", () => {
  it("should render quality labels correctly", () => {
    render(<AirQuality neighborhoods={[]} />);

    expect(screen.getByText("Bom")).toBeInTheDocument();
    expect(screen.getByText("Moderado")).toBeInTheDocument();
    expect(screen.getByText("Ruim")).toBeInTheDocument();
    expect(screen.getByText("Péssimo")).toBeInTheDocument();
  });

  it("should display zeros when no data is provided", () => {
    render(<AirQuality neighborhoods={[]} />);
    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(4);
  });

  test("should show correct count for neighborhood with quality level 'Bom'", () => {
    render(<AirQuality neighborhoods={mockNeighborhoods} />);

    const label = screen.getByText("Bom");
    const container = label.closest(".text-center");
    expect(container).toHaveTextContent("1");
  });

  test("should show correct count for neighborhood with quality level 'Moderado'", () => {
    render(<AirQuality neighborhoods={mockNeighborhoods} />);

    const label = screen.getByText("Moderado");
    const container = label.closest(".text-center");
    expect(container).toHaveTextContent("1");
  });

  test("should show correct count for neighborhood with quality level 'Ruim'", () => {
    render(<AirQuality neighborhoods={mockNeighborhoods} />);

    const label = screen.getByText("Ruim");
    const container = label.closest(".text-center");

    expect(container).toHaveTextContent("1");
  });

  test("should show correct count for neighborhood with quality level 'Pessimo'", () => {
    render(<AirQuality neighborhoods={mockNeighborhoods} />);

    const label = screen.getByText("Péssimo");
    const container = label.closest(".text-center");

    expect(container).toHaveTextContent("2");
  });
});
