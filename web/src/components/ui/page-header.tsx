import React from "react";
import { Container } from "./container";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative bg-[#172D50] text-white py-12 lg:py-16 overflow-hidden", className)}>
      {/* Decorative Glow Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0096DB]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none translate-y-1/2" />

      <Container className="relative z-10">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumb
              items={breadcrumbs}
              className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span.text-slate-900]:text-white [&_svg]:text-slate-400"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            {badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0096DB]/20 text-[#0096DB] border border-[#0096DB]/30 tracking-wide uppercase">
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}
