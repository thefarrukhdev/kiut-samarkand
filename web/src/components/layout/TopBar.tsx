"use client";

import * as React from "react";
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { Container } from "@/components/ui/container";
import { useTranslation, translations } from "@/lib/i18n";
import type { Locale } from "@/types";

interface TopBarProps {
  currentLocale?: Locale;
}

export function TopBar({
  currentLocale: propLocale,
}: TopBarProps = {}) {
  const { t: contextT } = useTranslation("topbar");
  const t = propLocale ? (translations[propLocale]?.topbar || contextT) : contextT;

  return (
    <div className="bg-primary text-slate-300 text-xs border-b border-white/10 relative z-40 transition-colors">
      <Container className="flex items-center justify-between py-2 gap-4">
        {/* Left Side: Phone & Official Campus Address */}
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="tel:+998557024040"
            className="inline-flex items-center gap-2 hover:text-white transition-colors group font-semibold text-slate-200"
            title={t.phoneTitle}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
              <Phone className="h-3 w-3" />
            </span>
            <span>+998 (55) 702-40-40</span>
          </a>

          <a
            href="https://maps.google.com/?q=Samarqand+Spitamen+shoh+ko%27chasi+270"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 hover:text-white transition-colors group text-slate-300"
            title={t.addressTitle}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[#0096DB] group-hover:bg-[#0096DB] group-hover:text-white transition-all">
              <MapPin className="h-3 w-3" />
            </span>
            <span className="truncate max-w-[260px] lg:max-w-none">
              {t.address}
            </span>
          </a>

          <div className="hidden xl:inline-flex items-center gap-2 text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{t.hours}</span>
          </div>
        </div>

        {/* Right Side: HEMIS portal direct access & Socials (NO duplicate language switcher) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* HEMIS portal link */}
          <a
            href="https://hemis.kiut.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-[#0096DB] text-white text-[11px] font-bold tracking-wide transition-all shadow-xs"
            title={t.hemisTitle}
          >
            <span>{t.hemisLabel}</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>

          {/* Social Media Links */}
          <div className="flex items-center gap-1 text-slate-400 border-l border-white/10 pl-3">
            <a
              href="https://t.me/kiut_samarkand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="p-1 hover:text-[#0096DB] transition-colors rounded hover:bg-white/5"
            >
              <TelegramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://instagram.com/kiut_samarkand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 hover:text-[#0096DB] transition-colors rounded hover:bg-white/5"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://facebook.com/kiut.uz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 hover:text-[#0096DB] transition-colors rounded hover:bg-white/5"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://youtube.com/@kiutofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-1 hover:text-[#0096DB] transition-colors rounded hover:bg-white/5"
            >
              <YoutubeIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
