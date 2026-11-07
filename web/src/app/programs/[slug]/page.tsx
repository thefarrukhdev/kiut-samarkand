import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROGRAMS_DATA } from "@/data/programs";
import { ProgramDetailClient } from "@/components/programs/ProgramDetailClient";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  PROGRAMS_DATA.uz.forEach((p) => slugs.add(p.slug));
  PROGRAMS_DATA.ru.forEach((p) => slugs.add(p.slug));
  PROGRAMS_DATA.en.forEach((p) => slugs.add(p.slug));

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;

  const program =
    PROGRAMS_DATA.uz.find((p) => p.slug === slug) ||
    PROGRAMS_DATA.ru.find((p) => p.slug === slug) ||
    PROGRAMS_DATA.en.find((p) => p.slug === slug);

  if (!program) {
    return {
      title: "Yo'nalish topilmadi — KIUT Samarqand",
    };
  }

  return {
    title: `${program.name} — KIUT Samarqand`,
    description: program.description,
    keywords: [
      program.name,
      program.facultyName,
      "KIUT Samarqand",
      "Toshkent Kimyo Xalqaro Universiteti Samarqand",
      "Qabul 2026/2027",
    ],
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;

  const program =
    PROGRAMS_DATA.uz.find((p) => p.slug === slug) ||
    PROGRAMS_DATA.ru.find((p) => p.slug === slug) ||
    PROGRAMS_DATA.en.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetailClient initialProgram={program} />;
}
