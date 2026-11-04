import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        accent: "bg-accent-light text-accent border border-accent/25",
        action: "bg-ice-blue text-primary-royal border border-primary-royal/25",
        royal: "bg-primary-royal text-white",
        cyan: "bg-accent text-white",
        gold: "bg-slate-100 text-primary border border-slate-200",
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
