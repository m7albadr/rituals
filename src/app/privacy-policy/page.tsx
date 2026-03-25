"use client";

import { LegalPageWrapper } from "@/components/legal-page";

const sections = [
  { title: "Section 1 — Introduction", content: "Welcome to Rituals. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services." },
  { title: "Section 2 — Information We Collect", content: "We collect personal information that you voluntarily provide to us when you make a reservation, register on the website, or contact us. This includes: name, phone number, email address, payment information, and booking preferences. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and browsing behavior." },
  { title: "Section 3 — How We Use Your Information", content: "We use the information we collect to: process and manage your reservations, send booking confirmations and updates via SMS and WhatsApp, process payments securely, improve our website and services, respond to your inquiries, and comply with legal obligations under Kuwait law." },
  { title: "Section 4 — Data Storage & Hosting", content: "Your data is hosted on Railway and protected using industry-standard security measures. Static assets are served via Cloudflare R2. All data transmission is encrypted using SSL/TLS protocols." },
  { title: "Section 5 — Payment Security", content: "We use trusted third-party payment processors including Tap, MyFatoorah, and UPayments to handle all payment transactions. We do not store your credit card details on our servers. All payment information is processed securely in compliance with PCI DSS standards." },
  { title: "Section 6 — SMS & WhatsApp Communications", content: "We use kwtSMS to send booking confirmations, verification codes, and important updates about your reservation. By providing your phone number, you consent to receiving these communications. You may opt out of promotional messages at any time." },
  { title: "Section 7 — Cookies", content: "We use essential cookies only to ensure the proper functioning of our website. These cookies are necessary for the website to operate and cannot be switched off. We do not use tracking or advertising cookies." },
  { title: "Section 8 — Data Sharing", content: "We do not sell your personal information. We may share your information with: payment processors for transaction processing, communication services for booking notifications, and government authorities when required by Kuwait law." },
  { title: "Section 9 — Data Retention", content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Booking records are retained for a minimum of 5 years in compliance with Kuwait commercial regulations." },
  { title: "Section 10 — Your Rights", content: "You have the right to: access your personal data, request correction of inaccurate data, request deletion of your data (subject to legal requirements), withdraw consent for marketing communications. To exercise these rights, contact us at +965 9551 2717." },
  { title: "Section 11 — Data Breach Notification", content: "In the event of a data breach that may affect your personal information, we will notify you within 72 hours via SMS or email, and take immediate steps to mitigate any potential harm." },
  { title: "Section 12 — Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date. We encourage you to review this policy periodically." },
  { title: "Section 13 — Contact Us", content: "If you have questions about this Privacy Policy or our data practices, please contact us: Phone: +965 9551 2717 | WhatsApp: 96595512717 | Address: Kuwait" },
];

export default function PrivacyPolicyPage() {
  return <LegalPageWrapper title="Privacy Policy" lastUpdated="March 2026" sections={sections} />;
}
