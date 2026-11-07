"use client";

import * as React from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import { useAdmissionLeadForm } from "@/lib/admissions";
import type { Locale } from "@/types";

export interface AdmissionLeadFormProps {
  currentLocale?: Locale;
  initialFaculty?: string;
  defaultStudyType?: string;
  variant?: "light" | "dark";
  showTitles?: boolean;
  className?: string;
  onSuccess?: (confirmationId: string) => void;
}

export function AdmissionLeadForm({
  currentLocale: propLocale,
  initialFaculty = "",
  defaultStudyType = "Kunduzgi",
  variant = "light",
  showTitles = false,
  className = "",
  onSuccess,
}: AdmissionLeadFormProps) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("admission");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? translations[propLocale]?.admission || contextT : contextT;

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
    defaultStudyType,
  });

  React.useEffect(() => {
    if (submitted && confirmationId && onSuccess) {
      onSuccess(confirmationId);
    }
  }, [submitted, confirmationId, onSuccess]);

  const isDark = variant === "dark";

  const inputClasses = isDark
    ? "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
    : "w-full rounded-xl bg-surface border border-slate-200/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  const selectClasses = isDark
    ? "w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer"
    : "w-full rounded-xl bg-surface border border-slate-200/80 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer";

  const labelClasses = isDark
    ? "block text-xs font-semibold text-slate-300 mb-1.5"
    : "block text-xs font-semibold text-slate-700 mb-1.5";

  if (submitted && confirmationId) {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl ${isDark ? "bg-white/5 border border-white/10" : "bg-emerald-50 border border-emerald-200"} text-center space-y-4 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-emerald-950"}`}>
            {t.successGreeting}
          </h3>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-300" : "text-emerald-700"}`}>
            {t.successMessage}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-sm inline-block">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider mb-1">
            {t.idLabel}
          </span>
          <span className="font-mono text-2xl font-black text-emerald-800 tracking-wider">
            {confirmationId}
          </span>
        </div>

        <div>
          <Button
            type="button"
            onClick={resetForm}
            variant={isDark ? "outline" : "secondary"}
            size="sm"
            className="mt-2"
          >
            {t.resetButton}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {showTitles && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FileCheck className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {t.badge}
            </span>
          </div>
          <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {t.formTitle}
          </h3>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t.formSubtitle}
          </p>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor={`form-fullname-${variant}`} className={labelClasses}>
            {t.fullNameLabel} <span className="text-rose-400">*</span>
          </label>
          <input
            id={`form-fullname-${variant}`}
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t.fullNamePlaceholder}
            className={inputClasses}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`form-phone-${variant}`} className={labelClasses}>
            {t.phoneLabel} <span className="text-rose-400">*</span>
          </label>
          <input
            id={`form-phone-${variant}`}
            type="tel"
            required
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+998 (90) 123-45-67"
            className={inputClasses}
          />
        </div>

        {/* Faculty Select */}
        <div>
          <label htmlFor={`form-faculty-${variant}`} className={labelClasses}>
            {t.facultyLabel} <span className="text-rose-400">*</span>
          </label>
          <select
            id={`form-faculty-${variant}`}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className={selectClasses}
          >
            {facultyOptions.map((opt) => (
              <option key={opt.id} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Degree & Study Type Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`form-degree-${variant}`} className={labelClasses}>
              {t.degreeLabel}
            </label>
            <select
              id={`form-degree-${variant}`}
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className={selectClasses}
            >
              {degreeOptions.map((deg) => (
                <option key={deg.value} value={deg.value}>
                  {deg.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`form-studytype-${variant}`} className={labelClasses}>
              {t.studyTypeLabel || "Ta'lim shakli"}
            </label>
            <select
              id={`form-studytype-${variant}`}
              value={studyType}
              onChange={(e) => setStudyType(e.target.value)}
              className={selectClasses}
            >
              {studyTypeOptions.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language of Instruction */}
        <div>
          <label htmlFor={`form-lang-${variant}`} className={labelClasses}>
            {t.languageLabel}
          </label>
          <select
            id={`form-lang-${variant}`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={selectClasses}
          >
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          variant="action"
          size="lg"
          className="w-full font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.submittingButton}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t.submitButton}</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
