"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type Locale = "en" | "ar";

type Translations = {
  [key: string]: string | Translations;
};

const en: Translations = {
  nav: {
    home: "HOME",
    chalets: "CHALETS",
    manageReservation: "MANAGE RESERVATION",
    reach: "REACH",
    langToggle: "\u0639\u0631\u0628\u064A",
  },
  hero: {
    discover: "DISCOVER",
    title: "Find your perfect",
    titleItalic: "escape",
    subtitle: "Premium chalets across Kuwait \u2014 book directly, no middleman.",
    scroll: "Scroll",
    collection: "The Collection",
    viewDetails: "View Details",
    bookNow: "Book Now",
  },
  filter: {
    all: "All",
    alKhiran: "Al Khiran, Kuwait, road 290",
  },
  chalet: {
    rooms: "Rooms",
    room: "Room",
    guests: "Guests",
    guest: "Guest",
    bathrooms: "Bathrooms",
    perNight: "/ night",
    currency: "KD",
    about: "ABOUT",
    pricing: "PRICING",
    amenities: "AMENITIES",
    rules: "RULES",
    cancellationPolicy: "CANCELLATION POLICY",
    modificationPolicy: "MODIFICATION POLICY",
    location: "LOCATION",
    priceBreakdown: "PRICE BREAKDOWN",
    selectDates: "Select Dates",
    continue: "Continue",
    total: "Total",
    period: "PERIOD",
    rate: "RATE",
    checkIn: "CHECK-IN",
    checkOut: "CHECK-OUT",
    nights: "nights",
    night: "night",
    estimated: "Estimated \u2014 may change with add-ons",
    openInMaps: "Open in Google Maps",
    weekendBundle: "Weekend Bundle",
    share: "Share",
    back: "Back",
    morePhotos: "+{count} more",
    allPhotos: "Show all photos",
    maxGuests: "Max {count} Guests",
    noParties: "No events or parties",
    minStay: "Minimum stay: {count} nights",
    maxStay: "Maximum stay: {count} nights",
    rentalMode: "Rental mode: Weekends Linked",
    freeCancellation: "Free cancellation up to {days} days before check-in",
    partialRefund: "50% refund up to {days} days before",
    nonRefundable: "Non-refundable after that",
    freeModification: "Free date modification up to {days} days before check-in",
    modificationFee: "A 15% fee applies for modifications after the free period",
    noModification: "No modifications allowed less than {days} day(s) before check-in",
    maxModifications: "Maximum of {count} date changes per reservation",
  },
  checkout: {
    chalet: "CHALET",
    dates: "DATES",
    details: "DETAILS",
    pay: "PAY",
    guestDetails: "Guest Details",
    contact: "CONTACT",
    phoneNumber: "Phone Number",
    phoneSubtitle: "We'll send a verification code to protect your booking",
    verifyPhone: "Verify Phone",
    bookingSummary: "Booking Summary",
    enterCode: "Enter the code sent to",
    verified: "Verified",
    guestName: "Full Name",
    guestNamePlaceholder: "e.g. Mohammed Al-Ahmad",
    confirmBooking: "Confirm Booking",
    booking: "Booking...",
    errorUnavailable: "Some dates are no longer available. Please select new dates.",
    errorGeneric: "Something went wrong. Please try again.",
  },
  confirmation: {
    title: "Booking Confirmed",
    subtitle: "Your reservation has been created successfully",
    bookingRef: "Booking Reference",
    copyRef: "Copy",
    copied: "Copied!",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nights: "Nights",
    total: "Total",
    guest: "Guest",
    phone: "Phone",
    shareWhatsApp: "Share via WhatsApp",
    viewBooking: "View My Bookings",
    backHome: "Back to Home",
  },
  manage: {
    title: "Manage Booking",
    subtitle: "Verify your phone number to view and manage your bookings",
    enterPhone: "Enter your phone number",
    sendCode: "SEND VERIFICATION CODE",
    backHome: "Home",
    whatYouCanDo: "What you can do",
    viewBooking: "View Booking",
    viewBookingDesc: "See your booking details",
    modifyDates: "Modify Dates",
    modifyDatesDesc: "Change your stay dates",
    cancelBooking: "Cancel Booking",
    cancelBookingDesc: "Cancel per policy terms",
    faq: "Frequently Asked Questions",
    faqFindBooking: "How do I find my booking?",
    faqFindBookingAnswer: "Enter the phone number you used during booking and verify with the code sent to you. Your booking details will appear once verified.",
    faqNoCode: "What if I don't receive the verification code?",
    faqNoCodeAnswer: "Wait 60 seconds and try again. Make sure you entered the correct phone number with the right country code. Contact us via WhatsApp if the issue persists.",
    faqModify: "Can I modify my booking dates?",
    faqModifyAnswer: "Yes, date modifications are possible based on the chalet's modification policy. Check the policy on the chalet page for details on fees and deadlines.",
    faqCancel: "How do I cancel my reservation?",
    faqCancelAnswer: "After verifying your phone, you can cancel from the booking details page. Refund amount depends on the cancellation policy and how far in advance you cancel.",
  },
  reach: {
    getInTouch: "Get in Touch",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    callUs: "Call Us",
    responseTime: "We respond within 1 hour",
    hours: "Saturday \u2013 Thursday \u00B7 09:00 \u2013 22:00",
    saveContact: "Save Our Contact",
    scanToSave: "Scan to save our contact",
    respondTomorrow: "We'll respond tomorrow",
    wereOnline: "We're online",
    bookNow: "Book Now",
  },
  footer: {
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    rights: "\u00A9 2026 Rituals. All rights reserved",
    description: "Premium luxury chalets in Al Khiran, Kuwait.",
  },
  amenityLabels: {
    wifi: "Wifi",
    pool: "Pool",
    bbq: "Bbq",
    parking: "Parking",
    beach: "Beach",
    ac: "Ac",
    security: "Security",
    garden: "Garden",
    coffee: "Coffee",
    tv: "Tv",
    cleaning: "Cleaning",
    kitchen: "Kitchen",
    jacuzzi: "Jacuzzi",
  },
  ruleGroups: {
    timing: "Timing",
    capacity: "Capacity",
    stay: "Stay Duration",
    rental: "Rental Mode",
  },
};

const ar: Translations = {
  nav: {
    home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    chalets: "\u0627\u0644\u0634\u0627\u0644\u064A\u0647\u0627\u062A",
    manageReservation: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u062C\u0632",
    reach: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    langToggle: "EN",
  },
  hero: {
    discover: "\u0627\u0643\u062A\u0634\u0641",
    title: "\u0627\u0639\u062B\u0631 \u0639\u0644\u0649 \u0648\u062C\u0647\u062A\u0643",
    titleItalic: "\u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629",
    subtitle: "\u0634\u0627\u0644\u064A\u0647\u0627\u062A \u0641\u0627\u062E\u0631\u0629 \u0641\u064A \u0627\u0644\u0643\u0648\u064A\u062A \u2014 \u0627\u062D\u062C\u0632 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u062F\u0648\u0646 \u0648\u0633\u064A\u0637",
    scroll: "\u0645\u0631\u0631",
    collection: "\u0634\u0627\u0644\u064A\u0647\u0627\u062A\u0646\u0627",
    viewDetails: "\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    bookNow: "\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646",
  },
  filter: {
    all: "\u0627\u0644\u0643\u0644",
    alKhiran: "\u0627\u0644\u062E\u064A\u0631\u0627\u0646\u060C \u0627\u0644\u0643\u0648\u064A\u062A\u060C \u0637\u0631\u064A\u0642 290",
  },
  chalet: {
    rooms: "\u063A\u0631\u0641",
    room: "\u063A\u0631\u0641\u0629",
    guests: "\u0636\u064A\u0648\u0641",
    guest: "\u0636\u064A\u0641",
    bathrooms: "\u062D\u0645\u0627\u0645\u0627\u062A",
    perNight: "/ \u0644\u064A\u0644\u0629",
    currency: "\u062F.\u0643",
    about: "\u062D\u0648\u0644",
    pricing: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631",
    amenities: "\u0627\u0644\u0645\u0631\u0627\u0641\u0642",
    rules: "\u0627\u0644\u0642\u0648\u0627\u0639\u062F",
    cancellationPolicy: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0625\u0644\u063A\u0627\u0621",
    modificationPolicy: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062A\u0639\u062F\u064A\u0644",
    location: "\u0627\u0644\u0645\u0648\u0642\u0639",
    priceBreakdown: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0633\u0639\u0631",
    selectDates: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E",
    continue: "\u0645\u062A\u0627\u0628\u0639\u0629",
    total: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639",
    period: "\u0627\u0644\u0641\u062A\u0631\u0629",
    rate: "\u0627\u0644\u0633\u0639\u0631",
    checkIn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    checkOut: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",
    nights: "\u0644\u064A\u0627\u0644\u064A",
    night: "\u0644\u064A\u0644\u0629",
    estimated: "\u062A\u0642\u062F\u064A\u0631\u064A \u2014 \u0642\u062F \u064A\u062A\u063A\u064A\u0631 \u0645\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062A",
    openInMaps: "\u0641\u062A\u062D \u0641\u064A \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644",
    weekendBundle: "\u0628\u0627\u0642\u0629 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639",
    share: "\u0645\u0634\u0627\u0631\u0643\u0629",
    back: "\u0631\u062C\u0648\u0639",
    morePhotos: "+{count} \u0635\u0648\u0631",
    allPhotos: "\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0635\u0648\u0631",
    maxGuests: "\u0623\u0642\u0635\u0649 {count} \u0636\u064A\u0648\u0641",
    noParties: "\u0645\u0645\u0646\u0648\u0639 \u0627\u0644\u062D\u0641\u0644\u0627\u062A",
    minStay: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649: {count} \u0644\u064A\u0627\u0644\u064A",
    maxStay: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649: {count} \u0644\u064A\u0627\u0644\u064A",
    rentalMode: "\u0646\u0645\u0637 \u0627\u0644\u0625\u064A\u062C\u0627\u0631: \u0639\u0637\u0644\u0629 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0645\u0631\u062A\u0628\u0637\u0629",
    freeCancellation: "\u0625\u0644\u063A\u0627\u0621 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 {days} \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    partialRefund: "\u0627\u0633\u062A\u0631\u062F\u0627\u062F 50% \u0642\u0628\u0644 {days} \u0623\u064A\u0627\u0645",
    nonRefundable: "\u063A\u064A\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0628\u0639\u062F \u0630\u0644\u0643",
    freeModification: "\u062A\u0639\u062F\u064A\u0644 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 {days} \u0623\u064A\u0627\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    modificationFee: "\u0631\u0633\u0648\u0645 15% \u0644\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629",
    noModification: "\u0644\u0627 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0642\u0628\u0644 \u0623\u0642\u0644 \u0645\u0646 {days} \u064A\u0648\u0645 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    maxModifications: "\u0623\u0642\u0635\u0649 {count} \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0644\u0643\u0644 \u062D\u062C\u0632",
  },
  checkout: {
    chalet: "\u0627\u0644\u0634\u0627\u0644\u064A\u0647",
    dates: "\u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E",
    details: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    pay: "\u0627\u0644\u062F\u0641\u0639",
    guestDetails: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0636\u064A\u0641",
    contact: "\u0627\u0644\u062A\u0648\u0627\u0635\u0644",
    phoneNumber: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641",
    phoneSubtitle: "\u0633\u0646\u0631\u0633\u0644 \u0631\u0645\u0632 \u062A\u062D\u0642\u0642 \u0644\u062D\u0645\u0627\u064A\u0629 \u062D\u062C\u0632\u0643",
    verifyPhone: "\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0647\u0627\u062A\u0641",
    bookingSummary: "\u0645\u0644\u062E\u0635 \u0627\u0644\u062D\u062C\u0632",
    enterCode: "\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0645\u0631\u0633\u0644 \u0625\u0644\u0649",
    verified: "\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642",
    guestName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
    guestNamePlaceholder: "\u0645\u062B\u0627\u0644: \u0645\u062D\u0645\u062F \u0627\u0644\u0623\u062D\u0645\u062F",
    confirmBooking: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632",
    booking: "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u062C\u0632...",
    errorUnavailable: "\u0628\u0639\u0636 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E \u0644\u0645 \u062A\u0639\u062F \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0648\u0627\u0631\u064A\u062E \u062C\u062F\u064A\u062F\u0629.",
    errorGeneric: "\u062D\u062F\u062B \u062E\u0637\u0623. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
  },
  confirmation: {
    title: "\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632",
    subtitle: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062D\u062C\u0632\u0643 \u0628\u0646\u062C\u0627\u062D",
    bookingRef: "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632",
    copyRef: "\u0646\u0633\u062E",
    copied: "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E!",
    checkIn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    checkOut: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",
    nights: "\u0627\u0644\u0644\u064A\u0627\u0644\u064A",
    total: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639",
    guest: "\u0627\u0644\u0636\u064A\u0641",
    phone: "\u0627\u0644\u0647\u0627\u062A\u0641",
    shareWhatsApp: "\u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628",
    viewBooking: "\u0639\u0631\u0636 \u062D\u062C\u0648\u0632\u0627\u062A\u064A",
    backHome: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
  },
  manage: {
    title: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u062C\u0632",
    subtitle: "\u062A\u062D\u0642\u0642 \u0645\u0646 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643 \u0644\u0639\u0631\u0636 \u0648\u0625\u062F\u0627\u0631\u0629 \u062D\u062C\u0648\u0632\u0627\u062A\u0643",
    enterPhone: "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643",
    sendCode: "\u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062A\u062D\u0642\u0642",
    backHome: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    whatYouCanDo: "\u0645\u0627\u0630\u0627 \u064A\u0645\u0643\u0646\u0643 \u0623\u0646 \u062A\u0641\u0639\u0644",
    viewBooking: "\u0639\u0631\u0636 \u0627\u0644\u062D\u062C\u0632",
    viewBookingDesc: "\u062A\u0641\u0627\u0635\u064A\u0644 \u062D\u062C\u0632\u0643",
    modifyDates: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E",
    modifyDatesDesc: "\u063A\u064A\u0651\u0631 \u062A\u0648\u0627\u0631\u064A\u062E \u0625\u0642\u0627\u0645\u062A\u0643",
    cancelBooking: "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632",
    cancelBookingDesc: "\u0625\u0644\u063A\u0627\u0621 \u062D\u0633\u0628 \u0627\u0644\u0633\u064A\u0627\u0633\u0629",
    faq: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
    faqFindBooking: "\u0643\u064A\u0641 \u0623\u062C\u062F \u062D\u062C\u0632\u064A\u061F",
    faqFindBookingAnswer: "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0630\u064A \u0627\u0633\u062A\u062E\u062F\u0645\u062A\u0647 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u062C\u0632 \u0648\u062A\u062D\u0642\u0642 \u0628\u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0645\u0631\u0633\u0644 \u0625\u0644\u064A\u0643. \u0633\u062A\u0638\u0647\u0631 \u062A\u0641\u0627\u0635\u064A\u0644 \u062D\u062C\u0632\u0643 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0642\u0642.",
    faqNoCode: "\u0645\u0627\u0630\u0627 \u0644\u0648 \u0644\u0645 \u0623\u0633\u062A\u0644\u0645 \u0631\u0645\u0632 \u0627\u0644\u062A\u062D\u0642\u0642\u061F",
    faqNoCodeAnswer: "\u0627\u0646\u062A\u0638\u0631 60 \u062B\u0627\u0646\u064A\u0629 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649. \u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0635\u062D\u064A\u062D \u0645\u0639 \u0631\u0645\u0632 \u0627\u0644\u062F\u0648\u0644\u0629. \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0625\u0630\u0627 \u0627\u0633\u062A\u0645\u0631\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629.",
    faqModify: "\u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u062A\u0639\u062F\u064A\u0644 \u062A\u0648\u0627\u0631\u064A\u062E \u062D\u062C\u0632\u064A\u061F",
    faqModifyAnswer: "\u0646\u0639\u0645\u060C \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E \u062D\u0633\u0628 \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0634\u0627\u0644\u064A\u0647. \u0631\u0627\u062C\u0639 \u0627\u0644\u0633\u064A\u0627\u0633\u0629 \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u0634\u0627\u0644\u064A\u0647 \u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F.",
    faqCancel: "\u0643\u064A\u0641 \u0623\u0644\u063A\u064A \u062D\u062C\u0632\u064A\u061F",
    faqCancelAnswer: "\u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0647\u0627\u062A\u0641\u0643\u060C \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0625\u0644\u063A\u0627\u0621 \u0645\u0646 \u0635\u0641\u062D\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062D\u062C\u0632. \u0645\u0628\u0644\u063A \u0627\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0625\u0644\u063A\u0627\u0621 \u0648\u0645\u062F\u0629 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0645\u0633\u0628\u0642.",
  },
  reach: {
    getInTouch: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    whatsapp: "\u0648\u0627\u062A\u0633\u0627\u0628",
    instagram: "\u0627\u0646\u0633\u062A\u063A\u0631\u0627\u0645",
    callUs: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    responseTime: "\u0646\u0631\u062F \u062E\u0644\u0627\u0644 \u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",
    hours: "\u0627\u0644\u0633\u0628\u062A \u2013 \u0627\u0644\u062E\u0645\u064A\u0633 \u00B7 09:00 \u2013 22:00",
    saveContact: "\u062D\u0641\u0638 \u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644",
    scanToSave: "\u0627\u0645\u0633\u062D \u0644\u062D\u0641\u0638 \u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644",
    respondTomorrow: "\u0633\u0646\u0631\u062F \u063A\u062F\u0627\u064B",
    wereOnline: "\u0645\u062A\u0635\u0644 \u0627\u0644\u0622\u0646",
    bookNow: "\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646",
  },
  footer: {
    privacy: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
    terms: "\u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0627\u0644\u0623\u062D\u0643\u0627\u0645",
    rights: "\u00A9 2026 Rituals. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629",
    description: "\u0634\u0627\u0644\u064A\u0647\u0627\u062A \u0641\u0627\u062E\u0631\u0629 \u0641\u064A \u0627\u0644\u062E\u064A\u0631\u0627\u0646\u060C \u0627\u0644\u0643\u0648\u064A\u062A.",
  },
  amenityLabels: {
    wifi: "\u0648\u0627\u064A\u0641\u0627\u064A",
    pool: "\u0645\u0633\u0628\u062D",
    bbq: "\u0634\u0648\u0627\u064A\u0629",
    parking: "\u0645\u0648\u0627\u0642\u0641",
    beach: "\u0634\u0627\u0637\u0626",
    ac: "\u062A\u0643\u064A\u064A\u0641",
    security: "\u0623\u0645\u0646",
    garden: "\u062D\u062F\u064A\u0642\u0629",
    coffee: "\u0642\u0647\u0648\u0629",
    tv: "\u062A\u0644\u0641\u0627\u0632",
    cleaning: "\u062A\u0646\u0638\u064A\u0641",
    kitchen: "\u0645\u0637\u0628\u062E",
    jacuzzi: "\u062C\u0627\u0643\u0648\u0632\u064A",
  },
  ruleGroups: {
    timing: "\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F",
    capacity: "\u0627\u0644\u0633\u0639\u0629",
    stay: "\u0645\u062F\u0629 \u0627\u0644\u0625\u0642\u0627\u0645\u0629",
    rental: "\u0646\u0645\u0637 \u0627\u0644\u0625\u064A\u062C\u0627\u0631",
  },
};

const translations: Record<Locale, Translations> = { en, ar };

function getNestedValue(obj: Translations, path: string): string {
  const keys = path.split(".");
  let current: Translations | string = obj;
  for (const key of keys) {
    if (typeof current === "string") return path;
    current = current[key];
    if (current === undefined) return path;
  }
  return typeof current === "string" ? current : path;
}

type I18nContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string, params?: Record<string, string | number>) => string;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("locale");
      if (stored === "ar" || stored === "en") return stored;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let value = getNestedValue(translations[locale], key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, dir, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
