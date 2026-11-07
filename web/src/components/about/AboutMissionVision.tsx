import React from "react";
import { Award, Building2, Globe2 } from "lucide-react";

interface MissionVisionProps {
  mission: string;
  vision: string;
  values: string;
  missionTitle?: string;
  visionTitle?: string;
  valuesTitle?: string;
}

export function AboutMissionVision({
  mission,
  vision,
  values,
  missionTitle = "Universitet Missiyasi",
  visionTitle = "Strategik Maqsad",
  valuesTitle = "Asosiy Qadriyatlar",
}: MissionVisionProps) {
  const cards = [
    {
      title: missionTitle,
      description: mission,
      icon: Award,
      badge: "Missiya",
      color: "text-[#0096DB] bg-blue-50 border-blue-100",
    },
    {
      title: visionTitle,
      description: vision,
      icon: Globe2,
      badge: "Kelajak",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: valuesTitle,
      description: values,
      icon: Building2,
      badge: "Qadriyat",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${c.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {c.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {c.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
