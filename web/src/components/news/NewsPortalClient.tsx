"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronRight,
  Home,
  Newspaper,
  ArrowLeft,
  ArrowRight,
  Filter,
  GraduationCap,
  Users,
  Trophy,
  Globe2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { NewsCard } from "@/components/news/NewsCard";
import {
  getAllNews,
  filterNews,
  type NewsCategory,
} from "@/lib/news";
import { useLocale, useTranslation } from "@/lib/i18n";
import type { Locale } from "@/types";

const ITEMS_PER_PAGE = 6;

export function NewsPortalClient() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation("news");
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState<NewsCategory>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Load static baseline articles for current locale
  const staticArticles = React.useMemo(() => getAllNews(locale), [locale]);
  const [dynamicArticles, setDynamicArticles] = React.useState<ReturnType<typeof getAllNews> | null>(null);

  React.useEffect(() => {
    // Fetch live updates from dynamic DB
    let isMounted = true;
    fetch(`/api/news?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.articles)) {
          setDynamicArticles(data.articles);
        }
      })
      .catch((err) => {
        console.warn("[LIVE_NEWS_FETCH_FALLBACK] Using static news:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const liveArticles = dynamicArticles || staticArticles;

  // Filter articles based on active category and search query
  const filteredArticles = React.useMemo(() => {
    return filterNews(liveArticles, activeCategory, searchQuery);
  }, [liveArticles, activeCategory, searchQuery]);

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Category counts based on current search query
  const categoryCounts = React.useMemo(() => {
    const counts: Record<NewsCategory, number> = {
      all: 0,
      academic: 0,
      partnership: 0,
      "student-life": 0,
      sport: 0,
    };

    liveArticles.forEach((article) => {
      // Check query match
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.categoryLabel.toLowerCase().includes(q);

      if (matchesQuery) {
        counts.all++;
        if (counts[article.category] !== undefined) {
          counts[article.category]++;
        }
      }
    });

    return counts;
  }, [liveArticles, searchQuery]);

  // Filter tabs definitions with icons
  const filterTabs = React.useMemo<
    Array<{
      id: NewsCategory;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
    }>
  >(
    () => [
      { id: "all", label: t.tabs.all, icon: Newspaper },
      { id: "academic", label: t.tabs.academic, icon: GraduationCap },
      { id: "partnership", label: t.tabs.partnership, icon: Globe2 },
      { id: "student-life", label: t.tabs.studentLife, icon: Users },
      { id: "sport", label: t.tabs.sport, icon: Trophy },
    ],
    [t.tabs]
  );

  // Localized breadcrumbs and UI strings
  const breadcrumbHome =
    locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa";
  const breadcrumbNews =
    locale === "ru" ? "Новости" : locale === "en" ? "News" : "Yangiliklar";

  const searchPlaceholder =
    locale === "ru"
      ? "Поиск по новостям и событиям..."
      : locale === "en"
      ? "Search university news and events..."
      : "Yangiliklar va voqealarni qidirish...";

  const resultsFoundLabel = (count: number) => {
    if (locale === "ru") return `Найдено публикаций: ${count}`;
    if (locale === "en") return `${count} articles found`;
    return `Jami topilgan maqolalar: ${count} ta`;
  };

  const emptyTitle =
    locale === "ru"
      ? "Публикации не найдены"
      : locale === "en"
      ? "No articles found"
      : "Maqolalar topilmadi";

  const emptyDesc =
    locale === "ru"
      ? "По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска или сбросить фильтры."
      : locale === "en"
      ? "We couldn't find any articles matching your search. Please adjust your keywords or reset filters."
      : "Qidiruv so'rovingizga mos keladigan yangilik topilmadi. Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang.";

  const resetFiltersLabel =
    locale === "ru"
      ? "Сбросить фильтры"
      : locale === "en"
      ? "Reset Filters"
      : "Filtrlarni tozalash";

  const pageOfLabel = (current: number, total: number) => {
    if (locale === "ru") return `Страница ${current} из ${total}`;
    if (locale === "en") return `Page ${current} of ${total}`;
    return `${current} / ${total}-sahifa`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 1. Global Academic TopBar */}
      <TopBar />

      {/* 2. Institutional Solid Navbar */}
      <Navbar
        onLocaleChange={(newLoc: Locale) => setLocale(newLoc)}
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <section className="bg-primary text-white border-b border-border py-12 sm:py-16">
          <Container>
            {/* Breadcrumb Trail */}
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-6"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-accent" />
                <span>{breadcrumbHome}</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-white">
                {breadcrumbNews}
              </span>
            </nav>

            {/* Banner Eyebrow & Title */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-3">
                <span className="w-6 h-0.5 bg-accent" />
                <span>{t.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                {t.description}
              </p>
            </div>
          </Container>
        </section>

        {/* Search & Filtering Control Bar */}
        <section className="bg-card border-b border-border py-6 sticky top-20 z-20 shadow-xs">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Yangiliklar toifalari"
                className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
              >
                {filterTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  const count = categoryCounts[tab.id];

                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategoryChange(tab.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface text-foreground hover:bg-surface-hover hover:text-primary border border-border"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted"}`} />
                      <span>{tab.label}</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-accent text-white"
                            : "bg-border text-muted"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="w-full h-11 pl-10 pr-10 text-sm bg-surface border border-border rounded-xl text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    aria-label="Tozalash"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results Count & Active Filter Indicator */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
              <span>{resultsFoundLabel(filteredArticles.length)}</span>
              {(activeCategory !== "all" || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent-hover cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{resetFiltersLabel}</span>
                </button>
              )}
            </div>
          </Container>
        </section>

        {/* Articles Grid Section */}
        <section className="py-12 sm:py-16">
          <Container>
            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedArticles.map((article, index) => (
                    <NewsCard
                      key={article.slug}
                      article={article}
                      locale={locale}
                      priority={index === 0 && currentPage === 1}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination Navigation"
                    className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <span className="text-xs sm:text-sm font-medium text-muted">
                      {pageOfLabel(currentPage, totalPages)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        className="gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{locale === "ru" ? "Назад" : locale === "en" ? "Previous" : "Oldingi"}</span>
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const pageNum = i + 1;
                          const isCurrent = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 300, behavior: "smooth" });
                              }}
                              aria-current={isCurrent ? "page" : undefined}
                              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isCurrent
                                  ? "bg-primary text-white"
                                  : "bg-card text-foreground hover:bg-surface-hover border border-border"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        className="gap-1.5"
                      >
                        <span>{locale === "ru" ? "Вперед" : locale === "en" ? "Next" : "Keyingi"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </nav>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-card rounded-2xl border border-border p-12 text-center max-w-xl mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4 text-muted">
                  <Newspaper className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {emptyTitle}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {emptyDesc}
                </p>
                <Button
                  variant="action"
                  onClick={handleResetFilters}
                >
                  {resetFiltersLabel}
                </Button>
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingContact onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Interactive Admission Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty="Tibbiyot fakulteti"
      />
    </div>
  );
}
