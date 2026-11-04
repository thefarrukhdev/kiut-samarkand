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
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import type { Locale } from "@/types";

interface AboutSectionProps {
  currentLocale?: Locale;
}

const pillarIcons = [
  { icon: Globe2, accent: "text-accent", bg: "bg-accent-light" },
  { icon: ShieldCheck, accent: "text-primary-royal", bg: "bg-ice-blue" },
  { icon: Award, accent: "text-accent", bg: "bg-accent-light" },
  { icon: Building2, accent: "text-primary", bg: "bg-ice-blue" },
];

const partners = [
  { name: "Asiana Airlines", logo: "/assets/icons_and_logos/asiana_airlines-logo-font.png" },
  { name: "Oxbridge International", logo: "/assets/icons_and_logos/oxbridge_logo.png" },
];

export function AboutSection({ currentLocale: propLocale }: AboutSectionProps = {}) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("about");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? (translations[propLocale]?.about || contextT) : contextT;

  return (
    <section
      id="about"
      aria-label={
        currentLocale === "ru"
          ? "Информация об университете"
          : currentLocale === "en"
          ? "About the University"
          : "Universitet haqida ma'lumot"
      }
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
                  alt={
                    currentLocale === "ru"
                      ? "Студенческая жизнь и кампус ТМУК Самарканд"
                      : currentLocale === "en"
                      ? "Campus Life at KIUT Samarkand"
                      : "KIUT Samarqand Kampus Hayoti"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-primary shadow-sm mb-2">
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
                  <div className="h-12 w-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-primary">{t.employmentRate}</span>
                    <p className="text-[11px] text-slate-700 leading-tight font-medium">
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
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent mb-3">
                <span className="w-6 h-px bg-accent"></span>
                <span>{t.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                {t.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
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
                    className="p-4 rounded-2xl bg-surface border border-slate-200/90 flex flex-col justify-between hover:bg-white hover:border-accent/40 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className={`h-10 w-10 rounded-xl ${meta.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`h-5 w-5 ${meta.accent}`} />
                      </div>
                      <h3 className="text-sm font-bold text-primary mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
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
