"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EnrichedArticle } from "@/lib/news";
import type { Locale } from "@/types";

interface NewsCardProps {
  article: EnrichedArticle;
  locale?: Locale;
  priority?: boolean;
}

export function NewsCard({ article, locale: propLocale, priority = false }: NewsCardProps) {
  const locale = propLocale || article.locale || "uz";
  const readMoreLabel =
    locale === "ru"
      ? "Читать подробнее"
      : locale === "en"
      ? "Read Full Story"
      : "Batafsil o'qish";

  return (
    <article className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 shadow-xs hover:shadow-md transition-all duration-300">
      {/* Article Image Container */}
      <Link
        href={`/news/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-surface"
        aria-label={article.title}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle Solid Overlay on hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant={article.categoryBadgeVariant}
            className="shadow-xs font-semibold"
          >
            {article.categoryLabel}
          </Badge>
        </div>
      </Link>

      {/* Article Body Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Date & Read Time */}
          <div className="flex items-center gap-4 text-xs font-medium text-muted mb-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>{article.date}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug tracking-tight mb-3">
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {/* Article Summary */}
          <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed mb-6">
            {article.summary}
          </p>
        </div>

        {/* Footer Action Link */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors"
          >
            <span>{readMoreLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            KIUT News
          </span>
        </div>
      </div>
    </article>
  );
}
