import { soma } from "./soma";

describe("Funcao Simples de Soma", () => {
  test("deve retornar a soma de dois numeros", () => {
    expect(soma(2, 3)).toBe(5);
  });
});
