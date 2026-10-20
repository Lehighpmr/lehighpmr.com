/**
 * Storage backend for listings + uploads.
 * - Local: filesystem (`data/listings.json`, `public/uploads`)
 * - Vercel: Blob store when BLOB_READ_WRITE_TOKEN or OIDC (BLOB_STORE_ID) is present
 */

export function usesBlobStorage() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID &&
        (process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL)),
  );
}

export function storageLabel() {
  return usesBlobStorage() ? "vercel-blob" : "local-fs";
}
