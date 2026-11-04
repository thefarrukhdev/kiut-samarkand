import { describe, expect, it } from "bun:test";
import {
  getAllNews,
  getAllNewsSlugs,
  getNewsBySlug,
  getNewsCategoryCounts,
  filterNews,
} from "@/lib/news";
import rawNewsData from "@/data/news.json";

describe("News Portal Data Architecture & Resolvers", () => {
  it("generates exactly 60 static params across uz, ru, and en", () => {
    const slugs = getAllNewsSlugs();
    expect(slugs.length).toBe(60);

    // Verify all slugs are non-empty and unique
    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.trim().length).toBeGreaterThan(0);
    });
  });

  it("loads 20 enriched articles for every supported locale", () => {
    const locales = ["uz", "ru", "en"] as const;

    locales.forEach((loc) => {
      const articles = getAllNews(loc);
      expect(articles.length).toBe(20);

      articles.forEach((a, idx) => {
        expect(a.id).toBe(idx + 1);
        expect(a.index).toBe(idx);
        expect(a.slug).toBe(rawNewsData[loc][idx].slug);
        expect(a.locale).toBe(loc);
        expect(a.title).toBe(rawNewsData[loc][idx].title);
        expect(a.date.length).toBeGreaterThan(0);
        expect(a.readTime.length).toBeGreaterThan(0);
        expect(a.image.startsWith("/assets/")).toBe(true);
        expect(a.paragraphs.length).toBeGreaterThan(0);
        expect(a.highlights.length).toBeGreaterThan(0);
        expect(a.pullQuote.quote.length).toBeGreaterThan(0);
        expect(a.pullQuote.author.length).toBeGreaterThan(0);
        expect(["academic", "partnership", "student-life", "sport"]).toContain(
          a.category
        );
      });
    });
  });

  it("resolves articles by slug for any locale and returns 3 related stories", () => {
    // Test resolving first uz article
    const firstUzSlug = rawNewsData.uz[0].slug;
    const uzResult = getNewsBySlug(firstUzSlug);

    expect(uzResult).not.toBeNull();
    if (uzResult) {
      expect(uzResult.article.slug).toBe(firstUzSlug);
      expect(uzResult.detectedLocale).toBe("uz");
      expect(uzResult.index).toBe(0);
      expect(uzResult.related.length).toBe(3);
      expect(uzResult.related[0].index).toBe(1);
    }

    // Test resolving first ru article
    const firstRuSlug = rawNewsData.ru[0].slug;
    const ruResult = getNewsBySlug(firstRuSlug);

    expect(ruResult).not.toBeNull();
    if (ruResult) {
      expect(ruResult.article.slug).toBe(firstRuSlug);
      expect(ruResult.detectedLocale).toBe("ru");
      expect(ruResult.index).toBe(0);
      expect(ruResult.related.length).toBe(3);
    }

    // Test resolving first en article
    const firstEnSlug = rawNewsData.en[0].slug;
    const enResult = getNewsBySlug(firstEnSlug);

    expect(enResult).not.toBeNull();
    if (enResult) {
      expect(enResult.article.slug).toBe(firstEnSlug);
      expect(enResult.detectedLocale).toBe("en");
      expect(enResult.index).toBe(0);
    }
  });

  it("returns null for non-existent slug", () => {
    const invalid = getNewsBySlug("non-existent-article-slug-12345");
    expect(invalid).toBeNull();
  });

  it("calculates category counts correctly", () => {
    const counts = getNewsCategoryCounts("uz");
    expect(counts.all).toBe(20);
    expect(counts.academic + counts.partnership + counts["student-life"] + counts.sport).toBe(20);
    expect(counts.academic).toBeGreaterThan(0);
    expect(counts.partnership).toBeGreaterThan(0);
    expect(counts["student-life"]).toBeGreaterThan(0);
    expect(counts.sport).toBeGreaterThan(0);
  });

  it("filters articles by category and query correctly", () => {
    const all = getAllNews("uz");

    // Filter by academic category
    const academic = filterNews(all, "academic");
    expect(academic.every((a) => a.category === "academic")).toBe(true);

    // Filter by search query
    const searchMatch = filterNews(all, "all", "parlament");
    expect(searchMatch.length).toBeGreaterThan(0);
    expect(
      searchMatch.every(
        (a) =>
          a.title.toLowerCase().includes("parlament") ||
          a.summary.toLowerCase().includes("parlament")
      )
    ).toBe(true);

    // Search query with no match
    const noMatch = filterNews(all, "all", "non_existent_keyword_xyz");
    expect(noMatch.length).toBe(0);
  });
});
