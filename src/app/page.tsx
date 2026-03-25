"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SlideIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { chalets, getChaletById } from "@/lib/data";
import {
  ChevronRightIcon,
  DirectBookIcon,
  BeachIcon,
  HeadsetIcon,
  FlexibleIcon,
} from "@/components/icons";

function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={chalets[0].images[0]}
          alt="Luxury chalet"
          className="w-full h-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl text-white"
        >
          Rituals
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center gap-4 justify-center mt-6"
        >
          <span className="flex-1 max-w-[60px] h-px bg-white/30" />
          <span className="text-[9px] font-semibold uppercase tracking-[3px] text-brand-gold">
            {t("hero.discover")}
          </span>
          <span className="flex-1 max-w-[60px] h-px bg-white/30" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl text-white mt-5 leading-tight"
        >
          {t("hero.title")}{" "}
          <em className="text-shimmer not-italic">{t("hero.titleItalic")}</em>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-sm md:text-base text-white/60 mt-4 font-light"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-block"
          >
            <Link
              href="#chalets"
              className="inline-flex items-center gap-2 bg-brand-gold text-white rounded-full px-8 py-3.5 text-[13px] font-semibold hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/25"
            >
              {t("hero.discover")}
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[2px] text-white/40">{t("hero.scroll")}</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}

function WhyRitualsSection() {
  const { t } = useI18n();

  const props = [
    { icon: DirectBookIcon, key: "noMiddleman" },
    { icon: BeachIcon, key: "beachAccess" },
    { icon: HeadsetIcon, key: "support" },
    { icon: FlexibleIcon, key: "freeCancellation" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <FadeIn className="text-center mb-12">
        <div className="section-label py-3">
          <span>{t("whyRituals.title")}</span>
        </div>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={0.1}>
        {props.map(({ icon: Icon, key }) => (
          <StaggerItem key={key}>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center transition-all group-hover:bg-brand-gold/20 group-hover:border-brand-gold/40 group-hover:shadow-lg group-hover:shadow-brand-gold/10">
                <Icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory mt-4">
                {t(`whyRituals.${key}`)}
              </h3>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-1.5 leading-relaxed">
                {t(`whyRituals.${key}Desc`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton rounded-2xl" />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function ChaletCard({ chalet, index }: { chalet: (typeof chalets)[0]; index: number }) {
  const { locale, t } = useI18n();
  const name = locale === "ar" ? chalet.nameAr : chalet.name;
  const address = locale === "ar" ? chalet.addressAr : chalet.address;
  const currency = t("chalet.currency");
  const isFeatured = index === 0;

  const badge = chalet.amenities.includes("beach")
    ? t("badges.beachfront")
    : chalet.amenities.includes("jacuzzi")
    ? t("badges.jacuzzi")
    : null;

  const hasWeekdaySaving = chalet.pricing.some((p) => !p.isBundle && p.rate < (chalet.pricing.find((pp) => pp.isBundle)?.rate ?? Infinity));

  return (
    <StaggerItem>
      <Link href={`/chalet/${chalet.id}`} className="group block">
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`relative overflow-hidden rounded-2xl ${
            isFeatured ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5] md:aspect-square"
          }`}
        >
          {/* Image with skeleton */}
          <ImageWithSkeleton
            src={chalet.images[0]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Badge — top left */}
          {badge && (
            <div className="absolute top-4 start-4 bg-brand-gold/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
              {badge}
            </div>
          )}

          {/* Price badge — frosted glass */}
          <div className="absolute top-4 end-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2">
            <span className="font-serif text-sm text-white">
              {chalet.basePrice} {currency}
              <span className="text-[10px] font-sans font-light ms-1">{t("chalet.perNight")}</span>
            </span>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[9px] uppercase tracking-[2px] font-semibold text-brand-gold">
              {address}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-white mt-1">{name}</h3>
            <p className="text-[11px] text-white/50 mt-1">
              {chalet.rooms} {t("chalet.rooms")} &middot; {chalet.maxGuests} {t("chalet.guests")}
            </p>

            {/* Weekday savings tag */}
            {hasWeekdaySaving && (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm text-green-300 text-[10px] font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {t("badges.weekdaySave")}
              </div>
            )}

            {/* View details — appears on hover */}
            <div className="mt-3 overflow-hidden">
              <div className="flex items-center gap-1.5 text-brand-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>{t("hero.viewDetails")}</span>
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileInView={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </StaggerItem>
  );
}

function ChaletsSection() {
  const { t } = useI18n();
  const [filter, setFilter] = useState("all");
  const locations = ["all", "Al Khiran"];

  return (
    <section id="chalets" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-24">
      <FadeIn className="text-center mb-12">
        <div className="section-label py-3">
          <span>{t("hero.discover")}</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal dark:text-brand-ivory mt-3">
          {t("hero.collection")}
        </h2>
      </FadeIn>

      {/* Filter pills */}
      <FadeIn className="flex justify-center gap-3 mb-12" delay={0.1}>
        {locations.map((loc) => {
          const isActive = filter === loc;
          return (
            <button
              key={loc}
              onClick={() => setFilter(loc)}
              className={`text-[11px] font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-brand-gold text-white border-brand-gold shadow-md shadow-brand-gold/20"
                  : "bg-white dark:bg-dark-card text-brand-muted dark:text-dark-muted border-brand-border dark:border-dark-border hover:border-brand-gold/40"
              }`}
            >
              {loc === "all" ? t("filter.all") : t("filter.alKhiran")}
            </button>
          );
        })}
      </FadeIn>

      {/* Bento grid */}
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
        {chalets.map((chalet, i) => (
          <ChaletCard key={chalet.id} chalet={chalet} index={i} />
        ))}
      </StaggerChildren>
    </section>
  );
}

function RecentlyViewedSection() {
  const { t, locale } = useI18n();
  const [viewedChalets, setViewedChalets] = useState<typeof chalets>([]);

  useEffect(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const viewed = ids.map((id) => getChaletById(id)).filter(Boolean) as typeof chalets;
      setViewedChalets(viewed);
    } catch {
      // ignore
    }
  }, []);

  if (viewedChalets.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <FadeIn>
        <div className="section-label py-3 mb-8">
          <span>{t("recentlyViewed.title")}</span>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
          {viewedChalets.map((chalet) => {
            const name = locale === "ar" ? chalet.nameAr : chalet.name;
            const currency = t("chalet.currency");
            return (
              <Link
                key={chalet.id}
                href={`/chalet/${chalet.id}`}
                className="snap-start shrink-0 w-60 group"
              >
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <img
                    src={chalet.images[0]}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 start-3">
                    <p className="font-serif text-base text-white">{name}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">
                      {chalet.basePrice} {currency} {t("chalet.perNight")}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <WhyRitualsSection />
      <ChaletsSection />
      <RecentlyViewedSection />
    </>
  );
}

export default function Page() {
  return (
    <AppShell transparentHeader>
      <HomePage />
    </AppShell>
  );
}
