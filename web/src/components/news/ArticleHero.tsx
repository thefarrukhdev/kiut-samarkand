import React from "react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EnrichedArticle } from "@/lib/news";

interface ArticleHeroProps {
  article: EnrichedArticle;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="space-y-6 mb-10">
      {/* Meta Row: Badge, Date, Read Time */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Badge variant={article.categoryBadgeVariant} className="font-semibold">
          {article.categoryLabel}
        </Badge>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-[#0096DB]" />
          <span>{article.date}</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Clock className="w-3.5 h-3.5 text-[#0096DB]" />
          <span>{article.readTime}</span>
        </span>
      </div>

      {/* Authoritative Editorial Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#172D50] tracking-tight leading-[1.2]">
        {article.title}
      </h1>

      {/* High-Resolution Hero Image Banner */}
      <figure className="pt-2">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
        {article.imageCaption && (
          <figcaption className="text-xs sm:text-sm text-slate-500 italic mt-3 px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0096DB] shrink-0" />
            <span>{article.imageCaption}</span>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
