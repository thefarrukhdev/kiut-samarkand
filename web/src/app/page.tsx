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
import type { Locale } from "@/types";

export default function Home() {
  const [currentLocale, setCurrentLocale] = React.useState<Locale>("uz");
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);
  const [selectedFaculty, setSelectedFaculty] = React.useState<string>("Tibbiyot fakulteti");

  const handleLocaleChange = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    setSelectedFaculty((prev) => resolveFacultyName(prev, newLocale));
  };

  const handleOpenAdmissionModal = (facultyOrProgramName?: string) => {
    if (facultyOrProgramName) {
      setSelectedFaculty(resolveFacultyName(facultyOrProgramName, currentLocale));
    }
    setAdmissionModalOpen(true);
  };

  const handleSelectFacultyForAdmission = (facultyName: string) => {
    setSelectedFaculty(resolveFacultyName(facultyName, currentLocale));
    const admissionSection = document.getElementById("admission");
    if (admissionSection) {
      admissionSection.scrollIntoView({ behavior: "smooth" });
    } else {
      setAdmissionModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FC]">
      {/* 1. Global Academic TopBar */}
      <TopBar currentLocale={currentLocale} />

      {/* 2. Institutional Solid Navbar */}
      <Navbar
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        onOpenAdmissionModal={() => handleOpenAdmissionModal()}
      />

      {/* Main Content Area: Elite University Portal Architecture */}
      <main className="flex-1">
        {/* 3. Hero Slider with Academic Eyebrow, Dual CTAs & Visual Showcase */}
        <HeroSlider
          currentLocale={currentLocale}
          onOpenAdmissionModal={() => handleOpenAdmissionModal()}
        />

        {/* 4. Animated Verified Stats Counter */}
        <StatsCounter currentLocale={currentLocale} />

        {/* 5. Complete Searchable 46+ Academic Degrees Directory */}
        <ProgramFinder
          currentLocale={currentLocale}
          onSelectProgramForAdmission={handleSelectFacultyForAdmission}
        />

        {/* 6. 5 Core Schools & Academic Leadership Overview */}
        <SchoolsGrid
          currentLocale={currentLocale}
          onSelectFacultyForAdmission={handleSelectFacultyForAdmission}
        />

        {/* 7. Institutional Scholarships & Tuition Grants Showcase */}
        <ScholarshipsSection
          currentLocale={currentLocale}
          onOpenAdmissionModal={(grant) => handleOpenAdmissionModal(grant)}
        />

        {/* 8. Modern Campus Infrastructure & Laboratory Clusters Tour */}
        <CampusShowcase
          currentLocale={currentLocale}
          onOpenAdmissionModal={() => handleOpenAdmissionModal()}
        />

        {/* 9. University Mission, Accreditation & Strategic Pillars */}
        <AboutSection currentLocale={currentLocale} />

        {/* 10. Official Campus News & Scientific Conferences */}
        <NewsSection currentLocale={currentLocale} />

        {/* 11. Official Abituriyent & Parent Accreditation FAQ Accordion */}
        <FaqSection
          currentLocale={currentLocale}
          onOpenAdmissionModal={() => handleOpenAdmissionModal()}
        />

        {/* 12. Conversion-Engineered Admission Lead Generation Form */}
        <AdmissionCTA
          currentLocale={currentLocale}
          initialFaculty={selectedFaculty}
        />
      </main>

      {/* 13. Institutional Global Footer with Accreditation Notice & Sitemap */}
      <Footer currentLocale={currentLocale} />

      {/* 14. Quick Action Floating Hotline & Consultation Widget */}
      <FloatingContact
        currentLocale={currentLocale}
        onOpenAdmissionModal={() => handleOpenAdmissionModal()}
      />

      {/* 15. Global Application Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty={selectedFaculty}
        currentLocale={currentLocale}
      />
    </div>
  );
}
