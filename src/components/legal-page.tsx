"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { FadeIn } from "@/components/motion";
import { ChevronLeftIcon } from "@/components/icons";

type Section = {
  title: string;
  content: string;
};

export function LegalPage({ title, lastUpdated, sections }: { title: string; lastUpdated: string; sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveSection(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <Link href="/" className="flex items-center gap-1 text-sm text-brand-muted dark:text-dark-muted hover:text-brand-gold transition-colors mb-8">
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal dark:text-brand-ivory">{title}</h1>
          <p className="text-sm text-brand-muted dark:text-dark-muted mt-2">Last updated: {lastUpdated}</p>
        </FadeIn>

        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-12 mt-10">
          {/* TOC sidebar — sticky on desktop */}
          <aside className="hidden md:block">
            <nav className="sticky top-24 space-y-1 max-h-[70vh] overflow-y-auto">
              {sections.map((section, i) => {
                const shortTitle = section.title.replace(/^Section \d+ —\s*/, "");
                return (
                  <button
                    key={i}
                    onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className={`block w-full text-start text-xs py-1.5 px-3 rounded-md transition-colors ${
                      activeSection === i
                        ? "text-brand-gold bg-brand-gold/5 font-medium"
                        : "text-brand-muted dark:text-dark-muted hover:text-brand-charcoal dark:hover:text-brand-ivory"
                    }`}
                  >
                    {shortTitle}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div
                key={i}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className={`scroll-mt-28 ${i > 0 ? "pt-8 border-t border-brand-border dark:border-dark-border" : ""}`}
              >
                <h2 className="text-lg font-semibold text-brand-charcoal dark:text-brand-ivory mb-3">{section.title}</h2>
                <p className="text-sm leading-relaxed text-brand-charcoal/70 dark:text-brand-ivory/70">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 end-6 w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center shadow-lg hover:bg-brand-gold/90 transition-all z-30"
          aria-label="Back to top"
        >
          <ChevronLeftIcon className="w-4 h-4 rotate-90" />
        </button>
      </div>
    </div>
  );
}

export function LegalPageWrapper({ title, lastUpdated, sections }: { title: string; lastUpdated: string; sections: Section[] }) {
  return (
    <AppShell>
      <LegalPage title={title} lastUpdated={lastUpdated} sections={sections} />
    </AppShell>
  );
}
