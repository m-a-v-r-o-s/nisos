import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { BRAND } from "@rentals/db";
import "./globals.css";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/provider";

const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const body = Inter({ subsets: ["latin", "latin-ext", "greek"], variable: "--font-body" });

export function generateMetadata(): Metadata {
  const t = getDictionary();
  return {
    title: `${BRAND.name} - ${t.meta.console}`,
    robots: { index: false, follow: false },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const messages = getDictionary(locale);
  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
