import type { DbNewsItem } from "./types";
import type { EnrichedArticle, CategoryBadgeVariant } from "@/lib/news";
import type { Locale } from "@/types";

export function dbNewsToEnrichedArticle(
  item: DbNewsItem,
  locale: Locale = "uz",
  index: number = 0
): EnrichedArticle {
  const categoryMap: Record<DbNewsItem["category"], "academic" | "partnership" | "student-life" | "sport"> = {
    academic: "academic",
    events: "partnership",
    campus: "student-life",
    sports: "sport",
  };

  const badgeMap: Record<DbNewsItem["category"], CategoryBadgeVariant> = {
    academic: "default",
    events: "accent",
    campus: "royal",
    sports: "action",
  };

  const currentCategory = categoryMap[item.category] || "academic";
  const badgeVariant = badgeMap[item.category] || "default";

  const locTitle = item.title[locale] || item.title.uz || "";
  const locSummary = item.summary[locale] || item.summary.uz || "";
  const locContent = item.content?.[locale] || item.summary[locale] || item.summary.uz || "";
  const locCategoryLabel = item.categoryLabel?.[locale] || item.categoryLabel?.uz || "Akademik";
  const locDate = item.date?.[locale] || item.date?.uz || "28-Oktabr, 2026";
  const locReadTime = item.readTime?.[locale] || item.readTime?.uz || "3 daqiqa";

  // Split content into paragraphs
  const paragraphs = locContent
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length === 0) {
    paragraphs.push(locSummary);
  }

  // Parse ID number if available
  const numericId = parseInt(item.id.replace(/\D/g, ""), 10) || 100 + index;

  return {
    id: numericId,
    index,
    slug: item.slug,
    locale,
    title: locTitle,
    summary: locSummary,
    category: currentCategory,
    categoryLabel: locCategoryLabel,
    categoryBadgeVariant: badgeVariant,
    date: locDate,
    readTime: locReadTime,
    image: item.image,
    imageCaption: locTitle,
    highlights: [
      locSummary,
      "Toshkent Kimyo xalqaro universiteti Samarqand filiali rasmiy axborot xizmati",
    ],
    paragraphs,
    pullQuote: {
      quote: locSummary,
      author: "KIUT Samarqand",
      role: "Matbuot Xizmati",
    },
  };
}
