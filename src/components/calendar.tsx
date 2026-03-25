"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { useI18n } from "@/lib/i18n";
import type { Chalet } from "@/lib/data";
import { getDayPrice, isWeekendDay } from "@/lib/pricing";

type CalendarProps = {
  chalet: Chalet;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  blockedDates?: Set<string>;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isPast(date: Date) {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date < tomorrow;
}


function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_NAMES_AR = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_HEADERS_AR = ["\u0623\u062D\u062F", "\u0627\u062B\u0646\u064A\u0646", "\u062B\u0644\u0627\u062B\u0627\u0621", "\u0623\u0631\u0628\u0639\u0627\u0621", "\u062E\u0645\u064A\u0633", "\u062C\u0645\u0639\u0629", "\u0633\u0628\u062A"];

export function Calendar({ chalet, checkIn, checkOut, onSelect, blockedDates }: CalendarProps) {
  const { locale } = useI18n();
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [direction, setDirection] = useState(0);

  const daysInMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = useCallback(() => {
    setDirection(-1);
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    setDirection(1);
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }, [viewMonth]);

  const isBlocked = useCallback((date: Date) => {
    if (!blockedDates) return false;
    return blockedDates.has(date.toISOString().split("T")[0]);
  }, [blockedDates]);

  const hasBlockedInRange = useCallback((start: Date, end: Date) => {
    if (!blockedDates) return false;
    const current = new Date(start);
    current.setDate(current.getDate() + 1);
    while (current < end) {
      if (blockedDates.has(current.toISOString().split("T")[0])) return true;
      current.setDate(current.getDate() + 1);
    }
    return false;
  }, [blockedDates]);

  const handleDayClick = useCallback((date: Date) => {
    if (isPast(date) || isBlocked(date)) return;
    if (!checkIn || (checkIn && checkOut)) { onSelect(date, null); }
    else if (date <= checkIn) { onSelect(date, null); }
    else if (hasBlockedInRange(checkIn, date)) { onSelect(date, null); }
    else { onSelect(checkIn, date); }
  }, [checkIn, checkOut, onSelect, isBlocked, hasBlockedInRange]);

  const monthNames = locale === "ar" ? MONTH_NAMES_AR : MONTH_NAMES;
  const dayHeaders = locale === "ar" ? DAY_HEADERS_AR : DAY_HEADERS;

  return (
    <div id="calendar-section" className="py-2">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-gold/5 transition-colors">
          <ChevronLeftIcon className="w-4 h-4 text-brand-charcoal dark:text-brand-ivory" />
        </button>
        <AnimatePresence mode="wait">
          <motion.h3
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
            className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory"
          >
            {monthNames[viewMonth]} {viewYear}
          </motion.h3>
        </AnimatePresence>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-gold/5 transition-colors">
          <ChevronRightIcon className="w-4 h-4 text-brand-charcoal dark:text-brand-ivory" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {dayHeaders.map((d) => (
          <div key={d} className="text-center text-[10px] text-brand-muted dark:text-dark-muted font-medium py-1">{d}</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7"
        >
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-14" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(viewYear, viewMonth, day);
            const past = isPast(date);
            const blocked = isBlocked(date);
            const disabled = past || blocked;
            const price = getDayPrice(chalet, date);
            const isCheckIn = checkIn && isSameDay(date, checkIn);
            const isCheckOut = checkOut && isSameDay(date, checkOut);
            const inRange = isInRange(date, checkIn, checkOut);
            const isSelected = isCheckIn || isCheckOut;
            const isWeekend = isWeekendDay(chalet, date);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(date)}
                disabled={disabled}
                aria-label={`${day} ${monthNames[viewMonth]} ${viewYear}${isCheckIn ? " (check-in)" : ""}${isCheckOut ? " (check-out)" : ""}${blocked ? " (unavailable)" : ""}`}
                className={`h-14 flex flex-col items-center justify-center text-sm relative transition-all rounded-lg ${
                  blocked
                    ? "opacity-30 cursor-not-allowed line-through"
                    : past
                    ? "opacity-20 cursor-not-allowed"
                    : isSelected
                    ? "bg-brand-gold text-white shadow-sm shadow-brand-gold/20"
                    : inRange
                    ? "bg-brand-gold/10"
                    : "hover:bg-brand-gold/5 cursor-pointer"
                }`}
              >
                <span className={`text-sm ${isSelected ? "font-semibold" : "text-brand-charcoal dark:text-brand-ivory"}`}>{day}</span>
                {!disabled && !isSelected && (
                  <span className="text-[8px] text-brand-muted dark:text-dark-muted mt-0.5">{price}</span>
                )}
                {blocked && (
                  <span className="text-[7px] text-red-400 mt-0.5">booked</span>
                )}
                {!disabled && isWeekend && !isSelected && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-brand-gold" />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
