"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "./icons";

type LightboxProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchDelta = useRef({ x: 0, y: 0 });

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  // Keyboard nav + body lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = thumbsRef.current?.children[current] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchDelta.current = { x: 0, y: 0 };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    touchDelta.current = {
      x: e.touches[0].clientX - touchStart.current.x,
      y: e.touches[0].clientY - touchStart.current.y,
    };
  };

  const onTouchEnd = () => {
    const { x, y } = touchDelta.current;
    // Horizontal swipe to navigate
    if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y)) {
      if (x < 0) next();
      else prev();
    }
    // Vertical swipe down to close
    if (y > 100 && Math.abs(y) > Math.abs(x)) {
      onClose();
    }
    touchStart.current = null;
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 relative z-10" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5 text-white" />
        </button>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-sm text-white font-medium">{current + 1} / {images.length}</span>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0 px-2 md:px-16"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Desktop nav arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="hidden md:flex absolute start-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="hidden md:flex absolute end-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Next"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative max-h-[90vh] max-w-[95vw] md:max-h-[80vh] md:max-w-[85vw] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`Photo ${current + 1}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-lg will-change-transform"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
        <div
          ref={thumbsRef}
          className="flex gap-2 justify-center overflow-x-auto scrollbar-hide max-w-2xl mx-auto"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-white opacity-100 scale-105"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover will-change-transform"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
