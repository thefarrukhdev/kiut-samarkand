"use client";

import * as React from "react";
import {
  GraduationCap,
  Users,
  Trophy,
  Globe2,
  Newspaper,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { NewsCategoryTabs, type CategoryTabItem } from "./NewsCategoryTabs";
import { NewsSearchBar } from "./NewsSearchBar";
import { NewsGrid } from "./NewsGrid";
import { NewsPagination } from "./NewsPagination";
import {
  getAllNews,
  filterNews,
  type NewsCategory,
} from "@/lib/news";
import { useLocale, useTranslation } from "@/lib/i18n";

const ITEMS_PER_PAGE = 6;

export function NewsPortalClient() {
  const { locale } = useLocale();
  const { t } = useTranslation("news");
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState<NewsCategory>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Load static baseline articles for current locale
  const staticArticles = React.useMemo(() => getAllNews(locale), [locale]);
  const [dynamicArticles, setDynamicArticles] = React.useState<ReturnType<typeof getAllNews> | null>(null);

  React.useEffect(() => {
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

  // Dynamic Category Counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<NewsCategory, number> = {
      all: 0,
      academic: 0,
      partnership: 0,
      "student-life": 0,
      sport: 0,
    };

    liveArticles.forEach((article) => {
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

  const labels = React.useMemo(() => {
    switch (locale) {
      case "ru":
        return {
          home: "Главная",
          news: "Новости",
          searchPlaceholder: "Поиск новостей по заголовку или теме...",
          emptyTitle: "Новостей не найдено",
          emptyDescription: "По вашему запросу новостей не обнаружено. Попробуйте изменить параметры поиска.",
          reset: "Сбросить фильтры",
          prev: "Назад",
          next: "Вперед",
          clearSearch: "Отменить поиск",
          foundCount: "Найдено по запросу",
        };
      case "en":
        return {
          home: "Home",
          news: "News & Events",
          searchPlaceholder: "Search articles by title or keyword...",
          emptyTitle: "No news found",
          emptyDescription: "We couldn't find any articles matching your search criteria.",
          reset: "Reset filters",
          prev: "Previous",
          next: "Next",
          clearSearch: "Clear search",
          foundCount: "Articles found for",
        };
      case "uz":
      default:
        return {
          home: "Bosh sahifa",
          news: "Yangiliklar",
          searchPlaceholder: "Yangiliklar va xabarlarni qidirish...",
          emptyTitle: "Yangiliklar topilmadi",
          emptyDescription: "Kiritilgan kalit so'z yoki tanlangan toifa bo'yicha hech qanday yangilik topilmadi.",
          reset: "Filtrlarni tozalash",
          prev: "Oldingi",
          next: "Keyingi",
          clearSearch: "Qidiruvni bekor qilish",
          foundCount: "so'rovi bo'yicha topildi",
        };
    }
  }, [locale]);

  // Tab definitions
  const filterTabs = React.useMemo<CategoryTabItem[]>(() => {
    return [
      {
        id: "all",
        label: t.tabs.all,
        count: categoryCounts.all,
        icon: Newspaper,
      },
      {
        id: "academic",
        label: t.tabs.academic,
        count: categoryCounts.academic,
        icon: GraduationCap,
      },
      {
        id: "partnership",
        label: t.tabs.partnership,
        count: categoryCounts.partnership,
        icon: Globe2,
      },
      {
        id: "student-life",
        label: t.tabs.studentLife,
        count: categoryCounts["student-life"],
        icon: Users,
      },
      {
        id: "sport",
        label: t.tabs.sport,
        count: categoryCounts.sport,
        icon: Trophy,
      },
    ];
  }, [t, categoryCounts]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Header */}
      <PageHeader
        badge={t.badge}
        title={t.title}
        description={t.description}
        breadcrumbs={[
          { label: labels.home, href: "/" },
          { label: labels.news },
        ]}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-10 lg:py-14">
        <Container className="space-y-8">
          {/* Controls Bar: Category Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <NewsCategoryTabs
              tabs={filterTabs}
              activeCategory={activeCategory}
              onSelectCategory={handleCategoryChange}
            />

            <NewsSearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={labels.searchPlaceholder}
              onClear={handleResetFilters}
            />
          </div>

          {/* Results Summary if searched */}
          {searchQuery && (
            <div className="flex items-center justify-between text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200">
              <span>
                &ldquo;{searchQuery}&rdquo; {labels.foundCount}:{" "}
                <strong className="text-slate-800">{filteredArticles.length} ta yangilik</strong>
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#0096DB] hover:underline font-semibold"
              >
                {labels.clearSearch}
              </button>
            </div>
          )}

          {/* News Grid */}
          <NewsGrid
            articles={paginatedArticles}
            emptyTitle={labels.emptyTitle}
            emptyDescription={labels.emptyDescription}
            resetButtonLabel={labels.reset}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination */}
          <NewsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            prevLabel={labels.prev}
            nextLabel={labels.next}
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
