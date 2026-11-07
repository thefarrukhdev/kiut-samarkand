"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import rawNewsData from "@/data/news.json";
import type { Locale } from "@/types";

export interface EnrichedNewsItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: "all" | "academic" | "partnership" | "student-life" | "sport";
  categoryLabel: string;
  categoryBadgeVariant: "default" | "accent" | "action" | "royal" | "gold" | "success";
  image: string;
  summary: string;
  readTime: string;
}

const curatedImages: string[] = [
  "/assets/banners/photo_2026-10-22_12-49-10.jpg__1920x1080_q85_crop_subsampling-2.jpg",
  "/assets/banners/photo_2026-10-22_17-11-57.jpg__1920x1080_q85_crop_subsampling-2.jpg",
  "/assets/banners/5be7a7df-2dc1-4914-b55b-ef42f837c41f_copy.png__1920x1080_q85_crop_subsampling-2.jpg",
  "/assets/photos/registan.jpg__1520x535_q85_subsampling-2.jpg",
  "/assets/banners/8y8a7608.jpg__1920x1080_q85_crop_subsampling-2.jpg",
  "/assets/banners/275e01d7-6c85-45ed-99f8-4cd81592bd8f.png__1920x1080_q85_crop_subsampling-2.jpg",
];

const categoryMeta: Record<
  Locale,
  Array<{
    category: EnrichedNewsItem["category"];
    label: string;
    badgeVariant: EnrichedNewsItem["categoryBadgeVariant"];
    date: string;
    readTime: string;
  }>
> = {
  uz: [
    { category: "student-life", label: "Talabalar Hayoti", badgeVariant: "accent", date: "28-Oktabr, 2026", readTime: "3 daqiqa o'qish" },
    { category: "partnership", label: "Hamkorlik", badgeVariant: "royal", date: "25-Oktabr, 2026", readTime: "2 daqiqa o'qish" },
    { category: "sport", label: "Sport & Madaniyat", badgeVariant: "accent", date: "23-Oktabr, 2026", readTime: "4 daqiqa o'qish" },
    { category: "academic", label: "Ma'naviyat & Meros", badgeVariant: "gold", date: "22-Oktabr, 2026", readTime: "5 daqiqa o'qish" },
    { category: "academic", label: "Akademik Yutuq", badgeVariant: "accent", date: "20-Oktabr, 2026", readTime: "3 daqiqa o'qish" },
    { category: "student-life", label: "Bayram & Ma'naviyat", badgeVariant: "default", date: "21-Oktabr, 2026", readTime: "3 daqiqa o'qish" },
  ],
  ru: [
    { category: "student-life", label: "Студенческая жизнь", badgeVariant: "accent", date: "28 октября, 2026", readTime: "3 мин. чтения" },
    { category: "partnership", label: "Сотрудничество", badgeVariant: "royal", date: "25 октября, 2026", readTime: "2 мин. чтения" },
    { category: "sport", label: "Спорт и культура", badgeVariant: "accent", date: "23 октября, 2026", readTime: "4 мин. чтения" },
    { category: "academic", label: "Культурное наследие", badgeVariant: "gold", date: "22 октября, 2026", readTime: "5 мин. чтения" },
    { category: "academic", label: "Академические успехи", badgeVariant: "accent", date: "20 октября, 2026", readTime: "3 мин. чтения" },
    { category: "student-life", label: "Праздники и культура", badgeVariant: "default", date: "21 октября, 2026", readTime: "3 мин. чтения" },
  ],
  en: [
    { category: "student-life", label: "Student Life", badgeVariant: "accent", date: "Oct 28, 2026", readTime: "3 min read" },
    { category: "partnership", label: "Partnership", badgeVariant: "royal", date: "Oct 25, 2026", readTime: "2 min read" },
    { category: "sport", label: "Sports & Culture", badgeVariant: "accent", date: "Oct 23, 2026", readTime: "4 min read" },
    { category: "academic", label: "Heritage & Culture", badgeVariant: "gold", date: "Oct 22, 2026", readTime: "5 min read" },
    { category: "academic", label: "Academic Milestone", badgeVariant: "accent", date: "Oct 20, 2026", readTime: "3 min read" },
    { category: "student-life", label: "Campus Event", badgeVariant: "default", date: "Oct 21, 2026", readTime: "3 min read" },
  ],
};

interface NewsSectionProps {
  currentLocale?: Locale;
}

export function NewsSection({ currentLocale: propLocale }: NewsSectionProps = {}) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("news");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? (translations[propLocale]?.news || contextT) : contextT;

  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [selectedArticleSlug, setSelectedArticleSlug] = React.useState<string | null>(null);

  // Transform raw scraped news data dynamically for currentLocale
  const enrichedArticles: EnrichedNewsItem[] = React.useMemo(() => {
    const rawLocaleList = rawNewsData[currentLocale] || rawNewsData.uz;
    const rawList = rawLocaleList.slice(0, 6);
    const metaList = categoryMeta[currentLocale] || categoryMeta.uz;

    return rawList.map((item, index) => {
      const mapping = metaList[index] || {
        category: "academic",
        label: "Universitet Yangiliklari",
        badgeVariant: "accent",
        date: "2026",
        readTime: "3 min",
      };
      const image = curatedImages[index] || curatedImages[0];

      return {
        id: index + 1,
        slug: item.slug,
        title: item.title,
        date: item.date && item.date.trim() !== "" ? item.date : mapping.date,
        category: mapping.category,
        categoryLabel: mapping.label,
        categoryBadgeVariant: mapping.badgeVariant,
        image,
        summary: item.summary,
        readTime: mapping.readTime,
      };
    });
  }, [currentLocale]);

  const selectedArticle = React.useMemo(() => {
    if (!selectedArticleSlug) return null;
    return enrichedArticles.find((a) => a.slug === selectedArticleSlug) || null;
  }, [enrichedArticles, selectedArticleSlug]);

  const filteredArticles = React.useMemo(() => {
    return activeFilter === "all"
      ? enrichedArticles
      : enrichedArticles.filter((a) => a.category === activeFilter);
  }, [activeFilter, enrichedArticles]);

  const filterTabs = React.useMemo(
    () => [
      { id: "all", label: t.tabs.all },
      { id: "academic", label: t.tabs.academic },
      { id: "partnership", label: t.tabs.partnership },
      { id: "student-life", label: t.tabs.studentLife },
      { id: "sport", label: t.tabs.sport },
    ],
    [t.tabs]
  );

  return (
    <section
      id="news"
      aria-label={
        currentLocale === "ru"
          ? "Новости и события университета"
          : currentLocale === "en"
          ? "University News and Events"
          : "Universitet yangiliklari va tadbirlari"
      }
      className="py-16 sm:py-24 bg-white relative"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-3">
              <span className="w-6 h-px bg-accent" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              {t.description}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface text-slate-600 hover:text-primary border border-slate-200 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={`${article.id}-${currentLocale}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-primary">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant={article.categoryBadgeVariant} className="shadow-xs">
                      {article.categoryLabel}
                    </Badge>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        <span>{article.date}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedArticleSlug(article.slug)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-accent hover:text-accent-hover group/btn transition-colors cursor-pointer"
                    >
                      <span>{t.readMore}</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-xs text-slate-400 font-medium">
                      {currentLocale === "ru" ? "ТМУК Самарканд" : currentLocale === "en" ? "KIUT Samarkand" : "KIUT Samarqand"}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Archive Link */}
        <div className="mt-14 text-center">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="font-bold border-slate-200 hover:border-slate-300 hover:bg-surface"
          >
            <Link href="/news">
              <span>{t.archiveButton}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Container>

      {/* Full Article Modal */}
      {selectedArticle && (
        <Modal
          isOpen={Boolean(selectedArticle)}
          onClose={() => setSelectedArticleSlug(null)}
          maxWidth="3xl"
          noPadding={true}
          hideCloseButton={true}
          closeButtonLabel={t.modalClose}
          ariaLabelledBy="news-modal-title"
          footer={
            <Button
              onClick={() => setSelectedArticleSlug(null)}
              variant="secondary"
              size="default"
              className="font-bold border-slate-200"
            >
              {t.modalClose}
            </Button>
          }
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-primary shrink-0">
            <Image
              src={selectedArticle.image}
              alt={selectedArticle.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

            <button
              type="button"
              onClick={() => setSelectedArticleSlug(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-white hover:bg-black transition-colors cursor-pointer"
              aria-label={t.modalClose}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <Badge variant={selectedArticle.categoryBadgeVariant} className="mb-2">
                {selectedArticle.categoryLabel}
              </Badge>
              <h3 id="news-modal-title" className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {selectedArticle.title}
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                <span>{selectedArticle.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span className="text-primary font-semibold">
                {t.pressRelease}
              </span>
            </div>

            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p className="font-medium text-primary">
                {selectedArticle.summary}
              </p>
              <p>
                {currentLocale === "ru"
                  ? "Самаркандский филиал Ташкентского международного университета Кимё продолжает системную работу по обеспечению высшего образования мирового уровня, развитию международных партнерских программ и формированию передовых профессиональных компетенций студентов."
                  : currentLocale === "en"
                  ? "The Samarkand Branch of Kimyo International University in Tashkent remains committed to delivering world-class higher education, expanding international academic partnerships, and fostering advanced professional competencies among its students."
                  : "Toshkent Kimyo Xalqaro Universiteti Samarqand filiali talabalarga jahon andozalariga mos ta'lim berish, xalqaro dasturlar va ilg'or amaliy ko'nikmalarni shakllantirish bo'yicha tizimli ishlarni davom ettirmoqda."}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
