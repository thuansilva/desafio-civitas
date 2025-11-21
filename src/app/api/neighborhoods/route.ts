import { FAKE_READING } from "@/app/data-faker/faker-details-neighborhood";
import { NextResponse } from "next/server";

export async function GET() {
  const neighborhood = FAKE_READING.map((n) => {
    return {
      id: n.id,
      name: n.name,
      latitude: n.latitude,
      longitude: n.longitude,
      created_at: n.created_at,
      latest_reading: n.latest_reading[0],
    };
  });

  return NextResponse.json(neighborhood);
}
