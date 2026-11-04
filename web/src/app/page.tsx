"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StatsCounter } from "@/components/home/StatsCounter";
import { SchoolsGrid } from "@/components/home/SchoolsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsSection } from "@/components/home/NewsSection";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { Footer } from "@/components/layout/Footer";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
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

  const handleOpenAdmissionModal = (facultyName?: string) => {
    if (facultyName) {
      setSelectedFaculty(resolveFacultyName(facultyName, currentLocale));
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
      {/* 1. Global TopBar */}
      <TopBar
        currentLocale={currentLocale}
      />

      {/* 2. Sticky Glassmorphic Navbar with multi-language indicator */}
      <Navbar
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        onOpenAdmissionModal={() => handleOpenAdmissionModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Slider */}
        <HeroSlider
          currentLocale={currentLocale}
          onOpenAdmissionModal={() => handleOpenAdmissionModal()}
        />

        {/* 4. Animated Stats Counter */}
        <StatsCounter
          currentLocale={currentLocale}
        />

        {/* 5. 5 Main Schools & 48+ Programs Grid */}
        <SchoolsGrid
          currentLocale={currentLocale}
          onSelectFacultyForAdmission={handleSelectFacultyForAdmission}
        />

        {/* 6. University About & Accreditation Section */}
        <AboutSection
          currentLocale={currentLocale}
        />

        {/* 7. Latest University News Section */}
        <NewsSection
          currentLocale={currentLocale}
        />

        {/* 8. Conversion-focused Admission CTA & Lead Form */}
        <AdmissionCTA
          currentLocale={currentLocale}
          initialFaculty={selectedFaculty}
        />
      </main>

      {/* 9. Institutional Global Footer (with id="contact") */}
      <Footer
        currentLocale={currentLocale}
      />

      {/* 10. Interactive Global Admission Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        defaultFaculty={selectedFaculty}
        currentLocale={currentLocale}
      />
    </div>
  );
}
