"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleShareBarProps {
  title: string;
  shareHeading?: string;
  copyToastLabel?: string;
}

export function ArticleShareBar({
  title,
  shareHeading = "Maqolani ulashish:",
  copyToastLabel = "Havola nusxalandi!",
}: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  const handleShareTelegram = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      window.open(
        `https://t.me/share/url?url=${url}&text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Share2 className="w-4 h-4 text-[#0096DB]" />
        <span>{shareHeading}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShareTelegram}
          className="text-xs"
        >
          Telegram
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShareFacebook}
          className="text-xs"
        >
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="text-xs flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{copyToastLabel}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Nusxalash</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
