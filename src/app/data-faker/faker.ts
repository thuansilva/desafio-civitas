export const FAKE_DETAILS_DATA = [
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
      co: 0.4,
      quality_level: "bom",
      recorded_at: "2023-10-01T12:00:00Z",
      created_at: "2023-10-01T12:05:00Z",
    },
  },
  {
    id: "2",
    name: "Bairro B",
    latitude: -22.9021,
    longitude: -43.2103,
    created_at: "2023-01-05T00:00:00Z",
    latest_reading: null,
  },
];
