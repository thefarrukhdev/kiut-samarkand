"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Locale, FaqItem } from "@/types";

interface FaqSectionProps {
  currentLocale?: Locale;
  onOpenAdmissionModal?: () => void;
}

export function FaqSection({
  currentLocale = "uz",
  onOpenAdmissionModal,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs: Record<Locale, FaqItem[]> = {
    uz: [
      {
        id: "faq-1",
        category: "diploma",
        question: "Toshkent Kimyo Xalqaro Universiteti Samarqand filiali diplomi O'zbekistonda 100% tan olinadimi?",
        answer:
          "Ha, albatta. Toshkent Kimyo xalqaro universiteti (sobiq Yeoju texnika instituti) O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan berilgan № 039281-sonli rasmiy davlat litsenziyasi asosida qonuniy faoliyat yuritadi. Bitiruvchilarga beriladigan diplom davlat oliy ta'lim muassasalari diplomi bilan teng yuridik kuchga ega bo'lib, davlat organlari va barcha xususiy tashkilotlarda to'liq tan olinadi.",
      },
      {
        id: "faq-2",
        category: "admission",
        question: "Qabul imtihonlari qanday shaklda o'tkaziladi va kimlar imtihonsiz qabul qilinadi?",
        answer:
          "Kirish imtihonlari tanlangan ta'lim yo'nalishiga qarab mutaxassislik fanlari bo'yicha test sinovlari yoki suhbat asosida o'tkaziladi. Xalqaro yoki milliy til sertifikatlariga (IELTS 5.5+, CEFR B2+, TOPIK 3+) ega bo'lgan abituriyentlar chet tili fanidan maksimal ball oladilar yoki tegishli imtihondan to'liq ozod etiladilar.",
      },
      {
        id: "faq-3",
        category: "diploma",
        question: "2+2 va 3+1 xalqaro dual diplom dasturlari qanday ishlaydi?",
        answer:
          "Ushbu dasturlar orqali talabalar dastlabki 2 yoki 3 yilni Samarqand filialida, yakuniy 1 yoki 2 yilni esa Janubiy Koreya (Hanyang University, Daegu University) yoki Yevropaning yetakchi hamkor oliygohlarida o'qiydilar. Bitirgach talabaga bir vaqtning o'zida ikkita nufuzli xalqaro diplom (TKXU va xorijiy hamkor universitet diplomi) beriladi.",
      },
      {
        id: "faq-4",
        category: "tuition",
        question: "Kontrakt to'lovini bo'lib to'lash imkoni mavjudmi?",
        answer:
          "Ha, talabalar va ularning ota-onalariga qulaylik yaratish maqsadida o'quv yillik kontrakt to'lovini 4 qismga (har bir semestrda 2 marta yoki har chorakda) bo'lib to'lash imkoniyati qonuniy shartnoma asosida kafolatlanadi.",
      },
      {
        id: "faq-5",
        category: "admission",
        question: "Sirtqi va kechki ta'lim shakllari mavjudmi va ular kimlarga mo'ljallangan?",
        answer:
          "Ha, Samarqand filialida kunduzgi, sirtqi hamda masofaviy/kechki ta'lim shakllari mavjud. Sirtqi ta'lim shakli, ayniqsa, ishlab turgan xodimlar, ikkinchi oliy ma'lumot oluvchilar va viloyatlardan keluvchi abituriyentlar uchun qulay vaqt grafiklarida tashkil etilgan.",
      },
      {
        id: "faq-6",
        category: "campus",
        question: "Universitetda viloyatlardan kelgan talabalar uchun yotoqxona bormi?",
        answer:
          "Ha, universitet Samarqand shahrida viloyat va xorijdan kelgan talabalar uchun barcha zamonaviy qulayliklarga ega, xavfsiz va shinam talabalar turar joyiga (yotoqxona) ega. Xonalar mebel, Wi-Fi, oshxona va kir yuvish majmualari bilan to'liq ta'minlangan.",
      },
    ],
    ru: [
      {
        id: "faq-1",
        category: "diploma",
        question: "Признается ли диплом Самаркандского филиала ТХТИ в Узбекистане?",
        answer:
          "Да, безусловно. Университет осуществляет деятельность на основании официальной государственной лицензии Министерства высшего образования, науки и инноваций РУз № 039281. Выдаваемый диплом государственного образца имеет полную юридическую силу на всей территории Узбекистана и за рубежом.",
      },
      {
        id: "faq-2",
        category: "admission",
        question: "Как проходят вступительные экзамены и кто освобождается от них?",
        answer:
          "Вступительные испытания проводятся в форме предметного тестирования или собеседования. Абитуриенты с сертификатами IELTS 5.5+, CEFR B2+, TOPIK 3+ получают максимальный балл по иностранному языку или освобождаются от экзамена.",
      },
      {
        id: "faq-3",
        category: "diploma",
        question: "Как работают программы двойного диплома 2+2 и 3+1?",
        answer:
          "Студенты обучаются первые 2 или 3 года в Самарканде, а заключительный этап — в партнерских университетах Южной Кореи или Европы. Выпускники получают два признанных международных диплома.",
      },
      {
        id: "faq-4",
        category: "tuition",
        question: "Возможна ли оплата контракта в рассрочку?",
        answer:
          "Да, для удобства студентов и родителей оплата за обучение может производиться 4 частями (поквартально) в течение академического года.",
      },
      {
        id: "faq-5",
        category: "admission",
        question: "Есть ли заочная и вечерняя формы обучения?",
        answer:
          "Да, филиал предлагает очную, заочную и вечернюю формы обучения, что особенно актуально для работающих специалистов и получающих второе высшее образование.",
      },
      {
        id: "faq-6",
        category: "campus",
        question: "Предоставляется ли общежитие иногородним студентам?",
        answer:
          "Да, университет располагает современным благоустроенным общежитием со всеми удобствами, круглосуточной охраной и скоростным интернетом.",
      },
    ],
    en: [
      {
        id: "faq-1",
        category: "diploma",
        question: "Is the degree from KIUT Samarkand fully accredited and legally recognized?",
        answer:
          "Yes, completely. Kimyo International University in Tashkent operates under official State License No. 039281 issued by the Ministry of Higher Education, Science and Innovations of the Republic of Uzbekistan. Degrees hold equal legal authority to state universities and are recognized internationally.",
      },
      {
        id: "faq-2",
        category: "admission",
        question: "How are entrance exams organized, and are certificate waivers available?",
        answer:
          "Entrance examinations evaluate core subjects via standardized tests or interviews. Applicants with recognized certifications (IELTS 5.5+, CEFR B2+, TOPIK 3+) are granted automatic waivers and full scores for language modules.",
      },
      {
        id: "faq-3",
        category: "diploma",
        question: "How do 2+2 and 3+1 dual-degree exchange tracks work?",
        answer:
          "Students complete initial foundational coursework in Samarkand before transferring to South Korean or European partner campuses, graduating with two globally recognized diplomas.",
      },
      {
        id: "faq-4",
        category: "tuition",
        question: "Can tuition fees be paid in installment plans?",
        answer:
          "Yes, tuition can be split into 4 equal quarterly installments across the academic year to accommodate student financial planning.",
      },
      {
        id: "faq-5",
        category: "admission",
        question: "Are part-time, distance, and evening programs available?",
        answer:
          "Yes, flexible part-time and evening programs are offered across key business, engineering, and educational curricula for working professionals.",
      },
      {
        id: "faq-6",
        category: "campus",
        question: "Is modern campus dormitory housing provided for nonlocal students?",
        answer:
          "Yes, the university provides secure, modern residential facilities in Samarkand with full furnishing, Wi-Fi, study lounges, and 24/7 security.",
      },
    ],
  };

  const list = faqs[currentLocale] || faqs.uz;

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-label="Ko'p beriladigan savollar"
      className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200 relative z-10"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Direct Hotline Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-0.5 bg-[#0096DB] rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-[#0096DB]">
                  FAQ &amp; Rasmiy Ma&apos;lumotlar
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172D50] tracking-tight">
                {currentLocale === "ru"
                  ? "Часто задаваемые вопросы абитуриентов"
                  : currentLocale === "en"
                  ? "Frequently Asked Questions"
                  : "Abituriyentlar va ota-onalar eng ko'p so'raydigan savollar"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {currentLocale === "ru"
                  ? "Все юридические, организационные и финансовые вопросы об обучении в Самаркандском филиале ТХТИ."
                  : currentLocale === "en"
                  ? "Essential answers regarding accreditation, tuition installment schedules, and admissions."
                  : "Litsenziya, diplomning qonuniy kuchi, kirish imtihonlari va kontrakt to'lovlari bo'yicha rasmiy javoblar."}
              </p>
            </div>

            {/* Need More Help Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#E9F2FF] text-[#0096DB] flex items-center justify-center shrink-0">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#172D50]">
                    {currentLocale === "ru" ? "Остались вопросы?" : currentLocale === "en" ? "Need Personalized Help?" : "Savollaringiz bormi?"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLocale === "ru" ? "Позвоните в приемную комиссию" : currentLocale === "en" ? "Talk to an admissions officer" : "Qabul komissiyasi bilan bog'laning"}
                  </p>
                </div>
              </div>

              <a
                href="tel:+998557024040"
                className="block w-full py-2.5 text-center rounded-xl bg-[#172D50] hover:bg-[#0096DB] text-white text-sm font-bold transition-colors"
              >
                +998 (55) 702-40-40
              </a>

              <Button
                onClick={() => onOpenAdmissionModal?.()}
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold border-slate-200 text-[#172D50] py-2 rounded-xl"
              >
                <span>{currentLocale === "ru" ? "Онлайн-консультация" : currentLocale === "en" ? "Online Consultation" : "Onlayn konsultatsiya olish"}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Accordion List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {list.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#172D50] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`h-7 w-7 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-slate-200 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#172D50] text-white border-[#172D50]" : "text-slate-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
