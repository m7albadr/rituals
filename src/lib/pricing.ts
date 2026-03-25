import type { Chalet } from "./data";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Returns true if the chalet uses linked weekends (Thu+Fri sold as a bundle).
 */
function hasLinkedWeekends(chalet: Chalet): boolean {
  return chalet.rentalMode === "Weekends Linked";
}

/**
 * Get the price for a single night starting on `date`.
 * For linked-weekend chalets, Thursday returns the bundle price
 * and Friday returns 0 (included in the Thursday bundle).
 */
export function getDayPrice(chalet: Chalet, date: Date): number {
  const day = date.getDay();

  if (hasLinkedWeekends(chalet)) {
    // Thursday = bundle start → return bundle rate
    if (day === 4) {
      const bundle = chalet.pricing.find((p) => p.isBundle);
      return bundle ? bundle.rate / 2 : chalet.basePrice;
    }
    // Friday = part of bundle → show same display price
    if (day === 5) {
      const bundle = chalet.pricing.find((p) => p.isBundle);
      return bundle ? bundle.rate / 2 : chalet.basePrice;
    }
  }

  const row = chalet.pricing.find((p) => p.period === DAY_NAMES[day]);
  return row?.rate ?? chalet.basePrice;
}

/**
 * Returns whether a date is a weekend day for this chalet.
 */
export function isWeekendDay(chalet: Chalet, date: Date): boolean {
  if (!hasLinkedWeekends(chalet)) return false;
  const day = date.getDay();
  return day === 4 || day === 5;
}

export type NightBreakdown = {
  date: string; // YYYY-MM-DD
  dayName: string;
  price: number;
  isBundle?: boolean;
};

/**
 * Calculate total price and per-night breakdown for a date range.
 * Handles linked weekend bundles correctly.
 */
export function calculateStay(
  chalet: Chalet,
  checkIn: Date,
  checkOut: Date
): { total: number; nights: NightBreakdown[]; nightCount: number } {
  const nights: NightBreakdown[] = [];
  let total = 0;
  const current = new Date(checkIn);

  while (current < checkOut) {
    const day = current.getDay();
    const dateStr = current.toISOString().split("T")[0];

    if (hasLinkedWeekends(chalet) && day === 4) {
      // Thursday: add full bundle price
      const bundle = chalet.pricing.find((p) => p.isBundle);
      const bundleRate = bundle?.rate ?? chalet.basePrice * 2;
      total += bundleRate;
      nights.push({ date: dateStr, dayName: "Thursday", price: bundleRate, isBundle: true });

      // Check if Friday is also within range
      const friday = new Date(current);
      friday.setDate(friday.getDate() + 1);
      if (friday < checkOut) {
        nights.push({
          date: friday.toISOString().split("T")[0],
          dayName: "Friday",
          price: 0,
          isBundle: true,
        });
        current.setDate(current.getDate() + 2);
      } else {
        current.setDate(current.getDate() + 1);
      }
      continue;
    }

    if (hasLinkedWeekends(chalet) && day === 5) {
      // Friday without Thursday (start on Friday) — charge as standalone
      const row = chalet.pricing.find((p) => p.period === "Friday");
      const rate = row?.rate ?? chalet.basePrice;
      total += rate;
      nights.push({ date: dateStr, dayName: "Friday", price: rate });
      current.setDate(current.getDate() + 1);
      continue;
    }

    const row = chalet.pricing.find((p) => p.period === DAY_NAMES[day]);
    const rate = row?.rate ?? chalet.basePrice;
    total += rate;
    nights.push({ date: dateStr, dayName: DAY_NAMES[day], price: rate });
    current.setDate(current.getDate() + 1);
  }

  return { total, nights, nightCount: nights.length };
}

/**
 * Format a date for display.
 */
export function formatDate(d: Date, locale: string, style: "short" | "long" = "short"): string {
  const loc = locale === "ar" ? "ar-KW" : "en-US";
  if (style === "long") {
    return d.toLocaleDateString(loc, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  }
  return d.toLocaleDateString(loc, { month: "short", day: "numeric", year: "numeric" });
}
