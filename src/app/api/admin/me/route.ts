import { BlobNotFoundError, head } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  hasInsecureProductionAuth,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { storageLabel, usesBlobStorage } from "@/lib/storage";

async function probeBlob() {
  if (!usesBlobStorage()) {
    return { blobConfigured: false, blobReachable: false as boolean | null };
  }
  try {
    await head("data/listings-pointer.json");
    return { blobConfigured: true, blobReachable: true };
  } catch (e) {
    if (e instanceof BlobNotFoundError) {
      // Store credentials work; pointer simply not created yet.
      return { blobConfigured: true, blobReachable: true };
    }
    return {
      blobConfigured: true,
      blobReachable: false,
      blobError: e instanceof Error ? e.message : "Blob probe failed",
    };
  }
}

export async function GET() {
  const blob = await probeBlob();
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json(
      {
        authenticated: false,
        storage: storageLabel(),
        productionAuthBlocked: hasInsecureProductionAuth(),
        ...blob,
      },
      { status: 401 },
    );
  }
  return NextResponse.json({
    authenticated: true,
    storage: storageLabel(),
    ...blob,
  });
}
