import type { Locale } from "@/types";

export interface ProgramsDictionary {
  breadcrumbHome: string;
  breadcrumbPrograms: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  searchPlaceholder: string;
  searchAria: string;
  clearSearch: string;
  filterFaculty: string;
  filterDegree: string;
  filterFormat: string;
  filterLanguage: string;
  faculties: {
    all: string;
    medicine: string;
    engineering: string;
    economy: string;
    education: string;
    philology: string;
  };
  degrees: {
    all: string;
    bachelor: string;
    master: string;
  };
  formats: {
    all: string;
    day: string;
    distance: string;
    evening: string;
  };
  languages: {
    all: string;
    uzbek: string;
    russian: string;
    english: string;
  };
  duration: string;
  languagesLabel: string;
  formatsLabel: string;
  viewDetails: string;
  applyNow: string;
  emptyTitle: string;
  emptyDescription: string;
  resetFilters: string;
  foundCount: string;
  aboutProgram: string;
  careerHeading: string;
  curriculumHeading: string;
  accreditationHeading: string;
  fastFactsHeading: string;
  ctaHeading: string;
  ctaSub: string;
  applyForProgram: string;
  getConsultation: string;
  hotlineLabel: string;
  relatedPrograms: string;
  factDegree: string;
  factDuration: string;
  factFormat: string;
  factLanguage: string;
  factDates: string;
  factDatesValue: string;
  factDiploma: string;
  factDiplomaValue: string;
  factLicense: string;
  factLicenseValue: string;
}

export const programsDictionary: Record<Locale, ProgramsDictionary> = {
  uz: {
    breadcrumbHome: "Bosh sahifa",
    breadcrumbPrograms: "Dasturlar",
    heroBadge: "2026/2027 O'quv yili qabuli",
    heroTitle: "48+ Ta'lim Yo'nalishlari va Fakultetlar",
    heroDescription:
      "Toshkent Kimyo Xalqaro Universiteti Samarqand filialida jahon standartlari darajasidagi bakalavriat ta'lim dasturlari. O'zbekiston davlat litsenziyasi, xalqaro 2+2 va 3+1 dual diplom hamkorliklari va zamonaviy amaliy laboratoriyalar.",
    searchPlaceholder:
      "Yo'nalish nomi, kasb yoki kalit so'z bo'yicha qidiring (masalan: Dasturiy injiniring, Davolash ishi, Moliya)...",
    searchAria: "Ta'lim yo'nalishlarini qidirish",
    clearSearch: "Qidiruvni tozalash",
    filterFaculty: "Fakultet bo'yicha",
    filterDegree: "Ta'lim darajasi",
    filterFormat: "Ta'lim shakli",
    filterLanguage: "Ta'lim tili",
    faculties: {
      all: "Barcha fakultetlar",
      medicine: "Tibbiyot",
      engineering: "Muhandislik & IT",
      economy: "Iqtisodiyot & Biznes",
      education: "Pedagogika",
      philology: "Filologiya",
    },
    degrees: {
      all: "Barcha darajalar",
      bachelor: "Bakalavriat",
      master: "Magistratura",
    },
    formats: {
      all: "Barcha shakllar",
      day: "Kunduzgi",
      distance: "Sirtqi",
      evening: "Kechki",
    },
    languages: {
      all: "Barcha tillar",
      uzbek: "O'zbek",
      russian: "Rus",
      english: "Ingliz",
    },
    duration: "Davomiyligi",
    languagesLabel: "Ta'lim tili",
    formatsLabel: "Ta'lim shakli",
    viewDetails: "Batafsil ma'lumot",
    applyNow: "Ariza topshirish",
    emptyTitle: "Mos keluvchi ta'lim yo'nalishi topilmadi",
    emptyDescription:
      "Kiritilgan qidiruv so'zini tekshiring yoki tanlangan filtrlarni tozalab qayta urinib ko'ring.",
    resetFilters: "Filtrlarni tozalash",
    foundCount: "ta yo'nalish topildi",
    aboutProgram: "Dastur haqida",
    careerHeading: "Karyera va ishga joylashish istiqbollari",
    curriculumHeading: "O'quv dasturi va asosiy fanlar",
    accreditationHeading: "Xalqaro akkreditatsiya va dual diplom",
    fastFactsHeading: "Muhim ma'lumotlar",
    ctaHeading: "Qabul 2026/2027",
    ctaSub:
      "Ushbu yo'nalishga hujjatlaringizni onlayn topshiring va talaba bo'ling",
    applyForProgram: "Ushbu yo'nalishga hujjat topshirish",
    getConsultation: "Konsultatsiya olish",
    hotlineLabel: "Qabul komissiyasi ishonch telefoni",
    relatedPrograms: "Fakultetning boshqa yo'nalishlari",
    factDegree: "Ta'lim darajasi",
    factDuration: "O'qish muddati",
    factFormat: "Ta'lim shakli",
    factLanguage: "Ta'lim tili",
    factDates: "Qabul muddati",
    factDatesValue: "2026/2027 qabuli davom etmoqda",
    factDiploma: "Diplom maqomi",
    factDiplomaValue: "Davlat andozasidagi rasmiy diplom",
    factLicense: "Davlat litsenziyasi",
    factLicenseValue: "№ 039281 (Oliy ta'lim vazirligi)",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbPrograms: "Программы",
    heroBadge: "Прием на 2026/2027 учебный год",
    heroTitle: "48+ Образовательных программ и факультетов",
    heroDescription:
      "Программы бакалавриата международного уровня в Самаркандском филиале Международного университета Кимё в Ташкенте. Государственная лицензия РУз, совместные программы двойного диплома 2+2 и 3+1 и современные лаборатории.",
    searchPlaceholder:
      "Поиск по названию программы или ключевым словам (например: Лечебное дело, Программная инженерия, Финансы)...",
    searchAria: "Поиск образовательных программ",
    clearSearch: "Очистить поиск",
    filterFaculty: "По факультету",
    filterDegree: "Ступень образования",
    filterFormat: "Форма обучения",
    filterLanguage: "Язык обучения",
    faculties: {
      all: "Все факультеты",
      medicine: "Медицина",
      engineering: "Инженерия & IT",
      economy: "Экономика & Бизнес",
      education: "Педагогика",
      philology: "Филология & Языки",
    },
    degrees: {
      all: "Все ступени",
      bachelor: "Бакалавриат",
      master: "Магистратура",
    },
    formats: {
      all: "Все формы",
      day: "Дневное",
      distance: "Заочное",
      evening: "Вечернее",
    },
    languages: {
      all: "Все языки",
      uzbek: "Узбекский",
      russian: "Русский",
      english: "Английский",
    },
    duration: "Срок обучения",
    languagesLabel: "Языки обучения",
    formatsLabel: "Форма обучения",
    viewDetails: "Подробнее о программе",
    applyNow: "Подать заявку",
    emptyTitle: "По вашему запросу направлений не найдено",
    emptyDescription:
      "Попробуйте изменить поисковый запрос или сбросить активные фильтры.",
    resetFilters: "Сбросить фильтры",
    foundCount: "программ найдено",
    aboutProgram: "О программе",
    careerHeading: "Карьера и перспективы трудоустройства",
    curriculumHeading: "Учебная программа и ключевые дисциплины",
    accreditationHeading: "Международная аккредитация и двойной диплом",
    fastFactsHeading: "Ключевые факты",
    ctaHeading: "Прием 2026/2027",
    ctaSub:
      "Подайте онлайн-заявку на выбранное направление прямо сейчас",
    applyForProgram: "Подать документы на это направление",
    getConsultation: "Получить консультацию",
    hotlineLabel: "Горячая линия приемной комиссии",
    relatedPrograms: "Другие программы этого факультета",
    factDegree: "Ступень образования",
    factDuration: "Срок обучения",
    factFormat: "Форма обучения",
    factLanguage: "Язык обучения",
    factDates: "Сроки приема",
    factDatesValue: "Прием на 2026/2027 год открыт",
    factDiploma: "Статус диплома",
    factDiplomaValue: "Государственный диплом РУз",
    factLicense: "Гослицензия",
    factLicenseValue: "№ 039281 (Минвуз РУз)",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbPrograms: "Programs",
    heroBadge: "Admissions 2026/2027 Open",
    heroTitle: "48+ Academic Programs & Faculties",
    heroDescription:
      "World-class undergraduate degree programs at Kimyo International University in Tashkent, Samarkand Branch. Fully accredited by the state license of Uzbekistan, international 2+2 & 3+1 dual-degree articulations, and high-tech simulation laboratories.",
    searchPlaceholder:
      "Search by program title, discipline or keyword (e.g., Software Engineering, Medicine, Finance)...",
    searchAria: "Search academic degree programs",
    clearSearch: "Clear search",
    filterFaculty: "By Faculty",
    filterDegree: "Academic Degree",
    filterFormat: "Study Mode",
    filterLanguage: "Language of Instruction",
    faculties: {
      all: "All Faculties",
      medicine: "Medicine",
      engineering: "Engineering & IT",
      economy: "Business & Economy",
      education: "Education",
      philology: "Philology & Languages",
    },
    degrees: {
      all: "All Degrees",
      bachelor: "Bachelor's Degree",
      master: "Master's Degree",
    },
    formats: {
      all: "All Formats",
      day: "Full-time",
      distance: "Part-time",
      evening: "Evening",
    },
    languages: {
      all: "All Languages",
      uzbek: "Uzbek",
      russian: "Russian",
      english: "English",
    },
    duration: "Duration",
    languagesLabel: "Languages",
    formatsLabel: "Study Format",
    viewDetails: "Program Details",
    applyNow: "Apply Now",
    emptyTitle: "No matching programs found",
    emptyDescription:
      "Please adjust your search terms or clear your active filters.",
    resetFilters: "Reset Filters",
    foundCount: "programs found",
    aboutProgram: "About the Program",
    careerHeading: "Career & Employment Prospects",
    curriculumHeading: "Curriculum & Core Modules",
    accreditationHeading: "International Accreditation & Dual Degree",
    fastFactsHeading: "Fast Facts",
    ctaHeading: "Admissions 2026/2027",
    ctaSub:
      "Submit your online application for this program today",
    applyForProgram: "Apply for this Program",
    getConsultation: "Request Consultation",
    hotlineLabel: "Admissions Commission Hotline",
    relatedPrograms: "Other Programs in this Faculty",
    factDegree: "Degree Level",
    factDuration: "Duration",
    factFormat: "Study Mode",
    factLanguage: "Instruction Language",
    factDates: "Admissions Period",
    factDatesValue: "2026/2027 Admissions Open",
    factDiploma: "Diploma Credential",
    factDiplomaValue: "Accredited State Diploma",
    factLicense: "Official License",
    factLicenseValue: "No. 039281 (Ministry of Higher Education)",
  },
};

export function getProgramsDictionary(locale: Locale): ProgramsDictionary {
  return programsDictionary[locale] || programsDictionary.uz;
}
