export const FAKE_READING = [
  {
    id: "1",
    name: "Bairro A",
    latest_reading: [
      {
        id: "r1",
        neighborhood_id: "1",
        aqi: 42,
        pm10: 12,
        co: 0.4,
        quality_level: "bom",
        // Atualizado para 20 de Novembro de 2025, 20:00:00
        recorded_at: "2025-11-20T20:00:00Z",
        created_at: "2025-11-20T20:05:00Z",
      },
      {
        id: "r2",
        neighborhood_id: "1",
        aqi: 42,
        pm10: 12,
        co: 0.4,
        quality_level: "bom",
        // Atualizado para 20 de Novembro de 2025, 21:00:00
        recorded_at: "2025-11-20T21:00:00Z",
        created_at: "2025-11-20T21:05:00Z",
      },
      {
        id: "r3",
        neighborhood_id: "1",
        aqi: 50,
        pm10: 12,
        co: 0.4,
        quality_level: "moderado",
        // Atualizado para 20 de Novembro de 2025, 22:00:00
        recorded_at: "2025-11-20T22:00:00Z",
        created_at: "2025-11-20T22:05:00Z",
      },
      {
        id: "r4",
        neighborhood_id: "1",
        aqi: 120,
        pm10: 12,
        co: 0.4,
        quality_level: "ruim",
        // Atualizado para 20 de Novembro de 2025, 23:00:00
        recorded_at: "2025-11-20T23:00:00Z",
        created_at: "2025-11-20T23:05:00Z",
      },
      {
        id: "r5", // Mudei para r5 para evitar id duplicado com o anterior
        neighborhood_id: "1",
        aqi: 220,
        pm10: 12,
        co: 0.4,
        quality_level: "péssimo",
        // Atualizado para 21 de Novembro de 2025, 00:00:00 (Leitura Mais Recente)
        recorded_at: "2025-11-21T00:00:00Z",
        created_at: "2025-11-21T00:05:00Z",
      },
    ],
  },
];
