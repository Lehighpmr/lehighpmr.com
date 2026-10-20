import { NextResponse } from "next/server";
import {
  hasInsecureProductionAuth,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { storageLabel, usesBlobStorage } from "@/lib/storage";

export async function GET() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json(
      {
        authenticated: false,
        storage: storageLabel(),
        blobConfigured: usesBlobStorage(),
        productionAuthBlocked: hasInsecureProductionAuth(),
      },
      { status: 401 },
    );
  }
  return NextResponse.json({
    authenticated: true,
    storage: storageLabel(),
    blobConfigured: usesBlobStorage(),
  });
}
