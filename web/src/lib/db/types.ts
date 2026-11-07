export type LeadStatus = "new" | "contacted" | "enrolled" | "rejected";

export interface AdmissionLead {
  id: string;
  confirmationId: string;
  fullName: string;
  phone: string;
  selectedFaculty: string;
  degree: string;
  language: string;
  studyType: string;
  status: LeadStatus;
  notes: string;
  submittedAt: string;
  updatedAt: string;
}

export interface LocalizedString {
  uz: string;
  ru: string;
  en: string;
}

export interface DbNewsItem {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  category: "academic" | "events" | "campus" | "sports";
  categoryLabel: LocalizedString;
  image: string;
  date: LocalizedString;
  readTime: LocalizedString;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilterOptions {
  status?: LeadStatus | "all";
  faculty?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface NewsFilterOptions {
  category?: string;
  search?: string;
  publishedOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface DashboardStats {
  totalLeads: number;
  todayLeads: number;
  newLeads: number;
  contactedLeads: number;
  enrolledLeads: number;
  totalNews: number;
  leadsByFaculty: Record<string, number>;
  leadsByDegree: Record<string, number>;
}
