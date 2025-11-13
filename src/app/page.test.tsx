import { render, screen } from "@testing-library/react";
import Home from "./page"; // ajuste o caminho conforme sua pasta
import "@testing-library/jest-dom";

describe("Home component", () => {
  test("renderiza o título e os links principais", () => {
    render(<Home />);

    // verifica o título principal
    expect(
      screen.getByText(/To get started, edit the page\.tsx file\./i)
    ).toBeInTheDocument();

    // verifica a presença dos links
    expect(screen.getByText(/Templates/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentation/i)).toBeInTheDocument();
  });
});
