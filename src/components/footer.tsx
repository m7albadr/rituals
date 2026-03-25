"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "./motion";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-brand-border dark:border-dark-border bg-brand-cream dark:bg-dark-bg transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-serif text-3xl text-brand-charcoal dark:text-brand-ivory">Rituals</p>
              <p className="text-sm text-brand-muted dark:text-dark-muted mt-2 max-w-xs">
                {t("footer.description")}
              </p>
            </div>
            <div className="flex gap-6 text-xs text-brand-muted dark:text-dark-muted">
              <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms" className="hover:text-brand-gold transition-colors">
                {t("footer.terms")}
              </Link>
              <Link href="/reach" className="hover:text-brand-gold transition-colors">
                {t("nav.reach")}
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-border dark:border-dark-border">
            <p className="text-xs text-brand-muted dark:text-dark-muted">{t("footer.rights")}</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
