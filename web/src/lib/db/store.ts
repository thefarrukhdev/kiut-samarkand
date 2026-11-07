import fs from "fs";
import path from "path";
import type {
  AdmissionLead,
  DbNewsItem,
  ContactMessage,
  LeadFilterOptions,
  NewsFilterOptions,
  DashboardStats,
} from "./types";
import rawScrapedNews from "@/data/news.json";

interface DatabaseSchema {
  leads: AdmissionLead[];
  news: DbNewsItem[];
  messages?: ContactMessage[];
  meta: {
    version: number;
    lastUpdated: string;
  };
}

const DB_DIR = path.join(process.cwd(), "data", "db");
const DB_FILE = path.join(DB_DIR, "portal-store.json");

function ensureDbDirectory() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

// Initial Sample Leads for Admissions Office
const INITIAL_SAMPLE_LEADS: AdmissionLead[] = [
  {
    id: "lead-1",
    confirmationId: "KS-78192011",
    fullName: "Shohruh Mirzayev",
    phone: "+998 (90) 214-55-88",
    selectedFaculty: "Tibbiyot fakulteti",
    degree: "Bakalavriat",
    language: "O'zbek",
    studyType: "Kunduzgi",
    status: "new",
    notes: "IELTS 6.0 sertifikati bor. Davolash ishi bo'yicha grant shartlarini so'radi.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "lead-2",
    confirmationId: "KS-78192012",
    fullName: "Diyora Rustamova",
    phone: "+998 (91) 552-30-10",
    selectedFaculty: "Muhandislik fakulteti",
    degree: "Bakalavriat",
    language: "Ingliz",
    studyType: "Kunduzgi",
    status: "contacted",
    notes: "Dasturiy injiniring 2+2 dasturi bilan qiziqdi. Qo'ng'iroq qilindi, ota-onasi bilan keladi.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "lead-3",
    confirmationId: "KS-78192013",
    fullName: "Javohirbek Qodirov",
    phone: "+998 (93) 330-12-44",
    selectedFaculty: "Iqtisodiyot fakulteti",
    degree: "Bakalavriat",
    language: "Rus",
    studyType: "Kechki",
    status: "enrolled",
    notes: "Xalqaro biznes yo'nalishi. 1-qism kontrakt to'lovi to'langan, hujjatlari topshirildi.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "lead-4",
    confirmationId: "KS-78192014",
    fullName: "Zuhra Alimova",
    phone: "+998 (97) 915-00-72",
    selectedFaculty: "Filologiya fakulteti",
    degree: "Bakalavriat",
    language: "O'zbek",
    studyType: "Kunduzgi",
    status: "new",
    notes: "Koreys filologiyasi bo'yicha qabul imtihoni kunini aniqlashtirmoqchi.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "lead-5",
    confirmationId: "KS-78192015",
    fullName: "Jasurbek Toshpo'latov",
    phone: "+998 (99) 777-81-90",
    selectedFaculty: "Ta'lim fakulteti",
    degree: "Magistratura",
    language: "O'zbek",
    studyType: "Kechki",
    status: "contacted",
    notes: "Pedagogika va psixologiya magistraturasi bo'yicha maslahat berildi.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
];

// Helper to seed news items from raw scraped data
function seedInitialNews(): DbNewsItem[] {
  const uzList = (rawScrapedNews as { uz?: Array<{ slug: string; title: string; summary: string; image: string; date: string }> }).uz || [];
  const ruList = (rawScrapedNews as { ru?: Array<{ slug: string; title: string; summary: string; image: string; date: string }> }).ru || [];
  const enList = (rawScrapedNews as { en?: Array<{ slug: string; title: string; summary: string; image: string; date: string }> }).en || [];

  return uzList.map((item, index) => {
    const ruItem = ruList[index] || item;
    const enItem = enList[index] || item;

    let category: "academic" | "events" | "campus" | "sports" = "academic";
    const lower = (item.title + " " + item.summary).toLowerCase();
    if (lower.includes("kubog") || lower.includes("sport") || lower.includes("turnir")) {
      category = "sports";
    } else if (lower.includes("dars") || lower.includes("olimpiada") || lower.includes("parlament")) {
      category = "events";
    } else if (lower.includes("bino") || lower.includes("ochil") || lower.includes("kampus")) {
      category = "campus";
    }

    const categoryLabels = {
      academic: { uz: "Akademik", ru: "Академические", en: "Academic" },
      events: { uz: "Tadbirlar", ru: "События", en: "Events" },
      campus: { uz: "Kampus", ru: "Кампус", en: "Campus" },
      sports: { uz: "Sport", ru: "Спорт", en: "Sports" },
    };

    const dateStr = item.date && item.date.trim() !== "" ? item.date : "28-Oktabr, 2026";

    return {
      id: `news-${index + 1}`,
      slug: item.slug,
      title: {
        uz: item.title,
        ru: ruItem.title,
        en: enItem.title,
      },
      summary: {
        uz: item.summary,
        ru: ruItem.summary,
        en: enItem.summary,
      },
      content: {
        uz: item.summary,
        ru: ruItem.summary,
        en: enItem.summary,
      },
      category,
      categoryLabel: categoryLabels[category],
      image: item.image || "/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg",
      date: {
        uz: dateStr,
        ru: ruItem.date || "28 октября, 2026",
        en: enItem.date || "Oct 28, 2026",
      },
      readTime: {
        uz: "3 daqiqa",
        ru: "3 мин.",
        en: "3 min",
      },
      published: true,
      views: 120 + (index * 47) % 350,
      createdAt: new Date(Date.now() - (index * 86400000 * 3)).toISOString(),
      updatedAt: new Date(Date.now() - (index * 86400000 * 3)).toISOString(),
    };
  });
}

class DatabaseStore {
  private cache: DatabaseSchema | null = null;

  private load(): DatabaseSchema {
    if (this.cache) return this.cache;

    ensureDbDirectory();

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw) as DatabaseSchema;
        if (parsed.leads && parsed.news) {
          if (!parsed.messages) parsed.messages = [];
          this.cache = parsed;
          return this.cache;
        }
      } catch (err) {
        console.error("[DB_LOAD_ERROR] Failed to parse db file, re-initializing:", err);
      }
    }

    // Initialize with seeded data
    const initialData: DatabaseSchema = {
      leads: INITIAL_SAMPLE_LEADS,
      news: seedInitialNews(),
      messages: [],
      meta: {
        version: 1,
        lastUpdated: new Date().toISOString(),
      },
    };

    this.save(initialData);
    this.cache = initialData;
    return initialData;
  }

  private save(data: DatabaseSchema) {
    ensureDbDirectory();
    data.meta.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    this.cache = data;
  }

  // --- LEADS MANAGEMENT ---

  public getLeads(options: LeadFilterOptions = {}): AdmissionLead[] {
    const data = this.load();
    let result = [...data.leads];

    if (options.status && options.status !== "all") {
      result = result.filter((l) => l.status === options.status);
    }

    if (options.faculty && options.faculty !== "all") {
      result = result.filter((l) =>
        l.selectedFaculty.toLowerCase().includes(options.faculty!.toLowerCase())
      );
    }

    if (options.search && options.search.trim() !== "") {
      const q = options.search.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.confirmationId.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    result.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    if (options.offset) {
      result = result.slice(options.offset);
    }
    if (options.limit) {
      result = result.slice(0, options.limit);
    }

    return result;
  }

  public getLeadById(id: string): AdmissionLead | null {
    const data = this.load();
    return data.leads.find((l) => l.id === id || l.confirmationId === id) || null;
  }

  public createLead(
    leadData: Omit<AdmissionLead, "id" | "status" | "notes" | "updatedAt">
  ): AdmissionLead {
    const data = this.load();
    const newLead: AdmissionLead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: "new",
      notes: "",
      updatedAt: new Date().toISOString(),
    };

    data.leads.unshift(newLead);
    this.save(data);
    return newLead;
  }

  public updateLead(
    id: string,
    updates: Partial<Pick<AdmissionLead, "status" | "notes" | "fullName" | "phone" | "selectedFaculty">>
  ): AdmissionLead | null {
    const data = this.load();
    const index = data.leads.findIndex((l) => l.id === id || l.confirmationId === id);
    if (index === -1) return null;

    const updated: AdmissionLead = {
      ...data.leads[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.leads[index] = updated;
    this.save(data);
    return updated;
  }

  public deleteLead(id: string): boolean {
    const data = this.load();
    const prevLen = data.leads.length;
    data.leads = data.leads.filter((l) => l.id !== id && l.confirmationId !== id);
    if (data.leads.length !== prevLen) {
      this.save(data);
      return true;
    }
    return false;
  }

  public getDashboardStats(): DashboardStats {
    const data = this.load();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const stats: DashboardStats = {
      totalLeads: data.leads.length,
      todayLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      enrolledLeads: 0,
      totalNews: data.news.length,
      leadsByFaculty: {},
      leadsByDegree: {},
    };

    data.leads.forEach((l) => {
      const subTime = new Date(l.submittedAt).getTime();
      if (subTime >= todayStart) {
        stats.todayLeads++;
      }

      if (l.status === "new") stats.newLeads++;
      if (l.status === "contacted") stats.contactedLeads++;
      if (l.status === "enrolled") stats.enrolledLeads++;

      stats.leadsByFaculty[l.selectedFaculty] =
        (stats.leadsByFaculty[l.selectedFaculty] || 0) + 1;
      stats.leadsByDegree[l.degree] = (stats.leadsByDegree[l.degree] || 0) + 1;
    });

    return stats;
  }

  // --- NEWS MANAGEMENT ---

  public getNews(options: NewsFilterOptions = {}): DbNewsItem[] {
    const data = this.load();
    let result = [...data.news];

    if (options.publishedOnly) {
      result = result.filter((n) => n.published);
    }

    if (options.category && options.category !== "all") {
      result = result.filter((n) => n.category === options.category);
    }

    if (options.search && options.search.trim() !== "") {
      const q = options.search.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.uz.toLowerCase().includes(q) ||
          n.title.ru.toLowerCase().includes(q) ||
          n.title.en.toLowerCase().includes(q) ||
          n.summary.uz.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (options.offset) {
      result = result.slice(options.offset);
    }
    if (options.limit) {
      result = result.slice(0, options.limit);
    }

    return result;
  }

  public getNewsBySlug(slug: string): DbNewsItem | null {
    const data = this.load();
    return data.news.find((n) => n.slug === slug || n.id === slug) || null;
  }

  public createNews(
    newsData: Omit<DbNewsItem, "id" | "createdAt" | "updatedAt" | "views">
  ): DbNewsItem {
    const data = this.load();
    const newArticle: DbNewsItem = {
      ...newsData,
      id: `news-${Date.now()}`,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.news.unshift(newArticle);
    this.save(data);
    return newArticle;
  }

  public updateNews(
    id: string,
    updates: Partial<DbNewsItem>
  ): DbNewsItem | null {
    const data = this.load();
    const index = data.news.findIndex((n) => n.id === id || n.slug === id);
    if (index === -1) return null;

    const updated: DbNewsItem = {
      ...data.news[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.news[index] = updated;
    this.save(data);
    return updated;
  }

  public deleteNews(id: string): boolean {
    const data = this.load();
    const prevLen = data.news.length;
    data.news = data.news.filter((n) => n.id !== id && n.slug !== id);
    if (data.news.length !== prevLen) {
      this.save(data);
      return true;
    }
    return false;
  }

  // --- CONTACT MESSAGES ---

  public createContactMessage(
    messageData: Omit<ContactMessage, "id" | "submittedAt">
  ): ContactMessage {
    const data = this.load();
    if (!data.messages) {
      data.messages = [];
    }

    const newMessage: ContactMessage = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      submittedAt: new Date().toISOString(),
    };

    data.messages.unshift(newMessage);
    this.save(data);
    return newMessage;
  }

  public getContactMessages(): ContactMessage[] {
    const data = this.load();
    return data.messages || [];
  }
}

export const db = new DatabaseStore();
