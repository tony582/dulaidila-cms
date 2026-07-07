import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dulaidila.com"),
  title: {
    default: "dulaidila | Only the Paranoid Survive",
    template: "%s | dulaidila",
  },
  description:
    "Independent Service Design & Delivery Studio. Tony Jin's geek blog on design, tech, and digital innovation.",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "https://dulaidila.com",
    siteName: "dulaidila",
    title: "dulaidila | Only the Paranoid Survive",
    description:
      "Independent Service Design & Delivery Studio. Tony Jin's geek blog on design, tech, and digital innovation.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "dulaidila — Independent Studio & Geek Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dulaidila",
    creator: "@dulaidila",
    title: "dulaidila | Only the Paranoid Survive",
    description:
      "Independent Service Design & Delivery Studio. Tony Jin's geek blog on design, tech, and digital innovation.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    other: {
      "baidu-site-verification": "codeva-XVprKz5CDE",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="layout-wrapper">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
