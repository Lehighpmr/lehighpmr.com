"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    setLoading(false);
    if (!res.ok) {
      setError("Wrong password");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm rounded-sm border border-[var(--brand-line)] bg-white p-5 shadow-sm">
      <h1 className="text-xl font-bold text-[var(--brand-navy)]">Admin login</h1>
      <p className="mt-2 text-sm text-[var(--brand-muted)]">
        Enter the admin password to manage rental listings.
      </p>
      <form onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-[var(--brand-navy)]">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full border border-[var(--brand-line)] px-3 text-base"
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center bg-[var(--brand-navy)] text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
