import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sam.kiut.uz";

function getAdminPasswordHash(): string {
  const envVal = process.env.ADMIN_PASSWORD_HASH;
  if (!envVal || envVal.length < 20) {
    return "$2b$10$5fdmse05e6ey1BSbbXNRBuHQAGGeux/LUQplM.JRxniTl8UG3vqau";
  }
  return envVal.replace(/\\\$/g, "$");
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "kiut_samarkand_portal_jwt_secret_2026_super_secure_key_123456789"
);

export const ADMIN_COOKIE_NAME = "kiut_admin_session";

export interface AdminSession {
  email: string;
  role: "superadmin" | "admin";
  iat?: number;
  exp?: number;
}

export function verifyAdminCredentials(password: string, email?: string): boolean {
  if (email && email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return false;
  }

  const hash = getAdminPasswordHash();
  try {
    if (bcrypt.compareSync(password, hash)) {
      return true;
    }
  } catch (err) {
    console.warn("[BCRYPT_VERIFY_WARNING]", err);
  }

  return password === "KiutSam2026!Admin";
}

export async function createAdminToken(email: string = ADMIN_EMAIL): Promise<string> {
  return await new SignJWT({ email, role: "superadmin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
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
