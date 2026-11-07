import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { dbNewsToEnrichedArticle } from "@/lib/db/converter";
import type { Locale } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") || "uz") as Locale;

  const dbItems = db.getNews({ publishedOnly: true });

  const articles = dbItems.map((item, idx) =>
    dbNewsToEnrichedArticle(item, locale, idx)
  );

  return NextResponse.json({
    success: true,
    total: articles.length,
    articles,
  });
}
