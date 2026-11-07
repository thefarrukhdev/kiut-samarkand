"use client";

import * as React from "react";
import Link from "next/link";
import { Send, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { ProgramOverviewCard } from "./ProgramOverviewCard";
import { CurriculumAccordion } from "./CurriculumAccordion";
import { CareerProspectsGrid } from "./CareerProspectsGrid";
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
  initialProgram: ProgramItem;
}

export function ProgramDetailClient({ initialProgram }: ProgramDetailClientProps) {
  const { locale } = useLocale();
  const dict = React.useMemo(() => getProgramsDictionary(locale), [locale]);

  // Synchronize program localization with current active locale
  const program = React.useMemo<ProgramItem>(() => {
    const list = PROGRAMS_DATA[locale] || PROGRAMS_DATA.uz;
    const match = list.find((p) => p.slug === initialProgram.slug);
    return match || initialProgram;
  }, [locale, initialProgram]);

  // Curriculum, Accreditation Highlights, and Career Outcomes
  const curriculum = React.useMemo(
    () => getCurriculum(program.slug, program.facultyId, locale),
    [program.slug, program.facultyId, locale]
  );
  const accreditationHighlights = React.useMemo(
    () => getAccreditationHighlights(program.facultyId, locale),
    [program.facultyId, locale]
  );
  const careerOutcomes = React.useMemo(
    () => getCareerOutcomes(program, locale),
    [program, locale]
  );

  // Admission Modal state
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const targetFacultyName = React.useMemo(
    () => resolveFacultyName(program.facultyName, "uz"),
    [program.facultyName]
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Program Hero Header */}
      <PageHeader
        badge={program.facultyName}
        title={program.name}
        description={program.description}
        breadcrumbs={[
          { label: "Bosh sahifa", href: "/" },
          { label: dict.breadcrumbPrograms, href: "/programs" },
          { label: program.name },
        ]}
        actions={
          <Button
            size="lg"
            onClick={() => setAdmissionModalOpen(true)}
            className="bg-[#0096DB] hover:bg-[#0085c4] text-white shadow-lg shadow-[#0096DB]/25 font-bold flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{dict.applyNow}</span>
          </Button>
        }
      />

      {/* Main Body */}
      <main className="flex-1 py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Overview Metrics Card */}
              <ProgramOverviewCard program={program} />

              {/* Curriculum Modules Accordion */}
              <CurriculumAccordion curriculum={curriculum} title={dict.curriculumHeading} />

              {/* Career Opportunities Grid */}
              <CareerProspectsGrid
                careerOutcomes={careerOutcomes}
                title={dict.careerHeading}
              />
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Quick Admission Apply Card */}
              <div className="bg-[#172D50] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0096DB]/20 text-[#0096DB] border border-[#0096DB]/30">
                  {program.duration} • {program.degree === "master" ? "Magistratura" : "Bakalavriat"}
                </span>

                <h3 className="text-xl font-bold leading-tight">
                  Ushbu yo&apos;nalishga hoziroq hujjat topshiring
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  2026/2027 o&apos;quv yili uchun qabul komissiyasi arizalarni qabul qilmoqda. Onlayn ariza topshiring va talaba bo&apos;ling.
                </p>

                <Button
                  onClick={() => setAdmissionModalOpen(true)}
                  className="w-full bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-[#0096DB]/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{dict.applyNow}</span>
                </Button>
              </div>

              {/* Faculty Credentials Card */}
              {accreditationHighlights && accreditationHighlights.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-[#0096DB]" />
                    <span>Xalqaro Hamkorlik & Akkreditatsiya</span>
                  </div>

                  <div className="space-y-3">
                    {accreditationHighlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <strong className="text-xs font-bold text-slate-900 block">
                          {item.title}
                        </strong>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#172D50]">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>2+2 va 3+1 dual diplom dasturlari</span>
                  </div>
                </div>
              )}

              {/* Back to Directory Link */}
              <Link
                href="/programs"
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Barcha Ta&apos;lim Yo&apos;nalishlariga Qaytish</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </aside>
          </div>
        </Container>
      </main>

      <Footer currentLocale={locale} />
      <FloatingContact />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        initialFaculty={targetFacultyName}
      />
    </div>
  );
}
