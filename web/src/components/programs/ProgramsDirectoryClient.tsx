"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgramCard } from "./ProgramCard";
import { ProgramsFilterBar } from "./ProgramsFilterBar";
import { useLocale } from "@/lib/i18n";
import { getProgramsDictionary } from "@/lib/i18n/programs-dictionary";
import { PROGRAMS_DATA } from "@/data/programs";
import { resolveFacultyName } from "@/lib/admissions";
import type { ProgramItem } from "@/types";

function ProgramsDirectoryContent() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const dict = React.useMemo(() => getProgramsDictionary(locale), [locale]);

  const urlFaculty = searchParams.get("faculty");
  const urlDegree = searchParams.get("degree");
  const urlFormat = searchParams.get("format");

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [userFaculty, setUserFaculty] = React.useState<string | null>(null);
  const [userDegree, setUserDegree] = React.useState<string | null>(null);
  const [userFormat, setUserFormat] = React.useState<string | null>(null);

  const selectedFaculty = userFaculty ?? (urlFaculty || "all");
  const selectedDegree = userDegree ?? (urlDegree || "all");
  const selectedFormat = userFormat ?? (urlFormat || "all");

  // Modal State
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [targetFaculty, setTargetFaculty] = React.useState<string>("Tibbiyot fakulteti");

  const programs = React.useMemo<ProgramItem[]>(() => {
    return PROGRAMS_DATA[locale] || PROGRAMS_DATA.uz;
  }, [locale]);

  // Unique Faculties list
  const facultiesList = React.useMemo(() => {
    const map = new Map<string, string>();
    programs.forEach((p) => {
      if (!map.has(p.facultyId)) {
        map.set(p.facultyId, p.facultyName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [programs]);

  // Degrees list
  const degreesList = [
    { id: "all", label: "Barcha bosqichlar" },
    { id: "bachelor", label: "Bakalavriat (4-5 yil)" },
    { id: "master", label: "Magistratura (1.5-2 yil)" },
  ];

  // Formats list
  const formatsList = [
    { id: "all", label: "Barcha shakllar" },
    { id: "day", label: "Kunduzgi ta'lim" },
    { id: "evening", label: "Kechki ta'lim" },
    { id: "distance", label: "Masofaviy ta'lim" },
  ];

  // Filter Logic
  const filteredPrograms = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return programs.filter((p) => {
      if (selectedFaculty !== "all" && p.facultyId !== selectedFaculty) return false;
      if (selectedDegree !== "all" && p.degree !== selectedDegree) return false;
      if (selectedFormat !== "all" && !p.modes.includes(selectedFormat as "day" | "evening" | "distance")) return false;

      if (q) {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const careerMatch = p.career.toLowerCase().includes(q);
        const facultyMatch = p.facultyName.toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !careerMatch && !facultyMatch) return false;
      }

      return true;
    });
  }, [programs, searchQuery, selectedFaculty, selectedDegree, selectedFormat]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedFaculty !== "all" ||
    selectedDegree !== "all" ||
    selectedFormat !== "all";

  const resetAllFilters = () => {
    setSearchQuery("");
    setUserFaculty("all");
    setUserDegree("all");
    setUserFormat("all");
  };

  const handleApplyClick = (facName: string) => {
    const standardName = resolveFacultyName(facName, "uz");
    setTargetFaculty(standardName);
    setAdmissionModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Hero Header */}
      <PageHeader
        badge={dict.heroBadge}
        title={dict.heroTitle}
        description={dict.heroDescription}
        breadcrumbs={[
          { label: dict.breadcrumbHome, href: "/" },
          { label: dict.breadcrumbPrograms },
        ]}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-10 lg:py-14">
        <Container className="space-y-8">
          {/* Filter Bar Component */}
          <ProgramsFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFaculty={selectedFaculty}
            onFacultyChange={setUserFaculty}
            selectedDegree={selectedDegree}
            onDegreeChange={setUserDegree}
            selectedFormat={selectedFormat}
            onFormatChange={setUserFormat}
            faculties={facultiesList}
            degrees={degreesList}
            formats={formatsList}
            hasActiveFilters={hasActiveFilters}
            onReset={resetAllFilters}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Jami topilgan ta&apos;lim yo&apos;nalishlari:{" "}
              <strong className="text-slate-900 font-bold">{filteredPrograms.length} ta</strong>
            </span>
            {hasActiveFilters && (
              <span className="text-[#0096DB] font-medium">Filtrlar qo&apos;llangan</span>
            )}
          </div>

          {/* Programs Grid */}
          {filteredPrograms.length === 0 ? (
            <EmptyState
              title={dict.emptyTitle}
              description={dict.emptyDescription}
              action={
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-[#172D50] text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  {dict.resetFilters}
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  viewDetailsLabel={dict.viewDetails}
                  applyLabel={dict.applyNow}
                  onApply={handleApplyClick}
                />
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer currentLocale={locale} />
      <FloatingContact />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        initialFaculty={targetFaculty}
      />
    </div>
  );
}

export function ProgramsDirectoryClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0096DB]" />
        </div>
      }
    >
      <ProgramsDirectoryContent />
    </Suspense>
  );
}
