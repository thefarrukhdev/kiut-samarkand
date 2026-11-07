import { describe, expect, it } from "bun:test";
import { POST as contactHandler } from "@/app/api/contact/route";
import { escapeCsvField } from "@/app/api/admin/leads/export/route";
import { db } from "@/lib/db/store";

describe("Contact Inquiries API & Security Verification", () => {
  it("accepts a valid contact form submission and persists it in db", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Akmal Karimov",
        phone: "+998 (90) 123-45-67",
        subject: "Magistratura qabuli",
        message: "Assalomu alaykum, sirtqi ta'lim bo'yicha ma'lumot olmoqchi edim.",
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();

    // Verify it was stored in db
    const messages = db.getContactMessages();
    const found = messages.find((m) => m.id === data.id);
    expect(found).toBeDefined();
    expect(found?.fullName).toBe("Akmal Karimov");
    expect(found?.phone).toBe("+998 (90) 123-45-67");
    expect(found?.message).toContain("sirtqi ta'lim");
  });

  it("rejects contact submission with short name", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Al",
        phone: "+998 (90) 123-45-67",
        message: "Test message here.",
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("rejects contact submission with invalid phone number", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Akmal Karimov",
        phone: "+998 12 345-67",
        message: "Test message here.",
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(400);
  });

  it("rejects contact submission with message shorter than 5 chars", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Akmal Karimov",
        phone: "+998 (90) 123-45-67",
        message: "Sal",
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(400);
  });

  it("rejects contact submission with malformed JSON body", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ invalid json string",
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("rejects contact submission with overly long full name or message", async () => {
    const longNameReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "A".repeat(125),
        phone: "+998 (90) 123-45-67",
        message: "Valid test message here.",
      }),
    });

    const resLongName = await contactHandler(longNameReq);
    expect(resLongName.status).toBe(400);

    const longMsgReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Akmal Karimov",
        phone: "+998 (90) 123-45-67",
        message: "M".repeat(3005),
      }),
    });

    const resLongMsg = await contactHandler(longMsgReq);
    expect(resLongMsg.status).toBe(400);
  });

  it("mitigates CSV formula injection attacks by prefixing dangerous characters", () => {
    // Dangerous formula prefixes: =, +, -, @, \t, \r, \n, |
    expect(escapeCsvField("=cmd|' /C calc'!A0")).toBe("\"'=cmd|' /C calc'!A0\"");
    expect(escapeCsvField("+1234567890")).toBe("\"'+1234567890\"");
    expect(escapeCsvField("-2+5")).toBe("\"'-2+5\"");
    expect(escapeCsvField("@SUM(A1:A10)")).toBe("\"'@SUM(A1:A10)\"");
    expect(escapeCsvField("\tTabbed")).toBe("\"'\tTabbed\"");
    expect(escapeCsvField("\rReturn")).toBe("\"'\rReturn\"");
    expect(escapeCsvField("\nNewlineFormula")).toBe("\"'\nNewlineFormula\"");

    // Crucial edge case: Leading whitespace before formula symbols
    expect(escapeCsvField("  =cmd|' /C calc'!A0")).toBe("\"'  =cmd|' /C calc'!A0\"");
    expect(escapeCsvField("   @SUM(1,2)")).toBe("\"'   @SUM(1,2)\"");

    // Safe values remain unchanged (except standard CSV escaping)
    expect(escapeCsvField("Normal Name")).toBe('"Normal Name"');
    expect(escapeCsvField("Quoted \"Value\"")).toBe('"Quoted ""Value"""');
    expect(escapeCsvField(null)).toBe('""');
    expect(escapeCsvField(undefined)).toBe('""');
  });
});
