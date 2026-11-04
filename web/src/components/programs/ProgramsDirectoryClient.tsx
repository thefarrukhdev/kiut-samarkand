"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Clock,
  Globe2,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Filter,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { getProgramsDictionary } from "@/lib/i18n/programs-dictionary";
import { PROGRAMS_DATA } from "@/data/programs";
import { resolveFacultyName } from "@/lib/admissions";
import type { ProgramItem } from "@/types";

function ProgramsDirectoryContent() {
  const { locale, setLocale } = useLocale();
  const searchParams = useSearchParams();
  const dict = React.useMemo(() => getProgramsDictionary(locale), [locale]);

  const urlFaculty = searchParams.get("faculty");
  const urlDegree = searchParams.get("degree");
  const urlFormat = searchParams.get("format");
  const urlLang = searchParams.get("lang");

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [userFaculty, setUserFaculty] = React.useState<string | null>(null);
  const [userDegree, setUserDegree] = React.useState<string | null>(null);
  const [userFormat, setUserFormat] = React.useState<string | null>(null);
  const [userLanguage, setUserLanguage] = React.useState<string | null>(null);

  const selectedFaculty = userFaculty ?? (urlFaculty || "all");
  const selectedDegree = userDegree ?? (urlDegree || "all");
  const selectedFormat = userFormat ?? (urlFormat || "all");
  const selectedLanguage = userLanguage ?? (urlLang || "all");

  const setSelectedFaculty = React.useCallback((val: string) => setUserFaculty(val), []);
  const setSelectedDegree = React.useCallback((val: string) => setUserDegree(val), []);
  const setSelectedFormat = React.useCallback((val: string) => setUserFormat(val), []);
  const setSelectedLanguage = React.useCallback((val: string) => setUserLanguage(val), []);

  // Modal State
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [targetFaculty, setTargetFaculty] = React.useState<string>("Tibbiyot fakulteti");

  const programs = React.useMemo<ProgramItem[]>(() => {
    return PROGRAMS_DATA[locale] || PROGRAMS_DATA.uz;
  }, [locale]);

  // Filter Logic
  const filteredPrograms = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return programs.filter((p) => {
      // Faculty filter
      if (selectedFaculty !== "all" && p.facultyId !== selectedFaculty) {
        return false;
      }

      // Degree filter
      if (selectedDegree !== "all" && p.degree !== selectedDegree) {
        return false;
      }

      // Format filter
      if (selectedFormat !== "all") {
        if (!p.modes.includes(selectedFormat as "day" | "evening" | "distance")) {
          return false;
        }
      }

      // Language filter
      if (selectedLanguage !== "all") {
        const matchesLang = p.languages.some((l) => {
          const lLower = l.toLowerCase();
          if (selectedLanguage === "uzbek") return lLower.includes("o'zbek") || lLower.includes("узбек") || lLower.includes("uzbek");
          if (selectedLanguage === "russian") return lLower.includes("rus") || lLower.includes("рус") || lLower.includes("russian");
          if (selectedLanguage === "english") return lLower.includes("ingliz") || lLower.includes("англ") || lLower.includes("english");
          return false;
        });
        if (!matchesLang) return false;
      }

      // Search Query
      if (q) {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const careerMatch = p.career.toLowerCase().includes(q);
        const facultyMatch = p.facultyName.toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !careerMatch && !facultyMatch) {
          return false;
        }
      }

      return true;
    });
  }, [programs, searchQuery, selectedFaculty, selectedDegree, selectedFormat, selectedLanguage]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedFaculty !== "all" ||
    selectedDegree !== "all" ||
    selectedFormat !== "all" ||
    selectedLanguage !== "all";

  const resetAllFilters = React.useCallback(() => {
    setSearchQuery("");
    setUserFaculty("all");
    setUserDegree("all");
    setUserFormat("all");
    setUserLanguage("all");
  }, []);

  const handleOpenAdmission = React.useCallback(
    (facultyOrProgramName?: string) => {
      if (facultyOrProgramName) {
        setTargetFaculty(resolveFacultyName(facultyOrProgramName, locale));
      }
      setAdmissionModalOpen(true);
    },
    [locale]
  );

  const getFacultyBadgeStyle = (facultyId: string) => {
    switch (facultyId) {
      case "medicine":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "engineering":
        return "bg-accent-light text-accent border-accent/25";
      case "economy":
        return "bg-slate-100 text-primary border-slate-200";
      case "education":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "philology":
        return "bg-sky-50 text-sky-700 border-sky-200";
      default:
        return "bg-accent-light text-accent border-accent/25";
    }
  };

  const getFormatLabel = (mode: "day" | "evening" | "distance") => {
    if (mode === "day") return dict.formats.day;
    if (mode === "evening") return dict.formats.evening;
    return dict.formats.distance;
  };

  const getDegreeLabel = (deg: "bachelor" | "master") => {
    return deg === "master" ? dict.degrees.master : dict.degrees.bachelor;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopBar />
      <Navbar
        onLocaleChange={(newLocale) => setLocale(newLocale)}
        onOpenAdmissionModal={() => handleOpenAdmission()}
      />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Bar */}
        <section className="bg-white border-b border-slate-200 py-3.5">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary transition-colors">
                {dict.breadcrumbHome}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-primary font-bold">{dict.breadcrumbPrograms}</span>
            </nav>
          </Container>
        </section>

        {/* Hero Header */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
          <Container>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <span className="w-6 h-0.5 bg-accent rounded-full" />
                <span>{dict.heroBadge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tight leading-[1.15]">
                {dict.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {dict.heroDescription}
              </p>
            </div>
          </Container>
        </section>

        {/* Search & Dynamic Filter Control Panel */}
        <section className="py-8 bg-surface">
          <Container className="space-y-6">
            {/* Search Input Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.searchPlaceholder}
                  aria-label={dict.searchAria}
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-surface border border-slate-200 text-sm font-medium text-primary placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                    aria-label={dict.clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
              {/* Faculty Filter */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5 text-accent" />
                    <span>{dict.filterFaculty}</span>
                  </span>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="text-xs font-bold text-accent hover:underline cursor-pointer"
                    >
                      {dict.resetFilters}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: "all", label: dict.faculties.all },
                    { id: "medicine", label: dict.faculties.medicine },
                    { id: "engineering", label: dict.faculties.engineering },
                    { id: "economy", label: dict.faculties.economy },
                    { id: "education", label: dict.faculties.education },
                    { id: "philology", label: dict.faculties.philology },
                  ].map((fac) => (
                    <button
                      key={fac.id}
                      type="button"
                      onClick={() => setSelectedFaculty(fac.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedFaculty === fac.id
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                      }`}
                      aria-pressed={selectedFaculty === fac.id}
                    >
                      {fac.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Filters Strip (Degree, Format, Language) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                {/* Degree Filter */}
                <div>
                  <label htmlFor="filter-degree-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {dict.filterDegree}
                  </label>
                  <select
                    id="filter-degree-select"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-primary bg-surface outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="all">{dict.degrees.all}</option>
                    <option value="bachelor">{dict.degrees.bachelor}</option>
                    <option value="master">{dict.degrees.master}</option>
                  </select>
                </div>

                {/* Study Format Filter */}
                <div>
                  <label htmlFor="filter-format-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {dict.filterFormat}
                  </label>
                  <select
                    id="filter-format-select"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-primary bg-surface outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="all">{dict.formats.all}</option>
                    <option value="day">{dict.formats.day}</option>
                    <option value="distance">{dict.formats.distance}</option>
                    <option value="evening">{dict.formats.evening}</option>
                  </select>
                </div>

                {/* Language of Instruction Filter */}
                <div>
                  <label htmlFor="filter-language-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {dict.filterLanguage}
                  </label>
                  <select
                    id="filter-language-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-primary bg-surface outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="all">{dict.languages.all}</option>
                    <option value="uzbek">{dict.languages.uzbek}</option>
                    <option value="russian">{dict.languages.russian}</option>
                    <option value="english">{dict.languages.english}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count Banner */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span>
                <strong className="text-primary font-black text-sm">{filteredPrograms.length}</strong>{" "}
                {dict.foundCount}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-accent hover:underline cursor-pointer"
                >
                  {dict.resetFilters}
                </button>
              )}
            </div>

            {/* Programs Responsive Card Grid */}
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-200 hover:border-accent hover:shadow-md shadow-xs"
                  >
                    <div>
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getFacultyBadgeStyle(
                            program.facultyId
                          )}`}
                        >
                          {program.facultyName}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {getDegreeLabel(program.degree)}
                        </span>
                      </div>

                      {/* Program Title */}
                      <Link
                        href={`/programs/${program.slug}`}
                        className="block group-hover:text-accent transition-colors"
                      >
                        <h2 className="text-lg font-bold text-primary leading-snug line-clamp-2">
                          {program.name}
                        </h2>
                      </Link>

                      {/* Meta Information Strip */}
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span className="font-semibold text-slate-500">{dict.duration}:</span>
                          <span className="font-bold text-primary">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Globe2 className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span className="font-semibold text-slate-500">{dict.languagesLabel}:</span>
                          <span className="font-medium text-primary">
                            {program.languages.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <BookOpen className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span className="font-semibold text-slate-500">{dict.formatsLabel}:</span>
                          <span className="font-medium text-primary">
                            {program.modes.map((m) => getFormatLabel(m)).join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {program.description}
                      </p>
                    </div>

                    {/* Card Action Row */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors group/link"
                      >
                        <span>{dict.viewDetails}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                      <Button
                        type="button"
                        onClick={() => handleOpenAdmission(program.facultyName)}
                        variant="action"
                        size="sm"
                        className="bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl px-3.5 py-1.5 shadow-xs"
                      >
                        {dict.applyNow}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="h-14 w-14 mx-auto rounded-2xl bg-surface border border-slate-200 flex items-center justify-center text-slate-400">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary">{dict.emptyTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {dict.emptyDescription}
                </p>
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={resetAllFilters}
                    variant="action"
                    size="default"
                    className="bg-accent hover:bg-accent-hover text-white font-bold rounded-xl px-5"
                  >
                    {dict.resetFilters}
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingContact onOpenAdmissionModal={() => handleOpenAdmission()} />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty={targetFaculty}
      />
    </div>
  );
}

export function ProgramsDirectoryClient() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <ProgramsDirectoryContent />
    </React.Suspense>
  );
}
