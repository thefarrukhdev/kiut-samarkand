import * as React from "react";
import { formatUzbekPhone, isUzbekPhoneValid } from "@/lib/phone";
import type { Locale } from "@/types";

export interface FacultyOption {
  id: string;
  name: string;
  sublabel: string;
}

export const FACULTIES_BY_LOCALE: Record<Locale, FacultyOption[]> = {
  uz: [
    { id: "medicine", name: "Tibbiyot fakulteti", sublabel: "Davolash, Stomatologiya, Pediatriya..." },
    { id: "engineering", name: "Muhandislik fakulteti", sublabel: "IT, Dasturlash, AI, Arxitektura..." },
    { id: "economy", name: "Iqtisodiyot fakulteti", sublabel: "Biznes, Moliya, Bank, Turizm..." },
    { id: "education", name: "Ta'lim fakulteti", sublabel: "Boshlang'ich, Maktabgacha, Psixologiya..." },
    { id: "philology", name: "Filologiya fakulteti", sublabel: "Ingliz, Koreys, Rus, Yapon, Tarjima..." },
  ],
  ru: [
    { id: "medicine", name: "Факультет медицины", sublabel: "Лечебное дело, Стоматология, Педиатрия..." },
    { id: "engineering", name: "Факультет инженерии и IT", sublabel: "IT, Программирование, ИИ, Архитектура..." },
    { id: "economy", name: "Факультет экономики и финансов", sublabel: "Бизнес, Финансы, Банковское дело..." },
    { id: "education", name: "Факультет образования", sublabel: "Начальное образование, Психология..." },
    { id: "philology", name: "Факультет филологии", sublabel: "Английский, Корейский, Русский, Перевод..." },
  ],
  en: [
    { id: "medicine", name: "School of Medicine", sublabel: "General Medicine, Dentistry, Pediatrics..." },
    { id: "engineering", name: "School of Engineering & IT", sublabel: "Computer Engineering, Software, AI..." },
    { id: "economy", name: "School of Business & Economy", sublabel: "Business Management, Finance, Banking..." },
    { id: "education", name: "School of Education", sublabel: "Primary Education, Early Childhood, Psychology..." },
    { id: "philology", name: "School of Philology", sublabel: "English, Korean, Russian, Translation..." },
  ],
};

export const DEGREE_OPTIONS_BY_LOCALE: Record<Locale, Array<{ value: string; label: string }>> = {
  uz: [
    { value: "Bakalavriat", label: "Bakalavriat" },
    { value: "Magistratura", label: "Magistratura" },
    { value: "Ikkinchi mutaxassislik", label: "2-mutaxassislik" },
  ],
  ru: [
    { value: "Бакалавриат", label: "Бакалавриат" },
    { value: "Магистратура", label: "Магистратура" },
    { value: "Второе высшее", label: "2-е высшее" },
  ],
  en: [
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Graduate", label: "Graduate" },
    { value: "Second Degree", label: "Second Degree" },
  ],
};

export const STUDY_TYPE_OPTIONS_BY_LOCALE: Record<Locale, Array<{ value: string; label: string }>> = {
  uz: [
    { value: "Kunduzgi", label: "Kunduzgi" },
    { value: "Sirtqi", label: "Sirtqi" },
    { value: "Kechki", label: "Kechki" },
  ],
  ru: [
    { value: "Дневное", label: "Дневное (очное)" },
    { value: "Заочное", label: "Заочное" },
    { value: "Вечернее", label: "Вечернее" },
  ],
  en: [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time / Distance", label: "Part-time / Distance" },
    { value: "Evening", label: "Evening" },
  ],
};

export const LANGUAGE_OPTIONS_BY_LOCALE: Record<Locale, Array<{ value: string; label: string }>> = {
  uz: [
    { value: "O'zbek", label: "O'zbek" },
    { value: "Rus", label: "Rus" },
    { value: "Ingliz", label: "Ingliz" },
  ],
  ru: [
    { value: "Узбекский", label: "Узбекский" },
    { value: "Русский", label: "Русский" },
    { value: "Английский", label: "Английский" },
  ],
  en: [
    { value: "Uzbek", label: "Uzbek" },
    { value: "Russian", label: "Russian" },
    { value: "English", label: "English" },
  ],
};

export function resolveFacultyName(inputNameOrId: string, targetLocale: Locale): string {
  if (!inputNameOrId) return FACULTIES_BY_LOCALE[targetLocale][0].name;

  for (const localeKey of ["uz", "ru", "en"] as const) {
    const found = FACULTIES_BY_LOCALE[localeKey].find(
      (f) => f.id === inputNameOrId || f.name.toLowerCase() === inputNameOrId.toLowerCase()
    );
    if (found) {
      const match = FACULTIES_BY_LOCALE[targetLocale].find((f) => f.id === found.id);
      return match ? match.name : found.name;
    }
  }

  const normalized = inputNameOrId.toLowerCase();
  if (normalized.includes("med") || normalized.includes("tibb")) {
    return FACULTIES_BY_LOCALE[targetLocale][0].name;
  }
  if (normalized.includes("eng") || normalized.includes("muhandis") || normalized.includes("инженер")) {
    return FACULTIES_BY_LOCALE[targetLocale][1].name;
  }
  if (
    normalized.includes("econ") ||
    normalized.includes("iqtisod") ||
    normalized.includes("эконом") ||
    normalized.includes("biznes") ||
    normalized.includes("бизнес")
  ) {
    return FACULTIES_BY_LOCALE[targetLocale][2].name;
  }
  if (
    normalized.includes("ta'lim") ||
    normalized.includes("educ") ||
    normalized.includes("образ") ||
    normalized.includes("педагог")
  ) {
    return FACULTIES_BY_LOCALE[targetLocale][3].name;
  }
  if (
    normalized.includes("filo") ||
    normalized.includes("phil") ||
    normalized.includes("til") ||
    normalized.includes("язык")
  ) {
    return FACULTIES_BY_LOCALE[targetLocale][4].name;
  }

  return inputNameOrId;
}

export interface UseAdmissionLeadFormOptions {
  currentLocale?: Locale;
  initialFaculty?: string;
  defaultStudyType?: string;
  onSuccess?: (confirmationId: string) => void;
}

export interface UseAdmissionLeadFormReturn {
  fullName: string;
  setFullName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  faculty: string;
  setFaculty: (faculty: string) => void;
  degree: string;
  setDegree: (degree: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  studyType: string;
  setStudyType: (studyType: string) => void;
  loading: boolean;
  submitted: boolean;
  confirmationId: string;
  errorMessage: string;
  facultyOptions: FacultyOption[];
  degreeOptions: Array<{ value: string; label: string }>;
  studyTypeOptions: Array<{ value: string; label: string }>;
  languageOptions: Array<{ value: string; label: string }>;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

/**
 * Reusable Lead Submission Hook adhering strictly to DRY principle.
 * Eliminates duplicate state, validation, phone formatting, and API submission logic.
 */
export function useAdmissionLeadForm({
  currentLocale = "uz",
  initialFaculty = "Tibbiyot fakulteti",
  defaultStudyType,
  onSuccess,
}: UseAdmissionLeadFormOptions = {}): UseAdmissionLeadFormReturn {
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
  const [prevLocale, setPrevLocale] = React.useState(currentLocale);
  const [degree, setDegree] = React.useState(degreeOptions[0].value);
  const [language, setLanguage] = React.useState(languageOptions[0].value);
  const [studyType, setStudyType] = React.useState(
    defaultStudyType || studyTypeOptions[0].value
  );

  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [confirmationId, setConfirmationId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  if (currentLocale !== prevLocale) {
    setPrevLocale(currentLocale);
    setFaculty(resolvedFaculty);
    setPrevResolvedFaculty(resolvedFaculty);
    setDegree(degreeOptions[0].value);
    setLanguage(languageOptions[0].value);
    setStudyType(studyTypeOptions[0].value);
  } else if (resolvedFaculty !== prevResolvedFaculty) {
    setPrevResolvedFaculty(resolvedFaculty);
    setFaculty(resolvedFaculty);
  }

  const handlePhoneChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatUzbekPhone(e.target.value);
      setPhone(formatted);
    },
    []
  );

  const resetForm = React.useCallback(() => {
    setFullName("");
    setPhone("+998 ");
    setSubmitted(false);
    setErrorMessage("");
    setFaculty(resolvedFaculty);
    setDegree(degreeOptions[0].value);
    setLanguage(languageOptions[0].value);
    setStudyType(defaultStudyType || studyTypeOptions[0].value);
  }, [resolvedFaculty, degreeOptions, languageOptions, defaultStudyType, studyTypeOptions]);

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
        setErrorMessage(
          data.error ||
            (currentLocale === "ru"
              ? "Произошла ошибка при отправке заявки."
              : currentLocale === "en"
              ? "An error occurred while submitting your application."
              : "Arizani yuborishda xatolik yuz berdi.")
        );
        setLoading(false);
        return;
      }

      setConfirmationId(data.confirmationId);
      setLoading(false);
      setSubmitted(true);
      onSuccess?.(data.confirmationId);
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

  return {
    fullName,
    setFullName,
    phone,
    setPhone,
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
  };
}
