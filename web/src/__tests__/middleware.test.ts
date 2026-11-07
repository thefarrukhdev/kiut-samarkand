import { describe, expect, it } from "bun:test";
import { middleware } from "@/middleware";
import { createAdminToken } from "@/lib/auth/admin";
import { NextRequest } from "next/server";

describe("Admin Route & API Protection Middleware", () => {
  it("redirects unauthenticated requests from /admin/dashboard to /admin/login", async () => {
    const req = new NextRequest("http://localhost:3000/admin/dashboard");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/admin/login");
    expect(location).toContain("callbackUrl=%2Fadmin%2Fdashboard");
  });

  it("allows unauthenticated access to /admin/login", async () => {
    const req = new NextRequest("http://localhost:3000/admin/login");
    const res = await middleware(req);

    // Standard Next.js NextResponse.next() continues with 200
    expect(res.status).toBe(200);
  });

  it("redirects authenticated admin from /admin/login to /admin/dashboard", async () => {
    const token = await createAdminToken("admin@sam.kiut.uz");
    const req = new NextRequest("http://localhost:3000/admin/login", {
      headers: {
        cookie: `kiut_admin_session=${token}`,
      },
    });
    const res = await middleware(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/admin/dashboard");
  });

  it("blocks unauthenticated API requests to /api/admin/leads with 401 Unauthorized", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/leads");
    const res = await middleware(req);

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("allows unauthenticated POST to /api/admin/login", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/login", {
      method: "POST",
    });
    const res = await middleware(req);

    expect(res.status).toBe(200);
  });

  it("allows unauthenticated or expired POST to /api/admin/logout to clear cookie", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/logout", {
      method: "POST",
    });
    const res = await middleware(req);

    expect(res.status).toBe(200);
  });

  it("allows authenticated API requests to /api/admin/leads", async () => {
    const token = await createAdminToken("admin@sam.kiut.uz");
    const req = new NextRequest("http://localhost:3000/api/admin/leads", {
      headers: {
        cookie: `kiut_admin_session=${token}`,
      },
    });
    const res = await middleware(req);

    expect(res.status).toBe(200);
  });
});
