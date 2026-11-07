import React from "react";
import { CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

export function AdmissionRequirements() {
  const requirements = [
    "Pasport yoki ID-karta nusxasi (asli bilan birga)",
    "Umumiy o'rta ta'lim (11-sinf) shahodatnomasi yoki akademik litsey/kollej diplomi ilovasi bilan",
    "3x4 hajmdagi 6 dona rangli fotosurat",
    "Til sertifikatlari mavjud bo'lsa (IELTS, CEFR, TOPIK) — kirish imtihonlaridan imtiyoz beriladi",
    "O'qishini boshqa OTMlardan ko'chirayotganlar uchun — transkript va reyting daftarchasi nusxasi",
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Talab Qilinadigan Hujjatlar Ro&apos;yxati
          </h3>
          <p className="text-xs text-slate-500">
            Hujjatlarni onlayn yoki universitet binosiga tashrif buyurib topshirishingiz mumkin
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {requirements.map((req, idx) => (
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
        <span>
          Barcha hujjatlar maxfiyligi kafolatlanadi va Oliy ta&apos;lim vazirligining HEMIS tizimiga integratsiya qilinadi.
        </span>
      </div>
    </div>
  );
}
