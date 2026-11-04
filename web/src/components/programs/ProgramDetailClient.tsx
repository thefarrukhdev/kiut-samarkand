"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  Globe2,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Phone,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileCheck2,
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
import {
  getCurriculum,
  getAccreditationHighlights,
  getCareerOutcomes,
} from "@/lib/program-details";
import { resolveFacultyName } from "@/lib/admissions";
import type { ProgramItem } from "@/types";

interface ProgramDetailClientProps {
  slug: string;
}

export function ProgramDetailClient({ slug }: ProgramDetailClientProps) {
  const { locale, setLocale } = useLocale();
  const dict = React.useMemo(() => getProgramsDictionary(locale), [locale]);

  // Find program by slug in current locale, fallback to uz
  const program = React.useMemo<ProgramItem | undefined>(() => {
    const list = PROGRAMS_DATA[locale] || PROGRAMS_DATA.uz;
    return (
      list.find((p) => p.slug === slug) ||
      PROGRAMS_DATA.uz.find((p) => p.slug === slug)
    );
  }, [locale, slug]);

  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [selectedFacultyOverride, setSelectedFacultyOverride] = React.useState<string | null>(null);

  const targetFaculty = React.useMemo(() => {
    if (selectedFacultyOverride) {
      return resolveFacultyName(selectedFacultyOverride, locale);
    }
    return resolveFacultyName(program?.facultyName || "Tibbiyot fakulteti", locale);
  }, [selectedFacultyOverride, program?.facultyName, locale]);

  const handleOpenAdmission = React.useCallback(
    (facName?: string) => {
      if (facName) {
        setSelectedFacultyOverride(facName);
      } else {
        setSelectedFacultyOverride(null);
      }
      setAdmissionModalOpen(true);
    },
    []
  );

  // Curriculum, Accreditation & Career data
  const curriculum = React.useMemo(() => {
    if (!program) return [];
    return getCurriculum(program.slug, program.facultyId, locale);
  }, [program, locale]);

  const accreditationList = React.useMemo(() => {
    if (!program) return [];
    return getAccreditationHighlights(program.facultyId, locale);
  }, [program, locale]);

  const careerOutcomes = React.useMemo(() => {
    if (!program) return [];
    return getCareerOutcomes(program, locale);
  }, [program, locale]);

  // Related programs in the same faculty
  const relatedPrograms = React.useMemo<ProgramItem[]>(() => {
    if (!program) return [];
    const list = PROGRAMS_DATA[locale] || PROGRAMS_DATA.uz;
    return list
      .filter((p) => p.facultyId === program.facultyId && p.slug !== program.slug)
      .slice(0, 4);
  }, [program, locale]);

  if (!program) {
    return null;
  }

  const getFormatLabel = (mode: "day" | "evening" | "distance") => {
    if (mode === "day") return dict.formats.day;
    if (mode === "evening") return dict.formats.evening;
    return dict.formats.distance;
  };

  const getDegreeLabel = (deg: "bachelor" | "master") => {
    return deg === "master" ? dict.degrees.master : dict.degrees.bachelor;
  };

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
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
              <Link href="/" className="hover:text-primary transition-colors">
                {dict.breadcrumbHome}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <Link href="/programs" className="hover:text-primary transition-colors">
                {dict.breadcrumbPrograms}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="text-primary font-bold line-clamp-1">{program.name}</span>
            </nav>
          </Container>
        </section>

        {/* Hero Header */}
        <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
          <Container>
            <div className="max-w-4xl space-y-5">
              {/* Badges Row */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg border uppercase tracking-wider ${getFacultyBadgeStyle(
                    program.facultyId
                  )}`}
                >
                  {program.facultyName}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
                  {getDegreeLabel(program.degree)}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-accent-light text-accent border border-accent/20">
                  {dict.heroBadge}
                </span>
              </div>

              {/* Program Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tight leading-[1.15]">
                {program.name}
              </h1>

              {/* Key Highlights Bar */}
              <div className="pt-2 flex items-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700 bg-surface px-3.5 py-2 rounded-xl border border-slate-200">
                  <Clock className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-slate-500 font-semibold">{dict.duration}:</span>
                  <span className="font-bold text-primary">{program.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-surface px-3.5 py-2 rounded-xl border border-slate-200">
                  <Globe2 className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-slate-500 font-semibold">{dict.languagesLabel}:</span>
                  <span className="font-bold text-primary">{program.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-surface px-3.5 py-2 rounded-xl border border-slate-200">
                  <GraduationCap className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-slate-500 font-semibold">{dict.formatsLabel}:</span>
                  <span className="font-bold text-primary">
                    {program.modes.map((m) => getFormatLabel(m)).join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2-Column Content Layout */}
        <section className="py-10 sm:py-12 bg-surface">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (Main 8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* 1. Dastur haqida (Comprehensive Overview) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-primary">
                        {dict.aboutProgram}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {program.facultyName} • {getDegreeLabel(program.degree)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface border border-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 leading-snug">
                        <strong className="block text-primary font-bold mb-0.5">
                          {locale === "ru" ? "Практические навыки" : locale === "en" ? "Hands-on Clinical/Lab Mastery" : "Amaliy laboratoriya va ko'nikmalar"}
                        </strong>
                        {locale === "ru"
                          ? "Обучение в современных симуляционных центрах и специализированных лабораториях."
                          : locale === "en"
                          ? "Practical courses in simulation centers and advanced faculty laboratories."
                          : "Zamonaviy simulyatsiya markazlari va maxsus amaliy laboratoriyalarda chuqurlashtirilgan o'qitish."}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface border border-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 leading-snug">
                        <strong className="block text-primary font-bold mb-0.5">
                          {locale === "ru" ? "Международные стандарты" : locale === "en" ? "International Standards" : "Xalqaro ta'lim standartlari"}
                        </strong>
                        {locale === "ru"
                          ? "Учебные программы, согласованные с ведущими партнерскими университетами Южной Кореи."
                          : locale === "en"
                          ? "Curricula developed in partnership with leading universities in South Korea and Europe."
                          : "Janubiy Koreya va Yevropaning yetakchi universitetlari tajribasiga asoslangan o'quv rejalari."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Karyera va ishga joylashish istiqbollari */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-primary">
                        {dict.careerHeading}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {locale === "ru" ? "Кем вы сможете работать" : locale === "en" ? "Target Roles & Employment" : "Mutaxassislik bo'yicha imkoniyatlar"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {program.career}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {careerOutcomes.map((careerItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-slate-200 text-xs sm:text-sm text-slate-700"
                      >
                        <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{careerItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. O'quv dasturi va asosiy fanlar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                      <FileCheck2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-primary">
                        {dict.curriculumHeading}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {locale === "ru" ? "Ключевые модули курса" : locale === "en" ? "Core Modules & Practical Hours" : "Asosiy ixtisoslik fanlari"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {curriculum.map((moduleName, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-surface border border-slate-200 flex items-start gap-3"
                      >
                        <span className="h-6 w-6 rounded-lg bg-white border border-slate-200 text-primary font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-primary leading-snug">
                          {moduleName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Xalqaro akkreditatsiya va dual diplom */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-primary">
                        {dict.accreditationHeading}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {locale === "ru" ? "Международное признание" : locale === "en" ? "Global Articulation & Licenses" : "Xalqaro tan olinish va litsenziya"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {accreditationList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-surface border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                          <h3 className="text-xs sm:text-sm font-bold text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar 4 cols sticky) */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Fast Facts Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Building2 className="h-5 w-5 text-accent" />
                    <h3 className="text-base font-bold text-primary">
                      {dict.fastFactsHeading}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factDegree}:</span>
                      <span className="font-bold text-primary">{getDegreeLabel(program.degree)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factDuration}:</span>
                      <span className="font-bold text-primary">{program.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factFormat}:</span>
                      <span className="font-bold text-primary">
                        {program.modes.map((m) => getFormatLabel(m)).join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factLanguage}:</span>
                      <span className="font-bold text-primary">{program.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factDates}:</span>
                      <span className="font-bold text-emerald-700">{dict.factDatesValue}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">{dict.factDiploma}:</span>
                      <span className="font-bold text-primary">{dict.factDiplomaValue}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500 font-semibold">{dict.factLicense}:</span>
                      <span className="font-bold text-primary">{dict.factLicenseValue}</span>
                    </div>
                  </div>
                </div>

                {/* High-Conversion CTA Card */}
                <div className="bg-primary text-white rounded-2xl border border-primary p-6 shadow-md space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-accent-light/10 px-2.5 py-1 rounded-md border border-accent/20 inline-block mb-2">
                      {dict.ctaHeading}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {program.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {dict.ctaSub}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <Button
                      type="button"
                      onClick={() => handleOpenAdmission(program.facultyName)}
                      variant="action"
                      size="default"
                      className="w-full bg-accent hover:bg-accent-hover text-white font-bold rounded-xl text-xs sm:text-sm py-3 shadow-md"
                    >
                      <span>{dict.applyForProgram}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleOpenAdmission(program.facultyName)}
                      variant="secondary"
                      size="default"
                      className="w-full font-bold text-primary rounded-xl text-xs sm:text-sm py-2.5"
                    >
                      {dict.getConsultation}
                    </Button>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-center">
                    <span className="text-[11px] text-slate-300 block mb-1">
                      {dict.hotlineLabel}
                    </span>
                    <a
                      href="tel:+998557024040"
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-accent transition-colors"
                    >
                      <Phone className="h-4 w-4 text-accent" />
                      <span>+998 (55) 702-40-40</span>
                    </a>
                  </div>
                </div>

                {/* Related Programs Card */}
                {relatedPrograms.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {dict.relatedPrograms}
                    </h4>
                    <div className="space-y-2.5">
                      {relatedPrograms.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/programs/${rel.slug}`}
                          className="group block p-3 rounded-xl bg-surface hover:bg-slate-100 border border-slate-200 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                              {rel.name}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                            <span>{rel.duration}</span>
                            <span>•</span>
                            <span>{getDegreeLabel(rel.degree)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
