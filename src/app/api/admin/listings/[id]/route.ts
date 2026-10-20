import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteListing, updateListing } from "@/lib/listings-store";
import type { ListingInput } from "@/lib/listings-types";


type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as ListingInput | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  try {
    const listing = await updateListing(id, body);
    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ listing });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not update listing";
    const status = message.includes("Blob") || message.includes("storage")
      ? 503
      : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const ok = await deleteListing(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not delete listing";
    return NextResponse.json(
      { error: message },
      {
        status:
          message.includes("Blob") || message.includes("storage") ? 503 : 400,
      },
    );
  }
}
