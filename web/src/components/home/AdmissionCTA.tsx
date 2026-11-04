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
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";
import { translations } from "@/lib/translations";
import {
  FACULTIES_BY_LOCALE,
  DEGREE_OPTIONS_BY_LOCALE,
  STUDY_TYPE_OPTIONS_BY_LOCALE,
  LANGUAGE_OPTIONS_BY_LOCALE,
  resolveFacultyName,
} from "@/lib/admissions";
import type { Locale } from "@/types";

interface AdmissionCTAProps {
  currentLocale?: Locale;
  initialFaculty?: string;
}

const benefitIcons = [ShieldCheck, Award, Building, GraduationCap];

export function AdmissionCTA({
  currentLocale = "uz",
  initialFaculty = "",
}: AdmissionCTAProps) {
  const t = translations[currentLocale].admission;

  const facultyOptions = FACULTIES_BY_LOCALE[currentLocale];
  const degreeOptions = DEGREE_OPTIONS_BY_LOCALE[currentLocale];
  const studyTypeOptions = STUDY_TYPE_OPTIONS_BY_LOCALE[currentLocale];
  const languageOptions = LANGUAGE_OPTIONS_BY_LOCALE[currentLocale];

  const resolvedFaculty = React.useMemo(() => {
    return resolveFacultyName(initialFaculty, currentLocale);
  }, [initialFaculty, currentLocale]);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("+998 ");
  const [faculty, setFaculty] = React.useState(resolvedFaculty);
  const [prevResolvedFaculty, setPrevResolvedFaculty] = React.useState(resolvedFaculty);
  const [degree, setDegree] = React.useState(degreeOptions[0].value);
  const [language, setLanguage] = React.useState(languageOptions[0].value);
  const [studyType, setStudyType] = React.useState(studyTypeOptions[0].value);

  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [confirmationId, setConfirmationId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Sync if resolved faculty changes externally or by locale change
  if (resolvedFaculty !== prevResolvedFaculty) {
    setPrevResolvedFaculty(resolvedFaculty);
    setFaculty(resolvedFaculty);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage(
        currentLocale === "ru"
          ? "Пожалуйста, введите полное Ф.И.О. (минимум 3 символа)."
          : currentLocale === "en"
          ? "Please enter your full name (at least 3 characters)."
          : "Iltimos, to'liq ism-familiyangizni kiriting (kamida 3 belgi)."
      );
      return;
    }

    if (!isUzbekPhoneValid(phone)) {
      setErrorMessage(
        currentLocale === "ru"
          ? "Пожалуйста, введите корректный номер телефона Узбекистана (+998 XX XXX-XX-XX)."
          : currentLocale === "en"
          ? "Please enter a valid Uzbekistan phone number (+998 XX XXX-XX-XX)."
          : "Iltimos, to'liq telefon raqamingizni kiriting (+998 XX XXX-XX-XX)."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          selectedFaculty: faculty,
          degree,
          language,
          studyType,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Arizani yuborishda xatolik yuz berdi.");
        setLoading(false);
        return;
      }

      setConfirmationId(data.confirmationId);
      setLoading(false);
      setSubmitted(true);
    } catch {
      setErrorMessage(
        currentLocale === "ru"
          ? "Ошибка сетевого соединения. Пожалуйста, проверьте интернет."
          : currentLocale === "en"
          ? "Network connection error. Please verify your connection."
          : "Tarmoq bilan aloqa uzildi. Iltimos, qayta urinib ko'ring."
      );
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setPhone("+998 ");
    setSubmitted(false);
    setErrorMessage("");
    setFaculty(resolvedFaculty);
    setDegree(degreeOptions[0].value);
    setLanguage(languageOptions[0].value);
    setStudyType(studyTypeOptions[0].value);
  };

  return (
    <section
      id="admission"
      aria-label="Qabul 2026/2027 arizasi"
      className="py-16 sm:py-24 bg-[#172D50] text-white relative overflow-hidden border-t border-white/10"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Institutional Value Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0096DB]">
                <span className="w-6 h-px bg-[#0096DB]"></span>
                <span>{t.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                {t.title}{" "}
                <span className="text-[#0096DB]">
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
                    className="p-4 rounded-2xl bg-[#1E3A66] border border-white/15 flex items-start gap-3.5 hover:bg-[#234275] transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-[#0096DB]/20 text-[#0096DB] shrink-0 mt-0.5">
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
                <div className="h-10 w-10 rounded-xl bg-[#0096DB]/20 text-[#0096DB] flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block">{t.hotlineLabel}</span>
                  <a
                    href="tel:+998557024040"
                    className="text-lg font-extrabold text-white hover:text-[#0096DB] transition-colors"
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
                      <h3 className="text-2xl font-black text-[#172D50]">
                        {t.formTitle}
                      </h3>
                      <p className="text-xs text-[#334155] mt-1">
                        {t.formSubtitle}
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                        {t.fullNameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.fullNamePlaceholder}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-sm font-medium transition-all outline-none text-[#172D50]"
                      />
                    </div>

                    {/* Phone Number with strict Uzbek format */}
                    <div>
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                        {t.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-sm font-semibold tracking-wide transition-all outline-none text-[#172D50]"
                      />
                    </div>

                    {/* Faculty Select */}
                    <div>
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                        {t.facultyLabel}
                      </label>
                      <select
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-sm font-medium transition-all outline-none bg-white cursor-pointer text-[#172D50]"
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
                        <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                          {t.degreeLabel}
                        </label>
                        <select
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-xs font-semibold outline-none bg-white cursor-pointer text-[#172D50]"
                        >
                          {degreeOptions.map((d) => (
                            <option key={d.value} value={d.value}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                          {t.studyTypeLabel}
                        </label>
                        <select
                          value={studyType}
                          onChange={(e) => setStudyType(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-xs font-semibold outline-none bg-white cursor-pointer text-[#172D50]"
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
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1.5">
                        {t.languageLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {languageOptions.map((l) => (
                          <button
                            type="button"
                            key={l.value}
                            onClick={() => setLanguage(l.value)}
                            className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              language === l.value
                                ? "bg-[#172D50] text-white border-[#172D50]"
                                : "bg-[#F4F7FC] text-[#334155] border-slate-200 hover:border-slate-300 hover:text-[#172D50]"
                            }`}
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
                        className="w-full font-bold shadow-lg shadow-[#0096DB]/30 text-base"
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
                      <h3 className="text-2xl font-bold text-[#172D50]">
                        {t.successGreeting} {fullName}!
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-sm mx-auto">
                        <strong>{faculty}</strong> ({degree}, {studyType}) {t.successMessage}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F7FC] text-xs text-left space-y-1.5 border border-slate-200/80">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.idLabel}</span>
                        <span className="font-mono font-bold text-[#172D50]">
                          #{confirmationId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.phoneResultLabel}</span>
                        <span className="font-semibold text-[#172D50]">{phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.languageResultLabel}</span>
                        <span className="font-semibold text-[#172D50]">{language}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleReset}
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
