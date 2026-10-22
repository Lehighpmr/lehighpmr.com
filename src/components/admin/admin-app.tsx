"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  formatBeds,
  formatPrice,
  primaryImage,
  type Listing,
  type ListingStatus,
} from "@/lib/listings-types";
import { cn } from "@/lib/utils";

type FormState = {
  title: string;
  neighborhood: string;
  area: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  blurb: string;
  available: string;
  status: ListingStatus;
  images: string[];
};

const emptyForm = (): FormState => ({
  title: "",
  neighborhood: "",
  area: "",
  price: "",
  beds: "1",
  baths: "1",
  sqft: "",
  blurb: "",
  available: "Available now",
  status: "listed",
  images: [],
});

function toForm(listing: Listing): FormState {
  return {
    title: listing.title,
    neighborhood: listing.neighborhood,
    area: listing.area,
    price: String(listing.price),
    beds: String(listing.beds),
    baths: String(listing.baths),
    sqft: String(listing.sqft || ""),
    blurb: listing.blurb,
    available: listing.available,
    status: listing.status,
    images: [...listing.images],
  };
}

function toPayload(form: FormState) {
  return {
    title: form.title,
    neighborhood: form.neighborhood,
    area: form.area,
    price: Number(form.price) || 0,
    beds: Number(form.beds) || 0,
    baths: Number(form.baths) || 0,
    sqft: Number(form.sqft) || 0,
    blurb: form.blurb,
    available: form.available,
    status: form.status,
    images: form.images,
  };
}

export function AdminApp() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [blobConfigured, setBlobConfigured] = useState(true);
  const [blobReachable, setBlobReachable] = useState(true);
  const [statusBusyId, setStatusBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    const me = await fetch("/api/admin/me", { credentials: "include" });
    if (me.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    if (me.ok) {
      const info = (await me.json()) as {
        blobConfigured?: boolean;
        blobReachable?: boolean | null;
        blobError?: string;
      };
      setBlobConfigured(Boolean(info.blobConfigured));
      setBlobReachable(info.blobReachable !== false);
      if (info.blobConfigured && info.blobReachable === false) {
        setError(
          info.blobError ||
            "Vercel Blob is configured but not reachable. Check the Blob store connection and BLOB_READ_WRITE_TOKEN on Production.",
        );
      }
    }
    const res = await fetch("/api/admin/listings", { credentials: "include" });
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || `Could not load listings (${res.status})`);
      setLoading(false);
      return;
    }
    const data = (await res.json()) as { listings: Listing[] };
    setListings(data.listings);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setForm(emptyForm());
  }

  function startEdit(listing: Listing) {
    setCreating(false);
    setEditingId(listing.id);
    setForm(toForm(listing));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelForm() {
    setCreating(false);
    setEditingId(null);
    setForm(emptyForm());
  }

  async function saveForm(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = toPayload(form);
    const res = editingId
      ? await fetch(`/api/admin/listings/${editingId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/listings", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Save failed");
      return;
    }
    cancelForm();
    await load();
  }

  async function removeListing(id: string) {
    if (!confirm("Remove this listing permanently?")) return;
    setError("");
    const res = await fetch(`/api/admin/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Could not remove listing");
      return;
    }
    if (editingId === id) cancelForm();
    await load();
  }

  async function setStatus(listing: Listing, status: ListingStatus) {
    setError("");
    setStatusBusyId(listing.id);
    const previous = listings;
    // Optimistic UI — Hide / Mark rented should feel instant
    setListings((all) =>
      all.map((l) =>
        l.id === listing.id
          ? {
              ...l,
              status,
              available:
                status === "rented"
                  ? "Rented"
                  : status === "listed"
                    ? l.available === "Rented"
                      ? "Available now"
                      : l.available
                    : l.available,
            }
          : l,
      ),
    );
    const res = await fetch(`/api/admin/listings/${listing.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setListings(previous);
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Could not update status");
      setStatusBusyId(null);
      return;
    }
    const data = (await res.json()) as { listing: Listing };
    setListings((all) =>
      all.map((l) => (l.id === data.listing.id ? data.listing : l)),
    );
    setStatusBusyId(null);
  }

  async function onUpload(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploading(true);
    setError("");
    const file = fileList[0];
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body,
    });
    setUploading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Upload failed");
      return;
    }
    const data = (await res.json()) as { url: string };
    setForm((f) => ({ ...f, images: [data.url, ...f.images] }));
  }

  const showForm = creating || editingId;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--brand-navy)]">
            Rental listings
          </h1>
          <p className="mt-1 text-sm text-[var(--brand-muted)]">
            Changes show on the public Rentals page.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startCreate}
            className="min-h-11 rounded-sm bg-[var(--brand-navy)] px-4 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Add listing
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="min-h-11 rounded-sm border border-[var(--brand-line)] bg-white px-4 text-sm font-medium text-[var(--brand-navy)]"
          >
            Log out
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {blobConfigured && !blobReachable ? (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Storage warning: Blob env is present but the store did not respond.
          Saves will fail until Production Blob is connected.
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={(e) => void saveForm(e)}
          className="space-y-4 rounded-sm border border-[var(--brand-line)] bg-white p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[var(--brand-navy)]">
            {editingId ? "Edit listing" : "New listing"}
          </h2>

          <Field label="Title">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Neighborhood">
              <input
                required
                value={form.neighborhood}
                onChange={(e) =>
                  setForm((f) => ({ ...f, neighborhood: e.target.value }))
                }
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
            <Field label="Area">
              <input
                required
                value={form.area}
                onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field label="Rent / mo">
              <input
                required
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
            <Field label="Beds (0=studio)">
              <input
                type="number"
                min={0}
                step={1}
                value={form.beds}
                onChange={(e) => setForm((f) => ({ ...f, beds: e.target.value }))}
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
            <Field label="Baths">
              <input
                type="number"
                min={0}
                step={0.5}
                value={form.baths}
                onChange={(e) => setForm((f) => ({ ...f, baths: e.target.value }))}
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
            <Field label="Sq ft">
              <input
                type="number"
                min={0}
                value={form.sqft}
                onChange={(e) => setForm((f) => ({ ...f, sqft: e.target.value }))}
                className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
              />
            </Field>
          </div>
          <Field label="Availability note">
            <input
              value={form.available}
              onChange={(e) =>
                setForm((f) => ({ ...f, available: e.target.value }))
              }
              placeholder="Available now"
              className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as ListingStatus,
                }))
              }
              className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
            >
              <option value="listed">Listed (public)</option>
              <option value="rented">Rented (hidden from public)</option>
              <option value="hidden">Hidden</option>
            </select>
          </Field>
          <Field label="Short description">
            <textarea
              required
              rows={4}
              value={form.blurb}
              onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
              className="w-full border border-[var(--brand-line)] px-3 py-2 text-base"
            />
          </Field>
          <Field label="Photos">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => void onUpload(e.target.files)}
              className="block w-full text-sm"
            />
            <p className="mt-1 text-xs text-[var(--brand-muted)]">
              {uploading
                ? "Uploading…"
                : blobConfigured
                  ? "Photos upload to Vercel Blob (max 4MB). First image is the cover."
                  : "Local preview: photos save under public/uploads. On Vercel, connect a Blob store. First image is the cover."}
            </p>
            {form.images.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {form.images.map((src) => (
                  <li key={src} className="relative h-20 w-28 overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute right-1 top-1 bg-black/70 px-1 text-[10px] text-white"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          images: f.images.filter((i) => i !== src),
                        }))
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </Field>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="min-h-11 flex-1 bg-[var(--brand-accent)] px-4 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-60 sm:flex-none"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="min-h-11 border border-[var(--brand-line)] bg-white px-4 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="text-sm text-[var(--brand-muted)]">Loading listings…</p>
      ) : listings.length === 0 ? (
        <div className="rounded-sm border border-dashed border-[var(--brand-line)] bg-white px-4 py-12 text-center">
          <p className="font-semibold text-[var(--brand-navy)]">No listings yet</p>
          <p className="mt-2 text-sm text-[var(--brand-muted)]">
            Add your first rental to show it on the public Rentals page.
          </p>
          <button
            type="button"
            onClick={startCreate}
            className="mt-5 min-h-11 bg-[var(--brand-navy)] px-4 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Add listing
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {listings.map((listing) => (
            <li
              key={listing.id}
              className="rounded-sm border border-[var(--brand-line)] bg-white p-3 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-[var(--brand-surface-soft)]">
                  {listing.images[0] ? (
                    <Image
                      src={primaryImage(listing)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized={primaryImage(listing).startsWith("http")}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-[var(--brand-muted)]">
                      No photo
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[var(--brand-navy)]">
                        {listing.title}
                      </p>
                      <p className="text-sm text-[var(--brand-muted)]">
                        {listing.neighborhood} · {listing.area}
                      </p>
                    </div>
                    <StatusBadge status={listing.status} />
                  </div>
                  <p className="mt-1 text-sm text-[var(--brand-ink)]">
                    {formatPrice(listing.price)}/mo · {formatBeds(listing.beds)} ·{" "}
                    {listing.baths} bath
                    {listing.baths === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(listing)}
                  disabled={statusBusyId === listing.id}
                  className="min-h-10 border border-[var(--brand-navy)] px-3 text-xs font-semibold uppercase tracking-wide text-[var(--brand-navy)] disabled:opacity-50"
                >
                  Edit
                </button>
                {listing.status !== "listed" ? (
                  <button
                    type="button"
                    disabled={statusBusyId === listing.id}
                    onClick={() => void setStatus(listing, "listed")}
                    className="min-h-10 border border-[var(--brand-line)] px-3 text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
                  >
                    {statusBusyId === listing.id ? "Saving…" : "Show"}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={statusBusyId === listing.id}
                    onClick={() => void setStatus(listing, "rented")}
                    className="min-h-10 border border-[var(--brand-line)] px-3 text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
                  >
                    {statusBusyId === listing.id ? "Saving…" : "Mark rented"}
                  </button>
                )}
                {listing.status !== "hidden" ? (
                  <button
                    type="button"
                    disabled={statusBusyId === listing.id}
                    onClick={() => void setStatus(listing, "hidden")}
                    className="min-h-10 border border-[var(--brand-line)] px-3 text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
                  >
                    {statusBusyId === listing.id ? "Saving…" : "Hide"}
                  </button>
                ) : null}
                <button
                  type="button"
                  disabled={statusBusyId === listing.id}
                  onClick={() => void removeListing(listing.id)}
                  className="min-h-10 border border-red-200 px-3 text-xs font-semibold uppercase tracking-wide text-red-700 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-[var(--brand-navy)]">{label}</span>
      {children}
    </label>
  );
}

function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <span
      className={cn(
        "rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        status === "listed" && "bg-emerald-50 text-emerald-800",
        status === "rented" && "bg-amber-50 text-amber-800",
        status === "hidden" && "bg-slate-100 text-slate-600",
      )}
    >
      {status}
    </span>
  );
}
