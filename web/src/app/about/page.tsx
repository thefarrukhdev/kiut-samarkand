"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutLicenseCard } from "@/components/about/AboutLicenseCard";
import { AboutPartners } from "@/components/about/AboutPartners";
import { useTranslation, useLocale } from "@/lib/i18n";

export default function AboutPage() {
  const { locale } = useLocale();
  const { t } = useTranslation("about");
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const breadcrumbs = [
    { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa", href: "/" },
    { label: locale === "ru" ? "Об университете" : locale === "en" ? "About KIUT" : "Universitet haqida" },
  ];

  const licenseFeatures = [
    locale === "ru"
      ? "Государственная лицензия № 039281 Министерства высшего образования РУз"
      : locale === "en"
      ? "Official State License No. 039281 from the Ministry of Higher Education of Uzbekistan"
      : "O'zbekiston Respublikasi Oliy ta'lim vazirligi tomonidan berilgan № 039281-sonli rasmiy davlat litsenziyasi",
    locale === "ru"
      ? "Диплом государственного образца с полной юридической силой в Узбекистане и за рубежом"
      : locale === "en"
      ? "Accredited state diploma legally equivalent to leading public universities"
      : "Davlat oliy ta'lim muassasalari diplomi bilan teng yuridik kuchga ega rasmiy diplom",
    locale === "ru"
      ? "Программы двойного диплома 2+2 и 3+1 с вузами Южной Кореи и Европы"
      : locale === "en"
      ? "2+2 & 3+1 dual-degree articulation tracks with South Korea and Europe"
      : "Janubiy Koreya va Yevropa yetakchi universitetlari bilan 2+2 va 3+1 xalqaro dual diplom dasturlari",
    locale === "ru"
      ? "Обучение в Самарканде на узбекском, русском и английском языках"
      : locale === "en"
      ? "Multilingual instruction available in Uzbek, Russian, and English"
      : "O'zbek, rus va ingliz tillarida olib boriladigan jahon andozasidagi ta'lim",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopBar currentLocale={locale} />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge={t.badge}
        title={t.title}
        description={t.description}
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setAdmissionModalOpen(true)}
              className="bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-xs shadow-md"
            >
              {locale === "ru" ? "Подать заявку" : locale === "en" ? "Apply Online" : "Ariza topshirish"}
            </Button>
            <Link
              href="/programs"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              {locale === "ru" ? "Направления" : locale === "en" ? "Programs" : "Yo'nalishlar"}
            </Link>
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-16">
        <Container className="space-y-12">
          {/* Mission, Vision, and Values */}
          <AboutMissionVision
            mission={
              locale === "ru"
                ? "Предоставление качественного высшего образования мирового уровня для подготовки конкурентоспособных специалистов."
                : locale === "en"
                ? "Delivering world-class higher education to prepare globally competitive specialists and innovators."
                : "Hudud yoshlariga jahon andozalariga mos sifatli ta'lim berish, innovatsion fikrlovchi va raqobatbardosh mutaxassislarni tayyorlash."
            }
            vision={
              locale === "ru"
                ? "Стать ведущим инновационным и международным университетским центром в Центральной Азии."
                : locale === "en"
                ? "To become a premier international and innovative university hub in Central Asia."
                : "Markaziy Osiyoda xalqaro e'tirofga ega bo'lgan yetakchi innovatsion universitet kampusiga aylanish."
            }
            values={
              locale === "ru"
                ? "Академическая честность, практическая направленность, глобальное сотрудничество и непрерывное развитие."
                : locale === "en"
                ? "Academic integrity, practical orientation, international collaboration, and continuous excellence."
                : "Akademik halollik, amaliyotga yo'naltirilganlik, xalqaro integratsiya va uzluksiz rivojlanish."
            }
            missionTitle={
              locale === "ru"
                ? "Миссия университета"
                : locale === "en"
                ? "Our Mission"
                : "Universitet Missiyasi"
            }
            visionTitle={
              locale === "ru"
                ? "Стратегическое видение"
                : locale === "en"
                ? "Strategic Vision"
                : "Strategik Maqsad"
            }
            valuesTitle={
              locale === "ru"
                ? "Фундаментальные ценности"
                : locale === "en"
                ? "Core Values"
                : "Asosiy Qadriyatlar"
            }
          />

          {/* Official License & Accreditation */}
          <AboutLicenseCard features={licenseFeatures} />

          {/* International Partners */}
          <AboutPartners />

          {/* Bottom Admission CTA Banner */}
          <div className="bg-[#172D50] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0096DB]">
                Kelajagingizni biz bilan quring
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                KIUT Samarqand filiali talabasi bo&apos;ling
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                2026/2027 o&apos;quv yili uchun qabul jarayonlari davom etmoqda. Onlayn ariza topshiring.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                size="lg"
                onClick={() => setAdmissionModalOpen(true)}
                className="bg-[#0096DB] hover:bg-[#0085c4] text-white font-bold text-sm shadow-lg shadow-[#0096DB]/25"
              >
                {locale === "ru" ? "Подать заявку" : locale === "en" ? "Apply Online" : "Ariza topshirish"}
              </Button>
              <Link
                href="/programs"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center gap-1.5"
              >
                <span>Yo&apos;nalishlar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
