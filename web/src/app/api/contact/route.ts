import { NextResponse } from "next/server";
import { isUzbekPhoneValid } from "@/lib/phone";
import { db } from "@/lib/db/store";

export async function POST(request: Request) {
  try {
    let body: { fullName?: unknown; phone?: unknown; subject?: unknown; message?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Yaroqsiz so'rov formati (JSON talab qilinadi)." },
        { status: 400 }
      );
    }

    const { fullName, phone, subject, message } = body || {};

    // Validate full name
    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 3 ||
      fullName.trim().length > 120
    ) {
      return NextResponse.json(
        { success: false, error: "Iltimos, to'liq ism-sharifingizni kiriting (3 dan 120 tagacha belgi)." },
        { status: 400 }
      );
    }

    // Validate Uzbek phone format
    if (!phone || typeof phone !== "string" || !isUzbekPhoneValid(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Iltimos, to'g'ri O'zbekiston telefon raqamini kiriting (+998 XX XXX-XX-XX).",
        },
        { status: 400 }
      );
    }

    // Validate message
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 5 ||
      message.trim().length > 3000
    ) {
      return NextResponse.json(
        { success: false, error: "Xabar matni kamida 5 ta va ko'pi bilan 3000 ta belgidan iborat bo'lishi kerak." },
        { status: 400 }
      );
    }

    const cleanSubject =
      typeof subject === "string" && subject.trim()
        ? subject.trim().slice(0, 200)
        : "Umumiy murojaat";

    const saved = db.createContactMessage({
      fullName: fullName.trim(),
      phone: phone.trim(),
      subject: cleanSubject,
      message: message.trim(),
    });

    console.log("[CONTACT_MESSAGE_SUBMISSION]", {
      id: saved.id,
      fullName: saved.fullName,
      phone: saved.phone,
      subject: saved.subject,
      submittedAt: saved.submittedAt,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Murojaatingiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog'lanamiz.",
        id: saved.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Server bilan bog'lanishda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
