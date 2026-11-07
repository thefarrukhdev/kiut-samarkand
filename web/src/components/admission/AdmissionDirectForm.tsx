"use client";

import React from "react";
import { useLocale } from "@/lib/i18n";
import { AdmissionLeadForm } from "@/components/shared/AdmissionLeadForm";

export function AdmissionDirectForm() {
  const { locale } = useLocale();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      <AdmissionLeadForm
        currentLocale={locale}
        variant="light"
        showTitles={true}
      />
    </div>
  );
}
