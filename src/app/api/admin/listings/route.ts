import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createListing, readAllListings } from "@/lib/listings-store";
import type { ListingInput } from "@/lib/listings-types";


export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const listings = await readAllListings();
  return NextResponse.json({ listings });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as ListingInput | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  try {
    const listing = await createListing(body);
    return NextResponse.json({ listing }, { status: 201 });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not create listing";
    const status = message.includes("Blob") || message.includes("storage")
      ? 503
      : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
