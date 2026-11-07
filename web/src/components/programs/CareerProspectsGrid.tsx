import React from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface CareerProspectsGridProps {
  careerOutcomes: string[];
  title?: string;
}

export function CareerProspectsGrid({
  careerOutcomes,
  title = "Karyera va Kelajak Istiqbollari",
}: CareerProspectsGridProps) {
  if (!careerOutcomes || careerOutcomes.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096DB] flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">
            Bitiruvchilar egallaydigan lavozimlar va ish beruvchi sohalar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {careerOutcomes.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-white hover:border-[#0096DB]/30 transition-all"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
