import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  subtitle,
  icon,
  iconBg = "bg-blue-50 text-[#0096DB]",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconBg)}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <span className="text-3xl font-extrabold text-slate-900">{value}</span>
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}
