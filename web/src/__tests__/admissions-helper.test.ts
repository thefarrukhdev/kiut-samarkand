import { describe, expect, it } from "bun:test";
import {
  FACULTIES_BY_LOCALE,
  DEGREE_OPTIONS_BY_LOCALE,
  STUDY_TYPE_OPTIONS_BY_LOCALE,
  LANGUAGE_OPTIONS_BY_LOCALE,
  resolveFacultyName,
} from "@/lib/admissions";
import type { Locale } from "@/types";

describe("Admissions Multi-Language Helper & Resolver", () => {
  const locales: Locale[] = ["uz", "ru", "en"];

  it("contains 5 core faculties for each supported locale", () => {
    locales.forEach((loc) => {
      expect(FACULTIES_BY_LOCALE[loc].length).toBe(5);
      const ids = FACULTIES_BY_LOCALE[loc].map((f) => f.id);
      expect(ids).toEqual(["medicine", "engineering", "economy", "education", "philology"]);
    });
  });

  it("contains valid degree, study type, and language options for each locale", () => {
    locales.forEach((loc) => {
      expect(DEGREE_OPTIONS_BY_LOCALE[loc].length).toBeGreaterThanOrEqual(3);
      expect(STUDY_TYPE_OPTIONS_BY_LOCALE[loc].length).toBe(3);
      expect(LANGUAGE_OPTIONS_BY_LOCALE[loc].length).toBe(3);
    });
  });

  it("resolves faculty names across locales correctly by name", () => {
    // Uzbek to Russian
    expect(resolveFacultyName("Tibbiyot fakulteti", "ru")).toBe("Факультет медицины");
    // Russian to English
    expect(resolveFacultyName("Факультет инженерии и IT", "en")).toBe("School of Engineering & IT");
    // English to Uzbek
    expect(resolveFacultyName("School of Business & Economy", "uz")).toBe("Iqtisodiyot fakulteti");
    // Uzbek to English
    expect(resolveFacultyName("Ta'lim fakulteti", "en")).toBe("School of Education");
    // English to Russian
    expect(resolveFacultyName("School of Philology", "ru")).toBe("Факультет филологии");
  });

  it("resolves faculty by ID as well", () => {
    expect(resolveFacultyName("medicine", "uz")).toBe("Tibbiyot fakulteti");
    expect(resolveFacultyName("engineering", "ru")).toBe("Факультет инженерии и IT");
    expect(resolveFacultyName("economy", "en")).toBe("School of Business & Economy");
  });

  it("falls back to default faculty when empty input is passed", () => {
    expect(resolveFacultyName("", "uz")).toBe("Tibbiyot fakulteti");
    expect(resolveFacultyName("", "ru")).toBe("Факультет медицины");
    expect(resolveFacultyName("", "en")).toBe("School of Medicine");
  });
});
