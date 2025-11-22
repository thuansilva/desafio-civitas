import NeighborhoodDetail from "./details-neighborhood";
import { render, waitFor, screen } from "@testing-library/react";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const { mockGetReadings } = vi.hoisted(() => {
  return {
    mockGetReadings: vi.fn(),
  };
});

vi.mock("@/repository/api-neighborhood-repository", () => {
  return {
    ApiNeighborhoodRepository: class {
      getReadings = mockGetReadings;
    },
  };
});

const MOCK_READINGS_DATA = [
  {
    id: "2",
    name: "Bairro A",
    latitude: -22.9068,
    longitude: -43.1729,
    created_at: "2023-01-01T00:00:00Z",
    latest_reading: {
      id: "r1",
      neighborhood_id: "1",
      aqi: 43,
      pm10: 12,
      no2: 5,
      co: 0.4,
      quality_level: "péssimo",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },
];

describe("component NeighborhoodDetail", () => {
  it.only("should show 'aqi', 'pm10' and 'quality level'", async () => {
    mockGetReadings.mockResolvedValue(MOCK_READINGS_DATA);

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
        onClose={vi.fn()}
      />,
    );

    expect(await screen.findByText("42")).toBeInTheDocument();
    expect(await screen.findByText("12.0")).toBeInTheDocument();
    expect(await screen.findByText("Bom")).toBeInTheDocument();
  });
});
