import { describe, expect, it } from "bun:test";
import { PROGRAMS_DATA } from "@/data/programs";
import { generateStaticParams } from "@/app/programs/[slug]/page";
import {
  getCurriculum,
  getAccreditationHighlights,
  getCareerOutcomes,
} from "@/lib/program-details";
import { getProgramsDictionary } from "@/lib/i18n/programs-dictionary";
import type { Locale } from "@/types";

describe("Academic Programs Architecture & Static Routing", () => {
  it("pre-renders all 27 static paths via generateStaticParams", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(27);

    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("davolash-ishi");
    expect(slugs).toContain("dasturiy-injiniring");
    expect(slugs).toContain("biznesni-boshqarish");
    expect(slugs).toContain("boshlangich-talim");
    expect(slugs).toContain("english-education");
  });

  it("has exact 1-to-1 slug parity across all supported locales (uz, ru, en)", () => {
    const uzSlugs = PROGRAMS_DATA.uz.map((p) => p.slug);
    const ruSlugs = PROGRAMS_DATA.ru.map((p) => p.slug);
    const enSlugs = PROGRAMS_DATA.en.map((p) => p.slug);

    expect(uzSlugs).toHaveLength(27);
    expect(ruSlugs).toHaveLength(27);
    expect(enSlugs).toHaveLength(27);

    for (const slug of uzSlugs) {
      expect(ruSlugs).toContain(slug);
      expect(enSlugs).toContain(slug);
    }
  });

  it("verifies every program has required academic metadata and valid modes", () => {
    const locales: Locale[] = ["uz", "ru", "en"];

    for (const loc of locales) {
      const list = PROGRAMS_DATA[loc];
      for (const p of list) {
        expect(p.id).toBeDefined();
        expect(p.slug).toBeDefined();
        expect(p.name.length).toBeGreaterThan(3);
        expect(p.duration.length).toBeGreaterThan(1);
        expect(p.description.length).toBeGreaterThan(10);
        expect(p.career.length).toBeGreaterThan(10);
        expect(p.languages.length).toBeGreaterThanOrEqual(1);
        expect(p.modes.length).toBeGreaterThanOrEqual(1);
        expect(["medicine", "engineering", "economy", "education", "philology"]).toContain(
          p.facultyId
        );
      }
    }
  });

  it("provides comprehensive localized curriculum modules for each program", () => {
    const sampleSlugs = [
      "davolash-ishi",
      "dasturiy-injiniring",
      "biznesni-boshqarish",
      "boshlangich-talim",
      "english-education",
    ];

    for (const slug of sampleSlugs) {
      const uzCurriculum = getCurriculum(slug, "engineering", "uz");
      const ruCurriculum = getCurriculum(slug, "engineering", "ru");
      const enCurriculum = getCurriculum(slug, "engineering", "en");

      expect(uzCurriculum.length).toBeGreaterThanOrEqual(6);
      expect(ruCurriculum.length).toBeGreaterThanOrEqual(6);
      expect(enCurriculum.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("provides accreditation and dual diploma credentials for each faculty", () => {
    const faculties = ["medicine", "engineering", "economy", "education", "philology"];

    for (const fac of faculties) {
      const uzAccred = getAccreditationHighlights(fac, "uz");
      const ruAccred = getAccreditationHighlights(fac, "ru");
      const enAccred = getAccreditationHighlights(fac, "en");

      expect(uzAccred.length).toBe(4);
      expect(ruAccred.length).toBe(4);
      expect(enAccred.length).toBe(4);

      expect(uzAccred[0].desc).toContain("039281");
      expect(ruAccred[0].desc).toContain("039281");
      expect(enAccred[0].desc).toContain("039281");
    }
  });

  it("resolves career outcomes for sample programs across locales", () => {
    const sampleProgram = PROGRAMS_DATA.uz[0];
    const uzCareer = getCareerOutcomes(sampleProgram, "uz");
    const ruCareer = getCareerOutcomes(sampleProgram, "ru");
    const enCareer = getCareerOutcomes(sampleProgram, "en");

    expect(uzCareer.length).toBeGreaterThanOrEqual(4);
    expect(ruCareer.length).toBeGreaterThanOrEqual(4);
    expect(enCareer.length).toBeGreaterThanOrEqual(4);
  });

  it("provides complete dictionary translation for programs directory and detail pages", () => {
    const locales: Locale[] = ["uz", "ru", "en"];

    for (const loc of locales) {
      const dict = getProgramsDictionary(loc);
      expect(dict.heroTitle).toBeDefined();
      expect(dict.faculties.medicine).toBeDefined();
      expect(dict.degrees.bachelor).toBeDefined();
      expect(dict.formats.day).toBeDefined();
      expect(dict.languages.uzbek).toBeDefined();
      expect(dict.aboutProgram).toBeDefined();
      expect(dict.careerHeading).toBeDefined();
      expect(dict.curriculumHeading).toBeDefined();
      expect(dict.accreditationHeading).toBeDefined();
      expect(dict.applyForProgram).toBeDefined();
    }
  });
});
