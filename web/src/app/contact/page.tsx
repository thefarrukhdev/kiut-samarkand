"use client";

import * as React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactInfoGrid } from "@/components/contact/ContactInfoGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { CampusMapCard } from "@/components/contact/CampusMapCard";
import { useLocale } from "@/lib/i18n";

export default function ContactPage() {
  const { locale } = useLocale();
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const breadcrumbs = [
    { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa", href: "/" },
    { label: locale === "ru" ? "Контакты" : locale === "en" ? "Contact" : "Bog'lanish" },
  ];

  const headerTitle =
    locale === "ru"
      ? "Контакты и местоположение"
      : locale === "en"
      ? "Contact Us & Campus Location"
      : "Aloqa va Kampus Manzili";

  const headerDesc =
    locale === "ru"
      ? "Свяжитесь с приемной комиссией Самаркандского филиала ТМУК или посетите наш кампус."
      : locale === "en"
      ? "Connect with KIUT Samarkand admissions office or visit our modern academic campus."
      : "Toshkent Kimyo xalqaro universiteti Samarqand filiali qabul komissiyasi bilan bog'laning yoki kampusimizga tashrif buyuring.";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge="Biz Bilan Bog'lanish"
        title={headerTitle}
        description={headerDesc}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-16">
        <Container className="space-y-12">
          {/* Quick Contact Cards */}
          <ContactInfoGrid />

          {/* Form and Campus Map Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
            <div className="lg:col-span-7">
              <CampusMapCard />
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
