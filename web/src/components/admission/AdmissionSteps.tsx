"use client";

import React from "react";
import { FileText, UploadCloud, CheckCircle2, UserCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const STEPS_DATA = {
  uz: {
    badge: "Oddiy va Shaffof Bosqichlar",
    heading: "Qabul Jarayoni Qanday Amalga Oshiriladi?",
    steps: [
      {
        num: "01",
        title: "Onlayn Ariza Topshirish",
        desc: "Sayt orqali anketani to'ldiring va tanlagan ta'lim yo'nalishingizni belgilang.",
        icon: FileText,
      },
      {
        num: "02",
        title: "Hujjatlarni Taqdim Etish",
        desc: "Pasport (ID-karta), umumiy o'rta ta'lim diplomi/shahodatnomasi va fotosuratlarni topshiring.",
        icon: UploadCloud,
      },
      {
        num: "03",
        title: "Imtihon yoki Suhbat",
        desc: "Belgilangan sanada mutaxassislik fanlari bo'yicha kirish imtihonida ishtirok eting (yoki sertifikat taqdim eting).",
        icon: UserCheck,
      },
      {
        num: "04",
        title: "Shartnoma va Talabalik",
        desc: "Muvaffaqiyatli o'tgan abituriyentlar bilan rasmiy shartnoma tuziladi va talabalik safiga qabul qilinadi.",
        icon: CheckCircle2,
      },
    ],
  },
  ru: {
    badge: "Простые и прозрачные этапы",
    heading: "Как проходит процесс поступления?",
    steps: [
      {
        num: "01",
        title: "Подача онлайн-заявки",
        desc: "Заполните анкету на сайте и выберите желаемое направление обучения.",
        icon: FileText,
      },
      {
        num: "02",
        title: "Предоставление документов",
        desc: "Предоставьте паспорт (ID-карту), аттестат о среднем образовании или диплом колледжа/лицея и фотографии.",
        icon: UploadCloud,
      },
      {
        num: "03",
        title: "Экзамен или собеседование",
        desc: "Пройдите вступительный экзамен по профильным предметам в назначенную дату (или предоставьте сертификат).",
        icon: UserCheck,
      },
      {
        num: "04",
        title: "Договор и зачисление",
        desc: "С успешно прошедшими абитуриентами заключается официальный договор и издается приказ о зачислении.",
        icon: CheckCircle2,
      },
    ],
  },
  en: {
    badge: "Simple & Transparent Steps",
    heading: "How Does the Admissions Process Work?",
    steps: [
      {
        num: "01",
        title: "Submit Online Application",
        desc: "Fill out the online application form and specify your chosen academic program.",
        icon: FileText,
      },
      {
        num: "02",
        title: "Document Submission",
        desc: "Submit your passport (ID card), high school diploma or college certificate with transcript, and photos.",
        icon: UploadCloud,
      },
      {
        num: "03",
        title: "Exam or Interview",
        desc: "Take the entrance exam in relevant subjects on the designated date (or present recognized proficiency certificates).",
        icon: UserCheck,
      },
      {
        num: "04",
        title: "Contract & Enrollment",
        desc: "Successful applicants sign the official study contract and are formally matriculated into the university.",
        icon: CheckCircle2,
      },
    ],
  },
};

export function AdmissionSteps() {
  const { locale } = useLocale();
  const data = STEPS_DATA[locale] || STEPS_DATA.uz;

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0096DB]">
          {data.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172D50] tracking-tight">
          {data.heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {data.steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-[#0096DB]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0096DB] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
