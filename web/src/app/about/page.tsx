"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Building2,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Globe2,
  ChevronRight,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionModal } from "@/components/shared/AdmissionModal";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslation, useLocale } from "@/lib/i18n";

export default function AboutPage() {
  const { locale } = useLocale();
  const { t } = useTranslation("about");
  const [admissionModalOpen, setAdmissionModalOpen] = React.useState(false);

  const breadcrumbHome = locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa";
  const breadcrumbAbout = locale === "ru" ? "Об университете" : locale === "en" ? "About KIUT" : "Universitet haqida";

  const partners = [
    { name: "Asiana Airlines", logo: "/assets/icons_and_logos/asiana_airlines-logo-font.png" },
    { name: "Oxbridge International", logo: "/assets/icons_and_logos/oxbridge_logo.png" },
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
    <div className="flex flex-col min-h-screen bg-surface">
      <TopBar />
      <Navbar onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <section className="bg-white border-b border-slate-200 py-3.5">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary transition-colors">
                {breadcrumbHome}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-primary font-bold">{breadcrumbAbout}</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-surface border-b border-slate-200">
          <Container>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <span className="w-6 h-0.5 bg-accent rounded-full" />
                <span>{t.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-primary tracking-tight leading-[1.15]">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {t.description}
              </p>

              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <Button
                  onClick={() => setAdmissionModalOpen(true)}
                  variant="action"
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white font-bold rounded-xl px-6 py-3 shadow-md"
                >
                  <span>{locale === "ru" ? "Подать заявку" : locale === "en" ? "Apply Online" : "Qabulga ariza topshirish"}</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-primary text-primary px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-xs"
                >
                  <span>{locale === "ru" ? "Все направления" : locale === "en" ? "Academic Programs" : "Barcha yo'nalishlar"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-primary block">№ 039281</span>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {locale === "ru" ? "Государственная лицензия" : locale === "en" ? "Official State License" : "Davlat litsenziyasi"}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-accent block">{t.employmentRate}</span>
                <span className="text-xs text-slate-500 font-medium mt-1 block">{t.employmentDesc}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-primary block">48+</span>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {locale === "ru" ? "Программ бакалавриата" : locale === "en" ? "Bachelor Degrees" : "Bakalavriat dasturi"}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-2xl sm:text-3xl font-black text-primary block">5,000+</span>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {locale === "ru" ? "Студентов филиала" : locale === "en" ? "Enrolled Students" : "Faol talabalar"}
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* State License & Legal Validity Section */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-2">
                    <FileCheck2 className="h-4 w-4" />
                    <span>
                      {locale === "ru"
                        ? "Юридический статус и лицензирование"
                        : locale === "en"
                        ? "Legal Status & Accreditation"
                        : "Yuridik Maqom va Litsenziya"}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight">
                    {locale === "ru"
                      ? "Диплом государственного образца и 100% законное признание"
                      : locale === "en"
                      ? "State-Accredited Degree with Complete Legal Validity"
                      : "Davlat Namunasi va Diplomning 100% Qonuniy Kuchi"}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                    {locale === "ru"
                      ? "Ташкентский международный университет Кимё (ранее Технический институт Ёджу в Ташкенте) Самаркандский филиал действует на основании государственной лицензии, выданной Министерством высшего образования, науки и инноваций РУз. Выпускники получают законные дипломы государственного образца."
                      : locale === "en"
                      ? "Kimyo International University in Tashkent Samarkand branch operates strictly under official license issued by the Ministry of Higher Education, Science and Innovation of the Republic of Uzbekistan. Degrees hold equal legal authority to state university qualifications."
                      : "Toshkent Kimyo xalqaro universiteti Samarqand filiali O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan berilgan № 039281-sonli rasmiy davlat litsenziyasi asosida faoliyat yuritadi. Bitiruvchilar oladigan diplom davlat OTMlari diplomi bilan teng huquqiy kuchga ega."}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {licenseFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-[16/11]">
                  <Image
                    src="/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg"
                    alt="KIUT Samarkand Campus"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-primary shadow-sm mb-2">
                      {t.imageBadge}
                    </span>
                    <p className="text-base sm:text-lg font-bold leading-snug">{t.imageCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4 Strategic Pillars */}
        <section className="py-16 sm:py-20 bg-surface border-b border-slate-200">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-accent block mb-2">
                {locale === "ru" ? "Наши ключевые преимущества" : locale === "en" ? "Strategic Pillars" : "Strategik Ustunlarimiz"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-primary tracking-tight">
                {locale === "ru"
                  ? "Почему выбирают ТМУК Самарканд?"
                  : locale === "en"
                  ? "Why Choose KIUT Samarkand?"
                  : "Nima Uchun Aynan KIUT Samarqand?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-4">
                    {i === 0 && <Globe2 className="h-6 w-6" />}
                    {i === 1 && <ShieldCheck className="h-6 w-6" />}
                    {i === 2 && <Award className="h-6 w-6" />}
                    {i === 3 && <Building2 className="h-6 w-6" />}
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 leading-snug">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Strategic Partners Strip */}
            <div className="mt-14 pt-8 border-t border-slate-200 flex items-center justify-between flex-wrap gap-6 bg-white p-6 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.partnersLabel}
                </span>
                <p className="text-xs text-slate-600">
                  {locale === "ru"
                    ? "Ведущие международные авиалинии и образовательные центры"
                    : locale === "en"
                    ? "Leading international airlines and academic consortiums"
                    : "Xalqaro aviakompaniyalar va ilg'or ta'lim korporatsiyalari"}
                </p>
              </div>
              <div className="flex items-center gap-6">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="relative h-8 w-24 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                    title={partner.name}
                  >
                    <Image src={partner.logo} alt={partner.name} fill sizes="96px" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Director's Greeting & Leadership */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <Container>
            <div className="max-w-4xl mx-auto bg-surface rounded-3xl border border-slate-200 p-8 sm:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shrink-0 shadow-lg text-center p-3">
                  <GraduationCap className="h-10 w-10 text-accent mb-1" />
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    {locale === "ru" ? "ТМУК Самарканд" : locale === "en" ? "KIUT Samarkand" : "TKXU Samarqand"}
                  </span>
                </div>
                <div className="space-y-3 text-center md:text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-accent">
                    {locale === "ru" ? "Обращение директора филиала" : locale === "en" ? "Director's Address" : "Filial Direktori Murojaati"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-primary">
                    Prof. Nizamjon Ishonkulov
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {locale === "ru"
                      ? "«Наша главная цель — сделать образование в Самарканде синонимом мирового качества. Мы создаем условия, при которых каждый студент с первого курса получает реальные практические навыки, работает в лабораториях и выходит на рынок труда востребованным лидером.»"
                      : locale === "en"
                      ? "“Our primary mission in Samarkand is to make higher education synonymous with global excellence. We cultivate an environment where students gain hands-on clinical and engineering mastery from semester one, emerging as leaders in the international workforce.”"
                      : "“Samarqand filialidagi asosiy maqsadimiz — xalqaro andozalardagi ta'limni har bir talabaga yetkazishdir. Biz talabaning birinchi bosqichdanoq amaliy laboratoriyalarda ishlashini, zamonaviy kasb sirlarini xorijiy mutaxassislardan o'rganishini va mehnat bozoriga yetuk mutaxassis bo'lib kirib borishini ta'minlaymiz.”"}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingContact onOpenAdmissionModal={() => setAdmissionModalOpen(true)} />
      <AdmissionModal isOpen={admissionModalOpen} onClose={() => setAdmissionModalOpen(false)} />
    </div>
  );
}
