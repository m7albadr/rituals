import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxury Chalets in Kuwait | Rituals",
  description:
    "Book luxury chalets in Al Khiran, Kuwait. Premium private chalets with pools, beach access, and modern amenities. Book directly, no middleman.",
  keywords:
    "chalet rental Kuwait, luxury chalet Kuwait, private pool chalet, Al Khiran chalet, Kuwait beach chalet",
  openGraph: {
    title: "Luxury Chalets in Kuwait | Rituals",
    description:
      "Book luxury chalets in Al Khiran, Kuwait. Premium private chalets with pools, beach access, and modern amenities.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_KW",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Chalets in Kuwait | Rituals",
    description:
      "Book luxury chalets in Al Khiran, Kuwait. Premium private chalets with pools, beach access, and modern amenities.",
  },
  robots: "index, follow",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "theme-color": "#1E1C1A",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem('theme');if(d==='dark'||(d==null&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Rituals",
              description:
                "Premium luxury chalets in Al Khiran, Kuwait. Book directly with no middleman.",
              telephone: "+96595512717",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Al Khiran",
                addressCountry: "KW",
              },
              priceRange: "150-300 KWD",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-cream dark:bg-dark-bg text-brand-charcoal dark:text-brand-ivory font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
