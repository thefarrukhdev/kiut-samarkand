import React from "react";
import Image from "next/image";

interface PartnerItem {
  name: string;
  logo: string;
}

interface AboutPartnersProps {
  title?: string;
  subtitle?: string;
  partners?: PartnerItem[];
}

export function AboutPartners({
  title = "Xalqaro Hamkorlar va Ish Beruvchilar",
  subtitle = "Talabalarimiz nufuzli xorijiy aviakompaniyalar, xalqaro korporatsiyalar va yetakchi klinikalarda amaliyot o'tashadi.",
  partners = [
    { name: "Asiana Airlines", logo: "/assets/icons_and_logos/asiana_airlines-logo-font.png" },
    { name: "Oxbridge International", logo: "/assets/icons_and_logos/oxbridge_logo.png" },
  ],
}: AboutPartnersProps) {
  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2">
        {partners.map((p) => (
          <div
            key={p.name}
            className="h-16 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center grayscale hover:grayscale-0 hover:border-[#0096DB]/40 transition-all"
          >
            <div className="relative h-8 w-32">
              <Image
                src={p.logo}
                alt={p.name}
                fill
                className="object-contain"
                sizes="150px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
