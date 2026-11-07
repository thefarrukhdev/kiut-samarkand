import React from "react";
import Link from "next/link";
import { Clock, Globe2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProgramItem } from "@/types";

interface ProgramCardProps {
  program: ProgramItem;
  viewDetailsLabel?: string;
  applyLabel?: string;
  onApply?: (facultyName: string) => void;
}

export function ProgramCard({
  program,
  viewDetailsLabel = "Batafsil ma'lumot",
  applyLabel = "Ariza topshirish",
  onApply,
}: ProgramCardProps) {
  const isMaster = program.degree === "master";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#0096DB]/40 transition-all group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {program.facultyName}
          </span>
          <Badge variant={isMaster ? "royal" : "default"}>
            {isMaster ? "Magistratura" : "Bakalavriat"}
          </Badge>
        </div>

        {/* Title */}
        <Link href={`/programs/${program.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0096DB] transition-colors leading-snug mb-2">
            {program.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {program.description}
        </p>

        {/* Meta badges: Duration & Languages */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#0096DB]" />
            <span>{program.duration}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5 font-medium">
            <Globe2 className="w-3.5 h-3.5 text-[#0096DB]" />
            <span>{program.languages.join(", ")}</span>
          </span>
        </div>

        {/* Career highlight */}
        {program.career && (
          <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
            <strong className="text-slate-800 font-semibold block mb-0.5">Kasbiy imkoniyatlar:</strong>
            <span className="line-clamp-1">{program.career}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          href={`/programs/${program.slug}`}
          className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>{viewDetailsLabel}</span>
          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        {onApply && (
          <Button
            size="sm"
            onClick={() => onApply(program.facultyName)}
            className="text-xs bg-[#0096DB] hover:bg-[#0085c4] text-white"
          >
            {applyLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
