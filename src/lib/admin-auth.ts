import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lehigh_admin_session";
const DEMO_PASSWORD = "lehigh-demo-2026";

export function getDefaultDemoPassword() {
  return DEMO_PASSWORD;
}

export function isProductionDeploy() {
  return (
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && Boolean(process.env.VERCEL))
  );
}

/** True when production still uses the demo password or has none set. */
export function hasInsecureProductionAuth() {
  if (!isProductionDeploy()) return false;
  const password = process.env.ADMIN_PASSWORD;
  return !password || password === DEMO_PASSWORD;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEMO_PASSWORD;
}

function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }
  if (isProductionDeploy()) {
    // Prefer an explicit secret in production; fall back to password-derived.
    return `lehigh-session:${getAdminPassword()}:prod`;
  }
  return `lehigh-session:${getAdminPassword()}`;
}

export function createSessionToken() {
  const issued = Date.now().toString();
  const sig = createHmac("sha256", sessionSecret())
    .update(issued)
    .digest("hex");
  return `${issued}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  // 30-day sessions for phone use
  const age = Date.now() - Number(issued);
  if (!Number.isFinite(age) || age < 0 || age > 30 * 24 * 60 * 60 * 1000) {
    return false;
  }
  const expected = createHmac("sha256", sessionSecret())
    .update(issued)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyPassword(password: string) {
  const expected = getAdminPassword();
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function cookieOptions(maxAgeSeconds = 30 * 24 * 60 * 60) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
