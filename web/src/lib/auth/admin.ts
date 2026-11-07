import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sam.kiut.uz";

export function getAdminPasswordHash(): string {
  let envVal = process.env.ADMIN_PASSWORD_HASH;
  if (!envVal || envVal.trim().length < 20) {
    throw new Error("Missing or invalid required environment variable: ADMIN_PASSWORD_HASH");
  }
  envVal = envVal.trim().replace(/^['"]|['"]$/g, "");
  return envVal.replace(/\\\$/g, "$");
}

export function getJwtSecret(): Uint8Array {
  let secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.trim().length < 16) {
    throw new Error(
      "Missing or insecure required environment variable: ADMIN_JWT_SECRET (minimum 16 characters required)"
    );
  }
  secret = secret.trim().replace(/^['"]|['"]$/g, "");
  return new TextEncoder().encode(secret);
}

export const ADMIN_COOKIE_NAME = "kiut_admin_session";

export interface AdminSession {
  email: string;
  role: "superadmin" | "admin";
  iat?: number;
  exp?: number;
}

export async function verifyAdminCredentials(password: string, email?: string): Promise<boolean> {
  if (!password || typeof password !== "string") {
    return false;
  }

  if (email && email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return false;
  }

  const hash = getAdminPasswordHash();
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.error("[BCRYPT_VERIFY_ERROR]", err);
    return false;
  }
}

export async function createAdminToken(email: string = ADMIN_EMAIL): Promise<string> {
  return await new SignJWT({ email, role: "superadmin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (payload && payload.email) {
      return {
        email: String(payload.email),
        role: (payload.role as "superadmin" | "admin") || "superadmin",
        iat: payload.iat,
        exp: payload.exp,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
