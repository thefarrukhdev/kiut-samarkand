"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Award,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";
import type { Locale } from "@/types";

const slideImages = [
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

interface HeroSliderProps {
  currentLocale?: Locale;
  onOpenAdmissionModal?: () => void;
}

export function HeroSlider({
  currentLocale = "uz",
  onOpenAdmissionModal,
}: HeroSliderProps) {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const heroData = translations[currentLocale].hero;
  const slides = heroData.slides;
  const length = slides.length;

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prevSlide = React.useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  // Tab visibility change listener: pause autoplay if page is not visible
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      if (!interval && !isPaused && document.visibilityState === "visible") {
        interval = setInterval(() => {
          nextSlide();
        }, 6500);
      }
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startInterval();
      } else {
        stopInterval();
      }
    };

    startInterval();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPaused, nextSlide]);

  const currentSlide = slides[current] || slides[0];
  const currentPhoto = slideImages[current] || slideImages[0];

  const handleAction = (href: string) => {
    if (href === "#admission" && onOpenAdmissionModal) {
      onOpenAdmissionModal();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="hero"
      aria-label="Universitet Asosiy Qismi"
      className="relative bg-gradient-to-b from-white via-[#F8FAFC] to-[#F4F7FC] border-b border-slate-200/80 overflow-hidden py-10 sm:py-14 lg:py-18"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Prestigious Academic Typography & Clear CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide.id}-${currentLocale}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Academic Eyebrow - Clean Typographic Bar (NO pill badge) */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#0096DB] rounded-full" />
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0096DB]">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Monumental Title in Deep Navy & Real KIUT Blue */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#172D50] leading-[1.12]">
                  {currentSlide.title}{" "}
                  <span className="text-[#0096DB]">
                    {currentSlide.highlight}
                  </span>
                </h1>

                {/* Crisp Editorial Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                  {currentSlide.description}
                </p>

                {/* Clear High-Contrast Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button
                    onClick={() => handleAction("#admission")}
                    variant="action"
                    size="lg"
                    className="text-base font-bold bg-[#0096DB] hover:bg-[#007BB3] text-white shadow-lg shadow-[#0096DB]/25 hover:shadow-xl hover:shadow-[#0096DB]/35 px-7 py-3.5 rounded-xl transition-all"
                  >
                    <span>{currentSlide.primaryCtaText}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>

                  <Button
                    onClick={() => handleAction("#schools")}
                    variant="outline"
                    size="lg"
                    className="text-base font-bold border-2 border-slate-300 hover:border-[#172D50] hover:bg-slate-50 text-[#172D50] px-6 py-3.5 rounded-xl transition-all"
                  >
                    <BookOpen className="h-4 w-4 text-[#0096DB]" />
                    <span>{currentSlide.secondaryCtaText}</span>
                  </Button>
                </div>

                {/* Institutional Trust Badges (Inline clean micro-facts) */}
                <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>{heroData.officialLicense}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>100% Davlat diplomi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0096DB] shrink-0" />
                    <span>5+1 Dual ta&apos;lim</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Curated Framed Photographic Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4.3] bg-slate-900 group">
              {/* Slide Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current}-${currentLocale}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle lower gradient for caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172D50]/90 via-[#172D50]/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Official Accreditation Chip (Top Right) */}
              <div className="absolute top-4 right-4 z-10 bg-white rounded-xl px-3 py-1.5 shadow-md border border-slate-200 text-[11px] font-bold text-[#172D50] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Litsenziya № 039281</span>
              </div>

              {/* Photo Caption & Slide Navigation Controls (Bottom) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 text-white">
                <div className="pr-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0096DB]">
                    KIUT Samarqand
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    {currentPhoto.caption}
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-1 bg-[#172D50] p-1 rounded-xl border border-white/20 shrink-0">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Oldingi rasm"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-[11px] font-bold px-1.5 tabular-nums text-slate-200">
                    {current + 1} / {length}
                  </span>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Keyingi rasm"
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Indicators below card */}
            <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Slider indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Slide ${index + 1}`}
                  aria-selected={current === index}
                  role="tab"
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    current === index
                      ? "w-8 bg-[#0096DB]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
