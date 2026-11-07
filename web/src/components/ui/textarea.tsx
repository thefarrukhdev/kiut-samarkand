import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096DB] focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-y",
          error && "border-rose-400 focus:ring-rose-500 bg-rose-50/20",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
