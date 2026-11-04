import type { Metadata } from "next";
import { notFound } from "next/navigation";
import rawNewsData from "@/data/news.json";
import { getNewsBySlug } from "@/lib/news";
import { NewsArticleClient } from "@/components/news/NewsArticleClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Pre-renders all static paths for all 60 news articles across uz, ru, and en.
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const uzPaths = rawNewsData.uz.map((article) => ({ slug: article.slug }));
  const ruPaths = rawNewsData.ru.map((article) => ({ slug: article.slug }));
  const enPaths = rawNewsData.en.map((article) => ({ slug: article.slug }));

  return [...uzPaths, ...ruPaths, ...enPaths];
}

/**
 * Generates dynamic OpenGraph and SEO metadata for the requested article slug.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getNewsBySlug(slug);

  if (!result) {
    return {
      title: "Yangilik topilmadi — KIUT Samarkand",
      description: "So'ralgan yangilik sahifasi mavjud emas yoki ko'chirilgan.",
    };
  }

  const { article } = result;
  const truncatedSummary =
    article.summary.length > 160
      ? `${article.summary.slice(0, 157)}...`
      : article.summary;

  return {
    title: `${article.title} — KIUT Samarkand`,
    description: truncatedSummary,
    openGraph: {
      title: article.title,
      description: truncatedSummary,
      type: "article",
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const result = getNewsBySlug(slug);

  if (!result) {
    notFound();
  }

  return (
    <NewsArticleClient
      initialArticle={result.article}
      initialRelated={result.related}
      index={result.index}
      detectedLocale={result.detectedLocale}
    />
  );
}
