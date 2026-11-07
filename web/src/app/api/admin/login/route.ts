import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth/admin";

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

// In-memory rate limiting map for brute-force protection
const loginRateLimiter = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_RATE_LIMIT_ENTRIES = 5000;

function pruneExpiredRateLimitEntries(now: number) {
  if (loginRateLimiter.size < 500) return;
  for (const [key, entry] of loginRateLimiter.entries()) {
    if (now - entry.lastAttempt > WINDOW_MS && (!entry.blockedUntil || entry.blockedUntil <= now)) {
      loginRateLimiter.delete(key);
    }
  }
  // Enforce absolute cap if still too large
  if (loginRateLimiter.size > MAX_RATE_LIMIT_ENTRIES) {
    const overflow = loginRateLimiter.size - MAX_RATE_LIMIT_ENTRIES;
    const keysToDelete = Array.from(loginRateLimiter.keys()).slice(0, overflow);
    for (const key of keysToDelete) {
      loginRateLimiter.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  pruneExpiredRateLimitEntries(now);
  const entry = loginRateLimiter.get(ip);
  if (!entry) return { allowed: true };

  // If currently locked out
  if (entry.blockedUntil && entry.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // If window expired, reset
  if (now - entry.lastAttempt > WINDOW_MS) {
    loginRateLimiter.delete(ip);
    return { allowed: true };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + WINDOW_MS;
    const retryAfterSeconds = Math.ceil(WINDOW_MS / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

export function recordFailedLoginAttempt(ip: string) {
  const now = Date.now();
  pruneExpiredRateLimitEntries(now);
  const entry = loginRateLimiter.get(ip);
  if (!entry || now - entry.lastAttempt > WINDOW_MS) {
    loginRateLimiter.set(ip, { attempts: 1, lastAttempt: now });
  } else {
    entry.attempts += 1;
    entry.lastAttempt = now;
    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.blockedUntil = now + WINDOW_MS;
    }
  }
}

export function clearLoginRateLimit(ip: string) {
  loginRateLimiter.delete(ip);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkLoginRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Juda ko'p xato urinishlar qilindi. Xavfsizlik yuzasidan tizim 15 daqiqaga bloklandi.",
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds || 900),
          },
        }
      );
    }

    let body: { email?: string; password?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Yaroqsiz so'rov ma'lumotlari." },
        { status: 400 }
      );
    }
    const { email, password } = body || {};

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Parol kiritilishi shart." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(password, email);
    if (!isValid) {
      recordFailedLoginAttempt(ip);
      return NextResponse.json(
        { success: false, error: "Email yoki maxfiy parol noto'g'ri." },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    clearLoginRateLimit(ip);

    const token = await createAdminToken(email || "admin@sam.kiut.uz");

    const response = NextResponse.json({
      success: true,
      message: "Admin tizimiga muvaffaqiyatli kirildi.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[ADMIN_LOGIN_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Avtorizatsiyada kutilmagan xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
