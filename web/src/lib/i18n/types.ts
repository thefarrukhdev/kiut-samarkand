import type { Locale } from "@/types";

export type { Locale };

export interface TopbarTranslations {
  phoneTitle: string;
  address: string;
  addressTitle: string;
  hours: string;
  hemisTitle: string;
  hemisLabel: string;
}

export interface NavTranslations {
  home: string;
  faculties: string;
  facultiesCount: string;
  facultiesAll: string;
  university: string;
  stats: string;
  news: string;
  contact: string;
  cta: string;
  branchLabel: string;
  branchSub: string;
  mobileTitle: string;
  hotline: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  badgeVariant: "default" | "accent" | "action" | "gold";
  title: string;
  highlight: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  statsPill: string;
}

export interface HeroTranslations {
  officialLicense: string;
  slides: HeroSlide[];
}

export interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface StatsTranslations {
  badge: string;
  title: string;
  description: string;
  items: StatItem[];
}

export interface SchoolTabs {
  all: string;
  medicine: string;
  engineering: string;
  economy: string;
  education: string;
  philology: string;
}

export interface SchoolsTranslations {
  badge: string;
  title: string;
  description: string;
  tabs: SchoolTabs;
  durationLabel: string;
  languagesLabel: string;
  mainProgramsLabel: string;
  morePrograms: string;
  applyButton: string;
  detailsButton: string;
  bannerBadge: string;
  bannerTitle: string;
  bannerDescription: string;
  modalAbout: string;
  modalAllPrograms: string;
  modalClose: string;
  modalApply: string;
}

export interface AboutPillar {
  title: string;
  desc: string;
}

export interface AboutTranslations {
  badge: string;
  imageBadge: string;
  imageCaption: string;
  employmentRate: string;
  employmentDesc: string;
  title: string;
  description: string;
  partnersLabel: string;
  viewAllCta: string;
  pillars: AboutPillar[];
}

export interface NewsTabs {
  all: string;
  academic: string;
  partnership: string;
  studentLife: string;
  sport: string;
}

export interface NewsTranslations {
  badge: string;
  title: string;
  description: string;
  tabs: NewsTabs;
  readMore: string;
  pressRelease: string;
  archiveButton: string;
  modalClose: string;
}

export interface AdmissionBenefit {
  title: string;
  desc: string;
}

export interface AdmissionTranslations {
  badge: string;
  title: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  hotlineLabel: string;
  hotlineHours: string;
  formBadge: string;
  formTitle: string;
  formSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  facultyLabel: string;
  degreeLabel: string;
  studyTypeLabel: string;
  languageLabel: string;
  submitButton: string;
  submittingButton: string;
  consentText: string;
  successBadge: string;
  successGreeting: string;
  successMessage: string;
  idLabel: string;
  phoneResultLabel: string;
  languageResultLabel: string;
  resetButton: string;
  benefits: AdmissionBenefit[];
}

export interface FaqTranslations {
  sectionLabel: string;
  badge: string;
  title: string;
  description: string;
  helpCardTitle: string;
  helpCardSubtitle: string;
  helpCardPhone: string;
  helpCardConsultation: string;
}

export interface FooterTranslations {
  desc: string;
  accreditationTitle: string;
  accreditationText: string;
  socialLabel: string;
  facultiesTitle: string;
  portalTitle: string;
  contactTitle: string;
  address: string;
  days: string;
  sunday: string;
  copyright: string;
  privacy: string;
  terms: string;
  backToTop: string;
}

export interface TranslationDictionary {
  topbar: TopbarTranslations;
  nav: NavTranslations;
  hero: HeroTranslations;
  stats: StatsTranslations;
  schools: SchoolsTranslations;
  about: AboutTranslations;
  news: NewsTranslations;
  admission: AdmissionTranslations;
  faq: FaqTranslations;
  footer: FooterTranslations;
}
