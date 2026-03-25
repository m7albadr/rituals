"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("rituals_splash_seen");
    if (seen) {
      setShow(false);
    } else {
      setShow(true);
      // Lock scroll during splash
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("rituals_splash_seen", "1");
    document.body.style.overflow = "";
    setShow(false);
  };

  // SSR / hydration: render children immediately, no splash flicker
  if (show === null) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-charcoal dark:bg-dark-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onAnimationComplete={(def: { opacity?: number }) => {
              if (def.opacity === 0) handleComplete();
            }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Decorative line top */}
              <motion.div
                className="h-px w-12 bg-brand-gold/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />

              {/* Brand name */}
              <motion.p
                className="font-serif text-5xl md:text-7xl text-brand-ivory tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                Rituals
              </motion.p>

              {/* Tagline */}
              <motion.p
                className="text-[10px] uppercase tracking-[4px] text-brand-gold font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Luxury Chalets
              </motion.p>

              {/* Decorative line bottom */}
              <motion.div
                className="h-px w-12 bg-brand-gold/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              />

              {/* Loading shimmer bar */}
              <motion.div
                className="mt-4 h-[2px] w-24 overflow-hidden rounded-full bg-brand-gold/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                <motion.div
                  className="h-full w-full bg-brand-gold/60 rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    delay: 1.3,
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: 1,
                  }}
                  onAnimationComplete={() => setShow(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content always mounted underneath */}
      <motion.div
        initial={show ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: show ? 0 : 1 }}
        transition={{ duration: 0.4, delay: show ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
