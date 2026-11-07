import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, FileCheck2 } from "lucide-react";

interface AboutLicenseCardProps {
  licenseTitle?: string;
  licenseSubtitle?: string;
  features: string[];
}

export function AboutLicenseCard({
  licenseTitle = "Davlat Litsenziyasi va Rasmiy Huquqiy Maqom",
  licenseSubtitle = "Toshkent Kimyo xalqaro universiteti Samarqand filiali O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan berilgan № 039281-sonli rasmiy davlat litsenziyasiga ega.",
  features,
}: AboutLicenseCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Rasmiy Huquqiy Kafolat
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172D50] tracking-tight leading-tight">
              {licenseTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              {licenseSubtitle}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Seal & Visual Document */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 sm:p-8 rounded-3xl border border-blue-100 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-md border border-slate-200 flex items-center justify-center">
            <Image
              src="/assets/icons_and_logos/logo.f177ff7dfd83.png"
              alt="KIUT Gerb"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-[#0096DB] uppercase tracking-wider block">
              Litsenziya № 039281
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Oliy Ta&apos;lim Vazirligi Tomonidan Tasdiqlangan
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Universitet diplomi barcha davlat muassasalari va xorijiy OTMlar tomonidan so&apos;zsiz tan olinadi.
            </p>
          </div>

          <div className="w-full pt-2 border-t border-slate-200/60 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Davlat standarti bo&apos;yicha diplom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
