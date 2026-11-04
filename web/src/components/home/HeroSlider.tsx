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
  Search,
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

const slideMetadata = [
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
      en: "State-of-the-art campus on Spitamen Avenue",
    },
  },
  {
    num: "03",
    tag: { uz: "Xalqaro forum", ru: "Конференции", en: "Conferences" },
    caption: {
      uz: "Xorijiy professor-o'qituvchilar ma'ruzalari",
      ru: "Лекции зарубежных профессоров и ученых",
      en: "Lectures by international visiting professors",
    },
  },
  {
    num: "04",
    tag: { uz: "5+1 Dual ta'lim", ru: "Дуальное обучение", en: "Dual Study" },
    caption: {
      uz: "5+1 Dual ta'lim va ishlab chiqarish amaliyoti",
      ru: "5+1 Дуальная система и производственная практика",
      en: "5+1 Dual training and industrial internship",
    },
  },
];

const popularTags = ["Davolash ishi", "Dasturiy injiniring", "Xalqaro biznes", "Koreys filologiyasi"];

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

  const handleAction = React.useCallback(
    (href: string) => {
      if (href === "#admission" && onOpenAdmissionModal) {
        onOpenAdmissionModal();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onOpenAdmissionModal]
  );

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

  const pillarRibbonItems = React.useMemo(
    () => [
      {
        title:
          currentLocale === "ru"
            ? "46+ Академических программ"
            : currentLocale === "en"
            ? "46+ Degree Programs"
            : "46+ Ta'lim yo'nalishlari",
        desc:
          currentLocale === "ru"
            ? "Бакалавриат и магистратура"
            : currentLocale === "en"
            ? "Undergraduate & Graduate"
            : "Bakalavriat va magistratura",
        href: "#programs",
        tag: currentLocale === "ru" ? "Каталог" : currentLocale === "en" ? "Directory" : "Katalog",
      },
      {
        title:
          currentLocale === "ru"
            ? "500+ Университетских грантов"
            : currentLocale === "en"
            ? "500+ Annual Scholarships"
            : "500+ Yillik ichki grantlar",
        desc:
          currentLocale === "ru"
            ? "100% Ректорский грант и IELTS"
            : currentLocale === "en"
            ? "100% Rector grant & IELTS 7+"
            : "Rektor granti va til imtiyozlari",
        href: "#scholarships",
        tag: currentLocale === "ru" ? "Гранты" : currentLocale === "en" ? "Grants" : "Grantlar",
      },
      {
        title:
          currentLocale === "ru"
            ? "Современный кампус и IT-хаб"
            : currentLocale === "en"
            ? "Modern Campus & Labs"
            : "Spitamen zamonaviy binosi",
        desc:
          currentLocale === "ru"
            ? "Анатомический центр и AI лаборатории"
            : currentLocale === "en"
            ? "Anatomage labs & robotics"
            : "Anatomage va robototexnika",
        href: "#campus",
        tag: currentLocale === "ru" ? "Кампус" : currentLocale === "en" ? "Campus" : "Kampus",
      },
      {
        title:
          currentLocale === "ru"
            ? "2+2 Международный диплом"
            : currentLocale === "en"
            ? "2+2 Dual Degree Programs"
            : "2+2 Xalqaro dual diplom",
        desc:
          currentLocale === "ru"
            ? "Южная Корея и Европа"
            : currentLocale === "en"
            ? "South Korea & Europe"
            : "Janubiy Koreya va Yevropa",
        href: "#about",
        tag: currentLocale === "ru" ? "Международное" : currentLocale === "en" ? "Global" : "Xalqaro",
      },
    ],
    [currentLocale]
  );

  return (
    <section
      id="hero"
      aria-label={
        currentLocale === "ru"
          ? "Главный раздел университета"
          : currentLocale === "en"
          ? "University Hero Showcase"
          : "Universitet Asosiy Qismi"
      }
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
                {/* Academic Eyebrow */}
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

                {/* Interactive Academic Direction Fast Finder */}
                <div className="pt-5 border-t border-slate-200/90 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Search className="h-3.5 w-3.5 text-[#0096DB]" />
                    <span>
                      {currentLocale === "ru"
                        ? "Быстрый поиск направления:"
                        : currentLocale === "en"
                        ? "Quick Degree Explorer:"
                        : "Yo'nalishni tezkor qidirish:"}
                    </span>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const input = (form.elements.namedItem("search") as HTMLInputElement)?.value;
                      const target = document.getElementById("programs");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                        const searchInput = target.querySelector<HTMLInputElement>("input[type='text']");
                        if (searchInput && input) {
                          searchInput.value = input;
                          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
                        }
                      }
                    }}
                    className="flex items-center gap-2 max-w-xl"
                  >
                    <div className="relative flex-1">
                      <input
                        name="search"
                        type="text"
                        placeholder={
                          currentLocale === "ru"
                            ? "Лечебное дело, Программная инженерия, Архитектура..."
                            : currentLocale === "en"
                            ? "Medicine, Software Engineering, Architecture..."
                            : "Davolash ishi, Dasturiy injiniring, Arxitektura..."
                        }
                        aria-label="Qidiruv so'zi"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:border-transparent transition-all shadow-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="action"
                      size="sm"
                      className="shrink-0 bg-[#172D50] hover:bg-[#12223D] text-white font-bold rounded-xl px-4 py-2.5 text-xs sm:text-sm"
                    >
                      <Search className="h-3.5 w-3.5 mr-1" />
                      <span>{currentLocale === "ru" ? "Найти" : currentLocale === "en" ? "Search" : "Qidirish"}</span>
                    </Button>
                  </form>
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {currentLocale === "ru" ? "Популярные:" : currentLocale === "en" ? "Popular:" : "Ommabop:"}
                    </span>
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const target = document.getElementById("programs");
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth" });
                            const searchInput = target.querySelector<HTMLInputElement>("input[type='text']");
                            if (searchInput) {
                              searchInput.value = tag;
                              searchInput.dispatchEvent(new Event("input", { bubbles: true }));
                            }
                          }
                        }}
                        className="text-[11px] font-semibold text-[#172D50] bg-white border border-slate-200 hover:border-[#0096DB] hover:text-[#0096DB] px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Framed Showcase Card & Thumbnails */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4.2] bg-slate-900 group">
              {/* Slide Image with Ken-Burns Motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current}-${currentLocale}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0 overflow-hidden"
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172D50] via-[#172D50]/25 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Photo Caption & Slide Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 text-white">
                <div className="pr-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0096DB]">
                    {currentLocale === "ru" ? "ТМУК Самарканд" : currentLocale === "en" ? "KIUT Samarkand" : "KIUT Samarqand"}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    {slideMetadata[current]?.caption[currentLocale] || currentPhoto.caption}
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-1 bg-[#172D50] p-1 rounded-xl border border-white/20 shrink-0">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label={
                      currentLocale === "ru"
                        ? "Предыдущий слайд"
                        : currentLocale === "en"
                        ? "Previous slide"
                        : "Oldingi slayd"
                    }
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
                    aria-label={
                      currentLocale === "ru"
                        ? "Следующий слайд"
                        : currentLocale === "en"
                        ? "Next slide"
                        : "Keyingi slayd"
                    }
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Grid */}
            <div
              className="grid grid-cols-4 gap-2 sm:gap-2.5 mt-3.5"
              role="tablist"
              aria-label={
                currentLocale === "ru"
                  ? "Галерея слайдов"
                  : currentLocale === "en"
                  ? "Slide gallery"
                  : "Slaydlar galereyasi"
              }
            >
              {slideImages.map((img, idx) => {
                const meta = slideMetadata[idx];
                const isActive = current === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrent(idx)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all p-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0096DB] ${
                      isActive
                        ? "border-[#0096DB] bg-white shadow-md shadow-[#0096DB]/15"
                        : "border-slate-200/90 bg-white/70 hover:border-slate-400 hover:bg-white"
                    }`}
                  >
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-900">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="140px"
                        className={`object-cover transition-all duration-300 ${
                          isActive
                            ? "scale-105 opacity-100"
                            : "opacity-65 group-hover:opacity-95"
                        }`}
                      />
                      <div className="absolute top-1 left-1 bg-[#172D50] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        {meta.num}
                      </div>
                    </div>
                    <div className="mt-1 px-0.5">
                      <p
                        className={`text-[11px] font-bold truncate ${
                          isActive
                            ? "text-[#0096DB]"
                            : "text-slate-700 group-hover:text-[#172D50]"
                        }`}
                      >
                        {meta.tag[currentLocale] || meta.tag.uz}
                      </p>
                    </div>
                    {isActive && (
                      <div className="mt-1 h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          key={`progress-${idx}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6.5, ease: "linear" }}
                          className="h-full bg-[#0096DB]"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fast-Track Institutional Pillar Ribbon */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillarRibbonItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#0096DB] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0096DB] bg-[#EBF5FB] px-2 py-0.5 rounded-md">
                    {item.tag}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#0096DB] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#172D50] group-hover:text-[#0096DB] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
