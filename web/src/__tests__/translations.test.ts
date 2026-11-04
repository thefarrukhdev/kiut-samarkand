import { describe, expect, it } from "bun:test";
import { translations } from "@/lib/translations";
import { dictionaries, getDictionary, uz, ru, en } from "@/lib/i18n";
import type { Locale } from "@/types";

describe("Translations Integrity & Modular i18n Architecture", () => {
  const locales: Locale[] = ["uz", "ru", "en"];

  it("contains all required locales via backward-compatible translations export", () => {
    locales.forEach((loc) => {
      expect(translations[loc]).toBeDefined();
    });
  });

  it("exports modular dictionaries and provides getDictionary helper", () => {
    expect(dictionaries.uz).toBe(uz);
    expect(dictionaries.ru).toBe(ru);
    expect(dictionaries.en).toBe(en);

    expect(getDictionary("uz")).toBe(uz);
    expect(getDictionary("ru")).toBe(ru);
    expect(getDictionary("en")).toBe(en);
  });

  it("has valid nav links and CTA for all locales", () => {
    locales.forEach((loc) => {
      const nav = translations[loc].nav;
      expect(nav.home.length).toBeGreaterThan(0);
      expect(nav.faculties.length).toBeGreaterThan(0);
      expect(nav.university.length).toBeGreaterThan(0);
      expect(nav.news.length).toBeGreaterThan(0);
      expect(nav.contact.length).toBeGreaterThan(0);
      expect(nav.cta.length).toBeGreaterThan(0);
    });
  });

  it("has 4 hero slides for each locale with titles and highlights", () => {
    locales.forEach((loc) => {
      const slides = translations[loc].hero.slides;
      expect(slides.length).toBe(4);
      slides.forEach((s) => {
        expect(s.title.length).toBeGreaterThan(0);
        expect(s.highlight.length).toBeGreaterThan(0);
        expect(s.description.length).toBeGreaterThan(0);
      });
    });
  });

  it("has 5 core stats for each locale matching the scraped metrics", () => {
    locales.forEach((loc) => {
      const stats = translations[loc].stats.items;
      expect(stats.length).toBe(5);
      expect(stats.find((s) => s.id === "faculties")?.targetValue).toBe(5);
      expect(stats.find((s) => s.id === "bachelor")?.targetValue).toBe(48);
      expect(stats.find((s) => s.id === "master")?.targetValue).toBe(36);
      expect(stats.find((s) => s.id === "professors")?.targetValue).toBe(150);
      expect(stats.find((s) => s.id === "students")?.targetValue).toBe(5000);
    });
  });

  it("has complete and populated FAQ translations across all locales", () => {
    locales.forEach((loc) => {
      const faq = translations[loc].faq;
      expect(faq).toBeDefined();
      expect(faq.sectionLabel.length).toBeGreaterThan(0);
      expect(faq.badge.length).toBeGreaterThan(0);
      expect(faq.title.length).toBeGreaterThan(0);
      expect(faq.description.length).toBeGreaterThan(0);
      expect(faq.helpCardTitle.length).toBeGreaterThan(0);
      expect(faq.helpCardPhone.length).toBeGreaterThan(0);
    });
  });
});
