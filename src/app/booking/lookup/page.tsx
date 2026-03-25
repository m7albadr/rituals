"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { FadeIn, StaggerChildren, StaggerItem, motion, AnimatePresence } from "@/components/motion";
import { ChevronLeftIcon, PhoneIcon, CalendarIcon, ClockIcon } from "@/components/icons";

const COUNTRY_CODES = [
  { flag: "\uD83C\uDDF0\uD83C\uDDFC", code: "+965" },
  { flag: "\uD83C\uDDF8\uD83C\uDDE6", code: "+966" },
  { flag: "\uD83C\uDDE6\uD83C\uDDEA", code: "+971" },
  { flag: "\uD83C\uDDE7\uD83C\uDDED", code: "+973" },
  { flag: "\uD83C\uDDF6\uD83C\uDDE6", code: "+974" },
  { flag: "\uD83C\uDDF4\uD83C\uDDF2", code: "+968" },
  { flag: "\uD83C\uDDEF\uD83C\uDDF4", code: "+962" },
  { flag: "\uD83C\uDDF1\uD83C\uDDE7", code: "+961" },
  { flag: "\uD83C\uDDEA\uD83C\uDDEC", code: "+20" },
];

function OtpInput({ length = 6, value, onChange }: { length?: number; value: string; onChange: (v: string) => void }) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const arr = value.split("");
    arr[index] = digit;
    const newVal = arr.join("").slice(0, length);
    onChange(newVal);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center" dir="ltr">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-14 rounded-xl bg-white dark:bg-dark-card border-2 border-brand-border dark:border-dark-border text-center text-xl font-semibold text-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:outline-none transition-colors"
        />
      ))}
    </div>
  );
}

function ManageBookingContent() {
  const { t, locale } = useI18n();
  const [countryCode, setCountryCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    { icon: CalendarIcon, label: t("manage.viewBooking"), desc: t("manage.viewBookingDesc") },
    { icon: CalendarIcon, label: t("manage.modifyDates"), desc: t("manage.modifyDatesDesc") },
    { icon: ClockIcon, label: t("manage.cancelBooking"), desc: t("manage.cancelBookingDesc") },
  ];

  const faqs = [
    { q: t("manage.faqFindBooking"), a: t("manage.faqFindBookingAnswer") },
    { q: t("manage.faqNoCode"), a: t("manage.faqNoCodeAnswer") },
    { q: t("manage.faqModify"), a: t("manage.faqModifyAnswer") },
    { q: t("manage.faqCancel"), a: t("manage.faqCancelAnswer") },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-lg mx-auto px-6">
        <FadeIn>
          <Link href="/" className="flex items-center gap-1 text-sm text-brand-muted dark:text-dark-muted hover:text-brand-gold transition-colors mb-8">
            <ChevronLeftIcon className="w-4 h-4" />
            <span>{t("manage.backHome")}</span>
          </Link>

          <h1 className="font-serif text-4xl text-brand-charcoal dark:text-brand-ivory">{t("manage.title")}</h1>
          <p className="text-sm text-brand-muted dark:text-dark-muted mt-2">{t("manage.subtitle")}</p>
        </FadeIn>

        <FadeIn className="mt-8" delay={0.1}>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-brand-border dark:border-dark-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <PhoneIcon className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{t("manage.enterPhone")}</span>
            </div>

            <div className="flex gap-2 mb-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-brand-cream dark:bg-dark-input border border-brand-border dark:border-dark-border rounded-xl px-3 py-3 text-sm text-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:outline-none transition-colors"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="XXXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-brand-cream dark:bg-dark-input border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm text-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            {!otpSent ? (
              <button
                onClick={() => phone.length >= 7 && setOtpSent(true)}
                disabled={phone.length < 7}
                className="w-full bg-brand-gold text-white rounded-full py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all"
              >
                {t("manage.sendCode")}
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-xs text-brand-muted dark:text-dark-muted">
                  {t("checkout.enterCode")} {countryCode} {phone}
                </p>
                <OtpInput value={otp} onChange={setOtp} />
                <button
                  disabled={otp.length < 6}
                  className="w-full bg-brand-gold text-white rounded-full py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all"
                >
                  {t("checkout.verifyPhone")}
                </button>
              </div>
            )}
          </div>
        </FadeIn>

        {/* What you can do */}
        <FadeIn className="mt-12" delay={0.2}>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-brand-gold mb-4">
            {t("manage.whatYouCanDo")}
          </h3>
          <StaggerChildren className="space-y-3" stagger={0.06}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.label}>
                  <div className="flex items-center gap-4 bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl px-5 py-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory">{f.label}</p>
                      <p className="text-xs text-brand-muted dark:text-dark-muted">{f.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn className="mt-12" delay={0.3}>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-brand-gold mb-4">
            {t("manage.faq")}
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <div key={i} className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-brand-charcoal dark:text-brand-ivory pe-4">{faq.q}</span>
                    <ChevronLeftIcon className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : "-rotate-90"}`} />
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
                        <div className="px-5 pb-4">
                          <p className="text-sm text-brand-muted dark:text-dark-muted leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function ManageBookingPage() {
  return (
    <AppShell>
      <ManageBookingContent />
    </AppShell>
  );
}
