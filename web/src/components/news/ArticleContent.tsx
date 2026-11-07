import React from "react";
import { CheckCircle2, Quote } from "lucide-react";
import type { EnrichedArticle } from "@/lib/news";

interface ArticleContentProps {
  article: EnrichedArticle;
  highlightsHeading?: string;
}

export function ArticleContent({
  article,
  highlightsHeading = "Muhim faktlar",
}: ArticleContentProps) {
  return (
    <article className="prose prose-slate max-w-none space-y-6">
      {/* Editorial Lead Paragraph */}
      <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 sm:p-6 rounded-2xl border-l-4 border-[#0096DB]">
        {article.summary}
      </p>

      {/* Key Highlights Card */}
      {article.highlights && article.highlights.length > 0 && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 my-6 not-prose">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#172D50] mb-3">
            {highlightsHeading}
          </h2>
          <ul className="space-y-2.5">
            {article.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Paragraphs */}
      {article.paragraphs &&
        article.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {p}
          </p>
        ))}

      {/* Pull Quote */}
      {article.pullQuote && article.pullQuote.quote && (
        <blockquote className="my-8 not-prose p-6 sm:p-8 rounded-2xl bg-[#172D50] text-white relative overflow-hidden">
          <Quote className="w-12 h-12 text-[#0096DB]/20 absolute top-4 right-4" />
          <p className="text-base sm:text-lg italic font-medium leading-relaxed relative z-10 mb-4">
            &ldquo;{article.pullQuote.quote}&rdquo;
          </p>
          <footer className="text-xs sm:text-sm text-slate-300 relative z-10 flex flex-col">
            <cite className="font-bold text-white not-italic">
              {article.pullQuote.author}
            </cite>
            <span className="text-[#0096DB] text-xs">
              {article.pullQuote.role}
            </span>
          </footer>
        </blockquote>
      )}
    </article>
  );
}
