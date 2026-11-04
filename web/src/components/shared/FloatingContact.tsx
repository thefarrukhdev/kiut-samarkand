"use client";

import * as React from "react";
import { Phone, Send, ArrowUp, GraduationCap } from "lucide-react";
import type { Locale } from "@/types";

interface FloatingContactProps {
  currentLocale?: Locale;
  onOpenAdmissionModal?: () => void;
}

const FLOATING_LABELS = {
  uz: {
    apply: "Ariza topshirish",
    call: "Qo'ng'iroq qilish",
    telegram: "Telegram orqali bog'lanish",
    top: "Yuqoriga qaytish",
    admissionsOffice: "Qabul komissiyasi",
    asideLabel: "Tezkor aloqa va yordam",
  },
  ru: {
    apply: "Подать заявку",
    call: "Позвонить",
    telegram: "Связаться в Telegram",
    top: "Наверх",
    admissionsOffice: "Приемная комиссия",
    asideLabel: "Быстрая связь и поддержка",
  },
  en: {
    apply: "Apply Now",
    call: "Call Admission Office",
    telegram: "Chat on Telegram",
    top: "Back to top",
    admissionsOffice: "Admissions Office",
    asideLabel: "Quick contact and support",
  },
};

export function FloatingContact({
  currentLocale = "uz",
  onOpenAdmissionModal,
}: FloatingContactProps) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const labels = FLOATING_LABELS[currentLocale] || FLOATING_LABELS.uz;

  return (
    <aside
      aria-label={labels.asideLabel}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 print:hidden"
    >
      {/* 1. Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={labels.top}
          className="h-10 w-10 rounded-xl bg-white border border-slate-300 shadow-md text-slate-700 hover:text-[#172D50] hover:border-slate-400 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0096DB] cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* 2. Direct Call Action Button */}
      <a
        href="tel:+998557024040"
        aria-label={labels.call}
        className="group hidden sm:flex items-center gap-2.5 bg-white border border-slate-200 shadow-lg hover:shadow-xl rounded-xl px-3.5 py-2 text-slate-700 hover:text-[#172D50] hover:border-slate-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0096DB]"
      >
        <span className="h-7 w-7 rounded-lg bg-[#F0F7FF] text-[#0096DB] flex items-center justify-center group-hover:scale-105 transition-transform">
          <Phone className="h-3.5 w-3.5" />
        </span>
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">
            {labels.admissionsOffice}
          </span>
          <span className="text-xs font-black text-[#172D50]">
            +998 (55) 702-40-40
          </span>
        </div>
      </a>

      {/* 3. Telegram Consultation */}
      <a
        href="https://t.me/kiut_samarkand"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.telegram}
        className="h-11 w-11 rounded-xl bg-[#229ED9] text-white shadow-lg shadow-[#229ED9]/25 hover:bg-[#1E8EC4] hover:shadow-xl flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#229ED9]"
      >
        <Send className="h-5 w-5" />
      </a>

      {/* 4. Quick Apply Floating CTA */}
      <button
        type="button"
        onClick={onOpenAdmissionModal}
        aria-label={labels.apply}
        className="flex items-center gap-2.5 bg-[#172D50] hover:bg-[#12223D] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl shadow-[#172D50]/30 hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0096DB] cursor-pointer"
      >
        <GraduationCap className="h-4 w-4 text-[#0096DB]" />
        <span>{labels.apply}</span>
      </button>
    </aside>
  );
}
