import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { BRAND } from "@rentals/db";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { KeyboardAwareScroll } from "@/components/KeyboardAwareScroll";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/provider";

const display = Space_Grotesk({
  // latin-ext covers Polish/German/French/Italian accents (Greek isn't available
  // for this face, so Greek headings fall back to the system stack).
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const body = Inter({
  subsets: ["latin", "latin-ext", "greek"],
  variable: "--font-body",
});

export function generateMetadata(): Metadata {
  const t = getDictionary();
  return {
    title: `${BRAND.name} - ${t.brand.tagline}`,
    description: t.home.metaDescription,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  const messages = getDictionary(locale);
  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col">
        <I18nProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <WhatsAppButton />
          <KeyboardAwareScroll />
        </I18nProvider>
      </body>
    </html>
  );
}
