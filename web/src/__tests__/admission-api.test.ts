import { describe, expect, it } from "bun:test";
import { POST } from "@/app/api/admission/route";

describe("Admission Lead API Route (/api/admission)", () => {
  it("accepts a valid lead submission and returns confirmationId", async () => {
    const req = new Request("http://localhost:3000/api/admission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Alisher Vohidov",
        phone: "+998 (90) 123-45-67",
        selectedFaculty: "Tibbiyot fakulteti",
        degree: "Bakalavriat",
        language: "O'zbek",
        studyType: "Kunduzgi",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.confirmationId).toMatch(/^KS-\d{8}$/);
    expect(data.lead.fullName).toBe("Alisher Vohidov");
    expect(data.lead.phone).toBe("+998 (90) 123-45-67");
    expect(data.lead.selectedFaculty).toBe("Tibbiyot fakulteti");
  });

  it("rejects an invalid full name", async () => {
    const req = new Request("http://localhost:3000/api/admission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "A",
        phone: "+998 (90) 123-45-67",
        selectedFaculty: "Tibbiyot fakulteti",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("kamida 3 belgi");
  });

  it("rejects an invalid phone number", async () => {
    const req = new Request("http://localhost:3000/api/admission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Alisher Vohidov",
        phone: "+998 (90) 123",
        selectedFaculty: "Tibbiyot fakulteti",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("telefon raqamini kiriting");
  });

  it("rejects missing selected faculty", async () => {
    const req = new Request("http://localhost:3000/api/admission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Alisher Vohidov",
        phone: "+998 (90) 123-45-67",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("fakultetni tanlang");
  });
});
