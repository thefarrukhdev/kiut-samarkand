"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Home,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Quote,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { TelegramIcon, FacebookIcon } from "@/components/shared/SocialIcons";
import {
  getNewsBySlug,
  type EnrichedArticle,
} from "@/lib/news";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/types";

interface NewsArticleClientProps {
  initialArticle: EnrichedArticle;
  initialRelated: EnrichedArticle[];
  index?: number;
  detectedLocale: Locale;
}

export function NewsArticleClient({
  initialArticle,
  initialRelated,
  detectedLocale,
}: NewsArticleClientProps) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Sync article data if user changes locale on page
  const { article, related } = React.useMemo(() => {
    // If user's selected locale matches initial detected, use initial props
    if (locale === detectedLocale) {
      return { article: initialArticle, related: initialRelated };
    }
    // Otherwise get the localized version of this article index
    const localized = getNewsBySlug(initialArticle.slug, locale);
    if (localized) {
      return { article: localized.article, related: localized.related };
    }
    return { article: initialArticle, related: initialRelated };
  }, [locale, detectedLocale, initialArticle, initialRelated]);

  // Handle URL change when locale changes
  const handleLocaleChange = React.useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
      const target = getNewsBySlug(initialArticle.slug, newLocale);
      if (target && target.article.slug !== initialArticle.slug) {
        router.push(`/news/${target.article.slug}`);
      }
    },
    [setLocale, initialArticle.slug, router]
  );

  // Share handlers
  const handleCopyLink = React.useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  const handleShareTelegram = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.title);
      window.open(
        `https://t.me/share/url?url=${url}&text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, [article.title]);

  const handleShareFacebook = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, []);

  // Localized UI strings
  const breadcrumbHome =
    locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa";
  const breadcrumbNews =
    locale === "ru" ? "Новости" : locale === "en" ? "News" : "Yangiliklar";
  const backToNews =
    locale === "ru"
      ? "Все новости"
      : locale === "en"
      ? "All Stories"
      : "Barcha yangiliklar";
  const relatedHeading =
    locale === "ru"
      ? "Другие публикации"
      : locale === "en"
      ? "Related Stories"
      : "Boshqa yangiliklar";
  const highlightsHeading =
    locale === "ru"
      ? "Ключевые факты"
      : locale === "en"
      ? "Key Highlights"
      : "Muhim faktlar";
  const shareHeading =
    locale === "ru"
      ? "Поделиться материалом:"
      : locale === "en"
      ? "Share this story:"
      : "Maqolani ulashish:";
  const copyToast =
    locale === "ru"
      ? "Ссылка скопирована!"
      : locale === "en"
      ? "Link copied!"
      : "Havola nusxalandi!";
  const admissionCardTitle =
    locale === "ru"
      ? "Поступайте в KIUT Samarkand"
      : locale === "en"
      ? "Admissions at KIUT Samarkand"
      : "KIUT Samarqandga qabul";
  const admissionCardDesc =
    locale === "ru"
      ? "Прием на 2026/2027 учебный год открыт. Подайте заявку онлайн прямо сейчас."
      : locale === "en"
      ? "Admissions for 2026/2027 are officially open. Submit your application online today."
      : "2026/2027 o'quv yili uchun qabul davom etmoqda. Onlayn ariza qoldiring.";
  const admissionCardCta =
    locale === "ru"
      ? "Подать заявку"
      : locale === "en"
      ? "Apply Now"
      : "Ariza topshirish";

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 1. Global Academic TopBar */}
      <TopBar />

      {/* 2. Institutional Solid Navbar */}
      <Navbar
        onLocaleChange={handleLocaleChange}
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12">
        <Container>
          {/* Breadcrumb Navigation Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted mb-8 overflow-hidden whitespace-nowrap text-ellipsis"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors shrink-0"
            >
              <Home className="w-3.5 h-3.5 text-accent" />
              <span>{breadcrumbHome}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
            <Link
              href="/news"
              className="hover:text-primary transition-colors shrink-0"
            >
              {breadcrumbNews}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
            <span className="font-semibold text-primary truncate max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mb-8">
            {/* Meta Row: Badge, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <Badge
                variant={article.categoryBadgeVariant}
                className="font-semibold"
              >
                {article.categoryLabel}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{article.date}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Authoritative Editorial Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-primary tracking-tight leading-[1.2] mb-6">
              {article.title}
            </h1>
          </header>

          {/* High-Resolution Hero Image Banner */}
          <figure className="mb-12">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
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
              <figcaption className="text-xs sm:text-sm text-muted italic mt-3 px-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>{article.imageCaption}</span>
              </figcaption>
            )}
          </figure>

          {/* Two-Column Grid: Left Article Content, Right Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Article Body Column */}
            <article className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Key Highlights Callout Box */}
                {article.highlights && article.highlights.length > 0 && (
                  <div className="bg-card rounded-2xl border border-border p-6 sm:p-7 mb-8 shadow-xs">
                    <h2 className="text-base font-bold text-primary flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{highlightsHeading}</span>
                    </h2>
                    <ul className="space-y-3">
                      {article.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Formatted Article Body Paragraphs */}
                <div className="space-y-6 text-foreground text-base sm:text-lg leading-relaxed font-normal">
                  {article.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Editorial Pull Quote */}
                {article.pullQuote && article.pullQuote.quote && (
                  <blockquote className="my-10 border-l-4 border-accent bg-card rounded-r-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-accent shrink-0 opacity-80" />
                      <div>
                        <p className="text-lg sm:text-xl font-medium text-primary italic leading-relaxed mb-4">
                          &ldquo;{article.pullQuote.quote}&rdquo;
                        </p>
                        <div className="text-xs sm:text-sm font-semibold text-accent">
                          {article.pullQuote.author}
                        </div>
                        <div className="text-xs text-muted">
                          {article.pullQuote.role}
                        </div>
                      </div>
                    </div>
                  </blockquote>
                )}

                {/* Social Share Bar */}
                <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Share2 className="w-4 h-4 text-accent" />
                    <span>{shareHeading}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Telegram Share */}
                    <button
                      onClick={handleShareTelegram}
                      aria-label="Telegram orqali ulashish"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-accent hover:border-accent transition-colors shadow-xs cursor-pointer"
                    >
                      <TelegramIcon className="w-4 h-4 text-accent" />
                      <span>Telegram</span>
                    </button>

                    {/* Facebook Share */}
                    <button
                      onClick={handleShareFacebook}
                      aria-label="Facebook orqali ulashish"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-accent hover:border-accent transition-colors shadow-xs cursor-pointer"
                    >
                      <FacebookIcon className="w-4 h-4 text-primary-royal" />
                      <span>Facebook</span>
                    </button>

                    {/* Copy Link */}
                    <button
                      onClick={handleCopyLink}
                      aria-label="Havolani nusxalash"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-accent hover:border-accent transition-colors shadow-xs cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">{copyToast}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-muted" />
                          <span>{locale === "ru" ? "Копировать" : locale === "en" ? "Copy" : "Nusxalash"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Back Link */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  <Link href="/news">
                    <ArrowLeft className="w-4 h-4" />
                    <span>{backToNews}</span>
                  </Link>
                </Button>
              </div>
            </article>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Related News Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
                  <h3 className="text-base font-bold text-primary">
                    {relatedHeading}
                  </h3>
                  <Link
                    href="/news"
                    className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
                  >
                    <span>{locale === "ru" ? "Все" : locale === "en" ? "View all" : "Barchasi"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-5">
                  {related.map((item) => (
                    <article
                      key={item.slug}
                      className="group flex gap-3.5 items-start"
                    >
                      <Link
                        href={`/news/${item.slug}`}
                        className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border bg-surface"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-muted mb-1">
                          <span className="font-semibold text-accent">
                            {item.categoryLabel}
                          </span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          <Link href={`/news/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Admission Quick Inquiry CTA Box */}
              <div className="bg-primary text-white rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center mb-4 text-accent">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">
                  {admissionCardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  {admissionCardDesc}
                </p>
                <Button
                  variant="action"
                  size="default"
                  onClick={() => setAdmissionModalOpen(true)}
                  className="w-full justify-center"
                >
                  {admissionCardCta}
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingContact onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Admission Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty="Tibbiyot fakulteti"
      />
    </div>
  );
}
