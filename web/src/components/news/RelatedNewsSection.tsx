import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "./NewsCard";
import type { EnrichedArticle } from "@/lib/news";

interface RelatedNewsSectionProps {
  articles: EnrichedArticle[];
  heading?: string;
  viewAllLabel?: string;
}

export function RelatedNewsSection({
  articles,
  heading = "Boshqa yangiliklar",
  viewAllLabel = "Barcha yangiliklar",
}: RelatedNewsSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172D50]">
          {heading}
        </h2>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0096DB] hover:underline"
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item, idx) => (
          <NewsCard key={`${item.slug}-${idx}`} article={item} />
        ))}
      </div>
    </section>
  );
}
