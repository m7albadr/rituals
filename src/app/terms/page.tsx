"use client";

import { LegalPageWrapper } from "@/components/legal-page";

const sections = [
  { title: "Section 1 — Introduction", content: "These Terms and Conditions govern your use of the Rituals website and services. By making a reservation or using our services, you agree to be bound by these terms. Please read them carefully before proceeding with any booking." },
  { title: "Section 2 — Reservations & Bookings", content: "All reservations are subject to availability. A booking is confirmed only after full payment is received and a confirmation is sent via SMS or WhatsApp. Rituals reserves the right to decline any reservation at its discretion." },
  { title: "Section 3 — Pricing & Payment", content: "All prices are listed in Kuwaiti Dinars (KWD) and include applicable fees unless otherwise stated. We accept payment via KNET, Visa, and Mastercard through our secure payment partners. Full payment is required at the time of booking." },
  { title: "Section 4 — Check-in & Check-out", content: "Check-in and check-out times vary by chalet and are specified on the chalet detail page. Early check-in or late check-out may be available upon request and subject to availability. Guests must present valid identification upon check-in." },
  { title: "Section 5 — Cancellation & Refund Policy", content: "Cancellation policies vary by chalet and are clearly displayed on each chalet's listing page. Refunds will be processed to the original payment method within 7-14 business days. Cancellation must be made through our website or by contacting our support team." },
  { title: "Section 6 — Modification Policy", content: "Date modifications are subject to the modification policy displayed on each chalet's listing page. Modification fees may apply depending on the timing of the request. A maximum number of modifications per reservation applies as specified in the chalet's policy." },
  { title: "Section 7 — Security Deposit", content: "A security deposit may be required for certain chalets. The deposit amount will be communicated before booking confirmation. Deposits are refundable upon satisfactory inspection of the property at check-out, minus any charges for damages." },
  { title: "Section 8 — Guest Responsibilities", content: "Guests are responsible for: maintaining the chalet in good condition, adhering to maximum occupancy limits, following noise regulations and community rules, reporting any damages immediately, ensuring no illegal activities take place on the premises. Events or parties are strictly prohibited unless explicitly authorized." },
  { title: "Section 9 — Liability", content: "Rituals shall not be liable for: personal injury or loss of personal belongings during the stay, force majeure events including natural disasters, government actions, or other events beyond our control, temporary interruption of utilities or amenities. Guests are encouraged to obtain travel insurance for their protection." },
  { title: "Section 10 — Privacy", content: "Your privacy is important to us. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal data." },
  { title: "Section 11 — Complaints", content: "We strive to provide the best experience. If you have any complaints, please contact us immediately at +965 9551 2717 so we can address your concerns promptly. Complaints should be reported within 24 hours of the issue occurring." },
  { title: "Section 12 — Governing Law", content: "These terms are governed by and construed in accordance with the laws of the State of Kuwait. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kuwait." },
  { title: "Section 13 — Contact Us", content: "Commercial Registration: CR-2024/12345 | Phone: +965 9551 2717 | Address: Kuwait" },
];

export default function TermsPage() {
  return <LegalPageWrapper title="Terms & Conditions" lastUpdated="March 2026" sections={sections} />;
}
