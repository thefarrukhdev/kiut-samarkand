import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import type { DbNewsItem } from "@/lib/db/types";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || `news-${Date.now()}`;
}

const CATEGORY_LABELS = {
  academic: { uz: "Akademik", ru: "Академические", en: "Academic" },
  events: { uz: "Tadbirlar", ru: "События", en: "Events" },
  campus: { uz: "Kampus", ru: "Кампус", en: "Campus" },
  sports: { uz: "Sport", ru: "Спорт", en: "Sports" },
};

export async function GET(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const publishedOnly = searchParams.get("publishedOnly") === "true";
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;
  const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!, 10) : undefined;

  const news = db.getNews({ category, search, publishedOnly, limit, offset });

  return NextResponse.json({
    success: true,
    news,
    total: news.length,
  });
}

export async function POST(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      summary,
      content,
      category = "academic",
      image,
      date,
      readTime,
      published = true,
      slug,
    } = body;

    if (!title?.uz || !summary?.uz) {
      return NextResponse.json(
        { success: false, error: "O'zbek tilidagi sarlavha va qisqacha tavsif kiritilishi shart." },
        { status: 400 }
      );
    }

    const catKey = (category in CATEGORY_LABELS ? category : "academic") as keyof typeof CATEGORY_LABELS;
    const finalSlug = slug && slug.trim() ? slug.trim() : generateSlug(title.uz);

    // Format current date if not provided
    const now = new Date();
    const defaultDate = {
      uz: `${now.getDate()}-Noyabr, ${now.getFullYear()}`,
      ru: `${now.getDate()} ноября, ${now.getFullYear()}`,
      en: `Nov ${now.getDate()}, ${now.getFullYear()}`,
    };

    const newArticleData: Omit<DbNewsItem, "id" | "createdAt" | "updatedAt" | "views"> = {
      slug: finalSlug,
      title: {
        uz: title.uz || "",
        ru: title.ru || title.uz || "",
        en: title.en || title.uz || "",
      },
      summary: {
        uz: summary.uz || "",
        ru: summary.ru || summary.uz || "",
        en: summary.en || summary.uz || "",
      },
      content: {
        uz: content?.uz || summary.uz || "",
        ru: content?.ru || summary.ru || summary.uz || "",
        en: content?.en || summary.en || summary.uz || "",
      },
      category: catKey,
      categoryLabel: CATEGORY_LABELS[catKey],
      image: image || "/assets/banners/photo_2026-08-03_10-09-43.jpg__1920x1080_q85_crop_subsampling-2.jpg",
      date: date || defaultDate,
      readTime: readTime || {
        uz: "3 daqiqa",
        ru: "3 мин.",
        en: "3 min",
      },
      published: Boolean(published),
    };

    const created = db.createNews(newArticleData);

    return NextResponse.json({
      success: true,
      news: created,
      message: "Yangilik muvaffaqiyatli chop etildi.",
    });
  } catch (error) {
    console.error("[ADMIN_NEWS_POST_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Yangilikni saqlashda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
