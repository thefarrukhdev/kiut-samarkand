"use client";

import React from "react";
import { CheckCircle2, BookOpen } from "lucide-react";

interface CurriculumAccordionProps {
  curriculum: string[];
  title?: string;
}

export function CurriculumAccordion({
  curriculum,
  title = "O'quv Rejasi va Fanlar Dasturi",
}: CurriculumAccordionProps) {
  if (!curriculum || curriculum.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0096DB] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-500">
              Asosiy fanlar, klinik/muhandislik amaliyoti va ixtisoslik modullari
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
          {curriculum.length} ta fan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {curriculum.map((subject, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-3 hover:bg-white hover:border-[#0096DB]/30 transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-[#172D50] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div className="flex-1">
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                {subject}
              </span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
