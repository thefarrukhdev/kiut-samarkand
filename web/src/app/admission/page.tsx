"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { AdmissionSteps } from "@/components/admission/AdmissionSteps";
import { AdmissionRequirements } from "@/components/admission/AdmissionRequirements";
import { AdmissionDirectForm } from "@/components/admission/AdmissionDirectForm";
import { useLocale } from "@/lib/i18n";

export default function AdmissionPage() {
  const { locale } = useLocale();
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const breadcrumbs = [
    { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa", href: "/" },
    { label: locale === "ru" ? "Прием 2026/2027" : locale === "en" ? "Admissions 2026/2027" : "Qabul 2026/2027" },
  ];

  const pageTitle =
    locale === "ru"
      ? "Прием на 2026/2027 учебный год"
      : locale === "en"
      ? "Admissions for 2026/2027 Academic Year"
      : "2026/2027 O'quv Yili Uchun Qabul";

  const pageDesc =
    locale === "ru"
      ? "Подайте заявку в Самаркандский филиал ТМУК онлайн. Современное образование международного уровня."
      : locale === "en"
      ? "Apply to KIUT Samarkand online today. Modern international higher education."
      : "Toshkent Kimyo xalqaro universiteti Samarqand filiali talabasi bo'lish uchun onlayn ariza topshiring.";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge="Qabul Komissiyasi"
        title={pageTitle}
        description={pageDesc}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-16">
        <Container className="space-y-12">
          {/* Steps */}
          <AdmissionSteps />

          {/* Form and Requirements Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <AdmissionDirectForm />
            </div>
            <div className="lg:col-span-6">
              <AdmissionRequirements />
            </div>
          </div>
        </Container>
      </main>

      <Footer currentLocale={locale} />
      <FloatingContact />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />
    </div>
  );
}
