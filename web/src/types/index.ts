export type Locale = "uz" | "ru" | "en";

export interface HeroSlide {
  title: string;
  description: string;
  image: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  name: string;
  facultyId: "medicine" | "engineering" | "economy" | "education" | "philology";
  facultyName: string;
  degree: "bachelor" | "master";
  duration: string;
  languages: string[];
  modes: Array<"day" | "evening" | "distance">;
  description: string;
  career: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "admission" | "diploma" | "tuition" | "campus";
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
  studyType?: string;
  createdAt?: string;
}
