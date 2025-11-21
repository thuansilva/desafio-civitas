import { FAKE_READING } from "@/app/data-faker/faker-details-neighborhood";
import { NextResponse, NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const neighborhood = FAKE_READING.find((n) => n.id === id);
  if (!neighborhood) {
    return NextResponse.json(
      { error: `Bairro com ID ${neighborhood} não encontrado` },
      { status: 404 },
    );
  }

  const latestReading = neighborhood.latest_reading;

  return NextResponse.json(latestReading);
}
