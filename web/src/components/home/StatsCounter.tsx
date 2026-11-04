"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Award,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { translations } from "@/lib/translations";
import type { Locale } from "@/types";

interface StatsCounterProps {
  currentLocale?: Locale;
}

const iconsMap: Record<
  string,
  {
    icon: React.ElementType;
    accentColor: string;
    bgGlow: string;
  }
> = {
  faculties: {
    icon: Building2,
    accentColor: "text-[#0096DB]",
    bgGlow: "bg-[#E9F2FF]",
  },
  bachelor: {
    icon: GraduationCap,
    accentColor: "text-[#2364AD]",
    bgGlow: "bg-[#E3EDFC]",
  },
  master: {
    icon: Award,
    accentColor: "text-[#0096DB]",
    bgGlow: "bg-[#E9F2FF]",
  },
  professors: {
    icon: BookOpen,
    accentColor: "text-[#2364AD]",
    bgGlow: "bg-[#E3EDFC]",
  },
  students: {
    icon: Users,
    accentColor: "text-[#0096DB]",
    bgGlow: "bg-[#E9F2FF]",
  },
};

function CounterDigit({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animId: number | null = null;
    const duration = 1800; // 1.8s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * value);
      setCount(currentVal);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsCounter({ currentLocale = "uz" }: StatsCounterProps) {
  const statsData = translations[currentLocale].stats;

  return (
    <section
      id="stats"
      aria-label="Universitet ko'rsatkichlari va statistikasi"
      className="bg-white py-14 sm:py-20 border-b border-slate-200 relative z-10"
    >
      <Container>
        {/* Section Header: Clean Academic Typography (NO pill badges) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-0.5 bg-[#0096DB] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0096DB]">
                {statsData.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#172D50] tracking-tight">
              {statsData.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed font-normal">
            {statsData.description}
          </p>
        </div>

        {/* 5 Architectural Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-10">
          {statsData.items.map((stat, idx) => {
            const meta = iconsMap[stat.id] || iconsMap.faculties;
            const Icon = meta.icon;

            return (
              <motion.div
                key={`${stat.id}-${currentLocale}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col group p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:bg-white hover:border-[#0096DB]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl ${meta.bgGlow} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className={`h-6 w-6 ${meta.accentColor}`} />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-[#172D50] tracking-tight">
                  <CounterDigit
                    value={stat.targetValue}
                    suffix={stat.suffix}
                  />
                </div>

                <h3 className="text-sm font-bold text-[#172D50] mt-2">
                  {stat.label}
                </h3>

                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
