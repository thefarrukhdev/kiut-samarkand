"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  UserCheck,
  Award,
  GraduationCap,
  CheckCircle2,
  Phone,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { FaqSection } from "@/components/home/FaqSection";
import { Container } from "@/components/ui/container";
import { useTranslation, useLocale } from "@/lib/i18n";

export default function AdmissionPage() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation("admission");

  const scrollToForm = React.useCallback(() => {
    document.getElementById("admission-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const breadcrumbHome = locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Bosh sahifa";
  const breadcrumbAdmission = locale === "ru" ? "Прием 2026/2027" : locale === "en" ? "Admissions 2026/2027" : "Qabul 2026/2027";

  const steps = [
    {
      num: "01",
      icon: FileText,
      title: locale === "ru" ? "Подача онлайн-заявки" : locale === "en" ? "Online Application" : "Onlayn ariza topshirish",
      desc:
        locale === "ru"
          ? "Заполните простую онлайн-форму, выберите факультет, направление и форму обучения (дневная, заочная, вечерняя)."
          : locale === "en"
          ? "Complete our streamlined online form, select your preferred faculty, academic discipline, and study format."
          : "Rasmiy sayt orqali o'zingiz qiziqqan yo'nalish, ta'lim shakli (kunduzgi, sirtqi, kechki) va tilini tanlab onlayn ariza qoldiring.",
    },
    {
      num: "02",
      icon: UserCheck,
      title: locale === "ru" ? "Предоставление документов" : locale === "en" ? "Document Submission" : "Hujjatlarni taqdim etish",
      desc:
        locale === "ru"
          ? "Предоставьте паспорт (ID-карту), аттестат или диплом, фото 3х4 и при наличии международные языковые сертификаты."
          : locale === "en"
          ? "Submit your identification card/passport, secondary school diploma, 3x4 photos, and language proficiency certificates."
          : "Pasport (ID-karta), maktab shahodatnomasi yoki kollej/litsey diplomi, 3x4 rasm hamda til sertifikatlarini taqdim eting.",
    },
    {
      num: "03",
      icon: Award,
      title: locale === "ru" ? "Вступительные испытания" : locale === "en" ? "Entrance Examinations" : "Kirish sinovlari va Imtiyozlar",
      desc:
        locale === "ru"
          ? "Сдайте предметный тест или пройдите собеседование. Сертификаты IELTS 5.5+, CEFR B2+, TOPIK 3+ дают 100% максимальный балл."
          : locale === "en"
          ? "Sit for subject examinations or admissions interview. Valid IELTS 5.5+, CEFR B2+, TOPIK 3+ grant automatic full scores."
          : "Mutaxassislik fanlari bo'yicha test sinovi yoki suhbatdan o'ting. IELTS 5.5+, CEFR B2+, TOPIK 3+ egalari chet tilidan maksimal ball oladi.",
    },
    {
      num: "04",
      icon: GraduationCap,
      title: locale === "ru" ? "Заключение договора и зачисление" : locale === "en" ? "Contract & Enrollment" : "Shartnoma va Talabalik",
      desc:
        locale === "ru"
          ? "Оформите официальный договор на обучение. Доступна оплата в рассрочку в 4 этапа в течение учебного года."
          : locale === "en"
          ? "Finalize your educational contract. Flexible quarterly installment plans available across 4 equal disbursements."
          : "Rasmiy shartnomani imzolang va o'quv yillik to'lovni 4 qismga bo'lib to'lash imkoniyati bilan talabalar safiga qabul qilining.",
    },
  ];

  const requiredDocuments = [
    locale === "ru" ? "Паспорт или ID-карта (оригинал и копия)" : locale === "en" ? "National ID Card or Passport (original & copy)" : "Pasport yoki ID-karta (asli va nusxasi)",
    locale === "ru" ? "Аттестат о среднем образовании или диплом колледжа/лицея с вкладышем" : locale === "en" ? "Secondary school certificate or college diploma with transcript" : "O'rta ma'lumot to'g'risidagi attestat yoki litsey/kollej diplomi ilovasi bilan",
    locale === "ru" ? "6 цветных фотографий формата 3х4 см" : locale === "en" ? "6 passport-sized color photographs (3x4 cm)" : "6 dona rangli fotosurat (3x4 sm)",
    locale === "ru" ? "Языковые сертификаты IELTS, CEFR, TOPIK (при наличии для освобождения от экзамена)" : locale === "en" ? "Language certificates (IELTS, CEFR, TOPIK) for automatic exemption" : "Til sertifikatlari: IELTS 5.5+, CEFR B2+, TOPIK 3+ (mavjud bo'lsa)",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopBar />
      <Navbar
        onLocaleChange={(newLocale) => setLocale(newLocale)}
        onOpenAdmissionModal={scrollToForm}
      />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <section className="bg-white border-b border-slate-200 py-3.5">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-primary transition-colors">
                {breadcrumbHome}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-primary font-bold">{breadcrumbAdmission}</span>
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
                <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-8">
                  {t.titleHighlight}
                </span>
                {t.titleEnd}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {t.description}
              </p>

              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <a
                  href="#admission-form"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
                >
                  <span>{locale === "ru" ? "Заполнить анкету" : locale === "en" ? "Fill Application Form" : "Arizani to'ldirish"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+998557024040"
                  className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-accent text-primary px-5 py-3.5 rounded-xl text-sm font-bold transition-all shadow-xs"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+998 (55) 702-40-40</span>
                </a>
              </div>
            </div>

            {/* Quick Fast Facts Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">{t.hotlineHours}</span>
                  <span className="text-sm font-bold text-primary block mt-0.5">
                    {locale === "ru" ? "Пн – Сб: 09:00 – 18:00" : locale === "en" ? "Mon – Sat: 09:00 – 18:00" : "Dush – Shanba: 09:00 – 18:00"}
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-ice-blue text-primary flex items-center justify-center shrink-0">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">
                    {locale === "ru" ? "Оплата обучения" : locale === "en" ? "Tuition Payments" : "Kontrakt to'lovi"}
                  </span>
                  <span className="text-sm font-bold text-primary block mt-0.5">
                    {locale === "ru" ? "4 равные части (рассрочка)" : locale === "en" ? "4 quarterly installments" : "4 qismga bo'lib to'lash"}
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">
                    {locale === "ru" ? "Аккредитация" : locale === "en" ? "Accreditation" : "Litsenziya"}
                  </span>
                  <span className="text-sm font-bold text-primary block mt-0.5">
                    {locale === "ru" ? "Гослицензия № 039281" : locale === "en" ? "State License № 039281" : "№ 039281 Davlat Litsenziyasi"}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4 Steps to Enroll */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-accent block mb-2">
                {locale === "ru" ? "Пошаговый процесс поступления" : locale === "en" ? "Application Roadmap" : "Qabul Bosqichlari"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-primary tracking-tight">
                {locale === "ru"
                  ? "Как поступить в ТМУК Самарканд за 4 простых шага?"
                  : locale === "en"
                  ? "How to Enroll in 4 Straightforward Steps"
                  : "Qanday Qilib 4 Qadamda Talaba Bo'lish Mumkin?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="relative bg-surface p-6 rounded-2xl border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-accent">{step.num}</span>
                        <div className="h-10 w-10 rounded-xl bg-white text-primary flex items-center justify-center border border-slate-200">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-primary mb-2 leading-snug">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Required Documents Section */}
        <section className="py-16 sm:py-20 bg-surface border-b border-slate-200">
          <Container>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-primary">
                  {locale === "ru"
                    ? "Необходимые документы для поступления"
                    : locale === "en"
                    ? "Documents Required for Admission"
                    : "Qabul Uchun Kerakli Hujjatlar Ro'yxati"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                {locale === "ru"
                  ? "Для подачи документов в Самаркандский филиал ТМУК подготовьте следующий базовый пакет документов:"
                  : locale === "en"
                  ? "Prepare the following documentation portfolio to initiate your application at KIUT Samarkand:"
                  : "Samarqand filialiga hujjat topshirish uchun quyidagi hujjatlar to'plamini tayyorlab qabul komissiyasiga taqdim etishingiz kerak:"}
              </p>

              <div className="space-y-3">
                {requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface border border-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Lead Generation Form Section */}
        <section id="admission-form">
          <AdmissionCTA />
        </section>

        {/* FAQ Section */}
        <FaqSection />
      </main>

      <Footer />
      <FloatingContact onOpenAdmissionModal={scrollToForm} />
    </div>
  );
}
