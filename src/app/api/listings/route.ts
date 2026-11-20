import { NextResponse } from "next/server";
import { readPublicListings } from "@/lib/listings-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await readPublicListings();
    return NextResponse.json(
      { listings },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/listings failed:", error);
    return NextResponse.json(
      { listings: [], error: "unavailable" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
