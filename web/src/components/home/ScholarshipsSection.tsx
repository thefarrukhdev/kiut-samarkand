"use client";

import * as React from "react";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

interface ScholarshipsSectionProps {
  currentLocale?: Locale;
  onOpenAdmissionModal?: (grantTitle?: string) => void;
}

export function ScholarshipsSection({
  currentLocale = "uz",
  onOpenAdmissionModal,
}: ScholarshipsSectionProps) {
  const grants = [
    {
      id: "grant-rector",
      badge: currentLocale === "ru" ? "100% Грант" : currentLocale === "en" ? "100% Grant" : "100% Grant",
      title:
        currentLocale === "ru"
          ? "Ректорский грант для одаренных студентов"
          : currentLocale === "en"
          ? "Rector's Excellence Scholarship"
          : "Iqtidorli talabalar uchun Rektorat granti",
      coverage: "100%",
      coverageLabel:
        currentLocale === "ru"
          ? "Бесплатное обучение"
          : currentLocale === "en"
          ? "Full Tuition Covered"
          : "To'liq bepul ta'lim",
      description:
        currentLocale === "ru"
          ? "Выделяется абитуриентам, набравшим наивысшие баллы на вступительных испытаниях по профильным предметам."
          : currentLocale === "en"
          ? "Awarded to top-scoring applicants in university entrance examinations across specialized academic subjects."
          : "Kirish imtihonlarida eng yuqori ball to'plagan eng iqtidorli abituriyentlar uchun universitet maxsus jamg'armasi.",
      criteria: [
        currentLocale === "ru" ? "Высший балл на экзаменах" : currentLocale === "en" ? "Top entrance exam rank" : "Kirish imtihonida 1-o'rin",
        currentLocale === "ru" ? "Подтверждение академических успехов" : currentLocale === "en" ? "Academic excellence record" : "A'lo baholar attestati",
        currentLocale === "ru" ? "Ежегодное подтверждение (GPA 4.5+)" : currentLocale === "en" ? "Yearly retention (GPA 4.5+)" : "Har yili GPA 4.5+ bilan tasdiqlash",
      ],
      highlight: true,
    },
    {
      id: "grant-language",
      badge: currentLocale === "ru" ? "Спецстипендия" : currentLocale === "en" ? "Language Award" : "Til imtiyozi",
      title:
        currentLocale === "ru"
          ? "Грант за международные языковые сертификаты"
          : currentLocale === "en"
          ? "International Language Certificate Grant"
          : "Xalqaro til sertifikatlari (IELTS / TOPIK) imtiyozi",
      coverage: "25% - 50%",
      coverageLabel:
        currentLocale === "ru"
          ? "Скидка на контракт"
          : currentLocale === "en"
          ? "Tuition Reduction"
          : "Kontrakt to'lovi chegirishi",
      description:
        currentLocale === "ru"
          ? "Скидка на оплату контракта для обладателей сертификатов IELTS 7.0+, CEFR C1 или TOPIK 4+."
          : currentLocale === "en"
          ? "Substantial fee reductions for holders of certified language scores (IELTS 7.0+, CEFR C1, TOPIK 4+)."
          : "IELTS 7.0+, CEFR C1 yoki TOPIK 4+ xalqaro darajasiga ega abituriyentlar uchun maxsus stipendiyalar va to'lov imtiyozlari.",
      criteria: [
        "IELTS 7.0+ yoki CEFR C1",
        "TOPIK 4+ (Koreys tili yo'nalishlarida)",
        currentLocale === "ru" ? "Автоматический зачет языка" : currentLocale === "en" ? "Direct language waiver" : "Til imtihonidan to'liq ozod",
      ],
      highlight: false,
    },
    {
      id: "grant-korea",
      badge: currentLocale === "ru" ? "2+2 Корея" : currentLocale === "en" ? "2+2 Korea" : "2+2 Koreya",
      title:
        currentLocale === "ru"
          ? "Стипендия партнерских вузов Южной Кореи"
          : currentLocale === "en"
          ? "South Korean Partner Universities Grant"
          : "Janubiy Koreya hamkorlik granti (2+2 va 3+1)",
      coverage: "50% - 100%",
      coverageLabel:
        currentLocale === "ru"
          ? "Обучение в Корее"
          : currentLocale === "en"
          ? "Korea Study Grant"
          : "Koreyada bepul ta'lim",
      description:
        currentLocale === "ru"
          ? "Специальные гранты от Hanyang University, Daegu University и Seokyeong University для студентов программ обмена."
          : currentLocale === "en"
          ? "Funded by South Korean university consortia for dual degree exchange students demonstrating academic leadership."
          : "Hanyang, Daegu va Seokyeong universitetlari bilan tuzilgan shartnomalarga ko'ra Koreyada ta'limni bepul davom ettirish.",
      criteria: [
        currentLocale === "ru" ? "Успешные 2 курса в Самарканде" : currentLocale === "en" ? "Completed 2 years in Samarkand" : "Samarqandda 2 yil a'lo o'qish",
        "TOPIK 4+ yoki IELTS 6.5+",
        currentLocale === "ru" ? "Два диплома (Узб + Корея)" : currentLocale === "en" ? "Double degree diploma" : "Ikkita rasmiy xalqaro diplom",
      ],
      highlight: false,
    },
    {
      id: "grant-social",
      badge: currentLocale === "ru" ? "Социальный" : currentLocale === "en" ? "Social Aid" : "Ijtimoiy jamg'arma",
      title:
        currentLocale === "ru"
          ? "Фонд социальной поддержки и одаренной молодежи"
          : currentLocale === "en"
          ? "Social Opportunity & Youth Empowerment Fund"
          : "Ijtimoiy rag'batlantirish va yoshlar jamg'armasi",
      coverage: "30% - 100%",
      coverageLabel:
        currentLocale === "ru"
          ? "Адресная помощь"
          : currentLocale === "en"
          ? "Targeted Support"
          : "Manzilli yordam",
      description:
        currentLocale === "ru"
          ? "Адресная финансовая поддержка талантливой молодежи из социально уязвимых категорий семей."
          : currentLocale === "en"
          ? "Dedicated financial aid for talented students requiring need-based social and economic assistance."
          : "Ijtimoiy himoyaga muhtoj, biroq ilmiy salohiyati va a'lo baholari bilan ajralib turgan talabalarni qo'llab-quvvatlash.",
      criteria: [
        currentLocale === "ru" ? "Социальное подтверждение" : currentLocale === "en" ? "Need verification" : "Ijtimoiy reestr hujjati",
        currentLocale === "ru" ? "Высокая успеваемость" : currentLocale === "en" ? "Strong GPA" : "A'lo o'quv ko'rsatkichi",
        currentLocale === "ru" ? "Активное участие в жизни филиала" : currentLocale === "en" ? "Campus involvement" : "Universitet jamoat hayoti",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="scholarships"
      aria-label="Universitet grantlari va stipendiyalari"
      className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200 relative z-10"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-0.5 bg-[#0096DB] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0096DB]">
                {currentLocale === "ru"
                  ? "Финансовая поддержка и гранты"
                  : currentLocale === "en"
                  ? "Scholarships & Financial Aid"
                  : "Grantlar va Stipendiyalar Dasturi"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172D50] tracking-tight">
              {currentLocale === "ru"
                ? "500+ ежегодных внутренних грантов для лучших"
                : currentLocale === "en"
                ? "500+ Annual Institutional Grants for Top Students"
                : "Har yili 500 dan ortiq ichki grantlar va stipendiyalar"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            {currentLocale === "ru"
              ? "Toshkent Kimyo xalqaro universiteti Samarqand filiali iqtidorli talabalarni har tomonlama qo'llab-quvvatlaydi."
              : currentLocale === "en"
              ? "KIUT Samarkand rewards academic merit, international certificates, and global exchange participation."
              : "Iqtidorli, bilimli va til sertifikatlariga ega abituriyentlar uchun to'liq yoki qisman bepul ta'lim olish imkoniyati."}
          </p>
        </div>

        {/* 4 Grant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {grants.map((grant) => (
            <div
              key={grant.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                grant.highlight
                  ? "bg-white border-[#0096DB] shadow-lg ring-1 ring-[#0096DB]/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      grant.highlight
                        ? "bg-[#0096DB] text-white"
                        : "bg-[#E9F2FF] text-[#0096DB]"
                    }`}
                  >
                    {grant.badge}
                  </span>
                  <Award className="h-5 w-5 text-[#0096DB]" />
                </div>

                {/* Big Coverage Number */}
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#172D50] tracking-tight">
                    {grant.coverage}
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {grant.coverageLabel}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-[#172D50] leading-snug">
                    {grant.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {grant.description}
                  </p>
                </div>

                {/* Criteria Checklist */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {currentLocale === "ru" ? "Критерии:" : currentLocale === "en" ? "Eligibility:" : "Asosiy talablar:"}
                  </span>
                  {grant.criteria.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Button
                  onClick={() => onOpenAdmissionModal?.(grant.title)}
                  variant={grant.highlight ? "action" : "outline"}
                  size="sm"
                  className={`w-full text-xs font-bold py-2.5 rounded-xl ${
                    grant.highlight
                      ? "bg-[#0096DB] hover:bg-[#007BB3] text-white shadow-sm"
                      : "border-slate-300 hover:border-slate-400 text-[#172D50]"
                  }`}
                >
                  <span>
                    {currentLocale === "ru"
                      ? "Подать на грант"
                      : currentLocale === "en"
                      ? "Apply for Grant"
                      : "Grantga ariza topshirish"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Stat Callout Footer Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#172D50] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#0096DB] flex items-center justify-center shrink-0">
              <BadgeCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                {currentLocale === "ru"
                  ? "Прозрачные и открытые условия грантовых конкурсов"
                  : currentLocale === "en"
                  ? "Transparent & Fair Merit-Based Scholarships"
                  : "Shaffof va adolatli grant saralash imtihonlari"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {currentLocale === "ru"
                  ? "Все гранты распределяются на основе открытых тестовых испытаний под контролем комиссии."
                  : currentLocale === "en"
                  ? "Grants are allocated via documented standardized testing with external academic supervision."
                  : "Grantlar ochiq imtihon natijalari asosida shaffof komissiya nazorati ostida taqsimlanadi."}
              </p>
            </div>
          </div>

          <Button
            onClick={() => onOpenAdmissionModal?.("Grant dasturlari")}
            variant="action"
            size="default"
            className="bg-[#0096DB] hover:bg-[#007BB3] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl whitespace-nowrap shadow-md shrink-0"
          >
            <span>
              {currentLocale === "ru"
                ? "Узнать о грантах подробнее"
                : currentLocale === "en"
                ? "Learn More About Aid"
                : "Grantlar nizomini o'rganish"}
            </span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
