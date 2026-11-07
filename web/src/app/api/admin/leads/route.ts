import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";
import type { LeadStatus } from "@/lib/db/types";

export async function GET(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") || "all") as LeadStatus | "all";
  const faculty = searchParams.get("faculty") || undefined;
  const search = searchParams.get("search") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;
  const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!, 10) : undefined;

  const leads = db.getLeads({ status, faculty, search, limit, offset });
  const stats = db.getDashboardStats();

  return NextResponse.json({
    success: true,
    leads,
    stats,
  });
}

export async function PATCH(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, notes, fullName, phone, selectedFaculty } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ success: false, error: "Ariza ID ko'rsatilishi shart." }, { status: 400 });
    }

    const updated = db.updateLead(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(fullName ? { fullName } : {}),
      ...(phone ? { phone } : {}),
      ...(selectedFaculty ? { selectedFaculty } : {}),
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Ariza topilmadi." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      lead: updated,
      message: "Ariza muvaffaqiyatli yangilandi.",
    });
  } catch (error) {
    console.error("[ADMIN_LEADS_PATCH_ERROR]", error);
    return NextResponse.json({ success: false, error: "Arizani yangilashda xatolik yuz berdi." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Ariza ID ko'rsatilishi shart." }, { status: 400 });
    }

    const deleted = db.deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Ariza topilmadi yoki o'chirib bo'lmadi." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Ariza muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    console.error("[ADMIN_LEADS_DELETE_ERROR]", error);
    return NextResponse.json({ success: false, error: "Arizani o'chirishda xatolik yuz berdi." }, { status: 500 });
  }
}
