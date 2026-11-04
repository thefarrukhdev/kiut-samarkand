"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";
import { translations } from "@/lib/translations";
import {
  FACULTIES_BY_LOCALE,
  DEGREE_OPTIONS_BY_LOCALE,
  LANGUAGE_OPTIONS_BY_LOCALE,
  resolveFacultyName,
} from "@/lib/admissions";
import type { Locale } from "@/types";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFaculty?: string;
  currentLocale?: Locale;
}

export function AdmissionModal({
  isOpen,
  onClose,
  defaultFaculty = "Tibbiyot fakulteti",
  currentLocale = "uz",
}: AdmissionModalProps) {
  const t = translations[currentLocale].admission;

  const facultyOptions = FACULTIES_BY_LOCALE[currentLocale];
  const degreeOptions = DEGREE_OPTIONS_BY_LOCALE[currentLocale];
  const languageOptions = LANGUAGE_OPTIONS_BY_LOCALE[currentLocale];

  const resolvedFaculty = React.useMemo(() => {
    return resolveFacultyName(defaultFaculty, currentLocale);
  }, [defaultFaculty, currentLocale]);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("+998 ");
  const [faculty, setFaculty] = React.useState(resolvedFaculty);
  const [prevResolvedFaculty, setPrevResolvedFaculty] = React.useState(resolvedFaculty);
  const [degree, setDegree] = React.useState(degreeOptions[0].value);
  const [language, setLanguage] = React.useState(languageOptions[0].value);

  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [confirmationId, setConfirmationId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  if (resolvedFaculty !== prevResolvedFaculty) {
    setPrevResolvedFaculty(resolvedFaculty);
    setFaculty(resolvedFaculty);
  }

  const handleModalClose = React.useCallback(() => {
    onClose();
    // Reset state after animation finishes so re-opening starts clean
    setTimeout(() => {
      setSubmitted(false);
      setFullName("");
      setPhone("+998 ");
      setErrorMessage("");
      setFaculty(resolvedFaculty);
      setDegree(degreeOptions[0].value);
      setLanguage(languageOptions[0].value);
    }, 250);
  }, [onClose, resolvedFaculty, degreeOptions, languageOptions]);

  // Lock body scroll and listen for Escape key when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleModalClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, handleModalClose]);

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
          studyType: "Kunduzgi",
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
          ? "Ошибка сети. Пожалуйста, попробуйте еще раз."
          : currentLocale === "en"
          ? "Network error. Please try again."
          : "Tarmoq bilan aloqa uzildi. Iltimos, qayta urinib ko'ring."
      );
      setLoading(false);
    }
  };

  const closeButtonLabel =
    currentLocale === "ru" ? "Закрыть" : currentLocale === "en" ? "Close" : "Yopish";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admission-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-slate-950/75"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={handleModalClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={closeButtonLabel}
            >
              <X className="h-5 w-5" />
            </button>

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
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0096DB] mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0096DB]" />
                      <span>{t.badge}</span>
                    </div>
                    <h3 id="admission-modal-title" className="text-2xl font-black text-[#172D50]">
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

                  <div>
                    <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1">
                      {t.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-sm outline-none text-[#172D50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0096DB] focus:ring-2 focus:ring-[#0096DB]/20 text-sm font-semibold outline-none text-[#172D50]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1">
                      {t.facultyLabel}
                    </label>
                    <select
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0096DB] text-xs font-medium outline-none bg-white cursor-pointer text-[#172D50]"
                    >
                      {facultyOptions.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.name} ({f.sublabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1">
                        {t.degreeLabel}
                      </label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none bg-white cursor-pointer text-[#172D50]"
                      >
                        {degreeOptions.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#172D50] uppercase tracking-wider mb-1">
                        {t.languageLabel}
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none bg-white cursor-pointer text-[#172D50]"
                      >
                        {languageOptions.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="action"
                      size="lg"
                      className="w-full font-bold shadow-lg shadow-[#0096DB]/30"
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
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="h-14 w-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FileCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#172D50]">
                    {t.successBadge}
                  </h3>
                  <p className="text-xs text-[#334155] max-w-sm mx-auto leading-relaxed">
                    {t.successGreeting} <strong>{fullName}</strong>!{" "}
                    <strong>{faculty}</strong> ({degree}) {t.successMessage}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F7FC] border border-slate-200/80 text-xs font-mono font-bold text-[#172D50]">
                    <span className="text-slate-400 font-sans">{t.idLabel}</span>
                    <span>#{confirmationId}</span>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={handleModalClose}
                      variant="royal"
                      size="default"
                      className="w-full font-bold shadow-sm"
                    >
                      {closeButtonLabel}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
