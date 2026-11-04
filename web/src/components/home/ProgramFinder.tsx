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
import { useLocale } from "@/lib/i18n";
import { PROGRAMS_DATA } from "@/data/programs";
import type { Locale, ProgramItem } from "@/types";

interface ProgramFinderProps {
  currentLocale?: Locale;
  onSelectProgramForAdmission?: (programName: string) => void;
}

const localizedLabels = {
  uz: {
    duration: "Ta'lim muddati:",
    languages: "Ta'lim tillari:",
    about: "Dastur haqida:",
    career: "Karyera va ishga joylashish istiqbollari:",
    close: "Yopish",
    apply: "Ariza topshirish",
    allFaculties: "Barcha yo'nalishlar",
    medicine: "Tibbiyot",
    engineering: "Muhandislik & IT",
    economy: "Iqtisodiyot & Biznes",
    education: "Pedagogika",
    philology: "Filologiya",
    allModes: "Barcha shakllar",
    day: "Kunduzgi",
    distance: "Sirtqi",
    evening: "Kechki",
    searchPlaceholder: "Yo'nalishni qidiring: Masalan, Dasturiy injiniring, Davolash ishi, Moliya...",
    countLabel: "ta yo'nalish",
    emptyTitle: "Qidiruv bo'yicha yo'nalish topilmadi",
    emptyDesc: "Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang",
    resetBtn: "Filtrni tozalash",
    infoBtn: "Batafsil",
    clearSearch: "Qidiruvni tozalash",
  },
  ru: {
    duration: "Срок обучения:",
    languages: "Языки обучения:",
    about: "О программе:",
    career: "Карьерные перспективы и трудоустройство:",
    close: "Закрыть",
    apply: "Подать заявку",
    allFaculties: "Все направления",
    medicine: "Медицина",
    engineering: "Инженерия & IT",
    economy: "Экономика & Бизнес",
    education: "Педагогика",
    philology: "Филология & Языки",
    allModes: "Все формы",
    day: "Дневное",
    distance: "Заочное",
    evening: "Вечернее",
    searchPlaceholder: "Поиск направления: например, Лечебное дело, Программная инженерия, Финансы...",
    countLabel: "программ",
    emptyTitle: "По вашему запросу направлений не найдено",
    emptyDesc: "Попробуйте изменить поисковый запрос или сбросить фильтры",
    resetBtn: "Сбросить фильтры",
    infoBtn: "Инфо",
    clearSearch: "Очистить поиск",
  },
  en: {
    duration: "Program Duration:",
    languages: "Languages of Instruction:",
    about: "About the Program:",
    career: "Career & Employment Prospects:",
    close: "Close",
    apply: "Apply Now",
    allFaculties: "All Programs",
    medicine: "Medicine",
    engineering: "Engineering & IT",
    economy: "Business & Economy",
    education: "Education",
    philology: "Philology & Languages",
    allModes: "All Modes",
    day: "Full-time",
    distance: "Part-time",
    evening: "Evening",
    searchPlaceholder: "Search program: e.g. Software Engineering, General Medicine, Business...",
    countLabel: "programs",
    emptyTitle: "No matching programs found",
    emptyDesc: "Try searching with different terms or reset your filters",
    resetBtn: "Reset Filters",
    infoBtn: "Info",
    clearSearch: "Clear search",
  },
};

export function ProgramFinder({
  currentLocale: propLocale,
  onSelectProgramForAdmission,
}: ProgramFinderProps = {}) {
  const { locale: contextLocale } = useLocale();
  const currentLocale = propLocale || contextLocale;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFaculty, setSelectedFaculty] = React.useState<string>("all");
  const [selectedMode, setSelectedMode] = React.useState<string>("all");
  const [detailModalProgram, setDetailModalProgram] = React.useState<ProgramItem | null>(null);

  const programs = React.useMemo(() => {
    return PROGRAMS_DATA[currentLocale] || PROGRAMS_DATA.uz;
  }, [currentLocale]);

  const labels = localizedLabels[currentLocale] || localizedLabels.uz;

  // Lock body scroll and listen for Escape key when program detail modal is open
  React.useEffect(() => {
    if (detailModalProgram) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setDetailModalProgram(null);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [detailModalProgram]);

  const facultyFilters = React.useMemo(
    () => [
      { id: "all", label: labels.allFaculties },
      { id: "medicine", label: labels.medicine },
      { id: "engineering", label: labels.engineering },
      { id: "economy", label: labels.economy },
      { id: "education", label: labels.education },
      { id: "philology", label: labels.philology },
    ],
    [labels]
  );

  const modeFilters = React.useMemo(
    () => [
      { id: "all", label: labels.allModes },
      { id: "day", label: labels.day },
      { id: "distance", label: labels.distance },
      { id: "evening", label: labels.evening },
    ],
    [labels]
  );

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
      aria-label={
        currentLocale === "ru"
          ? "Интерактивный каталог образовательных программ"
          : currentLocale === "en"
          ? "Interactive Academic Degrees Explorer"
          : "Ta'lim yo'nalishlari interaktiv katalogi"
      }
      className="py-16 sm:py-24 bg-white border-b border-slate-200 relative z-10"
    >
      <Container>
        {/* Section Header: Clean Academic Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-0.5 bg-accent rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                {currentLocale === "ru"
                  ? "Каталог академических программ 2026/2027"
                  : currentLocale === "en"
                  ? "Academic Programs Directory 2026/2027"
                  : "Akademik Dasturlar Katalogi 2026/2027"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight">
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
        <div className="space-y-4 mb-8 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              aria-label={labels.searchPlaceholder}
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label={labels.clearSearch}
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
                  role="tab"
                  aria-selected={selectedFaculty === tab.id}
                  onClick={() => setSelectedFaculty(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedFaculty === tab.id
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mode Tabs & Counter */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200" role="group" aria-label="Study Mode Selection">
                {modeFilters.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedMode(mode.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      selectedMode === mode.id
                        ? "bg-accent text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    aria-pressed={selectedMode === mode.id}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {filteredPrograms.length} {labels.countLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-primary">
              {labels.emptyTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {labels.emptyDesc}
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedFaculty("all");
                setSelectedMode("all");
              }}
              variant="outline"
              size="sm"
              className="mt-4 text-xs font-bold text-primary border-slate-300"
            >
              {labels.resetBtn}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-3">
                  {/* Top Faculty Pill & Degree */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-accent bg-accent-light px-2.5 py-1 rounded-md">
                      {program.facultyName}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {program.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                    {program.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Meta Badges */}
                  <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <Globe2 className="h-3.5 w-3.5 text-accent" />
                      <span>{program.languages.join(", ")}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      <span>
                        {program.modes
                          .map((m) =>
                            m === "day"
                              ? labels.day
                              : m === "distance"
                              ? labels.distance
                              : labels.evening
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
                    className="flex-1 font-bold bg-accent hover:bg-accent-hover text-white text-xs py-2 rounded-xl"
                  >
                    <span>{labels.apply}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>

                  <Button
                    onClick={() => setDetailModalProgram(program)}
                    variant="outline"
                    size="sm"
                    className="font-bold border-slate-200 hover:border-slate-300 text-primary text-xs py-2 px-3 rounded-xl"
                  >
                    {labels.infoBtn}
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
            aria-labelledby="program-detail-modal-title"
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
              <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent bg-accent-light px-2.5 py-1 rounded-md">
                    {detailModalProgram.facultyName}
                  </span>
                  <h3 id="program-detail-modal-title" className="text-xl font-bold text-primary mt-2">
                    {detailModalProgram.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailModalProgram(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label={labels.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">{labels.duration}</span>
                    <span className="font-bold text-primary">{detailModalProgram.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">{labels.languages}</span>
                    <span className="font-bold text-primary">{detailModalProgram.languages.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {labels.about}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {detailModalProgram.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-accent" />
                    <span>{labels.career}</span>
                  </h4>
                  <p className="text-sm text-primary font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    {detailModalProgram.career}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <Button
                  onClick={() => setDetailModalProgram(null)}
                  variant="outline"
                  size="sm"
                  className="font-bold border-slate-300 text-slate-700"
                >
                  {labels.close}
                </Button>
                <Button
                  onClick={() => handleApplyClick(detailModalProgram)}
                  variant="action"
                  size="sm"
                  className="font-bold bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-xl shadow-md"
                >
                  <span>{labels.apply}</span>
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
