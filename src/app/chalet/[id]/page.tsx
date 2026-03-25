"use client";

import { use, useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DetailShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { getChaletById } from "@/lib/data";
import { calculateStay, formatDate } from "@/lib/pricing";
import { Calendar } from "@/components/calendar";
import { Lightbox } from "@/components/lightbox";
import { useToast } from "@/components/toast";
import { FadeIn, StaggerChildren, StaggerItem, motion, AnimatePresence } from "@/components/motion";
import {
  ChevronLeftIcon,
  ShareIcon,
  MapPinIcon,
  RoomsIcon,
  BathroomIcon,
  UsersIcon,
  WifiIcon,
  PoolIcon,
  SunIcon,
  MoonIcon,
  getAmenityIcon,
  getRuleIcon,
} from "@/components/icons";

const policyColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  success: { bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", text: "text-green-700 dark:text-green-400", dot: "bg-green-500" },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  error: { bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
  info: { bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", text: "text-blue-700 dark:text-blue-400", dot: "bg-blue-500" },
};

/* ── Track recently viewed ────────────────────────────────── */
function useTrackViewed(id: string) {
  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [id, ...stored.filter((x) => x !== id)].slice(0, 10);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [id]);
}

/* ── Mobile Carousel with counter ─────────────────────────── */
function MobileCarousel({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.min(idx, images.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [images.length]);

  return (
    <div className="relative md:hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide snap-smooth"
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            className="snap-center shrink-0 w-full h-[300px] relative"
          >
            <Image
              src={img}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover will-change-transform"
              sizes="100vw"
              priority={i === 0}
              unoptimized
            />
          </button>
        ))}
      </div>
      {/* Image counter */}
      <div className="absolute bottom-3 end-4 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
        {active + 1} / {images.length}
      </div>
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-200 ${
              i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Desktop Gallery — hero + 2 side images ─────────────────── */
function DesktopGallery({ images, onOpen, t }: { images: string[]; onOpen: (i: number) => void; t: (key: string, params?: Record<string, string | number>) => string }) {
  return (
    <div className="hidden md:block relative rounded-2xl overflow-hidden max-h-[520px]">
      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[520px]">
        {/* Hero — spans 2 cols, 2 rows */}
        <button
          onClick={() => onOpen(0)}
          className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
        >
          <Image
            src={images[0]}
            alt="Main photo"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] will-change-transform"
            sizes="66vw"
            priority
            unoptimized
          />
        </button>

        {/* 2 stacked side images */}
        {images.slice(1, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => onOpen(i + 1)}
            className="relative overflow-hidden group cursor-pointer"
          >
            <Image
              src={img}
              alt={`Photo ${i + 2}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] will-change-transform"
              sizes="33vw"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Image counter + "Show all photos" button */}
      <div className="absolute bottom-4 end-4 flex items-center gap-2">
        <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-2 rounded-full">
          1 / {images.length}
        </span>
        {images.length > 3 && (
          <button
            onClick={() => onOpen(0)}
            className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-brand-charcoal dark:text-brand-ivory text-xs font-medium px-4 py-2.5 rounded-full border border-brand-border dark:border-dark-border hover:bg-white dark:hover:bg-dark-card transition-colors shadow-sm"
          >
            {t("chalet.allPhotos")}
          </button>
        )}
      </div>
    </div>
  );
}

function ChaletDetailContent({ id }: { id: string }) {
  const { locale, t, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { showToast } = useToast();
  const chalet = getChaletById(id);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  useTrackViewed(id);

  if (!chalet) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-brand-muted">Chalet not found</p></div>;
  }

  const name = locale === "ar" ? chalet.nameAr : chalet.name;
  const address = locale === "ar" ? chalet.addressAr : chalet.address;
  const about = locale === "ar" ? chalet.aboutAr : chalet.about;
  const currency = t("chalet.currency");

  const handleDateSelect = useCallback((ci: Date | null, co: Date | null) => {
    setCheckIn(ci);
    setCheckOut(co);
  }, []);

  const stay = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return calculateStay(chalet, checkIn, checkOut);
  }, [checkIn, checkOut, chalet]);

  const nightCount = stay?.nightCount ?? 0;
  const totalPrice = stay?.total ?? 0;

  const fmtDate = (d: Date) => formatDate(d, locale);

  const handleContinue = () => {
    if (!checkIn || !checkOut) return;
    const params = new URLSearchParams({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
    });
    router.push(`/checkout/${chalet.id}?${params.toString()}`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Rituals - ${name}`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast(t("share.linkCopied"));
      }
    } catch {
      // user cancelled share
    }
  };

  const statBadges = [
    { icon: RoomsIcon, label: `${chalet.rooms} ${t("chalet.rooms")}` },
    { icon: BathroomIcon, label: `${chalet.bathrooms} ${t("chalet.bathrooms")}` },
    { icon: UsersIcon, label: `${chalet.maxGuests} ${t("chalet.guests")}` },
    ...(chalet.hasWifi ? [{ icon: WifiIcon, label: t("amenityLabels.wifi") }] : []),
    ...(chalet.hasPool ? [{ icon: PoolIcon, label: t("amenityLabels.pool") }] : []),
  ];

  const ruleGroups = [
    { id: "timing", label: t("ruleGroups.timing"), rules: chalet.rules.filter(r => r.icon === "clock") },
    { id: "capacity", label: t("ruleGroups.capacity"), rules: chalet.rules.filter(r => r.icon === "users") },
    { id: "stay", label: t("ruleGroups.stay"), rules: chalet.rules.filter(r => r.icon === "calendar") },
    { id: "rental", label: t("ruleGroups.rental"), rules: chalet.rules.filter(r => r.icon === "link") },
  ].filter(g => g.rules.length > 0);

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-brand-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl px-5 py-3 flex items-center justify-between transition-colors">
        <Link href="/" className="flex items-center gap-2 text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{t("chalet.back")}</span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold hover:bg-brand-gold/5 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
          </button>
          <button onClick={toggleLocale} className="text-[10px] font-semibold tracking-wider border border-brand-gold/30 rounded-full px-3 py-1.5 text-brand-charcoal dark:text-brand-ivory hover:border-brand-gold transition-colors">
            {t("nav.langToggle")}
          </button>
          <button onClick={handleShare} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-brand-gold/5 transition-colors" aria-label={t("chalet.share")}>
            <ShareIcon className="w-5 h-5 text-brand-charcoal dark:text-brand-ivory" />
          </button>
        </div>
      </div>

      {/* Photo Gallery */}
      <MobileCarousel images={chalet.images} onOpen={setLightboxIndex} />
      <DesktopGallery images={chalet.images} onOpen={setLightboxIndex} t={t} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={chalet.images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto px-6 pb-32 md:pb-16">
        <div className="md:grid md:grid-cols-[1fr_380px] md:gap-12 mt-8">

          {/* Left column — scrollable content */}
          <div>
            {/* Header info */}
            <FadeIn>
              <p className="text-[9px] uppercase tracking-[2px] font-semibold text-brand-gold">{address}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal dark:text-brand-ivory mt-2">{name}</h1>

              <div className="flex flex-wrap gap-2 mt-5">
                {statBadges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-full px-4 py-2.5">
                    <Icon className="w-4 h-4 text-brand-gold" />
                    <span className="text-[11px] text-brand-muted dark:text-dark-muted">{label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* About — quote style */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.about")}</span></div>
              <div className="relative ps-6 mt-4">
                <div className="absolute start-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-gold to-brand-gold/20 rounded-full" />
                <p className="font-serif text-xl md:text-2xl italic text-brand-charcoal dark:text-brand-ivory leading-relaxed">{about}</p>
              </div>
            </FadeIn>

            {/* Pricing cards */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.pricing")}</span></div>
              <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4" stagger={0.05}>
                {chalet.pricing.map((row, i) => (
                  <StaggerItem key={i}>
                    <div className={`relative rounded-xl p-4 text-center transition-all hover:shadow-md ${
                      row.isBundle
                        ? "bg-brand-gold/10 border-2 border-brand-gold dark:bg-brand-gold/10"
                        : "bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border"
                    }`}>
                      {row.isBundle && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-gold text-white text-[8px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                          {t("chalet.weekendBundle")}
                        </span>
                      )}
                      <p className={`text-[11px] font-medium mt-1 ${row.isBundle ? "text-brand-gold" : "text-brand-muted dark:text-dark-muted"}`}>
                        {locale === "ar" ? row.periodAr : row.period}
                      </p>
                      <p className="font-serif text-2xl font-medium text-brand-charcoal dark:text-brand-ivory mt-2">
                        {row.rate}
                        <span className="text-xs font-sans text-brand-muted dark:text-dark-muted ms-1">{currency}</span>
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </FadeIn>

            {/* Amenities grid */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.amenities")}</span></div>
              <StaggerChildren className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 mt-4" stagger={0.04}>
                {chalet.amenities.map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <StaggerItem key={amenity}>
                      <div className="group flex flex-col items-center gap-2 py-3 cursor-default" title={t(`amenityLabels.${amenity}`)}>
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border flex items-center justify-center transition-all group-hover:border-brand-gold group-hover:shadow-md group-hover:shadow-brand-gold/10">
                          <Icon className="w-5 h-5 text-brand-gold" />
                        </div>
                        <span className="text-[10px] text-brand-muted dark:text-dark-muted capitalize text-center leading-tight">{t(`amenityLabels.${amenity}`)}</span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </FadeIn>

            {/* Rules — accordion */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.rules")}</span></div>
              <div className="mt-4 space-y-2">
                {ruleGroups.map((group) => {
                  const isOpen = expandedRule === group.id;
                  const Icon = getRuleIcon(group.rules[0].icon);
                  return (
                    <div key={group.id} className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedRule(isOpen ? null : group.id)}
                        className="w-full flex items-center gap-3 px-5 py-4 text-start"
                        aria-expanded={isOpen}
                      >
                        <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-brand-gold" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{group.label}</span>
                        <ChevronLeftIcon className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${isOpen ? "rotate-90" : "-rotate-90"}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 space-y-2">
                              {group.rules.map((rule, i) => (
                                <p key={i} className="text-sm text-brand-muted dark:text-dark-muted ps-12">{locale === "ar" ? rule.textAr : rule.text}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Policies — timeline */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.cancellationPolicy")}</span></div>
              <div className="mt-4 relative ps-8">
                <div className="absolute start-3 top-2 bottom-2 w-px bg-gradient-to-b from-green-500 via-amber-500 to-red-500" />
                {chalet.cancellationPolicy.map((item, i) => {
                  const c = policyColors[item.type] || policyColors.info;
                  return (
                    <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                      <div className={`absolute start-[-20px] top-1.5 w-2.5 h-2.5 rounded-full ${c.dot} ring-2 ring-brand-cream dark:ring-dark-bg`} />
                      <p className={`text-sm ${c.text}`}>{locale === "ar" ? item.textAr : item.text}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn className="mt-8">
              <div className="section-label py-3"><span>{t("chalet.modificationPolicy")}</span></div>
              <div className="mt-4 relative ps-8">
                <div className="absolute start-3 top-2 bottom-2 w-px bg-gradient-to-b from-green-500 via-amber-500 to-red-500" />
                {chalet.modificationPolicy.map((item, i) => {
                  const c = policyColors[item.type] || policyColors.info;
                  return (
                    <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                      <div className={`absolute start-[-20px] top-1.5 w-2.5 h-2.5 rounded-full ${c.dot} ring-2 ring-brand-cream dark:ring-dark-bg`} />
                      <p className={`text-sm ${c.text}`}>{locale === "ar" ? item.textAr : item.text}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Location with Map */}
            <FadeIn className="mt-10">
              <div className="section-label py-3"><span>{t("chalet.location")}</span></div>
              <div className="mt-4 rounded-xl overflow-hidden border border-brand-border dark:border-dark-border">
                <div className="h-[200px] bg-brand-border dark:bg-dark-border">
                  <iframe
                    src="https://www.google.com/maps?q=Al+Khiran,+Kuwait&z=13&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chalet location"
                  />
                </div>
                <a
                  href={chalet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-dark-card p-4 hover:bg-brand-cream dark:hover:bg-dark-border/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                      <MapPinIcon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{address}</p>
                      <p className="text-xs text-brand-gold mt-0.5 group-hover:underline">{t("chalet.openInMaps")}</p>
                    </div>
                    <ChevronLeftIcon className="w-4 h-4 text-brand-muted -rotate-180" />
                  </div>
                </a>
              </div>
            </FadeIn>

            {/* Calendar — mobile only shows here */}
            <FadeIn className="mt-10 md:hidden">
              <Calendar chalet={chalet} checkIn={checkIn} checkOut={checkOut} onSelect={handleDateSelect} />
            </FadeIn>

          </div>

          {/* Right column — sticky booking sidebar (desktop only) */}
          <div className="hidden md:block">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-medium text-brand-charcoal dark:text-brand-ivory">{chalet.basePrice}</span>
                  <span className="text-sm text-brand-muted dark:text-dark-muted">{currency} {t("chalet.perNight")}</span>
                </div>

                <div className="mt-6">
                  <Calendar chalet={chalet} checkIn={checkIn} checkOut={checkOut} onSelect={handleDateSelect} />
                </div>

                {checkIn && checkOut && (
                  <div className="mt-6 pt-4 border-t border-brand-border dark:border-dark-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-muted dark:text-dark-muted">{fmtDate(checkIn)} &rarr; {fmtDate(checkOut)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-muted dark:text-dark-muted">{nightCount} {nightCount === 1 ? t("chalet.night") : t("chalet.nights")}</span>
                      <span className="font-serif text-lg font-medium text-brand-charcoal dark:text-brand-ivory">{totalPrice} {currency}</span>
                    </div>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted">{t("chalet.estimated")}</p>
                  </div>
                )}

                <button
                  onClick={checkIn && checkOut ? handleContinue : () => {}}
                  disabled={!checkIn || !checkOut}
                  className="w-full mt-6 bg-brand-gold text-white rounded-full py-4 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                >
                  {checkIn && checkOut ? t("chalet.continue") : t("chalet.selectDates")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 24 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl border-t border-brand-border dark:border-dark-border px-6 py-4 z-40"
      >
        <div className="flex items-center justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.span
                key={checkIn && checkOut ? "total" : "base"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-serif text-xl font-medium text-brand-charcoal dark:text-brand-ivory inline-block"
              >
                {checkIn && checkOut ? totalPrice : chalet.basePrice} {currency}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs text-brand-muted dark:text-dark-muted ms-1">
              {checkIn && checkOut ? t("chalet.total").toLowerCase() : t("chalet.perNight")}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={checkIn && checkOut ? handleContinue : () => document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" })}
            className={`bg-brand-gold text-white rounded-full px-7 py-3 text-[13px] font-semibold hover:bg-brand-gold/90 transition-all ${checkIn && checkOut ? "animate-gold-glow" : ""}`}
          >
            {checkIn && checkOut ? t("chalet.continue") : t("chalet.selectDates")}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default function ChaletDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <DetailShell>
      <ChaletDetailContent id={id} />
    </DetailShell>
  );
}
