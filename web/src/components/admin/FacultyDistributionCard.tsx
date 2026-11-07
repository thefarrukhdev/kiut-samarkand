import React from "react";

interface FacultyDistributionCardProps {
  distribution: Record<string, number>;
  totalLeads: number;
}

export function FacultyDistributionCard({
  distribution,
  totalLeads,
}: FacultyDistributionCardProps) {
  const entries = Object.entries(distribution);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          Fakultetlar Bo&apos;yicha Taqsimot
        </h2>
        <span className="text-xs text-slate-500 font-medium">Arizalar soni</span>
      </div>

      <div className="space-y-3.5">
        {entries.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            Ma&apos;lumot mavjud emas
          </p>
        ) : (
          entries.map(([faculty, count]) => {
            const percentage =
              totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;

            return (
              <div key={faculty} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{faculty}</span>
                  <span className="text-slate-500">
                    {count} ta ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0096DB] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
