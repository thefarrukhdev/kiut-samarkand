"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { AdmissionLeadForm } from "@/components/shared/AdmissionLeadForm";
import { useTranslation, useLocale, translations } from "@/lib/i18n";
import type { Locale } from "@/types";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFaculty?: string;
  initialFaculty?: string;
  currentLocale?: Locale;
}

export function AdmissionModal({
  isOpen,
  onClose,
  defaultFaculty = "Tibbiyot fakulteti",
  initialFaculty,
  currentLocale: propLocale,
}: AdmissionModalProps) {
  const { locale: contextLocale } = useLocale();
  const { t: contextT } = useTranslation("admission");
  const currentLocale = propLocale || contextLocale;
  const t = propLocale ? translations[propLocale]?.admission || contextT : contextT;

  const closeButtonLabel =
    currentLocale === "ru" ? "Закрыть" : currentLocale === "en" ? "Close" : "Yopish";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      closeButtonLabel={closeButtonLabel}
      title={
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-accent mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{t.badge}</span>
          </div>
          <h3 className="text-xl font-black text-primary">{t.formTitle}</h3>
        </div>
      }
      description={t.formSubtitle}
    >
      <AdmissionLeadForm
        currentLocale={currentLocale}
        initialFaculty={initialFaculty || defaultFaculty}
        variant="light"
        showTitles={false}
      />
    </Modal>
  );
}
