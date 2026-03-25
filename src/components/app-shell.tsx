"use client";

import { useEffect } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { ToastProvider } from "./toast";
import { Header } from "./header";
import { Footer } from "./footer";
import { SplashScreen } from "./splash-screen";
import { PageTransition } from "./motion";

function DirectionManager({ children }: { children: React.ReactNode }) {
  const { locale, dir } = useI18n();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return <>{children}</>;
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ToastProvider>
          <DirectionManager>{children}</DirectionManager>
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

export function AppShell({ children, transparentHeader = false }: { children: React.ReactNode; transparentHeader?: boolean }) {
  return (
    <Providers>
      <SplashScreen>
        <Header transparent={transparentHeader} />
        <PageTransition>
          <main id="main-content" className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </SplashScreen>
    </Providers>
  );
}

export function DetailShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main id="main-content" className="flex-1">{children}</main>
    </Providers>
  );
}

export function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main id="main-content" className="flex-1">{children}</main>
    </Providers>
  );
}

export function MinimalShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
