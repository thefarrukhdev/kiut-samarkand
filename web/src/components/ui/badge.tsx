import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#172D50] text-white",
        accent: "bg-[#E9F2FF] text-[#0096DB] border border-[#0096DB]/25",
        action: "bg-[#E3EDFC] text-[#2364AD] border border-[#2364AD]/25",
        royal: "bg-[#2364AD] text-white",
        cyan: "bg-[#0096DB] text-white",
        gold: "bg-slate-100 text-[#172D50] border border-slate-200",
        outline: "border border-slate-200 text-slate-700 bg-white",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
