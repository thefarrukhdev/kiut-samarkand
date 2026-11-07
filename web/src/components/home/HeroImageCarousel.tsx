"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/types";

export interface HeroSlideImage {
  src: string;
  alt: string;
  caption: string;
}

export interface HeroSlideMeta {
  num: string;
  tag: Record<Locale, string>;
  caption: Record<Locale, string>;
}

interface HeroImageCarouselProps {
  currentIndex: number;
  totalSlides: number;
  slideImages: HeroSlideImage[];
  slideMetadata: HeroSlideMeta[];
  currentLocale: Locale;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export function HeroImageCarousel({
  currentIndex,
  totalSlides,
  slideImages,
  slideMetadata,
  currentLocale,
  onPrev,
  onNext,
  onSelect,
}: HeroImageCarouselProps) {
  const currentPhoto = slideImages[currentIndex] || slideImages[0];
  const currentMeta = slideMetadata[currentIndex] || slideMetadata[0];

  return (
    <div className="relative">
      {/* Framed Image Display */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4.2] bg-slate-900 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${currentLocale}`}
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
              {currentMeta?.caption[currentLocale] || currentPhoto.caption}
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-1 bg-[#172D50] p-1 rounded-xl border border-white/20 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Oldingi slayd"
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] font-bold px-1.5 tabular-nums text-slate-200">
              {currentIndex + 1} / {totalSlides}
            </span>
            <button
              type="button"
              onClick={onNext}
              aria-label="Keyingi slayd"
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Preview Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mt-3.5" role="tablist">
        {slideImages.map((img, idx) => {
          const meta = slideMetadata[idx];
          const isActive = currentIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(idx)}
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
                    isActive ? "scale-105 opacity-100" : "opacity-65 group-hover:opacity-95"
                  }`}
                />
                <div className="absolute top-1 left-1 bg-[#172D50] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                  {meta?.num}
                </div>
              </div>
              <div className="mt-1 px-0.5">
                <p
                  className={`text-[11px] font-bold truncate ${
                    isActive ? "text-[#0096DB]" : "text-slate-700 group-hover:text-[#172D50]"
                  }`}
                >
                  {meta?.tag[currentLocale] || meta?.tag.uz}
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
  );
}
