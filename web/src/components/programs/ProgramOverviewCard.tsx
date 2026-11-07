import React from "react";
import { Clock, Globe2, Award, BookOpen, Banknote, ShieldCheck } from "lucide-react";
import type { ProgramItem } from "@/types";

interface ProgramOverviewCardProps {
  program: ProgramItem;
  details?: {
    ectsCredits?: number;
    tuition?: {
      uzbekCitizen?: string;
    };
  };
}

export function ProgramOverviewCard({ program, details }: ProgramOverviewCardProps) {
  const items = [
    {
      label: "Ta'lim Bosqichi",
      value: program.degree === "master" ? "Magistratura" : "Bakalavriat",
      icon: Award,
    },
    {
      label: "O'qish Muddati",
      value: program.duration,
      icon: Clock,
    },
    {
      label: "Ta'lim Tili",
      value: program.languages.join(", "),
      icon: Globe2,
    },
    {
      label: "Kredit Tizimi",
      value: details?.ectsCredits ? `${details.ectsCredits} ECTS` : "240 ECTS",
      icon: BookOpen,
    },
    {
      label: "Shartnoma Narxi",
      value: details?.tuition?.uzbekCitizen || "Yillik to'lov mavjud",
      icon: Banknote,
    },
    {
      label: "Diplom & Akreditatsiya",
      value: "Davlat diplomi + Xalqaro akkreditatsiya",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-6">
        Dastur Asosiy Parametrlari
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096DB] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-slate-800 block mt-0.5">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
