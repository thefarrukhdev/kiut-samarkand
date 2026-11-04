"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Globe2,
  X,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { getLocalizedFaculties, type FacultyData } from "@/data/schools";
import type { Locale } from "@/types";

interface SchoolsGridProps {
  currentLocale?: Locale;
  onSelectFacultyForAdmission?: (facultyName: string) => void;
}

export function SchoolsGrid({
  currentLocale: propLocale,
  onSelectFacultyForAdmission,
}: SchoolsGridProps = {}) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("schools");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? (translations[propLocale]?.schools || contextT) : contextT;

  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [modalFaculty, setModalFaculty] = React.useState<FacultyData | null>(null);
  const [expandedProgramIndex, setExpandedProgramIndex] = React.useState<number | null>(null);

  const facultiesData = React.useMemo(() => getLocalizedFaculties(currentLocale), [currentLocale]);

  // Lock body scroll and add Escape key listener when modal is open
  React.useEffect(() => {
    if (modalFaculty) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModalFaculty(null);
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
  }, [modalFaculty]);

  const filteredFaculties = React.useMemo(() => {
    return activeTab === "all"
      ? facultiesData
      : facultiesData.filter((f) => f.category === activeTab);
  }, [facultiesData, activeTab]);

  const tabs = React.useMemo(
    () => [
      { id: "all", label: t.tabs.all },
      { id: "medicine", label: t.tabs.medicine },
      { id: "engineering", label: t.tabs.engineering },
      { id: "economy", label: t.tabs.economy },
      { id: "education", label: t.tabs.education },
      { id: "philology", label: t.tabs.philology },
    ],
    [t.tabs]
  );

  const handleApplyToFaculty = React.useCallback(
    (facultyName: string) => {
      if (onSelectFacultyForAdmission) {
        onSelectFacultyForAdmission(facultyName);
      } else {
        const el = document.getElementById("admission");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [onSelectFacultyForAdmission]
  );

  return (
    <section
      id="schools"
      aria-label={
        currentLocale === "ru"
          ? "Факультеты и академические направления"
          : currentLocale === "en"
          ? "Faculties and Academic Disciplines"
          : "Fakultetlar va Ta'lim Yo'nalishlari"
      }
      className="py-16 sm:py-24 bg-surface relative"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-3">
            <span className="w-6 h-px bg-accent" />
            <span>{t.badge}</span>
            <span className="w-6 h-px bg-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
            {t.description}
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-[#334155] hover:text-primary border border-slate-200 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFaculties.map((faculty, idx) => (
              <motion.div
                key={`${faculty.id}-${currentLocale}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="h-full"
              >
                <SpotlightCard
                  theme="light"
                  spotlightColor="rgba(0, 150, 219, 0.28)"
                  spotlightSize={340}
                  intensity={0.28}
                  className="!p-0 !rounded-2xl flex flex-col h-full bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300 group hover:-translate-y-1 overflow-hidden"
                >
                  {/* Image Banner */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-primary">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-md border border-white/10 tracking-wide uppercase">
                        {faculty.badge}
                      </span>
                      <span className="text-xs font-semibold text-white bg-slate-900 px-2.5 py-1 rounded-md border border-white/10">
                        {faculty.count}
                      </span>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5 text-slate-200" />
                        <span>{faculty.duration}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Globe2 className="h-3.5 w-3.5 text-accent" />
                        <span>{faculty.languages.join(", ")}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                        {faculty.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] line-clamp-2 leading-relaxed">
                        {faculty.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {faculty.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Popular programs pill chips */}
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          {t.mainProgramsLabel}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {faculty.popularPrograms.slice(0, 3).map((prog) => (
                            <span
                              key={prog}
                              className="text-[11px] font-semibold text-[#334155] bg-surface border border-slate-200/60 px-2.5 py-1 rounded-lg"
                            >
                              {prog}
                            </span>
                          ))}
                          {faculty.allPrograms.length > 3 && (
                            <button
                              type="button"
                              onClick={() => {
                                setModalFaculty(faculty);
                                setExpandedProgramIndex(null);
                              }}
                              className="text-[11px] font-bold text-accent hover:text-accent-hover hover:underline px-1 py-1 cursor-pointer"
                            >
                              +{faculty.allPrograms.length - 3} {t.morePrograms}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <Button
                        onClick={() => handleApplyToFaculty(faculty.name)}
                        variant="action"
                        size="sm"
                        className="flex-1 font-bold shadow-xs hover:shadow-sm"
                      >
                        <span>{t.applyButton}</span>
                      </Button>
                      <Button
                        onClick={() => {
                          setModalFaculty(faculty);
                          setExpandedProgramIndex(null);
                        }}
                        variant="secondary"
                        size="sm"
                        className="font-semibold text-xs border-slate-200"
                      >
                        <span>{t.detailsButton}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Programs Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
              <span className="w-4 h-px bg-accent" />
              <span>{t.bannerBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {t.bannerTitle}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {t.bannerDescription}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+998557024040"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-sm transition-colors shadow-md"
            >
              <span>+998 (55) 702-40-40</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Program Details Modal */}
      <AnimatePresence>
        {modalFaculty && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="schools-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalFaculty(null)}
              className="fixed inset-0 bg-slate-950/75"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-surface">
                <div className="flex items-center gap-3">
                  <Badge variant={modalFaculty.badgeVariant}>
                    {modalFaculty.badge}
                  </Badge>
                  <h3 id="schools-modal-title" className="text-xl font-bold text-primary">
                    {modalFaculty.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalFaculty(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label={t.modalClose}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t.modalAbout}
                  </h4>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {modalFaculty.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-surface border border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">{t.durationLabel}</span>
                    <span className="font-bold text-primary text-sm mt-0.5 block">{modalFaculty.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">{t.languagesLabel}</span>
                    <span className="font-bold text-primary text-sm mt-0.5 block">{modalFaculty.languages.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {t.modalAllPrograms} ({modalFaculty.allPrograms.length})
                  </h4>
                  <ul className="space-y-2">
                    {modalFaculty.allPrograms.map((prog, index) => {
                      const isExpanded = expandedProgramIndex === index;
                      return (
                        <li
                          key={index}
                          className="rounded-xl bg-surface border border-slate-200/80 overflow-hidden transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedProgramIndex(isExpanded ? null : index)}
                            className="w-full p-3 flex items-center justify-between text-left text-xs font-semibold text-primary hover:bg-white transition-colors cursor-pointer"
                            aria-expanded={isExpanded}
                          >
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                              <span>{prog.name}</span>
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] text-slate-500 font-normal">
                                {prog.duration}
                              </span>
                              <ChevronDown
                                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                                  isExpanded ? "rotate-180 text-accent" : ""
                                }`}
                              />
                            </div>
                          </button>

                          {isExpanded && prog.description && (
                            <div className="px-3 pb-3 pt-1 text-xs text-[#334155] bg-white border-t border-slate-200/80 leading-relaxed">
                              {prog.description}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3 bg-surface">
                <Button
                  onClick={() => setModalFaculty(null)}
                  variant="secondary"
                  size="default"
                >
                  {t.modalClose}
                </Button>
                <Button
                  onClick={() => {
                    const name = modalFaculty.name;
                    setModalFaculty(null);
                    handleApplyToFaculty(name);
                  }}
                  variant="action"
                  size="default"
                  className="font-bold"
                >
                  <span>{t.modalApply}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
