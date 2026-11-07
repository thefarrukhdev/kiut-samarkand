"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { ArticleHero } from "./ArticleHero";
import { ArticleContent } from "./ArticleContent";
import { ArticleShareBar } from "./ArticleShareBar";
import { RelatedNewsSection } from "./RelatedNewsSection";
import { enrichArticle, type EnrichedArticle } from "@/lib/news";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/types";

interface NewsArticleClientProps {
  initialArticle: EnrichedArticle;
  initialRelated: EnrichedArticle[];
  index: number;
  detectedLocale: Locale;
}

export function NewsArticleClient({
  initialArticle,
  initialRelated,
  index,
  detectedLocale,
}: NewsArticleClientProps) {
  const { locale, setLocale } = useLocale();
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  // Sync article localization if user switches language on page
  const article = React.useMemo(() => {
    if (locale === detectedLocale) {
      return initialArticle;
    }
    return enrichArticle(index, locale);
  }, [locale, detectedLocale, index, initialArticle]);

  // Handle locale switch
  const handleLocaleChange = React.useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
    },
    [setLocale]
  );

  // Localized UI strings
  const labels = React.useMemo(() => {
    switch (locale) {
      case "ru":
        return {
          home: "Главная",
          news: "Новости",
          allStories: "Все новости",
          related: "Другие публикации",
          highlights: "Ключевые факты",
          share: "Поделиться материалом:",
          copied: "Ссылка скопирована!",
          admissionTitle: "Поступайте в KIUT Samarkand",
          admissionDesc: "Прием на 2026/2027 учебный год открыт. Подайте заявку онлайн прямо сейчас.",
          admissionCta: "Подать заявку",
        };
      case "en":
        return {
          home: "Home",
          news: "News",
          allStories: "All Stories",
          related: "Related Stories",
          highlights: "Key Highlights",
          share: "Share this story:",
          copied: "Link copied!",
          admissionTitle: "Admissions at KIUT Samarkand",
          admissionDesc: "Admissions for 2026/2027 are officially open. Submit your application online today.",
          admissionCta: "Apply Now",
        };
      default:
        return {
          home: "Bosh sahifa",
          news: "Yangiliklar",
          allStories: "Barcha yangiliklar",
          related: "Boshqa yangiliklar",
          highlights: "Muhim faktlar",
          share: "Maqolani ulashish:",
          copied: "Havola nusxalandi!",
          admissionTitle: "KIUT Samarqandga qabul",
          admissionDesc: "2026/2027 o'quv yili uchun qabul davom etmoqda. Onlayn ariza qoldiring.",
          admissionCta: "Ariza topshirish",
        };
    }
  }, [locale]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar
        onLocaleChange={handleLocaleChange}
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
      />

      <main className="flex-1 py-8 sm:py-12">
        <Container>
          {/* Breadcrumb Navigation Trail */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: labels.home, href: "/" },
                { label: labels.news, href: "/news" },
                { label: article.title },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Body Column */}
            <div className="lg:col-span-8">
              <ArticleHero article={article} />

              <ArticleContent
                article={article}
                highlightsHeading={labels.highlights}
              />

              <ArticleShareBar
                title={article.title}
                shareHeading={labels.share}
                copyToastLabel={labels.copied}
              />
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Admission CTA Card */}
              <div className="p-6 rounded-3xl bg-[#172D50] text-white shadow-lg space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0096DB]/20 text-[#0096DB] border border-[#0096DB]/30">
                  Qabul 2026/2027
                </span>
                <h3 className="text-xl font-bold leading-tight">
                  {labels.admissionTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {labels.admissionDesc}
                </p>
                <Button
                  onClick={() => setAdmissionModalOpen(true)}
                  className="w-full bg-[#0096DB] hover:bg-[#0085c4] text-white font-semibold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{labels.admissionCta}</span>
                </Button>
              </div>

              {/* Quick Links Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  Foydali Havolalar
                </h4>
                <div className="space-y-2">
                  <Link
                    href="/programs"
                    className="flex items-center justify-between text-xs text-slate-600 hover:text-[#0096DB] p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>Barcha Yo&apos;nalishlar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/admission"
                    className="flex items-center justify-between text-xs text-slate-600 hover:text-[#0096DB] p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>Qabul Shartlari</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between text-xs text-slate-600 hover:text-[#0096DB] p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>Bog&apos;lanish & Xarita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related News Section */}
          <RelatedNewsSection
            articles={initialRelated}
            heading={labels.related}
            viewAllLabel={labels.allStories}
          />
        </Container>
      </main>

      <Footer currentLocale={locale} />
      <FloatingContact />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />
    </div>
  );
}
