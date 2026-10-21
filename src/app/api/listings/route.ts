import { NextResponse } from "next/server";
import { readPublicListings } from "@/lib/listings-store";

export async function GET() {
  const listings = await readPublicListings();
  return NextResponse.json(
    { listings },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
