import type React from "react";
import { Poppins } from "next/font/google";
// Updated metadata for Hostiggo platform
import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Geist_Mono, Geist as V0_Font_Geist } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  variable: "--font-poppins",
});

// Initialize fonts
const _geist = V0_Font_Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hostiggo - Host & Service Provider Onboarding",
  description:
    "Register your property or services with Hostiggo. Connect homestays, villas, and service providers with travelers.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/hostiggo-logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/hostiggo-logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/hostiggo-logo.jpeg",
        type: "image/jpeg",
      },
    ],
    apple: "/hostiggo-logo.jpeg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0891b2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
