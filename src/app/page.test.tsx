import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";

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
