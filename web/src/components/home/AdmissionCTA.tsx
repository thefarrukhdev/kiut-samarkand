"use client";

import * as React from "react";
import {
  Phone,
  ShieldCheck,
  Award,
  GraduationCap,
  Building,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { AdmissionLeadForm } from "@/components/shared/AdmissionLeadForm";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import type { Locale } from "@/types";

interface AdmissionCTAProps {
  currentLocale?: Locale;
  initialFaculty?: string;
}

const benefitIcons = [ShieldCheck, Award, Building, GraduationCap];

export function AdmissionCTA({
  currentLocale: propLocale,
  initialFaculty = "",
}: AdmissionCTAProps = {}) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("admission");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? translations[propLocale]?.admission || contextT : contextT;

  return (
    <section
      id="admission"
      aria-label={
        currentLocale === "ru"
          ? "Подача онлайн-заявки на прием 2026/2027"
          : currentLocale === "en"
          ? "Admissions 2026/2027 Online Application"
          : "Qabul 2026/2027 arizasi"
      }
      className="py-16 sm:py-24 bg-primary text-white relative overflow-hidden border-t border-white/10"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Institutional Value Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <span className="w-6 h-px bg-accent"></span>
                <span>{t.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                {t.title}{" "}
                <span className="text-accent">
                  {t.titleHighlight}
                </span>{" "}
                {t.titleEnd}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {t.description}
              </p>
            </div>

            {/* 4 Pillars Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {t.benefits.map((benefit, idx) => {
                const IconComponent = benefitIcons[idx % benefitIcons.length];
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-accent text-primary shrink-0 font-bold">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hotline & Contact Strip */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/20 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block">{t.hotlineLabel}</span>
                  <a
                    href="tel:+998557024040"
                    className="text-lg font-extrabold text-white hover:text-accent transition-colors"
                  >
                    +998 (55) 702-40-40
                  </a>
                </div>
              </div>
              <span className="text-xs text-slate-300 font-medium bg-white/10 px-3 py-1.5 rounded-lg text-center">
                {t.hotlineHours}
              </span>
            </div>
          </div>

          {/* Right Column: Lead Capture Form Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200 relative">
              <AdmissionLeadForm
                currentLocale={currentLocale}
                initialFaculty={initialFaculty}
                variant="light"
                showTitles={true}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
