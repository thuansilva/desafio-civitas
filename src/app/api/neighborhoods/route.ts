import { FAKE_DETAILS_DATA } from "@/app/data-faker/faker";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(FAKE_DETAILS_DATA);
}
