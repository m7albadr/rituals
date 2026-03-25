"use client";

import Link from "next/link";
import { MinimalShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { WhatsAppIcon, InstagramIcon, PhoneIcon, ExternalLinkIcon, SunIcon, MoonIcon, ChevronLeftIcon } from "@/components/icons";

function ReachContent() {
  const { t, locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const isBusinessHours = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 5) return false;
    return hour >= 9 && hour < 22;
  };

  const online = isBusinessHours();

  const contacts = [
    { href: "https://wa.me/96595512717", icon: WhatsAppIcon, iconClass: "text-green-600", label: t("reach.whatsapp"), detail: "+965 9551 2717", external: true },
    { href: "https://instagram.com/ritualsq8", icon: InstagramIcon, iconClass: "text-pink-600", label: t("reach.instagram"), detail: "@ritualsq8", external: true },
    { href: "tel:96595512717", icon: PhoneIcon, iconClass: "text-brand-gold", label: t("reach.callUs"), detail: "+965 9551 2717", external: false },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left — brand gradient */}
      <div className="relative md:w-1/2 h-[40vh] md:h-screen md:sticky md:top-0 overflow-hidden bg-brand-charcoal">
        {/* Abstract pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-gold/20" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-gold/10 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-16 h-px bg-brand-gold/40 mb-6" />
          <p className="font-serif text-5xl md:text-6xl text-white">Rituals</p>
          <p className="text-base text-brand-gold mt-3">{t("reach.getInTouch")}</p>
          <div className="w-16 h-px bg-brand-gold/40 mt-6" />
        </div>
      </div>

      {/* Right — contact info */}
      <div className="flex-1 bg-brand-cream dark:bg-dark-bg px-6 md:px-12 py-12 md:py-16 flex flex-col justify-center relative">
        {/* Top navbar */}
        <div className="absolute top-0 start-0 end-0 flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold transition-colors">
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-medium">{t("manage.backHome")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold hover:bg-brand-gold/5 transition-colors" aria-label="Toggle theme">
              {theme === "dark" ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
            </button>
            <button onClick={toggleLocale} className="text-[10px] font-semibold tracking-wider border border-brand-gold/30 rounded-full px-3.5 py-1.5 text-brand-charcoal dark:text-brand-ivory hover:border-brand-gold transition-colors">
              {t("nav.langToggle")}
            </button>
          </div>
        </div>

        <div className="max-w-sm mx-auto w-full">
          {/* Availability indicator */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <span className={`block w-3 h-3 rounded-full ${online ? "bg-green-500 pulse-dot" : "bg-red-500"}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">
                  {online ? t("reach.wereOnline") : t("reach.respondTomorrow")}
                </p>
                <p className="text-xs text-brand-muted dark:text-dark-muted">{t("reach.hours")}</p>
              </div>
            </div>
          </FadeIn>

          {/* Contact cards */}
          <StaggerChildren className="space-y-3" stagger={0.08}>
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.href}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl px-5 py-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className={`w-5 h-5 ${c.iconClass}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{c.label}</p>
                      <p className="text-xs text-brand-muted dark:text-dark-muted">{c.detail}</p>
                    </div>
                    <ExternalLinkIcon className="w-4 h-4 text-brand-muted dark:text-dark-muted" />
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerChildren>

          {/* Response time */}
          <FadeIn className="text-center mt-8" delay={0.3}>
            <p className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{t("reach.responseTime")}</p>
          </FadeIn>

          {/* QR Code */}
          <FadeIn className="mt-8" delay={0.35}>
            <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-brand-cream dark:bg-dark-bg rounded-lg flex items-center justify-center mb-3">
                {/* QR code placeholder — replace with actual QR image */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-brand-charcoal dark:text-brand-ivory">
                  <rect x="10" y="10" width="25" height="25" fill="currentColor" />
                  <rect x="65" y="10" width="25" height="25" fill="currentColor" />
                  <rect x="10" y="65" width="25" height="25" fill="currentColor" />
                  <rect x="15" y="15" width="15" height="15" rx="2" fill="var(--color-brand-cream)" className="dark:fill-[var(--color-dark-bg)]" />
                  <rect x="70" y="15" width="15" height="15" rx="2" fill="var(--color-brand-cream)" className="dark:fill-[var(--color-dark-bg)]" />
                  <rect x="15" y="70" width="15" height="15" rx="2" fill="var(--color-brand-cream)" className="dark:fill-[var(--color-dark-bg)]" />
                  <rect x="19" y="19" width="7" height="7" fill="currentColor" />
                  <rect x="74" y="19" width="7" height="7" fill="currentColor" />
                  <rect x="19" y="74" width="7" height="7" fill="currentColor" />
                  <rect x="42" y="10" width="5" height="5" fill="currentColor" />
                  <rect x="50" y="18" width="5" height="5" fill="currentColor" />
                  <rect x="42" y="26" width="5" height="5" fill="currentColor" />
                  <rect x="42" y="42" width="5" height="5" fill="currentColor" />
                  <rect x="50" y="42" width="5" height="5" fill="currentColor" />
                  <rect x="58" y="42" width="5" height="5" fill="currentColor" />
                  <rect x="65" y="42" width="5" height="5" fill="currentColor" />
                  <rect x="42" y="50" width="5" height="5" fill="currentColor" />
                  <rect x="65" y="50" width="5" height="5" fill="currentColor" />
                  <rect x="75" y="50" width="5" height="5" fill="currentColor" />
                  <rect x="85" y="50" width="5" height="5" fill="currentColor" />
                  <rect x="65" y="65" width="25" height="25" fill="currentColor" />
                  <rect x="70" y="70" width="15" height="15" rx="2" fill="var(--color-brand-cream)" className="dark:fill-[var(--color-dark-bg)]" />
                  <rect x="74" y="74" width="7" height="7" fill="currentColor" />
                </svg>
              </div>
              <p className="text-xs text-brand-muted dark:text-dark-muted">{t("reach.scanToSave")}</p>
            </div>
          </FadeIn>

          {/* Save contact + Book */}
          <FadeIn className="space-y-3 mt-6" delay={0.4}>
            <a
              href="/api/reach/vcard"
              download
              className="block w-full bg-brand-gold text-white text-center rounded-full py-3.5 text-sm font-semibold hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/20"
            >
              {t("reach.saveContact")}
            </a>
            <Link
              href="/"
              className="block w-full bg-brand-charcoal dark:bg-brand-ivory text-white dark:text-brand-charcoal text-center rounded-full py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t("reach.bookNow")}
            </Link>
          </FadeIn>

          {/* Footer */}
          <FadeIn className="mt-12 text-center space-y-1" delay={0.5}>
            <Link href="/" className="text-xs text-brand-muted dark:text-dark-muted hover:text-brand-gold transition-colors block">
              Rituals
            </Link>
            <p className="text-xs text-brand-muted dark:text-dark-muted">&copy; Rituals 2026</p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export default function ReachPage() {
  return (
    <MinimalShell>
      <ReachContent />
    </MinimalShell>
  );
}
