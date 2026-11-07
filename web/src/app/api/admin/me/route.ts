import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/admin";

export async function GET() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
    },
  });
}
