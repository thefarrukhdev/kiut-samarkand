"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Globe2,
  Award,
  ArrowRight,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { translations } from "@/lib/translations";
import type { Locale } from "@/types";

interface AboutSectionProps {
  currentLocale?: Locale;
}

const pillarIcons = [
  { icon: Globe2, accent: "text-[#0096DB]", bg: "bg-[#E9F2FF]" },
  { icon: ShieldCheck, accent: "text-[#2364AD]", bg: "bg-[#E3EDFC]" },
  { icon: Award, accent: "text-[#0096DB]", bg: "bg-[#E9F2FF]" },
  { icon: Building2, accent: "text-[#172D50]", bg: "bg-[#E3EDFC]" },
];

export function AboutSection({ currentLocale = "uz" }: AboutSectionProps) {
  const t = translations[currentLocale].about;

  const partners = [
    { name: "Asiana Airlines", logo: "/assets/icons_and_logos/asiana_airlines-logo-font.png" },
    { name: "Oxbridge International", logo: "/assets/icons_and_logos/oxbridge_logo.png" },
  ];

  return (
    <section
      id="about"
      aria-label="Universitet haqida ma'lumot"
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Visual Campus Collage (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main large image */}
              <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg"
                  alt="KIUT Samarkand Kampus Hayoti"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172D50]/90 via-[#172D50]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#172D50] shadow-sm mb-2">
                    {t.imageBadge}
                  </span>
                  <p className="text-base sm:text-lg font-bold leading-snug">
                    {t.imageCaption}
                  </p>
                </div>
              </div>

              {/* Overlapping secondary floating card */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-64 bg-white p-4 rounded-2xl shadow-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-[#E9F2FF] text-[#0096DB] flex items-center justify-center shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-[#172D50]">{t.employmentRate}</span>
                    <p className="text-[11px] text-[#334155] leading-tight font-medium">
                      {t.employmentDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0096DB] mb-3">
                <span className="w-6 h-px bg-[#0096DB]"></span>
                <span>{t.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172D50] tracking-tight leading-tight">
                {t.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {t.pillars.map((pillar, i) => {
                const meta = pillarIcons[i] || pillarIcons[0];
                const Icon = meta.icon;
                return (
                  <div
                    key={`${pillar.title}-${currentLocale}`}
                    className="p-4 rounded-2xl bg-[#F4F7FC] border border-[#E2E8F0] flex flex-col justify-between hover:bg-white hover:border-[#0096DB]/40 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className={`h-10 w-10 rounded-xl ${meta.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`h-5 w-5 ${meta.accent}`} />
                      </div>
                      <h3 className="text-sm font-bold text-[#172D50] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#334155] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Partners Strip */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.partnersLabel}
                </span>
                <div className="flex items-center gap-4">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="relative h-7 w-20 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                      title={partner.name}
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#schools"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0096DB] hover:text-[#007BB3] transition-colors"
              >
                <span>{t.viewAllCta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
