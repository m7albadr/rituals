export type Amenity =
  | "wifi" | "pool" | "bbq" | "parking" | "beach" | "ac"
  | "security" | "garden" | "coffee" | "tv" | "cleaning"
  | "kitchen" | "jacuzzi";

export type PricingRow = {
  period: string;
  periodAr: string;
  rate: number;
  isBundle?: boolean;
};

export type Rule = {
  icon: string;
  text: string;
  textAr: string;
};

export type PolicyItem = {
  type: "success" | "warning" | "error" | "info";
  text: string;
  textAr: string;
};

export type Chalet = {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  address: string;
  addressAr: string;
  about: string;
  aboutAr: string;
  rooms: number;
  bathrooms: number;
  maxGuests: number;
  hasWifi: boolean;
  hasPool: boolean;
  basePrice: number;
  images: string[];
  amenities: Amenity[];
  pricing: PricingRow[];
  rules: Rule[];
  cancellationPolicy: PolicyItem[];
  modificationPolicy: PolicyItem[];
  mapsUrl: string;
  checkInTime: string;
  checkOutTime: string;
  minStay: number;
  maxStay: number;
  rentalMode?: string;
  rentalModeAr?: string;
  cardType: "featured" | "horizontal";
};

export const chalets: Chalet[] = [
  {
    id: "22",
    name: "Rituals one",
    nameAr: "\u0631\u064A\u062A\u0648\u0627\u0644\u0632 \u0648\u0627\u0646",
    location: "AL KHIRAN",
    locationAr: "\u0627\u0644\u062E\u064A\u0631\u0627\u0646",
    address: "Al Khiran, Kuwait, road 290",
    addressAr: "\u0627\u0644\u062E\u064A\u0631\u0627\u0646\u060C \u0627\u0644\u0643\u0648\u064A\u062A\u060C \u0637\u0631\u064A\u0642 290",
    about: "Beach Front Chalet",
    aboutAr: "\u0634\u0627\u0644\u064A\u0647 \u0639\u0644\u0649 \u0627\u0644\u0628\u062D\u0631",
    rooms: 2,
    bathrooms: 3,
    maxGuests: 6,
    hasWifi: true,
    hasPool: true,
    basePrice: 150,
    images: [
      "/images/chalet-1-1.webp",
      "/images/chalet-1-2.webp",
      "/images/chalet-1-3.webp",
      "/images/chalet-1-4.webp",
      "/images/chalet-1-5.webp",
      "/images/chalet-1-6.webp",
      "/images/chalet-1-7.webp",
      "/images/chalet-1-8.webp",
      "/images/chalet-1-9.webp",
    ],
    amenities: ["wifi", "pool", "bbq", "parking", "beach", "ac", "security", "garden", "coffee", "tv", "cleaning"],
    pricing: [
      { period: "Weekend Bundle (Thursday \u2013 Friday)", periodAr: "\u0628\u0627\u0642\u0629 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 (\u0627\u0644\u062E\u0645\u064A\u0633 \u2013 \u0627\u0644\u062C\u0645\u0639\u0629)", rate: 300, isBundle: true },
      { period: "Saturday", periodAr: "\u0627\u0644\u0633\u0628\u062A", rate: 170 },
      { period: "Sunday", periodAr: "\u0627\u0644\u0623\u062D\u062F", rate: 170 },
      { period: "Monday", periodAr: "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", rate: 170 },
      { period: "Tuesday", periodAr: "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", rate: 170 },
      { period: "Wednesday", periodAr: "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", rate: 170 },
    ],
    rules: [
      { icon: "clock", text: "Check-in: 15:00", textAr: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: 15:00" },
      { icon: "clock", text: "Check-out: 12:00", textAr: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C: 12:00" },
      { icon: "users", text: "Max 6 Guests / No events or parties", textAr: "\u0623\u0642\u0635\u0649 6 \u0636\u064A\u0648\u0641 / \u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u062D\u0641\u0644\u0627\u062A" },
      { icon: "calendar", text: "Minimum stay: 1 nights", textAr: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649: \u0644\u064A\u0644\u0629 \u0648\u0627\u062D\u062F\u0629" },
      { icon: "calendar", text: "Maximum stay: 30 nights", textAr: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649: 30 \u0644\u064A\u0644\u0629" },
      { icon: "link", text: "Rental mode: Weekends Linked", textAr: "\u0646\u0645\u0637 \u0627\u0644\u0625\u064A\u062C\u0627\u0631: \u0639\u0637\u0644\u0629 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0645\u0631\u062A\u0628\u0637\u0629" },
    ],
    cancellationPolicy: [
      { type: "success", text: "Free cancellation up to 5 days before check-in", textAr: "\u0625\u0644\u063A\u0627\u0621 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 5 \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "warning", text: "50% refund up to 3 days before", textAr: "\u0627\u0633\u062A\u0631\u062F\u0627\u062F 50% \u0642\u0628\u0644 3 \u0623\u064A\u0627\u0645" },
      { type: "error", text: "Non-refundable after that", textAr: "\u063A\u064A\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0628\u0639\u062F \u0630\u0644\u0643" },
    ],
    modificationPolicy: [
      { type: "success", text: "Free date modification up to 3 days before check-in", textAr: "\u062A\u0639\u062F\u064A\u0644 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 3 \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "warning", text: "A 15% fee applies for modifications after the free period", textAr: "\u0631\u0633\u0648\u0645 15% \u0644\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629" },
      { type: "error", text: "No modifications allowed less than 2 day(s) before check-in", textAr: "\u0644\u0627 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0642\u0628\u0644 \u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645\u064A\u0646 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "info", text: "Maximum of 2 date changes per reservation", textAr: "\u0623\u0642\u0635\u0649 \u062A\u0639\u062F\u064A\u0644\u064A\u0646 \u0644\u0643\u0644 \u062D\u062C\u0632" },
    ],
    mapsUrl: "https://goo.gl/maps/C3T91mHrD5mFctC36",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    minStay: 1,
    maxStay: 30,
    rentalMode: "Weekends Linked",
    rentalModeAr: "\u0639\u0637\u0644\u0629 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0645\u0631\u062A\u0628\u0637\u0629",
    cardType: "featured",
  },
  {
    id: "23",
    name: "Rituals two",
    nameAr: "\u0631\u064A\u062A\u0648\u0627\u0644\u0632 \u062A\u0648",
    location: "AL KHIRAN",
    locationAr: "\u0627\u0644\u062E\u064A\u0631\u0627\u0646",
    address: "Al Khiran, Kuwait, road 290",
    addressAr: "\u0627\u0644\u062E\u064A\u0631\u0627\u0646\u060C \u0627\u0644\u0643\u0648\u064A\u062A\u060C \u0637\u0631\u064A\u0642 290",
    about: "Rituals two",
    aboutAr: "\u0631\u064A\u062A\u0648\u0627\u0644\u0632 \u062A\u0648",
    rooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    hasWifi: true,
    hasPool: true,
    basePrice: 160,
    images: [
      "/images/chalet-2-1.webp",
      "/images/chalet-2-2.webp",
      "/images/chalet-2-3.webp",
    ],
    amenities: ["wifi", "pool", "bbq", "parking", "beach", "ac", "kitchen", "security", "tv", "garden", "jacuzzi", "coffee", "cleaning"],
    pricing: [
      { period: "Saturday", periodAr: "\u0627\u0644\u0633\u0628\u062A", rate: 160 },
      { period: "Sunday", periodAr: "\u0627\u0644\u0623\u062D\u062F", rate: 160 },
      { period: "Monday", periodAr: "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", rate: 160 },
      { period: "Tuesday", periodAr: "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", rate: 160 },
      { period: "Wednesday", periodAr: "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", rate: 160 },
      { period: "Thursday", periodAr: "\u0627\u0644\u062E\u0645\u064A\u0633", rate: 180 },
      { period: "Friday", periodAr: "\u0627\u0644\u062C\u0645\u0639\u0629", rate: 180 },
    ],
    rules: [
      { icon: "clock", text: "Check-in: 14:00", textAr: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: 14:00" },
      { icon: "clock", text: "Check-out: 12:00", textAr: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C: 12:00" },
      { icon: "users", text: "Max 2 Guests / No events or parties", textAr: "\u0623\u0642\u0635\u0649 2 \u0636\u064A\u0648\u0641 / \u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u062D\u0641\u0644\u0627\u062A" },
      { icon: "calendar", text: "Minimum stay: 1 nights", textAr: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649: \u0644\u064A\u0644\u0629 \u0648\u0627\u062D\u062F\u0629" },
      { icon: "calendar", text: "Maximum stay: 30 nights", textAr: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649: 30 \u0644\u064A\u0644\u0629" },
    ],
    cancellationPolicy: [
      { type: "success", text: "Free cancellation up to 7 days before check-in", textAr: "\u0625\u0644\u063A\u0627\u0621 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 7 \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "warning", text: "50% refund up to 3 days before", textAr: "\u0627\u0633\u062A\u0631\u062F\u0627\u062F 50% \u0642\u0628\u0644 3 \u0623\u064A\u0627\u0645" },
      { type: "error", text: "Non-refundable after that", textAr: "\u063A\u064A\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0628\u0639\u062F \u0630\u0644\u0643" },
    ],
    modificationPolicy: [
      { type: "success", text: "Free date modification up to 3 days before check-in", textAr: "\u062A\u0639\u062F\u064A\u0644 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 3 \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "warning", text: "A 15% fee applies for modifications after the free period", textAr: "\u0631\u0633\u0648\u0645 15% \u0644\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629" },
      { type: "error", text: "No modifications allowed less than 1 day(s) before check-in", textAr: "\u0644\u0627 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0642\u0628\u0644 \u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      { type: "info", text: "Maximum of 2 date changes per reservation", textAr: "\u0623\u0642\u0635\u0649 \u062A\u0639\u062F\u064A\u0644\u064A\u0646 \u0644\u0643\u0644 \u062D\u062C\u0632" },
    ],
    mapsUrl: "https://maps.app.goo.gl/xESg2snGHRT1U7gZ6",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    minStay: 1,
    maxStay: 30,
    cardType: "horizontal",
  },
];

export function getChaletById(id: string): Chalet | undefined {
  return chalets.find((c) => c.id === id);
}
