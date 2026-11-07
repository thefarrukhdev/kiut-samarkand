"use client";

import React from "react";
import { NewsCard } from "./NewsCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { EnrichedArticle } from "@/lib/news";

interface NewsGridProps {
  articles: EnrichedArticle[];
  emptyTitle?: string;
  emptyDescription?: string;
  resetButtonLabel?: string;
  onResetFilters?: () => void;
}

export function NewsGrid({
  articles,
  emptyTitle = "Yangiliklar topilmadi",
  emptyDescription = "Tanlangan kategoriya yoki qidiruv so'rovi bo'yicha hech qanday yangilik topilmadi.",
  resetButtonLabel = "Filtrlarni tozalash",
  onResetFilters,
}: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={
          onResetFilters ? (
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              {resetButtonLabel}
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <NewsCard
          key={`${article.slug}-${idx}`}
          article={article}
          priority={idx === 0}
        />
      ))}
    </div>
  );
}
