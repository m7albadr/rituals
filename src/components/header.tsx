"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "./icons";

export function Header({ transparent = false }: { transparent?: boolean }) {
  const { t, locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.chalets"), href: "/#chalets" },
    { label: t("nav.manageReservation"), href: "/booking/lookup" },
    { label: t("nav.reach"), href: "/reach" },
  ];

  const showSolid = scrolled || menuOpen || !transparent;
  const textColor = transparent && !scrolled && !menuOpen
    ? "text-white"
    : "text-brand-charcoal dark:text-brand-ivory";

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolid
            ? "bg-brand-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto h-16 md:h-20 flex items-center justify-between px-6">
          <Link href="/" className={`font-serif text-2xl transition-colors duration-300 ${textColor}`}>
            Rituals
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[11px] uppercase tracking-[1.5px] font-medium transition-colors duration-200 hover:text-brand-gold ${
                    transparent && !scrolled ? "text-white/80 hover:text-white" : "text-brand-muted dark:text-dark-muted"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-brand-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                transparent && !scrolled
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold hover:bg-brand-gold/5"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
            </button>

            <button
              onClick={toggleLocale}
              className={`text-[10px] font-semibold tracking-wider rounded-full px-3.5 py-1.5 border transition-all ${
                transparent && !scrolled
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-brand-gold/30 text-brand-charcoal dark:text-brand-ivory hover:border-brand-gold hover:bg-brand-gold/5"
              }`}
            >
              {t("nav.langToggle")}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                transparent && !scrolled && !menuOpen
                  ? "text-white"
                  : "text-brand-charcoal dark:text-brand-ivory"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-cream dark:bg-dark-bg md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-serif text-3xl transition-colors ${
                        isActive
                          ? "text-brand-gold"
                          : "text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="pb-12 flex justify-center gap-6 text-xs text-brand-muted dark:text-dark-muted"
            >
              <a href="https://wa.me/96595512717" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp</a>
              <a href="https://instagram.com/ritualsq8" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Instagram</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
