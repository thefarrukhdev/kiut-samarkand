import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import type { DbNewsItem } from "@/lib/db/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const { id } = await params;
  const item = db.getNewsBySlug(id);

  if (!item) {
    return NextResponse.json({ success: false, error: "Yangilik topilmadi" }, { status: 404 });
  }

  return NextResponse.json({ success: true, news: item });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await request.json()) as Partial<DbNewsItem>;
    const updated = db.updateNews(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Yangilik topilmadi" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      news: updated,
      message: "Yangilik muvaffaqiyatli yangilandi.",
    });
  } catch (error) {
    console.error("[ADMIN_NEWS_PUT_ERROR]", error);
    return NextResponse.json({ success: false, error: "Yangilikni yangilashda xatolik yuz berdi" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = db.deleteNews(id);

  if (!deleted) {
    return NextResponse.json({ success: false, error: "Yangilik topilmadi yoki o'chirib bo'lmadi" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Yangilik muvaffaqiyatli o'chirildi.",
  });
}
