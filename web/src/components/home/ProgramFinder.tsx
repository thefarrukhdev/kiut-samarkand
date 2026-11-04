"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Globe2,
  Briefcase,
  ArrowRight,
  X,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PROGRAMS_DATA } from "@/data/programs";
import type { Locale, ProgramItem } from "@/types";

interface ProgramFinderProps {
  currentLocale?: Locale;
  onSelectProgramForAdmission?: (programName: string) => void;
}

export function ProgramFinder({
  currentLocale = "uz",
  onSelectProgramForAdmission,
}: ProgramFinderProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFaculty, setSelectedFaculty] = React.useState<string>("all");
  const [selectedMode, setSelectedMode] = React.useState<string>("all");
  const [detailModalProgram, setDetailModalProgram] = React.useState<ProgramItem | null>(null);

  const programs = PROGRAMS_DATA[currentLocale] || PROGRAMS_DATA.uz;

  const facultyFilters = [
    { id: "all", label: currentLocale === "ru" ? "Все направления" : currentLocale === "en" ? "All Programs" : "Barcha yo'nalishlar" },
    { id: "medicine", label: currentLocale === "ru" ? "Медицина" : currentLocale === "en" ? "Medicine" : "Tibbiyot" },
    { id: "engineering", label: currentLocale === "ru" ? "Инженерия & IT" : currentLocale === "en" ? "Engineering & IT" : "Muhandislik & IT" },
    { id: "economy", label: currentLocale === "ru" ? "Экономика & Бизнес" : currentLocale === "en" ? "Business & Economy" : "Iqtisodiyot & Biznes" },
    { id: "education", label: currentLocale === "ru" ? "Педагогика" : currentLocale === "en" ? "Education" : "Pedagogika" },
    { id: "philology", label: currentLocale === "ru" ? "Филология & Тиллар" : currentLocale === "en" ? "Philology & Languages" : "Filologiya" },
  ];

  const modeFilters = [
    { id: "all", label: currentLocale === "ru" ? "Все формы" : currentLocale === "en" ? "All Modes" : "Barcha shakllar" },
    { id: "day", label: currentLocale === "ru" ? "Дневное" : currentLocale === "en" ? "Full-time" : "Kunduzgi" },
    { id: "distance", label: currentLocale === "ru" ? "Заочное" : currentLocale === "en" ? "Part-time" : "Sirtqi" },
    { id: "evening", label: currentLocale === "ru" ? "Вечернее" : currentLocale === "en" ? "Evening" : "Kechki" },
  ];

  const filteredPrograms = React.useMemo(() => {
    return programs.filter((p) => {
      // Faculty filter
      if (selectedFaculty !== "all" && p.facultyId !== selectedFaculty) {
        return false;
      }
      // Mode filter
      if (selectedMode !== "all" && !p.modes.includes(selectedMode as "day" | "evening" | "distance")) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inCareer = p.career.toLowerCase().includes(q);
        const inFaculty = p.facultyName.toLowerCase().includes(q);
        return inName || inDesc || inCareer || inFaculty;
      }
      return true;
    });
  }, [programs, selectedFaculty, selectedMode, searchQuery]);

  const handleApplyClick = (program: ProgramItem) => {
    setDetailModalProgram(null);
    if (onSelectProgramForAdmission) {
      onSelectProgramForAdmission(program.name);
    }
  };

  return (
    <section
      id="programs"
      aria-label="Ta'lim yo'nalishlari interaktiv katalogi"
      className="py-16 sm:py-24 bg-white border-b border-slate-200 relative z-10"
    >
      <Container>
        {/* Section Header: Clean Academic Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-0.5 bg-[#0096DB] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0096DB]">
                {currentLocale === "ru"
                  ? "Каталог академических программ 2026/2027"
                  : currentLocale === "en"
                  ? "Academic Programs Directory 2026/2027"
                  : "Akademik Dasturlar Katalogi 2026/2027"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172D50] tracking-tight">
              {currentLocale === "ru"
                ? "Интерактивный подбор направлений обучения"
                : currentLocale === "en"
                ? "Interactive Degree & Program Explorer"
                : "Ta'lim yo'nalishlari interaktiv qidiruvi"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            {currentLocale === "ru"
              ? "Найдите подходящую профессию по факультетам, языку обучения и карьерным перспективам с международным дипломом."
              : currentLocale === "en"
              ? "Filter by faculties, language of instruction, and career outcomes. Internationally accredited degree programs."
              : "Samarqand filialining barcha yo'nalishlarini qidiring, ta'lim tili va shakli bo'yicha saralang."}
          </p>
        </div>

        {/* Live Filter Controls: Search & Category Chips */}
        <div className="space-y-4 mb-8 bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl border border-slate-200">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLocale === "ru"
                  ? "Поиск направления: например, Лечебное дело, Программная инженерия, Финансы..."
                  : currentLocale === "en"
                  ? "Search program: e.g. Software Engineering, General Medicine, Business..."
                  : "Yo'nalishni qidiring: Masalan, Dasturiy injiniring, Davolash ishi, Moliya..."
              }
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-[#172D50] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Qidiruvni tozalash"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Rows: Faculty & Study Mode */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2">
            {/* Faculty Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap" role="tablist">
              {facultyFilters.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFaculty(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedFaculty === tab.id
                      ? "bg-[#172D50] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mode Tabs & Counter */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                {modeFilters.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedMode(mode.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      selectedMode === mode.id
                        ? "bg-[#0096DB] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {filteredPrograms.length}{" "}
                {currentLocale === "ru" ? "программ" : currentLocale === "en" ? "programs" : "ta yo'nalish"}
              </span>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-slate-200">
            <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#172D50]">
              {currentLocale === "ru"
                ? "По вашему запросу направлений не найдено"
                : currentLocale === "en"
                ? "No matching programs found"
                : "Qidiruv bo'yicha yo'nalish topilmadi"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {currentLocale === "ru"
                ? "Попробуйте изменить поисковый запрос или сбросить фильтры"
                : currentLocale === "en"
                ? "Try searching with different terms or reset your filters"
                : "Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang"}
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedFaculty("all");
                setSelectedMode("all");
              }}
              variant="outline"
              size="sm"
              className="mt-4 text-xs font-bold text-[#172D50] border-slate-300"
            >
              {currentLocale === "ru" ? "Сбросить фильтры" : currentLocale === "en" ? "Reset Filters" : "Filtrni tozalash"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0096DB]/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-3">
                  {/* Top Faculty Pill & Degree */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0096DB] bg-[#E9F2FF] px-2.5 py-1 rounded-md">
                      {program.facultyName}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {program.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#172D50] group-hover:text-[#0096DB] transition-colors leading-snug">
                    {program.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Meta Badges */}
                  <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <Globe2 className="h-3.5 w-3.5 text-[#0096DB]" />
                      <span>{program.languages.join(", ")}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      <span>
                        {program.modes
                          .map((m) =>
                            m === "day"
                              ? currentLocale === "ru" ? "Дневной" : currentLocale === "en" ? "Day" : "Kunduzgi"
                              : m === "distance"
                              ? currentLocale === "ru" ? "Заочный" : currentLocale === "en" ? "Part-time" : "Sirtqi"
                              : currentLocale === "ru" ? "Вечерний" : currentLocale === "en" ? "Evening" : "Kechki"
                          )
                          .join(" / ")}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    onClick={() => handleApplyClick(program)}
                    variant="action"
                    size="sm"
                    className="flex-1 font-bold bg-[#0096DB] hover:bg-[#007BB3] text-white text-xs py-2 rounded-xl"
                  >
                    <span>{currentLocale === "ru" ? "Подать заявку" : currentLocale === "en" ? "Apply Now" : "Ariza topshirish"}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>

                  <Button
                    onClick={() => setDetailModalProgram(program)}
                    variant="outline"
                    size="sm"
                    className="font-bold border-slate-200 hover:border-slate-300 text-[#172D50] text-xs py-2 px-3 rounded-xl"
                  >
                    {currentLocale === "ru" ? "Инфо" : currentLocale === "en" ? "Info" : "Batafsil"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {detailModalProgram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Solid Dark Backdrop (NO blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModalProgram(null)}
              className="fixed inset-0 bg-slate-950/75"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0096DB] bg-[#E9F2FF] px-2.5 py-1 rounded-md">
                    {detailModalProgram.facultyName}
                  </span>
                  <h3 className="text-xl font-bold text-[#172D50] mt-2">
                    {detailModalProgram.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailModalProgram(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Ta&apos;lim muddati:</span>
                    <span className="font-bold text-[#172D50]">{detailModalProgram.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Ta&apos;lim tillari:</span>
                    <span className="font-bold text-[#172D50]">{detailModalProgram.languages.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dastur haqida:
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {detailModalProgram.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-[#0096DB]" />
                    <span>Karyera va ishga joylashish istiqbollari:</span>
                  </h4>
                  <p className="text-sm text-[#172D50] font-medium bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200">
                    {detailModalProgram.career}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between gap-4">
                <Button
                  onClick={() => setDetailModalProgram(null)}
                  variant="outline"
                  size="sm"
                  className="font-bold border-slate-300 text-slate-700"
                >
                  Yopish
                </Button>
                <Button
                  onClick={() => handleApplyClick(detailModalProgram)}
                  variant="action"
                  size="sm"
                  className="font-bold bg-[#0096DB] hover:bg-[#007BB3] text-white px-5 py-2 rounded-xl shadow-md"
                >
                  <span>Ariza topshirish</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
