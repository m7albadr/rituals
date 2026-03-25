"use client";

import { use, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckoutShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { getChaletById } from "@/lib/data";
import { calculateStay, formatDate } from "@/lib/pricing";
import { useTheme } from "@/lib/theme";
import { FadeIn, motion, AnimatePresence } from "@/components/motion";
import { ChevronLeftIcon, SunIcon, MoonIcon } from "@/components/icons";

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

function DotStepper({ step }: { step: number }) {
  const { t } = useI18n();
  const steps = [t("checkout.chalet"), t("checkout.dates"), t("checkout.details"), t("checkout.pay")];

  return (
    <div className="flex items-center justify-center gap-3 py-6">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full transition-all ${
              i < step
                ? "bg-brand-gold"
                : i === step
                ? "border-2 border-brand-gold bg-transparent"
                : "bg-brand-border dark:bg-dark-border"
            }`} />
            <span className={`text-[8px] uppercase tracking-wider font-medium ${
              i <= step ? "text-brand-charcoal dark:text-brand-ivory" : "text-brand-muted dark:text-dark-muted"
            }`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-px mt-[-14px] ${i < step ? "bg-brand-gold" : "bg-brand-border dark:bg-dark-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

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

function CheckoutContent({ id }: { id: string }) {
  const { t, locale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const chalet = getChaletById(id);

  const checkIn = searchParams.get("checkIn") ? new Date(searchParams.get("checkIn")!) : null;
  const checkOut = searchParams.get("checkOut") ? new Date(searchParams.get("checkOut")!) : null;

  const [step] = useState(2);
  const [countryCode, setCountryCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const currency = t("chalet.currency");

  const name = chalet ? (locale === "ar" ? chalet.nameAr : chalet.name) : "";

  const stay = useMemo(() => {
    if (!checkIn || !checkOut || !chalet) return null;
    return calculateStay(chalet, checkIn, checkOut);
  }, [checkIn, checkOut, chalet]);

  if (!chalet) return <div className="text-center py-20 text-brand-muted">Chalet not found</div>;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side — form */}
      <div className="flex-1 lg:max-w-[55%]">
        <div className="sticky top-0 z-40 bg-brand-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-brand-border dark:border-dark-border px-5 py-3 flex items-center justify-between">
          <Link href={`/chalet/${id}`} className="flex items-center gap-2 text-sm text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold transition-colors">
            <ChevronLeftIcon className="w-5 h-5" />
            <span>{t("chalet.back")}</span>
          </Link>
          <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-brand-charcoal dark:text-brand-ivory hover:text-brand-gold hover:bg-brand-gold/5 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
          </button>
        </div>

        <div className="max-w-md mx-auto px-6 py-4">
          <DotStepper step={step} />

          <FadeIn>
            <h2 className="font-serif text-2xl text-brand-charcoal dark:text-brand-ivory mt-4 mb-2">
              {t("checkout.guestDetails")}
            </h2>
            <p className="text-sm text-brand-muted dark:text-dark-muted mb-8">{t("checkout.phoneSubtitle")}</p>

            <div className="bg-white dark:bg-dark-card rounded-2xl border border-brand-border dark:border-dark-border p-6">
              <p className="text-sm font-semibold text-brand-charcoal dark:text-brand-ivory mb-4">{t("checkout.phoneNumber")}</p>

              <div className="flex gap-2 mb-5">
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

              <AnimatePresence mode="wait">
                {!otpSent ? (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => phone.length >= 7 && setOtpSent(true)}
                      disabled={phone.length < 7}
                      className="w-full bg-brand-gold text-white rounded-full py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                    >
                      {t("checkout.verifyPhone")}
                    </motion.button>
                  </motion.div>
                ) : !verified ? (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-center text-xs text-brand-muted dark:text-dark-muted">
                      {t("checkout.enterCode")} {countryCode} {phone}
                    </p>
                    <OtpInput value={otp} onChange={setOtp} />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => otp.length >= 6 && setVerified(true)}
                      disabled={otp.length < 6}
                      className="w-full bg-brand-gold text-white rounded-full py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all"
                    >
                      {t("checkout.verifyPhone")}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="verified"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center py-3"
                  >
                    <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full px-4 py-2 text-sm font-medium">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
                        className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center"
                      >
                        &#10003;
                      </motion.span>
                      {t("checkout.verified")}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right side — booking summary (desktop) */}
      <div className="hidden lg:block lg:w-[45%] bg-white dark:bg-dark-card border-s border-brand-border dark:border-dark-border">
        <div className="sticky top-0 p-8 pt-12">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-brand-gold mb-6">{t("checkout.bookingSummary")}</h3>

          <div className="flex gap-4 items-start">
            <img src={chalet.images[0]} alt={name} className="w-20 h-20 rounded-xl object-cover" />
            <div>
              <p className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory">{name}</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">
                {chalet.rooms} {t("chalet.rooms")} &middot; {chalet.maxGuests} {t("chalet.guests")}
              </p>
            </div>
          </div>

          {checkIn && checkOut && stay && (
            <div className="mt-8 space-y-4">
              <div className="flex justify-between py-3 border-b border-brand-border dark:border-dark-border">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">{t("chalet.checkIn")}</p>
                  <p className="text-sm text-brand-charcoal dark:text-brand-ivory mt-1">{formatDate(checkIn, locale, "long")}</p>
                </div>
                <div className="text-end">
                  <p className="text-[9px] uppercase tracking-wider text-brand-gold font-semibold">{t("chalet.checkOut")}</p>
                  <p className="text-sm text-brand-charcoal dark:text-brand-ivory mt-1">{formatDate(checkOut, locale, "long")}</p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-brand-muted dark:text-dark-muted">
                <span>{stay.nightCount} {stay.nightCount === 1 ? t("chalet.night") : t("chalet.nights")}</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-brand-border dark:border-dark-border">
                <span className="text-sm font-semibold text-brand-charcoal dark:text-brand-ivory">{t("chalet.total")}</span>
                <span className="font-serif text-2xl font-medium text-brand-charcoal dark:text-brand-ivory">{stay.total} {currency}</span>
              </div>

              <p className="text-[10px] text-brand-muted dark:text-dark-muted">{t("chalet.estimated")}</p>

              <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <p className="text-xs text-green-700 dark:text-green-400">
                  {chalet.cancellationPolicy[0] && (locale === "ar" ? chalet.cancellationPolicy[0].textAr : chalet.cancellationPolicy[0].text)}
                </p>
              </div>
            </div>
          )}

          <button
            disabled={!verified}
            className="w-full mt-8 bg-brand-gold text-white rounded-full py-4 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-gold/90 transition-all hover:shadow-lg hover:shadow-brand-gold/20"
          >
            {t("chalet.continue")}
          </button>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-brand-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl border-t border-brand-border dark:border-dark-border px-6 py-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-medium text-brand-charcoal dark:text-brand-ivory">{stay?.total ?? 0} {currency}</span>
            <span className="text-xs text-brand-muted dark:text-dark-muted ms-1">{t("chalet.total").toLowerCase()}</span>
          </div>
          <button
            disabled={!verified}
            className="bg-brand-gold text-white rounded-full px-7 py-3 text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {t("chalet.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <CheckoutShell>
      <CheckoutContent id={id} />
    </CheckoutShell>
  );
}
