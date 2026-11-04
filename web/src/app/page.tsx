"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ProgramFinder } from "@/components/home/ProgramFinder";
import { SchoolsGrid } from "@/components/home/SchoolsGrid";
import { ScholarshipsSection } from "@/components/home/ScholarshipsSection";
import { CampusShowcase } from "@/components/home/CampusShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsSection } from "@/components/home/NewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { Footer } from "@/components/layout/Footer";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { resolveFacultyName } from "@/lib/admissions";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/types";

export default function Home() {
  const { locale: currentLocale, setLocale } = useLocale();
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [selectedFaculty, setSelectedFaculty] = React.useState<string>("Tibbiyot fakulteti");

  const handleLocaleChange = React.useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
      setSelectedFaculty((prev) => resolveFacultyName(prev, newLocale));
    },
    [setLocale]
  );

  const handleOpenAdmissionModal = React.useCallback(
    (facultyOrProgramName?: string) => {
      if (facultyOrProgramName) {
        setSelectedFaculty(resolveFacultyName(facultyOrProgramName, currentLocale));
      }
      setAdmissionModalOpen(true);
    },
    [currentLocale]
  );

  const handleCloseAdmissionModal = React.useCallback(() => {
    setAdmissionModalOpen(false);
  }, []);

  const handleSelectFacultyForAdmission = React.useCallback(
    (facultyName: string) => {
      setSelectedFaculty(resolveFacultyName(facultyName, currentLocale));
      const admissionSection = document.getElementById("admission");
      if (admissionSection) {
        admissionSection.scrollIntoView({ behavior: "smooth" });
      } else {
        setAdmissionModalOpen(true);
      }
    },
    [currentLocale]
  );

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 1. Global Academic TopBar */}
      <TopBar />

      {/* 2. Institutional Solid Navbar */}
      <Navbar
        onLocaleChange={handleLocaleChange}
        onOpenAdmissionModal={handleOpenAdmissionModal}
      />

      {/* Main Content Area: Elite University Portal Architecture */}
      <main className="flex-1">
        {/* 3. Hero Slider with Academic Eyebrow, Dual CTAs & Visual Showcase */}
        <HeroSlider onOpenAdmissionModal={handleOpenAdmissionModal} />

        {/* 4. Animated Verified Stats Counter */}
        <StatsCounter />

        {/* 5. Complete Searchable 46+ Academic Degrees Directory */}
        <ProgramFinder
          onSelectProgramForAdmission={handleSelectFacultyForAdmission}
        />

        {/* 6. 5 Core Schools & Academic Leadership Overview */}
        <SchoolsGrid
          onSelectFacultyForAdmission={handleSelectFacultyForAdmission}
        />

        {/* 7. Institutional Scholarships & Tuition Grants Showcase */}
        <ScholarshipsSection
          onOpenAdmissionModal={handleOpenAdmissionModal}
        />

        {/* 8. Modern Campus Infrastructure & Laboratory Clusters Tour */}
        <CampusShowcase
          onOpenAdmissionModal={handleOpenAdmissionModal}
        />

        {/* 9. University Mission, Accreditation & Strategic Pillars */}
        <AboutSection />

        {/* 10. Official Campus News & Scientific Conferences */}
        <NewsSection />

        {/* 11. Official Abituriyent & Parent Accreditation FAQ Accordion */}
        <FaqSection onOpenAdmissionModal={handleOpenAdmissionModal} />

        {/* 12. Conversion-Engineered Admission Lead Generation Form */}
        <AdmissionCTA initialFaculty={selectedFaculty} />
      </main>

      {/* 13. Institutional Global Footer with Accreditation Notice & Sitemap */}
      <Footer />

      {/* 14. Quick Action Floating Hotline & Consultation Widget */}
      <FloatingContact onOpenAdmissionModal={handleOpenAdmissionModal} />

      {/* 15. Global Application Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={handleCloseAdmissionModal}
        defaultFaculty={selectedFaculty}
      />
    </div>
  );
}
