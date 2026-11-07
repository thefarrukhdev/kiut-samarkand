import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Parol kiritilishi shart." },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(password, email);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Email yoki maxfiy parol noto'g'ri." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(email || "admin@sam.kiut.uz");

    const response = NextResponse.json({
      success: true,
      message: "Admin tizimiga muvaffaqiyatli kirildi.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[ADMIN_LOGIN_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Avtorizatsiyada kutilmagan xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
