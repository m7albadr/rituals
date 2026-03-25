"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, images.length - 1));
      setCurrent(clamped);
      scrollRef.current?.children[clamped]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [images.length]
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const width = el.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== current) setCurrent(newIndex);
  }, [current]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {images.map((img, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-start">
            <img
              src={img}
              alt={`Chalet photo ${i + 1}`}
              className="w-full aspect-[16/10] object-cover object-center bg-brand-border dark:bg-dark-card"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollTo(current - 1)}
        className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-4 h-4 text-brand-charcoal" />
      </button>
      <button
        onClick={() => scrollTo(current + 1)}
        className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-4 h-4 text-brand-charcoal" />
      </button>

      <div className="absolute bottom-4 start-1/2 -translate-x-1/2 bg-[rgba(24,22,20,0.6)] backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-xs text-white">
          {current + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
