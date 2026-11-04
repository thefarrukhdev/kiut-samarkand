export type Locale = "uz" | "ru" | "en";

export interface HeroSlide {
  title: string;
  description: string;
  image: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface UniversityStat {
  value: string;
  label: string;
  icon?: string;
}

export interface FacultyProgram {
  slug: string;
  name: string;
  school: string;
  degree: "Bakalavr" | "Magistratura";
  duration: string;
  language: string;
  description: string;
  image: string;
  tuitionFee?: string;
  careerProspects?: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  category?: string;
  content?: string;
}

export interface AdmissionLead {
  fullName: string;
  phone: string;
  selectedFaculty: string;
  degree: string;
  language: string;
  createdAt?: string;
}
