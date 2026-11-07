"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Award,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroQuickFinder } from "./HeroQuickFinder";
import { HeroImageCarousel, type HeroSlideImage, type HeroSlideMeta } from "./HeroImageCarousel";
import { useLocale, translations } from "@/lib/i18n";

const slideImages: HeroSlideImage[] = [
  {
    src: "/assets/banners/8y8a8213.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    alt: "KIUT Samarqand talabalari va akademik muhit",
    caption: "Xalqaro standartlardagi amaliy ta'lim muhiti",
  },
  {
    src: "/assets/banners/20260808111028.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    alt: "KIUT Samarqand zamonaviy o'quv binosi",
    caption: "Spitamen shoh ko'chasidagi zamonaviy bino",
  },
  {
    src: "/assets/banners/8y8a7608.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    alt: "Xalqaro ilmiy konferensiya va forumlar",
    caption: "Xorijiy professor-o'qituvchilar ma'ruzalari",
  },
  {
    src: "/assets/banners/20261022125829.jpg__1920x1080_q85_crop_subsampling-2.jpg",
    alt: "Innovatsion laboratoriyalar va amaliyot",
    caption: "5+1 Dual ta'lim va ishlab chiqarish amaliyoti",
  },
];

const slideMetadata: HeroSlideMeta[] = [
  {
    num: "01",
    tag: { uz: "Amaliy ta'lim", ru: "Практика", en: "Hands-on" },
    caption: {
      uz: "Xalqaro standartlardagi amaliy ta'lim muhiti",
      ru: "Практическое обучение по международным стандартам",
      en: "Practical education aligned with global standards",
    },
  },
  {
    num: "02",
    tag: { uz: "Spitamen binosi", ru: "Новый кампус", en: "Main Campus" },
    caption: {
      uz: "Spitamen shoh ko'chasidagi zamonaviy bino",
      ru: "Современный корпус на проспекте Спитамен",
      en: "Modern campus along Spitamen Avenue",
    },
  },
  {
    num: "03",
    tag: { uz: "Xalqaro forum", ru: "Конференции", en: "Global Forum" },
    caption: {
      uz: "Xorijiy professor-o'qituvchilar ma'ruzalari",
      ru: "Лекции приглашенных профессоров из-за рубежа",
      en: "Visiting international scholar lectures",
    },
  },
  {
    num: "04",
    tag: { uz: "Dual ta'lim", ru: "Дуальное обучение", en: "Dual Model" },
    caption: {
      uz: "5+1 Dual ta'lim va ishlab chiqarish amaliyoti",
      ru: "Модель дуального образования 5+1",
      en: "5+1 Dual education & industry placement",
    },
  },
];

const popularTagsByLocale = {
  uz: ["Davolash ishi", "Dasturiy injiniring", "Stomatologiya", "Arxitektura", "Xalqaro biznes"],
  ru: ["Лечебное дело", "Программная инженерия", "Стоматология", "Архитектура", "Международный бизнес"],
  en: ["Medicine", "Software Engineering", "Dentistry", "Architecture", "International Business"],
};

export interface HeroSliderProps {
  onOpenAdmissionModal?: (facultyOrProgramName?: string) => void;
}

export function HeroSlider({ onOpenAdmissionModal }: HeroSliderProps = {}) {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const { locale: currentLocale } = useLocale();

  const heroData = translations[currentLocale].hero;
  const slides = heroData.slides;
  const length = slides.length;

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prevSlide = React.useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  // Autoplay
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentSlide = slides[current] || slides[0];
  const popularTags = popularTagsByLocale[currentLocale] || popularTagsByLocale.uz;

  const handleAction = (href: string) => {
    if (href === "#admission" && onOpenAdmissionModal) {
      onOpenAdmissionModal();
      return;
    }
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-10 lg:py-16 overflow-hidden border-b border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Academic Editorial Information */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current}-${currentLocale}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Academic School / Faculty Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0096DB] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#0096DB]" />
                  <span>{currentSlide.highlight}</span>
                </div>

                {/* Authoritative Editorial Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172D50] tracking-tight leading-[1.12]">
                  {currentSlide.title}
                </h1>

                {/* Editorial Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                  {currentSlide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button
                    onClick={() => handleAction("#admission")}
                    variant="action"
                    size="lg"
                    className="text-base font-bold bg-[#0096DB] hover:bg-[#0085c4] text-white shadow-lg shadow-[#0096DB]/25 px-7 py-3.5 rounded-xl transition-all"
                  >
                    <span>{currentSlide.primaryCtaText}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>

                  <Link href="/programs" className="inline-block">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-base font-bold border-2 border-slate-300 hover:border-[#172D50] hover:bg-slate-50 text-[#172D50] px-6 py-3.5 rounded-xl transition-all"
                    >
                      <BookOpen className="h-4 w-4 text-[#0096DB]" />
                      <span>{currentSlide.secondaryCtaText}</span>
                    </Button>
                  </Link>
                </div>

                {/* Institutional Trust Badges */}
                <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>{heroData.officialLicense}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>
                      {currentLocale === "ru"
                        ? "100% Государственный диплом"
                        : currentLocale === "en"
                        ? "100% State-Accredited Degree"
                        : "100% Davlat diplomi"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>
                      {currentLocale === "ru"
                        ? "5+1 Дуальное образование"
                        : currentLocale === "en"
                        ? "5+1 Dual Education Model"
                        : "5+1 Dual ta'lim"}
                    </span>
                  </div>
                </div>

                {/* Fast Finder Subcomponent */}
                <HeroQuickFinder
                  currentLocale={currentLocale}
                  popularTags={popularTags}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Carousel Component */}
          <div className="lg:col-span-5">
            <HeroImageCarousel
              currentIndex={current}
              totalSlides={length}
              slideImages={slideImages}
              slideMetadata={slideMetadata}
              currentLocale={currentLocale}
              onPrev={prevSlide}
              onNext={nextSlide}
              onSelect={setCurrent}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
