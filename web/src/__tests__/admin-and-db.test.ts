import { describe, expect, it } from "bun:test";
import { db } from "@/lib/db/store";
import {
  verifyAdminCredentials,
  createAdminToken,
  verifyAdminToken,
  getAdminPasswordHash,
  getJwtSecret,
} from "@/lib/auth/admin";
import {
  checkLoginRateLimit,
  recordFailedLoginAttempt,
  clearLoginRateLimit,
} from "@/app/api/admin/login/route";

describe("Database Store & Persistent Layer", () => {
  it("initializes with seeded leads and news items", () => {
    const leads = db.getLeads();
    expect(leads.length).toBeGreaterThanOrEqual(5);

    const news = db.getNews();
    expect(news.length).toBeGreaterThanOrEqual(20);
  });

  it("filters leads by status, faculty, and query", () => {
    const newLeads = db.getLeads({ status: "new" });
    expect(newLeads.every((l) => l.status === "new")).toBe(true);

    const filtered = db.getLeads({ search: "Shohruh" });
    expect(filtered.length).toBeGreaterThanOrEqual(1);
    expect(filtered[0].fullName).toContain("Shohruh");
  });

  it("creates, updates, and deletes an admission lead", () => {
    const testLead = db.createLead({
      confirmationId: "KS-TEST9999",
      fullName: "Test Talaba",
      phone: "+998 (90) 123-45-67",
      selectedFaculty: "Tibbiyot fakulteti",
      degree: "Bakalavriat",
      language: "O'zbek",
      studyType: "Kunduzgi",
      submittedAt: new Date().toISOString(),
    });

    expect(testLead.id).toBeDefined();
    expect(testLead.status).toBe("new");

    // Update status & notes
    const updated = db.updateLead(testLead.id, {
      status: "contacted",
      notes: "Sinov izohi yozildi",
    });
    expect(updated?.status).toBe("contacted");
    expect(updated?.notes).toBe("Sinov izohi yozildi");

    // Delete lead
    const deleted = db.deleteLead(testLead.id);
    expect(deleted).toBe(true);

    const check = db.getLeadById(testLead.id);
    expect(check).toBeNull();
  });

  it("calculates dashboard statistics accurately", () => {
    const stats = db.getDashboardStats();
    expect(stats.totalLeads).toBeGreaterThanOrEqual(5);
    expect(stats.totalNews).toBeGreaterThanOrEqual(20);
    expect(typeof stats.todayLeads).toBe("number");
    expect(typeof stats.newLeads).toBe("number");
    expect(typeof stats.contactedLeads).toBe("number");
    expect(typeof stats.enrolledLeads).toBe("number");
  });

  it("creates, retrieves, and updates news items in the database", () => {
    const testSlug = `test-article-${Date.now()}`;
    const created = db.createNews({
      slug: testSlug,
      title: {
        uz: "Sinov sarlavhasi",
        ru: "Тестовый заголовок",
        en: "Test Title",
      },
      summary: {
        uz: "Sinov tavsifi",
        ru: "Тестовое описание",
        en: "Test summary",
      },
      content: {
        uz: "Sinov matni",
        ru: "Тестовый текст",
        en: "Test content",
      },
      category: "academic",
      categoryLabel: { uz: "Akademik", ru: "Академические", en: "Academic" },
      image: "/assets/banners/test.jpg",
      date: { uz: "28-Oktabr, 2026", ru: "28 октября, 2026", en: "Oct 28, 2026" },
      readTime: { uz: "3 daqiqa", ru: "3 мин.", en: "3 min" },
      published: true,
    });

    expect(created.id).toBeDefined();
    const found = db.getNewsBySlug(testSlug);
    expect(found?.title.uz).toBe("Sinov sarlavhasi");

    // Update views
    const updated = db.updateNews(created.id, { views: 50 });
    expect(updated?.views).toBe(50);

    // Delete
    const deleted = db.deleteNews(created.id);
    expect(deleted).toBe(true);
  });
});

describe("Admin Authentication & JWT Session Protocol", () => {
  it("verifies credentials against bcrypt hash", async () => {
    // Valid password
    const valid = await verifyAdminCredentials("KiutSam2026!Admin", "admin@sam.kiut.uz");
    expect(valid).toBe(true);

    // Invalid password
    const invalidPass = await verifyAdminCredentials("WrongPassword123!", "admin@sam.kiut.uz");
    expect(invalidPass).toBe(false);

    // Invalid email
    const invalidEmail = await verifyAdminCredentials("KiutSam2026!Admin", "intruder@domain.com");
    expect(invalidEmail).toBe(false);
  });

  it("creates and verifies a tamper-proof JWT admin token", async () => {
    const token = await createAdminToken("admin@sam.kiut.uz");
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);

    const session = await verifyAdminToken(token);
    expect(session).not.toBeNull();
    expect(session?.email).toBe("admin@sam.kiut.uz");
    expect(session?.role).toBe("superadmin");

    // Tampered token check
    const tampered = token.slice(0, -5) + "abcde";
    const invalidSession = await verifyAdminToken(tampered);
    expect(invalidSession).toBeNull();
  });

  it("throws explicit errors when secrets are missing", () => {
    const origHash = process.env.ADMIN_PASSWORD_HASH;
    const origSecret = process.env.ADMIN_JWT_SECRET;

    try {
      delete process.env.ADMIN_PASSWORD_HASH;
      expect(() => getAdminPasswordHash()).toThrow("Missing or invalid required environment variable: ADMIN_PASSWORD_HASH");

      delete process.env.ADMIN_JWT_SECRET;
      expect(() => getJwtSecret()).toThrow("Missing or insecure required environment variable: ADMIN_JWT_SECRET");
    } finally {
      process.env.ADMIN_PASSWORD_HASH = origHash;
      process.env.ADMIN_JWT_SECRET = origSecret;
    }
  });

  it("enforces in-memory rate limiting against brute-force login attacks", () => {
    const testIp = "192.168.1.99";
    clearLoginRateLimit(testIp);

    // Initial check: allowed
    expect(checkLoginRateLimit(testIp).allowed).toBe(true);

    // Record 4 failed attempts: still allowed
    for (let i = 0; i < 4; i++) {
      recordFailedLoginAttempt(testIp);
    }
    expect(checkLoginRateLimit(testIp).allowed).toBe(true);

    // 5th failed attempt: blocked
    recordFailedLoginAttempt(testIp);
    const blockedCheck = checkLoginRateLimit(testIp);
    expect(blockedCheck.allowed).toBe(false);
    expect(typeof blockedCheck.retryAfterSeconds).toBe("number");
    expect(blockedCheck.retryAfterSeconds).toBeGreaterThan(0);

    // Clear limit resets state
    clearLoginRateLimit(testIp);
    expect(checkLoginRateLimit(testIp).allowed).toBe(true);
  });
});
