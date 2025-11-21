// import { FAKE_DETAILS_DATA } from "@/app/data-faker/faker";
import { NextResponse } from "next/server";

const FAKE_DETAILS_DATA = [
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

interface GetParams {
  params: {
    id: string[];
  };
}

export async function GET(request: Request, { params }: GetParams) {
  // Pega o primeiro elemento do array 'id' ou undefined se o array estiver vazio
  const neighborhoodId = params.id?.[0];
  console.log(neighborhoodId);

  if (neighborhoodId) {
    const neighborhood = FAKE_DETAILS_DATA.find((n) => n.id === neighborhoodId);

    if (!neighborhood) {
      // Se o ID foi fornecido mas o bairro não existe
      return NextResponse.json(
        { error: `Bairro com ID ${neighborhoodId} não encontrado` },
        { status: 404 },
      );
    }
    return NextResponse.json(neighborhood);
  } else {
    return NextResponse.json(FAKE_DETAILS_DATA);
  }
}
