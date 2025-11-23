import { render, screen } from "@testing-library/react";
import ListNeighborhood from "./list-neighborhood";
import { NeighborhoodWithLatestReading } from "@/core/domain/neighborhood";

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

  it("should call onNeighborhoodClick when clicked", () => {
    const mockClick = vi.fn();

    render(
      <ListNeighborhood
        neighborhoods={neighborhoods}
        onNeighborhoodClick={mockClick}
      />,
    );

    screen.getByRole("button").click();

    expect(mockClick).toHaveBeenCalledWith(neighborhoods[0]);
  });

  it("should format the update date correctly", () => {
    render(
      <ListNeighborhood
        neighborhoods={neighborhoods}
        onNeighborhoodClick={vi.fn()}
      />,
    );

    expect(screen.getByText(/Atualizado:/)).toBeInTheDocument();
  });
});
