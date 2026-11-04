import { NextResponse } from "next/server";
import { isUzbekPhoneValid } from "@/lib/phone";

interface AdmissionRequestBody {
  fullName?: string;
  phone?: string;
  selectedFaculty?: string;
  degree?: string;
  language?: string;
  studyType?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdmissionRequestBody;
    const {
      fullName,
      phone,
      selectedFaculty,
      degree,
      language,
      studyType,
    } = body;

    // Validate Full Name
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Iltimos, to'liq ism-familiyangizni kiriting (kamida 3 belgi)." },
        { status: 400 }
      );
    }

    // Validate Phone Number
    if (!phone || typeof phone !== "string" || !isUzbekPhoneValid(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Iltimos, to'liq va to'g'ri O'zbekiston telefon raqamini kiriting (+998 XX XXX-XX-XX).",
        },
        { status: 400 }
      );
    }

    // Validate Faculty
    if (!selectedFaculty || typeof selectedFaculty !== "string") {
      return NextResponse.json(
        { success: false, error: "Iltimos, fakultetni tanlang." },
        { status: 400 }
      );
    }

    // Generate unique verification code
    const timestampPart = Date.now().toString().slice(-4);
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const confirmationId = `KS-${timestampPart}${randomPart}`;

    const leadRecord = {
      confirmationId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      selectedFaculty: selectedFaculty.trim(),
      degree: degree || "Bakalavriat",
      language: language || "O'zbek",
      studyType: studyType || "Kunduzgi",
      submittedAt: new Date().toISOString(),
    };

    // Log the lead record for operational auditing (PII-masked)
    console.log("[ADMISSION_LEAD_SUBMISSION]", {
      confirmationId,
      selectedFaculty: leadRecord.selectedFaculty,
      degree: leadRecord.degree,
      studyType: leadRecord.studyType,
      submittedAt: leadRecord.submittedAt,
    });

    return NextResponse.json({
      success: true,
      confirmationId,
      lead: leadRecord,
      message: "Arizangiz muvaffaqiyatli qabul qilindi. Tez orada qabul komissiyasi siz bilan bog'lanadi.",
    });
  } catch (error) {
    console.error("[ADMISSION_API_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Serverda kutilmagan xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." },
      { status: 500 }
    );
  }
}
