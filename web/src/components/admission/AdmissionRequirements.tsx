"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const REQUIREMENTS_DATA = {
  uz: {
    heading: "Talab Qilinadigan Hujjatlar Ro'yxati",
    subheading: "Hujjatlarni onlayn yoki universitet binosiga tashrif buyurib topshirishingiz mumkin",
    items: [
      "Pasport yoki ID-karta nusxasi (asli bilan birga)",
      "Umumiy o'rta ta'lim (11-sinf) shahodatnomasi yoki akademik litsey/kollej diplomi ilovasi bilan",
      "3x4 hajmdagi 6 dona rangli fotosurat",
      "Til sertifikatlari mavjud bo'lsa (IELTS, CEFR, TOPIK) — kirish imtihonlaridan imtiyoz beriladi",
      "O'qishini boshqa OTMlardan ko'chirayotganlar uchun — transkript va reyting daftarchasi nusxasi",
    ],
    footnote:
      "Barcha hujjatlar maxfiyligi kafolatlanadi va Oliy ta'lim vazirligining HEMIS tizimiga integratsiya qilinadi.",
  },
  ru: {
    heading: "Список необходимых документов",
    subheading: "Вы можете подать документы онлайн или посетив здание университета",
    items: [
      "Копия паспорта или ID-карты (вместе с оригиналом)",
      "Аттестат об общем среднем образовании (11 классов) или диплом академического лицея/колледжа с приложением",
      "6 цветных фотографий размером 3x4 см",
      "Языковые сертификаты при наличии (IELTS, CEFR, TOPIK) — дают льготы на вступительных экзаменах",
      "Для переводящихся из других вузов — копия транскрипта и зачетной книжки",
    ],
    footnote:
      "Конфиденциальность всех документов гарантируется и интегрируется в государственную систему HEMIS Министерства высшего образования.",
  },
  en: {
    heading: "List of Required Documents",
    subheading: "You can submit documents online or in person at the university admissions office",
    items: [
      "Copy of Passport or National ID card (accompanied by the original)",
      "Certificate of general secondary education (Grade 11) or Academic Lyceum/College diploma with transcript",
      "6 color photographs (3x4 cm)",
      "Language proficiency certificates if available (IELTS, CEFR, TOPIK) — grant admission exam waivers",
      "For university transfer students — official transcript and grade record copy",
    ],
    footnote:
      "Data privacy is strictly guaranteed and integrated into the Ministry of Higher Education HEMIS system.",
  },
};

export function AdmissionRequirements() {
  const { locale } = useLocale();
  const data = REQUIREMENTS_DATA[locale] || REQUIREMENTS_DATA.uz;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {data.heading}
          </h3>
          <p className="text-xs text-slate-500">
            {data.subheading}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {data.items.map((req, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              {req}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-[#0096DB] shrink-0" />
        <span>{data.footnote}</span>
      </div>
    </div>
  );
}
