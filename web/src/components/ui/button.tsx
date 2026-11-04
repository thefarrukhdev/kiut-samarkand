import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow focus-visible:ring-primary",
        action:
          "bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 focus-visible:ring-accent",
        navy:
          "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow focus-visible:ring-primary",
        royal:
          "bg-primary-royal text-white hover:bg-primary shadow-sm hover:shadow focus-visible:ring-primary-royal",
        accent:
          "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow focus-visible:ring-accent",
        secondary:
          "bg-white text-primary border border-slate-200 hover:bg-surface hover:border-slate-300 shadow-xs",
        outline:
          "border-2 border-white/80 text-white hover:bg-white/10 focus-visible:ring-white",
        ghost:
          "text-slate-700 hover:bg-accent-light hover:text-primary",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-7 text-base font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
