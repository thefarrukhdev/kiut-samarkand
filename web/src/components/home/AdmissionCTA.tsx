"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  Award,
  GraduationCap,
  Building,
  Send,
  Loader2,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import { useAdmissionLeadForm } from "@/lib/admissions";
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
  const t = propLocale ? (translations[propLocale]?.admission || contextT) : contextT;

  const {
    fullName,
    setFullName,
    phone,
    faculty,
    setFaculty,
    degree,
    setDegree,
    language,
    setLanguage,
    studyType,
    setStudyType,
    loading,
    submitted,
    confirmationId,
    errorMessage,
    facultyOptions,
    degreeOptions,
    studyTypeOptions,
    languageOptions,
    handlePhoneChange,
    handleSubmit,
    resetForm,
  } = useAdmissionLeadForm({
    currentLocale,
    initialFaculty,
    defaultStudyType: "Kunduzgi",
  });

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

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {t.benefits.map((benefit, i) => {
                const Icon = benefitIcons[i] || ShieldCheck;
                return (
                  <div
                    key={`${benefit.title}-${currentLocale}`}
                    className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-accent/20 text-accent shrink-0 mt-0.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-snug">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct hotline contact pill */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
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
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="border-b border-slate-100 pb-4">
                      <Badge variant="accent" className="mb-2 text-xs font-bold">
                        {t.formBadge}
                      </Badge>
                      <h3 className="text-2xl font-black text-primary">
                        {t.formTitle}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {t.formSubtitle}
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200" role="alert">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label htmlFor="cta-fullname" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {t.fullNameLabel}
                      </label>
                      <input
                        id="cta-fullname"
                        type="text"
                        required
                        placeholder={t.fullNamePlaceholder}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 text-sm font-medium transition-all outline-none text-primary"
                      />
                    </div>

                    {/* Phone Number with strict Uzbek format */}
                    <div>
                      <label htmlFor="cta-phone" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {t.phoneLabel}
                      </label>
                      <input
                        id="cta-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 text-sm font-semibold tracking-wide transition-all outline-none text-primary"
                      />
                    </div>

                    {/* Faculty Select */}
                    <div>
                      <label htmlFor="cta-faculty" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {t.facultyLabel}
                      </label>
                      <select
                        id="cta-faculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 text-sm font-medium transition-all outline-none bg-white cursor-pointer text-primary"
                      >
                        {facultyOptions.map((f) => (
                          <option key={f.id} value={f.name}>
                            {f.name} ({f.sublabel})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Degree & Study Type in row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="cta-degree" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                          {t.degreeLabel}
                        </label>
                        <select
                          id="cta-degree"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs font-semibold outline-none bg-white cursor-pointer text-primary"
                        >
                          {degreeOptions.map((d) => (
                            <option key={d.value} value={d.value}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="cta-studytype" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                          {t.studyTypeLabel}
                        </label>
                        <select
                          id="cta-studytype"
                          value={studyType}
                          onChange={(e) => setStudyType(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 text-xs font-semibold outline-none bg-white cursor-pointer text-primary"
                        >
                          {studyTypeOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Language Choice */}
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        {t.languageLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-2" role="group" aria-label={t.languageLabel}>
                        {languageOptions.map((l) => (
                          <button
                            type="button"
                            key={l.value}
                            onClick={() => setLanguage(l.value)}
                            className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              language === l.value
                                ? "bg-primary text-white border-primary"
                                : "bg-surface text-slate-600 border-slate-200 hover:border-slate-300 hover:text-primary"
                            }`}
                            aria-pressed={language === l.value}
                          >
                            {l.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="action"
                        size="lg"
                        className="w-full font-bold shadow-lg shadow-accent/30 text-base"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>{t.submittingButton}</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>{t.submitButton}</span>
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 leading-snug">
                      {t.consentText}
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <FileCheck className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <Badge variant="success" className="text-xs">
                        {t.successBadge}
                      </Badge>
                      <h3 className="text-2xl font-bold text-primary">
                        {t.successGreeting} {fullName}!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                        <strong>{faculty}</strong> ({degree}, {studyType}) {t.successMessage}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface text-xs text-left space-y-1.5 border border-slate-200/80">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.idLabel}</span>
                        <span className="font-mono font-bold text-primary">
                          #{confirmationId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.phoneResultLabel}</span>
                        <span className="font-semibold text-primary">{phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.languageResultLabel}</span>
                        <span className="font-semibold text-primary">{language}</span>
                      </div>
                    </div>

                    <Button
                      onClick={resetForm}
                      variant="secondary"
                      size="default"
                      className="w-full text-xs font-bold border-slate-200"
                    >
                      {t.resetButton}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
