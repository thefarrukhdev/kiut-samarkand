import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/admin";
import { db } from "@/lib/db/store";

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const stringValue = String(field);
  return `"${stringValue.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Ruxsat berilmagan (401)" }, { status: 401 });
  }

  const leads = db.getLeads();

  const headers = [
    "ID",
    "Tasdiqlash Kodi",
    "F.I.SH",
    "Telefon",
    "Fakultet",
    "Bosqich",
    "Ta'lim Tili",
    "Ta'lim Shakli",
    "Holati",
    "Izohlar",
    "Yuborilgan Vaqt",
  ];

  const statusMap: Record<string, string> = {
    new: "Yangi",
    contacted: "Bog'lanildi",
    enrolled: "Qabul qilindi",
    rejected: "Rad etildi",
  };

  const rows = leads.map((lead) => [
    escapeCsvField(lead.id),
    escapeCsvField(lead.confirmationId),
    escapeCsvField(lead.fullName),
    escapeCsvField(lead.phone),
    escapeCsvField(lead.selectedFaculty),
    escapeCsvField(lead.degree),
    escapeCsvField(lead.language),
    escapeCsvField(lead.studyType),
    escapeCsvField(statusMap[lead.status] || lead.status),
    escapeCsvField(lead.notes),
    escapeCsvField(new Date(lead.submittedAt).toLocaleString("uz-UZ")),
  ]);

  const csvContent = "\uFEFF" + [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\r\n");

  const todayStr = new Date().toISOString().slice(0, 10);
  const filename = `kiut_samarqand_arizalar_${todayStr}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
