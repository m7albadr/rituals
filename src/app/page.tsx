"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SlideIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { chalets } from "@/lib/data";
import { ChevronRightIcon } from "@/components/icons";

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

function ChaletCard({ chalet, index }: { chalet: (typeof chalets)[0]; index: number }) {
  const { locale, t } = useI18n();
  const name = locale === "ar" ? chalet.nameAr : chalet.name;
  const address = locale === "ar" ? chalet.addressAr : chalet.address;
  const currency = t("chalet.currency");
  const isFeatured = index === 0;

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
          {/* Image */}
          <img
            src={chalet.images[0]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

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

            {/* View details — appears on hover */}
            <div className="mt-4 overflow-hidden">
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

function HomePage() {
  return (
    <>
      <Hero />
      <ChaletsSection />
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
